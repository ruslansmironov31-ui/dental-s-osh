import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ClinicTranslation } from '../data/clinicData';

interface ReviewsAndFaqSectionProps {
  t: ClinicTranslation;
}

export function ReviewsAndFaqSection({ t }: ReviewsAndFaqSectionProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(t.faqs[0]?.id ?? 'faq-pain');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  return (
    <section className="py-10 sm:py-16 bg-[#C4C9CF]/80 dark:bg-[#181B1F]/88 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Compact Patient Reviews */}
        <div id="reviews">
          <div className="max-w-xl mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#23272B] dark:text-white tracking-tight text-balance">
              {t.reviewsTitle}
            </h2>
            <p className="text-[#3E444A] dark:text-slate-300 text-sm mt-1.5 leading-relaxed">
              {t.reviewsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3.5 sm:gap-4">
            {t.reviews.map((review) => (
              <article
                key={review.id}
                className="bg-[#D9DDE2] dark:bg-[#262B30] rounded-xl p-4 border border-[#8D949C]/50 dark:border-slate-700/80 hover:border-[#52585E] hover:bg-[#E1E4E8] dark:hover:bg-[#2D3339] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm flex flex-col justify-between gap-2.5"
              >
                <p className="text-xs sm:text-sm text-[#23272B] dark:text-slate-200 leading-relaxed">
                  «{review.text}»
                </p>
                <div className="pt-2.5 border-t border-[#8D949C]/35 dark:border-slate-700/80 text-xs flex items-center justify-between gap-2">
                  <span className="font-bold text-[#23272B] dark:text-white">
                    {review.author}
                  </span>
                  <span className="text-[#4A5056] dark:text-slate-400">
                    {review.from} · {review.service}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div
          id="faq"
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4 border-t border-[#8D949C]/40 dark:border-slate-800"
        >
          <div className="lg:col-span-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#23272B] dark:text-white tracking-tight text-balance">
              {t.faqTitle}
            </h2>
            <p className="text-[#3E444A] dark:text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
              {t.faqSubtitle}
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-[#8D949C]/35 dark:divide-slate-700/80 border border-[#8D949C]/50 dark:border-slate-700/80 rounded-2xl bg-[#D9DDE2] dark:bg-[#262B30] overflow-hidden">
            {t.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full min-h-[48px] px-4 sm:px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#E1E4E8]/80 dark:hover:bg-[#2D3134]/80 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#23272B] dark:text-white leading-snug break-words">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#4A5056] dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#23272B] dark:text-white' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 text-sm text-[#4A5056] dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
