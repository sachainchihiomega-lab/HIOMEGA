import React from 'react';
import { SiteSettings } from '../../types';
import { 
  SYMPTOM_DATA, 
  SOFTGELS_SPILL_IMAGE,
  PRODUCT_REAL_IMAGE,
  GOLDEN_SOFTGELS_IMAGE,
  HAPPY_SENIORS_IMAGE
} from '../../data/initialData';
import { 
  Sparkles,
  CheckCircle,
  Maximize2,
  ShoppingBag,
  Award,
  ShieldCheck,
  Heart,
  Activity,
  Flame,
  Zap
} from 'lucide-react';

interface DynamicSymptomSectionProps {
  onOpenFlyerModal: (title: string, category: string) => void;
  onScrollToProducts: () => void;
  settings: SiteSettings;
}

export const DynamicSymptomSection: React.FC<DynamicSymptomSectionProps> = ({
  onOpenFlyerModal,
  onScrollToProducts,
}) => {
  const symptom = SYMPTOM_DATA['semua'];

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
    <section id="keluhan" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header with Large Clear Fonts */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 font-black text-sm sm:text-base px-4 py-2 rounded-full uppercase tracking-wider mb-3 border border-emerald-300">
            <Award className="w-5 h-5 text-emerald-700" />
            <span>KHASIAT & MANFAAT KLINIS RESMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Nutrisi Komprehensif Seluruh Tubuh
          </h2>
          <p className="text-slate-700 text-lg sm:text-xl font-bold mt-3 leading-relaxed">
            Satu formula kapsul nabati Sacha Inchi + VCO bekerja menyeluruh membantu menstabilkan kolesterol, sendi asam urat, tensi darah, dan kesehatan jantung tanpa efek samping:
          </p>
        </div>

        {/* Dynamic Content Spotlight Panel - Image Rich & Concise */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-emerald-400 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 4 Key Clinical Benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clinicalBenefits.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl border-2 ${item.color} flex flex-col justify-between shadow-sm`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-6 h-6 flex-shrink-0" />
                          <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quality Checklist */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Halal MUI & Izin Edar BPOM RI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Ekstrak Nabati Murni Bebas Logam Berat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Aman Dikonsumsi Usia 40 Tahun ke Atas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Kemasan Higienis Segel Hologram</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Direct to Web Order Form */}
              <div className="pt-2">
                <button
                  onClick={onScrollToProducts}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black py-4 sm:py-5 px-6 rounded-2xl text-xl sm:text-2xl flex items-center justify-center gap-3.5 shadow-xl transition border-2 border-emerald-500 cursor-pointer"
                >
                  <ShoppingBag className="w-7 h-7 text-emerald-200 flex-shrink-0" />
                  <span>Pesan Paket HI-OMEGA (Form Pemesanan)</span>
                </button>
              </div>
            </div>

            {/* Right: Infographic Flyer Graphic Card with Real Photos */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full bg-slate-900 text-white rounded-3xl p-5 shadow-2xl border-4 border-emerald-500 relative group overflow-hidden">
                {/* Flyer Header Bar */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl text-center mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-100">
                    INFOGRAFIS KESEHATAN RESMI
                  </span>
                  <div className="text-2xl font-black italic tracking-wide text-white">
                    HI-OMEGA SACHA INCHI
                  </div>
                </div>

                {/* Infographic Visual Card Preview */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 p-2">
                  <img
                    src={SOFTGELS_SPILL_IMAGE}
                    alt="HI-OMEGA Sacha Inchi + VCO"
                    className="w-full h-72 sm:h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      Panduan Klinis Alami
                    </span>
                    <h5 className="text-xl sm:text-2xl font-black text-white mt-1">
                      Kombinasi Omega 3-6-9 & Minyak Kelapa Murni (VCO)
                    </h5>
                    <p className="text-sm font-bold text-slate-200 mt-1 line-clamp-2">
                      Membantu memelihara kesehatan tubuh, melancarkan peredaran darah, serta menjaga elastisitas sendi & pembuluh darah.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenFlyerModal('Khasiat Lengkap HI-OMEGA', 'semua')}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition border border-white/20 cursor-pointer"
                    title="Perbesar Flyer (Mode Baca Lansia)"
                    aria-label="Perbesar Flyer"
                  >
                    <Maximize2 className="w-6 h-6 text-emerald-300" />
                  </button>
                </div>

                <button
                  onClick={() => onOpenFlyerModal('Khasiat Lengkap HI-OMEGA', 'semua')}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-lg transition cursor-pointer"
                >
                  <Maximize2 className="w-5 h-5" />
                  <span>Buka Flyer Lengkap (Ukuran Besar)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
