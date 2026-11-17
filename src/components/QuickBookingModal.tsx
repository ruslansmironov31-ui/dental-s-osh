import { useEffect, useRef, useState } from 'react';
import { Check, Copy, MessageCircle, Phone, X } from 'lucide-react';
import {
  buildWhatsAppUrl,
  ClinicContacts,
  ClinicTranslation,
  sanitizePhoneRaw,
} from '../data/clinicData';

interface QuickBookingModalProps {
  isOpen: boolean;
  initialService: string;
  initialDoctor: string;
  t: ClinicTranslation;
  contacts: ClinicContacts;
  onClose: () => void;
}

export function QuickBookingModal({
  isOpen,
  initialService,
  initialDoctor,
  t,
  contacts,
  onClose,
}: QuickBookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [doctor, setDoctor] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [copied, setCopied] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setService(initialService || t.services[0]?.name || '');
    setDoctor(initialDoctor || '');
    setTimeSlot(t.modalTimes[0] || '');
    setShowNameError(false);
    setCopied(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, initialService, initialDoctor, t, onClose]);

  if (!isOpen) return null;

  const trimmedName = name.trim();
  const displayName = trimmedName || t.modalNamePlaceholder.replace(/^[^:]+:\s*/, '');
  const doctorPart = doctor ? t.waDoctorLine.replace('{doctor}', doctor) : '';
  const phonePart = phone.trim() ? ` (${phone.trim()})` : '';
  const generatedMessage = t.waTemplate
    .replace('{name}', displayName)
    .replace('{service}', service || t.services[0]?.name || '')
    .replace('{time}', timeSlot || t.modalTimes[0] || '')
    .replace('{doctor}', doctorPart)
    .replace('{phone}', phonePart);

  const whatsappUrl = buildWhatsAppUrl(generatedMessage, contacts.whatsapp);
  const phoneDisplay = contacts.phone;
  const phoneRaw = sanitizePhoneRaw(contacts.phone);
  const sendWhatsappLabel = t.modalSendWhatsapp.replace(
    /\([^)]*\)/,
    `(${contacts.whatsapp || contacts.phone})`
  );

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable in restricted contexts
    }
  };

  const handleInvalidClick = () => {
    setShowNameError(true);
    nameInputRef.current?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#D9DDE2] dark:bg-[#1E2225] rounded-t-2xl sm:rounded-2xl border border-[#8D949C]/50 dark:border-white/12 shadow-xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/15 bg-[#5A6067] dark:bg-[#222629] text-white">
          <div>
            <h2
              id="booking-modal-title"
              className="text-lg sm:text-xl font-bold text-white"
            >
              {t.modalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">
              {t.modalSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex items-center justify-center w-11 h-11 -mr-2 -mt-1 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label
                htmlFor="modal-patient-name"
                className="block text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
              >
                {t.modalNameLabel} *
              </label>
              <input
                ref={nameInputRef}
                id="modal-patient-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (showNameError && e.target.value.trim()) {
                    setShowNameError(false);
                  }
                }}
                placeholder={t.modalNamePlaceholder}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#2D3134] dark:text-white bg-white dark:bg-[#222629] focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400 ${
                  showNameError
                    ? 'border-red-500'
                    : 'border-[#2D3134]/20 dark:border-white/15'
                }`}
              />
              {showNameError && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {t.modalNameError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="modal-patient-phone"
                className="block text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
              >
                {t.modalPhoneLabel}
              </label>
              <input
                id="modal-patient-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.modalPhonePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 text-sm text-[#2D3134] dark:text-white bg-white dark:bg-[#222629] font-mono focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="modal-service"
              className="block text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
            >
              {t.modalServiceLabel}
            </label>
            <select
              id="modal-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 text-sm text-[#2D3134] dark:text-white bg-white dark:bg-[#222629] focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
            >
              {t.services.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name} ({item.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="modal-doctor"
              className="block text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5"
            >
              {t.modalDoctorLabel}
            </label>
            <select
              id="modal-doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D3134]/20 dark:border-white/15 text-sm text-[#2D3134] dark:text-white bg-white dark:bg-[#222629] focus:outline-none focus:ring-2 focus:ring-[#2D3134] dark:focus:ring-slate-400"
            >
              <option value="">{t.modalDoctorAny}</option>
              {t.doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} — {doc.spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-xs font-semibold text-[#2D3134]/80 dark:text-slate-300 mb-1.5">
              {t.modalTimeLabel}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {t.modalTimes.map((slot) => {
                const isSelected = timeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`min-h-[48px] px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'bg-[#52585E] dark:bg-[#5A6067] border-[#464C52] dark:border-slate-400 text-white'
                        : 'bg-[#ECEFF2] dark:bg-[#222629] border-[#8D949C]/45 dark:border-white/10 text-[#23272B] dark:text-slate-300 hover:border-[#52585E] dark:hover:border-white/25'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#C8CDD3] dark:bg-[#252A2E] rounded-xl p-3.5 border border-[#8D949C]/45 dark:border-white/10">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-semibold text-[#3E444A] dark:text-slate-400">
                {t.modalPreviewLabel}
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#23272B] dark:text-slate-200 hover:text-black dark:hover:text-white cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.modalCopiedText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.modalCopyText}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#23272B] dark:text-slate-200 leading-relaxed">
              {generatedMessage}
            </p>
          </div>

          {trimmedName ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] text-white font-semibold text-sm sm:text-base py-3.5 px-5 rounded-xl border border-[#464C52] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>{sendWhatsappLabel}</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={handleInvalidClick}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] text-white font-semibold text-sm sm:text-base py-3.5 px-5 rounded-xl border border-[#464C52] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>{sendWhatsappLabel}</span>
            </button>
          )}

          <div className="pt-1 text-center text-xs text-[#2D3134]/65 dark:text-slate-400">
            <span>{t.modalOrCall} </span>
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center gap-1 font-mono font-semibold text-[#2D3134] dark:text-slate-200 hover:underline"
            >
              <Phone className="w-3.5 h-3.5 text-[#4A5056] dark:text-slate-300" />
              <span>{phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
