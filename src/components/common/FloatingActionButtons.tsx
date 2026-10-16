import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Member, SiteSettings } from '../../types';

interface FloatingActionButtonsProps {
  settings: SiteSettings;
  activeAffiliate?: Member | null;
  onScrollToProducts: () => void;
  onOpenIntake: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onOpenIntake
}) => {
  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none">
      {/* Primary Floating Button: BUTUH SOLUSI ? */}
      <button
        onClick={onOpenIntake}
        className="relative group flex items-center gap-2.5 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white px-5 sm:px-6 py-3.5 rounded-full shadow-2xl transition-all duration-300 border-2 border-emerald-300 cursor-pointer"
        aria-label="BUTUH SOLUSI ?"
      >
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
        <span className="text-sm sm:text-base font-black tracking-wide uppercase">
          BUTUH SOLUSI ?
        </span>
      </button>
    </div>
  );
};
