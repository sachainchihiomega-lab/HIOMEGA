import React from 'react';
import { ShieldAlert, ShoppingBag } from 'lucide-react';
import { SiteSettings, Member } from '../../types';

interface VideoEducationSectionProps {
  settings: SiteSettings;
  activeAffiliate?: Member | null;
  onScrollToProducts: () => void;
}

export const VideoEducationSection: React.FC<VideoEducationSectionProps> = ({
  onScrollToProducts
}) => {
  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-600/30 text-rose-300 border border-rose-500/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>AWAS PRODUK PALSU !!!</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            HI-OMEGA Asli Terdapat Segel Hologram
          </h2>
          <p className="text-slate-300 text-base sm:text-xl mt-3 font-semibold leading-relaxed">
            Minyak Sacha Inchi Yang Asli Dalam Kapsul Tidak Akan Membeku Meskipun Di Simpan Dalam Lemari ES
          </p>
        </div>

        {/* Action under warning - Website Order focus */}
        <div className="mt-8 text-center">
          <button
            onClick={onScrollToProducts}
            className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg shadow-xl hover:shadow-2xl transition border-2 border-emerald-500 cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6 text-emerald-200" />
            <span>Pesan HI-OMEGA Untuk Membantu Mengatasi berbagai Keluhan Kesehatan</span>
          </button>
        </div>
      </div>
    </section>
  );
};
