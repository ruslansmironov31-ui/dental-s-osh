import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { ClinicTranslation } from '../data/clinicData';

interface FloatingControlsProps {
  t: ClinicTranslation;
  onOpenBooking: () => void;
}

export function FloatingControls({ t, onOpenBooking }: FloatingControlsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const updateScrollState = () => {
      rafId = 0;
      const shouldShow = window.scrollY > 320;
      setShowScrollTop((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll-to-Top circular button in bottom-left corner (48x48px touch target) */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label={t.scrollTopAria}
        title={t.scrollTopAria}
        className={`fixed left-3 bottom-3.5 sm:left-6 sm:bottom-6 z-40 w-12 h-12 rounded-full bg-[#5A6067]/92 dark:bg-[#2A2E32]/95 backdrop-blur-md border border-white/25 text-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#4A5056] hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Floating WhatsApp / Booking CTA in bottom-right corner (>=48x48px touch target) */}
      <div className="fixed right-3 bottom-3.5 sm:right-6 sm:bottom-6 z-40">
        <div className="relative">
          <span
            aria-hidden="true"
            className="cta-pulse-ring absolute inset-0 rounded-full bg-[#52585E]/40 dark:bg-slate-400/25 pointer-events-none"
          />
          <button
            type="button"
            onClick={onOpenBooking}
            aria-label={t.floatingCtaLabel}
            className="relative inline-flex items-center justify-center gap-2 min-w-[48px] h-12 px-3 sm:px-4 rounded-full bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] border border-white/25 text-white font-semibold text-sm shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5 shrink-0 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.03 2C6.5 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.3L2 22l4.85-1.46A9.96 9.96 0 0 0 12.03 22C17.55 22 22 17.52 22 12S17.55 2 12.03 2zm5.8 14.12c-.24.68-1.42 1.3-1.97 1.38-.51.07-1.15.1-1.85-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.29-5.06-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.37 1.46.3.15.47.12.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.34.07.12.07.7-.17 1.38z" />
            </svg>
            <span className="hidden sm:inline whitespace-nowrap">{t.floatingCtaLabel}</span>
          </button>
        </div>
      </div>
    </>
  );
}
