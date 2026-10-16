import React, { useState } from 'react';
import { 
  SiteSettings, 
  TrackingPixels, 
  ProductItem, 
  Member, 
  CustomerOrder,
  WithdrawalRequest,
  ColorTheme,
  AppLanguage
} from '../../types';
import { 
  saveStoredSettings, 
  saveStoredTracking, 
  saveStoredProducts, 
  saveStoredMembers, 
  saveStoredOrders,
  getStoredWithdrawals,
  updateWithdrawalStatus,
  updateMemberPassword
} from '../../utils/storage';
import { 
  LayoutDashboard, 
  Code2, 
  Search, 
  Users, 
  Trophy, 
  Palette, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  ShoppingBag,
  Plus, 
  Trash2, 
  Check, 
  X, 
  Save, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Wallet,
  Key,
  Eye,
  EyeOff,
  MessageCircle,
  Clock,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { ShippingEstimator } from './ShippingEstimator';

interface SuperAdminDashboardProps {
  settings: SiteSettings;
  onUpdateSettings: (s: SiteSettings) => void;
  tracking: TrackingPixels;
  onUpdateTracking: (t: TrackingPixels) => void;
  products: ProductItem[];
  onUpdateProducts: (p: ProductItem[]) => void;
  members: Member[];
  onUpdateMembers: (m: Member[]) => void;
  orders: CustomerOrder[];
  onUpdateOrders: (o: CustomerOrder[]) => void;
  onClose: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  settings,
  onUpdateSettings,
  tracking,
  onUpdateTracking,
  products,
  onUpdateProducts,
  members,
  onUpdateMembers,
  orders,
  onUpdateOrders,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'tracking' | 'seo' | 'members' | 'withdrawals' | 'theme' | 'images' | 'products' | 'orders' | 'security' | 'shipping'
  >('overview');

  const [notification, setNotification] = useState<string>('');

  // Withdrawals state synced across app
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => getStoredWithdrawals());
  const [withdrawalFilter, setWithdrawalFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Password visibility & edit state for members
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [editingPasswordMember, setEditingPasswordMember] = useState<Member | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');

  // Orders filter
  const [orderFilter, setOrderFilter] = useState<'all' | 'web' | 'member'>('all');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // Tracking state clones for editing
  const [metaPixelInput, setMetaPixelInput] = useState<string>('');
  const [metaSnippetInput, setMetaSnippetInput] = useState<string>('');
  const [googlePixelInput, setGooglePixelInput] = useState<string>('');
  const [googleSnippetInput, setGoogleSnippetInput] = useState<string>('');
  const [tiktokPixelInput, setTiktokPixelInput] = useState<string>('');
  const [tiktokSnippetInput, setTiktokSnippetInput] = useState<string>('');
  const [gtmIdInput, setGtmIdInput] = useState<string>('');
  const [gtmSnippetInput, setGtmSnippetInput] = useState<string>('');
  const [gaIdInput, setGaIdInput] = useState<string>('');
  const [gaSnippetInput, setGaSnippetInput] = useState<string>('');

  // SEO state
  const [seoTitle, setSeoTitle] = useState(settings.seo.title);
  const [seoDesc, setSeoDesc] = useState(settings.seo.metaDescription);
  const [seoKeywords, setSeoKeywords] = useState(settings.seo.keywords);
  const [seoSchema, setSeoSchema] = useState(settings.seo.schemaMarkupJson);

  // Settings state
  const [theme, setTheme] = useState<ColorTheme>(settings.theme);
  const [lang, setLang] = useState<AppLanguage>(settings.language);
  const [memberRegEnabled, setMemberRegEnabled] = useState(settings.memberRegistrationEnabled);
  const [captchaEnabled, setCaptchaEnabled] = useState(settings.captchaEnabled);
  const [csPhone, setCsPhone] = useState(settings.csWhatsapp);

  // Images state
  const [heroBannerUrl, setHeroBannerUrl] = useState(settings.images.heroBannerUrl);
  const [productMainUrl, setProductMainUrl] = useState(settings.images.productMainUrl);
  const [logoUrl, setLogoUrl] = useState(settings.images.logoUrl);
  const [newCarouselImg, setNewCarouselImg] = useState('');
  const [carouselList, setCarouselList] = useState<string[]>(settings.images.carouselImages);

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalBottlesSold = orders.reduce((sum, o) => sum + o.items.reduce((acc, it) => acc + it.qty, 0), 0);
  const activeMembersCount = members.filter(m => m.status === 'active').length;
  const pendingMembersCount = members.filter(m => m.status === 'pending').length;

  // Save General Settings
  const handleSaveGeneralSettings = () => {
    const updated: SiteSettings = {
      ...settings,
      theme,
      language: lang,
      memberRegistrationEnabled: memberRegEnabled,
      captchaEnabled,
      backgroundMusicEnabled: false,
      backgroundMusicVolume: 0,
      csWhatsapp: csPhone,
      seo: {
        ...settings.seo,
        title: seoTitle,
        metaDescription: seoDesc,
        keywords: seoKeywords,
        schemaMarkupJson: seoSchema
      },
      images: {
        ...settings.images,
        heroBannerUrl,
        productMainUrl,
        logoUrl,
        carouselImages: carouselList
      }
    };

    onUpdateSettings(updated);
    saveStoredSettings(updated);

    showNotification('Pengaturan dan Tema berhasil disimpan!');
  };

  // Pixel management helpers
  const handleAddMetaPixel = () => {
    if (!metaPixelInput.trim()) return;
    const updated = { ...tracking, metaPixelIds: [...tracking.metaPixelIds, metaPixelInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setMetaPixelInput('');
    showNotification('Meta Pixel ID berhasil ditambahkan!');
  };

  const handleAddMetaSnippet = () => {
    if (!metaSnippetInput.trim()) return;
    const updated = { ...tracking, metaHtmlSnippets: [...tracking.metaHtmlSnippets, metaSnippetInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setMetaSnippetInput('');
    showNotification('HTML Pixel Meta Snippet berhasil ditambahkan!');
  };

  const handleAddGooglePixel = () => {
    if (!googlePixelInput.trim()) return;
    const updated = { ...tracking, googlePixelIds: [...tracking.googlePixelIds, googlePixelInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setGooglePixelInput('');
    showNotification('Google Pixel ID berhasil ditambahkan!');
  };

  const handleAddGoogleSnippet = () => {
    if (!googleSnippetInput.trim()) return;
    const updated = { ...tracking, googleHtmlSnippets: [...tracking.googleHtmlSnippets, googleSnippetInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setGoogleSnippetInput('');
    showNotification('HTML Snippet Google Tag berhasil ditambahkan!');
  };

  const handleAddTiktokPixel = () => {
    if (!tiktokPixelInput.trim()) return;
    const updated = { ...tracking, tiktokPixelIds: [...tracking.tiktokPixelIds, tiktokPixelInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setTiktokPixelInput('');
    showNotification('TikTok Pixel ID berhasil ditambahkan!');
  };

  const handleAddTiktokSnippet = () => {
    if (!tiktokSnippetInput.trim()) return;
    const updated = { ...tracking, tiktokHtmlSnippets: [...tracking.tiktokHtmlSnippets, tiktokSnippetInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setTiktokSnippetInput('');
    showNotification('HTML Snippet TikTok Pixel berhasil ditambahkan!');
  };

  const handleAddGtmId = () => {
    if (!gtmIdInput.trim()) return;
    const updated = { ...tracking, gtmIds: [...tracking.gtmIds, gtmIdInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setGtmIdInput('');
    showNotification('Google Tag Manager ID berhasil ditambahkan!');
  };

  const handleAddGtmSnippet = () => {
    if (!gtmSnippetInput.trim()) return;
    const updated = { ...tracking, gtmHtmlSnippets: [...tracking.gtmHtmlSnippets, gtmSnippetInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setGtmSnippetInput('');
    showNotification('HTML GTM Snippet berhasil ditambahkan!');
  };

  const handleAddGaId = () => {
    if (!gaIdInput.trim()) return;
    const updated = { ...tracking, gaIds: [...tracking.gaIds, gaIdInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setGaIdInput('');
    showNotification('Google Analytics 4 ID berhasil ditambahkan!');
  };

  const handleAddGaSnippet = () => {
    if (!gaSnippetInput.trim()) return;
    const updated = { ...tracking, gaHtmlSnippets: [...tracking.gaHtmlSnippets, gaSnippetInput.trim()] };
    onUpdateTracking(updated);
    saveStoredTracking(updated);
    setGaSnippetInput('');
    showNotification('HTML GA4 Snippet berhasil ditambahkan!');
  };

  // Member status toggle
  const handleToggleMemberStatus = (id: string, newStatus: 'active' | 'pending' | 'suspended') => {
    const updated = members.map(m => m.id === id ? { ...m, status: newStatus } : m);
    onUpdateMembers(updated);
    saveStoredMembers(updated);
    showNotification(`Status member diperbarui menjadi: ${newStatus.toUpperCase()}`);
  };

  // Product price & stock update
  const handleUpdateProductStock = (id: string, newStock: number, newPrice: number) => {
    const updated = products.map(p => p.id === id ? { ...p, stock: newStock, retailPrice: newPrice } : p);
    onUpdateProducts(updated);
    saveStoredProducts(updated);
    showNotification('Stok & Harga produk berhasil diperbarui!');
  };

  // Member Password Management
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

  // Withdrawals Management
  const handleApproveWithdrawal = (id: string) => {
    const note = prompt('Masukkan catatan bukti transfer / no ref transfer (opsional):', 'Transfer via KlikBCA - Sukses') || 'Transfer Berhasil';
    const updated = updateWithdrawalStatus(id, 'approved', note);
    setWithdrawals(updated);
    showNotification('Status penarikan komisi diubah menjadi: SUDAH DITRANSFER (APPROVED)');
  };

  const handleRejectWithdrawal = (id: string) => {
    const reason = prompt('Masukkan alasan penolakan penarikan komisi:', 'Data rekening tidak sesuai') || 'Pengajuan ditolak oleh Super Admin';
    const updated = updateWithdrawalStatus(id, 'rejected', reason);
    setWithdrawals(updated);
    showNotification('Status penarikan komisi diubah menjadi: DITOLAK (REJECTED)');
  };

  // Order Status Changer
  const handleOrderStatus = (orderId: string, newStatus: CustomerOrder['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    onUpdateOrders(updated);
    saveStoredOrders(updated);
    showNotification(`Status pesanan #${orderId} diubah menjadi: ${newStatus.toUpperCase()}`);
  };

  const pendingWithdrawalsCount = withdrawals.filter(w => w.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Navbar */}
      <div className="bg-slate-950 border-b border-slate-800 px-3.5 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-md flex-shrink-0 text-xs sm:text-base">
            SA
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-lg font-black text-white truncate leading-tight">Panel SuperAdmin HI-OMEGA</h2>
            <p className="text-[10px] sm:text-xs text-emerald-400 truncate hidden xs:block">Owner & Pengaturan Sistem Penuh</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {notification && (
            <span className="hidden sm:inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold animate-pulse">
              ✓ {notification}
            </span>
          )}
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <X className="w-4 h-4" /> <span>Tutup</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* Sidebar Tabs (Horizontal scroll on mobile, vertical sidebar on desktop) */}
        <div className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-2 md:p-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto flex-shrink-0 no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ringkasan & Metrik</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'tracking' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Multi-Pixel & HTML Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'seo' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>SEO Page Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'members' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Member & Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`flex items-center justify-between gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'withdrawals' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span>Penarikan Komisi</span>
            </div>
            {pendingWithdrawalsCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                {pendingWithdrawalsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'theme' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Tema Warna & Desain</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'images' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Penggantian Gambar Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'products' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Kelola Produk & Stok</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'orders' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Daftar Pesanan Masuk ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'shipping' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Cek Ongkos Kirim (Sidoarjo)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs font-bold transition text-left whitespace-nowrap md:whitespace-normal flex-shrink-0 cursor-pointer ${
              activeTab === 'security' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Keamanan & On/Off Fitur</span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="flex-1 bg-slate-900 p-3.5 sm:p-6 lg:p-8 overflow-y-auto text-slate-100">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Ringkasan Eksekutif & Statistik HI-OMEGA</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 p-5 rounded-3xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Total Omzet Penjualan</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    Rp {totalRevenue.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Dari seluruh transaksi web</div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-3xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Total Botol Terjual</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    {totalBottlesSold} Botol
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Sacha Inchi & VCO Capsules</div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-3xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Member / Affiliate Aktif</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">
                    {activeMembersCount} Member
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{pendingMembersCount} menunggu verifikasi</div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-3xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Total Pesanan Pelanggan</div>
                  <div className="text-2xl font-black text-rose-400 mt-1">
                    {orders.length} Pesanan
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Pengiriman ekspedisi</div>
                </div>
              </div>

              {/* Quick Action Notice */}
              <div className="bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-600/50 p-6 rounded-3xl">
                <h4 className="text-lg font-black text-white">Status Sistem Berjalan Optimal</h4>
                <p className="text-sm text-emerald-200 mt-1">
                  Kredensial Superadmin: <code className="bg-black/40 px-2 py-0.5 rounded text-emerald-300">USER: SUPERADMIN</code> • 
                  Kredensial Admin1: <code className="bg-black/40 px-2 py-0.5 rounded text-emerald-300">USER: ADMIN1</code>.
                  Piksel Meta, Google, TikTok, GTM, dan GA aktif diinjeksi ke browser pengunjung.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: MULTI-PIXEL & TRACKING */}
          {activeTab === 'tracking' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-white">Pengaturan Multi-Pixel & Multi-Tag</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Pasang beberapa ID Pixel dan HTML script sekaligus untuk Meta Ads, Google Ads, TikTok Ads, GTM, dan Google Analytics 4.
                </p>
              </div>

              {/* 1. Meta / Facebook Pixel */}
              <div className="bg-slate-800/60 p-5 rounded-3xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-extrabold text-blue-400">1. Multi Pixel Meta (Facebook Ads)</h4>
                  <span className="text-xs bg-blue-900/60 text-blue-200 px-2.5 py-0.5 rounded-full font-mono">
                    {tracking.metaPixelIds.length} ID • {tracking.metaHtmlSnippets.length} Snippet
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tambah ID Pixel Meta:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: 928374928172635"
                        value={metaPixelInput}
                        onChange={(e) => setMetaPixelInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                      <button
                        onClick={handleAddMetaPixel}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-xl text-xs font-bold"
                      >
                        + ID
                      </button>
                    </div>

                    <div className="mt-2 space-y-1">
                      {tracking.metaPixelIds.map((id, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/80 px-3 py-1.5 rounded-lg text-xs font-mono">
                          <span>{id}</span>
                          <button
                            onClick={() => {
                              const updated = { ...tracking, metaPixelIds: tracking.metaPixelIds.filter((_, idx) => idx !== i) };
                              onUpdateTracking(updated);
                              saveStoredTracking(updated);
                            }}
                            className="text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tambah HTML Pixel Snippet (Lengkap):</label>
                    <textarea
                      rows={3}
                      placeholder="<!-- Paste kode <script> Meta Pixel di sini -->"
                      value={metaSnippetInput}
                      onChange={(e) => setMetaSnippetInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                    />
                    <button
                      onClick={handleAddMetaSnippet}
                      className="mt-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                    >
                      + Pasang HTML Snippet Meta
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Google Pixel & Ads */}
              <div className="bg-slate-800/60 p-5 rounded-3xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-extrabold text-amber-400">2. Multi Pixel Google Ads (gtag.js)</h4>
                  <span className="text-xs bg-amber-900/60 text-amber-200 px-2.5 py-0.5 rounded-full font-mono">
                    {tracking.googlePixelIds.length} ID • {tracking.googleHtmlSnippets.length} Snippet
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tambah Google Ads ID:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: AW-11928374829"
                        value={googlePixelInput}
                        onChange={(e) => setGooglePixelInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                      <button
                        onClick={handleAddGooglePixel}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded-xl text-xs font-bold"
                      >
                        + ID
                      </button>
                    </div>

                    <div className="mt-2 space-y-1">
                      {tracking.googlePixelIds.map((id, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/80 px-3 py-1.5 rounded-lg text-xs font-mono">
                          <span>{id}</span>
                          <button
                            onClick={() => {
                              const updated = { ...tracking, googlePixelIds: tracking.googlePixelIds.filter((_, idx) => idx !== i) };
                              onUpdateTracking(updated);
                              saveStoredTracking(updated);
                            }}
                            className="text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tambah HTML Snippet Google:</label>
                    <textarea
                      rows={3}
                      placeholder="<!-- Paste kode <script> Google Ads di sini -->"
                      value={googleSnippetInput}
                      onChange={(e) => setGoogleSnippetInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                    />
                    <button
                      onClick={handleAddGoogleSnippet}
                      className="mt-1 bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                    >
                      + Pasang HTML Google
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. TikTok Pixel */}
              <div className="bg-slate-800/60 p-5 rounded-3xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-extrabold text-pink-400">3. Multi Pixel TikTok</h4>
                  <span className="text-xs bg-pink-900/60 text-pink-200 px-2.5 py-0.5 rounded-full font-mono">
                    {tracking.tiktokPixelIds.length} ID
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tambah TikTok Pixel ID:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: C9K12L8MN4OPQ5R"
                        value={tiktokPixelInput}
                        onChange={(e) => setTiktokPixelInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                      <button
                        onClick={handleAddTiktokPixel}
                        className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-2 rounded-xl text-xs font-bold"
                      >
                        + ID
                      </button>
                    </div>

                    <div className="mt-2 space-y-1">
                      {tracking.tiktokPixelIds.map((id, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/80 px-3 py-1.5 rounded-lg text-xs font-mono">
                          <span>{id}</span>
                          <button
                            onClick={() => {
                              const updated = { ...tracking, tiktokPixelIds: tracking.tiktokPixelIds.filter((_, idx) => idx !== i) };
                              onUpdateTracking(updated);
                              saveStoredTracking(updated);
                            }}
                            className="text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tambah HTML Snippet TikTok:</label>
                    <textarea
                      rows={3}
                      placeholder="<!-- Paste kode <script> TikTok Pixel di sini -->"
                      value={tiktokSnippetInput}
                      onChange={(e) => setTiktokSnippetInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                    />
                    <button
                      onClick={handleAddTiktokSnippet}
                      className="mt-1 bg-pink-600 hover:bg-pink-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                    >
                      + Pasang HTML TikTok
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Google Tag Manager & Google Analytics */}
              <div className="bg-slate-800/60 p-5 rounded-3xl border border-slate-700 space-y-4">
                <h4 className="text-lg font-extrabold text-teal-400">4. Google Tag Manager (GTM) & Google Analytics 4 (GA4)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* GTM */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">GTM Container ID:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: GTM-HIOMEGA01"
                        value={gtmIdInput}
                        onChange={(e) => setGtmIdInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                      <button onClick={handleAddGtmId} className="bg-teal-600 hover:bg-teal-500 px-3 py-2 rounded-xl text-xs font-bold">
                        + GTM
                      </button>
                    </div>
                    <div className="mt-2 space-y-1">
                      {tracking.gtmIds.map((id, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/80 px-3 py-1.5 rounded-lg text-xs font-mono">
                          <span>{id}</span>
                          <button
                            onClick={() => {
                              const updated = { ...tracking, gtmIds: tracking.gtmIds.filter((_, idx) => idx !== i) };
                              onUpdateTracking(updated);
                              saveStoredTracking(updated);
                            }}
                            className="text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GA4 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">GA4 Measurement ID:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: G-HIOMEGA999"
                        value={gaIdInput}
                        onChange={(e) => setGaIdInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                      <button onClick={handleAddGaId} className="bg-teal-600 hover:bg-teal-500 px-3 py-2 rounded-xl text-xs font-bold">
                        + GA4
                      </button>
                    </div>
                    <div className="mt-2 space-y-1">
                      {tracking.gaIds.map((id, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/80 px-3 py-1.5 rounded-lg text-xs font-mono">
                          <span>{id}</span>
                          <button
                            onClick={() => {
                              const updated = { ...tracking, gaIds: tracking.gaIds.filter((_, idx) => idx !== i) };
                              onUpdateTracking(updated);
                              saveStoredTracking(updated);
                            }}
                            className="text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEO PAGE GENERATOR */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Fitur SEO Page Generator</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Atur metadata mesin pencari Google, OpenGraph kartu sosial, dan Schema.org JSON-LD otomatis.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Judul Halaman (Meta Title):</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Mesin Pencari (Meta Description):</label>
                  <textarea
                    rows={3}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kata Kunci Sasaran (Target Keywords):</label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Schema Markup (JSON-LD):</label>
                  <textarea
                    rows={6}
                    value={seoSchema}
                    onChange={(e) => setSeoSchema(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 font-mono text-xs text-emerald-300"
                  />
                </div>

                <button
                  onClick={handleSaveGeneralSettings}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Konfigurasi SEO
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: MEMBERS & LEADERBOARD */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white">Manajemen Member & Leaderboard Affiliate</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Syarat pendaftaran member resmi: Min. order 5 pcs (Rp 350.000). Verifikasi status & pantau leaderboard penjualan.
                  </p>
                </div>
              </div>

              {/* Leaderboard Table */}
              <div className="bg-slate-800/80 rounded-3xl border border-slate-700 p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Trophy className="w-5 h-5" />
                  <h4 className="text-lg font-black text-white">Leaderboard Penjualan Affiliate Teratas</h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 uppercase font-black">
                      <tr>
                        <th className="p-3">Rank</th>
                        <th className="p-3">Nama Member</th>
                        <th className="p-3">Username / Link</th>
                        <th className="p-3">Password Akses</th>
                        <th className="p-3">Total Botol Terjual</th>
                        <th className="p-3">Total Komisi</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 font-medium">
                      {[...members]
                        .sort((a, b) => b.totalSoldPcs - a.totalSoldPcs)
                        .map((mem, idx) => {
                          const cleanPhone = mem.whatsapp.replace(/[^0-9]/g, '');
                          const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

                          return (
                            <tr key={mem.id} className="hover:bg-slate-700/30">
                              <td className="p-3 font-black text-sm">
                                {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                              </td>
                              <td className="p-3">
                                <div className="font-bold text-white text-sm">{mem.fullName}</div>
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                                  <span>{mem.whatsapp}</span>
                                  <a
                                    href={`https://wa.me/${waPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 font-bold underline flex items-center gap-0.5"
                                  >
                                    <MessageCircle className="w-3 h-3" /> WA
                                  </a>
                                </div>
                              </td>
                              <td className="p-3 font-mono text-emerald-400">
                                <div>@{mem.username}</div>
                                <div className="text-[10px] text-slate-400">?ref={mem.customSlug}</div>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-700/80 w-fit">
                                  <Key className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
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
                                    Ubah
                                  </button>
                                </div>
                              </td>
                              <td className="p-3 font-black text-amber-400 text-sm">{mem.totalSoldPcs} Pcs</td>
                              <td className="p-3 font-black text-emerald-400 text-sm">
                                Rp {mem.totalCommissionRp.toLocaleString('id-ID')}
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                                  mem.status === 'active' ? 'bg-emerald-900/60 text-emerald-300' :
                                  mem.status === 'pending' ? 'bg-amber-900/60 text-amber-300' :
                                  'bg-rose-900/60 text-rose-300'
                                }`}>
                                  {mem.status}
                                </span>
                              </td>
                              <td className="p-3 text-right space-x-1">
                                {mem.status !== 'active' && (
                                  <button
                                    onClick={() => handleToggleMemberStatus(mem.id, 'active')}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
                                  >
                                    Aktifkan
                                  </button>
                                )}
                                {mem.status === 'active' && (
                                  <button
                                    onClick={() => handleToggleMemberStatus(mem.id, 'suspended')}
                                    className="bg-rose-600/80 hover:bg-rose-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
                                  >
                                    Nonaktifkan
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PENARIKAN KOMISI (SYNC SUPER ADMIN & MEMBER) */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-black text-white">Manajemen Pengajuan Penarikan Komisi Member</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Verifikasi, setujui, dan catat bukti transfer pencairan komisi penjualan member / affiliate.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-400">Filter:</span>
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((flt) => (
                    <button
                      key={flt}
                      onClick={() => setWithdrawalFilter(flt)}
                      className={`text-xs font-black px-3 py-1.5 rounded-xl transition cursor-pointer capitalize ${
                        withdrawalFilter === flt
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {flt === 'all' ? 'Semua' : flt === 'pending' ? 'Menunggu Transfer' : flt === 'approved' ? 'Sudah Ditransfer' : 'Ditolak'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Total Ditransfer (Approved)</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    Rp {withdrawals.filter(w => w.status === 'approved').reduce((sum, w) => sum + w.amount, 0).toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {withdrawals.filter(w => w.status === 'approved').length} penarikan sukses
                  </div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-amber-600/50">
                  <div className="text-xs text-amber-300 font-bold uppercase">Menunggu Transfer (Pending)</div>
                  <div className="text-2xl font-black text-amber-300 mt-1">
                    Rp {withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0).toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {withdrawals.filter(w => w.status === 'pending').length} pengajuan belum diproses
                  </div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Total Semua Pengajuan</div>
                  <div className="text-2xl font-black text-white mt-1">
                    {withdrawals.length} Pengajuan
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Seluruh riwayat penarikan affiliate</div>
                </div>
              </div>

              {/* Withdrawals list */}
              {withdrawals.filter(w => {
                if (withdrawalFilter === 'pending') return w.status === 'pending';
                if (withdrawalFilter === 'approved') return w.status === 'approved';
                if (withdrawalFilter === 'rejected') return w.status === 'rejected';
                return true;
              }).length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-3xl border border-slate-800">
                  <Wallet className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-base font-bold">Tidak ada data pengajuan penarikan komisi pada filter ini.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {withdrawals
                    .filter(w => {
                      if (withdrawalFilter === 'pending') return w.status === 'pending';
                      if (withdrawalFilter === 'approved') return w.status === 'approved';
                      if (withdrawalFilter === 'rejected') return w.status === 'rejected';
                      return true;
                    })
                    .map((wd) => {
                      const cleanPhone = wd.memberWhatsapp.replace(/[^0-9]/g, '');
                      const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
                      const isPending = wd.status === 'pending';

                      return (
                        <div
                          key={wd.id}
                          className={`bg-slate-800/90 p-5 rounded-2xl border space-y-3 shadow-md ${
                            isPending ? 'border-amber-500/80 bg-slate-800' : 'border-slate-700'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-2.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-sm sm:text-base font-black text-emerald-400">#{wd.id}</span>
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
                                <strong className="text-emerald-300 font-mono">{wd.memberWhatsapp}</strong>
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
                                <div className="text-[11px] bg-slate-900/70 p-2 rounded-lg border border-slate-700 text-emerald-300 font-bold">
                                  <span>Catatan Transfer: </span>
                                  <span>{wd.adminNotes}</span>
                                  {wd.processedAt && (
                                    <span className="text-[10px] text-slate-400 block font-normal mt-0.5">
                                      Diproses: {new Date(wd.processedAt).toLocaleString('id-ID')}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-end gap-2">
                            {isPending ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleRejectWithdrawal(wd.id)}
                                  className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white text-xs font-black rounded-xl transition cursor-pointer flex items-center gap-1"
                                >
                                  <X className="w-3.5 h-3.5" /> Tolak
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleApproveWithdrawal(wd.id)}
                                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition shadow-md cursor-pointer flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" /> Konfirmasi Transfer (Approve)
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleApproveWithdrawal(wd.id)}
                                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
                              >
                                Edit Catatan / No. Ref
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: THEME & COLOR */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Fitur Pergantian Tema Warna Tampilan</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Kustomisasi warna nuansa landing page untuk kenyamanan visual pengunjung website.
                </p>
              </div>

              {/* Color themes */}
              <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-4">
                <h4 className="text-lg font-black text-white">Pilihan Tema Warna Landing Page:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { id: 'emerald', name: 'Emerald Natural', colorClass: 'bg-emerald-700' },
                    { id: 'ocean', name: 'Deep Ocean Blue', colorClass: 'bg-teal-700' },
                    { id: 'gold', name: 'Royal Gold Luxury', colorClass: 'bg-amber-700' },
                    { id: 'herbal', name: 'Fresh Herbal Glow', colorClass: 'bg-green-700' }
                  ].map((thm) => (
                    <button
                      key={thm.id}
                      onClick={() => setTheme(thm.id as ColorTheme)}
                      className={`p-4 rounded-2xl border-2 text-center transition flex flex-col items-center gap-2 ${
                        theme === thm.id ? 'border-emerald-400 bg-slate-700' : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full ${thm.colorClass} shadow-md`} />
                      <span className="text-xs font-bold text-white">{thm.name}</span>
                    </button>
                  ))}
                </div>
              </div>



              {/* Language Settings */}
              <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-4">
                <h4 className="text-lg font-black text-white">Pengaturan Bahasa Website:</h4>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="lang"
                      checked={lang === 'id'}
                      onChange={() => setLang('id')}
                      className="accent-emerald-500 w-4 h-4"
                    />
                    <span className="text-sm font-bold text-white">Bahasa Indonesia (Utama)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="lang"
                      checked={lang === 'en'}
                      onChange={() => setLang('en')}
                      className="accent-emerald-500 w-4 h-4"
                    />
                    <span className="text-sm font-bold text-white">English (International)</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveGeneralSettings}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan Perubahan Tema & Musik
              </button>
            </div>
          )}

          {/* TAB 6: IMAGES REPLACEMENT */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Fitur Penggantian Gambar Website</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Ganti gambar Hero Banner, Gambar Produk Utama, Logo, dan Carousel sesuai flyer promosi terkini.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">URL Logo Custom (Kosongkan jika menggunakan Logo HIOMEGA SVG Asli):</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">URL Gambar Produk Utama (Kapsul Sacha Inchi + VCO):</label>
                  <input
                    type="text"
                    value={productMainUrl}
                    onChange={(e) => setProductMainUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">URL Banner Hero:</label>
                  <input
                    type="text"
                    value={heroBannerUrl}
                    onChange={(e) => setHeroBannerUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tambah Gambar Carousel / Galeri:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={newCarouselImg}
                      onChange={(e) => setNewCarouselImg(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newCarouselImg.trim()) {
                          setCarouselList([...carouselList, newCarouselImg.trim()]);
                          setNewCarouselImg('');
                        }
                      }}
                      className="bg-emerald-600 px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      + Tambah
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {carouselList.map((url, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-700 h-20">
                        <img src={url} alt="Carousel" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setCarouselList(carouselList.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-rose-600 p-1 rounded-full text-white"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSaveGeneralSettings}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Gambar Website
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: PRODUCTS & STOCK */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Kelola Produk, Harga & Ketersediaan Stok</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Atur stok botol dan harga resmi HI-OMEGA.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="bg-slate-800/80 p-5 rounded-3xl border border-slate-700 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold text-white text-base leading-snug">{p.name}</h4>
                        <div className="text-xs text-slate-400">{p.pillCount} Kapsul • {p.weightGrams}g (@75g/botol)</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Stok Botol:</label>
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => handleUpdateProductStock(p.id, parseInt(e.target.value) || 0, p.retailPrice)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-black text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Harga Jual (Rp):</label>
                        <input
                          type="number"
                          value={p.retailPrice}
                          onChange={(e) => handleUpdateProductStock(p.id, p.stock, parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-black text-emerald-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CUSTOMER ORDERS (SYNC DENGAN WEB & MEMBER INPUT) */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-black text-white">Daftar Transaksi & Pesanan Masuk</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Pesanan dari form website dan input manual member affiliate langsung terekam otomatis dan tersinkronisasi.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-400">Sumber:</span>
                  {(['all', 'web', 'member'] as const).map((flt) => {
                    const count = flt === 'all' ? orders.length :
                                  flt === 'web' ? orders.filter(o => o.source !== 'member_input').length :
                                  orders.filter(o => o.source === 'member_input').length;
                    return (
                      <button
                        key={flt}
                        onClick={() => setOrderFilter(flt)}
                        className={`text-xs font-black px-3 py-1.5 rounded-xl transition cursor-pointer capitalize ${
                          orderFilter === flt
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {flt === 'all' ? 'Semua' : flt === 'web' ? 'Form Web' : 'Input Member'} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {orders
                .filter(o => {
                  if (orderFilter === 'web') return o.source !== 'member_input';
                  if (orderFilter === 'member') return o.source === 'member_input';
                  return true;
                }).length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-3xl border border-slate-800">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-base font-bold">Tidak ada pesanan masuk pada filter ini.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders
                    .filter(o => {
                      if (orderFilter === 'web') return o.source !== 'member_input';
                      if (orderFilter === 'member') return o.source === 'member_input';
                      return true;
                    })
                    .map((ord) => {
                      const cleanPhone = ord.customerWhatsapp.replace(/[^0-9]/g, '');
                      const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
                      const isMemberInput = ord.source === 'member_input';

                      return (
                        <div key={ord.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3 shadow-md">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-emerald-400 font-black">#{ord.id}</span>
                              <span className="text-xs text-slate-400">
                                ({new Date(ord.createdAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })})
                              </span>
                              {isMemberInput && (
                                <span className="bg-teal-950 text-teal-300 border border-teal-600/80 px-2 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                                  <Users className="w-3 h-3" /> Input Member: @{ord.affiliateRef || 'member'}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-full font-bold">
                                Kurir: {ord.courier}
                              </span>
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-black uppercase ${
                                ord.status === 'pending'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-600/80' :
                                ord.status === 'delivered'
                                  ? 'bg-emerald-900 text-emerald-300 border border-emerald-600/80' :
                                ord.status === 'cancelled'
                                  ? 'bg-rose-900 text-rose-300 border border-rose-600/80' :
                                  'bg-teal-900 text-teal-300 border border-teal-600/80'
                              }`}>
                                {ord.status === 'pending' ? 'Belum Bayar (Menunggu Transfer)' :
                                 ord.status === 'delivered' ? 'Selesai / Terkirim' :
                                 ord.status === 'shipped' ? 'Sedang Dikirim' :
                                 ord.status === 'processing' ? 'Diproses' :
                                 'Dibatalkan'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <span className="text-slate-400 block font-bold">Penerima & Kontak:</span>
                              <div className="font-bold text-white text-sm mt-0.5">{ord.customerName}</div>
                              <div className="flex items-center gap-2 text-slate-300 mt-0.5">
                                <span className="font-mono text-teal-300 font-bold">{ord.customerWhatsapp}</span>
                                <a
                                  href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                                    `Halo Kak ${ord.customerName}, kami dari Super Admin HI-OMEGA terkait pesanan #${ord.id}...`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 text-[10px] font-black underline flex items-center gap-0.5"
                                >
                                  <MessageCircle className="w-3 h-3" /> Chat WA
                                </a>
                              </div>
                            </div>

                            <div>
                              <span className="text-slate-400 block font-bold">Alamat Pengiriman:</span>
                              <span className="text-slate-200 block mt-0.5 leading-snug">
                                {ord.addressDetails}, {ord.destinationCity}, {ord.destinationProvince}
                              </span>
                            </div>

                            <div>
                              <span className="text-slate-400 block font-bold">Total Pembayaran:</span>
                              <span className="font-black text-emerald-400 text-base block mt-0.5">
                                Rp {ord.grandTotal.toLocaleString('id-ID')}
                              </span>
                              <span className="text-[11px] text-slate-400 block">
                                (Ongkir: Rp {ord.shippingCost.toLocaleString('id-ID')})
                              </span>
                            </div>
                          </div>

                          {/* Items and notes */}
                          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60 text-xs">
                            <span className="text-slate-400 font-bold block mb-1">Rincian Paket Produk:</span>
                            <div className="space-y-1">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex justify-between text-slate-200">
                                  <span>✓ {it.productName} ({it.qty} Paket)</span>
                                  <span className="font-bold text-white">Rp {it.totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                              ))}
                            </div>
                            {ord.notes && (
                              <div className="mt-2 pt-1.5 border-t border-slate-800 text-[11px] text-amber-300/90">
                                <span className="font-bold text-slate-400">Catatan: </span>
                                <em>{ord.notes}</em>
                              </div>
                            )}
                          </div>

                          {/* Affiliate Info & Status Changer */}
                          <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              {ord.affiliateRef ? (
                                <span className="text-xs text-amber-300 font-medium">
                                  Ref Affiliate: <strong>@{ord.affiliateRef}</strong> • Komisi: <strong className="text-emerald-300">Rp {ord.affiliateProfit?.toLocaleString('id-ID') || '0'}</strong>
                                </span>
                              ) : (
                                <span className="text-xs text-slate-500">
                                  Pesanan Langsung via Website Pusat
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400">Ubah Status:</span>
                              <select
                                value={ord.status}
                                onChange={(e) => handleOrderStatus(ord.id, e.target.value as CustomerOrder['status'])}
                                className="bg-slate-900 border border-slate-700 text-xs font-black rounded-xl px-3 py-1.5 text-white focus:outline-none cursor-pointer"
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

          {/* TAB 9: SECURITY & TOGGLES */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Keamanan & Kontrol Fitur</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Kontrol ON/OFF fitur pendaftaran member, nomor CS WhatsApp resmi, dan verifikasi CAPTCHA anti-bot.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <h4 className="font-bold text-white text-base">Fitur Pendaftaran Member Baru:</h4>
                    <p className="text-xs text-slate-400">Aktifkan atau nonaktifkan form registrasi kemitraan affiliate</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={memberRegEnabled}
                      onChange={(e) => setMemberRegEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <h4 className="font-bold text-white text-base">Human Verification (Captcha Anti-Bot):</h4>
                    <p className="text-xs text-slate-400">Cegah orderan spam atau bot pada formulir pemesanan online</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={captchaEnabled}
                      onChange={(e) => setCaptchaEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nomor WhatsApp CS Resmi HI-OMEGA:</label>
                  <input
                    type="text"
                    value={csPhone}
                    onChange={(e) => setCsPhone(e.target.value)}
                    className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Nomor ini menjadi tujuan default tombol WhatsApp di seluruh website.</span>
                </div>

                <button
                  onClick={handleSaveGeneralSettings}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          )}

          {/* TAB: CEK ONGKOS KIRIM (ASAL SIDOARJO) */}
          {activeTab === 'shipping' && (
            <ShippingEstimator isDashboard />
          )}
        </div>
      </div>

      {/* MEMBER PASSWORD EDIT MODAL (SUPER ADMIN BISA MERUBAH PASSWORD MEMBER) */}
      {editingPasswordMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-black text-white">Ubah Password Akses Member</h4>
              </div>
              <button
                type="button"
                onClick={() => setEditingPasswordMember(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300">
              Ubah password login untuk member <strong>{editingPasswordMember.fullName}</strong> (@{editingPasswordMember.username}).
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
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-white focus:outline-none"
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
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs transition shadow-md cursor-pointer"
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
