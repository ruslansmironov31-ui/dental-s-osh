import {
  CLINIC_INSTAGRAM_HANDLE,
  CLINIC_INSTAGRAM_URL,
  ClinicContacts,
  ClinicTranslation,
  Language,
  sanitizePhoneRaw,
} from '../data/clinicData';

interface FooterProps {
  lang: Language;
  t: ClinicTranslation;
  contacts: ClinicContacts;
  onOpenAdminPanel: () => void;
}

export function Footer({ lang, t, contacts, onOpenAdminPanel }: FooterProps) {
  const navLinks = [
    { href: '#benefits', label: t.navWhy },
    { href: '#services', label: t.navServices },
    { href: '#doctors', label: t.navDoctors },
    { href: '#reviews', label: t.navReviews },
    { href: '#contacts', label: t.navMaps },
  ];

  const displayAddress =
    lang === 'kg'
      ? contacts.address_kg || contacts.address || t.addrValue
      : contacts.address || t.addrValue;
  const phoneDisplay = contacts.phone;
  const phoneRaw = sanitizePhoneRaw(contacts.phone);

  return (
    <footer className="bg-[#5A6067] dark:bg-[#23272B] border-t border-white/15 pt-8 pb-20 sm:py-10 transition-colors text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          {/* Clinic Logo & Tagline */}
          <div className="md:col-span-5 space-y-2.5">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-base font-bold tracking-tight text-white hover:text-slate-100 transition-colors"
            >
              <svg
                className="w-6 h-6 shrink-0"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13 8.5C9.4 8.5 7 11.4 7 15.3c0 4 1.8 6.8 2.6 11.3.6 3.5 1.7 6.4 3.3 6.4 1.3 0 2-2.6 3.2-5.2.7-1.4 1.6-2 2.9-2s2.2.6 2.9 2c1.2 2.6 1.9 5.2 3.2 5.2 1.6 0 2.7-2.9 3.3-6.4.8-4.5 2.6-7.3 2.6-11.3 0-3.9-2.4-6.8-6-6.8-2.3 0-4.2 1.3-6 1.3s-3.7-1.3-6-1.3z"
                  stroke="#94A3B8"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#FFFFFF"
                />
                <path
                  d="M12.5 13.5c2.2 1.6 4.7 1.8 7.5.2"
                  stroke="#64748B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6.5 19.5c5.8 5.2 17.5 6.8 26.5 1.8"
                  stroke="#4A5056"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-extrabold tracking-[0.09em] border-y border-white/55 py-0.5 text-white">
                {t.brandName}
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {t.footerTagline}
            </p>
          </div>

          {/* Section Links */}
          <nav
            aria-label="Footer navigation"
            className="md:col-span-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-slate-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Compact Text Reference Info */}
          <div className="md:col-span-3 space-y-1 text-xs sm:text-sm text-slate-200">
            <div className="font-medium text-white">
              {displayAddress}
            </div>
            <div className="font-mono tabular-nums text-slate-200">{t.hoursValue}</div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={`tel:${phoneRaw}`}
                className="font-mono tabular-nums font-semibold text-white hover:underline"
              >
                {phoneDisplay}
              </a>
              <a
                href={CLINIC_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-100 hover:text-white hover:underline"
              >
                {CLINIC_INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & subtle Admin Login link */}
        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-200/85">
          <div>© 2026 Дентал С</div>
          <button
            type="button"
            onClick={onOpenAdminPanel}
            className="inline-flex items-center min-h-[44px] text-slate-200/90 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            {t.footerAdminLink}
          </button>
        </div>
      </div>
    </footer>
  );
}
