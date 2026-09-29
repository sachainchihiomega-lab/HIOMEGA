import React, { useEffect, useState } from 'react';
import { CheckCircle2, PackageCheck, UserCheck, X, MapPin, Sparkles } from 'lucide-react';
import { CustomerOrder, Member } from '../../types';
import { PRODUCT_REAL_IMAGE, SHIPPING_PARCEL_IMAGE } from '../../data/initialData';

export interface ToastData {
  id: string;
  type: 'order_success' | 'member_success' | 'live_order' | 'info';
  title: string;
  subtitle?: string;
  order?: CustomerOrder;
  member?: Member;
  image?: string;
  duration?: number; // ms
}

interface ToastNotificationProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <aside 
      aria-label="Notifikasi Sistem"
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[9999] w-[94vw] max-w-xl flex flex-col gap-3 pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </aside>
  );
};

const ToastItem: React.FC<{ toast: ToastData; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const duration = toast.duration || 8000;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismiss(toast.id);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [toast.id, duration, onDismiss]);

  const isOrder = toast.type === 'order_success';
  const isMember = toast.type === 'member_success';

  return (
    <div 
      role="status"
      aria-live="polite"
      className={`pointer-events-auto relative overflow-hidden rounded-3xl shadow-2xl border-4 transition-all duration-300 animate-bounce-short bg-white ${
      isOrder 
        ? 'border-emerald-600 ring-4 ring-emerald-500/30' 
        : isMember 
        ? 'border-teal-600 ring-4 ring-teal-500/30' 
        : 'border-slate-800 ring-4 ring-slate-400/20'
    }`}>
      {/* Top Banner Header */}
      <div className={`px-5 py-3 flex items-center justify-between text-white ${
        isOrder 
          ? 'bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800' 
          : isMember 
          ? 'bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-900' 
          : 'bg-slate-900'
      }`}>
        <div className="flex items-center gap-2.5">
          {isOrder ? (
            <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center border border-emerald-300/40">
              <PackageCheck className="w-5 h-5 text-emerald-200" />
            </div>
          ) : isMember ? (
            <div className="w-8 h-8 rounded-full bg-teal-500/30 flex items-center justify-center border border-teal-300/40">
              <UserCheck className="w-5 h-5 text-teal-200" />
            </div>
          ) : (
            <Sparkles className="w-5 h-5 text-amber-300" />
          )}

          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-200">
              {isOrder ? '✓ KONFIRMASI PESANAN RESMI' : isMember ? '✓ REGISTRASI BERHASIL' : 'NOTIFIKASI RESMI'}
            </span>
            <span className="text-[11px] text-emerald-100 font-semibold">
              Layanan Resmi Pemesanan HI-OMEGA
            </span>
          </div>
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="p-2 rounded-full hover:bg-white/20 active:scale-90 transition text-white/90 hover:text-white"
          title="Tutup Notifikasi"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Toast Content - EXTRA LARGE FONT & RICH IMAGE */}
      <div className="p-4 sm:p-6 flex items-start gap-4 sm:gap-6 bg-gradient-to-b from-white to-emerald-50/40">
        {/* Large Visual Thumbnail */}
        <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md bg-slate-100">
          <img
            src={toast.image || (isOrder ? SHIPPING_PARCEL_IMAGE : PRODUCT_REAL_IMAGE)}
            alt="Foto Produk HI-OMEGA"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-emerald-950/85 text-xs sm:text-sm font-black text-white text-center py-0.5">
            {isOrder ? 'ORIGINAL' : 'MEMBER'}
          </div>
        </div>

        {/* Text Content with Extra Large, High-Contrast Typography */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {toast.title}
            </h4>
          </div>

          {toast.subtitle && (
            <p className="text-lg sm:text-xl font-black text-emerald-950 leading-snug">
              {toast.subtitle}
            </p>
          )}

          {/* Specific Order Details Badges */}
          {toast.order && (
            <div className="pt-1.5 flex flex-wrap gap-2 text-sm sm:text-base font-black">
              <span className="bg-emerald-100 border border-emerald-300 text-emerald-950 px-3 py-1.5 rounded-xl">
                Kode: <strong className="text-emerald-900 font-black">#{toast.order.id}</strong>
              </span>
              <span className="bg-slate-100 border border-slate-300 text-slate-900 px-3 py-1.5 rounded-xl">
                Total: <strong className="text-slate-950 font-black">Rp {toast.order.grandTotal.toLocaleString('id-ID')}</strong>
              </span>
              <span className="bg-amber-50 border border-amber-300 text-amber-950 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                Pengiriman Resmi
              </span>
            </div>
          )}

          {/* Specific Member Details Badges */}
          {toast.member && (
            <div className="pt-1.5 flex flex-wrap gap-2 text-sm sm:text-base font-black">
              <span className="bg-teal-100 border border-teal-300 text-teal-950 px-3 py-1.5 rounded-xl">
                Username: <strong className="text-teal-900 font-black">@{toast.member.username}</strong>
              </span>
              <span className="bg-emerald-100 border border-emerald-300 text-emerald-950 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Status: Aktif Menunggu Verifikasi
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar Countdown */}
      <div className="h-1.5 w-full bg-slate-100">
        <div 
          className={`h-full transition-all ease-linear ${isOrder ? 'bg-emerald-600' : isMember ? 'bg-teal-600' : 'bg-slate-700'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
