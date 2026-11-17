import { useEffect, useRef, useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { ClinicTranslation } from '../data/clinicData';

interface TrustSectionProps {
  t: ClinicTranslation;
}

export function TrustSection({ t }: TrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className={`py-10 sm:py-14 bg-[#B7BDC4]/85 dark:bg-[#1E2226]/92 border-y border-slate-500/25 dark:border-slate-800 transition-colors overflow-x-hidden ${
        visible ? 'is-visible' : ''
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-5">
        {t.fears.map((item, index) => {
          const questionDelayMs = index * 780;
          const typingDelayMs = questionDelayMs + 180;
          const answerDelayMs = questionDelayMs + 600;

          return (
            <div key={item.num} className="space-y-2">
              {/* Patient question bubble fading up smoothly on the left */}
              <div
                style={{ animationDelay: `${questionDelayMs}ms` }}
                className="flex justify-start chat-fade-up"
              >
                <div className="max-w-[85%] sm:max-w-[74%] bg-[#DCE0E5] dark:bg-[#2A2E32] text-[#23272B] dark:text-slate-100 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl rounded-bl-xs border border-[#8D949C]/45 dark:border-slate-700 shadow-xs">
                  <p className="text-xs sm:text-sm font-semibold leading-snug break-words">
                    {item.pain}
                  </p>
                </div>
              </div>

              {/* Right-aligned slot: "Печатает..." 3-dot indicator cross-fades cleanly into the clinic reply */}
              <div className="relative flex justify-end">
                <div
                  style={{ animationDelay: `${typingDelayMs}ms` }}
                  aria-hidden="true"
                  className="chat-typing-pill absolute right-0 top-0 inline-flex items-center gap-1.5 bg-[#DCE0E5] dark:bg-[#2A2E32] text-[#4A5056] dark:text-slate-300 px-3 py-1.5 rounded-2xl rounded-br-xs border border-[#8D949C]/45 dark:border-slate-700 text-xs font-medium shadow-xs"
                >
                  <span>{t.typingLabel}</span>
                  <span className="inline-flex items-center gap-0.5 pt-0.5">
                    <span
                      className="typing-dot w-1.5 h-1.5 rounded-full bg-[#52585E] dark:bg-slate-300"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="typing-dot w-1.5 h-1.5 rounded-full bg-[#52585E] dark:bg-slate-300"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="typing-dot w-1.5 h-1.5 rounded-full bg-[#52585E] dark:bg-slate-300"
                      style={{ animationDelay: '300ms' }}
                    />
                  </span>
                </div>

                <div
                  style={{ animationDelay: `${answerDelayMs}ms` }}
                  className="chat-fade-up max-w-[82%] sm:max-w-[66%] bg-[#52585E] dark:bg-[#42474C] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-br-xs shadow-sm border border-white/15"
                >
                  <div className="flex items-end gap-1.5">
                    <p className="text-xs sm:text-[13px] font-medium leading-snug break-words">
                      {item.solution}
                    </p>
                    <CheckCheck className="w-3.5 h-3.5 text-slate-200 shrink-0 mb-0.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Final Дентал С summary badge */}
        <div
          style={{ animationDelay: `${t.fears.length * 780}ms` }}
          className="flex justify-center pt-2 chat-fade-up"
        >
          <div className="inline-flex items-center gap-2 bg-[#DCE0E5] dark:bg-[#2A2E32] text-[#23272B] dark:text-slate-100 px-5 py-2.5 rounded-full border border-[#8D949C]/60 dark:border-slate-600 shadow-xs text-sm sm:text-base font-bold">
            <CheckCheck className="w-4 h-4 text-[#434950] dark:text-slate-300 shrink-0" />
            <span>{t.whySolutionBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
