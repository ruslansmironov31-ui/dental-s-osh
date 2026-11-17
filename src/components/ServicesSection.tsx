import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ClinicTranslation, ServiceCategory } from '../data/clinicData';

interface ServicesSectionProps {
  t: ClinicTranslation;
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ t, onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const availableCategories = new Set(t.services.map((s) => s.cat));
  const visibleFilters = t.filters.filter(
    (filter) => filter.id === 'all' || availableCategories.has(filter.id)
  );
  const currentCategory =
    activeCategory === 'all' || availableCategories.has(activeCategory)
      ? activeCategory
      : 'all';

  const visibleServices = t.services.filter(
    (service) => currentCategory === 'all' || service.cat === currentCategory
  );

  return (
    <section
      id="services"
      className="py-14 sm:py-20 bg-[#C4C9CF]/80 dark:bg-[#181B1F]/88 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 sm:mb-10">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23272B] dark:text-white tracking-tight text-balance">
              {t.servicesTitle}
            </h2>
            <p className="text-[#3E444A] dark:text-slate-300 text-base mt-2 leading-relaxed">
              {t.servicesSubtitle}
            </p>
          </div>

          {visibleFilters.length > 2 && (
            <div
              className="flex flex-wrap gap-1.5 bg-[#B7BDC4] dark:bg-[#262B30] p-1 rounded-xl border border-[#8D949C]/50 dark:border-slate-700"
              role="tablist"
              aria-label={t.servicesTitle}
            >
              {visibleFilters.map((filter) => {
                const isActive = currentCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(filter.id)}
                    className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.97] ${
                      isActive
                        ? 'bg-[#52585E] dark:bg-[#5A6067] text-white shadow-xs'
                        : 'text-[#23272B]/85 dark:text-slate-300 hover:text-[#23272B] dark:hover:text-white hover:bg-[#D9DDE2] dark:hover:bg-[#32383E]'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {visibleServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#D9DDE2] dark:bg-[#262B30] hover:bg-[#E1E4E8] dark:hover:bg-[#2D3339] rounded-2xl p-4 sm:p-6 border border-[#8D949C]/50 dark:border-slate-700/80 hover:border-[#52585E] dark:hover:border-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-medium text-[#4A5056] dark:text-slate-400 mb-2">
                  <span className="text-[#383E44] dark:text-slate-300 font-semibold">
                    {service.categoryLabel}
                  </span>
                  {service.duration && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{service.duration}</span>
                    </>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#23272B] dark:text-white leading-snug mb-1.5 break-words">
                  {service.name}
                </h3>
                {service.desc && (
                  <p className="text-sm text-[#4A5056] dark:text-slate-300 leading-relaxed break-words">
                    {service.desc}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-[#8D949C]/35 dark:border-slate-700/80">
                <span className="font-mono tabular-nums text-base sm:text-lg font-bold text-[#23272B] dark:text-slate-100">
                  {service.price}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(service.name)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] text-sm font-semibold text-white bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] border border-[#464C52] dark:border-slate-600 px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.97] whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                >
                  <span>{t.btnBookService}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#D9DDE2] dark:bg-[#262B30] border border-[#8D949C]/55 dark:border-slate-700 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 hover:border-[#52585E]">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#23272B] dark:text-white">
              {t.freeConsultTitle}
            </h3>
            <p className="text-sm text-[#4A5056] dark:text-slate-300 mt-1">
              {t.freeConsultDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService(t.services[0]?.name ?? t.freeConsultTitle)}
            className="w-full sm:w-auto min-h-[48px] bg-[#52585E] hover:bg-[#42474C] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] text-white font-semibold text-sm px-5 py-3 rounded-xl border border-[#464C52] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            {t.freeConsultBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
