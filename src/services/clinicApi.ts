import { ClinicContacts, Language, ServiceItem, TRANSLATIONS } from '../data/clinicData';

export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzx19TTsTU7pAbGhmM8IB7CWAylduBQDkdAZ8DFbWGK-QfP_ZXhwNz2CTX0mbQdvQY/exec';

export interface SheetServiceItem {
  id: number | string;
  name_ru: string;
  name_kg: string;
  price: string;
  active: boolean;
}

export const FALLBACK_CONTACTS: ClinicContacts = {
  phone: '+996 556 978 000',
  whatsapp: '+996 556 978 000',
  address: 'г. Ош, ул. Фрунзенская (ор. Геологобаза)',
  address_kg: 'Ош ш., Фрунзенская көч. (багыты: Геологобаза)',
};

const LEGACY_PLACEHOLDER_DIGITS = '996550521083';

export const FALLBACK_SHEET_SERVICES: SheetServiceItem[] = TRANSLATIONS.ru.services.map(
  (ruItem, index) => {
    const kgItem = TRANSLATIONS.kg.services[index];
    return {
      id: index + 1,
      name_ru: ruItem.name,
      name_kg: kgItem?.name ?? ruItem.name,
      price: ruItem.price,
      active: true,
    };
  }
);

function parseBooleanActive(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'false' || normalized === '0' || normalized === 'no') {
      return false;
    }
  }
  if (typeof value === 'number') {
    return value !== 0;
  }
  return true;
}

export function normalizeSheetServices(rawServices: unknown): SheetServiceItem[] {
  if (!Array.isArray(rawServices)) return [];

  return rawServices
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map((item, index) => ({
      id:
        typeof item.id === 'number' || typeof item.id === 'string'
          ? item.id
          : index + 1,
      name_ru: String(item.name_ru ?? item.name ?? '').trim(),
      name_kg: String(item.name_kg ?? item.name_ru ?? item.name ?? '').trim(),
      price: String(item.price ?? '').trim(),
      active: parseBooleanActive(item.active),
    }))
    .filter((item) => item.name_ru.length > 0 || item.name_kg.length > 0);
}

export function normalizeContacts(rawContacts: unknown): ClinicContacts {
  if (!rawContacts || typeof rawContacts !== 'object') {
    return { ...FALLBACK_CONTACTS };
  }
  const c = rawContacts as Record<string, unknown>;
  const rawPhone = String(c.phone ?? '').trim();
  const isLegacyDemoPhone =
    rawPhone.replace(/\D/g, '') === LEGACY_PLACEHOLDER_DIGITS;
  const phone = !rawPhone || isLegacyDemoPhone ? FALLBACK_CONTACTS.phone : rawPhone;

  const rawWa = String(c.whatsapp ?? '').trim();
  const isLegacyDemoWa = rawWa.replace(/\D/g, '') === LEGACY_PLACEHOLDER_DIGITS;
  const whatsapp = !rawWa || isLegacyDemoWa ? phone : rawWa;

  const rawAddr = String(c.address ?? c.address_ru ?? '').trim();
  const isLegacyAddr = rawAddr.includes('Кызыл-Кия') || rawAddr.includes('Масалиева');
  const address =
    !rawAddr || isLegacyAddr ? FALLBACK_CONTACTS.address : rawAddr;

  const rawAddrKg = String(c.address_kg ?? c.address ?? '').trim();
  const isLegacyAddrKg = rawAddrKg.includes('Кызыл-Кыя') || rawAddrKg.includes('Масалиев');
  const addressKg =
    !rawAddrKg || isLegacyAddrKg ? FALLBACK_CONTACTS.address_kg : rawAddrKg;

  return {
    phone,
    whatsapp,
    address,
    address_kg: addressKg,
  };
}

export function mapSheetServicesToDisplay(
  sheetServices: SheetServiceItem[],
  lang: Language,
  fallbackServices: ServiceItem[]
): ServiceItem[] {
  const activeItems = sheetServices.filter((item) => item.active !== false);

  return activeItems.map((sheetItem) => {
    const numericId = Number(sheetItem.id);
    const matchedByIndex =
      Number.isInteger(numericId) &&
      numericId >= 1 &&
      numericId <= fallbackServices.length
        ? fallbackServices[numericId - 1]
        : undefined;

    const ruMatchTarget = sheetItem.name_ru.toLowerCase();
    const kgMatchTarget = sheetItem.name_kg.toLowerCase();
    const matchedByName =
      matchedByIndex ||
      fallbackServices.find((_, idx) => {
        const ruFallback = TRANSLATIONS.ru.services[idx]?.name.toLowerCase();
        const kgFallback = TRANSLATIONS.kg.services[idx]?.name.toLowerCase();
        return (
          (ruMatchTarget && ruFallback === ruMatchTarget) ||
          (kgMatchTarget && kgFallback === kgMatchTarget)
        );
      });

    const localizedName =
      lang === 'kg'
        ? sheetItem.name_kg || sheetItem.name_ru
        : sheetItem.name_ru || sheetItem.name_kg;

    return {
      id: `sheet-${sheetItem.id}`,
      cat: matchedByName?.cat ?? 'treat',
      categoryLabel:
        matchedByName?.categoryLabel ?? (lang === 'kg' ? 'Кызмат' : 'Услуга'),
      name: localizedName,
      desc: matchedByName?.desc ?? '',
      price: sheetItem.price || matchedByName?.price || '',
      duration: matchedByName?.duration ?? '',
    };
  });
}

const CLINIC_CACHE_KEY = 'dental_s_sheet_cache_v1';
const GET_TIMEOUT_MS = 6500;
const POST_TIMEOUT_MS = 15000;

export interface FetchClinicDataResult {
  services: SheetServiceItem[];
  contacts: ClinicContacts;
}

export function readCachedClinicData(): FetchClinicDataResult | null {
  try {
    const raw = window.localStorage.getItem(CLINIC_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const services = normalizeSheetServices(parsed.services);
    const contacts = normalizeContacts(parsed.contacts);
    if (services.length === 0) return null;
    return { services, contacts };
  } catch {
    return null;
  }
}

export function writeCachedClinicData(data: FetchClinicDataResult): void {
  try {
    window.localStorage.setItem(CLINIC_CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota / restricted iframe storage errors
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Превышено время ожидания сервера. Проверьте интернет.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function fetchClinicData(): Promise<FetchClinicDataResult> {
  const response = await fetchWithTimeout(
    APPS_SCRIPT_URL,
    {
      method: 'GET',
      cache: 'no-store',
    },
    GET_TIMEOUT_MS
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const text = await response.text();
  const data = JSON.parse(text) as Record<string, unknown>;

  if (data.status === 'error' || data.success === false) {
    throw new Error(String(data.message || data.error || 'Failed to load clinic data'));
  }

  const normalized: FetchClinicDataResult = {
    services: normalizeSheetServices(data.services),
    contacts: normalizeContacts(data.contacts),
  };

  if (normalized.services.length > 0) {
    writeCachedClinicData(normalized);
  }

  return normalized;
}

function parseAppsScriptPostResponse(text: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Сервер вернул некорректный ответ. Проверьте доступ к скрипту.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Неожиданный ответ сервера.');
  }

  const record = parsed as Record<string, unknown>;
  if (
    record.status === 'error' ||
    record.success === false ||
    record.ok === false ||
    record.authorized === false
  ) {
    throw new Error(
      String(record.message || record.error || 'Неверный пароль или ошибка доступа')
    );
  }

  return record;
}

export async function verifyAdminPassword(
  password: string,
  snapshotServices?: SheetServiceItem[],
  snapshotContacts?: ClinicContacts
): Promise<void> {
  const payload: Record<string, unknown> = {
    action: 'login',
    password,
  };

  if (snapshotServices && snapshotServices.length > 0) {
    payload.services = snapshotServices;
  }
  if (snapshotContacts) {
    payload.contacts = snapshotContacts;
  }

  const response = await fetchWithTimeout(
    APPS_SCRIPT_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    },
    POST_TIMEOUT_MS
  );

  if (!response.ok) {
    throw new Error(`Ошибка сервера (${response.status})`);
  }

  const text = await response.text();
  parseAppsScriptPostResponse(text);
}

export async function saveClinicData(
  password: string,
  services: SheetServiceItem[],
  contacts: ClinicContacts
): Promise<FetchClinicDataResult> {
  const cleanContacts: ClinicContacts = {
    phone: contacts.phone.trim(),
    whatsapp: contacts.whatsapp.trim() || contacts.phone.trim(),
    address: contacts.address.trim(),
    address_kg: (contacts.address_kg || contacts.address).trim(),
  };

  const cleanServices: SheetServiceItem[] = services.map((item, index) => ({
    id: item.id ?? index + 1,
    name_ru: item.name_ru.trim(),
    name_kg: item.name_kg.trim() || item.name_ru.trim(),
    price: item.price.trim(),
    active: Boolean(item.active),
  }));

  const response = await fetchWithTimeout(
    APPS_SCRIPT_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        password,
        services: cleanServices,
        contacts: cleanContacts,
      }),
    },
    POST_TIMEOUT_MS
  );

  if (!response.ok) {
    throw new Error(`Ошибка сервера (${response.status})`);
  }

  const text = await response.text();
  const result = parseAppsScriptPostResponse(text);

  const saved: FetchClinicDataResult = {
    services:
      Array.isArray(result.services) && result.services.length > 0
        ? normalizeSheetServices(result.services)
        : cleanServices,
    contacts: result.contacts
      ? normalizeContacts(result.contacts)
      : cleanContacts,
  };

  writeCachedClinicData(saved);
  return saved;
}
