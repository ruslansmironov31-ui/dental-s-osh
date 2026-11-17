import { useState } from 'react';
import { Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import {
  CLINIC_INSTAGRAM_HANDLE,
  CLINIC_INSTAGRAM_URL,
  ClinicContacts,
  ClinicTranslation,
  LandmarkId,
  Language,
  sanitizePhoneRaw,
} from '../data/clinicData';

interface RouteMapAndContactsProps {
  lang: Language;
  t: ClinicTranslation;
  contacts: ClinicContacts;
}

export function RouteMapAndContacts({
  lang,
  t,
  contacts,
}: RouteMapAndContactsProps) {
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<LandmarkId>('clinic');

  const displayAddress =
    lang === 'kg'
      ? contacts.address_kg || contacts.address || t.addrValue
      : contacts.address || t.addrValue;
  const phoneDisplay = contacts.phone;
  const phoneRaw = sanitizePhoneRaw(contacts.phone);

  const activeLandmark =
    t.landmarks.find((item) => item.id === selectedLandmarkId) ?? t.landmarks[0];

  // Osh city, ul. Frunzenskaya (landmark Geologobaza) links for 2GIS and Yandex Maps
  const twoGisUrl =
    'https://2gis.kg/osh/search/%D0%9E%D1%88%20%D0%A4%D1%80%D1%83%D0%BD%D0%B7%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%93%D0%B5%D0%BE%D0%BB%D0%BE%D0%B3%D0%BE%D0%B1%D0%B0%D0%B7%D0%B0';
  const yandexMapsUrl =
    'https://yandex.com/maps/?text=%D0%9E%D1%88%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%A4%D1%80%D1%83%D0%BD%D0%B7%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%93%D0%B5%D0%BE%D0%BB%D0%BE%D0%B3%D0%BE%D0%B1%D0%B0%D0%B7%D0%B0&ll=72.798500%2C40.514000&z=14';

  return (
    <section
      id="contacts"
      className="py-12 sm:py-16 bg-[#B7BDC4]/85 dark:bg-[#1E2226]/92 border-t border-slate-500/25 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-[#D9DDE2] dark:bg-[#262B30] rounded-2xl border border-[#8D949C]/50 dark:border-slate-700/80 overflow-hidden grid lg:grid-cols-12">
          <div className="lg:col-span-7 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-[#8D949C]/45 dark:border-slate-700/80">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#23272B] dark:text-white tracking-tight">
                {t.mapTitle}
              </h2>
              <p className="text-sm text-[#3E444A] dark:text-slate-300 mt-1">
                {t.mapSubtitle}
              </p>
            </div>

            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl bg-[#C8CDD3] dark:bg-[#1A1D20] border border-[#8D949C]/50 dark:border-slate-700 overflow-hidden select-none">
              <svg
                viewBox="0 0 100 62"
                className="w-full h-full"
                aria-label={t.mapTitle}
              >
                <rect x="0" y="0" width="100" height="62" fill="#CDD2D8" />
                <rect x="8" y="8" width="28" height="20" rx="2" fill="#BCC2C9" />
                <rect x="64" y="6" width="28" height="20" rx="2" fill="#B4BAC1" />
                <rect x="8" y="38" width="26" height="18" rx="2" fill="#BCC2C9" />
                <rect x="64" y="38" width="28" height="18" rx="2" fill="#BCC2C9" />

                <line x1="0" y1="31" x2="100" y2="31" stroke="#9EA5AE" strokeWidth="4.2" />
                <line
                  x1="0"
                  y1="31"
                  x2="100"
                  y2="31"
                  stroke="#E5E7EB"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                />
                <line x1="48" y1="0" x2="48" y2="62" stroke="#9EA5AE" strokeWidth="2.8" />

                <path
                  d="M 24 40 L 24 31 L 52 31 L 52 27"
                  fill="none"
                  stroke="#434950"
                  strokeWidth="0.95"
                  strokeDasharray="1.6 1.2"
                />
                <path
                  d="M 78 44 L 78 31 L 52 31"
                  fill="none"
                  stroke="#5A6067"
                  strokeOpacity="0.65"
                  strokeWidth="0.9"
                  strokeDasharray="1.6 1.2"
                />

                <text
                  x="8"
                  y="28.3"
                  fontSize="2.5"
                  fontWeight="700"
                  fill="#23272B"
                  fontFamily="sans-serif"
                >
                  ул. Фрунзенская (ор. Геологобаза)
                </text>
              </svg>

              {t.landmarks.map((landmark) => {
                const isSelected = landmark.id === selectedLandmarkId;
                return (
                  <button
                    key={landmark.id}
                    type="button"
                    onClick={() => setSelectedLandmarkId(landmark.id)}
                    style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1 sm:gap-1.5 min-h-[34px] sm:min-h-[38px] px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-transform cursor-pointer whitespace-nowrap shadow-sm border ${
                      landmark.isPrimary
                        ? isSelected
                          ? 'bg-[#434950] text-white border-white/40 scale-105 z-20'
                          : 'bg-[#52585E] text-white border-[#434950] hover:scale-105 z-10'
                        : isSelected
                          ? 'bg-[#52585E] text-white border-[#434950] scale-105 z-20'
                          : 'bg-[#E6E9ED] text-[#23272B] border-[#8D949C] hover:border-[#52585E] z-10'
                    }`}
                  >
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span>{landmark.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <p className="text-xs text-[#4A5056] dark:text-slate-400 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#52585E] dark:text-slate-300 shrink-0" />
                <span>{t.mapHint}</span>
              </p>

              {/* Direct links to 2GIS and Yandex Maps */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={twoGisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-3.5 py-2 rounded-xl bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] text-white border border-[#464C52] dark:border-slate-600 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] shadow-xs"
                >
                  <span>{t.mapOpen2gis}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-200" />
                </a>
                <a
                  href={yandexMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-3.5 py-2 rounded-xl bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] text-white border border-[#464C52] dark:border-slate-600 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] shadow-xs"
                >
                  <span>{t.mapOpenYandex}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-200" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between gap-5 bg-[#D9DDE2] dark:bg-[#262B30]">
            <div className="space-y-4">
              <div className="bg-[#C9CED4] dark:bg-[#2D3134] rounded-xl p-4 border border-[#8D949C]/45 dark:border-slate-700">
                <div className="text-xs font-mono font-semibold text-[#434950] dark:text-slate-300 mb-1">
                  {activeLandmark.walkTime}
                </div>
                <h3 className="text-base font-bold text-[#23272B] dark:text-white">
                  {activeLandmark.name}
                </h3>
                <p className="text-sm text-[#3E444A] dark:text-slate-300 mt-1 leading-relaxed">
                  {activeLandmark.description}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#52585E] dark:text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#4A5056] dark:text-slate-400">
                      {t.addrLabel}
                    </div>
                    <div className="text-sm font-bold text-[#23272B] dark:text-white">
                      {displayAddress}
                    </div>
                    <div className="text-xs text-[#4A5056] dark:text-slate-300 mt-0.5">
                      {t.addrLandmark}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#52585E] dark:text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#4A5056] dark:text-slate-400">
                      {t.hoursLabel}
                    </div>
                    <div className="text-sm font-bold text-[#23272B] dark:text-white font-mono tabular-nums">
                      {t.hoursValue}
                    </div>
                    <div className="text-xs text-[#4A5056] dark:text-slate-300 mt-0.5">
                      {t.hoursNote}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#52585E] dark:text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#4A5056] dark:text-slate-400">
                      {t.phoneLabel}
                    </div>
                    <a
                      href={`tel:${phoneRaw}`}
                      className="text-base font-bold font-mono tabular-nums text-[#23272B] dark:text-white hover:text-[#52585E] dark:hover:text-slate-300 transition-colors"
                    >
                      {phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#52585E] dark:text-slate-300 shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <div>
                    <div className="text-xs font-semibold text-[#4A5056] dark:text-slate-400">
                      {t.instagramLabel}
                    </div>
                    <a
                      href={CLINIC_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#23272B] dark:text-white hover:text-[#52585E] dark:hover:text-slate-300 transition-colors"
                    >
                      {CLINIC_INSTAGRAM_HANDLE}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
