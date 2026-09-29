import React, { useState } from 'react';
import { 
  SiteSettings, 
  TrackingPixels, 
  ProductItem, 
  Member, 
  CustomerOrder,
  ColorTheme,
  AppLanguage
} from '../../types';
import { 
  saveStoredSettings, 
  saveStoredTracking, 
  saveStoredProducts, 
  saveStoredMembers, 
  saveStoredOrders 
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
  Truck
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
    'overview' | 'tracking' | 'seo' | 'members' | 'theme' | 'images' | 'products' | 'orders' | 'security' | 'shipping'
  >('overview');

  const [notification, setNotification] = useState<string>('');

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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Navbar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-md">
            SA
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Panel SuperAdmin & Owner HI-OMEGA</h2>
            <p className="text-xs text-emerald-400">Hak Akses Penuh: Multi-Pixel, Tema, SEO, Member & Stok</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {notification && (
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold animate-pulse">
              ✓ {notification}
            </span>
          )}
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <X className="w-4 h-4" /> Tutup Panel
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ringkasan & Metrik</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'tracking' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Multi-Pixel & HTML Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'seo' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>SEO Page Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'members' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Member & Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'theme' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Tema Warna & Desain</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'images' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Penggantian Gambar Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'products' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Kelola Produk & Stok</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'orders' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Daftar Pesanan Masuk ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'shipping' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Cek Ongkos Kirim (Sidoarjo)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'security' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Keamanan & On/Off Fitur</span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="flex-1 bg-slate-900 p-6 overflow-y-auto text-slate-100">
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
                        <th className="p-3">Total Botol Terjual</th>
                        <th className="p-3">Total Komisi</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 font-medium">
                      {[...members]
                        .sort((a, b) => b.totalSoldPcs - a.totalSoldPcs)
                        .map((mem, idx) => (
                          <tr key={mem.id} className="hover:bg-slate-700/30">
                            <td className="p-3 font-black text-sm">
                              {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                            </td>
                            <td className="p-3 font-bold text-white">{mem.fullName}</td>
                            <td className="p-3 font-mono text-emerald-400">?ref={mem.customSlug}</td>
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
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold"
                                >
                                  Aktifkan (Verifikasi 5 Pcs)
                                </button>
                              )}
                              {mem.status === 'active' && (
                                <button
                                  onClick={() => handleToggleMemberStatus(mem.id, 'suspended')}
                                  className="bg-rose-600/80 hover:bg-rose-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold"
                                >
                                  Nonaktifkan
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
                        <div className="text-xs text-slate-400">{p.pillCount} Kapsul • {p.weightGrams} gram</div>
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

          {/* TAB 8: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white">Daftar Transaksi & Pesanan Masuk</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Pesanan dari form website langsung terekam dan bisa dipantau status ekspedisinya.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-3xl border border-slate-800">
                  Belum ada pesanan masuk. Pesanan pelanggan melalui form online akan tampil di sini.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-400 font-black">#{ord.id}</span>
                          <span className="text-xs text-slate-400">({new Date(ord.createdAt).toLocaleDateString('id-ID')})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-full font-bold">
                            Kurir: {ord.courier}
                          </span>
                          <span className="text-xs bg-emerald-900 text-emerald-300 px-2.5 py-0.5 rounded-full font-black uppercase">
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400 block">Penerima:</span>
                          <span className="font-bold text-white">{ord.customerName} ({ord.customerWhatsapp})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Tujuan:</span>
                          <span className="text-slate-200">{ord.destinationCity}, {ord.destinationProvince}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Total Tagihan:</span>
                          <span className="font-black text-emerald-400 text-sm">
                            Rp {ord.grandTotal.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {ord.affiliateRef && (
                        <div className="text-xs text-amber-300 font-medium">
                          Ref Affiliate: <strong>@{ord.affiliateRef}</strong> (Komisi: Rp {ord.affiliateProfit?.toLocaleString('id-ID')})
                        </div>
                      )}
                    </div>
                  ))}
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
    </div>
  );
};
