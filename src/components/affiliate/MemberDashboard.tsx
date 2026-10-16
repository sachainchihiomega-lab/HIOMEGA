import React, { useState, useMemo, useEffect } from 'react';
import { Member, ProductItem, SiteSettings, CustomerOrder, WithdrawalRequest } from '../../types';
import { 
  saveStoredMembers, 
  getStoredMembers, 
  addCustomerOrder, 
  getStoredOrders,
  getStoredWithdrawals,
  addWithdrawalRequest
} from '../../utils/storage';
import { CONTENT_BANK, INDONESIA_SHIPPING_RATES, ShippingRate, INITIAL_PRODUCTS } from '../../data/initialData';
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
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  HelpCircle,
  Plus,
  Minus,
  Users,
  UserPlus,
  CreditCard,
  Coins,
  ArrowDownCircle,
  Wallet,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemberDashboardProps {
  member: Member;
  onUpdateMember: (m: Member) => void;
  products: ProductItem[];
  settings: SiteSettings;
  onClose: () => void;
  onAddOrder?: (order: CustomerOrder) => void;
}

type MemberTab = 'link' | 'share' | 'customers' | 'withdraw' | 'orders' | 'pricing' | 'order' | 'shipping' | 'content' | 'knowledge';

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  member,
  onUpdateMember,
  products,
  settings,
  onClose,
  onAddOrder
}) => {
  const [activeTab, setActiveTab] = useState<MemberTab>('link');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedTextId, setCopiedTextId] = useState<string>('');
  const [customPriceInput, setCustomPriceInput] = useState<number>(member.customPricePerBottle || 100000);
  const [notice, setNotice] = useState<string>('');
  const [contentCategory, setContentCategory] = useState<string>('all');

  // Customer Orders state
  const [allOrdersList, setAllOrdersList] = useState<CustomerOrder[]>(() => getStoredOrders());
  
  // Withdrawal requests state
  const [withdrawalsList, setWithdrawalsList] = useState<WithdrawalRequest[]>(() => getStoredWithdrawals());

  // Refresh lists periodically or when tabs change
  useEffect(() => {
    setAllOrdersList(getStoredOrders());
    setWithdrawalsList(getStoredWithdrawals());
  }, [activeTab]);

  // Shipping state for simulator
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

  // Form state: Tambah Pembeli Baru (Customer)
  const [isAddingCustomer, setIsAddingCustomer] = useState<boolean>(false);
  const [newCustName, setNewCustName] = useState<string>('');
  const [newCustWa, setNewCustWa] = useState<string>('');
  const [newCustPackage, setNewCustPackage] = useState<string>('hi-omega-60');
  const [newCustQty, setNewCustQty] = useState<number>(1);
  const [newCustProvince, setNewCustProvince] = useState<string>(provinces[0]);
  const newCustCities = INDONESIA_SHIPPING_RATES.filter((r) => r.province === newCustProvince);
  const [newCustCity, setNewCustCity] = useState<string>(newCustCities[0]?.city || '');
  const [newCustAddress, setNewCustAddress] = useState<string>('');
  const [newCustCourier, setNewCustCourier] = useState<'jnt' | 'jne' | 'sicepat' | 'pos'>('jnt');
  const [newCustPaymentStatus, setNewCustPaymentStatus] = useState<'pending' | 'processing'>('processing');
  const [newCustNotes, setNewCustNotes] = useState<string>('');

  // Form state: Penarikan Komisi (Withdrawal)
  const [withdrawAmount, setWithdrawAmount] = useState<number>(100000);
  const [withdrawBank, setWithdrawBank] = useState<string>(member.bankName || 'BCA');
  const [withdrawAccountNo, setWithdrawAccountNo] = useState<string>(member.bankAccountNumber || '');
  const [withdrawAccountHolder, setWithdrawAccountHolder] = useState<string>(member.bankAccountHolder || member.fullName);
  const [withdrawNotes, setWithdrawNotes] = useState<string>('');
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState<string>('');

  const affiliateUrl = `${window.location.origin}?ref=${member.customSlug}`;

  // Referral orders and customers for this member
  const memberReferralOrders = useMemo(() => {
    return allOrdersList.filter(o => 
      o.affiliateRef && (
        o.affiliateRef.toLowerCase() === member.username.toLowerCase() ||
        o.affiliateRef.toLowerCase() === member.customSlug.toLowerCase()
      )
    );
  }, [allOrdersList, member.username, member.customSlug]);

  // Withdrawal requests for this member
  const memberWithdrawals = useMemo(() => {
    return withdrawalsList.filter(w => 
      w.memberUsername.toLowerCase() === member.username.toLowerCase() ||
      w.memberId === member.id
    );
  }, [withdrawalsList, member.username, member.id]);

  // Total approved withdrawals
  const totalApprovedWithdrawals = useMemo(() => {
    return memberWithdrawals
      .filter(w => w.status === 'approved')
      .reduce((sum, w) => sum + w.amount, 0);
  }, [memberWithdrawals]);

  // Pending withdrawals
  const totalPendingWithdrawals = useMemo(() => {
    return memberWithdrawals
      .filter(w => w.status === 'pending')
      .reduce((sum, w) => sum + w.amount, 0);
  }, [memberWithdrawals]);

  // Available commission balance
  const availableCommission = Math.max(0, member.totalCommissionRp - totalApprovedWithdrawals - totalPendingWithdrawals);

  const tabList = [
    { id: 'link', label: 'Link Saya', fullLabel: 'Landing Page & Link', icon: ExternalLink, count: null },
    { id: 'share', label: 'Share Sosmed', fullLabel: 'Share Sosmed', icon: Share2, count: null },
    { id: 'customers', label: 'Daftar Pembeli', fullLabel: 'Daftar Pembeli & Input', icon: Users, count: memberReferralOrders.length > 0 ? memberReferralOrders.length : null },
    { id: 'withdraw', label: 'Tarik Komisi', fullLabel: 'Penarikan Komisi', icon: Wallet, count: null },
    { id: 'orders', label: 'Pesanan Masuk', fullLabel: 'Pesanan & Komisi', icon: Package, count: null },
    { id: 'pricing', label: 'Atur Harga', fullLabel: 'Atur Harga Jual', icon: DollarSign, count: null },
    { id: 'order', label: 'Order Stok', fullLabel: 'Order Stok Member', icon: ShoppingBag, count: null },
    { id: 'shipping', label: 'Cek Ongkir', fullLabel: 'Cek Ongkos Kirim', icon: Truck, count: null },
    { id: 'content', label: 'Bank Konten', fullLabel: 'Bank Konten', icon: FolderDown, count: CONTENT_BANK.length },
    { id: 'knowledge', label: 'Edukasi', fullLabel: 'Knowledge Center', icon: BookOpen, count: null },
  ] as const;

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

  // Submit manual Customer input
  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustWa.trim() || !newCustAddress.trim()) {
      alert('Mohon lengkapi nama pembeli, nomor WhatsApp, dan alamat pengiriman.');
      return;
    }

    const selectedProd = INITIAL_PRODUCTS.find(p => p.id === newCustPackage) || INITIAL_PRODUCTS[0];
    const bottlesInPack = selectedProd.bottleCount || 1;
    const totalBottles = newCustQty * bottlesInPack;
    
    // Price calculation
    let unitPrice = selectedProd.promoPrice || selectedProd.retailPrice;
    if (selectedProd.id === 'hi-omega-60' && member.customPricePerBottle) {
      unitPrice = member.customPricePerBottle;
    }

    const subtotal = unitPrice * newCustQty;
    // Flat shipping 15000 per request standard
    const shipping = 15000;
    const grandTotal = subtotal + shipping;

    // Profit margin for member:
    // Modal per botol = 70.000.
    const modalCost = 70000 * totalBottles;
    const memberProfit = Math.max(0, subtotal - modalCost);

    const newOrder: CustomerOrder = {
      id: `CUST-${Date.now().toString().slice(-6)}`,
      customerName: newCustName.trim(),
      customerWhatsapp: newCustWa.trim(),
      destinationProvince: newCustProvince,
      destinationCity: newCustCity,
      addressDetails: newCustAddress.trim(),
      courier: newCustCourier.toUpperCase(),
      shippingCost: shipping,
      items: [
        {
          productId: selectedProd.id,
          productName: `${selectedProd.name} (${bottlesInPack} Botol)`,
          qty: newCustQty,
          pricePerUnit: unitPrice,
          totalPrice: subtotal
        }
      ],
      subtotal,
      grandTotal,
      affiliateRef: member.username,
      affiliateProfit: memberProfit,
      status: newCustPaymentStatus,
      source: 'member_input',
      notes: newCustNotes.trim() ? `Catatan Member: ${newCustNotes.trim()}` : `Diinput manual oleh Member: @${member.username}`,
      createdAt: new Date().toISOString()
    };

    addCustomerOrder(newOrder);
    setAllOrdersList(getStoredOrders());
    if (onAddOrder) {
      onAddOrder(newOrder);
    }

    // Update local member stats in memory
    const updatedMember: Member = {
      ...member,
      totalSoldPcs: member.totalSoldPcs + totalBottles,
      totalCommissionRp: member.totalCommissionRp + memberProfit
    };
    onUpdateMember(updatedMember);

    setIsAddingCustomer(false);
    setNewCustName('');
    setNewCustWa('');
    setNewCustAddress('');
    setNewCustNotes('');
    setNotice('Data pembeli berhasil ditambahkan & tersinkron ke Admin!');
    setTimeout(() => setNotice(''), 3500);

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
  };

  // Submit Penarikan Komisi (Withdrawal)
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) {
      alert('Nominal penarikan komisi harus lebih dari Rp 0.');
      return;
    }
    if (withdrawAmount < 50000) {
      alert('Minimum penarikan komisi adalah Rp 50.000.');
      return;
    }
    if (withdrawAmount > availableCommission) {
      alert(`Saldo komisi tersedia Anda saat ini adalah Rp ${availableCommission.toLocaleString('id-ID')}. Nominal tidak boleh melebihi saldo tersedia.`);
      return;
    }
    if (!withdrawAccountNo.trim() || !withdrawAccountHolder.trim()) {
      alert('Mohon isi nomor rekening / e-wallet dan nama pemilik rekening secara lengkap.');
      return;
    }

    const newReq: WithdrawalRequest = {
      id: `WD-${Date.now().toString().slice(-6)}`,
      memberId: member.id,
      memberUsername: member.username,
      memberFullName: member.fullName,
      memberWhatsapp: member.whatsapp,
      amount: withdrawAmount,
      bankName: withdrawBank,
      bankAccountNumber: withdrawAccountNo.trim(),
      bankAccountHolder: withdrawAccountHolder.trim(),
      notes: withdrawNotes.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    addWithdrawalRequest(newReq);
    setWithdrawalsList(getStoredWithdrawals());
    setWithdrawNotes('');
    setWithdrawSuccessMsg(`Pengajuan penarikan sebesar Rp ${withdrawAmount.toLocaleString('id-ID')} berhasil diajukan dan sedang menunggu proses transfer dari Admin!`);
    setNotice('Pengajuan penarikan komisi terkirim ke Admin!');
    setTimeout(() => {
      setNotice('');
      setWithdrawSuccessMsg('');
    }, 4500);

    try {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
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
    setAllOrdersList(getStoredOrders());
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

  // Filter content bank
  const filteredContent = CONTENT_BANK.filter(item => {
    if (contentCategory === 'all') return true;
    return item.category.toLowerCase().includes(contentCategory.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
      {/* 1. TOP HEADER - Highly responsive for mobile */}
      <header className="bg-emerald-950 border-b border-emerald-800 px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between text-white flex-shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-md flex-shrink-0 text-sm sm:text-base">
            M
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base lg:text-lg font-black truncate leading-tight">
              Portal Member & Affiliate
            </h2>
            <p className="text-[11px] sm:text-xs text-emerald-300 truncate">
              {member.fullName} (@{member.username}) • <span className="uppercase text-amber-300 font-bold">{member.status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {notice && (
            <span className="hidden sm:inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold animate-pulse">
              ✓ {notice}
            </span>
          )}
          <button
            onClick={onClose}
            className="bg-emerald-900 hover:bg-emerald-800 active:scale-95 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-emerald-700 cursor-pointer"
          >
            <X className="w-4 h-4 flex-shrink-0" />
            <span>Tutup</span>
          </button>
        </div>
      </header>

      {/* 2. MOBILE HORIZONTAL NAVIGATION BAR (Visible on < md) */}
      <nav className="md:hidden bg-slate-950 border-b border-slate-800 px-2 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0">
        {tabList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MemberTab)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400'
                  : 'text-slate-400 bg-slate-900/90 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Notice alert for mobile if present */}
      {notice && (
        <div className="sm:hidden bg-emerald-600 text-white px-3 py-1.5 text-xs font-black text-center shadow-md animate-pulse">
          ✓ {notice}
        </div>
      )}

      {/* 3. WORKSPACE (Desktop Sidebar + Mobile Content Area) */}
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* DESKTOP SIDEBAR (Visible on md+) */}
        <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-800 p-4 flex-col justify-between flex-shrink-0">
          <div className="space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-500">
              Menu Member / Affiliate
            </div>
            {tabList.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as MemberTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md font-black'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.fullLabel}</span>
                  </div>
                  {tab.count !== null && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3.5 bg-emerald-950/70 border border-emerald-800 rounded-2xl text-xs text-slate-300 space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Tips Komisi Maksimal
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Catat setiap pembeli offline di menu <strong>Daftar Pembeli</strong> agar komisi otomatis masuk dan disinkronkan ke pusat.
            </p>
          </div>
        </aside>

        {/* 4. MAIN CONTENT AREA */}
        <main className="flex-1 bg-slate-900 p-3.5 sm:p-6 lg:p-8 overflow-y-auto text-slate-100 pb-16 sm:pb-8">
          
          {/* TAB 1: LANDING PAGE & LINK SAYA */}
          {activeTab === 'link' && (
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Landing Page Khusus Affiliate Anda</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Pengunjung yang membuka link ini akan otomatis dilayani atas nama Anda, nomor WhatsApp mengarah ke kontak Anda, dan Anda memperoleh komisi setiap paket yang terjual!
                </p>
              </div>

              {/* URL Box */}
              <div className="bg-slate-800/95 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-emerald-500 shadow-xl space-y-3.5">
                <div className="flex items-center justify-between text-xs font-black uppercase text-emerald-400">
                  <span>Link Landing Page Mandiri Anda:</span>
                  <span className="text-[10px] text-slate-400 lowercase font-normal hidden sm:inline">aktif 24 jam</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-950 p-2 sm:p-3 rounded-2xl border border-slate-700">
                  <input
                    type="text"
                    readOnly
                    value={affiliateUrl}
                    className="flex-1 bg-transparent text-xs sm:text-sm font-mono font-bold text-white px-2 py-1.5 focus:outline-none truncate"
                  />
                  <button
                    onClick={() => copyToClipboard(affiliateUrl, true)}
                    className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black px-4 py-2.5 sm:py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer flex-shrink-0"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                  </button>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                  <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 text-center sm:text-left">
                    <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-black">Harga Jual Anda</div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                      Rp {member.customPricePerBottle.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Modal: Rp 70.000 / botol</div>
                  </div>

                  <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 text-center sm:text-left">
                    <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-black">Botol Terjual</div>
                    <div className="text-lg sm:text-xl font-black text-amber-400 mt-0.5">
                      {member.totalSoldPcs} Pcs
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Akumulasi penjualan</div>
                  </div>

                  <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-emerald-500/40 text-center sm:text-left">
                    <div className="text-[10px] sm:text-[11px] text-emerald-300 uppercase font-black">Total Komisi</div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                      Rp {member.totalCommissionRp.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] text-emerald-300/80 mt-0.5">Margin laba bersih</div>
                  </div>
                </div>

                {/* Quick actions for mobile */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition text-center"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    <span>Buka Tampilan Landing Page Anda</span>
                  </a>

                  <a
                    href={shareWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition text-center"
                  >
                    <PhoneCall className="w-4 h-4 flex-shrink-0" />
                    <span>Bagikan ke WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Cara Kerja Ringkas Card */}
              <div className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-3">
                <h4 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Cara Kerja & Alur Penjualan Affiliate:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="font-black text-emerald-400 block mb-1">1. Sebarkan Link</span>
                    Kirim link landing page ke WhatsApp, story IG, FB, atau TikTok Anda.
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="font-black text-amber-400 block mb-1">2. Pembeli Order</span>
                    Pembeli memesan online atau Anda input manual di menu Daftar Pembeli.
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="font-black text-emerald-400 block mb-1">3. Tarik Komisi</span>
                    Barang dikirim pusat & komisi dapat ditarik langsung ke rekening Anda!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SHARE SOSMED */}
          {activeTab === 'share' && (
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">1-Klik Share Link Produk ke Sosmed</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Bagikan langsung ke WhatsApp, Facebook, TikTok, Instagram, dan Telegram dengan teks ajakan promosi otomatis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* WhatsApp */}
                <a
                  href={shareWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-emerald-400 flex items-center gap-3.5 transition shadow-lg group cursor-pointer"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-white text-sm sm:text-base">Share ke WhatsApp</h4>
                    <p className="text-xs text-emerald-100 truncate">Kirim ke Status WA atau Kontak</p>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href={shareFbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 active:scale-95 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-blue-400 flex items-center gap-3.5 transition shadow-lg group cursor-pointer"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-white text-sm sm:text-base">Share ke Facebook</h4>
                    <p className="text-xs text-blue-100 truncate">Posting ke Beranda / Grup FB</p>
                  </div>
                </a>

                {/* Telegram */}
                <a
                  href={shareTelegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-600 hover:bg-sky-500 active:scale-95 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-sky-400 flex items-center gap-3.5 transition shadow-lg group cursor-pointer"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-white text-sm sm:text-base">Share ke Telegram</h4>
                    <p className="text-xs text-sky-100 truncate">Channel / Grup Telegram Sehat</p>
                  </div>
                </a>

                {/* Instagram / TikTok Copy Helper */}
                <button
                  onClick={() => copyToClipboard(`Solusi alami atasi kolesterol, sendi linu & darah tinggi! Cek link bio saya: ${affiliateUrl}`)}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-95 active:scale-95 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-pink-400 flex items-center gap-3.5 transition shadow-lg group text-left cursor-pointer"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-white text-sm sm:text-base">Salin untuk Bio Instagram / TikTok</h4>
                    <p className="text-xs text-pink-100 truncate">Tempel teks di bio & video caption</p>
                  </div>
                </button>
              </div>

              {/* Broadcast Preview */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-400">Pratinjau Pesan yang Dibagikan:</span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono whitespace-pre-line">
                  {shareTextWa}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TAMBAH & DAFTAR PEMBELI (FITUR BARU SINGKRON KE ADMIN & SUPER ADMIN) */}
          {activeTab === 'customers' && (
            <div className="space-y-4 sm:space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Daftar Pembeli & Input Konsumen</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Catat pembeli offline / langganan Anda. Data otomatis tersinkronisasi ke Dashboard Admin dan Super Admin.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingCustomer(!isAddingCustomer)}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer self-start sm:self-auto"
                >
                  {isAddingCustomer ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{isAddingCustomer ? 'Tutup Formulir' : '+ Tambah Pembeli Baru'}</span>
                </button>
              </div>

              {/* Form Input Pembeli Baru */}
              {isAddingCustomer && (
                <form 
                  onSubmit={handleAddCustomerSubmit} 
                  className="bg-slate-800/95 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-emerald-500 shadow-xl space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-sm border-b border-slate-700 pb-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Formulir Input Data Pembeli Konsumen Baru</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nama Lengkap Pembeli: *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bpk. H. Mulyadi"
                        value={newCustName}
                        onChange={(e) => setNewCustName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nomor WhatsApp Pembeli: *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={newCustWa}
                        onChange={(e) => setNewCustWa(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Pilihan Paket Produk */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'hi-omega-60', name: 'PAKET PRIBADI', bottles: 1, price: member.customPricePerBottle || 100000 },
                      { id: 'hi-omega-paket-3', name: 'PAKET FAMILY', bottles: 3, price: 275000 },
                      { id: 'hi-omega-member-5', name: 'PAKET RESELLER', bottles: 5, price: 350000 }
                    ].map(pkg => (
                      <div
                        key={pkg.id}
                        onClick={() => setNewCustPackage(pkg.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition text-left ${
                          newCustPackage === pkg.id 
                            ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-sm ring-1 ring-emerald-400'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <div className="font-black text-xs text-white">{pkg.name}</div>
                        <div className="text-[11px] text-emerald-400 font-bold">{pkg.bottles} Botol (60 kps/btl)</div>
                        <div className="text-sm font-black text-white mt-1">Rp {pkg.price.toLocaleString('id-ID')}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Jumlah Paket:</label>
                      <input
                        type="number"
                        min={1}
                        value={newCustQty}
                        onChange={(e) => setNewCustQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Pilihan Ekspedisi:</label>
                      <select
                        value={newCustCourier}
                        onChange={(e) => setNewCustCourier(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        <option value="jnt">J&T Express</option>
                        <option value="jne">JNE Reguler</option>
                        <option value="sicepat">SiCepat REG</option>
                        <option value="pos">Pos Indonesia</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Status Pembayaran:</label>
                      <select
                        value={newCustPaymentStatus}
                        onChange={(e) => setNewCustPaymentStatus(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        <option value="processing">Lunas (Siap Diproses)</option>
                        <option value="pending">Menunggu Pembayaran</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Provinsi Tujuan:</label>
                      <select
                        value={newCustProvince}
                        onChange={(e) => {
                          const newP = e.target.value;
                          setNewCustProvince(newP);
                          const c = INDONESIA_SHIPPING_RATES.filter(r => r.province === newP);
                          if (c.length > 0) setNewCustCity(c[0].city);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kota / Kabupaten:</label>
                      <select
                        value={newCustCity}
                        onChange={(e) => setNewCustCity(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        {newCustCities.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Alamat Lengkap Pengiriman: *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Jalan, No Rumah, RT/RW, Kelurahan, Kecamatan..."
                      value={newCustAddress}
                      onChange={(e) => setNewCustAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Catatan Tambahan (Opsional):</label>
                    <input
                      type="text"
                      placeholder="Misal: titip di satpam / kirim sore hari"
                      value={newCustNotes}
                      onChange={(e) => setNewCustNotes(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-3 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Simpan & Sinkronkan Pembeli ke Pusat</span>
                  </button>
                </form>
              )}

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                <div className="bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-black">Total Pembeli / Order</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {memberReferralOrders.length} Pelanggan
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Tersinkron ke sistem pusat</div>
                </div>

                <div className="bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-black">Total Botol Terjual</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                    {member.totalSoldPcs} Botol
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Seluruh pesanan Anda</div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-emerald-500/50">
                  <div className="text-[10px] sm:text-xs text-emerald-300 uppercase font-black">Komisi Penjualan</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                    Rp {member.totalCommissionRp.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-emerald-300/80 mt-0.5">Bisa ditarik di menu Tarik Komisi</div>
                </div>
              </div>

              {/* List Pembeli */}
              {memberReferralOrders.length === 0 ? (
                <div className="bg-slate-800/60 p-6 sm:p-8 rounded-2xl border border-slate-700 text-center space-y-3">
                  <Users className="w-10 h-10 text-slate-500 mx-auto" />
                  <h4 className="text-base font-bold text-white">Belum Ada Daftar Pembeli</h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                    Klik tombol <strong>+ Tambah Pembeli Baru</strong> di atas untuk memasukkan pesanan offline konsumen Anda, atau bagikan link web Anda.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {memberReferralOrders.map((ord) => {
                    const cleanPhone = ord.customerWhatsapp.replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

                    return (
                      <div key={ord.id} className="bg-slate-800/90 p-3.5 sm:p-4 rounded-2xl border border-slate-700/80 space-y-2.5 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-emerald-400">{ord.id}</span>
                            <span className="text-[11px] text-slate-400">
                              • {new Date(ord.createdAt).toLocaleDateString('id-ID')}
                            </span>
                            {ord.source === 'member_input' && (
                              <span className="bg-teal-950 text-teal-300 border border-teal-700 text-[10px] font-black px-2 py-0.2 rounded-md">
                                Input Manual
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            ord.status === 'delivered' ? 'bg-emerald-900 text-emerald-300 border border-emerald-700' :
                            ord.status === 'shipped' ? 'bg-blue-900 text-blue-300 border border-blue-700' :
                            ord.status === 'processing' ? 'bg-teal-900 text-teal-300 border border-teal-700' :
                            ord.status === 'cancelled' ? 'bg-red-900 text-red-300 border border-red-700' :
                            'bg-amber-900/80 text-amber-300 border border-amber-700'
                          }`}>
                            {ord.status === 'delivered' ? 'Selesai' :
                             ord.status === 'shipped' ? 'Dikirim' :
                             ord.status === 'processing' ? 'Lunas / Diproses' :
                             ord.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu Bayar'}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm font-bold text-white">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span>{ord.customerName}</span>
                            <a
                              href={`https://wa.me/${waPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 text-xs font-normal underline flex items-center gap-1"
                            >
                              <PhoneCall className="w-3 h-3" /> {ord.customerWhatsapp}
                            </a>
                          </div>
                          <span className="text-slate-300 font-normal text-xs">
                            {ord.destinationCity}, {ord.destinationProvince} ({ord.courier})
                          </span>
                        </div>

                        <div className="text-xs text-slate-300">
                          {ord.items.map(it => `${it.productName} (${it.qty} Paket)`).join(', ')}
                        </div>

                        {ord.notes && (
                          <div className="text-[11px] text-slate-400 italic bg-slate-900/60 px-2.5 py-1 rounded-lg">
                            {ord.notes}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                          <span className="text-slate-400">
                            Total Belanja: <strong className="text-white">Rp {ord.grandTotal.toLocaleString('id-ID')}</strong>
                          </span>
                          <span className="text-emerald-400 font-black">
                            Komisi Anda: +Rp {(ord.affiliateProfit || (ord.items.reduce((a, b) => a + b.qty, 0) * Math.max(0, (member.customPricePerBottle || 100000) - 70000))).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PENARIKAN KOMISI (FITUR BARU SINGKRON KE ADMIN & SUPER ADMIN) */}
          {activeTab === 'withdraw' && (
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Penarikan Komisi Penjualan</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Tarik komisi hasil penjualan produk HI-OMEGA langsung ke rekening bank atau e-wallet Anda. Pengajuan otomatis disinkronkan ke Admin dan Super Admin untuk proses transfer.
                </p>
              </div>

              {withdrawSuccessMsg && (
                <div className="p-4 bg-emerald-950 border-2 border-emerald-500 rounded-2xl text-emerald-200 text-xs sm:text-sm font-bold flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{withdrawSuccessMsg}</span>
                </div>
              )}

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-center sm:text-left">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-black">Total Komisi Didapat</div>
                  <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                    Rp {member.totalCommissionRp.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Akumulasi seluruh penjualan</div>
                </div>

                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-center sm:text-left">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-black">Sudah Ditarik</div>
                  <div className="text-lg sm:text-xl font-black text-blue-400 mt-0.5">
                    Rp {totalApprovedWithdrawals.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Ditransfer ke rekening</div>
                </div>

                <div className="bg-slate-800/90 p-4 rounded-2xl border-2 border-emerald-500 text-center sm:text-left">
                  <div className="text-[10px] sm:text-[11px] text-emerald-300 uppercase font-black">Saldo Tersedia</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">
                    Rp {availableCommission.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-emerald-200 mt-0.5">Siap ditarik hari ini</div>
                </div>
              </div>

              {/* Form Penarikan Komisi */}
              <div className="bg-slate-800/95 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm border-b border-slate-700 pb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Formulir Pengajuan Penarikan Komisi</span>
                </div>

                <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Nominal Penarikan (Rp):
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setWithdrawAmount(prev => Math.max(50000, prev - 50000))}
                        className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-700 active:scale-95 text-white flex items-center justify-center font-black border border-slate-700 cursor-pointer flex-shrink-0"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <input
                        type="number"
                        min={50000}
                        step={10000}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(parseInt(e.target.value) || 0)}
                        className="flex-1 bg-slate-900 border-2 border-emerald-500 rounded-xl px-3 py-2.5 text-base sm:text-lg font-black text-emerald-400 text-center focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => setWithdrawAmount(prev => Math.min(availableCommission, prev + 50000))}
                        className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-700 active:scale-95 text-white flex items-center justify-center font-black border border-slate-700 cursor-pointer flex-shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Presets */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2">
                      {[100000, 250000, 500000, 1000000].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setWithdrawAmount(val)}
                          className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Rp {val.toLocaleString('id-ID')}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setWithdrawAmount(availableCommission)}
                        className="bg-emerald-950 hover:bg-emerald-900 border border-emerald-600 text-emerald-300 px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer col-span-2 sm:col-span-1"
                      >
                        Tarik Semua
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Bank / E-Wallet Tujuan:</label>
                      <select
                        value={withdrawBank}
                        onChange={(e) => setWithdrawBank(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        <option value="BCA">BCA (Bank Central Asia)</option>
                        <option value="BRI">BRI (Bank Rakyat Indonesia)</option>
                        <option value="Mandiri">Bank Mandiri</option>
                        <option value="BNI">BNI (Bank Negara Indonesia)</option>
                        <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                        <option value="DANA">DANA (E-Wallet)</option>
                        <option value="GoPay">GoPay (E-Wallet)</option>
                        <option value="OVO">OVO (E-Wallet)</option>
                        <option value="ShopeePay">ShopeePay</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nomor Rekening / No. HP: *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 8210394821"
                        value={withdrawAccountNo}
                        onChange={(e) => setWithdrawAccountNo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nama Pemilik Rekening: *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama sesuai buku tabungan"
                        value={withdrawAccountHolder}
                        onChange={(e) => setWithdrawAccountHolder(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Catatan Tambahan (Opsional):</label>
                    <input
                      type="text"
                      placeholder="Misal: Penarikan komisi minggu ke-2 Oktober"
                      value={withdrawNotes}
                      onChange={(e) => setWithdrawNotes(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={availableCommission < 50000}
                    className={`w-full font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                      availableCommission >= 50000
                        ? 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <ArrowDownCircle className="w-4 h-4" />
                    <span>Ajukan Penarikan Komisi Sekarang</span>
                  </button>
                  {availableCommission < 50000 && (
                    <p className="text-[11px] text-amber-400 text-center">
                      Minimum saldo penarikan komisi adalah Rp 50.000. Dapatkan lebih banyak komisi dengan membagikan link affiliate Anda.
                    </p>
                  )}
                </form>
              </div>

              {/* Riwayat Penarikan Komisi */}
              <div className="space-y-3">
                <h4 className="font-black text-white text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Riwayat Pengajuan Penarikan Komisi
                </h4>

                {memberWithdrawals.length === 0 ? (
                  <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 text-center text-xs text-slate-400">
                    Belum ada riwayat penarikan komisi.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {memberWithdrawals.map(wd => (
                      <div key={wd.id} className="bg-slate-800/90 p-3.5 sm:p-4 rounded-2xl border border-slate-700/80 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-emerald-400">{wd.id}</span>
                            <span className="text-[11px] text-slate-400">
                              • {new Date(wd.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            wd.status === 'approved' ? 'bg-emerald-900 text-emerald-300 border border-emerald-700' :
                            wd.status === 'rejected' ? 'bg-rose-900 text-rose-300 border border-rose-700' :
                            'bg-amber-900/80 text-amber-300 border border-amber-700'
                          }`}>
                            {wd.status === 'approved' ? '✓ Sudah Ditransfer' :
                             wd.status === 'rejected' ? '✗ Ditolak' :
                             '⏳ Menunggu Transfer Admin'}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                          <div>
                            Nominal: <strong className="text-base text-white">Rp {wd.amount.toLocaleString('id-ID')}</strong>
                            <span className="text-slate-400 ml-2">({wd.bankName} - {wd.bankAccountNumber} a.n {wd.bankAccountHolder})</span>
                          </div>
                        </div>

                        {wd.notes && (
                          <div className="text-[11px] text-slate-400">
                            Catatan Member: <em>{wd.notes}</em>
                          </div>
                        )}

                        {wd.adminNotes && (
                          <div className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
                            <strong>Keterangan Admin:</strong> {wd.adminNotes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PESANAN MASUK (OVERVIEW & LOG) */}
          {activeTab === 'orders' && (
            <div className="space-y-4 sm:space-y-6 max-w-4xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Log Pesanan & Komisi Masuk</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Seluruh pesanan pembeli yang masuk melalui link affiliate Anda.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                <div className="bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-black">Total Transaksi</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {memberReferralOrders.length} Pesanan
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Via link @{member.username}</div>
                </div>

                <div className="bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-black">Botol Terjual</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                    {member.totalSoldPcs} Pcs
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Total unit botol</div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-emerald-500/50">
                  <div className="text-[10px] sm:text-xs text-emerald-300 uppercase font-black">Total Komisi Anda</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                    Rp {member.totalCommissionRp.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-emerald-300/80 mt-0.5">Terkumpul di sistem</div>
                </div>
              </div>

              {/* Order List */}
              {memberReferralOrders.length === 0 ? (
                <div className="bg-slate-800/60 p-6 sm:p-8 rounded-2xl border border-slate-700 text-center space-y-3">
                  <Package className="w-10 h-10 text-slate-500 mx-auto" />
                  <h4 className="text-base font-bold text-white">Belum Ada Pesanan yang Masuk</h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                    Bagikan link landing page khusus Anda atau masukkan pesanan di menu Daftar Pembeli untuk mulai mengumpulkan komisi!
                  </p>
                  <button
                    onClick={() => setActiveTab('share')}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" /> Share Link Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {memberReferralOrders.map((ord) => (
                    <div key={ord.id} className="bg-slate-800/90 p-3.5 sm:p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-emerald-400">{ord.id}</span>
                          <span className="text-[11px] text-slate-400">
                            • {new Date(ord.createdAt).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          ord.status === 'delivered' ? 'bg-emerald-900 text-emerald-300 border border-emerald-700' :
                          ord.status === 'shipped' ? 'bg-blue-900 text-blue-300 border border-blue-700' :
                          ord.status === 'processing' ? 'bg-teal-900 text-teal-300 border border-teal-700' :
                          ord.status === 'cancelled' ? 'bg-red-900 text-red-300 border border-red-700' :
                          'bg-amber-900/80 text-amber-300 border border-amber-700'
                        }`}>
                          {ord.status === 'delivered' ? 'Selesai' :
                           ord.status === 'shipped' ? 'Dikirim' :
                           ord.status === 'processing' ? 'Diproses' :
                           ord.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu Bayar'}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-white">
                        {ord.customerName} • <span className="text-slate-300 font-normal">{ord.destinationCity}, {ord.destinationProvince}</span>
                      </div>

                      <div className="text-xs text-slate-300">
                        {ord.items.map(it => `${it.productName} (${it.qty}x)`).join(', ')}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                        <span className="text-slate-400">
                          Total Belanja: <strong className="text-white">Rp {ord.grandTotal.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-emerald-400 font-black">
                          Komisi: +Rp {(ord.affiliateProfit || (ord.items.reduce((a, b) => a + b.qty, 0) * Math.max(0, (member.customPricePerBottle || 100000) - 70000))).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ATUR HARGA JUAL */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 sm:space-y-6 max-w-2xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Pengaturan Harga Jual Mandiri</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Member dibebaskan mengatur sendiri harga jual produk yang tampil di landing page pribadi Anda.
                </p>
              </div>

              <div className="bg-slate-800/95 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700 space-y-4">
                <div className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-700 pb-3">
                  <span className="text-slate-400 font-medium">Harga Modal Reseller / Member:</span>
                  <span className="font-black text-white text-sm sm:text-base bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
                    Rp 70.000 / botol
                  </span>
                </div>

                {/* Quick Presets for Mobile */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Pilihan Cepat Harga Rekomendasi (Tap untuk memilih):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[100000, 115000, 125000, 150000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCustomPriceInput(preset)}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                          customPriceInput === preset
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        Rp {preset.toLocaleString('id-ID')}
                        {preset === 100000 && <span className="block text-[9px] text-emerald-200">Rekomendasi</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stepper + Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Tentukan Harga Jual yang Ditampilkan ke Pembeli Anda (Rp):
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomPriceInput(prev => Math.max(70000, prev - 5000))}
                      className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-700 active:scale-95 text-white flex items-center justify-center font-black border border-slate-700 cursor-pointer flex-shrink-0"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      min={70000}
                      step={5000}
                      value={customPriceInput}
                      onChange={(e) => setCustomPriceInput(parseInt(e.target.value) || 100000)}
                      className="flex-1 bg-slate-900 border-2 border-emerald-500 rounded-xl px-3 py-2.5 text-base sm:text-lg font-black text-emerald-400 text-center focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setCustomPriceInput(prev => prev + 5000)}
                      className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-700 active:scale-95 text-white flex items-center justify-center font-black border border-slate-700 cursor-pointer flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Profit Margin Preview Card */}
                <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-700 text-xs sm:text-sm space-y-1">
                  <div className="text-[11px] sm:text-xs text-emerald-300 font-bold uppercase">
                    Estimasi Keuntungan Bersih Anda:
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">
                    Rp {Math.max(0, customPriceInput - 70000).toLocaleString('id-ID')} / botol
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Setiap pembeli memesan 1 botol via landing page Anda, Anda otomatis memperoleh selisih profit ini.
                  </p>
                </div>

                <button
                  onClick={handleSavePrice}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Harga Pilihan Saya</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: ORDER STOK HARGA MEMBER */}
          {activeTab === 'order' && (
            <div className="space-y-4 sm:space-y-6 max-w-2xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Order Stok Member (Harga Modal)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Pesan stok langsung dengan harga modal reseller Rp 70.000 per botol (dikirim ke alamat Anda atau dropship ke konsumen).
                </p>
              </div>

              {orderDone ? (
                <div className="bg-slate-800 p-6 rounded-2xl sm:rounded-3xl border border-emerald-500 text-center space-y-3.5">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg sm:text-xl font-bold text-white">Pesanan Restok Berhasil Dicatat!</h4>
                  <p className="text-xs text-slate-300">
                    Pesanan Anda telah masuk ke dashboard admin. Silakan konfirmasi ke WhatsApp admin untuk detail pengiriman.
                  </p>
                  <button
                    onClick={() => setOrderDone(false)}
                    className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition cursor-pointer"
                  >
                    Buat Pesanan Restok Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreateRestockOrder} className="bg-slate-800/95 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700 space-y-3.5">
                  <div className="p-3.5 bg-emerald-950 rounded-xl border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <div className="text-[11px] text-emerald-300 font-bold">Harga Member HI-OMEGA:</div>
                      <div className="text-lg sm:text-xl font-black text-white">Rp 70.000 / botol</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300 font-bold">Jumlah:</span>
                      <div className="flex items-center gap-1.5">
                        {[1, 3, 5, 10].map(q => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => setOrderQty(q)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer border ${
                              orderQty === q
                                ? 'bg-emerald-600 text-white border-emerald-400'
                                : 'bg-slate-900 text-slate-300 border-slate-700'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
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
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nomor WhatsApp:</label>
                      <input
                        type="tel"
                        required
                        value={orderWa}
                        onChange={(e) => setOrderWa(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Alamat Tujuan Pengiriman:</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Jalan, No rumah, RT/RW, Kecamatan, Kota..."
                      value={orderAddress}
                      onChange={(e) => setOrderAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Summary cost */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex justify-between items-center text-xs sm:text-sm font-bold">
                    <span>Total Tagihan ({orderQty} Botol + Ongkir Flat):</span>
                    <span className="text-emerald-400 text-base font-black">
                      Rp {(70000 * orderQty + 15000).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition shadow-lg cursor-pointer"
                  >
                    Kirim Pesanan Restok Member
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 8: CEK ONGKOS KIRIM */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Cek Ongkos Kirim Cepat</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Simulator ongkir seluruh Indonesia untuk menjawab pertanyaan calon pembeli di WhatsApp.
                </p>
              </div>

              <div className="bg-slate-800/95 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700 space-y-3.5">
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
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    >
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Kota / Kabupaten:</label>
                    <select
                      value={shipCity}
                      onChange={(e) => setShipCity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
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
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>

                {shipRate && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    <div className="bg-slate-900 p-3 rounded-xl text-center border border-slate-700">
                      <div className="text-[11px] font-black text-red-400">J&T Express</div>
                      <div className="text-base sm:text-lg font-black text-white mt-0.5">
                        Rp {(shipRate.jntReg * Math.max(1, Math.ceil((shipQty * 75)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl text-center border border-slate-700">
                      <div className="text-[11px] font-black text-blue-400">JNE Reguler</div>
                      <div className="text-base sm:text-lg font-black text-white mt-0.5">
                        Rp {(shipRate.jneReg * Math.max(1, Math.ceil((shipQty * 75)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl text-center border border-slate-700">
                      <div className="text-[11px] font-black text-rose-400">SiCepat REG</div>
                      <div className="text-base sm:text-lg font-black text-white mt-0.5">
                        Rp {(shipRate.sicepatReg * Math.max(1, Math.ceil((shipQty * 75)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl text-center border border-slate-700">
                      <div className="text-[11px] font-black text-orange-400">Pos Kilat</div>
                      <div className="text-base sm:text-lg font-black text-white mt-0.5">
                        Rp {(shipRate.posKilat * Math.max(1, Math.ceil((shipQty * 75)/1000))).toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">{shipRate.estDays}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 9: BANK KONTEN */}
          {activeTab === 'content' && (
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Bank Konten & Materi Copywriting</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Materi promosi siap pakai tinggal 1-tap salin untuk status WhatsApp, Facebook, dan Instagram.
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {['all', 'edukasi', 'testimoni', 'promo'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setContentCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      contentCategory === cat
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'Semua Konten' : cat.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="space-y-3.5">
                {filteredContent.map((item) => (
                  <div key={item.id} className="bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-slate-700 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold uppercase">
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

                    <h4 className="font-black text-white text-sm sm:text-base">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>

                    {item.copyText && (
                      <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-200 whitespace-pre-line relative">
                        {item.copyText.replace(/\[LINK_AFFILIATE_ANDA\]/g, affiliateUrl)}
                        <button
                          onClick={() => copyToClipboard(item.copyText!.replace(/\[LINK_AFFILIATE_ANDA\]/g, affiliateUrl), false, item.id)}
                          className="mt-3 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          {copiedTextId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedTextId === item.id ? 'Tersalin ke Clipboard!' : 'Salin Teks Copywriting'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: KNOWLEDGE CENTER */}
          {activeTab === 'knowledge' && (
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Knowledge Center: Seputar HI-OMEGA</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Bekal pemahaman lengkap tentang Sacha Inchi, Omega 3-6-9 nabati, VCO, izin BPOM, dan aturan konsumsi.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-emerald-400 text-sm sm:text-base">
                    Apa itu Sacha Inchi (Plukenetia volubilis)?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Sacha Inchi adalah tanaman kacang bintang hutan Amazon yang dikenal sebagai superfood penghasil minyak nabati terkaya di dunia. Mengandung asam lemak tak jenuh hingga 93%, terdiri dari Omega-3 (48-54%), Omega-6 (35-37%), dan Omega-9 (8-9%).
                  </p>
                </div>

                <div className="bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-emerald-400 text-sm sm:text-base">
                    Mengapa Lebih Unggul dari Minyak Ikan Salmon?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    1. <strong>Bebas Merkuri & Logam Berat:</strong> Minyak ikan laut berisiko tercemar limbah mikroplastik & logam berat, sedangkan Sacha Inchi 100% murni nabati.<br />
                    2. <strong>Tidak Amis & Tidak Bau:</strong> Kapsul mudah ditelan tanpa rasa bersendawa bau amis.<br />
                    3. <strong>Kombinasi VCO:</strong> Diperkaya Virgin Coconut Oil dengan asam laurat untuk menjaga kesehatan lambung.
                  </p>
                </div>

                <div className="bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-emerald-400 text-sm sm:text-base">
                    Legalitas Resmi & Sertifikasi:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    HI-OMEGA terdaftar resmi di Badan Pengawas Obat dan Makanan (BPOM) dengan nomor <strong>POM TR253094921</strong> serta bersertifikasi Halal resmi.
                  </p>
                </div>

                <div className="bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-emerald-400 text-sm sm:text-base">
                    Anjuran Dosis & Aturan Minum:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    • <strong>Pencegahan & Stamina Harian:</strong> 1 - 2 kapsul per hari setelah makan.<br />
                    • <strong>Terapi Keluhan (Kolesterol / Asam Urat / Hipertensi):</strong> 2 kapsul pagi dan 2 kapsul malam setelah makan.<br />
                    • Perbanyak minum air hangat untuk mempercepat kelancaran metabolisme tubuh.
                  </p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
