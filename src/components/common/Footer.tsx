import React from 'react';
import { Logo } from './Logo';
import { SiteSettings, Member } from '../../types';
import { ShieldCheck, ArrowUp, Lock, ShoppingBag, Truck, ExternalLink } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  activeAffiliate?: Member | null;
  onOpenLogin: () => void;
  onScrollToProducts: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  activeAffiliate,
  onOpenLogin,
  onScrollToProducts
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-10 border-t-4 border-emerald-600">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Logo size="md" customLogoUrl={settings.images.logoUrl} />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              HI-OMEGA Sacha Inchi + VCO Capsules adalah superfood nabati alami yang kaya akan Omega 3, 6, 9 dan Virgin Coconut Oil. Membantu menjaga kestabilan kolesterol, asam urat, gula darah, dan tekanan darah di usia emas 40 tahun ke atas.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-slate-400">
              <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                🛡️ BPOM RI Terdaftar
              </span>
              <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                ✅ Sertifikasi Halal
              </span>
              <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                🌿 100% Herbal Asli
              </span>
              <span className="bg-emerald-950/70 border border-emerald-800 text-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Kirim Cepat Seluruh Indonesia (COD)
              </span>
            </div>
          </div>

          {/* Quick Links for Elderly & Marketplaces */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-extrabold text-base">Toko Resmi & Navigasi</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="https://s.shopee.co.id/W70hOBonR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition flex items-center gap-1.5 text-white font-bold"
                >
                  <span className="w-4 h-4 bg-[#EE4D2D] text-white rounded-full flex items-center justify-center text-[10px] font-black">S</span>
                  <span>Shopee Resmi HI-OMEGA</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://vt.tokopedia.com/t/ZS9ATgaYMYp59-bQN3l/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 transition flex items-center gap-1.5 text-white font-bold"
                >
                  <span className="w-4 h-4 bg-cyan-400 text-black rounded-full flex items-center justify-center text-[10px] font-black">T</span>
                  <span>TikTok Shop Resmi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-emerald-400 transition">
                  • Pilihan Paket Kapsul
                </a>
              </li>
              <li>
                <a href="#keluhan" className="hover:text-emerald-400 transition">
                  • Khasiat & Manfaat Medis
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-emerald-400 transition">
                  • Keunggulan vs Superfood Lain
                </a>
              </li>
              <li>
                <button onClick={scrollToTop} className="hover:text-emerald-400 transition flex items-center gap-1">
                  • Kembali ke Atas <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Official Website Orders */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-extrabold text-base">Pemesanan Resmi Website</h4>
            <p className="text-xs text-slate-400">
              {activeAffiliate ? (
                <span>Layanan Kemitraan: <strong className="text-emerald-300">{activeAffiliate.fullName}</strong></span>
              ) : (
                <span>Layanan Terpadu Resmi {settings.csName}</span>
              )}
            </p>

            <button
              onClick={onScrollToProducts}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-black px-5 py-3 rounded-2xl text-sm transition shadow-lg border border-emerald-500 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-200" />
              <span>Pesan HI-OMEGA di Website (COD)</span>
            </button>

            <div className="pt-3">
              <button
                onClick={onOpenLogin}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Akses Login Owner / Admin / Member</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer as required on all health flyers */}
        <div className="pt-6 text-center space-y-2">
          <p className="text-xs text-slate-400 max-w-4xl mx-auto leading-relaxed">
            <em>
              <strong>Disclaimer Medis:</strong> Suplemen HI-OMEGA adalah bagian dari gaya hidup sehat dan asupan nutrisi nabati seimbang. Konsultasikan dengan dokter Anda untuk penggunaan bersamaan dengan resep obat medis lain. Tetap aktif berolahraga ringan, jaga pola makan rendah lemak jenuh, dan pantau kesehatan Anda secara berkala.
            </em>
          </p>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} HI-OMEGA Indonesia. Hak Cipta Dilindungi Undang-Undang. Produk Asli Bersegel Resmi BPOM RI.
          </p>
        </div>
      </div>
    </footer>
  );
};
