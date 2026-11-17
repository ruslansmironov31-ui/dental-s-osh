import { FormEvent, useEffect, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogOut,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { ClinicContacts } from '../data/clinicData';
import {
  FALLBACK_SHEET_SERVICES,
  saveClinicData,
  SheetServiceItem,
  verifyAdminPassword,
} from '../services/clinicApi';

interface AdminPanelModalProps {
  isOpen: boolean;
  currentServices: SheetServiceItem[];
  currentContacts: ClinicContacts;
  hasRemoteData: boolean;
  onClose: () => void;
  onDataSaved: (services: SheetServiceItem[], contacts: ClinicContacts) => void;
}

type AdminTab = 'services' | 'contacts';

export function AdminPanelModal({
  isOpen,
  currentServices,
  currentContacts,
  hasRemoteData,
  onClose,
  onDataSaved,
}: AdminPanelModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<AdminTab>('services');
  const [draftServices, setDraftServices] = useState<SheetServiceItem[]>([]);
  const [draftContacts, setDraftContacts] = useState<ClinicContacts>(currentContacts);

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setDraftServices(currentServices.map((item) => ({ ...item })));
    setDraftContacts({ ...currentContacts });
    setSaveError('');
    setSaveSuccess('');
    setAuthError('');
  }, [isOpen, currentServices, currentContacts]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setAuthError('Введите пароль администратора.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      await verifyAdminPassword(
        trimmedPassword,
        hasRemoteData ? currentServices : undefined,
        hasRemoteData ? currentContacts : undefined
      );
      setIsAuthenticated(true);
      setDraftServices(currentServices.map((item) => ({ ...item })));
      setDraftContacts({ ...currentContacts });
    } catch (error) {
      setAuthError(
        error instanceof Error && error.message
          ? error.message
          : 'Неверный пароль. Попробуйте ещё раз.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAuthError('');
    setSaveError('');
    setSaveSuccess('');
  };

  const handleServiceChange = (
    index: number,
    field: keyof SheetServiceItem,
    value: string | boolean
  ) => {
    setSaveSuccess('');
    setSaveError('');
    setDraftServices((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddService = () => {
    setSaveSuccess('');
    setSaveError('');
    const maxId = draftServices.reduce((max, item) => {
      const numeric = Number(item.id);
      return Number.isFinite(numeric) && numeric > max ? numeric : max;
    }, 0);

    setDraftServices((prev) => [
      ...prev,
      {
        id: maxId + 1,
        name_ru: '',
        name_kg: '',
        price: '',
        active: true,
      },
    ]);
  };

  const handleRemoveService = (index: number) => {
    setSaveSuccess('');
    setSaveError('');
    setDraftServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLoadBasePriceList = () => {
    setSaveSuccess('');
    setSaveError('');
    setDraftServices(FALLBACK_SHEET_SERVICES.map((item) => ({ ...item })));
  };

  const handleSave = async () => {
    const validServices = draftServices.filter(
      (item) => item.name_ru.trim().length > 0 || item.name_kg.trim().length > 0
    );

    if (validServices.length === 0) {
      setSaveError('Добавьте хотя бы одну услугу с названием.');
      setActiveTab('services');
      return;
    }

    if (!draftContacts.phone.trim()) {
      setSaveError('Укажите номер телефона клиники.');
      setActiveTab('contacts');
      return;
    }

    setSaveLoading(true);
    setSaveError('');
    setSaveSuccess('');

    try {
      const saved = await saveClinicData(password.trim(), validServices, draftContacts);
      onDataSaved(saved.services, saved.contacts);
      setDraftServices(saved.services.map((item) => ({ ...item })));
      setDraftContacts({ ...saved.contacts });
      setSaveSuccess('Данные успешно сохранены в Google Таблице!');
    } catch (error) {
      setSaveError(
        error instanceof Error && error.message
          ? error.message
          : 'Не удалось сохранить изменения. Проверьте соединение или пароль.'
      );
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/65 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-3xl bg-[#D9DDE2] dark:bg-[#1E2225] rounded-t-2xl sm:rounded-2xl border border-[#8D949C]/50 dark:border-white/12 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/15 bg-[#5A6067] dark:bg-[#222629] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4A5056] text-white flex items-center justify-center shrink-0 border border-white/20">
              {isAuthenticated ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
            </div>
            <div>
              <h2
                id="admin-panel-title"
                className="text-base sm:text-lg font-bold text-white leading-tight"
              >
                {isAuthenticated ? 'Панель администратора Дентал С' : 'Вход для администратора'}
              </h2>
              <p className="text-xs text-slate-200">
                {isAuthenticated
                  ? 'Управление прайсом и контактами через Google Таблицу'
                  : 'Доступ только для сотрудников клиники'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                title="Выйти из аккаунта"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Выйти</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Login Form */
          <form onSubmit={handleLogin} className="p-5 sm:p-7 space-y-4 max-w-md mx-auto w-full">
            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Пароль администратора
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  autoFocus
                  autoComplete="current-password"
                  placeholder="Введите пароль..."
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#222629] text-sm text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#2D3134] dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#2D3134]/60 dark:text-slate-400 mt-1.5">
                Пароль проверяется напрямую на сервере Google Apps Script.
              </p>
            </div>

            {authError && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3.5 py-2.5 text-xs font-medium text-red-700 dark:text-red-300"
              >
                {authError}
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[48px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#2D3134]/75 dark:text-slate-300 hover:bg-[#2D3134]/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={authLoading}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Проверка...</span>
                  </>
                ) : (
                  <span>Войти</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Authenticated Dashboard */
          <>
            {/* Tabs */}
            <div className="px-5 pt-3 pb-0 border-b border-[#8D949C]/35 dark:border-white/10 flex items-center gap-2 bg-[#D9DDE2] dark:bg-[#1E2225]">
              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'services'
                    ? 'border-[#52585E] dark:border-white text-[#23272B] dark:text-white'
                    : 'border-transparent text-[#4A5056] dark:text-slate-400 hover:text-[#23272B] dark:hover:text-slate-200'
                }`}
              >
                Услуги и цены ({draftServices.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'border-[#52585E] dark:border-white text-[#23272B] dark:text-white'
                    : 'border-transparent text-[#4A5056] dark:text-slate-400 hover:text-[#23272B] dark:hover:text-slate-200'
                }`}
              >
                Контакты
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeTab === 'services' ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Добавить услугу</span>
                    </button>

                    {draftServices.length < 4 && (
                      <button
                        type="button"
                        onClick={handleLoadBasePriceList}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E5E8EC] dark:bg-[#272C30] hover:bg-[#D5DAE0] dark:hover:bg-[#30363B] text-[#2D3134] dark:text-slate-200 border border-[#2D3134]/15 dark:border-white/10 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Загрузить все 8 базовых услуг</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {draftServices.map((service, index) => (
                      <div
                        key={`${service.id}-${index}`}
                        className={`rounded-xl border p-3.5 sm:p-4 space-y-3 transition-colors ${
                          service.active
                            ? 'bg-white dark:bg-[#252A2E] border-[#2D3134]/12 dark:border-white/10'
                            : 'bg-[#ECEDEF]/70 dark:bg-[#191C1F] border-[#2D3134]/10 dark:border-white/5 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                            #{service.id}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              role="switch"
                              aria-checked={service.active}
                              onClick={() =>
                                handleServiceChange(index, 'active', !service.active)
                              }
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                                service.active
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  service.active ? 'bg-emerald-500' : 'bg-slate-400'
                                }`}
                              />
                              <span>{service.active ? 'Активна' : 'Скрыта'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveService(index)}
                              aria-label="Удалить услугу"
                              title="Удалить услугу"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-12 gap-2.5">
                          <div className="sm:col-span-5">
                            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Название (RU)
                            </label>
                            <input
                              type="text"
                              value={service.name_ru}
                              onChange={(e) =>
                                handleServiceChange(index, 'name_ru', e.target.value)
                              }
                              placeholder="Например: Лечение кариеса"
                              className="w-full px-3 py-2 rounded-lg border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#1E2225] text-xs sm:text-sm text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Название (KG)
                            </label>
                            <input
                              type="text"
                              value={service.name_kg}
                              onChange={(e) =>
                                handleServiceChange(index, 'name_kg', e.target.value)
                              }
                              placeholder="Мисалы: Тиш дарылоо"
                              className="w-full px-3 py-2 rounded-lg border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#1E2225] text-xs sm:text-sm text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Цена
                            </label>
                            <input
                              type="text"
                              value={service.price}
                              onChange={(e) =>
                                handleServiceChange(index, 'price', e.target.value)
                              }
                              placeholder="7 500 сом"
                              className="w-full px-3 py-2 rounded-lg border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#1E2225] text-xs sm:text-sm font-mono text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Contacts Tab */
                <div className="space-y-4 max-w-xl">
                  <div>
                    <label
                      htmlFor="admin-contact-phone"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#4A5056] dark:text-slate-300" />
                      <span>Номер телефона (для звонков и отображения)</span>
                    </label>
                    <input
                      id="admin-contact-phone"
                      type="text"
                      value={draftContacts.phone}
                      onChange={(e) => {
                        setSaveSuccess('');
                        setSaveError('');
                        setDraftContacts((prev) => ({ ...prev, phone: e.target.value }));
                      }}
                      placeholder="+996 556 978 000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#222629] text-sm font-mono text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-contact-whatsapp"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#4A5056] dark:text-slate-300" />
                      <span>Номер WhatsApp</span>
                    </label>
                    <input
                      id="admin-contact-whatsapp"
                      type="text"
                      value={draftContacts.whatsapp}
                      onChange={(e) => {
                        setSaveSuccess('');
                        setSaveError('');
                        setDraftContacts((prev) => ({ ...prev, whatsapp: e.target.value }));
                      }}
                      placeholder="+996 556 978 000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#222629] text-sm font-mono text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-contact-address"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#4A5056] dark:text-slate-300" />
                      <span>Адрес клиники (RU)</span>
                    </label>
                    <input
                      id="admin-contact-address"
                      type="text"
                      value={draftContacts.address}
                      onChange={(e) => {
                        setSaveSuccess('');
                        setSaveError('');
                        setDraftContacts((prev) => ({ ...prev, address: e.target.value }));
                      }}
                      placeholder="г. Ош, ул. Фрунзенская (ор. Геологобаза)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#222629] text-sm text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-contact-address-kg"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#4A5056] dark:text-slate-300" />
                      <span>Адрес клиники (KG)</span>
                    </label>
                    <input
                      id="admin-contact-address-kg"
                      type="text"
                      value={draftContacts.address_kg ?? ''}
                      onChange={(e) => {
                        setSaveSuccess('');
                        setSaveError('');
                        setDraftContacts((prev) => ({
                          ...prev,
                          address_kg: e.target.value,
                        }));
                      }}
                      placeholder="Ош ш., Фрунзенская көч. (багыты: Геологобаза)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 bg-white dark:bg-[#222629] text-sm text-[#2D3134] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Save Bar */}
            <div className="px-5 py-4 border-t border-[#8D949C]/35 dark:border-white/10 bg-[#C8CDD3] dark:bg-[#222629] space-y-3">
              {saveError && (
                <div
                  role="alert"
                  className="rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3.5 py-2 text-xs font-medium text-red-700 dark:text-red-300"
                >
                  {saveError}
                </div>
              )}

              {saveSuccess && (
                <div
                  role="status"
                  className="rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveSuccess}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[48px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#23272B]/80 dark:text-slate-300 hover:bg-[#D9DDE2] dark:hover:bg-white/10 border border-transparent hover:border-[#8D949C]/40 dark:hover:border-white/15 transition-colors cursor-pointer"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  {saveLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Сохранение...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Сохранить</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
