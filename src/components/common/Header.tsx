import React from 'react';
import { Logo } from './Logo';
import { SymptomCategory, Member, SiteSettings } from '../../types';
import { 
  UserCheck, 
  LogIn, 
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  currentSymptom: SymptomCategory;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  activeAffiliate?: Member | null;
  settings: SiteSettings;
  currentRole: string;
  onOpenDashboard: () => void;
  onLogout: () => void;
  onScrollToProducts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSymptom,
  onOpenLogin,
  onOpenRegister,
  activeAffiliate,
  settings,
  currentRole,
  onOpenDashboard,
  onLogout,
  onScrollToProducts
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Banner for Trust & Marketplace Shortcuts */}
      {activeAffiliate ? (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white px-4 py-2 text-xs sm:text-sm font-semibold">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>
                Layanan Kemitraan Resmi HI-OMEGA: <strong className="text-emerald-200">{activeAffiliate.fullName}</strong>
              </span>
            </div>
            <span className="text-xs bg-emerald-700/80 text-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-500">
              Transaksi Aman Terverifikasi Melalui Website
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-950 text-white px-4 py-2 text-xs sm:text-sm font-medium">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-bold">100% Herbal Alami Berizin BPOM & Halal Indonesia • Siap Kirim ke Seluruh Wilayah Indonesia</span>
            </span>

            {/* Official Marketplace Links in Header */}
            <div className="flex items-center gap-2 text-xs font-black">
              <a
                href="https://s.shopee.co.id/W70hOBonR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-[#EE4D2D] hover:bg-[#d73f1f] text-white px-3 py-1 rounded-xl shadow-sm transition"
              >
                <span>Shopee Resmi</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://vt.tokopedia.com/t/ZS9ATgaYMYp59-bQN3l/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-black hover:bg-slate-800 text-white border border-slate-700 px-3 py-1 rounded-xl shadow-sm transition"
              >
                <span>TikTok Shop</span>
                <ExternalLink className="w-3 h-3 text-cyan-300" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2">
            <Logo size="md" customLogoUrl={settings.images.logoUrl} />
          </a>
        </div>

        {/* Clean Nav Links */}
        <div className="hidden lg:flex items-center gap-7 text-base font-black text-slate-800">
          <a href="#produk" className="hover:text-emerald-700 transition">
            Katalog Produk
          </a>
          <a href="#keluhan" className="hover:text-emerald-700 transition">
            Khasiat Klinis
          </a>
          <a href="#keunggulan" className="hover:text-emerald-700 transition">
            Keunggulan
          </a>
          <a href="#edukasi" className="hover:text-emerald-700 transition">
            Edukasi
          </a>
          <a href="#testimoni" className="hover:text-emerald-700 transition">
            Testimoni
          </a>
        </div>

        {/* Action Buttons: Direct Website Order */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Website Direct Order Button */}
          <button
            onClick={onScrollToProducts}
            className="flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-md hover:shadow-lg transition text-sm sm:text-lg border-2 border-emerald-600 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-100" />
            <span>Pesan Sekarang (Isi Form)</span>
          </button>

          {/* Auth Menu */}
          {currentRole !== 'GUEST' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenDashboard}
                className="bg-slate-800 hover:bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition"
              >
                Panel {currentRole}
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              {settings.memberRegistrationEnabled && (
                <button
                  onClick={onOpenRegister}
                  className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-300 px-3 py-2 rounded-2xl transition"
                >
                  <UserCheck className="w-4 h-4 text-teal-700" />
                  Daftar Member
                </button>
              )}
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-2 rounded-2xl transition"
              >
                <LogIn className="w-4 h-4 text-slate-600" />
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
