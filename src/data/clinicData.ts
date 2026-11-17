import founderHeroDesktop from '../assets/images/founder_hero_gray_1280.webp';
import founderHeroMobile from '../assets/images/founder_hero_gray_640.webp';
import ruslanGrayDesktop from '../assets/images/doctor_ruslan_gray_1280.webp';
import ruslanGrayMobile from '../assets/images/doctor_ruslan_gray_640.webp';
import sergeyGrayDesktop from '../assets/images/doctor_sergey_gray_1280.webp';
import sergeyGrayMobile from '../assets/images/doctor_sergey_gray_640.webp';

export type Language = 'kg' | 'ru';
export type ServiceCategory = 'all' | 'treat' | 'surg' | 'kids';
export type LandmarkId = 'clinic' | 'geologobaza' | 'branch2' | 'branch3';

export interface HeroSlideItem {
  id: string;
  src: string;
  srcSet: string;
  alt: string;
  positionClass: string;
  isFounder?: boolean;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-founder',
    src: founderHeroDesktop,
    srcSet: `${founderHeroMobile} 640w, ${founderHeroDesktop} 1280w`,
    alt: 'Главный врач стоматологической клиники «Дентал С»',
    positionClass: 'object-[77%_4%] sm:object-[74%_10%]',
    isFounder: true,
  },
  {
    id: 'slide-1',
    src: ruslanGrayDesktop,
    srcSet: `${ruslanGrayMobile} 640w, ${ruslanGrayDesktop} 1280w`,
    alt: 'Руслан Сабуров — врач-стоматолог Дентал С',
    positionClass: 'object-[76%_8%] sm:object-[72%_16%]',
  },
  {
    id: 'slide-2',
    src: sergeyGrayDesktop,
    srcSet: `${sergeyGrayMobile} 640w, ${sergeyGrayDesktop} 1280w`,
    alt: 'Сергей Морозов — хирург-имплантолог Дентал С',
    positionClass: 'object-[76%_8%] sm:object-[72%_16%]',
  },
];

export const CLINIC_PHONE_RAW = '+996556978000';
export const CLINIC_PHONE_DISPLAY = '+996 556 978 000';
export const CLINIC_WHATSAPP_NUMBER = '996556978000';
export const CLINIC_INSTAGRAM_HANDLE = '@dental.c.kg';
export const CLINIC_INSTAGRAM_URL = 'https://www.instagram.com/dental.c.kg/';

export interface ClinicContacts {
  phone: string;
  whatsapp: string;
  address: string;
  address_kg?: string;
}

export function sanitizePhoneRaw(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned) return CLINIC_PHONE_RAW;
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
}

export function sanitizeWhatsAppDigits(whatsappOrPhone: string): string {
  const digits = whatsappOrPhone.replace(/\D/g, '');
  return digits || CLINIC_WHATSAPP_NUMBER;
}

export interface ServiceItem {
  id: string;
  cat: Exclude<ServiceCategory, 'all'>;
  categoryLabel: string;
  name: string;
  desc: string;
  price: string;
  duration: string;
}

export interface DoctorItem {
  id: string;
  name: string;
  spec: string;
  exp: string;
  bio: string;
  photo: string;
  photoSrcSet?: string;
  photoPosition?: string;
  initials: string;
  isFounder?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  from: string;
  service: string;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface LandmarkItem {
  id: LandmarkId;
  name: string;
  shortLabel: string;
  walkTime: string;
  description: string;
  x: number;
  y: number;
  isPrimary?: boolean;
}

export interface ClinicTranslation {
  metaTitle: string;
  brandName: string;
  brandSub: string;
  navWhy: string;
  navServices: string;
  navDoctors: string;
  navReviews: string;
  navMaps: string;
  typingLabel: string;
  floatingCtaLabel: string;
  scrollTopAria: string;
  footerTagline: string;
  footerAdminLink: string;
  adminModalTitle: string;
  adminModalText: string;
  adminModalClose: string;
  btnBookShort: string;
  heroBadgeText: string;
  heroFounderCaption: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPromise: string;
  heroCtaSpecialist: string;
  heroCtaWhatsapp: string;
  stats: { value: string; label: string }[];
  whyTitle: string;
  whySubtitle: string;
  whySolutionBadge: string;
  fears: { num: string; pain: string; solution: string }[];
  servicesTitle: string;
  servicesSubtitle: string;
  filters: { id: ServiceCategory; label: string }[];
  services: ServiceItem[];
  btnBookService: string;
  freeConsultTitle: string;
  freeConsultDesc: string;
  freeConsultBtn: string;
  doctorsTitle: string;
  doctorsSubtitle: string;
  doctors: DoctorItem[];
  btnBookDoctor: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  reviews: ReviewItem[];
  faqTitle: string;
  faqSubtitle: string;
  faqs: FaqItem[];
  mapTitle: string;
  mapSubtitle: string;
  mapHint: string;
  landmarks: LandmarkItem[];
  mapOpen2gis: string;
  mapOpenYandex: string;
  addrLabel: string;
  addrValue: string;
  addrLandmark: string;
  hoursLabel: string;
  hoursValue: string;
  hoursNote: string;
  phoneLabel: string;
  instagramLabel: string;
  btnCallNow: string;
  modalTitle: string;
  modalSubtitle: string;
  modalNameLabel: string;
  modalNamePlaceholder: string;
  modalNameError: string;
  modalPhoneLabel: string;
  modalPhonePlaceholder: string;
  modalServiceLabel: string;
  modalDoctorLabel: string;
  modalDoctorAny: string;
  modalTimeLabel: string;
  modalTimes: string[];
  modalPreviewLabel: string;
  modalSendWhatsapp: string;
  modalCopyText: string;
  modalCopiedText: string;
  modalOrCall: string;
  footerCity: string;
  footerNote: string;
  waDefaultMsg: string;
  waTemplate: string;
  waDoctorLine: string;
}

export function buildWhatsAppUrl(message: string, whatsappNumber?: string): string {
  const digits = whatsappNumber
    ? sanitizeWhatsAppDigits(whatsappNumber)
    : CLINIC_WHATSAPP_NUMBER;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const TRANSLATIONS: Record<Language, ClinicTranslation> = {
  kg: {
    metaTitle: 'ДЕНТАЛ С — Ош шаарындагы стоматологиялык клиникалар тармагы',
    brandName: 'ДЕНТАЛ С',
    brandSub: 'Ош · 3 клиника',
    navWhy: 'Биз жөнүндө',
    navServices: 'Биздин кызматтар',
    navDoctors: 'Дарыгерлер',
    navReviews: 'Пикирлер',
    navMaps: 'Карталар',
    typingLabel: 'Жазып жатат',
    floatingCtaLabel: 'Жазылуу',
    scrollTopAria: 'Жогоруга',
    footerTagline: 'Дентал С — Ош шаарындагы 3 клиникадан турган тармак',
    footerAdminLink: 'Администратор үчүн кирүү',
    adminModalTitle: 'Администратор бөлүмү',
    adminModalText: 'Клиниканын ички бөлүмүнө кирүү кызматкерлер үчүн гана жеткиликтүү.',
    adminModalClose: 'Жабуу',
    btnBookShort: 'Кабыл алууга жазылуу',
    heroBadgeText: 'Ош шаарындагы 3 клиникадан турган тармак',
    heroFounderCaption: 'Башкы дарыгер',
    heroTitle: 'Ооруусуз дени сак тиштер',
    heroSubtitle: 'Сиздин жылмаюуңуз — биздин жоопкерчилик',
    heroPromise: 'Ош ш., Фрунзенская көч. (багыты: Геологобаза)',
    heroCtaSpecialist: 'Адис тандоо',
    heroCtaWhatsapp: 'Кабыл алууга жазылуу',
    stats: [],
    whyTitle: 'Эмне үчүн Ош тургундары «Дентал С»ти тандашат?',
    whySubtitle: 'Ош шаарындагы 3 клиникадан турган тармак — тажрыйба, сапат жана ишеним.',
    whySolutionBadge: '«Дентал С» тармагы чечим табат',
    fears: [
      {
        num: '01',
        pain: 'Тишиңиз ооруп, бирок ишенимдүү дарыгер таба албай жатасызбы?',
        solution: 'Дарыгерлерибиздин стоматология тармагында чоң тажрыйбасы бар.',
      },
      {
        num: '02',
        pain: 'Баалар өтө эле кымбат болуп жатабы?',
        solution: 'Бизде баалар кымбат эмес жана бөлүп төлөө мүмкүнчүлүгү бар.',
      },
      {
        num: '03',
        pain: 'Эч ким ишине кепилдик бербейби?',
        solution: 'Биз 1 жылдан баштап кепилдик беребиз.',
      },
      {
        num: '04',
        pain: 'Кимге ишенсе болот?',
        solution: 'Биздин клиника Ош шаарынын тургундарынын ишенимине ээ болгон.',
      },
    ],
    servicesTitle: 'Биздин кызматтар жана баалар',
    servicesSubtitle: 'Бардык баалар сом менен ачык жазылган.',
    filters: [
      { id: 'all', label: 'Баары' },
      { id: 'treat', label: 'Дарылоо жана тазалоо' },
      { id: 'surg', label: 'Жулуу жана коронка' },
      { id: 'kids', label: 'Балдарга жана брекет' },
    ],
    services: [
      {
        id: 'checkup',
        cat: 'treat',
        categoryLabel: 'Кароо',
        name: 'Алгачкы кароо жана кеңеш',
        desc: 'Бардык тиштерди текшерүү жана так баасын эсептөө',
        price: '1 000 сомдон',
        duration: '20 мүн',
      },
      {
        id: 'caries',
        cat: 'treat',
        categoryLabel: 'Дарылоо',
        name: 'Курт жеген тишти дарылоо (кариес) жана пломба',
        desc: 'Оорутпай тазалап, тиштин өңүндөй жылмакай пломба коёбуз',
        price: '7 500 сом',
        duration: '40–60 мүн',
      },
      {
        id: 'canals',
        cat: 'treat',
        categoryLabel: 'Сактоо',
        name: 'Тиштин тамырын дарылап, сактап калуу',
        desc: 'Тиш катуу ооруса — каналдарын тазалап, тишти сактайбыз',
        price: '12 000 сомдон',
        duration: '60 мүн',
      },
      {
        id: 'cleaning',
        cat: 'treat',
        categoryLabel: 'Тазалоо',
        name: 'Тишти таштан жана тактардан аяр тазалоо',
        desc: 'Тиш ташын, чай жана кофенин сары тактарын оорутпай кетиребиз',
        price: '10 000 сом',
        duration: '45 мүн',
      },
      {
        id: 'extraction',
        cat: 'surg',
        categoryLabel: 'Жулуу',
        name: 'Тишти оорутпай тез жулуу',
        desc: 'Жумшак укол менен тынч жана тез алуу',
        price: '6 000 сомдон',
        duration: '20–30 мүн',
      },
      {
        id: 'crowns',
        cat: 'surg',
        categoryLabel: 'Протез',
        name: 'Бекем коронкалар жана протездер',
        desc: 'Сынган же түшкөн тиштерди ыңгайлуу калыбына келтиребиз',
        price: '28 000 сомдон',
        duration: '2–3 жолу келүү',
      },
      {
        id: 'kids-care',
        cat: 'kids',
        categoryLabel: 'Балдарга',
        name: 'Балдар тиш дарыгери — көз жашсыз дарылоо',
        desc: 'Сүт тиштерди аяр дарылап, аягында белек беребиз',
        price: '5 000 сомдон',
        duration: '30 мүн',
      },
      {
        id: 'braces',
        cat: 'kids',
        categoryLabel: 'Түздөө',
        name: 'Тиштерди түздөө (брекет коюу)',
        desc: 'Өспүрүмдөр жана чоңдор үчүн тегиз, сулуу жылмаюу',
        price: 'кеңеш 1 000 сомдон',
        duration: '30 мүн',
      },
    ],
    btnBookService: 'Жазылуу',
    freeConsultTitle: 'Алгачкы кароо — 1 000 сомдон',
    freeConsultDesc:
      'Дарыгер тиштериңизди карап чыгып, дарылоонун так планын жана баасын сом менен айтат.',
    freeConsultBtn: 'Кароого жазылуу',
    doctorsTitle: 'Биздин дарыгерлер',
    doctorsSubtitle: 'КММАнын мыкты бүтүрүүчүлөрү жана тажрыйбалуу адистер.',
    doctors: [
      {
        id: 'founder',
        name: 'Башкы дарыгер',
        spec: 'Стоматолог-ортопед, терапевт · КММА кызыл диплому',
        exp: '«Дентал С» клиникасынын башкы дарыгери',
        bio: 'КММАны кызыл диплом менен бүтүргөн жогорку категориядагы адис. Бардык татаалдыктагы тиштерди аяр дарылайт жана калыбына келтирет.',
        photo: '/assets/aistudio/Gemini_Generated_Image_np5fc8np5fc8np5f_1fd28e0f.jpg',
        photoPosition: 'object-bottom',
        initials: 'ДС',
        isFounder: true,
      },
      {
        id: 'ruslan',
        name: 'Руслан Сабуров',
        spec: 'Стоматолог-терапевт · Дарылоо жана протездөө',
        exp: 'Тажрыйбасы 11 жыл',
        bio: 'Татаал тиштерди сактап калат, ар бир кадамды шашпай түшүндүрөт.',
        photo: ruslanGrayMobile,
        photoSrcSet: `${ruslanGrayMobile} 640w, ${ruslanGrayDesktop} 1280w`,
        photoPosition: 'object-[76%_16%]',
        initials: 'РС',
      },
      {
        id: 'sergey',
        name: 'Сергей Морозов',
        spec: 'Хирург-имплантолог · Жулуу жана имплант',
        exp: 'Тажрыйбасы 10 жыл',
        bio: 'Имплантация жана татаал операцияларды оорутпай, сапаттуу жасайт.',
        photo: sergeyGrayMobile,
        photoSrcSet: `${sergeyGrayMobile} 640w, ${sergeyGrayDesktop} 1280w`,
        photoPosition: 'object-[76%_12%]',
        initials: 'СМ',
      },
    ],
    btnBookDoctor: 'Дарыгерге жазылуу',
    reviewsTitle: 'Бейтаптардын пикирлери',
    reviewsSubtitle: 'Ош шаарынын тургундарынын клиникабыз тууралуу пикирлери.',
    reviews: [
      {
        id: 'rev-1',
        author: 'Айнура Э.',
        from: 'Ош ш., Геологобаза',
        service: 'Дарылоо',
        text: 'Уколду сездирбей сайышты, пломбасы өз тишимдей. Үй-бүлөбүз менен көп жылдан бери Дентал Ске келебиз.',
      },
      {
        id: 'rev-2',
        author: 'Улугбек М.',
        from: 'Ош ш., борбор',
        service: 'Имплантация',
        text: 'Башкы дарыгерге чоң рахмат! Абдан так, сылык жана ооруусуз дарылайт экен.',
      },
      {
        id: 'rev-3',
        author: 'Гүлнара Т.',
        from: 'Ош ш., Түштүк-Чыгыш',
        service: 'Тазалоо',
        text: 'Абдан таза, аспаптарды көзүңчө алышат экен. Ошто 3 филиалы бар экени абдан ыңгайлуу.',
      },
    ],
    faqTitle: 'Көп берилүүчү суроолор',
    faqSubtitle: 'Кабыл алууга келердин алдындагы негизги жооптор.',
    faqs: [
      {
        id: 'faq-pain',
        question: 'Тиш дарылоо чындап эле оорутпайбы?',
        answer:
          'Ооба. Алгач бүйлөгө гель сүйкөп, анан ичке ийне менен укол сайабыз — оору сезилбейт.',
      },
      {
        id: 'faq-price',
        question: 'Дарылоо бүткөндө баасы кымбаттап кетпейби?',
        answer:
          'Жок. Алгачкы кароодон кийин дарыгер так суммасын айтат — кошумча акы кошулбайт.',
      },
      {
        id: 'faq-guarantee',
        question: 'Дарылоого кепилдик барбы?',
        answer:
          'Ооба, биз сапатка ишенебиз жана коронкалар менен дарылоого 1 жылдан баштап кепилдик беребиз.',
      },
      {
        id: 'faq-urgent',
        question: 'Тишим катуу ооруп жатат, бүгүн кабыл аласыздарбы?',
        answer:
          'Ооба. WhatsAppка же +996 556 978 000 номерине чалыңыз — Оштогу жакынкы филиалыбызда кабыл алабыз.',
      },
    ],
    mapTitle: 'Карталар жана дарегибиз (Ош ш.)',
    mapSubtitle: 'Ош шаарындагы 3 клиникадан турган тармак — негизги дарек Фрунзенская көчөсүндө (багыты: Геологобаза).',
    mapHint: 'Белгини басып, багытты көрүңүз',
    landmarks: [
      {
        id: 'clinic',
        name: '«ДЕНТАЛ С» — башкы клиника',
        shortLabel: 'Дентал С',
        walkTime: 'Фрунзенская көч. (Геологобаза)',
        description: 'Ош ш., Фрунзенская көчөсү, Геологобаза багытында.',
        x: 52,
        y: 44,
        isPrimary: true,
      },
      {
        id: 'geologobaza',
        name: 'Геологобаза багыты',
        shortLabel: 'Геологобаза',
        walkTime: '1 мүнөт жөө',
        description: 'Фрунзенская көчөсүндөгү башкы ориентир, унаа токтотуучу жай бар.',
        x: 24,
        y: 64,
      },
      {
        id: 'branch2',
        name: '«Дентал С» тармагы — 3 клиника',
        shortLabel: '3 филиал (Ош)',
        walkTime: 'Ош шаары боюнча',
        description: 'Шаардын ар кайсы райондорунда 3 заманбап филиал кызмат көрсөтөт.',
        x: 78,
        y: 28,
      },
      {
        id: 'branch3',
        name: 'Коомдук транспорт аялдамасы',
        shortLabel: 'Аялдама',
        walkTime: '2 мүнөт жөө',
        description: 'Фрунзенская көчөсүндөгү маршрутка аялдамасынан 150 м.',
        x: 78,
        y: 72,
      },
    ],
    mapOpen2gis: '2GISтен ачуу',
    mapOpenYandex: 'Яндекс Картадан ачуу',
    addrLabel: 'Дарегибиз (Ош ш. — 3 клиникадан турган тармак)',
    addrValue: 'Ош ш., Фрунзенская көч. (багыты: Геологобаза)',
    addrLandmark: 'Ош шаарындагы 3 клиникадан турган тармак · Башкы филиал Геологобазада',
    hoursLabel: 'Иш убактысы',
    hoursValue: 'Дш–Иш: 09:00 – 19:00',
    hoursNote: 'Жекшемби — ооругандар алдын ала жазылуу менен',
    phoneLabel: 'Телефон жана WhatsApp',
    instagramLabel: 'Instagram',
    btnCallNow: 'Чалуу',
    modalTitle: 'WhatsApp аркылуу жазылуу',
    modalSubtitle: 'Атыңызды жазыңыз — «Дентал С» клиникасынын WhatsApp чаты дароо ачылат.',
    modalNameLabel: 'Сиздин атыңыз',
    modalNamePlaceholder: 'Мисалы: Айгүл',
    modalNameError: 'Сураныч, атыңызды жазыңыз',
    modalPhoneLabel: 'Телефон номериңиз (милдеттүү эмес)',
    modalPhonePlaceholder: '0556 ...',
    modalServiceLabel: 'Кандай кызмат керек?',
    modalDoctorLabel: 'Дарыгерди тандоо',
    modalDoctorAny: 'Ким бош болсо (тезирээк)',
    modalTimeLabel: 'Ыңгайлуу убакыт',
    modalTimes: ['Бүгүн (тез)', 'Эртең менен', 'Түштөн кийин', 'Кечинде'],
    modalPreviewLabel: 'WhatsApp билдирүүсү:',
    modalSendWhatsapp: 'WhatsAppты ачуу (+996 556 978 000)',
    modalCopyText: 'Көчүрүү',
    modalCopiedText: 'Көчүрүлдү!',
    modalOrCall: 'Же түз чалыңыз:',
    footerCity: 'Ош ш., Фрунзенская көч. (багыты: Геологобаза)',
    footerNote: 'Сиздин жылмаюуңуз — биздин жоопкерчилик',
    waDefaultMsg: 'Саламатсызбы! «Дентал С» стоматологиясына кабыл алууга жазылайын дедим эле.',
    waTemplate: 'Саламатсызбы! Менин атым {name}. Жазылайын дедим эле: {service}. Убактысы: {time}.{doctor}{phone}',
    waDoctorLine: ' Дарыгер: {doctor}.',
  },

  ru: {
    metaTitle: 'ДЕНТАЛ С — Сеть стоматологических клиник в г. Ош',
    brandName: 'ДЕНТАЛ С',
    brandSub: 'г. Ош · 3 клиники',
    navWhy: 'О нас',
    navServices: 'Наши услуги',
    navDoctors: 'Наши врачи',
    navReviews: 'Отзывы',
    navMaps: 'Карты',
    typingLabel: 'Печатает',
    floatingCtaLabel: 'Записаться',
    scrollTopAria: 'Наверх',
    footerTagline: 'Дентал С — сеть из 3 стоматологических клиник в г. Ош',
    footerAdminLink: 'Вход для администратора',
    adminModalTitle: 'Вход для администратора',
    adminModalText: 'Внутренний раздел клиники «Дентал С» предназначен только для сотрудников.',
    adminModalClose: 'Закрыть',
    btnBookShort: 'Запись на приём',
    heroBadgeText: 'Сеть из 3 клиник в г. Ош',
    heroFounderCaption: 'Главный врач клиники',
    heroTitle: 'Здоровые зубы без боли',
    heroSubtitle: 'Ваша улыбка — наша ответственность',
    heroPromise: 'г. Ош, ул. Фрунзенская (ор. Геологобаза)',
    heroCtaSpecialist: 'Подобрать специалиста',
    heroCtaWhatsapp: 'Запись на приём',
    stats: [],
    whyTitle: 'Почему жители Оша выбирают «Дентал С»?',
    whySubtitle: 'Сеть из 3 клиник в городе Ош — проверенный опыт, честные цены и доверие тысяч семей.',
    whySolutionBadge: 'Сеть клиник «Дентал С» поможет',
    fears: [
      {
        num: '01',
        pain: 'Болят зубы, но не можете найти хорошего врача?',
        solution: 'У наших врачей большой опыт в сфере стоматологии.',
      },
      {
        num: '02',
        pain: 'Цены слишком дорогие?',
        solution: 'У нас недорогие цены и есть возможность рассрочки.',
      },
      {
        num: '03',
        pain: 'Ни у кого нет гарантии?',
        solution: 'Мы даём гарантию от одного года.',
      },
      {
        num: '04',
        pain: 'Кому можно доверять?',
        solution: 'Наша клиника заслужила доверие жителей города Ош.',
      },
    ],
    servicesTitle: 'Наши услуги и цены в сомах',
    servicesSubtitle: 'Простым языком — вы заранее знаете точную стоимость лечения.',
    filters: [
      { id: 'all', label: 'Все услуги' },
      { id: 'treat', label: 'Лечение и чистка' },
      { id: 'surg', label: 'Удаление и коронки' },
      { id: 'kids', label: 'Детям и брекеты' },
    ],
    services: [
      {
        id: 'checkup',
        cat: 'treat',
        categoryLabel: 'Осмотр',
        name: 'Первичный осмотр и консультация',
        desc: 'Осмотр всех зубов, понятное объяснение и точный расчёт стоимости',
        price: 'от 1 000 сом',
        duration: '20 мин',
      },
      {
        id: 'caries',
        cat: 'treat',
        categoryLabel: 'Лечение',
        name: 'Лечение кариеса и прочная пломба',
        desc: 'Убираем повреждение без боли и ставим пломбу в цвет зуба',
        price: '7 500 сом',
        duration: '40–60 мин',
      },
      {
        id: 'canals',
        cat: 'treat',
        categoryLabel: 'Спасение зуба',
        name: 'Лечение каналов и сохранение зуба',
        desc: 'Чистим корни при острой боли и спасаем зуб от удаления',
        price: 'от 12 000 сом',
        duration: '60 мин',
      },
      {
        id: 'cleaning',
        cat: 'treat',
        categoryLabel: 'Чистка',
        name: 'Бережная чистка зубов от камня и налёта',
        desc: 'Убираем зубной камень и тёмный налёт без царапин',
        price: '10 000 сом',
        duration: '45 мин',
      },
      {
        id: 'extraction',
        cat: 'surg',
        categoryLabel: 'Удаление',
        name: 'Быстрое удаление зуба без боли',
        desc: 'Спокойное удаление с надёжной заморозкой',
        price: 'от 6 000 сом',
        duration: '20–30 мин',
      },
      {
        id: 'crowns',
        cat: 'surg',
        categoryLabel: 'Протезирование',
        name: 'Прочные коронки и удобные протезы',
        desc: 'Восстанавливаем зубы, чтобы было удобно жевать и улыбаться',
        price: 'от 28 000 сом',
        duration: '2–3 визита',
      },
      {
        id: 'kids-care',
        cat: 'kids',
        categoryLabel: 'Детям',
        name: 'Детский стоматолог без слёз',
        desc: 'Бережно лечим молочные зубки и дарим подарок',
        price: 'от 5 000 сом',
        duration: '30 мин',
      },
      {
        id: 'braces',
        cat: 'kids',
        categoryLabel: 'Прикус',
        name: 'Выравнивание зубов (брекеты)',
        desc: 'Ровные зубы и красивая улыбка для подростков и взрослых',
        price: 'осмотр от 1 000 сом',
        duration: '30 мин',
      },
    ],
    btnBookService: 'Записаться',
    freeConsultTitle: 'Первичный осмотр — от 1 000 сом',
    freeConsultDesc:
      'Врач спокойно осмотрит зубы и назовёт точную стоимость в сомах до начала любого лечения.',
    freeConsultBtn: 'Записаться на осмотр',
    doctorsTitle: 'Наши врачи',
    doctorsSubtitle: 'Опытные специалисты стоматологической сети клиник «Дентал С».',
    doctors: [
      {
        id: 'founder',
        name: 'Главный врач',
        spec: 'Стоматолог-ортопед, терапевт · Красный диплом КГМА',
        exp: 'Главный врач клиники «Дентал С»',
        bio: 'Выпускник КГМА с красным дипломом. Проводит комплексное лечение, протезирование и бережное восстановление зубов любой сложности.',
        photo: '/assets/aistudio/Gemini_Generated_Image_np5fc8np5fc8np5f_1fd28e0f.jpg',
        photoPosition: 'object-bottom',
        initials: 'ДС',
        isFounder: true,
      },
      {
        id: 'ruslan',
        name: 'Руслан Сабуров',
        spec: 'Стоматолог-терапевт · Лечение и протезирование',
        exp: 'Стаж 11 лет',
        bio: 'Спасает сложные зубы, показывает снимок и работает максимально аккуратно.',
        photo: ruslanGrayMobile,
        photoSrcSet: `${ruslanGrayMobile} 640w, ${ruslanGrayDesktop} 1280w`,
        photoPosition: 'object-[76%_16%]',
        initials: 'РС',
      },
      {
        id: 'sergey',
        name: 'Сергей Морозов',
        spec: 'Хирург-имплантолог · Удаление и имплантация',
        exp: 'Стаж 10 лет',
        bio: 'Проводит имплантацию и сложные операции без боли с аккуратным восстановлением.',
        photo: sergeyGrayMobile,
        photoSrcSet: `${sergeyGrayMobile} 640w, ${sergeyGrayDesktop} 1280w`,
        photoPosition: 'object-[76%_12%]',
        initials: 'СМ',
      },
    ],
    btnBookDoctor: 'Записаться к врачу',
    reviewsTitle: 'Отзывы пациентов',
    reviewsSubtitle: 'Отзывы жителей города Ош о лечении в нашей сети клиник.',
    reviews: [
      {
        id: 'rev-1',
        author: 'Айнура Э.',
        from: 'г. Ош, р-н Геологобаза',
        service: 'Лечение',
        text: 'Укол даже не почувствовала, пломба аккуратная и цена вышла ровно как сказали сначала.',
      },
      {
        id: 'rev-2',
        author: 'Улугбек М.',
        from: 'г. Ош, центр',
        service: 'Имплантация',
        text: 'Огромная благодарность главному врачу! Всё прошло чётко, аккуратно и абсолютно без боли.',
      },
      {
        id: 'rev-3',
        author: 'Гулнара Т.',
        from: 'г. Ош, Юго-Восток',
        service: 'Чистка',
        text: 'Очень чисто, инструменты достают из стерильных пакетов при тебе. Удобно, что в Оше сразу 3 клиники.',
      },
    ],
    faqTitle: 'Частые вопросы',
    faqSubtitle: 'Короткие ответы на главные вопросы перед приёмом.',
    faqs: [
      {
        id: 'faq-pain',
        question: 'Правда ли, что лечение проходит без боли?',
        answer:
          'Да. Сначала наносим обезболивающий гель на десну, затем делаем мягкий укол тонкой иглой.',
      },
      {
        id: 'faq-price',
        question: 'Не вырастет ли цена после приёма?',
        answer:
          'Нет. На первичном осмотре врач называет точную сумму заранее, без скрытых доплат.',
      },
      {
        id: 'faq-guarantee',
        question: 'Есть ли гарантия на лечение?',
        answer:
          'Да, мы уверены в качестве и даём гарантию от одного года на коронки и лечение.',
      },
      {
        id: 'faq-urgent',
        question: 'У меня острая боль — примете сегодня?',
        answer:
          'Да, звоните на +996 556 978 000 или пишите в WhatsApp — примем в ближайшей клинике нашей сети в г. Ош.',
      },
    ],
    mapTitle: 'Карты и адрес клиники в г. Ош',
    mapSubtitle: 'Сеть из 3 стоматологических клиник в городе Ош — главный филиал на ул. Фрунзенская (ор. Геологобаза).',
    mapHint: 'Нажмите на метку для ориентира',
    landmarks: [
      {
        id: 'clinic',
        name: 'Стоматология «ДЕНТАЛ С»',
        shortLabel: 'Дентал С',
        walkTime: 'ул. Фрунзенская (ор. Геологобаза)',
        description: 'г. Ош, ул. Фрунзенская, ориентир Геологобаза. Главный филиал сети.',
        x: 52,
        y: 44,
        isPrimary: true,
      },
      {
        id: 'geologobaza',
        name: 'Ориентир «Геологобаза»',
        shortLabel: 'Геологобаза',
        walkTime: '1 минута пешком',
        description: 'Удобный подъезд с ул. Фрунзенской и парковка рядом с клиникой.',
        x: 24,
        y: 64,
      },
      {
        id: 'branch2',
        name: 'Сеть из 3 клиник в г. Ош',
        shortLabel: '3 клиники в Оше',
        walkTime: 'По городу Ош',
        description: 'Три современных филиала «Дентал С» в удобных районах города Ош.',
        x: 78,
        y: 28,
      },
      {
        id: 'branch3',
        name: 'Остановка транспорта',
        shortLabel: 'Остановка',
        walkTime: '2 минуты пешком',
        description: '150 метров от остановки общественного транспорта по ул. Фрунзенской.',
        x: 78,
        y: 72,
      },
    ],
    mapOpen2gis: 'Открыть в 2ГИС',
    mapOpenYandex: 'Яндекс Карты',
    addrLabel: 'Адрес (г. Ош · сеть из 3 клиник)',
    addrValue: 'г. Ош, ул. Фрунзенская (ор. Геологобаза)',
    addrLandmark: 'Сеть из 3 клиник в городе Ош · Главный филиал рядом с Геологобазой',
    hoursLabel: 'График работы',
    hoursValue: 'Пн–Сб: 09:00 – 19:00',
    hoursNote: 'Воскресенье — приём с острой болью по звонку',
    phoneLabel: 'Телефон и WhatsApp',
    instagramLabel: 'Instagram',
    btnCallNow: 'Позвонить',
    modalTitle: 'Запись на приём в WhatsApp',
    modalSubtitle: 'Укажите имя — откроется готовое сообщение в клинику «Дентал С».',
    modalNameLabel: 'Ваше имя',
    modalNamePlaceholder: 'Например: Айгуль',
    modalNameError: 'Пожалуйста, введите ваше имя',
    modalPhoneLabel: 'Ваш телефон (необязательно)',
    modalPhonePlaceholder: '0556 ...',
    modalServiceLabel: 'Кандай кызмат / Какая услуга нужна?',
    modalDoctorLabel: 'Выбрать врача',
    modalDoctorAny: 'Любой свободный врач',
    modalTimeLabel: 'Удобное время',
    modalTimes: ['Бүгүн / Сегодня', 'Утром', 'Днём', 'Вечером'],
    modalPreviewLabel: 'Сообщение для WhatsApp:',
    modalSendWhatsapp: 'Открыть WhatsApp (+996 556 978 000)',
    modalCopyText: 'Скопировать',
    modalCopiedText: 'Скопировано!',
    modalOrCall: 'Или позвоните сразу:',
    footerCity: 'г. Ош, ул. Фрунзенская (ор. Геологобаза)',
    footerNote: 'Ваша улыбка — наша ответственность',
    waDefaultMsg: 'Здравствуйте! Хочу записаться на приём в стоматологию «Дентал С» (г. Ош).',
    waTemplate: 'Здравствуйте! Меня зовут {name}. Хочу записаться в «Дентал С»: {service}. Время: {time}.{doctor}{phone}',
    waDoctorLine: ' Врач: {doctor}.',
  },
};
