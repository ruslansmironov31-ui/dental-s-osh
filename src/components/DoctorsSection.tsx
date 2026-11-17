import { ClinicTranslation } from '../data/clinicData';
import { ResilientImage } from './ResilientImage';

interface DoctorsSectionProps {
  t: ClinicTranslation;
  onSelectDoctor: (doctorName: string) => void;
}

export function DoctorsSection({ t, onSelectDoctor }: DoctorsSectionProps) {
  return (
    <section
      id="doctors"
      className="py-12 sm:py-16 bg-[#B7BDC4]/85 dark:bg-[#1E2226]/92 border-y border-slate-500/25 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23272B] dark:text-white tracking-tight text-balance">
            {t.doctorsTitle}
          </h2>
          <p className="text-[#3E444A] dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            {t.doctorsSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {t.doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-[#D9DDE2] dark:bg-[#262B30] rounded-2xl overflow-hidden border border-[#8D949C]/50 dark:border-slate-700/80 hover:border-[#52585E] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Neutral medium gray studio portrait container matching all doctors */}
                <div className="relative aspect-[4/3] bg-[#7D838A] overflow-hidden">
                  <ResilientImage
                    src={doctor.photo}
                    srcSet={doctor.photoSrcSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    alt={doctor.name}
                    fallbackTitle={doctor.name}
                    className={`w-full h-full object-cover ${
                      doctor.photoPosition || 'object-top'
                    } transition-transform duration-300 hover:scale-[1.03]`}
                  />
                  {/* Subtle neutral gray bottom vignette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#434950]/25 via-transparent to-transparent"
                  />
                </div>
                <div className="p-5 pb-2">
                  <div className="text-xs font-semibold text-[#4A5056] dark:text-slate-400 mb-1 font-mono tabular-nums">
                    {doctor.exp}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#23272B] dark:text-white leading-tight">
                    {doctor.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-[#383E44] dark:text-slate-200 mt-1 mb-2">
                    {doctor.spec}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A5056] dark:text-slate-300 leading-relaxed">
                    {doctor.bio}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3">
                <button
                  type="button"
                  onClick={() => onSelectDoctor(doctor.name)}
                  className="w-full min-h-[48px] font-semibold text-sm py-3 rounded-xl border bg-[#52585E] hover:bg-[#42474C] text-white border-[#464C52] dark:bg-[#4A5056] dark:hover:bg-[#5A6067] dark:border-slate-600 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-xs"
                >
                  {t.btnBookDoctor}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
