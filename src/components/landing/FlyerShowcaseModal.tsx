import React from 'react';
import { X, CheckCircle, ShieldCheck, Download, Sparkles, ShoppingBag } from 'lucide-react';
import { SYMPTOM_DATA } from '../../data/initialData';
import { SymptomCategory, SiteSettings } from '../../types';

interface FlyerShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  settings: SiteSettings;
  onOrderNow: () => void;
}

export const FlyerShowcaseModal: React.FC<FlyerShowcaseModalProps> = ({
  isOpen,
  onClose,
  title,
  category,
  settings,
  onOrderNow
}) => {
  if (!isOpen) return null;

  const symKey = (category in SYMPTOM_DATA ? category : 'semua') as SymptomCategory;
  const data = SYMPTOM_DATA[symKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 text-white rounded-3xl shadow-2xl border-4 border-emerald-500 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-black text-white truncate">
              Flyer Edukasi & Rekomendasi: {title || data.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content / Flyer Render */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Visual Poster Simulation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md text-center text-slate-900">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase mb-3">
              {data.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {data.headline}
            </h2>

            <p className="mt-3 text-lg sm:text-xl text-slate-700 font-semibold max-w-2xl mx-auto">
              {data.subheadline}
            </p>

            {/* Graphic Badge */}
            <div className="my-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-around gap-4 text-sm font-bold text-emerald-950">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-600" /> 100% Ekstrak Nabati
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Terdaftar BPOM RI
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-600" /> Kapsul Lembut 500mg
              </span>
            </div>

            {/* Big readable symptoms list */}
            <div className="text-left mt-6">
              <h4 className="text-lg font-black text-slate-900 mb-3 border-b pb-2">
                Gejala Klinis Terkait:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.symptomsList.map((sym, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg font-bold text-slate-800">
                      {sym}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Mechanism */}
            <div className="text-left mt-6 bg-emerald-900 text-white p-6 rounded-2xl">
              <h4 className="text-lg sm:text-xl font-black text-emerald-200 mb-3">
                {data.mechanismTitle}
              </h4>
              <div className="space-y-3">
                {data.mechanismSteps.map((st, idx) => (
                  <div key={idx} className="border-b border-emerald-800/80 pb-2">
                    <div className="text-sm font-extrabold text-emerald-300">
                      • {st.title}
                    </div>
                    <div className="text-sm sm:text-base text-emerald-100 font-medium">
                      {st.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial highlight */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 font-bold text-base sm:text-lg italic">
              {data.highlightQuote}
            </div>
          </div>
        </div>

        {/* Footer CTA: Direct to web order form */}
        <div className="bg-slate-950 p-4 sm:p-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="text-xs sm:text-sm font-medium text-slate-400 text-center sm:text-left">
            Siap menjaga kesehatan organ tubuh Anda mulai hari ini?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOrderNow();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm sm:text-base shadow-lg transition"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-200" />
              <span>Pesan Produk Ini (Buka Form)</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-slate-700 font-bold text-slate-300 hover:bg-slate-800 text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
