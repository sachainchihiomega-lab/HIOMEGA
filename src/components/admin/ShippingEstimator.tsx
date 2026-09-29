import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle, Package } from 'lucide-react';
import { INDONESIA_SHIPPING_RATES, ShippingRate } from '../../data/initialData';

interface ShippingEstimatorProps {
  className?: string;
  isDashboard?: boolean;
}

export const ShippingEstimator: React.FC<ShippingEstimatorProps> = ({
  className = '',
  isDashboard = false
}) => {
  const provinces = Array.from(new Set(INDONESIA_SHIPPING_RATES.map((r) => r.province)));
  const [selectedProvince, setSelectedProvince] = useState<string>(provinces[0] || 'Jawa Timur');
  
  const availableCities = INDONESIA_SHIPPING_RATES.filter((r) => r.province === selectedProvince);
  const [selectedCity, setSelectedCity] = useState<string>(availableCities[0]?.city || 'Kota Surabaya');
  const [bottleCount, setBottleCount] = useState<number>(1);

  // 1 bottle is approx 150g. Calculate kg weight (minimum 1 kg)
  const totalWeightKg = Math.max(1, Math.ceil((bottleCount * 150) / 1000));

  const currentRate: ShippingRate | undefined = INDONESIA_SHIPPING_RATES.find(
    (r) => r.province === selectedProvince && r.city === selectedCity
  ) || availableCities[0];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
          <Truck className="w-4 h-4 text-emerald-700" />
          <span>CEK ONGKOS KIRIM INTERNAL (ASAL: SIDOARJO)</span>
        </div>
        <h3 className={`font-black ${isDashboard ? 'text-2xl text-white' : 'text-2xl sm:text-3xl text-slate-900'}`}>
          Kalkulator Ongkos Kirim ke Seluruh Indonesia
        </h3>
        <p className={`text-sm mt-1 ${isDashboard ? 'text-slate-400' : 'text-slate-600'}`}>
          Asal Pengiriman Paten: <strong className={isDashboard ? 'text-emerald-300' : 'text-emerald-800'}>JAWA TIMUR - SIDOARJO</strong> (Gudang Logistik Pusat HI-OMEGA).
        </p>
      </div>

      <div className={`p-6 rounded-3xl border-2 ${isDashboard ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50 border-emerald-300 shadow-md'}`}>
        {/* Origin Notice Banner */}
        <div className="mb-6 p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl flex items-center justify-between text-xs sm:text-sm text-emerald-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Asal Pengiriman: <strong>Jawa Timur - Sidoarjo</strong></span>
          </div>
          <span className="bg-emerald-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-lg">
            Terstandarisasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Province selector */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDashboard ? 'text-slate-300' : 'text-slate-700'}`}>
              1. Provinsi Tujuan:
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => {
                const newProv = e.target.value;
                setSelectedProvince(newProv);
                const cities = INDONESIA_SHIPPING_RATES.filter((r) => r.province === newProv);
                if (cities.length > 0) {
                  setSelectedCity(cities[0].city);
                }
              }}
              className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none ${
                isDashboard ? 'bg-slate-900 border border-slate-700 text-white' : 'bg-white border-2 border-slate-300 text-slate-800'
              }`}
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>

          {/* City selector */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDashboard ? 'text-slate-300' : 'text-slate-700'}`}>
              2. Kota / Kabupaten Tujuan:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none ${
                isDashboard ? 'bg-slate-900 border border-slate-700 text-white' : 'bg-white border-2 border-slate-300 text-slate-800'
              }`}
            >
              {availableCities.map((cityObj) => (
                <option key={cityObj.city} value={cityObj.city}>
                  {cityObj.city}
                </option>
              ))}
            </select>
          </div>

          {/* Bottle quantity */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDashboard ? 'text-slate-300' : 'text-slate-700'}`}>
              3. Jumlah Botol:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={100}
                value={bottleCount}
                onChange={(e) => setBottleCount(Math.max(1, parseInt(e.target.value) || 1))}
                className={`w-full rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none ${
                  isDashboard ? 'bg-slate-900 border border-slate-700 text-white' : 'bg-white border-2 border-slate-300 text-slate-800'
                }`}
              />
              <span className={`text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap border ${
                isDashboard ? 'bg-slate-900 text-slate-300 border-slate-700' : 'bg-white text-slate-600 border-slate-300'
              }`}>
                ≈ {totalWeightKg} kg
              </span>
            </div>
          </div>
        </div>

        {/* Results Comparison Grid */}
        {currentRate && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center gap-2 text-xs font-bold ${isDashboard ? 'text-slate-300' : 'text-slate-700'}`}>
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Rute: Sidoarjo → <strong>{currentRate.city}, {currentRate.province}</strong></span>
              </div>
              <span className="text-[11px] font-bold bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full">
                Estimasi Sampai: {currentRate.estDays}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* J&T */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
                <div className="text-[11px] font-black uppercase text-red-600 tracking-wider mb-1">
                  J&T Express
                </div>
                <div className="text-xl font-black text-slate-900">
                  {formatRupiah(currentRate.jntReg * totalWeightKg)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Asal Sidoarjo ({currentRate.estDays})</div>
              </div>

              {/* JNE */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
                <div className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-1">
                  JNE Reguler
                </div>
                <div className="text-xl font-black text-slate-900">
                  {formatRupiah(currentRate.jneReg * totalWeightKg)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Asal Sidoarjo ({currentRate.estDays})</div>
              </div>

              {/* SiCepat */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
                <div className="text-[11px] font-black uppercase text-rose-600 tracking-wider mb-1">
                  SiCepat REG
                </div>
                <div className="text-xl font-black text-slate-900">
                  {formatRupiah(currentRate.sicepatReg * totalWeightKg)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Asal Sidoarjo ({currentRate.estDays})</div>
              </div>

              {/* Pos Indonesia */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
                <div className="text-[11px] font-black uppercase text-orange-600 tracking-wider mb-1">
                  Pos Kilat Khusus
                </div>
                <div className="text-xl font-black text-slate-900">
                  {formatRupiah(currentRate.posKilat * totalWeightKg)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Asal Sidoarjo ({currentRate.estDays})</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
