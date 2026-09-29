import React from 'react';
import { SymptomCategory } from '../../types';
import { 
  Heart, 
  HeartPulse, 
  Activity, 
  Bone, 
  Droplets, 
  ShieldAlert, 
  Brain, 
  Wind, 
  Baby, 
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';

interface SymptomQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSymptom: SymptomCategory;
  onSelectSymptom: (symptom: SymptomCategory) => void;
}

interface SymptomOption {
  id: SymptomCategory;
  title: string;
  tagline: string;
  badge: string;
  icon: React.ReactNode;
  bgGradient: string;
  borderColor: string;
}

export const SymptomQuizModal: React.FC<SymptomQuizModalProps> = ({
  isOpen,
  onClose,
  selectedSymptom,
  onSelectSymptom
}) => {
  if (!isOpen) return null;

  const options: SymptomOption[] = [
    {
      id: 'hipertensi',
      title: 'Darah Tinggi (Hipertensi)',
      tagline: 'Sering pusing pagi, telinga berdenging, leher kaku tegang',
      badge: 'BAHAYA STROKE',
      icon: <HeartPulse className="w-8 h-8 text-rose-600" />,
      bgGradient: 'hover:bg-rose-50/80 bg-white',
      borderColor: 'border-rose-200'
    },
    {
      id: 'kolesterol',
      title: 'Kolesterol Tinggi',
      tagline: 'Pegal berat leher & bahu, dada sesak, cepat lelah',
      badge: 'PLAK LEMAK DARAH',
      icon: <Activity className="w-8 h-8 text-amber-600" />,
      bgGradient: 'hover:bg-amber-50/80 bg-white',
      borderColor: 'border-amber-200'
    },
    {
      id: 'sendi_tulang',
      title: 'Asam Urat & Nyeri Sendi',
      tagline: 'Nyeri menusuk di jempol kaki, linu lutut & sakit pinggang',
      badge: 'USIA 40+ TAHUN',
      icon: <Bone className="w-8 h-8 text-blue-600" />,
      bgGradient: 'hover:bg-blue-50/80 bg-white',
      borderColor: 'border-blue-200'
    },
    {
      id: 'jantung',
      title: 'Jantung & Pembuluh Darah',
      tagline: 'Jantung sering berdebar, napas pendek saat beraktivitas',
      badge: 'SIRKULASI TERSUMBAT',
      icon: <Heart className="w-8 h-8 text-red-600" />,
      bgGradient: 'hover:bg-red-50/80 bg-white',
      borderColor: 'border-red-200'
    },
    {
      id: 'diabetes',
      title: 'Gula Darah & Diabetes',
      tagline: 'Sering haus malam hari, mudah lemas & gula darah tinggi',
      badge: 'RESISTENSI INSULIN',
      icon: <Droplets className="w-8 h-8 text-teal-600" />,
      bgGradient: 'hover:bg-teal-50/80 bg-white',
      borderColor: 'border-teal-200'
    },
    {
      id: 'lambung',
      title: 'Lambung, Maag & Sembelit',
      tagline: 'Perut begah, perih ulu hati, gerd & susah buang air besar',
      badge: 'RADANG PENCERNAAN',
      icon: <ShieldAlert className="w-8 h-8 text-emerald-600" />,
      bgGradient: 'hover:bg-emerald-50/80 bg-white',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'stroke_otak',
      title: 'Stroke & Pemulihan Saraf',
      tagline: 'Anggota tubuh kebas/lemah, daya ingat menurun, bicara kaku',
      badge: 'REGENERASI SARAF',
      icon: <Brain className="w-8 h-8 text-indigo-600" />,
      bgGradient: 'hover:bg-indigo-50/80 bg-white',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'paru_respirasi',
      title: 'Paru-paru & Pernapasan',
      tagline: 'Napas sesak, batuk menahun, butuh perlindungan polusi/asap',
      badge: 'KAPASITAS NAPAS',
      icon: <Wind className="w-8 h-8 text-amber-700" />,
      bgGradient: 'hover:bg-amber-50/80 bg-white',
      borderColor: 'border-amber-200'
    },
    {
      id: 'ibu_anak',
      title: 'Ibu Hamil & Kecerdasan Anak',
      tagline: 'Omega-3 nabati kaya DHA alami untuk otak anak & kualitas ASI',
      badge: '100% BEBAS MERKURI',
      icon: <Baby className="w-8 h-8 text-pink-600" />,
      bgGradient: 'hover:bg-pink-50/80 bg-white',
      borderColor: 'border-pink-200'
    },
    {
      id: 'semua',
      title: 'Semua Khasiat Superfood',
      tagline: 'Ingin stamina kuat, imunitas harian & jaga kesehatan menyeluruh',
      badge: 'REKOMENDASI KELUARGA',
      icon: <Sparkles className="w-8 h-8 text-emerald-600" />,
      bgGradient: 'hover:bg-emerald-50/80 bg-white',
      borderColor: 'border-emerald-300'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-600 overflow-hidden my-auto">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 px-6 py-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-300/40 text-emerald-200 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Konsultasi Awal Pengunjung
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Apa Keluhan Kesehatan yang Sedang Anda Rasakan?
          </h2>
          <p className="mt-2 text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto">
            Silakan klik keluhan utama di bawah ini agar kami dapat menampilkan penjelasan khusus dan solusi terbaik dari <strong className="text-emerald-300">HI-OMEGA Sacha Inchi</strong>.
          </p>
        </div>

        {/* Symptom Selection Grid */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {options.map((opt) => {
              const isSelected = selectedSymptom === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    onSelectSymptom(opt.id);
                    onClose();
                  }}
                  className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 text-left relative group ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-500/20 shadow-md'
                      : `${opt.borderColor} ${opt.bgGradient} shadow-sm hover:shadow-md hover:border-emerald-500`
                  }`}
                >
                  <div className="flex-shrink-0 p-3 bg-slate-100 rounded-2xl border border-slate-200 group-hover:scale-105 transition-transform">
                    {opt.icon}
                  </div>

                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800 tracking-wide uppercase">
                        {opt.badge}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Terpilih
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {opt.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-1 leading-normal">
                      {opt.tagline}
                    </p>
                  </div>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm text-slate-500">
            💡 <em>Pilihan Anda bisa diubah kapan saja langsung melalui tombol menu di bagian atas website.</em>
          </p>
          <button
            onClick={() => {
              onSelectSymptom('semua');
              onClose();
            }}
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 underline decoration-2 underline-offset-4"
          >
            Lewati & Lihat Semua Manfaat
          </button>
        </div>
      </div>
    </div>
  );
};
