import React, { useState } from 'react';
import { ProductItem, Member, CustomerOrder, SiteSettings } from '../../types';
import { saveStoredProducts, saveStoredMembers, saveStoredSettings } from '../../utils/storage';
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
  Truck
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
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'stock' | 'members' | 'images' | 'orders' | 'shipping'>('stock');
  const [notification, setNotification] = useState<string>('');

  const [heroBannerUrl, setHeroBannerUrl] = useState(settings.images.heroBannerUrl);
  const [productMainUrl, setProductMainUrl] = useState(settings.images.productMainUrl);

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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Navbar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center font-black text-white shadow-md">
            AD
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Panel Operasional Admin1 HI-OMEGA</h2>
            <p className="text-xs text-teal-400">Pengelolaan Stok, Approval Member, Cek Ongkir & Pesanan</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {notification && (
            <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 px-3 py-1 rounded-xl text-xs font-bold animate-pulse">
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

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-1.5 flex-shrink-0">
          <button
            onClick={() => setActiveTab('stock')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'stock' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Ketersediaan Stok & Harga</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'members' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>List & Approval Member</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'shipping' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Cek Ongkos Kirim (Sidoarjo)</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'images' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Atur Gambar Website</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'orders' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Daftar Pesanan ({orders.length})</span>
          </button>
        </div>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-900 text-white">
          {/* TAB 1: STOCK */}
          {activeTab === 'stock' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Kelola Ketersediaan Stok & Harga Jual</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Atur stok fisik di gudang Sidoarjo dan patokan harga jual resmi website.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map((item) => (
                  <div key={item.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-contain bg-slate-900 p-1 border border-slate-700" />
                      <div>
                        <h4 className="font-extrabold text-base text-white">{item.name}</h4>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Isi: {item.pillCount} Kapsul • Berat: {item.weightGrams}g
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Stok Botol:</label>
                        <input
                          type="number"
                          defaultValue={item.stock}
                          id={`stock-${item.id}`}
                          className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white text-center font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Harga Jual (Rp):</label>
                        <input
                          type="number"
                          defaultValue={item.retailPrice}
                          id={`price-${item.id}`}
                          className="w-32 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white text-center font-bold"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const s = parseInt((document.getElementById(`stock-${item.id}`) as HTMLInputElement)?.value) || item.stock;
                          const p = parseInt((document.getElementById(`price-${item.id}`) as HTMLInputElement)?.value) || item.retailPrice;
                          handleStockChange(item.id, s, p);
                        }}
                        className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 mt-4"
                      >
                        <Save className="w-3.5 h-3.5" /> Simpan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MEMBERS */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">List Member & Status Kemitraan</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Verifikasi syarat member minimum 5 botol (Rp 350.000) dan aktifkan akses landing page mereka.
                </p>
              </div>

              <div className="space-y-3">
                {members.map((mem) => (
                  <div key={mem.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-base">{mem.fullName}</span>
                        <span className="text-xs text-teal-400 font-mono">(@{mem.username})</span>
                        <span className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-full ${
                          mem.status === 'active' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                        }`}>
                          {mem.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        WA: {mem.whatsapp} {mem.city ? `• Kota: ${mem.city}` : ''} • Terjual: {mem.totalSoldPcs} Botol • Komisi: Rp {mem.totalCommissionRp.toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMemberStatus(mem.id, 'active')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve Aktif
                      </button>
                      <button
                        onClick={() => handleMemberStatus(mem.id, 'suspended')}
                        className="bg-rose-700 hover:bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Suspend
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SHIPPING (CEK ONGKIR DARI SIDOARJO) */}
          {activeTab === 'shipping' && (
            <ShippingEstimator isDashboard />
          )}

          {/* TAB 4: IMAGES */}
          {activeTab === 'images' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-2xl font-black text-white">Ganti Gambar Produk & Banner</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Perbarui URL gambar produk utama atau banner website.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">URL Gambar Produk Utama:</label>
                  <input
                    type="text"
                    value={productMainUrl}
                    onChange={(e) => setProductMainUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <button
                  onClick={handleSaveImages}
                  className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Perubahan Gambar
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Daftar Transaksi Pesanan Pelanggan</h3>

              {orders.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-3xl border border-slate-800">
                  Belum ada pesanan masuk saat ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-2">
                        <span className="font-mono text-teal-400 font-bold">#{ord.id}</span>
                        <span className="text-xs bg-teal-900 text-teal-200 px-2.5 py-0.5 rounded-full font-bold">
                          {ord.courier} • Rp {ord.grandTotal.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div><strong>Penerima:</strong> {ord.customerName} ({ord.customerWhatsapp})</div>
                        <div><strong>Alamat:</strong> {ord.addressDetails}, {ord.destinationCity}, {ord.destinationProvince}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
