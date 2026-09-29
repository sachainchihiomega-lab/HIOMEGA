import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Member, SiteSettings } from '../../types';

interface FloatingActionButtonsProps {
  settings: SiteSettings;
  activeAffiliate?: Member | null;
  onScrollToProducts: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onScrollToProducts
}) => {
  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none">
      {/* Primary Floating Website Order Button */}
      <button
        onClick={onScrollToProducts}
        className="relative group flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white px-5 sm:px-6 py-3.5 rounded-full shadow-2xl transition-all duration-300 border-2 border-white/80 cursor-pointer"
        aria-label="Pesan di Website COD"
      >
        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200" />
        <span className="text-sm sm:text-base font-black tracking-wide">
          Pesan di Website (COD)
        </span>
      </button>
    </div>
  );
};
