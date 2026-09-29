import React from 'react';
import { ProductItem, Member, SiteSettings } from '../../types';
import { 
  SOFTGELS_SPILL_IMAGE,
  PRODUCT_REAL_IMAGE,
  BUNDLE_PACK_IMAGE,
  GOLDEN_SOFTGELS_IMAGE
} from '../../data/initialData';
import { 
  Check, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Tag,
  Truck,
  ExternalLink
} from 'lucide-react';

interface ProductCatalogSectionProps {
  products: ProductItem[];
  activeAffiliate?: Member | null;
  onOpenOrderModal: (product: ProductItem) => void;
  settings: SiteSettings;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  products,
  activeAffiliate,
  onOpenOrderModal,
  settings
}) => {
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="produk" className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/50 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header with Large Fonts */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-white font-black text-sm sm:text-base px-4 py-2 rounded-full uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-5 h-5 text-emerald-300" />
            <span>KATALOG RESMI & HARGA TRANSPARAN</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Pilihan Paket HI-OMEGA Kapsul Herbal
          </h2>
          <p className="text-slate-700 text-lg sm:text-xl font-bold mt-3">
            100% Produk Original Bersegel Pabrik. Pilih paket kebutuhan kesehatan Anda dan lengkapi form pemesanan langsung:
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm sm:text-base font-black text-emerald-950 bg-emerald-100 border-2 border-emerald-400 px-5 py-2 rounded-full shadow-sm">
            <Truck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <span>Pengiriman Terjamin: Siap Kirim Cepat ke Seluruh Wilayah Indonesia (Bisa Bayar di Tempat / COD)</span>
          </div>
        </div>

        {/* Product Cards Grid with Larger Typography and Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {products.map((prod) => {
            let displayPrice = prod.retailPrice;
            if (activeAffiliate && activeAffiliate.customPricePerBottle && prod.id === 'hi-omega-60') {
              displayPrice = activeAffiliate.customPricePerBottle;
            }

            return (
              <div
                key={prod.id}
                className={`relative flex flex-col bg-white rounded-3xl overflow-hidden border-4 transition-all duration-300 hover:shadow-2xl ${
                  prod.isPopular
                    ? 'border-emerald-600 shadow-xl ring-4 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-emerald-400 shadow-md'
                }`}
              >
                {/* Popular / Best Seller Badge */}
                {prod.isPopular && (
                  <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 text-white text-xs sm:text-sm font-black uppercase text-center py-2 tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>PILIHAN TERLARIS (REKOMENDASI)</span>
                  </div>
                )}

                {/* Package Tag */}
                <div className="p-5 pb-0 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black uppercase px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    {prod.pillCount} Kapsul Softgel
                  </span>
                  <span className="text-xs sm:text-sm font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Stok: {prod.stock > 0 ? `${prod.stock} Botol` : 'Pre-Order'}
                  </span>
                </div>

                {/* Large Product Image */}
                <div className="p-5 flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50 flex items-center justify-center overflow-hidden p-2 border-2 border-slate-200 shadow-inner">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-0 flex-1 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-700 mt-1 line-clamp-2">
                    {prod.subName}
                  </p>

                  {/* Price Banner with Extra Large Numbers */}
                  <div className="my-4 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-400">
                    <div className="text-xs sm:text-sm text-slate-700 font-black">Harga Resmi Website:</div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-950">
                      {formatRupiah(displayPrice)}
                    </div>
                    {prod.retailPrice > displayPrice && (
                      <div className="text-sm font-black text-rose-600 line-through">
                        {formatRupiah(prod.retailPrice)}
                      </div>
                    )}
                  </div>

                  {/* Key Benefits List with Extra Large Text */}
                  <ul className="space-y-3 mb-6 flex-1 text-base font-bold text-slate-800">
                    {prod.keyBenefits.map((bnf, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <span className="leading-snug">{bnf}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Order Options: Direct Website Order & Marketplaces */}
                  <div className="pt-2 border-t-2 border-slate-100 space-y-2">
                    {/* Primary Button: Direct Website Order */}
                    <button
                      onClick={() => onOpenOrderModal(prod)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black py-4 px-5 rounded-2xl text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition border-2 border-emerald-500 cursor-pointer"
                    >
                      <ShoppingBag className="w-6 h-6 text-emerald-200" />
                      <span>PESAN DI WEBSITE (COD)</span>
                    </button>

                    {/* Marketplace Direct Shortcuts: Shopee & TikTok Shop */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href="https://s.shopee.co.id/W70hOBonR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#EE4D2D] hover:bg-[#d73f1f] text-white text-xs sm:text-sm font-black py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                      >
                        <span className="w-4 h-4 bg-white text-[#EE4D2D] rounded-full flex items-center justify-center font-black text-[10px]">S</span>
                        <span>Shopee</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href="https://vt.tokopedia.com/t/ZS9ATgaYMYp59-bQN3l/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black hover:bg-slate-900 text-white text-xs sm:text-sm font-black py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 border border-slate-700 shadow-sm"
                      >
                        <span className="w-4 h-4 bg-cyan-400 text-black rounded-full flex items-center justify-center font-black text-[10px]">T</span>
                        <span>TikTok Shop</span>
                        <ExternalLink className="w-3 h-3 text-cyan-300" />
                      </a>
                    </div>

                    <div className="text-center pt-1">
                      <span className="text-xs sm:text-sm text-slate-600 font-black">
                        Siap Dikirim Cepat ke Seluruh Indonesia (Bisa Bayar di Tempat / COD)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Product Picture Gallery Showcase: Rich Photos */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-300">
                100% Foto Fisik Asli Produk
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2.5">
                Dokumentasi Nyata HI-OMEGA Sacha Inchi + VCO
              </h3>
              <p className="text-base sm:text-lg text-slate-700 font-bold mt-1">
                Foto nyata botol bersegel resmi, kapsul softgel minyak keemasan, dan paket kirim aman langsung ke alamat rumah Anda.
              </p>
            </div>
            <div className="flex items-center gap-2 text-base font-black text-slate-800 bg-slate-100 px-5 py-3 rounded-2xl border-2 border-slate-300">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>Segel Asli Pabrik Terjamin</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-3xl overflow-hidden border-2 border-emerald-300 bg-slate-50 group shadow-sm">
              <img
                src={PRODUCT_REAL_IMAGE}
                alt="HI-OMEGA Botol Kemasan Asli"
                className="w-full h-52 sm:h-60 object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-emerald-50 text-center text-sm sm:text-base font-black text-emerald-950 border-t border-emerald-200">
                Botol Segel 60 Softgel
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border-2 border-emerald-300 bg-slate-50 group shadow-sm">
              <img
                src={GOLDEN_SOFTGELS_IMAGE}
                alt="Kapsul Softgel Minyak Keemasan"
                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-emerald-50 text-center text-sm sm:text-base font-black text-emerald-950 border-t border-emerald-200">
                Softgel Emas Minyak Murni
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border-2 border-emerald-300 bg-slate-50 group shadow-sm">
              <img
                src={BUNDLE_PACK_IMAGE}
                alt="Paket Hemat 3 Botol"
                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-emerald-50 text-center text-sm sm:text-base font-black text-emerald-950 border-t border-emerald-200">
                Paket Terapi 3 Botol
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border-2 border-emerald-300 bg-slate-50 group shadow-sm">
              <img
                src={SOFTGELS_SPILL_IMAGE}
                alt="Kemasan Resmi & Standar Mutu"
                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-emerald-50 text-center text-sm sm:text-base font-black text-emerald-950 border-t border-emerald-200">
                Standar BPOM & Uji SIG
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
