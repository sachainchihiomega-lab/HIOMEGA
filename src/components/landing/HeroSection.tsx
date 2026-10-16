import React from 'react';
import { SymptomCategory, SiteSettings, Member } from '../../types';
import { 
  SYMPTOM_DATA, 
  PRODUCT_REAL_IMAGE, 
  GOLDEN_SOFTGELS_IMAGE, 
  SHIPPING_PARCEL_IMAGE, 
  HAPPY_SENIORS_IMAGE
} from '../../data/initialData';
import { 
  CheckCircle, 
  Sparkles, 
  Leaf, 
  ShoppingBag
} from 'lucide-react';

interface HeroSectionProps {
  currentSymptom: SymptomCategory;
  onScrollToProducts: () => void;
  settings: SiteSettings;
  activeAffiliate?: Member | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentSymptom,
  onScrollToProducts,
  settings,
  activeAffiliate
}) => {
  const symptomInfo = SYMPTOM_DATA[currentSymptom] || SYMPTOM_DATA['semua'];

  const quickPhotoShowcases = [
    {
      img: PRODUCT_REAL_IMAGE,
      label: 'Botol Segel Hologram BPOM',
      desc: '100% Produk Original'
    },
    {
      img: GOLDEN_SOFTGELS_IMAGE,
      label: 'Softgel Anti Bocor',
      desc: 'Bisa di campurkan ke Makanan/Minuman'
    },
    {
      img: SHIPPING_PARCEL_IMAGE,
      label: 'Packing Ekstra Tebal & Aman',
      desc: 'Pengiriman Cepat & Bergaransi'
    },
    {
      img: HAPPY_SENIORS_IMAGE,
      label: 'Cocok untuk Semua Usia',
      desc: 'Dari Anak Hingga Lansia'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-teal-50/50 py-10 sm:py-16 border-b border-emerald-200">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Extra Large, High-Contrast Typography for Seniors & Adults */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded-full text-sm sm:text-base font-black tracking-wide uppercase shadow-sm">
              <Leaf className="w-5 h-5 text-emerald-300 flex-shrink-0" />
              <span>RESMI BPOM : POM TR253094921 DAN BERSERTIFIKAT HALAL</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              KAPSUL HI-OMEGA SACHA INCHI OIL
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-800 leading-snug font-extrabold">
              KEAJAIBAN ALAM SUMBER NABATI DENGAN KOMBINASI TERBAIK DI DUNIA OMEGA 3,6,9 + PROBIOTIK, EPA DHA & ASAM AMINO ESENSIAL DI SETIAP KAPSUL
            </p>

            {/* Quick 3-Point Checklist with Extra Large Icons & High Contrast Text */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border-3 border-emerald-400 shadow-md space-y-3.5 text-left">
              <div className="flex items-start gap-3.5">
                <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Formula Alami Tanpa Efek Samping
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Bebas Bahan Kimia dan Tidak Amis
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Izin Resmi BPOM RI & Sertifikasi Halal
                </span>
              </div>
            </div>

            {/* Direct Action Button - Scaled down to clean, compact size */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onScrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black px-6 py-3.5 sm:py-4 rounded-xl text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all border-2 border-emerald-500 group cursor-pointer"
              >
                <ShoppingBag className="w-6 h-6 text-emerald-200 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>Pesan HI-OMEGA</span>
              </button>

              <a
                href="#produk"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-950 font-black px-5 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg border-2 border-emerald-600 shadow-sm transition"
              >
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>Lihat Pilihan Paket</span>
              </a>
            </div>
          </div>

          {/* Right Column: Physical Product Image & Authentic Multi-Image Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Product Card Container */}
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-500 overflow-hidden text-center group">
                <div className="absolute top-4 right-4 bg-rose-600 text-white font-black text-sm sm:text-base px-4 py-1.5 rounded-full uppercase shadow-md">
                  Asli 100%
                </div>

                <div className="relative mx-auto w-full aspect-square max-w-sm rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-emerald-50 p-2 flex items-center justify-center">
                  <img
                    src={PRODUCT_REAL_IMAGE}
                    alt="Kemasan Asli HI-OMEGA Sacha Inchi + VCO"
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    ISI 60 KAPSUL @500MG HIGIENIS DAN ANTI BOCOR
                  </h3>
                  
                  {/* Price Tag with Extra Large High Contrast Typography */}
                  <div className="mt-3.5 inline-block bg-emerald-50 px-7 py-3 rounded-2xl border-2 border-emerald-400 shadow-sm">
                    <span className="text-sm sm:text-base text-slate-700 font-black block">
                      HARGA NORMAL <span className="line-through text-rose-600 font-extrabold">RP.150.000</span> (PROMO TERBATAS)
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-emerald-950">
                      Rp 100.000
                    </span>
                    <span className="text-base text-slate-700 font-bold ml-1.5">/ botol</span>
                  </div>
                </div>

                {/* Multi-Photo Preview Gallery Thumbnails */}
                <div className="mt-5 pt-4 border-t-2 border-slate-200">
                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-600 mb-2.5">
                    FOTO ASLI PENGIRIMAN
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-2xl overflow-hidden border-2 border-emerald-400 aspect-square bg-slate-100 shadow-sm">
                      <img src={PRODUCT_REAL_IMAGE} alt="Botol Asli Segel" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-emerald-400 aspect-square bg-slate-100 shadow-sm">
                      <img src={GOLDEN_SOFTGELS_IMAGE} alt="Softgel Emas Murni" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-emerald-400 aspect-square bg-slate-100 shadow-sm">
                      <img src={SHIPPING_PARCEL_IMAGE} alt="Paket Kirim Resmi" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Photo Visual Showcase Bar: More Pictures, Less Text */}
        <div className="mt-12 pt-8 border-t border-emerald-200 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {quickPhotoShowcases.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-3 sm:p-4 border-2 border-emerald-300 shadow-sm hover:shadow-md transition flex flex-col items-center text-center group"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-3 shadow-inner">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {item.label}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-emerald-800 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
