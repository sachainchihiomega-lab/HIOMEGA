import React, { useState, useEffect } from 'react';
import { ProductItem, CustomerOrder, SiteSettings, Member, SymptomCategory } from '../../types';
import { INDONESIA_SHIPPING_RATES, ShippingRate, SHIPPING_PARCEL_IMAGE, INITIAL_PRODUCTS } from '../../data/initialData';
import { addCustomerOrder } from '../../utils/storage';
import { 
  X, 
  CheckCircle, 
  Truck, 
  ShieldCheck, 
  ShoppingBag, 
  Copy,
  Check,
  AlertTriangle,
  CreditCard,
  MessageCircle,
  Building2,
  Clock,
  Sparkles
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

  // Selected package (allows switching between Paket Pribadi 1 botol, Paket Family 3 botol, Paket Reseller 5 botol)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(product);
  
  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, [product]);

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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Submission & Flow states
  const [viewState, setViewState] = useState<'form' | 'payment'>('form');
  const [placedOrder, setPlacedOrder] = useState<CustomerOrder | null>(null);

  const isAnswerEntered = captchaAnswer.trim() !== '';
  const parsedAnswer = parseInt(captchaAnswer.trim(), 10);
  const isCaptchaValid = !isNaN(parsedAnswer) && parsedAnswer === (captchaNum1 + captchaNum2);
  const isCaptchaInvalid = isAnswerEntered && !isCaptchaValid;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Sesuai dengan spesifikasi produk:
  // - PAKET PRIBADI: 1 BOTOL
  // - PAKET FAMILY: 3 BOTOL
  // - PAKET RESELLER: 5 BOTOL
  const bottlesPerPackage = selectedProduct.bottleCount || (
    selectedProduct.id === 'hi-omega-member-5' ? 5 :
    selectedProduct.id === 'hi-omega-paket-3' ? 3 : 1
  );
  const totalBottles = qty * bottlesPerPackage;
  const totalKapsul = qty * selectedProduct.pillCount;

  // Price calculations
  let effectiveUnitPrice = selectedProduct.promoPrice || selectedProduct.retailPrice;
  if (activeAffiliate && activeAffiliate.customPricePerBottle && selectedProduct.id === 'hi-omega-60') {
    effectiveUnitPrice = activeAffiliate.customPricePerBottle;
  }

  const subtotal = effectiveUnitPrice * qty;
  const currentRate: ShippingRate | undefined = INDONESIA_SHIPPING_RATES.find(
    (r) => r.province === selectedProvince && r.city === selectedCity
  ) || availableCities[0];

  // Semua paket baik Paket Pribadi, Paket Family, maupun Paket Reseller
  // seluruh berat produk dibuat sama semua yaitu 1 KG agar tidak ada perbedaan ongkos kirim di tiap paket
  const weightKg = 1;
  
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
    const margin = Math.max(0, effectiveUnitPrice - selectedProduct.affiliateBasePrice);
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
      if (!captchaAnswer.trim()) {
        setErrorMsg(`Mohon isi verifikasi keamanan: Berapa ${captchaNum1} + ${captchaNum2} = ?`);
        return false;
      }
      if (parseInt(captchaAnswer.trim(), 10) !== captchaNum1 + captchaNum2) {
        setErrorMsg(`Jawaban verifikasi keamanan belum tepat! Hasil penjumlahan ${captchaNum1} + ${captchaNum2} adalah ${captchaNum1 + captchaNum2}. Silakan perbaiki jawaban Anda.`);
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
          productId: selectedProduct.id,
          productName: `${selectedProduct.name} (${bottlesPerPackage} Botol)`,
          qty,
          pricePerUnit: effectiveUnitPrice,
          totalPrice: subtotal
        }
      ],
      subtotal,
      grandTotal,
      affiliateRef: activeAffiliate ? activeAffiliate.username : undefined,
      affiliateProfit,
      status: 'pending', // Menunggu Pembayaran
      createdAt: new Date().toISOString()
    };

    addCustomerOrder(newOrder);
    setPlacedOrder(newOrder);
    setViewState('payment');
    onOrderSuccess(newOrder);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-emerald-500 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with High Readability */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 px-4 py-3 sm:px-6 sm:py-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            {viewState === 'payment' ? (
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 flex-shrink-0" />
            ) : (
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 flex-shrink-0" />
            )}
            <h3 className="text-base sm:text-2xl font-black tracking-tight">
              {viewState === 'payment' ? 'Metode Pembayaran Transfer Bank' : 'Pemesanan Resmi HI-OMEGA'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition cursor-pointer"
            title="Tutup"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* 1. PAYMENT METHOD VIEW (Instruksi Transfer Bank & Status Menunggu Pembayaran) */}
        {viewState === 'payment' && placedOrder && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
            {/* Status Notice: Pesanan Berhasil Dicatat di Sistem */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-amber-200 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-xs flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 block">
                      Status Transaksi Sistem:
                    </span>
                    <strong className="text-amber-950 font-black text-sm sm:text-base leading-tight block">
                      Pesanan Masuk — Menunggu Pembayaran Transfer
                    </strong>
                  </div>
                </div>

                <div className="text-left sm:text-right bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-300/80">
                  <span className="text-[10px] sm:text-xs text-amber-800 font-bold block">Nomor Pesanan:</span>
                  <span className="font-mono text-emerald-950 font-black text-base sm:text-lg">#{placedOrder.id}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
                ✓ <strong>Pesanan Anda sudah otomatis tercatat di Dashboard Admin HI-OMEGA.</strong> Untuk memproses pengiriman produk bersegel resmi langsung dari gudang logistik, silakan lakukan transfer pembayaran ke salah satu rekening resmi di bawah ini.
              </p>
            </div>

            {/* Total Nominal yang Harus Ditransfer */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-4 sm:p-5 rounded-2xl shadow-md text-center space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-200 block">
                Total Yang Harus Ditransfer:
              </span>
              <div className="text-2xl sm:text-4xl font-black text-amber-300 tracking-tight">
                {formatRupiah(placedOrder.grandTotal)}
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-100 font-semibold">
                (Sudah mencakup {qty} Paket {selectedProduct.name} [{totalBottles} Botol / {totalKapsul} Kapsul] + ongkos kirim {placedOrder.courier})
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => handleCopy(placedOrder.grandTotal.toString(), 'amount')}
                  className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-black px-4 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer border border-white/30"
                >
                  {copiedKey === 'amount' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Nominal Transfer Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Nominal: {placedOrder.grandTotal.toLocaleString('id-ID')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Pilihan Rekening Transfer Bank Resmi */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">
                    Pilihan Rekening Transfer Bank Resmi:
                  </h4>
                </div>
                <span className="text-[10px] sm:text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  100% Rekening Resmi
                </span>
              </div>

              {/* CARD 1: BANK BRI */}
              <div className="bg-white border-2 border-blue-400 rounded-2xl p-4 shadow-xs hover:border-blue-500 transition space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-blue-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-700 text-white font-black text-xs sm:text-sm px-3 py-1 rounded-lg tracking-wider">
                      BANK BRI
                    </span>
                    <span className="text-xs font-bold text-slate-500 hidden sm:inline">Bank Rakyat Indonesia</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-blue-800">Transfer ATM / BRImo / Teller</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nomor Rekening:</div>
                    <div className="font-mono text-lg sm:text-2xl font-black text-slate-900 tracking-wider">
                      315-6010-500-575-30
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-blue-900">
                      Atas Nama: <strong className="font-black text-slate-900">MILA MUKROFIN</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy('315601050057530', 'bri')}
                    className="inline-flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 active:scale-95 text-blue-800 font-black px-4 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer border border-blue-300"
                  >
                    {copiedKey === 'bri' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>No. Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin No. Rekening BRI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* CARD 2: BANK BCA */}
              <div className="bg-white border-2 border-indigo-400 rounded-2xl p-4 shadow-xs hover:border-indigo-500 transition space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-indigo-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-700 text-white font-black text-xs sm:text-sm px-3 py-1 rounded-lg tracking-wider">
                      BANK BCA
                    </span>
                    <span className="text-xs font-bold text-slate-500 hidden sm:inline">Bank Central Asia</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-indigo-800">Transfer ATM / BCA Mobile / KlikBCA</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nomor Rekening:</div>
                    <div className="font-mono text-lg sm:text-2xl font-black text-slate-900 tracking-wider">
                      726-540-9512
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-indigo-900">
                      Atas Nama: <strong className="font-black text-slate-900">MILA MUKROFIN</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy('7265409512', 'bca')}
                    className="inline-flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-800 font-black px-4 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer border border-indigo-300"
                  >
                    {copiedKey === 'bca' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>No. Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin No. Rekening BCA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Notice Keamanan: SEMUA BANK ATAS NAMA MILA MUKROFIN */}
              <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-center text-xs font-bold text-slate-800">
                🔒 <strong>PERINGATAN RESMI:</strong> SEMUA BANK DI ATAS HANYA ATAS NAMA <strong>MILA MUKROFIN</strong>. Pastikan nama rekening tujuan sesuai saat transfer demi keamanan transaksi Anda.
              </div>
            </div>

            {/* Rincian Pesanan Singkat */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm space-y-2">
              <div className="font-black text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                <span>Rincian Pesanan Masuk:</span>
                <span className="text-emerald-800 font-bold font-mono">#{placedOrder.id}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Paket Dipesan:</span>
                <span className="font-black text-slate-900">{selectedProduct.name} ({qty} Paket = {totalBottles} Botol)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Penerima:</span>
                <span className="font-bold text-slate-900">{placedOrder.customerName} ({placedOrder.customerWhatsapp})</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Alamat Tujuan:</span>
                <span className="font-bold text-slate-900 text-right max-w-xs">{placedOrder.addressDetails}, {placedOrder.destinationCity}, {placedOrder.destinationProvince}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Kurir Pengiriman:</span>
                <span className="font-black text-slate-900 uppercase">{placedOrder.courier} (Ongkir: {formatRupiah(placedOrder.shippingCost)})</span>
              </div>
            </div>

            {/* Tombol WhatsApp Konfirmasi Transfer & Selesai */}
            <div className="space-y-2.5 pt-1">
              <a
                href={`https://wa.me/${(() => {
                  const raw = activeAffiliate?.whatsapp || settings.csWhatsapp || '0856-0774-6508';
                  const cl = raw.replace(/[^0-9]/g, '');
                  return cl.startsWith('0') ? '62' + cl.slice(1) : cl;
                })()}?text=${encodeURIComponent(
                  `Halo Admin HI-OMEGA, saya sudah melakukan pemesanan di website dengan rincian:\n- Nomor Pesanan: #${placedOrder.id}\n- Nama: ${placedOrder.customerName}\n- No. WhatsApp: ${placedOrder.customerWhatsapp}\n- Paket: ${selectedProduct.name} (${qty} Paket = ${totalBottles} Botol / ${totalKapsul} Kapsul)\n- Total Transfer: ${formatRupiah(placedOrder.grandTotal)}\n- Tujuan Rekening: Bank BRI (315-6010-500-575-30) / Bank BCA (726-540-9512) an MILA MUKROFIN\n\nSaya ingin mengonfirmasi bukti transfer pembayaran agar pesanan segera diproses kirim. Terima kasih!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-base shadow-lg transition flex items-center justify-center gap-2 border-2 border-emerald-500 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                <span>KONFIRMASI PEMBAYARAN VIA WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm transition cursor-pointer border border-slate-300"
              >
                Selesai & Kembali ke Halaman Utama
              </button>
            </div>
          </div>
        )}

        {/* 2. MAIN FORM INPUT VIEW (Single Direct Order Form) */}
        {viewState === 'form' && (
          <form onSubmit={handleDirectOrderSubmit} className="p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-5">
            {errorMsg && (
              <div className="p-2.5 sm:p-4 bg-rose-50 border-2 border-rose-300 text-rose-900 rounded-xl sm:rounded-2xl text-xs sm:text-base font-black">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Pilihan Paket HI-OMEGA (Paket Pribadi: 1 Botol, Paket Family: 3 Botol, Paket Reseller: 5 Botol) */}
            <div>
              <label className="block text-xs sm:text-sm font-black text-slate-900 mb-1.5">
                Pilih Paket Produk HI-OMEGA:
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                {INITIAL_PRODUCTS.map((prodItem) => {
                  const isCurrentSelected = selectedProduct.id === prodItem.id;
                  const itemBottles = prodItem.bottleCount || (
                    prodItem.id === 'hi-omega-member-5' ? 5 :
                    prodItem.id === 'hi-omega-paket-3' ? 3 : 1
                  );
                  const itemPrice = (activeAffiliate && activeAffiliate.customPricePerBottle && prodItem.id === 'hi-omega-60')
                    ? activeAffiliate.customPricePerBottle
                    : (prodItem.promoPrice || prodItem.retailPrice);

                  return (
                    <button
                      key={prodItem.id}
                      type="button"
                      onClick={() => {
                        setSelectedProduct(prodItem);
                        setQty(1);
                      }}
                      className={`p-2 sm:p-2.5 rounded-xl border-2 text-center transition cursor-pointer flex flex-col items-center justify-between gap-0.5 ${
                        isCurrentSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30 font-black shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-bold'
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight block">
                        {prodItem.name}
                      </span>
                      <span className={`text-xs sm:text-sm font-black px-1.5 py-0.5 rounded-md ${
                        isCurrentSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-emerald-800'
                      }`}>
                        {itemBottles} Botol
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-600">
                        {formatRupiah(itemPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive Product Summary Card & Quantity Control */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4.5 bg-gradient-to-br from-emerald-50/90 to-teal-50/60 rounded-xl sm:rounded-2xl border-2 border-emerald-300 shadow-xs">
              <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-emerald-400 bg-white flex-shrink-0 shadow-xs flex items-center justify-center p-1">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-emerald-700 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md uppercase">
                      {selectedProduct.name} ({bottlesPerPackage} BOTOL)
                    </span>
                  </div>
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm leading-snug mt-1">
                    {selectedProduct.subName}
                  </h4>
                  <div className="text-xs sm:text-sm font-bold text-emerald-900 mt-0.5">
                    Total {totalBottles} Botol ({totalKapsul} Kapsul) • {formatRupiah(effectiveUnitPrice)} / paket
                  </div>
                </div>
              </div>

              {/* Big Quantity Selector for Seniors - Responsive on Mobile */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t border-emerald-200/80 sm:border-0">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800">Jumlah Paket:</span>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-700">= {totalBottles} Botol</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 bg-white px-1.5 py-1 sm:p-1.5 rounded-xl border border-emerald-300 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-300 font-black text-base sm:text-xl text-slate-700 flex items-center justify-center shadow-xs cursor-pointer transition"
                    aria-label="Kurangi Jumlah"
                  >
                    -
                  </button>
                  <span className="font-black text-base sm:text-xl px-2 min-w-[1.75rem] text-center text-slate-900">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black text-base sm:text-xl flex items-center justify-center shadow-xs cursor-pointer transition"
                    aria-label="Tambah Jumlah"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Contact Inputs - Responsive on Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-base font-black text-slate-900 mb-1">
                  Nama Lengkap Penerima: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Supriyadi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-bold text-slate-900 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-base font-black text-slate-900 mb-1">
                  Nomor WhatsApp Aktif: *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={customerWhatsapp}
                  onChange={(e) => setCustomerWhatsapp(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-bold text-slate-900 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Shipping Assurance Notice */}
            <div className="p-2.5 sm:p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-xl sm:rounded-2xl flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="text-slate-600 font-bold block text-[10px] sm:text-xs uppercase tracking-wider">Jaminan Logistik Resmi:</span>
                  <strong className="text-emerald-950 font-black text-xs sm:text-sm leading-tight block">
                    Pengiriman Cepat & Berasuransi ke Seluruh Indonesia
                  </strong>
                </div>
              </div>
              <span className="bg-emerald-700 text-white font-black text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg flex-shrink-0">
                Aman
              </span>
            </div>

            {/* Shipping Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-base font-black text-slate-900 mb-1">
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
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base font-bold text-slate-900 focus:outline-none cursor-pointer transition"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-base font-black text-slate-900 mb-1">
                  Kota / Kabupaten Tujuan: *
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base font-bold text-slate-900 focus:outline-none cursor-pointer transition"
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
              <label className="block text-xs sm:text-base font-black text-slate-900 mb-1">
                Alamat Lengkap Pengiriman: *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Nama Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Patokan Rumah..."
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base font-bold text-slate-900 focus:outline-none transition resize-none"
              />
            </div>

            {/* Courier Selection */}
            <div>
              <label className="block text-xs sm:text-base font-black text-slate-900 mb-1 sm:mb-1.5">
                Pilih Ekspedisi Kurir:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['jnt', 'jne', 'sicepat', 'pos'] as const).map((cr) => (
                  <button
                    key={cr}
                    type="button"
                    onClick={() => setSelectedCourier(cr)}
                    className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-base font-black uppercase transition border-2 flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedCourier === cr
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{cr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Captcha Verification (if enabled) */}
            {settings.captchaEnabled && (
              <div className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition ${
                isCaptchaInvalid
                  ? 'bg-rose-50/90 border-rose-400'
                  : isCaptchaValid
                    ? 'bg-emerald-50/90 border-emerald-400'
                    : 'bg-amber-50 border-amber-300'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900">
                    <ShieldCheck className={`w-4 h-4 ${isCaptchaInvalid ? 'text-rose-600' : isCaptchaValid ? 'text-emerald-600' : 'text-amber-700'}`} />
                    <span>Verifikasi Keamanan (Cegah Spam):</span>
                  </div>
                  {isCaptchaValid && (
                    <span className="text-[10px] sm:text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Jawaban Tepat
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-lg font-black text-slate-900">
                    Berapa {captchaNum1} + {captchaNum2} = ?
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="Jawaban"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className={`w-20 sm:w-24 bg-white border-2 rounded-xl px-2.5 py-1 sm:py-1.5 text-center text-sm sm:text-lg font-black text-slate-900 focus:outline-none transition ${
                      isCaptchaInvalid
                        ? 'border-rose-500 focus:border-rose-600 ring-2 ring-rose-200'
                        : isCaptchaValid
                          ? 'border-emerald-500 focus:border-emerald-600 ring-2 ring-emerald-200'
                          : 'border-amber-400 focus:border-amber-600'
                    }`}
                  />
                </div>

                {/* Otomatis muncul peringatan jika jawaban belum tepat */}
                {isCaptchaInvalid && (
                  <div className="mt-2.5 p-2.5 bg-rose-100 border border-rose-300 rounded-xl text-rose-900 text-xs sm:text-sm font-black flex items-center gap-2 animate-shake">
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>Jawaban belum tepat! Silakan hitung kembali hasil {captchaNum1} + {captchaNum2} dengan benar.</span>
                  </div>
                )}
              </div>
            )}

            {/* Price breakdown with High Readability */}
            <div className="p-3 sm:p-4 bg-slate-100 rounded-xl sm:rounded-2xl space-y-1 sm:space-y-1.5 text-xs sm:text-sm font-bold text-slate-700">
              <div className="flex justify-between">
                <span>Subtotal Produk ({qty} Paket = {totalBottles} Botol):</span>
                <span className="font-extrabold text-slate-900">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Ongkir ({selectedCourier.toUpperCase()} Tarif Standar 1kg):</span>
                <span className="font-extrabold text-slate-900">{formatRupiah(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-xl pt-1.5 border-t-2 border-slate-300 font-black text-emerald-950">
                <span>Total Pembayaran:</span>
                <span className="text-emerald-800 text-base sm:text-2xl font-black">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            {/* Single Prominent Checkout Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-xl shadow-xl transition flex items-center justify-center gap-2 sm:gap-3 border-2 border-emerald-500 tracking-wide cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 sm:w-7 sm:h-7 text-emerald-200 flex-shrink-0" />
                <span>PESAN SEKARANG & SELESAIKAN PEMBELIAN</span>
              </button>

              <p className="text-center text-[10px] sm:text-xs text-slate-600 font-extrabold mt-1.5 sm:mt-2">
                ✓ 100% Produk Original Bersegel • Dikirim Cepat ke Seluruh Indonesia
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
