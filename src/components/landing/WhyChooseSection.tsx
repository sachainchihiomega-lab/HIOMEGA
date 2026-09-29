import React from 'react';
import { 
  Check, 
  X, 
  Minus, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  Leaf, 
  Fish, 
  Flame, 
  Heart,
  Droplets,
  ArrowRight
} from 'lucide-react';
import { PRODUCT_REAL_IMAGE, GOLDEN_SOFTGELS_IMAGE } from '../../data/initialData';

interface WhyChooseSectionProps {
  onScrollToProducts: () => void;
}

interface ComparisonRow {
  factor: string;
  factorDesc: string;
  hiOmega: {
    highlight: string;
    sub: string;
    status: 'best' | 'good' | 'average' | 'poor';
  };
  fishOil: {
    highlight: string;
    sub: string;
    status: 'best' | 'good' | 'average' | 'poor';
  };
  oliveOil: {
    highlight: string;
    sub: string;
    status: 'best' | 'good' | 'average' | 'poor';
  };
  chiaSeed: {
    highlight: string;
    sub: string;
    status: 'best' | 'good' | 'average' | 'poor';
  };
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    factor: 'Kadar Asam Lemak Omega-3',
    factorDesc: 'Nutrisi kunci untuk melarutkan plak kolesterol & perlindungan jantung',
    hiOmega: {
      highlight: 'Sangat Tinggi (~48%)',
      sub: 'Hingga 17x lipat lebih tinggi dari minyak ikan per takaran nabati',
      status: 'best'
    },
    fishOil: {
      highlight: 'Sedang (18% - 30%)',
      sub: 'Tergantung jenis ikan dan proses pemurnian industri',
      status: 'average'
    },
    oliveOil: {
      highlight: 'Sangat Rendah (< 1%)',
      sub: 'Didominasi asam oleat (Omega-9), minim Omega-3',
      status: 'poor'
    },
    chiaSeed: {
      highlight: 'Sedang (~18%)',
      sub: 'Tersimpan dalam biji padat dengan dinding sel keras',
      status: 'average'
    }
  },
  {
    factor: 'Keseimbangan Omega 3-6-9',
    factorDesc: 'Sinergi asam lemak esensial untuk kesehatan sel & sirkulasi darah',
    hiOmega: {
      highlight: 'Lengkap & Seimbang',
      sub: 'Kombinasi Omega 3 (48%), Omega 6 (36%), Omega 9 (9%)',
      status: 'best'
    },
    fishOil: {
      highlight: 'Hanya Omega-3',
      sub: 'Tidak memiliki spektrum lengkap Omega 6 dan 9 nabati',
      status: 'average'
    },
    oliveOil: {
      highlight: 'Hanya Omega-9',
      sub: 'Kaya asam lemak tak jenuh tunggal, namun kurang asam esensial',
      status: 'average'
    },
    chiaSeed: {
      highlight: 'Sebagian Saja',
      sub: 'Kandungan Omega-9 sangat rendah',
      status: 'average'
    }
  },
  {
    factor: 'Aroma & Kenyamanan Lambung (Bebas Amis)',
    factorDesc: 'Kenyamanan saat ditelan, terutama bagi usia 40 tahun ke atas',
    hiOmega: {
      highlight: '100% Bebas Bau Amis',
      sub: 'Wangi gurih nabati kacang bintang & kelapa lembut, tidak bikin enek',
      status: 'best'
    },
    fishOil: {
      highlight: 'Bau Amis Menyengat',
      sub: 'Sering memicu mual dan sendawa berbau amis ikan laut',
      status: 'poor'
    },
    oliveOil: {
      highlight: 'Rasa Agak Getir',
      sub: 'Meninggalkan rasa pahit/panas di tenggorokan bila diminum langsung',
      status: 'average'
    },
    chiaSeed: {
      highlight: 'Cenderung Hambar',
      sub: 'Harus direndam air lama atau dibuat puding agar lunak',
      status: 'average'
    }
  },
  {
    factor: 'Risiko Cemaran Logam Berat / Merkuri',
    factorDesc: 'Keamanan jangka panjang bagi organ ginjal dan hati',
    hiOmega: {
      highlight: '0% Merkuri (Bebas Toksin Laut)',
      sub: 'Hasil perkebunan darat organik terkontrol, aman dikonsumsi harian',
      status: 'best'
    },
    fishOil: {
      highlight: 'Rawan Merkuri & Mikroplastik',
      sub: 'Akumulasi racun rantai makanan laut dan limbah industri perairan',
      status: 'poor'
    },
    oliveOil: {
      highlight: 'Bebas Merkuri Laut',
      sub: 'Tanaman buah zaitun daratan',
      status: 'good'
    },
    chiaSeed: {
      highlight: 'Bebas Merkuri Laut',
      sub: 'Tanaman biji-bijian daratan',
      status: 'good'
    }
  },
  {
    factor: 'Kombinasi Minyak Kelapa Murni (VCO)',
    factorDesc: 'Mengandung Asam Laurat untuk antibakteri & mempercepat penyerapan',
    hiOmega: {
      highlight: 'Ada (Formula Eksklusif)',
      sub: 'Sinergi Sacha Inchi + VCO melipatgandakan khasiat daya tahan tubuh',
      status: 'best'
    },
    fishOil: {
      highlight: 'Tidak Ada',
      sub: 'Hanya minyak ikan tunggal murni',
      status: 'poor'
    },
    oliveOil: {
      highlight: 'Tidak Ada',
      sub: 'Hanya minyak zaitun tunggal',
      status: 'poor'
    },
    chiaSeed: {
      highlight: 'Tidak Ada',
      sub: 'Tanpa minyak kelapa murni (VCO)',
      status: 'poor'
    }
  },
  {
    factor: 'Stabilitas & Antioksidan Alami (Vitamin E)',
    factorDesc: 'Ketahanan minyak agar tidak cepat teroksidasi atau tengik',
    hiOmega: {
      highlight: 'Kaya Vitamin E Alami',
      sub: 'Antioksidan tokoferol alami tinggi menjaga kualitas kapsul tetap segar',
      status: 'best'
    },
    fishOil: {
      highlight: 'Sangat Cepat Tengik',
      sub: 'Mudah rusak teroksidasi bila terkena udara atau disimpan di suhu ruang',
      status: 'poor'
    },
    oliveOil: {
      highlight: 'Cukup Stabil',
      sub: 'Memiliki kandungan polifenol alami',
      status: 'good'
    },
    chiaSeed: {
      highlight: 'Cepat Rusak Bila Digiling',
      sub: 'Biji utuh sulit dicerna, sedangkan biji giling cepat teroksidasi',
      status: 'average'
    }
  },
  {
    factor: 'Keamanan Konsumsi Lansia & Asam Lambung',
    factorDesc: 'Kemudahan diserap tubuh tanpa memicu gas lambung berlebih',
    hiOmega: {
      highlight: 'Sangat Aman & Ramah Lambung',
      sub: 'Kapsul softgel mudah larut, tanpa asam lambung naik, 100% vegetarian',
      status: 'best'
    },
    fishOil: {
      highlight: 'Kerap Picu Maag & Mual',
      sub: 'Amis dan lemak hewani sering memperberat kerja asam lambung',
      status: 'poor'
    },
    oliveOil: {
      highlight: 'Aman Bagi Lambung',
      sub: 'Namun dosis minum tinggi dapat memicu rasa enek',
      status: 'good'
    },
    chiaSeed: {
      highlight: 'Rentan Kembung / Begah',
      sub: 'Tinggi serat kasar yang memicu perut begah bagi pencernaan lansia',
      status: 'average'
    }
  }
];

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onScrollToProducts }) => {
  return (
    <section id="keunggulan" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-800 mb-2">
            Perbandingan Sumber Nutrisi & Superfood
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Mengapa Memilih HI-OMEGA?
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-bold mt-3 leading-relaxed">
            Bandingkan fakta ilmiah keunggulan Sacha Inchi + VCO dibandingkan sumber Omega-3 dan minyak sehat lainnya. Pilihan terbaik untuk perlindungan kesehatan harian Anda:
          </p>
        </div>

        {/* 3 Value Highlight Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-emerald-50/70 border-2 border-emerald-400 rounded-3xl p-6 text-left shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl mb-4 shadow-md">
              17x
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5 leading-snug">
              Omega-3 Lebih Tinggi
            </h3>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">
              Kandungan asam lemak Omega-3 Sacha Inchi mencapai ~48%, jauh melampaui ikan salmon dan biji-bijian lainnya.
            </p>
          </div>

          <div className="bg-emerald-50/70 border-2 border-emerald-400 rounded-3xl p-6 text-left shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mb-4 shadow-md">
              <ShieldCheck className="w-7 h-7 text-emerald-100" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5 leading-snug">
              100% Bebas Merkuri & Bau Amis
            </h3>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">
              Ditanam secara alami di perkebunan darat organik. Bebas mikroplastik dan polutan laut, nyaman ditelan tanpa rasa mual.
            </p>
          </div>

          <div className="bg-emerald-50/70 border-2 border-emerald-400 rounded-3xl p-6 text-left shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mb-4 shadow-md">
              <Sparkles className="w-7 h-7 text-emerald-100" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5 leading-snug">
              Sinergi Sacha Inchi + VCO
            </h3>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">
              Formula ganda pertama di Indonesia yang memadukan asam lemak Omega 3-6-9 dengan Asam Laurat Virgin Coconut Oil.
            </p>
          </div>
        </div>

        {/* Desktop & Tablet Table Comparison View */}
        <div className="hidden lg:block overflow-hidden rounded-3xl border-3 border-slate-200 shadow-xl bg-white mb-10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-900">
                <th className="py-5 px-6 font-black text-base w-1/4">
                  Parameter Nutrisi & Manfaat
                </th>
                <th className="py-5 px-6 font-black text-lg bg-emerald-700 text-white w-1/3 relative shadow-inner">
                  <div className="flex items-center justify-between">
                    <span>HI-OMEGA (Sacha Inchi + VCO)</span>
                    <span className="text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-lg shadow-sm">
                      REKOMENDASI
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-100 mt-0.5">
                    100% Herbal Asli Berizin BPOM
                  </div>
                </th>
                <th className="py-5 px-5 font-black text-base text-slate-700 w-1/5">
                  Minyak Ikan (Fish Oil)
                </th>
                <th className="py-5 px-5 font-black text-base text-slate-700 w-1/5">
                  Minyak Zaitun (Olive Oil)
                </th>
                <th className="py-5 px-5 font-black text-base text-slate-700 w-1/5">
                  Biji Chia (Chia Seed)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {COMPARISON_DATA.map((row, index) => (
                <tr 
                  key={index}
                  className={index % 2 === 0 ? 'bg-white hover:bg-slate-50/70' : 'bg-slate-50/40 hover:bg-slate-50/90'}
                >
                  {/* Factor Description */}
                  <td className="py-4 px-6 align-top">
                    <strong className="block text-slate-900 text-base font-black">
                      {row.factor}
                    </strong>
                    <span className="text-xs text-slate-500 font-semibold block mt-1">
                      {row.factorDesc}
                    </span>
                  </td>

                  {/* HI-OMEGA Column (Highlighted) */}
                  <td className="py-4 px-6 align-top bg-emerald-50/70 border-x-2 border-emerald-300">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div>
                        <strong className="text-emerald-950 text-base font-black block">
                          {row.hiOmega.highlight}
                        </strong>
                        <span className="text-xs text-emerald-800 font-bold block mt-0.5">
                          {row.hiOmega.sub}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Fish Oil Column */}
                  <td className="py-4 px-5 align-top text-slate-700">
                    <div className="flex items-start gap-2">
                      {row.fishOil.status === 'poor' ? (
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Minus className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div>
                        <span className="text-slate-900 font-black block text-sm">
                          {row.fishOil.highlight}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                          {row.fishOil.sub}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Olive Oil Column */}
                  <td className="py-4 px-5 align-top text-slate-700">
                    <div className="flex items-start gap-2">
                      {row.oliveOil.status === 'poor' ? (
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Minus className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div>
                        <span className="text-slate-900 font-black block text-sm">
                          {row.oliveOil.highlight}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                          {row.oliveOil.sub}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Chia Seed Column */}
                  <td className="py-4 px-5 align-top text-slate-700">
                    <div className="flex items-start gap-2">
                      {row.chiaSeed.status === 'poor' ? (
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Minus className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div>
                        <span className="text-slate-900 font-black block text-sm">
                          {row.chiaSeed.highlight}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                          {row.chiaSeed.sub}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-Friendly Comparison Cards View */}
        <div className="lg:hidden space-y-5 mb-10">
          {COMPARISON_DATA.map((row, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-md space-y-4"
            >
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Kriteria #{idx + 1}
                </span>
                <h4 className="text-lg font-black text-slate-900 leading-snug">
                  {row.factor}
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {row.factorDesc}
                </p>
              </div>

              {/* HI-OMEGA Card (Winner) */}
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                    HI-OMEGA (Sacha Inchi + VCO)
                  </span>
                  <span className="text-[10px] bg-emerald-700 text-white font-black px-2 py-0.5 rounded">
                    TERBAIK
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-black text-base block">
                      {row.hiOmega.highlight}
                    </strong>
                    <p className="text-xs text-slate-700 font-semibold mt-0.5">
                      {row.hiOmega.sub}
                    </p>
                  </div>
                </div>
              </div>

              {/* Other Options Quick Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                {/* Fish Oil */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="font-bold text-slate-500 block text-[11px]">Minyak Ikan:</span>
                  <strong className="font-black text-slate-900 block mt-0.5">
                    {row.fishOil.highlight}
                  </strong>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    {row.fishOil.sub}
                  </span>
                </div>

                {/* Olive Oil */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="font-bold text-slate-500 block text-[11px]">Minyak Zaitun:</span>
                  <strong className="font-black text-slate-900 block mt-0.5">
                    {row.oliveOil.highlight}
                  </strong>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    {row.oliveOil.sub}
                  </span>
                </div>

                {/* Chia Seed */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="font-bold text-slate-500 block text-[11px]">Biji Chia:</span>
                  <strong className="font-black text-slate-900 block mt-0.5">
                    {row.chiaSeed.highlight}
                  </strong>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    {row.chiaSeed.sub}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
              SOLUSI SUPERFOOD TERBAIK UNTUK KESEHATAN KELUARGA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-snug">
              Beralih ke HI-OMEGA Sacha Inchi + VCO Hari Ini
            </h3>
            <p className="text-sm sm:text-base text-emerald-100 font-medium max-w-xl">
              Dapatkan manfaat Omega 3-6-9 konsentrasi tinggi tanpa bau amis, bebas merkuri, dan aman untuk lambung serta ginjal usia 40 tahun ke atas.
            </p>
          </div>

          <button
            onClick={onScrollToProducts}
            className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl shadow-lg transition cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6 text-slate-900" />
            <span>Pesan HI-OMEGA Sekarang</span>
            <ArrowRight className="w-5 h-5 text-slate-900" />
          </button>
        </div>
      </div>
    </section>
  );
};
