import React, { useState } from 'react';
import { ProductItem, CustomerOrder, SiteSettings, Member, SymptomCategory } from '../../types';
import { INDONESIA_SHIPPING_RATES, ShippingRate, SHIPPING_PARCEL_IMAGE } from '../../data/initialData';
import { addCustomerOrder } from '../../utils/storage';
import { 
  X, 
  CheckCircle, 
  Truck, 
  ShieldCheck, 
  ShoppingBag, 
  MapPin, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  settings: SiteSettings;
  activeAffiliate?: Member | null;
  currentSymptom?: SymptomCategory;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  product,
  settings,
  activeAffiliate,
  currentSymptom = 'semua',
  onOrderSuccess
}) => {
  if (!isOpen || !product) return null;

  const [qty, setQty] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState<string>('');
  const [addressDetails, setAddressDetails] = useState<string>('');
  
  const provinces = Array.from(new Set(INDONESIA_SHIPPING_RATES.map((r) => r.province)));
  const [selectedProvince, setSelectedProvince] = useState<string>(provinces[0]);
  
  const availableCities = INDONESIA_SHIPPING_RATES.filter((r) => r.province === selectedProvince);
  const [selectedCity, setSelectedCity] = useState<string>(availableCities[0]?.city || '');
  const [selectedCourier, setSelectedCourier] = useState<'jne' | 'jnt' | 'sicepat' | 'pos'>('jnt');

  // Captcha state
  const [captchaNum1] = useState<number>(() => Math.floor(Math.random() * 5) + 3);
  const [captchaNum2] = useState<number>(() => Math.floor(Math.random() * 4) + 2);
  const [captchaAnswer, setCaptchaAnswer] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  // Submission & Flow states
  const [viewState, setViewState] = useState<'form' | 'success'>('form');
  const [placedOrder, setPlacedOrder] = useState<CustomerOrder | null>(null);

  // Price calculations
  let effectiveUnitPrice = product.retailPrice;
  if (activeAffiliate && activeAffiliate.customPricePerBottle && product.id === 'hi-omega-60') {
    effectiveUnitPrice = activeAffiliate.customPricePerBottle;
  }

  const subtotal = effectiveUnitPrice * qty;
  const currentRate: ShippingRate | undefined = INDONESIA_SHIPPING_RATES.find(
    (r) => r.province === selectedProvince && r.city === selectedCity
  ) || availableCities[0];

  const weightKg = Math.max(1, Math.ceil((qty * product.weightGrams) / 1000));
  
  // Internal calculation origin
  let shippingCost = 15000;
  if (currentRate) {
    if (selectedCourier === 'jne') shippingCost = currentRate.jneReg * weightKg;
    else if (selectedCourier === 'jnt') shippingCost = currentRate.jntReg * weightKg;
    else if (selectedCourier === 'sicepat') shippingCost = currentRate.sicepatReg * weightKg;
    else if (selectedCourier === 'pos') shippingCost = currentRate.posKilat * weightKg;
  }

  const grandTotal = subtotal + shippingCost;

  // Calculate affiliate profit
  let affiliateProfit = 0;
  if (activeAffiliate) {
    const margin = Math.max(0, effectiveUnitPrice - product.affiliateBasePrice);
    affiliateProfit = margin * qty;
  }

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const validateForm = (): boolean => {
    setErrorMsg('');
    if (!customerName.trim() || !customerWhatsapp.trim() || !addressDetails.trim()) {
      setErrorMsg('Mohon lengkapi Nama Lengkap, Nomor WhatsApp, dan Alamat Pengiriman.');
      return false;
    }
    if (settings.captchaEnabled) {
      if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
        setErrorMsg('Jawaban verifikasi keamanan (Captcha) belum tepat. Silakan coba lagi.');
        return false;
      }
    }
    return true;
  };

  // Direct Purchase Submission
  const handleDirectOrderSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    const newOrder: CustomerOrder = {
      id: `HIO-${Date.now().toString().slice(-6)}`,
      customerName: customerName.trim(),
      customerWhatsapp: customerWhatsapp.trim(),
      destinationProvince: selectedProvince,
      destinationCity: selectedCity,
      addressDetails: addressDetails.trim(),
      courier: `${selectedCourier.toUpperCase()}`,
      shippingCost,
      items: [
        {
          productId: product.id,
          productName: product.name,
          qty,
          pricePerUnit: effectiveUnitPrice,
          totalPrice: subtotal
        }
      ],
      subtotal,
      grandTotal,
      affiliateRef: activeAffiliate ? activeAffiliate.username : undefined,
      affiliateProfit,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    addCustomerOrder(newOrder);
    setPlacedOrder(newOrder);
    setViewState('success');
    onOrderSuccess(newOrder);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-500 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header with High Readability */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-emerald-300" />
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">Form Pemesanan Resmi HI-OMEGA</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition"
            title="Tutup Form"
            aria-label="Tutup Form"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* 1. ORDER CONFIRMATION VIEW (CHECKOUT BERHASIL) */}
        {viewState === 'success' && placedOrder && (
          <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto">
            {/* Visual Parcel Image */}
            <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-emerald-500 shadow-2xl bg-slate-100">
              <img
                src={SHIPPING_PARCEL_IMAGE}
                alt="Paket Resmi HI-OMEGA Siap Kirim"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-emerald-950/85 text-xs sm:text-sm font-black text-white text-center py-1">
                SIAP KIRIM
              </div>
            </div>

            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-sm sm:text-base font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full">
                Transaksi Resmi Berhasil Dicatat
              </span>
              <h4 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                Pesanan Anda Sedang Diproses!
              </h4>
              <p className="text-lg sm:text-xl text-slate-700 font-extrabold mt-1.5">
                Nomor Pesanan: <strong className="text-emerald-800 font-mono text-2xl">#{placedOrder.id}</strong>
              </p>
            </div>

            {/* Warehouse Proof without City Name */}
            <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-base sm:text-lg text-emerald-950 font-black flex items-center justify-center gap-2.5 shadow-sm">
              <Truck className="w-6 h-6 text-emerald-700 flex-shrink-0" />
              <span>Paket Dikirim Langsung dari: <strong>Gudang Resmi Logistik Pusat HI-OMEGA (Bisa COD)</strong></span>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 text-left text-base sm:text-lg space-y-3.5 max-w-lg mx-auto shadow-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600 font-bold">Produk:</span>
                <span className="font-black text-slate-900">{product.name} ({qty} Botol)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600 font-bold">Penerima:</span>
                <span className="font-black text-slate-900">{placedOrder.customerName} ({placedOrder.customerWhatsapp})</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600 font-bold">Alamat Tujuan:</span>
                <span className="font-bold text-slate-900 text-right">{placedOrder.addressDetails}, {placedOrder.destinationCity}, {placedOrder.destinationProvince}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600 font-bold">Kurir:</span>
                <span className="font-black text-slate-900 uppercase">{placedOrder.courier}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600 font-bold">Biaya Ongkir:</span>
                <span className="font-black text-slate-900">{formatRupiah(placedOrder.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-2xl sm:text-3xl pt-2 font-black text-emerald-950">
                <span>Total Tagihan:</span>
                <span className="text-emerald-800">{formatRupiah(placedOrder.grandTotal)}</span>
              </div>
            </div>

            {/* Instruction */}
            <div className="p-4 bg-teal-50 border-2 border-teal-300 rounded-2xl text-base sm:text-lg text-teal-950 font-bold max-w-lg mx-auto">
              Data pesanan Anda telah tersimpan di sistem. Tim logistik resmi akan segera mengirimkan konfirmasi resi pengiriman ke WhatsApp: <strong className="text-teal-900">{placedOrder.customerWhatsapp}</strong>.
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-black px-10 py-4 sm:py-5 rounded-2xl text-xl sm:text-2xl shadow-xl transition"
              >
                Selesai & Kembali ke Halaman Utama
              </button>
            </div>
          </div>
        )}

        {/* 2. MAIN FORM INPUT VIEW (Single Direct Order Form) */}
        {viewState === 'form' && (
          <form onSubmit={handleDirectOrderSubmit} className="p-6 overflow-y-auto space-y-6">
            {errorMsg && (
              <div className="p-4 bg-rose-50 border-2 border-rose-300 text-rose-900 rounded-2xl text-base font-black">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Large Product Summary Card with Visual Thumbnail */}
            <div className="flex items-center gap-4 p-4 sm:p-5 bg-emerald-50/80 rounded-2xl border-2 border-emerald-300 shadow-sm">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400 bg-white flex-shrink-0 shadow-sm flex items-center justify-center p-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-900 text-lg sm:text-xl leading-snug">{product.name}</h4>
                <div className="text-sm sm:text-base font-bold text-slate-600 mt-0.5">
                  {product.pillCount} Kapsul • {formatRupiah(effectiveUnitPrice)} / botol
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-emerald-800 mt-1">
                  ✓ 100% Produk Original Bersegel Pabrik
                </div>
              </div>

              {/* Big Quantity Selector for Seniors */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-slate-300 font-black text-xl text-slate-700 hover:bg-slate-100 flex items-center justify-center shadow-sm"
                  aria-label="Kurangi Jumlah"
                >
                  -
                </button>
                <span className="font-black text-xl sm:text-2xl px-2 min-w-[2rem] text-center text-slate-900">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-slate-300 font-black text-xl text-slate-700 hover:bg-slate-100 flex items-center justify-center shadow-sm"
                  aria-label="Tambah Jumlah"
                >
                  +
                </button>
              </div>
            </div>

            {/* Marketplace Shortcut Options inside Order Modal */}
            <div className="p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="font-bold text-slate-700">Mau belanja via Marketplace Resmi?</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://s.shopee.co.id/W70hOBonR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#EE4D2D] hover:bg-[#d73f1f] text-white font-black px-4 py-2 rounded-xl transition"
                >
                  <span>Beli di Shopee</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://vt.tokopedia.com/t/ZS9ATgaYMYp59-bQN3l/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-black hover:bg-slate-900 text-white font-black px-4 py-2 rounded-xl transition border border-slate-700"
                >
                  <span>TikTok Shop</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                </a>
              </div>
            </div>

            {/* Customer Contact Inputs - Extra Large Fonts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-1.5">
                  Nama Lengkap Penerima: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Supriyadi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-2xl px-4 py-3.5 text-lg sm:text-xl font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-1.5">
                  Nomor WhatsApp Aktif: *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={customerWhatsapp}
                  onChange={(e) => setCustomerWhatsapp(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-2xl px-4 py-3.5 text-lg sm:text-xl font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Shipping Assurance Notice */}
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between text-base">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="text-slate-600 font-bold block text-xs sm:text-sm uppercase tracking-wider">Jaminan Logistik Resmi:</span>
                  <strong className="text-emerald-950 font-black text-base sm:text-lg">
                    Pengiriman Cepat & Berasuransi ke Seluruh Indonesia (Bisa Bayar di Tempat / COD)
                  </strong>
                </div>
              </div>
              <span className="bg-emerald-700 text-white font-black text-xs sm:text-sm px-3.5 py-1 rounded-xl">
                Aman
              </span>
            </div>

            {/* Shipping Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-1.5">
                  Provinsi Tujuan: *
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => {
                    const newP = e.target.value;
                    setSelectedProvince(newP);
                    const cities = INDONESIA_SHIPPING_RATES.filter((r) => r.province === newP);
                    if (cities.length > 0) setSelectedCity(cities[0].city);
                  }}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-2xl px-4 py-3.5 text-base sm:text-lg font-bold text-slate-900 focus:outline-none"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-1.5">
                  Kota / Kabupaten Tujuan: *
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-2xl px-4 py-3.5 text-base sm:text-lg font-bold text-slate-900 focus:outline-none"
                >
                  {availableCities.map((c) => (
                    <option key={c.city} value={c.city}>
                      {c.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Full Street Address */}
            <div>
              <label className="block text-base sm:text-lg font-black text-slate-900 mb-1.5">
                Alamat Lengkap Pengiriman: *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Nama Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Patokan Rumah..."
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-2xl px-4 py-3 text-base sm:text-lg font-bold text-slate-900 focus:outline-none"
              />
            </div>

            {/* Courier Selection */}
            <div>
              <label className="block text-base sm:text-lg font-black text-slate-900 mb-2">
                Pilih Ekspedisi Kurir:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['jnt', 'jne', 'sicepat', 'pos'] as const).map((cr) => (
                  <button
                    key={cr}
                    type="button"
                    onClick={() => setSelectedCourier(cr)}
                    className={`py-3 px-3 rounded-2xl text-base sm:text-lg font-black uppercase transition border-2 flex items-center justify-center gap-2 ${
                      selectedCourier === cr
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-102'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <Truck className="w-5 h-5" />
                    <span>{cr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Captcha Verification (if enabled) */}
            {settings.captchaEnabled && (
              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300">
                <div className="flex items-center gap-2 mb-2 text-sm font-black text-amber-900">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  <span>Verifikasi Keamanan (Cegah Spam):</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-xl font-black text-slate-900">
                    Berapa {captchaNum1} + {captchaNum2} = ?
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="Jawaban"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-28 bg-white border-2 border-amber-400 focus:border-amber-600 rounded-xl px-3 py-2 text-center text-lg font-black text-slate-900"
                  />
                </div>
              </div>
            )}

            {/* Price breakdown with High Readability */}
            <div className="p-5 bg-slate-100 rounded-2xl space-y-2 text-base font-bold text-slate-700">
              <div className="flex justify-between">
                <span>Subtotal Produk ({qty} botol):</span>
                <span className="font-extrabold text-slate-900">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Ongkir ({selectedCourier.toUpperCase()} {weightKg}kg):</span>
                <span className="font-extrabold text-slate-900">{formatRupiah(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-xl sm:text-2xl pt-2 border-t-2 border-slate-300 font-black text-emerald-950">
                <span>Total Pembayaran:</span>
                <span className="text-emerald-800">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            {/* Single Prominent Checkout Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black py-4 sm:py-5 px-6 rounded-2xl text-xl sm:text-2xl shadow-xl transition flex items-center justify-center gap-3 border-2 border-emerald-500 tracking-wide cursor-pointer"
              >
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 flex-shrink-0" />
                <span>PESAN SEKARANG & SELESAIKAN PEMBELIAN</span>
              </button>

              <p className="text-center text-xs sm:text-sm text-slate-600 font-extrabold mt-3">
                ✓ 100% Produk Original Bersegel • Dikirim Cepat ke Seluruh Indonesia (Bisa Bayar di Tempat / COD)
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
