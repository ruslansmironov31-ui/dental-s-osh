import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { ClinicContacts, Language, TRANSLATIONS } from './data/clinicData';
import {
  FALLBACK_CONTACTS,
  FALLBACK_SHEET_SERVICES,
  fetchClinicData,
  mapSheetServicesToDisplay,
  readCachedClinicData,
  SheetServiceItem,
} from './services/clinicApi';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ReviewsAndFaqSection } from './components/ReviewsAndFaqSection';
import { RouteMapAndContacts } from './components/RouteMapAndContacts';
import { FloatingControls } from './components/FloatingControls';
import { Footer } from './components/Footer';

const QuickBookingModal = lazy(() =>
  import('./components/QuickBookingModal').then((mod) => ({
    default: mod.QuickBookingModal,
  }))
);

const AdminPanelModal = lazy(() =>
  import('./components/AdminPanelModal').then((mod) => ({
    default: mod.AdminPanelModal,
  }))
);

export default function App() {
  const [lang, setLang] = useState<Language>('kg');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [preselectedDoctor, setPreselectedDoctor] = useState('');

  const [initialCache] = useState(() => readCachedClinicData());
  const [sheetServices, setSheetServices] = useState<SheetServiceItem[]>(
    () => initialCache?.services ?? FALLBACK_SHEET_SERVICES
  );
  const [contacts, setContacts] = useState<ClinicContacts>(
    () => initialCache?.contacts ?? FALLBACK_CONTACTS
  );
  const [hasRemoteData, setHasRemoteData] = useState(() => Boolean(initialCache));

  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetchClinicData()
      .then((data) => {
        if (cancelled) return;
        if (data.services.length > 0) {
          setSheetServices(data.services);
        }
        setContacts(data.contacts);
        setHasRemoteData(true);
      })
      .catch(() => {
        // Fallback / cached clinic data remains active automatically on slow or offline networks
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const finePointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointerMq.matches || reducedMotionMq.matches) {
      return;
    }

    let rafId = 0;
    let latestX = 0;
    let latestY = 0;

    const updateSpotlight = () => {
      rafId = 0;
      const el = spotlightRef.current;
      if (!el) return;
      el.style.setProperty('--x', `${latestX}px`);
      el.style.setProperty('--y', `${latestY}px`);
      el.style.opacity = '1';
    };

    const handleMouseMove = (event: MouseEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateSpotlight);
      }
    };

    const handleMouseLeave = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const t = useMemo(() => {
    const base = TRANSLATIONS[lang];
    const mappedServices = mapSheetServicesToDisplay(
      sheetServices,
      lang,
      base.services
    );
    const updatedFaqs = base.faqs.map((faq) => ({
      ...faq,
      answer: faq.answer.replace(/\+996 556 978 000/g, contacts.phone),
    }));

    return {
      ...base,
      services: mappedServices,
      faqs: updatedFaqs,
    };
  }, [lang, sheetServices, contacts.phone]);

  const handleLanguageChange = (nextLang: Language) => {
    setLang(nextLang);
    document.documentElement.lang = nextLang === 'kg' ? 'ky' : 'ru';
    document.title = TRANSLATIONS[nextLang].metaTitle;
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const openGeneralBooking = () => {
    setPreselectedService('');
    setPreselectedDoctor('');
    setBookingModalOpen(true);
  };

  const openServiceBooking = (serviceName: string) => {
    setPreselectedService(serviceName);
    setPreselectedDoctor('');
    setBookingModalOpen(true);
  };

  const openDoctorBooking = (doctorName: string) => {
    setPreselectedService('');
    setPreselectedDoctor(doctorName);
    setBookingModalOpen(true);
  };

  const handleAdminDataSaved = (
    nextServices: SheetServiceItem[],
    nextContacts: ClinicContacts
  ) => {
    setSheetServices(nextServices);
    setContacts(nextContacts);
    setHasRemoteData(true);
  };

  return (
    <div className="relative min-h-screen bg-dental-pattern text-[#2D3134] dark:text-slate-100 selection:bg-[#2D3134]/20 dark:selection:bg-white/20 selection:text-[#2D3134] dark:selection:text-white transition-colors">
      <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />
      <Header
        lang={lang}
        t={t}
        theme={theme}
        onChangeLang={handleLanguageChange}
        onToggleTheme={handleToggleTheme}
      />

      <main>
        <HeroSection t={t} whatsappNumber={contacts.whatsapp} />
        <TrustSection t={t} />
        <ServicesSection t={t} onSelectService={openServiceBooking} />
        <DoctorsSection t={t} onSelectDoctor={openDoctorBooking} />
        <ReviewsAndFaqSection t={t} />
        <RouteMapAndContacts lang={lang} t={t} contacts={contacts} />
      </main>

      <Footer
        lang={lang}
        t={t}
        contacts={contacts}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
      />

      <FloatingControls t={t} onOpenBooking={openGeneralBooking} />

      {bookingModalOpen && (
        <Suspense fallback={null}>
          <QuickBookingModal
            isOpen={bookingModalOpen}
            initialService={preselectedService}
            initialDoctor={preselectedDoctor}
            t={t}
            contacts={contacts}
            onClose={() => setBookingModalOpen(false)}
          />
        </Suspense>
      )}

      {adminPanelOpen && (
        <Suspense fallback={null}>
          <AdminPanelModal
            isOpen={adminPanelOpen}
            currentServices={sheetServices}
            currentContacts={contacts}
            hasRemoteData={hasRemoteData}
            onClose={() => setAdminPanelOpen(false)}
            onDataSaved={handleAdminDataSaved}
          />
        </Suspense>
      )}
    </div>
  );
}
