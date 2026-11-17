import { useEffect, useState } from 'react';
import { ArrowDown, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildWhatsAppUrl, ClinicTranslation, HERO_SLIDES } from '../data/clinicData';

interface HeroSectionProps {
  t: ClinicTranslation;
  whatsappNumber?: string;
}

export function HeroSection({ t, whatsappNumber }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const whatsappBookUrl = buildWhatsAppUrl(t.waDefaultMsg, whatsappNumber);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeSlide] ?? HERO_SLIDES[0];

  return (
    <section
      id="top"
      className="relative pt-14 sm:pt-20 min-h-[630px] sm:min-h-[610px] lg:min-h-[650px] flex flex-col justify-end sm:justify-center overflow-hidden bg-[#7D838A]"
    >
      {/* Full-bleed Hero Slideshow */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.src}
            srcSet={slide.srcSet}
            sizes="100vw"
            alt={slide.alt}
            referrerPolicy="no-referrer"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
            className={`absolute inset-0 w-full h-full object-cover ${slide.positionClass} transition-opacity duration-700 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Balanced medium-gray directional scrim: keeps doctor's face unobstructed while left & bottom typography stays sharp */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#454B52]/90 via-[#585F67]/48 via-36% to-transparent sm:bg-gradient-to-r sm:from-[#484E55]/82 sm:via-[#5E656D]/40 sm:via-45% sm:to-transparent" />
      </div>

      {/* Overlaid Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-10 pt-72 sm:pt-8 pb-5 sm:pb-12 flex flex-col justify-between sm:min-h-[540px]">
        {/* Desktop-only top badge pinned at very top of Hero; hidden on smartphones */}
        <div className="hidden sm:flex justify-start pb-6">
          <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-[#52585E]/82 border border-white/25 text-white text-xs sm:text-sm font-medium shadow-xs">
            <Award className="w-4 h-4 text-slate-200 shrink-0" />
            <span>{t.heroBadgeText}</span>
          </p>
        </div>

        <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-start text-left space-y-2.5 sm:space-y-4">
          <h1 className="text-[28px] sm:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.1] tracking-tight text-balance break-words drop-shadow-sm">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-xl lg:text-2xl text-slate-100 font-medium leading-snug max-w-xl drop-shadow-xs">
            {t.heroSubtitle}
          </p>

          {/* Balanced mid-gray buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 w-full">
            <a
              href="#doctors"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] backdrop-blur-md bg-[#52585E]/90 hover:bg-[#43494F] text-white font-semibold text-xs sm:text-base px-4 sm:px-6 py-3 rounded-2xl border border-white/28 shadow-[0_8px_22px_-6px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.22)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] whitespace-nowrap shrink-0"
            >
              <span>{t.heroCtaSpecialist}</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-200" />
            </a>

            <a
              href={whatsappBookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[48px] backdrop-blur-md bg-[#636A71]/85 hover:bg-[#52585E] text-white font-semibold text-xs sm:text-base px-4 sm:px-6 py-3 rounded-2xl border border-white/28 shadow-[0_8px_22px_-6px_rgba(0,0,0,0.32),inset_0_1px_1px_rgba(255,255,255,0.22)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] whitespace-nowrap shrink-0"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.03 2C6.5 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3L2 22l4.85-1.46A9.96 9.96 0 0 0 12.03 22C17.55 22 22 17.52 22 12S17.55 2 12.03 2zm5.8 14.12c-.24.68-1.42 1.3-1.97 1.38-.51.07-1.15.1-1.85-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.29-5.06-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.37 1.46.3.15.47.12.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.34.07.12.07.7-.17 1.38z" />
              </svg>
              <span>{t.heroCtaWhatsapp}</span>
            </a>
          </div>

          <p className="text-[11px] sm:text-sm text-slate-100/95 font-medium">
            {t.heroPromise}
          </p>
        </div>

        {/* Bottom row: slideshow controls */}
        <div className="mt-5 sm:mt-8 pt-4 sm:pt-5 border-t border-white/20 flex items-center justify-end">
          <div className="flex items-center gap-1 sm:gap-1.5 backdrop-blur-md bg-[#52585E]/80 px-1.5 py-1 rounded-full border border-white/25">
            <button
              type="button"
              onClick={() =>
                setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              aria-label="Previous hero slide"
              className="w-9 h-9 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-1">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={slide.alt}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    index === activeSlide
                      ? 'w-5 bg-white'
                      : 'w-2 bg-white/45 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              aria-label="Next hero slide"
              className="w-9 h-9 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
