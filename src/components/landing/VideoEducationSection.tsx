import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ShieldAlert, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { SiteSettings, Member } from '../../types';

interface VideoEducationSectionProps {
  settings: SiteSettings;
  activeAffiliate?: Member | null;
  onScrollToProducts: () => void;
}

export const VideoEducationSection: React.FC<VideoEducationSectionProps> = ({
  settings,
  activeAffiliate,
  onScrollToProducts
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const videoScenes = [
    {
      title: 'Peringatan Dini: Darah Tinggi & Pembuluh Darah',
      narration: 'Tahukah Anda? Hipertensi sering dijuluki "The Silent Killer" karena menyerang perlahan tanpa keluhan jelas hingga tiba-tiba pembuluh darah tersumbat.',
      visual: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      points: ['Tekanan darah > 140/90 mmHg', 'Tengkuk tegang dan pusing', 'Beban kerja jantung meningkat drastis']
    },
    {
      title: 'Solusi Alami Superfood Sacha Inchi + VCO',
      narration: 'Kandungan Asam Lemak Omega 3-6-9 nabati tertinggi di dunia membersihkan plak kolesterol dan mengembalikan kelenturan pembuluh darah secara alami.',
      visual: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
      points: ['Omega 3 nabati 17x lebih kuat dari salmon', 'VCO melancarkan sirkulasi mikro', 'Aman bagi ginjal dan lambung usia 40+']
    },
    {
      title: 'Ikhtiar Sehat Lansia Bersama HI-OMEGA',
      narration: 'Cukup 2 kapsul softgel setiap hari. Tubuh lebih enteng, kepala bebas rasa tegang, dan tidur lebih nyenyak bersama keluarga tercinta.',
      visual: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      points: ['Kapsul lembut mudah ditelan lansia', '100% Sertifikasi Resmi BPOM RI', 'Bebas bahan kimia obat sintetis']
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-600/30 text-rose-300 border border-rose-500/40 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>VIDEO EDUKASI KLINIS & HIPERTENSI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Kenali Bahaya Hipertensi & Cara Alami Mengatasinya
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-2 font-medium">
            Simak tayangan edukatif mengenai bahaya tekanan darah tinggi dan bagaimana nutrisi Sacha Inchi menutrisi organ vital.
          </p>
        </div>

        {/* Video Player Mockup Container */}
        <div className="relative rounded-3xl overflow-hidden border-4 border-emerald-500/60 shadow-2xl bg-black aspect-video max-h-[520px] flex flex-col justify-between">
          <img
            src={videoScenes[currentStep].visual}
            alt={videoScenes[currentStep].title}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />

          <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full justify-between">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2">
              <span className="bg-emerald-600/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 border border-emerald-400">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Edukasi Kesehatan HI-OMEGA [Scene {currentStep + 1}/3]</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-black/60 hover:bg-black/90 text-white transition border border-white/20"
                  title={isPlaying ? 'Jeda' : 'Putar'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-black/60 hover:bg-black/90 text-white transition border border-white/20"
                  title={isMuted ? 'Buka Suara' : 'Bisukan'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Center Scene Content */}
            <div className="my-auto py-6 space-y-4 max-w-2xl mx-auto text-center">
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {videoScenes[currentStep].title}
              </h3>
              <p className="text-lg sm:text-xl text-emerald-100 font-medium leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/10">
                “{videoScenes[currentStep].narration}”
              </p>

              {/* Scene highlight points */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {videoScenes[currentStep].points.map((pt, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {pt}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {videoScenes.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentStep === idx ? 'w-10 bg-emerald-400' : 'w-4 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`Adegan ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep((prev) => (prev + 1) % videoScenes.length)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5"
                >
                  Adegan Selanjutnya →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action under video - Website Order focus */}
        <div className="mt-8 text-center">
          <button
            onClick={onScrollToProducts}
            className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition border-2 border-emerald-500"
          >
            <ShoppingBag className="w-6 h-6 text-emerald-200" />
            <span>Pesan HI-OMEGA untuk Perlindungan Jantung & Darah Tinggi (Isi Form)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
