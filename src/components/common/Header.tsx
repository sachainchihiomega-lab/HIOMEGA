import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { SymptomCategory, Member, SiteSettings } from '../../types';
import { 
  UserCheck, 
  LogIn, 
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentSymptom: SymptomCategory;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenIntake?: () => void;
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
  onOpenIntake,
  activeAffiliate,
  settings,
  currentRole,
  onOpenDashboard,
  onLogout,
  onScrollToProducts
}) => {
  // Sticky header visibility based on scroll direction
  // "HEADER TETAP STICKY NAMUN SAAT MELAKUKAN SCROLL KE ATAS HALAMAN MAKA OTOMATIS HEADER HIDDEN NAMUN SAAT SCROLL KE BAWAH MAKA SECARA OTOMATIS HEADER TETAP MUNCUL"
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible at the top of the page
      if (currentScrollY <= 25) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // Check scroll direction (reversed: hide when scrolling down, show when scrolling up)
      if (currentScrollY > lastScrollYRef.current) {
        // Scrolling DOWN -> Header otomatis hidden
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        // Scrolling UP -> Header otomatis muncul
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      }`}
    >
      {/* Top Banner for Trust & Reseller CTA */}
      {activeAffiliate ? (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white px-4 py-2 text-xs sm:text-sm font-semibold">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>
                Layanan Kemitraan Resmi HI-OMEGA: <strong className="text-emerald-200">{activeAffiliate.fullName}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-1 rounded-full text-xs shadow-md transition active:scale-95 cursor-pointer uppercase tracking-wider border border-amber-300"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>MAU JADI RESELLER</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-950 text-white px-4 py-2 text-xs sm:text-sm font-medium">
          <div className="container mx-auto flex items-center justify-center text-center">
            <span className="flex items-center gap-2 flex-wrap justify-center">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black px-5 py-1.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer uppercase tracking-wider border-2 border-amber-300"
              >
                <UserCheck className="w-4 h-4 text-slate-950" />
                <span>MAU JADI RESELLER</span>
              </button>
            </span>
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
        <div className="hidden lg:flex items-center gap-6 text-base font-black text-slate-800">
          <a href="#produk" className="hover:text-emerald-700 transition">
            Katalog Produk
          </a>
          <a href="#keluhan" className="hover:text-emerald-700 transition">
            Khasiat Klinis
          </a>
          {onOpenIntake && (
            <button 
              onClick={onOpenIntake}
              className="text-emerald-800 hover:text-emerald-950 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Pilih Keluhan</span>
            </button>
          )}
          <a href="#keunggulan" className="hover:text-emerald-700 transition">
            Keunggulan
          </a>
          <a href="#edukasi" className="hover:text-emerald-700 transition">
            Edukasi
          </a>
          <a href="#testimoni" className="hover:text-emerald-700 transition">
            Testimoni
          </a>
          <a href="#faq" className="hover:text-emerald-700 transition">
            FAQ
          </a>
        </div>

        {/* Action Buttons: Direct Website Order & Auth Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
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
