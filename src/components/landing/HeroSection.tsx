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
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  Award, 
  Leaf, 
  ShoppingBag, 
  MapPin,
  ExternalLink
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
      label: 'Softgel Emas Bebas Amis',
      desc: 'Minyak Nabati Murni'
    },
    {
      img: SHIPPING_PARCEL_IMAGE,
      label: 'Packing Ekstra Tebal & Aman',
      desc: 'Bisa Bayar di Tempat (COD)'
    },
    {
      img: HAPPY_SENIORS_IMAGE,
      label: 'Bugar Tanpa Nyeri Sendi',
      desc: 'Aman untuk Usia 40+'
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
              <Leaf className="w-5 h-5 text-emerald-300" />
              <span>{symptomInfo.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
              {symptomInfo.headline}
            </h1>

            <p className="text-2xl sm:text-3xl text-slate-800 leading-snug font-extrabold">
              {symptomInfo.subheadline}
            </p>

            {/* Quick 3-Point Checklist with Extra Large Icons & High Contrast Text */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border-3 border-emerald-400 shadow-md space-y-3.5 text-left">
              <div className="flex items-center gap-3.5">
                <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  100% Ekstrak Sacha Inchi + Minyak Kelapa Murni (VCO)
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Bebas Bau Amis Ikan & Bebas Cemaran Merkuri Laut
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Izin Resmi BPOM RI & Sertifikasi Halal Indonesia
                </span>
              </div>
            </div>

            {/* Big Direct Action Button - Focused on Website Purchase Form */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onScrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black px-10 py-5 sm:py-6 rounded-2xl text-2xl sm:text-3xl shadow-xl hover:shadow-2xl transition-all border-3 border-emerald-500 group cursor-pointer"
              >
                <ShoppingBag className="w-8 h-8 text-emerald-200 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>Pesan HI-OMEGA Sekarang</span>
              </button>

              <a
                href="#produk"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-950 font-black px-8 py-5 sm:py-6 rounded-2xl text-xl sm:text-2xl border-3 border-emerald-600 shadow-md transition"
              >
                <Sparkles className="w-6 h-6 text-emerald-700" />
                <span>Lihat Pilihan Paket</span>
              </a>
            </div>

            {/* Marketplace Direct Order Shortcuts: Shopee & TikTok Shop */}
            <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <span className="text-base font-black text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Bisa Pesan Lewat Marketplace Resmi:</span>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://s.shopee.co.id/W70hOBonR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#EE4D2D] hover:bg-[#d73f1f] text-white font-black px-5 py-3 rounded-2xl text-base shadow-md hover:shadow-lg transition active:scale-95"
                >
                  <span className="w-5 h-5 bg-white text-[#EE4D2D] rounded-full flex items-center justify-center font-black text-xs">S</span>
                  <span>Beli di Shopee</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://vt.tokopedia.com/t/ZS9ATgaYMYp59-bQN3l/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-black hover:bg-slate-900 text-white font-black px-5 py-3 rounded-2xl text-base shadow-md hover:shadow-lg transition border border-slate-700 active:scale-95"
                >
                  <span className="w-5 h-5 bg-cyan-400 text-black rounded-full flex items-center justify-center font-black text-xs">T</span>
                  <span>Beli di TikTok Shop</span>
                  <ExternalLink className="w-4 h-4 text-cyan-300" />
                </a>
              </div>
            </div>

            {/* Official trust badges */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-base sm:text-lg font-black text-slate-800">
              <span className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-300 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-600" /> Jamu Tradisional BPOM
              </span>
              <span className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-300 shadow-sm">
                <Award className="w-6 h-6 text-emerald-600" /> Uji Lab Terakreditasi
              </span>
              <span className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-300 shadow-sm">
                <Sparkles className="w-6 h-6 text-emerald-600" /> Halal Indonesia
              </span>
              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 px-4 py-2 rounded-2xl border border-emerald-400 shadow-sm">
                <MapPin className="w-6 h-6 text-emerald-700" /> Kirim Seluruh Indonesia (COD)
              </span>
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
                    HI-OMEGA Sacha Inchi + VCO
                  </h3>
                  <p className="text-base sm:text-lg text-slate-700 font-extrabold mt-1">
                    Isi 60 Kapsul Minyak Murni @500mg • Bersih & Alami
                  </p>
                  
                  {/* Price Tag with Extra Large High Contrast Typography */}
                  <div className="mt-3.5 inline-block bg-emerald-50 px-7 py-3 rounded-2xl border-2 border-emerald-400 shadow-sm">
                    <span className="text-sm sm:text-base text-slate-700 font-black block">Harga Resmi Website:</span>
                    <span className="text-4xl sm:text-5xl font-black text-emerald-950">
                      Rp 100.000
                    </span>
                    <span className="text-base text-slate-700 font-bold ml-1.5">/ botol</span>
                  </div>
                </div>

                {/* Multi-Photo Preview Gallery Thumbnails */}
                <div className="mt-5 pt-4 border-t-2 border-slate-200">
                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-600 mb-2.5">
                    Foto Nyata Produk & Pengiriman:
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
