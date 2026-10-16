import React from 'react';
import { SiteSettings, SymptomCategory } from '../../types';
import { 
  SYMPTOM_DATA
} from '../../data/initialData';
import { 
  Sparkles,
  CheckCircle,
  ShoppingBag,
  Heart,
  Activity,
  Flame,
  Zap,
  Stethoscope,
  RefreshCw,
  AlertTriangle,
  Quote,
  Pill
} from 'lucide-react';

interface DynamicSymptomSectionProps {
  currentSymptom: SymptomCategory;
  onOpenFlyerModal: (title: string, category: string) => void;
  onScrollToProducts: () => void;
  onReopenIntake: () => void;
  settings: SiteSettings;
}

export const DynamicSymptomSection: React.FC<DynamicSymptomSectionProps> = ({
  currentSymptom,
  onOpenFlyerModal,
  onScrollToProducts,
  onReopenIntake
}) => {
  const symptom = SYMPTOM_DATA[currentSymptom] || SYMPTOM_DATA['semua'];

  const clinicalBenefits = [
    {
      title: 'Melarutkan Plak Kolesterol & Trigliserida',
      desc: 'Asam lemak tak jenuh ganda Omega-3 nabati mengikat LDL jahat di dinding arteri pembuluh darah.',
      icon: Activity,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      title: 'Meredakan Radang Sendi & Asam Urat',
      desc: 'Sifat anti-inflamasi alami meredakan nyeri tajam di lutut, jari kaki, dan persendian kaku di pagi hari.',
      icon: Flame,
      color: 'text-rose-600 bg-rose-50 border-rose-200'
    },
    {
      title: 'Menstabilkan Tekanan Darah (Hipertensi)',
      desc: 'Membantu pembuluh darah lebih lentur dan elastis, menurunkan risiko lonjakan tensi dan stroke.',
      icon: Heart,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Nutrisi Sel Vital & Stamina Tubuh',
      desc: 'Kandungan VCO (asam laurat) dan antioksidan Vitamin E tinggi meningkatkan daya tahan fisik harian.',
      icon: Zap,
      color: 'text-teal-600 bg-teal-50 border-teal-200'
    }
  ];

  return (
    <section id="keluhan" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Tailored Complaint Indicator & Switcher Banner */}
        <div className="bg-emerald-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg border-2 border-emerald-400 mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/80 border border-emerald-400 text-emerald-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Stethoscope className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                PANDUAN BERDASARKAN KELUHAN SAKIT ANDA
              </span>
              <div className="text-lg sm:text-xl font-black text-white flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <span>Jenis Penyakit Yang Bisa Di Atasi</span>
                <span className="text-[11px] sm:text-xs font-bold bg-emerald-800 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-600">
                  Oleh Kapsul HI-OMEGA
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onReopenIntake}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Pilih Solusi</span>
          </button>
        </div>

        {/* Dynamic Content Spotlight Panel - Tailored for the Complaint */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-emerald-400 shadow-xl">
          {/* Medical Warning Box for this specific condition */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3.5">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-950 font-black text-sm sm:text-base block leading-snug">
                Jangan Tunggu Sakit Semakin Parah Merawat Dan Mencegah Sejak Dini Jauh Lebih Murah Daripada Biaya Rumah Sakit
              </strong>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
              {/* Symptoms Checklist */}
              {symptom.symptomsList && symptom.symptomsList.length > 0 && (
                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-700" />
                    <span>Gejala Awal Yang Patut Di Waspadai</span>
                  </h4>
                  <div className="space-y-2">
                    {symptom.symptomsList.map((symp, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-sm sm:text-base font-semibold text-slate-800">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{symp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mechanism of Action Steps */}
              {symptom.mechanismSteps && symptom.mechanismSteps.length > 0 && (
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span>{symptom.mechanismTitle || 'Bagaimana HI-OMEGA Bekerja?'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {symptom.mechanismSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-200 shadow-sm"
                      >
                        <h5 className="text-base font-black text-slate-900 mb-1 leading-snug">
                          {step.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Patient Experience Quote */}
              {/* Patient Experience Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50 border-2 border-teal-300 relative">
                <Quote className="w-6 h-6 text-teal-600 mb-1 opacity-70" />
                <p className="text-sm sm:text-base font-bold text-teal-950 italic">
                  "Tubuh Manusia Tidak Dapat Memproduksi OMEGA-3, Sehingga Harus Di Dapatkan Dari Makanan / Suplemen Seperti Hi-OMEGA"
                </p>
              </div>

              {/* Dosage Guideline Card */}
              <div className="bg-emerald-900 text-white p-5 rounded-2xl border-2 border-emerald-500 shadow-md">
                <div className="flex items-center gap-2.5 mb-2">
                  <Pill className="w-6 h-6 text-amber-300" />
                  <h4 className="text-base sm:text-lg font-black text-white">
                    Aturan Pakai
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-1">
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/60">
                    <strong className="text-amber-300 font-black block mb-0.5">Masa Penyembuhan:</strong>
                    <span className="text-emerald-100 font-medium">2 Kapsul Pagi & 2 Kapsul Malam (Sesudah Makan)</span>
                  </div>
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/60">
                    <strong className="text-emerald-300 font-black block mb-0.5">Merawat Kesehatan:</strong>
                    <span className="text-emerald-100 font-medium">1 Kapsul Pagi & 1 Kapsul Malam (Sesudah Makan)</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Direct to Web Order Form */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={onScrollToProducts}
                  className="inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-lg hover:shadow-xl transition border-2 border-emerald-400 cursor-pointer"
                  aria-label="BELI HI-OMEGA"
                >
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200" />
                  <span>BELI HI-OMEGA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
