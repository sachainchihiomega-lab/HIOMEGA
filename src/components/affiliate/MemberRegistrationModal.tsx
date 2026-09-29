import React, { useState } from 'react';
import { Member, SiteSettings } from '../../types';
import { saveStoredMembers, getStoredMembers, addCustomerOrder } from '../../utils/storage';
import { X, CheckCircle, ShieldCheck, UserCheck, PhoneCall, Sparkles, Package } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemberRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newMember: Member) => void;
  settings: SiteSettings;
}

export const MemberRegistrationModal: React.FC<MemberRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  settings
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bankName, setBankName] = useState<string>('BCA');
  const [bankAccountNumber, setBankAccountNumber] = useState<string>('');
  const [bankAccountHolder, setBankAccountHolder] = useState<string>('');
  const [addressDetails, setAddressDetails] = useState<string>('');
  const [customPrice, setCustomPrice] = useState<number>(100000);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdMember, setCreatedMember] = useState<Member | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!cleanUsername) {
      setErrorMsg('Username hanya boleh huruf kecil, angka, dan tanda hubung.');
      return;
    }

    const currentMembers = getStoredMembers();
    if (currentMembers.some((m) => m.username.toLowerCase() === cleanUsername)) {
      setErrorMsg('Username ini sudah dipakai oleh member lain. Silakan pilih username unik lainnya.');
      return;
    }

    const newMember: Member = {
      id: `mem-${Date.now().toString().slice(-4)}`,
      username: cleanUsername,
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      customSlug: cleanUsername,
      customPricePerBottle: customPrice,
      status: 'pending', // Pending payment / verification of 5 pcs order
      initialOrderPcs: 5,
      totalSoldPcs: 0,
      totalCommissionRp: 0,
      bankName,
      bankAccountNumber,
      bankAccountHolder: bankAccountHolder || fullName,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newMember, ...currentMembers];
    saveStoredMembers(updated);
    setCreatedMember(newMember);
    setIsSuccess(true);
    onSuccess(newMember);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const cleanCsWa = settings.csWhatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-500 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-emerald-300" />
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-extrabold block">
                Program Kemitraan Resmi
              </span>
              <h3 className="text-xl font-black">Pendaftaran Member & Affiliate HI-OMEGA</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSuccess && createdMember ? (
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">
              Pendaftaran Member Berhasil!
            </h4>
            <p className="text-base text-slate-600 max-w-lg mx-auto">
              Selamat bergabung, <strong className="text-emerald-800">{createdMember.fullName}</strong>! Akun affiliate Anda sedang diverifikasi pesanan perdana 5 botol (Rp 350.000).
            </p>

            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-left text-sm space-y-2 max-w-lg mx-auto">
              <div>
                <span className="text-xs font-bold text-slate-500 block">Link Landing Page Pribadi Anda:</span>
                <span className="font-mono font-bold text-emerald-800 text-base break-all">
                  {window.location.origin}?ref={createdMember.customSlug}
                </span>
              </div>
              <div className="pt-2 border-t border-emerald-200 flex justify-between">
                <span className="text-slate-600 font-bold">Harga Beli Modal Reseller:</span>
                <span className="font-black text-emerald-900">Rp 70.000 / botol</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-bold">Harga Jual Pilihan Anda:</span>
                <span className="font-black text-emerald-900">Rp {createdMember.customPricePerBottle.toLocaleString('id-ID')} / botol</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-bold">Potensi Profit Per Botol:</span>
                <span className="font-black text-emerald-700">
                  Rp {(createdMember.customPricePerBottle - 70000).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={`https://wa.me/${cleanCsWa.startsWith('0') ? '62' + cleanCsWa.slice(1) : cleanCsWa}?text=${encodeURIComponent(
                  `Halo Admin HI-OMEGA, saya telah mendaftar member baru:\nNama: ${createdMember.fullName}\nUsername: ${createdMember.username}\nNomor WA: ${createdMember.whatsapp}\nAlamat Kirim 5 Botol: ${addressDetails}\nMohon info rekening pembayaran paket perdana 5 botol (Rp 350.000) untuk aktivasi akun.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-2xl text-base shadow-xl transition"
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>Konfirmasi Paket 5 Botol via WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Requirement Highlight Notice */}
            <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 flex items-start gap-3">
              <Package className="w-8 h-8 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-800">
                <strong className="text-emerald-900 font-black block text-base">
                  Syarat Kemitraan: Minimum Order 5 Pcs (Rp 350.000)
                </strong>
                Hanya Rp 70.000 / botol! Langsung dapat stok 5 botol HI-OMEGA, akses landing page mandiri, fitur cek ongkir gratis, bank materi copywriting, dan bebas menentukan harga jual sendiri.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-black text-slate-900 mb-1.5">
                  Nama Lengkap: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Hj. Siti Rahayu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-base sm:text-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-black text-slate-900 mb-1.5">
                  Username Unik (Untuk Link Web): *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-black font-mono">
                    ?ref=
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="sitirahayu"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl pl-16 pr-4 py-3 text-base sm:text-lg font-bold text-slate-900 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-black text-slate-900 mb-1.5">
                  Nomor WhatsApp Aktif: *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-base sm:text-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-black text-slate-900 mb-1.5">
                  Email (Opsional):
                </label>
                <input
                  type="email"
                  placeholder="siti@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-base sm:text-lg font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Custom pricing setting requested in brief */}
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-2">
              <label className="block text-sm sm:text-base font-black text-slate-900">
                Atur Harga Jual Eceran Anda ke Konsumen:
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  min={70000}
                  step={5000}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(parseInt(e.target.value) || 100000)}
                  className="w-48 bg-white border-2 border-emerald-500 rounded-xl px-4 py-2.5 text-lg font-black text-emerald-900"
                />
                <span className="text-xs sm:text-sm text-slate-700 font-bold">
                  Modal: Rp 70.000 • <strong className="text-emerald-800 font-black">Profit Anda: Rp {(customPrice - 70000).toLocaleString('id-ID')} / botol</strong>
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">
                Harga resmi pusat adalah Rp 100.000. Anda bebas menentukan harga jual sendiri (Rp 100.000 - Rp 150.000).
              </p>
            </div>

            {/* Bank details for payouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-black text-slate-800 mb-1">Nama Bank:</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-slate-900"
                >
                  <option value="BCA">BCA</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BRI">BRI</option>
                  <option value="BNI">BNI</option>
                  <option value="BSI">BSI (Syariah)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-black text-slate-800 mb-1">Nomor Rekening:</label>
                <input
                  type="text"
                  required
                  placeholder="Nomor rekening"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-black text-slate-800 mb-1">Atas Nama:</label>
                <input
                  type="text"
                  placeholder="Nama buku tabungan"
                  value={bankAccountHolder}
                  onChange={(e) => setBankAccountHolder(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Delivery address for initial 5 pcs */}
            <div>
              <label className="block text-sm sm:text-base font-black text-slate-900 mb-1.5">
                Alamat Lengkap Pengiriman Paket 5 Botol: *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Alamat lengkap tujuan pengiriman 5 botol kapsul HI-OMEGA (Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos)..."
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black py-4 px-6 rounded-2xl text-lg sm:text-xl shadow-xl transition border-2 border-emerald-600"
            >
              Daftar Member & Ambil Paket 5 Botol (Rp 350.000)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
