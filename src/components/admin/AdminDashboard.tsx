import React, { useState, useEffect } from 'react';
import { ProductItem, Member, CustomerOrder, SiteSettings, WithdrawalRequest } from '../../types';
import { 
  saveStoredProducts, 
  saveStoredMembers, 
  saveStoredSettings, 
  saveStoredOrders,
  getStoredWithdrawals,
  updateWithdrawalStatus,
  updateMemberPassword
} from '../../utils/storage';
import { 
  Package, 
  Users, 
  Image as ImageIcon, 
  ShoppingBag, 
  Check, 
  X, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  MessageCircle,
  Clock,
  TrendingUp,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter,
  Key,
  Eye,
  EyeOff,
  Coins,
  ArrowDownCircle,
  Wallet
} from 'lucide-react';
import { ShippingEstimator } from './ShippingEstimator';

interface AdminDashboardProps {
  products: ProductItem[];
  onUpdateProducts: (p: ProductItem[]) => void;
  members: Member[];
  onUpdateMembers: (m: Member[]) => void;
  settings: SiteSettings;
  onUpdateSettings: (s: SiteSettings) => void;
  orders: CustomerOrder[];
  onUpdateOrders?: (orders: CustomerOrder[]) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProducts,
  members,
  onUpdateMembers,
  settings,
  onUpdateSettings,
  orders,
  onUpdateOrders,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'stock' | 'orders' | 'members' | 'withdrawals' | 'shipping' | 'images'>('stock');
  const [notification, setNotification] = useState<string>('');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'processing' | 'shipped'>('all');

  const [heroBannerUrl, setHeroBannerUrl] = useState(settings.images.heroBannerUrl);
  const [productMainUrl, setProductMainUrl] = useState(settings.images.productMainUrl);

  // Member Password Management state
  const [editingPasswordMember, setEditingPasswordMember] = useState<Member | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  // Withdrawals state
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => getStoredWithdrawals());

  useEffect(() => {
    setWithdrawals(getStoredWithdrawals());
  }, [activeTab]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleStockChange = (id: string, newStock: number, newPrice: number) => {
    const updated = products.map((p) => (p.id === id ? { ...p, stock: newStock, retailPrice: newPrice } : p));
    onUpdateProducts(updated);
    saveStoredProducts(updated);
    showNotification('Stok & Harga produk berhasil disimpan!');
  };

  const handleMemberStatus = (id: string, newStatus: 'active' | 'pending' | 'suspended') => {
    const updated = members.map((m) => (m.id === id ? { ...m, status: newStatus } : m));
    onUpdateMembers(updated);
    saveStoredMembers(updated);
    showNotification(`Status member diubah menjadi: ${newStatus.toUpperCase()}`);
  };

  const handleTogglePassword = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenPasswordModal = (m: Member) => {
    setEditingPasswordMember(m);
    setNewPasswordInput(m.password || 'member123');
  };

  const handleSaveMemberPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPasswordMember) return;
    if (!newPasswordInput.trim()) {
      alert('Password tidak boleh kosong');
      return;
    }
    const updated = updateMemberPassword(editingPasswordMember.id, newPasswordInput.trim());
    onUpdateMembers(updated);
    showNotification(`Password member @${editingPasswordMember.username} berhasil diubah!`);
    setEditingPasswordMember(null);
  };

  const handleApproveWithdrawal = (id: string) => {
    const note = prompt('Masukkan catatan bukti transfer / no ref transfer (opsional):', 'Transfer via KlikBCA - Sukses') || 'Transfer Berhasil';
    const updated = updateWithdrawalStatus(id, 'approved', note);
    setWithdrawals(updated);
    showNotification('Status penarikan komisi diubah menjadi: SUDAH DITRANSFER (APPROVED)');
  };

  const handleRejectWithdrawal = (id: string) => {
    const reason = prompt('Masukkan alasan penolakan penarikan komisi:', 'Data rekening tidak sesuai') || 'Pengajuan ditolak oleh admin';
    const updated = updateWithdrawalStatus(id, 'rejected', reason);
    setWithdrawals(updated);
    showNotification('Status penarikan komisi diubah menjadi: DITOLAK (REJECTED)');
  };

  const handleOrderStatus = (orderId: string, newStatus: CustomerOrder['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    if (onUpdateOrders) {
      onUpdateOrders(updated);
    }
    saveStoredOrders(updated);
    showNotification(`Status pesanan #${orderId} diubah menjadi: ${newStatus.toUpperCase()}`);
  };

  const handleSaveImages = () => {
    const updated = {
      ...settings,
      images: {
        ...settings.images,
        heroBannerUrl,
        productMainUrl
      }
    };
    onUpdateSettings(updated);
    saveStoredSettings(updated);
    showNotification('Gambar website berhasil diperbarui!');
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const activeMembersCount = members.filter((m) => m.status === 'active').length;
  const pendingWithdrawalsCount = withdrawals.filter((w) => w.status === 'pending').length;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'pending') return o.status === 'pending';
    if (orderFilter === 'processing') return o.status === 'processing';
    if (orderFilter === 'shipped') return o.status === 'shipped' || o.status === 'delivered';
    return true;
  });

  interface TabItem {
    id: 'stock' | 'orders' | 'members' | 'withdrawals' | 'shipping' | 'images';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count: number | null;
    alert?: boolean;
  }

  const tabList: TabItem[] = [
    { id: 'stock', label: 'Stok & Harga', icon: Package, count: null },
    { id: 'orders', label: 'Pesanan', icon: ShoppingBag, count: orders.length, alert: pendingOrdersCount > 0 },
    { id: 'members', label: 'Member', icon: Users, count: members.length },
    { id: 'withdrawals', label: 'Tarik Komisi', icon: Wallet, count: pendingWithdrawalsCount > 0 ? pendingWithdrawalsCount : null, alert: pendingWithdrawalsCount > 0 },
    { id: 'shipping', label: 'Cek Ongkir', icon: Truck, count: null },
    { id: 'images', label: 'Gambar Web', icon: ImageIcon, count: null }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
      {/* 1. TOP NAVBAR (Responsive Mobile Header) */}
      <header className="bg-slate-950 border-b border-slate-800 px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-600 flex items-center justify-center font-black text-white shadow-md flex-shrink-0 text-xs sm:text-base">
            AD
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-lg font-black text-white truncate leading-tight">
                Panel Admin HI-OMEGA
              </h2>
              <span className="hidden sm:inline-block bg-teal-900/80 text-teal-300 border border-teal-500/50 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                Operasional
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-teal-400/90 truncate hidden xs:block">
              Pengelolaan Stok, Approval Member, Cek Ongkir & Pesanan Masuk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {notification && (
            <span className="hidden sm:inline-block bg-teal-500/20 text-teal-300 border border-teal-500/40 px-3 py-1 rounded-xl text-xs font-bold animate-pulse">
              ✓ {notification}
            </span>
          )}
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            aria-label="Tutup Panel Admin"
          >
            <X className="w-4 h-4 text-slate-300" />
            <span>Tutup</span>
          </button>
        </div>
      </header>

      {/* Floating Notification on mobile if exists */}
      {notification && (
        <div className="sm:hidden bg-teal-600 text-white px-3 py-1.5 text-xs font-black text-center shadow-md animate-pulse">
          ✓ {notification}
        </div>
      )}

      {/* 2. MOBILE HORIZONTAL NAVIGATION BAR (Visible on < md) */}
      <nav className="md:hidden bg-slate-950 border-b border-slate-800 px-2 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0">
        {tabList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md ring-1 ring-teal-400'
                  : 'text-slate-400 bg-slate-900/80 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  tab.alert && tab.id === 'orders'
                    ? 'bg-amber-400 text-slate-950 animate-pulse'
                    : isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. MAIN DASHBOARD WORKSPACE (Sidebar for Desktop + Content Area) */}
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* DESKTOP SIDEBAR (Visible on md+) */}
        <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-800 p-4 flex-col justify-between flex-shrink-0">
          <div className="space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-500">
              Navigasi Admin
            </div>
            {tabList.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== null && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      tab.alert && tab.id === 'orders'
                        ? 'bg-amber-400 text-slate-950'
                        : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Stats Pill at Sidebar Bottom */}
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-[11px] space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Pesanan Masuk:</span>
              <strong className="text-white font-mono">{orders.length}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Menunggu Bayar:</span>
              <strong className="text-amber-400 font-mono">{pendingOrdersCount}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Member Aktif:</span>
              <strong className="text-emerald-400 font-mono">{activeMembersCount}</strong>
            </div>
          </div>
        </aside>

        {/* CONTENT VIEW AREA */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 bg-slate-900 text-white">
          {/* TAB 1: STOCK & PRICE */}
          {activeTab === 'stock' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white">Kelola Ketersediaan Stok & Harga Jual</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">
                  Atur stok fisik di gudang Sidoarjo dan patokan harga jual resmi website untuk setiap paket.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {products.map((item) => {
                  const bCount = item.bottleCount || (item.id === 'hi-omega-member-5' ? 5 : item.id === 'hi-omega-paket-3' ? 3 : 1);
                  return (
                    <div 
                      key={item.id} 
                      className="bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-slate-700/80 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 hover:border-slate-600 transition"
                    >
                      {/* Product Header / Info */}
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl bg-slate-900 p-1 border border-slate-700 flex-shrink-0 flex items-center justify-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="bg-teal-900 text-teal-300 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-md uppercase">
                              {bCount} Botol
                            </span>
                            <span className="text-[10px] sm:text-xs text-slate-400 font-bold">
                              {item.pillCount} Kapsul • @75g/botol
                            </span>
                          </div>
                          <h4 className="font-black text-sm sm:text-base text-white mt-1 leading-snug truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                            {item.subName}
                          </p>
                        </div>
                      </div>

                      {/* Inputs & Save button */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5 pt-2 sm:pt-0 border-t border-slate-700/60 md:border-t-0">
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
                          <div>
                            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 mb-1">
                              Stok Paket:
                            </label>
                            <input
                              type="number"
                              defaultValue={item.stock}
                              id={`stock-${item.id}`}
                              className="w-full sm:w-24 bg-slate-900 border border-slate-700 focus:border-teal-500 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white text-center font-black focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 mb-1">
                              Harga Jual (Rp):
                            </label>
                            <input
                              type="number"
                              defaultValue={item.promoPrice || item.retailPrice}
                              id={`price-${item.id}`}
                              className="w-full sm:w-32 bg-slate-900 border border-slate-700 focus:border-teal-500 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white text-center font-black focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const s = parseInt((document.getElementById(`stock-${item.id}`) as HTMLInputElement)?.value) || item.stock;
                            const p = parseInt((document.getElementById(`price-${item.id}`) as HTMLInputElement)?.value) || item.retailPrice;
                            handleStockChange(item.id, s, p);
                          }}
                          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 active:scale-95 text-white px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS (Customer Orders Management) */}
          {activeTab === 'orders' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Header & Metrics */}
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white">Daftar Transaksi Pesanan Pelanggan</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Setiap pesanan website otomatis masuk ke sini lengkap dengan rincian rekening tujuan transfer Bank BRI & Bank BCA.
                </p>
              </div>

              {/* Order Metrics Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                <div className="bg-slate-800/90 border border-slate-700 p-3 sm:p-4 rounded-2xl shadow-xs">
                  <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">Total Pesanan:</div>
                  <div className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    {orders.length}
                  </div>
                  <div className="text-[10px] sm:text-xs text-teal-400 font-bold mt-0.5">
                    Transaksi Tercatat
                  </div>
                </div>

                <div className="bg-amber-950/40 border border-amber-600/50 p-3 sm:p-4 rounded-2xl shadow-xs">
                  <div className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase">Menunggu Pembayaran:</div>
                  <div className="text-xl sm:text-3xl font-black text-amber-400 font-mono mt-1">
                    {pendingOrdersCount}
                  </div>
                  <div className="text-[10px] sm:text-xs text-amber-300/80 font-bold mt-0.5">
                    Perlu Cek Bukti Transfer
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-emerald-950/40 border border-emerald-600/50 p-3 sm:p-4 rounded-2xl shadow-xs">
                  <div className="text-[10px] sm:text-xs text-emerald-300 font-bold uppercase">Total Nilai Pesanan:</div>
                  <div className="text-lg sm:text-2xl font-black text-emerald-300 font-mono mt-1 truncate">
                    {formatRupiah(totalRevenue)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-emerald-400 font-bold mt-0.5">
                    Termasuk Ongkir
                  </div>
                </div>
              </div>

              {/* Filter Tabs on Mobile */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {(['all', 'pending', 'processing', 'shipped'] as const).map((flt) => (
                  <button
                    key={flt}
                    onClick={() => setOrderFilter(flt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                      orderFilter === flt
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {flt === 'all' && `Semua (${orders.length})`}
                    {flt === 'pending' && `Menunggu Transfer (${pendingOrdersCount})`}
                    {flt === 'processing' && `Diproses (${orders.filter(o => o.status === 'processing').length})`}
                    {flt === 'shipped' && `Dikirim (${orders.filter(o => o.status === 'shipped' || o.status === 'delivered').length})`}
                  </button>
                ))}
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-3xl border border-slate-800">
                  <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold">Tidak ada pesanan pada filter ini.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredOrders.map((ord) => {
                    const isPending = ord.status === 'pending';
                    const cleanPhone = ord.customerWhatsapp.replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

                    return (
                      <div 
                        key={ord.id} 
                        className={`bg-slate-800/90 rounded-2xl border p-3.5 sm:p-5 space-y-3 shadow-md transition ${
                          isPending ? 'border-amber-500/70' : 'border-slate-700'
                        }`}
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/70 pb-2.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm sm:text-base text-teal-300 font-black">
                              #{ord.id}
                            </span>
                            <span className="text-[11px] sm:text-xs text-slate-400">
                              • {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {ord.source === 'member_input' && (
                              <span className="bg-teal-950 text-teal-300 border border-teal-700 text-[10px] font-black px-2 py-0.5 rounded-md">
                                Input Manual Member: @{ord.affiliateRef}
                              </span>
                            )}
                            {ord.source !== 'member_input' && ord.affiliateRef && (
                              <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md">
                                Ref Affiliate: @{ord.affiliateRef}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-full border ${
                              isPending
                                ? 'bg-amber-950 text-amber-300 border-amber-500'
                                : ord.status === 'processing'
                                  ? 'bg-blue-950 text-blue-300 border-blue-500'
                                  : ord.status === 'shipped'
                                    ? 'bg-purple-950 text-purple-300 border-purple-500'
                                    : 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            }`}>
                              {isPending ? '⏳ Menunggu Pembayaran Transfer' : ord.status.toUpperCase()}
                            </span>

                            <span className="text-xs sm:text-sm font-black text-amber-300 font-mono bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-700">
                              {formatRupiah(ord.grandTotal)}
                            </span>
                          </div>
                        </div>

                        {/* Order Details Body */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                          {/* Left: Customer Info */}
                          <div className="space-y-1">
                            <div>
                              <span className="text-slate-400 font-bold">Penerima: </span>
                              <strong className="text-white font-extrabold">{ord.customerName}</strong>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-bold">WhatsApp: </span>
                              <strong className="text-teal-300 font-mono">{ord.customerWhatsapp}</strong>
                              <a
                                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                                  `Halo Kak ${ord.customerName}, kami dari Admin HI-OMEGA terkait pesanan #${ord.id}. Apakah Kakak sudah melakukan transfer pembayaran ke Bank BRI (315-6010-500-575-30) / Bank BCA (726-540-9512) an MILA MUKROFIN? Mohon kirimkan bukti transfer agar segera kami proses pengiriman hari ini. Terima kasih!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>Chat WA</span>
                              </a>
                            </div>
                            <div>
                              <span className="text-slate-400 font-bold">Alamat: </span>
                              <span className="text-slate-200">
                                {ord.addressDetails}, {ord.destinationCity}, {ord.destinationProvince}
                              </span>
                            </div>
                          </div>

                          {/* Right: Products & Courier */}
                          <div className="space-y-1 sm:border-l sm:border-slate-700 sm:pl-3">
                            <div>
                              <span className="text-slate-400 font-bold">Kurir & Ongkir: </span>
                              <span className="font-extrabold text-white">
                                {ord.courier} • Ongkir: {formatRupiah(ord.shippingCost)}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-bold">Produk: </span>
                              <div className="mt-0.5 space-y-0.5">
                                {ord.items.map((it, idx) => (
                                  <div key={idx} className="bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-700/60 font-bold text-white text-[11px]">
                                    ✓ {it.productName} [{it.qty} Paket] • {formatRupiah(it.totalPrice)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Action Status Changer */}
                        <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="text-[11px] text-slate-400 font-bold">
                            Tujuan Transfer: <span className="text-slate-200">BRI (315-6010-500-575-30) / BCA (726-540-9512) an MILA MUKROFIN</span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-slate-400 font-bold">Ubah Status:</span>
                            <select
                              value={ord.status}
                              onChange={(e) => handleOrderStatus(ord.id, e.target.value as CustomerOrder['status'])}
                              className="bg-slate-900 border border-slate-700 text-xs font-black rounded-lg px-2.5 py-1 text-white focus:outline-none cursor-pointer"
                            >
                              <option value="pending">Menunggu Transfer (Pending)</option>
                              <option value="processing">Sudah Bayar / Diproses</option>
                              <option value="shipped">Sedang Dikirim (Shipped)</option>
                              <option value="delivered">Selesai / Terkirim</option>
                              <option value="cancelled">Dibatalkan (Cancelled)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MEMBERS */}
          {activeTab === 'members' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white">List Member & Status Kemitraan</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Verifikasi syarat member minimum 5 botol (Rp 350.000) dan aktifkan akses landing page mereka.
                </p>
              </div>

              {/* Members List */}
              <div className="space-y-3">
                {members.map((mem) => {
                  const cleanPhone = mem.whatsapp.replace(/[^0-9]/g, '');
                  const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

                  return (
                    <div 
                      key={mem.id} 
                      className="bg-slate-800/90 p-3.5 sm:p-5 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 shadow-md"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-white text-sm sm:text-base">{mem.fullName}</span>
                          <span className="text-xs text-teal-400 font-mono">(@{mem.username})</span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            mem.status === 'active' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                          }`}>
                            {mem.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span>WA: {mem.whatsapp}</span>
                            <a 
                              href={`https://wa.me/${waPhone}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 text-[10px] font-black underline flex items-center gap-0.5"
                            >
                              <MessageCircle className="w-3 h-3" /> Chat Member
                            </a>
                            {mem.city && <span>• Kota: {mem.city}</span>}
                          </div>
                          <div>
                            Terjual: <strong className="text-white">{mem.totalSoldPcs} Botol</strong> • Komisi: <strong className="text-teal-300">Rp {mem.totalCommissionRp.toLocaleString('id-ID')}</strong>
                          </div>

                          {/* Member Password Management (Admin dapat melihat dan merubah password) */}
                          <div className="flex items-center gap-2 mt-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80 w-fit">
                            <Key className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            <span className="text-[11px] text-slate-300 font-bold">Password:</span>
                            <span className="font-mono text-xs font-black text-amber-300">
                              {visiblePasswords[mem.id] ? (mem.password || 'member123') : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleTogglePassword(mem.id)}
                              className="text-slate-400 hover:text-white p-0.5 cursor-pointer transition"
                              title={visiblePasswords[mem.id] ? "Sembunyikan password" : "Lihat password"}
                            >
                              {visiblePasswords[mem.id] ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenPasswordModal(mem)}
                              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-teal-300 font-black px-2 py-0.5 rounded-md border border-slate-700 transition ml-1 cursor-pointer"
                            >
                              Ubah Password
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 pt-2 sm:pt-0 border-t border-slate-700/60 md:border-t-0">
                        <button
                          onClick={() => handleMemberStatus(mem.id, 'active')}
                          className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-3 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve Aktif
                        </button>
                        <button
                          onClick={() => handleMemberStatus(mem.id, 'suspended')}
                          className="bg-rose-700 hover:bg-rose-600 active:scale-95 text-white px-3 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" /> Suspend
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: PENARIKAN KOMISI (SYNC DENGAN MEMBER & SUPER ADMIN) */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white">Daftar Pengajuan Penarikan Komisi</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Verifikasi dan proses transfer pencairan komisi penjualan member / affiliate.
                </p>
              </div>

              {withdrawals.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-3xl border border-slate-800">
                  <Wallet className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold">Belum ada pengajuan penarikan komisi dari member.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {withdrawals.map((wd) => {
                    const cleanPhone = wd.memberWhatsapp.replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
                    const isPending = wd.status === 'pending';

                    return (
                      <div 
                        key={wd.id}
                        className={`bg-slate-800/90 p-4 sm:p-5 rounded-2xl border space-y-3 shadow-md ${
                          isPending ? 'border-amber-500/80 bg-slate-800' : 'border-slate-700'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-2.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm sm:text-base font-black text-teal-300">#{wd.id}</span>
                            <span className="text-xs text-slate-400">
                              • {new Date(wd.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            <span className="font-bold text-white text-xs">
                              Member: <strong>{wd.memberFullName}</strong> (@{wd.memberUsername})
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              wd.status === 'approved' ? 'bg-emerald-900 text-emerald-300 border border-emerald-700' :
                              wd.status === 'rejected' ? 'bg-rose-900 text-rose-300 border border-rose-700' :
                              'bg-amber-900/80 text-amber-300 border border-amber-700'
                            }`}>
                              {wd.status === 'approved' ? '✓ Sudah Ditransfer' :
                               wd.status === 'rejected' ? '✗ Ditolak' :
                               '⏳ Menunggu Transfer'}
                            </span>
                            <span className="text-base sm:text-lg font-black text-amber-300 font-mono bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
                              Rp {wd.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                          <div>
                            <div className="text-slate-400 font-bold mb-1">Rekening Tujuan Pencairan:</div>
                            <div className="text-white font-black text-sm bg-slate-900/80 p-2.5 rounded-xl border border-slate-700">
                              <div>Bank / E-Wallet: <span className="text-emerald-400">{wd.bankName}</span></div>
                              <div>No. Rekening: <span className="text-amber-300 font-mono">{wd.bankAccountNumber}</span></div>
                              <div>Atas Nama: <span className="text-white">{wd.bankAccountHolder}</span></div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-bold">WhatsApp Member:</span>
                              <strong className="text-teal-300 font-mono">{wd.memberWhatsapp}</strong>
                              <a
                                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                                  `Halo Kak ${wd.memberFullName} (@${wd.memberUsername}), terkait pengajuan penarikan komisi #${wd.id} sebesar Rp ${wd.amount.toLocaleString('id-ID')} ke rekening ${wd.bankName} ${wd.bankAccountNumber}...`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 text-[10px] font-black underline flex items-center gap-0.5"
                              >
                                <MessageCircle className="w-3 h-3" /> Chat Member
                              </a>
                            </div>

                            {wd.notes && (
                              <div className="text-[11px] text-slate-300">
                                <span className="text-slate-400 font-bold">Catatan Member: </span>
                                <em>{wd.notes}</em>
                              </div>
                            )}

                            {wd.adminNotes && (
                              <div className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
                                <strong>Keterangan Admin:</strong> {wd.adminNotes}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        {isPending && (
                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/60">
                            <button
                              onClick={() => handleApproveWithdrawal(wd.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
                            >
                              <Check className="w-4 h-4" />
                              <span>Setujui & Konfirmasi Sudah Ditransfer</span>
                            </button>
                            <button
                              onClick={() => handleRejectWithdrawal(wd.id)}
                              className="bg-rose-700 hover:bg-rose-600 active:scale-95 text-white font-black px-3 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                              <span>Tolak Pengajuan</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SHIPPING (CEK ONGKIR DARI SIDOARJO) */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <ShippingEstimator isDashboard />
            </div>
          )}

          {/* TAB 5: IMAGES */}
          {activeTab === 'images' && (
            <div className="space-y-4 sm:space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white">Ganti Gambar Produk & Banner</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Perbarui URL gambar produk utama atau banner website secara langsung.
                </p>
              </div>

              <div className="bg-slate-800/90 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700 space-y-4 shadow-md">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">URL Gambar Produk Utama:</label>
                  <input
                    type="text"
                    value={productMainUrl}
                    onChange={(e) => setProductMainUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">URL Gambar Hero Banner:</label>
                  <input
                    type="text"
                    value={heroBannerUrl}
                    onChange={(e) => setHeroBannerUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSaveImages}
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 active:scale-95 text-white px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Gambar</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal Ubah Password Member - Requirement 1 & 2 */}
      {editingPasswordMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border-2 border-teal-500 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-black text-white">Ubah Password Member</h3>
              </div>
              <button 
                onClick={() => setEditingPasswordMember(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300">
              Ubah password akses portal untuk member <strong>{editingPasswordMember.fullName}</strong> (@{editingPasswordMember.username}).
            </div>

            <form onSubmit={handleSaveMemberPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Password Baru Member: *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan password baru"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPasswordMember(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs transition shadow-md cursor-pointer"
                >
                  Simpan Password Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
