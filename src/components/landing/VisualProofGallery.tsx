import React from 'react';
import { 
  PRODUCT_REAL_IMAGE, 
  SOFTGELS_SPILL_IMAGE, 
  BUNDLE_PACK_IMAGE, 
  GOLDEN_SOFTGELS_IMAGE, 
  SHIPPING_PARCEL_IMAGE, 
  HAPPY_SENIORS_IMAGE 
} from '../../data/initialData';
import { ShieldCheck, Award, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';

interface VisualProofGalleryProps {
  onScrollToProducts: () => void;
}

export const VisualProofGallery: React.FC<VisualProofGalleryProps> = ({ onScrollToProducts }) => {
  const visualCards = [
    {
      image: GOLDEN_SOFTGELS_IMAGE,
      tag: 'KEMURNIAN 100% NABATI',
      title: 'Softgel Emas Transparan Bebas Merkuri',
      points: [
        'Kaya Omega 3-6-9 dari Tanaman Sacha Inchi',
        'Minyak Kelapa Murni (VCO) Segar Dingin',
        'Cangkang Kapsul Halal & Cepat Larut'
      ]
    },
    {
      image: PRODUCT_REAL_IMAGE,
      tag: 'LEGALITAS BPOM RESMI',
      title: 'Kemasan Botol Segel Hologram Asli',
      points: [
        'Terdaftar Resmi di BPOM RI',
        'Sertifikasi Halal Indonesia',
        'Uji Laboratorium SIG Terakreditasi'
      ]
    },
    {
      image: SHIPPING_PARCEL_IMAGE,
      tag: 'PENGIRIMAN AMAN & CEPAT',
      title: 'Packing Aman Ekstra Bubble Wrap Tebal',
      points: [
        'Dikirim Langsung dari Gudang Logistik Resmi',
        'Bisa Bayar di Tempat (COD)',
        'Garansi Pecah Ganti Baru 100%'
      ]
    },
    {
      image: SOFTGELS_SPILL_IMAGE,
      tag: 'DOSIS TEPAT 500MG',
      title: 'Kapsul Nyaman Ditelan untuk Usia 40+',
      points: [
        'Tidak Berbau Amis Ikan Laut',
        'Aman Bagi Lambung Sensitif / GERD',
        'Cukup 2 Kapsul Pagi & Malam'
      ]
    },
    {
      image: BUNDLE_PACK_IMAGE,
      tag: 'PAKET TERAPI HEMAT',
      title: 'Pilihan 3 Botol untuk Pemulihan Rutin',
      points: [
        'Harga Lebih Hemat & Ekonomis',
        'Cukup untuk Terapi 1-2 Bulan',
        'Diskon Ongkos Kirim Se-Indonesia'
      ]
    },
    {
      image: HAPPY_SENIORS_IMAGE,
      tag: 'BUKTI NYATA KELUARGA',
      title: 'Kembali Aktif & Bugar Tanpa Linu Sendi',
      points: [
        'Bebas Beraktivitas Bersama Cucu',
        'Tekanan Darah & Kolesterol Stabil',
        'Tidur Nyenyak & Badan Segar'
      ]
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header with Large Readable Fonts */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 font-black text-sm sm:text-base px-4 py-2 rounded-full uppercase tracking-wider mb-3 border border-emerald-300">
            <Award className="w-5 h-5 text-emerald-700" />
            <span>FOTO REAL PRODUK & BUKTI KEASLIAN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Galeri Visual HI-OMEGA Asli
          </h2>

          <p className="mt-3 text-lg sm:text-xl font-bold text-slate-600">
            Kualitas fisik suplemen herbal, kemurnian minyak softgel, dan standar packing pengiriman resmi ke seluruh Indonesia.
          </p>
        </div>

        {/* 6 Visual Image-Rich Cards (Large Photos, Minimal Text, Big Fonts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visualCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border-3 border-emerald-200 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Large Image Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-sm text-emerald-100 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full border border-emerald-500 shadow">
                  {card.tag}
                </div>
              </div>

              {/* Card Body - Large Readable Typography */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {card.title}
                  </h3>

                  <ul className="mt-4 space-y-2.5">
                    {card.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-extrabold text-emerald-800">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Jaminan Mutu 100%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Kirim Se-Indonesia
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Big Bottom Action CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onScrollToProducts}
            className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black text-xl sm:text-2xl px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition border-2 border-emerald-500 group"
          >
            <ShoppingBag className="w-7 h-7 text-emerald-200 group-hover:scale-110 transition-transform" />
            <span>Pesan Sekarang (Beli Produk Asli)</span>
          </button>
          <p className="mt-3 text-sm sm:text-base font-extrabold text-slate-500">
            *Pengiriman Resmi Setiap Hari Kerja Langsung ke Alamat Rumah Anda (Bisa COD)
          </p>
        </div>
      </div>
    </section>
  );
};
