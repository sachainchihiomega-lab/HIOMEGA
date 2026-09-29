import React, { useState } from 'react';
import { Member, ProductItem, SiteSettings, CustomerOrder } from '../../types';
import { saveStoredMembers, getStoredMembers, addCustomerOrder } from '../../utils/storage';
import { CONTENT_BANK, INDONESIA_SHIPPING_RATES, ShippingRate } from '../../data/initialData';
import { 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  BookOpen, 
  FolderDown, 
  Truck, 
  ShoppingBag, 
  DollarSign, 
  X,
  Facebook,
  Send,
  MessageCircle,
  Sparkles,
  PhoneCall,
  Save,
  CheckCircle2,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemberDashboardProps {
  member: Member;
  onUpdateMember: (m: Member) => void;
  products: ProductItem[];
  settings: SiteSettings;
  onClose: () => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  member,
  onUpdateMember,
  products,
  settings,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'share' | 'pricing' | 'shipping' | 'knowledge' | 'content' | 'order'>('link');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedTextId, setCopiedTextId] = useState<string>('');
  const [customPriceInput, setCustomPriceInput] = useState<number>(member.customPricePerBottle || 100000);
  const [notice, setNotice] = useState<string>('');

  // Shipping state
  const provinces = Array.from(new Set(INDONESIA_SHIPPING_RATES.map((r) => r.province)));
  const [shipProvince, setShipProvince] = useState<string>(provinces[0]);
  const availableCities = INDONESIA_SHIPPING_RATES.filter((r) => r.province === shipProvince);
  const [shipCity, setShipCity] = useState<string>(availableCities[0]?.city || '');
  const [shipQty, setShipQty] = useState<number>(1);
  const shipRate: ShippingRate | undefined = INDONESIA_SHIPPING_RATES.find(
    (r) => r.province === shipProvince && r.city === shipCity
  ) || availableCities[0];

  // Restock / Dropship order state
  const [orderQty, setOrderQty] = useState<number>(5);
  const [orderRecipient, setOrderRecipient] = useState<string>(member.fullName);
  const [orderWa, setOrderWa] = useState<string>(member.whatsapp);
  const [orderAddress, setOrderAddress] = useState<string>('');
  const [orderCourier, setOrderCourier] = useState<'jne' | 'jnt' | 'sicepat' | 'pos'>('jnt');
  const [orderDone, setOrderDone] = useState<boolean>(false);

  const affiliateUrl = `${window.location.origin}?ref=${member.customSlug}`;

  const copyToClipboard = (text: string, isMainLink: boolean = false, id: string = '') => {
    navigator.clipboard.writeText(text);
    if (isMainLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
    if (id) {
      setCopiedTextId(id);
      setTimeout(() => setCopiedTextId(''), 2500);
    }
    setNotice('Berhasil disalin ke clipboard!');
    setTimeout(() => setNotice(''), 2500);
  };

  const handleSavePrice = () => {
    const updated: Member = {
      ...member,
      customPricePerBottle: customPriceInput
    };
    onUpdateMember(updated);
    const all = getStoredMembers().map(m => m.id === member.id ? updated : m);
    saveStoredMembers(all);
    setNotice('Harga jual pilihan Anda berhasil disimpan!');
    setTimeout(() => setNotice(''), 3000);
  };

  const handleCreateRestockOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderAddress.trim()) {
      alert('Mohon isi alamat pengiriman.');
      return;
    }

    const unitPrice = 70000; // Harga modal affiliate
    const subtotal = unitPrice * orderQty;
    const shipping = 15000;
    const grandTotal = subtotal + shipping;

    const newOrder: CustomerOrder = {
      id: `MEM-${Date.now().toString().slice(-6)}`,
      customerName: `${orderRecipient} (Member: @${member.username})`,
      customerWhatsapp: orderWa,
      destinationProvince: shipProvince,
      destinationCity: shipCity,
      addressDetails: orderAddress,
      courier: orderCourier.toUpperCase(),
      shippingCost: shipping,
      items: [
        {
          productId: 'hi-omega-60',
          productName: 'HI-OMEGA Sacha Inchi + VCO (Stok Member)',
          qty: orderQty,
          pricePerUnit: unitPrice,
          totalPrice: subtotal
        }
      ],
      subtotal,
      grandTotal,
      affiliateRef: member.username,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    addCustomerOrder(newOrder);
    setOrderDone(true);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
  };

  // Social share generators
  const shareTextWa = `Halo! Sedang mencari solusi alami untuk kolesterol tinggi, sendi linu atau darah tinggi? Coba konsumsi HI-OMEGA Sacha Inchi + VCO Capsules, 100% herbal berkhasiat tinggi:\n${affiliateUrl}`;
  const shareWaUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTextWa)}`;
  const shareFbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateUrl)}`;
  const shareTelegramUrl = `https://t.me/share/url?url=${encodeURIComponent(affiliateUrl)}&text=${encodeURIComponent('HI-OMEGA Kapsul Herbal Sacha Inchi Solusi Alami Kolesterol & Sendi')}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Header */}
      <div className="bg-emerald-950 border-b border-emerald-800 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-md">
            M
          </div>
          <div>
            <h2 className="text-lg font-black">Portal Member & Affiliate HI-OMEGA</h2>
            <p className="text-xs text-emerald-300">
              Selamat Datang, <strong>{member.fullName}</strong> (@{member.username}) • Status: <span className="uppercase text-amber-300 font-bold">{member.status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {notice && (
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold animate-pulse">
              ✓ {notice}
            </span>
          )}
          <button
            onClick={onClose}
            className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-emerald-700"
          >
            <X className="w-4 h-4" /> Tutup
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <div className="w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => setActiveTab('link')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'link' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Landing Page & Link Saya</span>
          </button>

          <button
            onClick={() => setActiveTab('share')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'share' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share ke Berbagai Sosmed</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'pricing' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Atur Harga Jual Sendiri</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'shipping' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Cek Ongkos Kirim Gratis</span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'knowledge' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Knowledge Center Produk</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'content' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <FolderDown className="w-4 h-4" />
            <span>Bank Konten & Copywriting</span>
          </button>

          <button
            onClick={() => setActiveTab('order')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'order' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Produk (Harga Member)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 bg-slate-900 p-6 overflow-y-auto text-slate-100">
          {/* TAB 1: LANDING PAGE LINK */}
          {activeTab === 'link' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-2xl font-black text-white">Landing Page Khusus Affiliate Anda</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Pengunjung yang membuka link ini akan otomatis dilayani atas nama Anda, tombol WhatsApp mengarah ke kontak Anda, dan Anda memperoleh komisi setiap botol yang terjual!
                </p>
              </div>

              {/* URL Box */}
              <div className="bg-slate-800 p-6 rounded-3xl border-2 border-emerald-500 shadow-xl space-y-4">
                <div className="text-xs font-bold uppercase text-emerald-400">
                  Link Landing Page Mandiri Anda:
                </div>
                <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-700">
                  <input
                    type="text"
                    readOnly
                    value={affiliateUrl}
                    className="flex-1 bg-transparent text-sm sm:text-base font-mono font-bold text-white focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(affiliateUrl, true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Tersalin' : 'Salin Link'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-bold">Harga Jual Anda</div>
                    <div className="text-xl font-black text-emerald-400 mt-0.5">
                      Rp {member.customPricePerBottle.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-bold">Botol Terjual</div>
                    <div className="text-xl font-black text-amber-400 mt-0.5">
                      {member.totalSoldPcs} Pcs
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-bold">Total Komisi Anda</div>
                    <div className="text-xl font-black text-emerald-400 mt-0.5">
                      Rp {member.totalCommissionRp.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Buka Tampilan Landing Page Anda
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SHARE SOSMED */}
          {activeTab === 'share' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-2xl font-black text-white">1-Klik Share Link Produk ke Berbagai Sosmed</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Bagikan langsung ke Facebook, WhatsApp, TikTok, Instagram, dan Telegram dengan teks ajakan promosi otomatis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp */}
                <a
                  href={shareWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 p-5 rounded-3xl border border-emerald-400 flex items-center gap-4 transition shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">Share ke WhatsApp</h4>
                    <p className="text-xs text-emerald-100">Kirim ke Status WA atau Kontak</p>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href={shareFbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 p-5 rounded-3xl border border-blue-400 flex items-center gap-4 transition shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">Share ke Facebook</h4>
                    <p className="text-xs text-blue-100">Posting ke Beranda / Grup FB</p>
                  </div>
                </a>

                {/* Telegram */}
                <a
                  href={shareTelegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-600 hover:bg-sky-500 p-5 rounded-3xl border border-sky-400 flex items-center gap-4 transition shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">Share ke Telegram</h4>
                    <p className="text-xs text-sky-100">Channel / Grup Telegram Sehat</p>
                  </div>
                </a>

                {/* Instagram / TikTok Copy Helper */}
                <button
                  onClick={() => copyToClipboard(`Solusi alami atasi kolesterol, asam urat, dan darah tinggi! Cek link bio saya: ${affiliateUrl}`)}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-95 p-5 rounded-3xl border border-pink-400 flex items-center gap-4 transition shadow-lg group text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">Salin untuk Bio Instagram / TikTok</h4>
                    <p className="text-xs text-pink-100">Tempel teks di bio & video caption</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM PRICING */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-2xl font-black text-white">Pengaturan Harga Jual Mandiri</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Sesuai ketentuan sistem, member dibebaskan mengatur sendiri harga jual produk yang tampil di landing page pribadi Anda.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
                  <span className="text-slate-400">Harga Modal Reseller / Member:</span>
                  <span className="font-black text-white text-base">Rp 70.000 / botol</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tentukan Harga Jual yang Ditampilkan ke Pembeli Anda (Rp):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={70000}
                      step={5000}
                      value={customPriceInput}
                      onChange={(e) => setCustomPriceInput(parseInt(e.target.value) || 100000)}
                      className="w-48 bg-slate-900 border-2 border-emerald-500 rounded-xl px-4 py-2.5 text-lg font-black text-emerald-400"
                    />
                    <span className="text-sm text-slate-400">
                      Rekomendasi: <strong>Rp 100.000 s/d Rp 150.000</strong>
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-700 text-sm space-y-1">
                  <div className="text-xs text-emerald-300 font-bold uppercase">Estimasi Margin Keuntungan Anda:</div>
                  <div className="text-2xl font-black text-emerald-400">
                    Rp {Math.max(0, customPriceInput - 70000).toLocaleString('id-ID')} / botol
                  </div>
                  <p className="text-xs text-slate-300">
                    Setiap pembeli memesan 1 botol via landing page Anda, Anda otomatis memperoleh selisih profit ini.
                  </p>
                </div>

                <button
                  onClick={handleSavePrice}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Harga Pilihan Saya
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CEK ONGKOS KIRIM */}
          {activeTab === 'shipping' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-2xl font-black text-white">Cek Ongkos Kirim Cepat ke Seluruh Indonesia</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Gunakan simulator ini untuk menginformasikan biaya ongkir ke calon pembeli Anda di WhatsApp.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Provinsi:</label>
                    <select
                      value={shipProvince}
                      onChange={(e) => {
                        const newP = e.target.value;
                        setShipProvince(newP);
                        const c = INDONESIA_SHIPPING_RATES.filter(r => r.province === newP);
                        if (c.length > 0) setShipCity(c[0].city);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Kota / Kabupaten:</label>
                    <select
                      value={shipCity}
                      onChange={(e) => setShipCity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {availableCities.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Jumlah Botol:</label>
                    <input
                      type="number"
                      min={1}
                      value={shipQty}
                      onChange={(e) => setShipQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white"
                    />
                  </div>
                </div>

                {shipRate && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                    <div className="bg-slate-900 p-3 rounded-2xl text-center border border-slate-700">
                      <div className="text-[11px] font-bold text-red-400">J&T Express</div>
                      <div className="text-lg font-black text-white mt-1">
                        Rp {(shipRate.jntReg * Math.max(1, Math.ceil((shipQty * 150)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-2xl text-center border border-slate-700">
                      <div className="text-[11px] font-bold text-blue-400">JNE Reguler</div>
                      <div className="text-lg font-black text-white mt-1">
                        Rp {(shipRate.jneReg * Math.max(1, Math.ceil((shipQty * 150)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-2xl text-center border border-slate-700">
                      <div className="text-[11px] font-bold text-rose-400">SiCepat REG</div>
                      <div className="text-lg font-black text-white mt-1">
                        Rp {(shipRate.sicepatReg * Math.max(1, Math.ceil((shipQty * 150)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-2xl text-center border border-slate-700">
                      <div className="text-[11px] font-bold text-orange-400">Pos Kilat</div>
                      <div className="text-lg font-black text-white mt-1">
                        Rp {(shipRate.posKilat * Math.max(1, Math.ceil((shipQty * 150)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: KNOWLEDGE CENTER */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-2xl font-black text-white">Knowledge Center: Seputar Produk HI-OMEGA</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Bekal pemahaman lengkap tentang Sacha Inchi, Omega 3-6-9 nabati, VCO, dan aturan minum.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-emerald-400 text-base">Apa itu Sacha Inchi (Plukenetia volubilis)?</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Sacha Inchi adalah tanaman kacang bintang asli hutan hujan tropis yang dikenal sebagai superfood penghasil minyak nabati terkaya di dunia. Mengandung asam lemak tak jenuh ganda hingga 93%, terdiri dari Omega-3 (48-54%), Omega-6 (35-37%), dan Omega-9 (8-9%).
                  </p>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-emerald-400 text-base">Mengapa Lebih Unggul dari Minyak Ikan Salmon?</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    1. <strong>Bebas Merkuri & Logam Berat:</strong> Minyak ikan laut berisiko tercemar limbah laut mikroplastik dan merkuri, sedangkan Sacha Inchi 100% murni nabati teruji klinis.<br />
                    2. <strong>Tidak Amis & Tidak Bau:</strong> Kapsul mudah ditelan tanpa rasa bersendawa bau amis ikan.<br />
                    3. <strong>Kombinasi VCO:</strong> Diperkaya Virgin Coconut Oil dengan asam laurat untuk melindungi lambung dan memperkuat daya tahan tubuh.
                  </p>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-emerald-400 text-base">Anjuran Dosis & Aturan Minum:</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    • <strong>Pencegahan & Stamina Sehari-hari:</strong> 1 - 2 kapsul per hari setelah makan pagi atau malam.<br />
                    • <strong>Terapi Keluhan (Kolesterol / Asam Urat / Darah Tinggi):</strong> 2 kapsul pagi dan 2 kapsul malam setelah makan.<br />
                    • Disarankan perbanyak minum air putih hangat untuk mempercepat kelancaran metabolisme tubuh.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BANK KONTEN */}
          {activeTab === 'content' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-2xl font-black text-white">Bank Konten & Materi Copywriting</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Materi promosi siap pakai tinggal copy-paste untuk status WhatsApp, postingan Facebook, dan Instagram.
                </p>
              </div>

              <div className="space-y-4">
                {CONTENT_BANK.map((item) => (
                  <div key={item.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-emerald-900 text-emerald-300 px-3 py-0.5 rounded-full font-bold uppercase">
                        {item.category}
                      </span>
                      <div className="flex gap-1">
                        {item.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="font-bold text-white text-base">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>

                    {item.copyText && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-200 whitespace-pre-line relative">
                        {item.copyText.replace(/\[LINK_AFFILIATE_ANDA\]/g, affiliateUrl)}
                        <button
                          onClick={() => copyToClipboard(item.copyText!.replace(/\[LINK_AFFILIATE_ANDA\]/g, affiliateUrl), false, item.id)}
                          className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
                        >
                          {copiedTextId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedTextId === item.id ? 'Tersalin!' : 'Salin Teks Copywriting'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ORDER PRODUK HARGA MEMBER */}
          {activeTab === 'order' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-2xl font-black text-white">Order Produk / Restok (Harga Khusus Member)</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Pesan langsung stok HI-OMEGA dengan harga modal reseller Rp 70.000 per botol (dikirim ke rumah Anda atau dropship ke konsumen).
                </p>
              </div>

              {orderDone ? (
                <div className="bg-slate-800 p-6 rounded-3xl border border-emerald-500 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white">Pesanan Restok Berhasil Dicatat!</h4>
                  <p className="text-xs text-slate-300">
                    Silakan lakukan konfirmasi ke admin pusat via WhatsApp untuk jadwal pengiriman ekspedisi.
                  </p>
                  <button
                    onClick={() => setOrderDone(false)}
                    className="bg-emerald-600 px-4 py-2 rounded-xl text-xs font-bold text-white"
                  >
                    Buat Pesanan Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreateRestockOrder} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                  <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-800 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-emerald-300 font-bold">Harga Member HI-OMEGA 60 Kapsul:</div>
                      <div className="text-xl font-black text-white">Rp 70.000 / botol</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-300 font-bold">Jumlah:</label>
                      <input
                        type="number"
                        min={1}
                        value={orderQty}
                        onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-center font-bold text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nama Penerima Paket:</label>
                      <input
                        type="text"
                        required
                        value={orderRecipient}
                        onChange={(e) => setOrderRecipient(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nomor WhatsApp:</label>
                      <input
                        type="tel"
                        required
                        value={orderWa}
                        onChange={(e) => setOrderWa(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Alamat Tujuan Lengkap:</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Jalan, No rumah, RT/RW, Kecamatan, Kota..."
                      value={orderAddress}
                      onChange={(e) => setOrderAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex justify-between items-center text-sm font-bold">
                    <span>Total Tagihan ({orderQty} Botol + Ongkir):</span>
                    <span className="text-emerald-400 text-base font-black">
                      Rp {(70000 * orderQty + 15000).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-4 rounded-2xl text-sm transition"
                  >
                    Kirim Pesanan Restok Member
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
