import React from 'react';
import { ProductItem, Member, SiteSettings } from '../../types';
import { 
  Check, 
  ShoppingBag, 
  Sparkles, 
  Zap,
  Tag,
  Truck
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
            <span>HARGA RESMI HI-OMEGA</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Pilihan Paket Harga Hemat
          </h2>
          <p className="text-emerald-800 text-lg sm:text-xl font-black mt-2">
            Dapatkan Diskon Harga Spesial Untuk Pembelian Banyak
          </p>
          <p className="text-slate-700 text-base sm:text-lg font-bold mt-2">
            100% Produk Original Bersegel Hologram. Setiap 1 botol tepat berisi 60 kapsul @500mg.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm sm:text-base font-black text-emerald-950 bg-emerald-100 border-2 border-emerald-400 px-5 py-2 rounded-full shadow-sm">
            <Truck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <span>Transaksi Di jamin Aman , Packing Kuat & Rapi , Pengiriman Cepat Ke Seluruh indonesia , Garansi Kerusakan Produk.</span>
          </div>
        </div>

        {/* Product Cards Grid with Larger Typography and Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {products.map((prod) => {
            let displayPrice = prod.promoPrice || prod.retailPrice;
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

                {/* Package Tag with exact Bottle count */}
                <div className="p-5 pb-0 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black uppercase px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    {prod.bottleCount} Botol ({prod.pillCount} Kapsul)
                  </span>
                  <span className="text-xs sm:text-sm font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Stok: {prod.stock > 0 ? `${prod.stock} Paket` : 'Pre-Order'}
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

                  {/* Order Options: Direct Website Order */}
                  <div className="pt-3 border-t-2 border-slate-100 space-y-2">
                    {/* Primary Button: Direct Website Order */}
                    <button
                      onClick={() => onOpenOrderModal(prod)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black py-2 sm:py-3.5 px-3 sm:px-5 rounded-xl sm:rounded-2xl text-sm sm:text-xl flex items-center justify-center gap-2 sm:gap-2.5 shadow-md hover:shadow-xl transition border-2 border-emerald-500 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-200" />
                      <span>BELI HI-OMEGA</span>
                    </button>

                    <div className="text-center pt-1">
                      <span className="text-xs sm:text-sm text-slate-600 font-black">
                        Siap Dikirim Cepat ke Seluruh Indonesia (Garansi Produk Original)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
