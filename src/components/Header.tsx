import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { ClinicTranslation, Language } from '../data/clinicData';

interface HeaderProps {
  lang: Language;
  t: ClinicTranslation;
  theme: 'light' | 'dark';
  onChangeLang: (lang: Language) => void;
  onToggleTheme: () => void;
}

export function Header({
  lang,
  t,
  theme,
  onChangeLang,
  onToggleTheme,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '#benefits', label: t.navWhy },
    { href: '#services', label: t.navServices },
    { href: '#doctors', label: t.navDoctors },
    { href: '#reviews', label: t.navReviews },
    { href: '#contacts', label: t.navMaps },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#5A6067]/95 dark:bg-[#23272B]/96 backdrop-blur-md border-b border-white/15 transition-colors">
      <div className="w-full max-w-[1440px] mx-auto pl-2.5 pr-3 sm:px-5 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left-aligned Brand + Navigation group */}
        <div className="flex items-center gap-3 sm:gap-7 lg:gap-9 min-w-0">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-white whitespace-nowrap shrink-0 hover:text-slate-100 transition-colors group"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
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
              <path
                d="M8.8 17.2l1.6-1.6M11 18.8l1.6-1.6"
                stroke="#64748B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M8 29l.8 1.9L10.7 31.7l-1.9.8L8 34.4l-.8-1.9-1.9-.8 1.9-.8L8 29z"
                fill="#CBD5E1"
              />
            </svg>
            <span className="flex flex-col leading-none">
              <span className="text-xs sm:text-base font-extrabold tracking-[0.09em] border-y border-white/55 py-0.5 text-white">
                {t.brandName}
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-semibold text-slate-100">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right controls: Day/Night switcher + Language switcher + Mobile menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to night mode' : 'Switch to day mode'}
            title={theme === 'light' ? 'Ночной режим' : 'Дневной режим'}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#4A5056] border border-white/20 text-white hover:border-white/40 hover:bg-[#666D75] transition-all duration-200 active:scale-[0.95] cursor-pointer"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          <div
            className="inline-flex items-center bg-[#484E54] p-0.5 rounded-lg border border-white/20"
            role="group"
            aria-label="Language switcher"
          >
            <button
              type="button"
              onClick={() => onChangeLang('kg')}
              className={`min-h-[36px] min-w-[36px] px-2 sm:px-2.5 text-[11px] sm:text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'kg'
                  ? 'bg-[#737A82] text-white border border-white/25 shadow-xs'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              KG
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('ru')}
              className={`min-h-[36px] min-w-[36px] px-2 sm:px-2.5 text-[11px] sm:text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'ru'
                  ? 'bg-[#737A82] text-white border border-white/25 shadow-xs'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              RU
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-[#4A5056] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Compact animated top-right mobile dropdown popover */}
      <div
        className={`md:hidden absolute right-2 top-[calc(100%+6px)] w-56 rounded-2xl bg-[#5A6067]/96 backdrop-blur-md border border-white/20 p-1.5 shadow-xl origin-top-right transition-all duration-200 ease-out ${
          mobileOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              tabIndex={mobileOpen ? 0 : -1}
              className="flex items-center min-h-[48px] px-3.5 rounded-xl text-sm font-semibold text-white hover:bg-[#4A5056] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
