import React, { useState, useEffect } from 'react';
import { ShoppingBag, UserCheck, Award, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCT_REAL_IMAGE, BUNDLE_PACK_IMAGE } from '../../data/initialData';

interface ActivityItem {
  id: number;
  name: string;
  city: string;
  action: string;
  highlight: string;
  amount?: string;
  timeAgo: string;
  type: 'order' | 'reseller' | 'affiliate' | 'reward';
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: 1,
    name: 'Ahmad',
    city: 'Surabaya',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: 'Baru saja',
    type: 'reseller'
  },
  {
    id: 2,
    name: 'Venny',
    city: 'Jakarta Barat',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '1 menit yang lalu',
    type: 'order'
  },
  {
    id: 3,
    name: 'Haris',
    city: 'Bandung',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '2 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 4,
    name: 'Naura',
    city: 'Medan',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '3 menit yang lalu',
    type: 'reward'
  },
  {
    id: 5,
    name: 'Bambang Supriyanto',
    city: 'Semarang',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '3 menit yang lalu',
    type: 'order'
  },
  {
    id: 6,
    name: 'Siti Rahmawati',
    city: 'Makassar',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '4 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 7,
    name: 'Hendra Gunawan',
    city: 'Yogyakarta',
    action: 'Baru Saja Membeli',
    highlight: 'Paket 1 Botol Hi-Omega',
    amount: 'Rp 100.000',
    timeAgo: '5 menit yang lalu',
    type: 'order'
  },
  {
    id: 8,
    name: 'Dewi Lestari',
    city: 'Palembang',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '6 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 9,
    name: 'Agus Santoso',
    city: 'Bekasi',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '7 menit yang lalu',
    type: 'order'
  },
  {
    id: 10,
    name: 'Rina Wulandari',
    city: 'Malang',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '8 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 11,
    name: 'Budi Darmawan',
    city: 'Tangerang',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '9 menit yang lalu',
    type: 'reward'
  },
  {
    id: 12,
    name: 'Fitri Handayani',
    city: 'Bogor',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '10 menit yang lalu',
    type: 'order'
  },
  {
    id: 13,
    name: 'Dian Pratama',
    city: 'Surakarta (Solo)',
    action: 'Baru Saja Membeli',
    highlight: 'Paket 1 Botol Hi-Omega',
    amount: 'Rp 100.000',
    timeAgo: '11 menit yang lalu',
    type: 'order'
  },
  {
    id: 14,
    name: 'Eko Wahyudi',
    city: 'Depok',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '12 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 15,
    name: 'Ratna Sari',
    city: 'Denpasar',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '13 menit yang lalu',
    type: 'order'
  },
  {
    id: 16,
    name: 'Aris Munandar',
    city: 'Pekanbaru',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '14 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 17,
    name: 'Nurul Hidayah',
    city: 'Banjarmasin',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '15 menit yang lalu',
    type: 'reward'
  },
  {
    id: 18,
    name: 'Faisal Basri',
    city: 'Padang',
    action: 'Baru Saja Membeli',
    highlight: 'Paket 1 Botol Hi-Omega',
    amount: 'Rp 100.000',
    timeAgo: '16 menit yang lalu',
    type: 'order'
  },
  {
    id: 19,
    name: 'Tri Wahyuni',
    city: 'Cimahi',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '17 menit yang lalu',
    type: 'order'
  },
  {
    id: 20,
    name: 'Kurniawan Hadi',
    city: 'Bandar Lampung',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '18 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 21,
    name: 'Maya Safitri',
    city: 'Samarinda',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '19 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 22,
    name: 'Joko Susilo',
    city: 'Kediri',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '20 menit yang lalu',
    type: 'order'
  },
  {
    id: 23,
    name: 'Sri Mulyani',
    city: 'Cirebon',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '21 menit yang lalu',
    type: 'reward'
  },
  {
    id: 24,
    name: 'Rudi Hartono',
    city: 'Pontianak',
    action: 'Baru Saja Membeli',
    highlight: 'Paket 1 Botol Hi-Omega',
    amount: 'Rp 100.000',
    timeAgo: '22 menit yang lalu',
    type: 'order'
  },
  {
    id: 25,
    name: 'Endang Purwanti',
    city: 'Jember',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '23 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 26,
    name: 'Wahyu Nugroho',
    city: 'Balikpapan',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '24 menit yang lalu',
    type: 'order'
  },
  {
    id: 27,
    name: 'Indah Permatasari',
    city: 'Sukabumi',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '25 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 28,
    name: 'Bagus Setiawan',
    city: 'Tasikmalaya',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '26 menit yang lalu',
    type: 'order'
  },
  {
    id: 29,
    name: 'Kartika Sari',
    city: 'Mataram (Lombok)',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '27 menit yang lalu',
    type: 'reward'
  },
  {
    id: 30,
    name: 'Doni Firmansyah',
    city: 'Batam',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '28 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 31,
    name: 'Yuni Astuti',
    city: 'Magelang',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '29 menit yang lalu',
    type: 'order'
  },
  {
    id: 32,
    name: 'Teguh Prasetyo',
    city: 'Purwokerto',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '30 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 33,
    name: 'Lestari Ningsih',
    city: 'Madiun',
    action: 'Baru Saja Membeli',
    highlight: 'Paket 1 Botol Hi-Omega',
    amount: 'Rp 100.000',
    timeAgo: '31 menit yang lalu',
    type: 'order'
  },
  {
    id: 34,
    name: 'Rizal Fahmi',
    city: 'Pekalongan',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '32 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 35,
    name: 'Anisa Kusuma',
    city: 'Tegal',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '33 menit yang lalu',
    type: 'reward'
  },
  {
    id: 36,
    name: 'Lukman Hakim',
    city: 'Kudus',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '34 menit yang lalu',
    type: 'order'
  },
  {
    id: 37,
    name: 'Widya Utami',
    city: 'Salatiga',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '35 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 38,
    name: 'Gunawan Wibowo',
    city: 'Banyuwangi',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '36 menit yang lalu',
    type: 'order'
  },
  {
    id: 39,
    name: 'Mira Septiani',
    city: 'Palangkaraya',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '37 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 40,
    name: 'Zulfikar',
    city: 'Banda Aceh',
    action: 'Baru Saja Membeli',
    highlight: 'Paket 1 Botol Hi-Omega',
    amount: 'Rp 100.000',
    timeAgo: '38 menit yang lalu',
    type: 'order'
  },
  {
    id: 41,
    name: 'Hj. Fatimah',
    city: 'Gorontalo',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '39 menit yang lalu',
    type: 'order'
  },
  {
    id: 42,
    name: 'Syahrul Ramadhan',
    city: 'Manado',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '40 menit yang lalu',
    type: 'reward'
  },
  {
    id: 43,
    name: 'Dwi Rahayu',
    city: 'Pasuruan',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '41 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 44,
    name: 'Hadi Sucipto',
    city: 'Mojokerto',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '42 menit yang lalu',
    type: 'order'
  },
  {
    id: 45,
    name: 'Santi Novita',
    city: 'Jayapura',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '43 menit yang lalu',
    type: 'affiliate'
  },
  {
    id: 46,
    name: 'Kusuma Wardani',
    city: 'Ambon',
    action: 'Baru Saja Membeli',
    highlight: 'Paket 1 Botol Hi-Omega',
    amount: 'Rp 100.000',
    timeAgo: '44 menit yang lalu',
    type: 'order'
  },
  {
    id: 47,
    name: 'Heru Purnomo',
    city: 'Pangkal Pinang',
    action: 'Baru Saja Checkout',
    highlight: 'Paket Hemat 3 Botol',
    amount: 'Rp 300.000',
    timeAgo: '45 menit yang lalu',
    type: 'order'
  },
  {
    id: 48,
    name: 'Putri Handoko',
    city: 'Tarakan',
    action: 'Baru Saja Membeli',
    highlight: 'Paket Reseller 5 Botol',
    amount: 'Rp. 500.000',
    timeAgo: '46 menit yang lalu',
    type: 'reseller'
  },
  {
    id: 49,
    name: 'Farhan Maulana',
    city: 'Kupang',
    action: 'Baru Mendapatkan',
    highlight: 'Bonus Reward Penjualan Tertinggi Minggu Ini',
    timeAgo: '47 menit yang lalu',
    type: 'reward'
  },
  {
    id: 50,
    name: 'Nur Aini',
    city: 'Kendari',
    action: 'Baru Saja Bergabung Menjadi',
    highlight: 'Affiliate Resmi Hi-Omega',
    timeAgo: '48 menit yang lalu',
    type: 'affiliate'
  }
];

export const LiveActivityFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Initial delay before first toast popup
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    // Show for 5 seconds, hide for 3 seconds, then show next
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    } else {
      const showTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setIsVisible(true);
      }, 3500);
      return () => clearTimeout(showTimer);
    }
  }, [isVisible, isDismissed]);

  if (isDismissed) return null;

  const current = ACTIVITIES[currentIndex];

  const getIcon = () => {
    switch (current.type) {
      case 'reseller':
        return <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />;
      case 'affiliate':
        return <UserCheck className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />;
      case 'reward':
        return <Award className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />;
      case 'order':
      default:
        return <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />;
    }
  };

  const getBadgeColor = () => {
    switch (current.type) {
      case 'reseller':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'affiliate':
        return 'bg-teal-50 text-teal-900 border-teal-300';
      case 'reward':
        return 'bg-purple-50 text-purple-900 border-purple-300';
      case 'order':
      default:
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
    }
  };

  return (
    <aside
      aria-label="Notifikasi Pembelian & Member Baru"
      className={`fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-40 max-w-[340px] sm:max-w-[380px] w-[90vw] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative bg-white/98 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-2xl border-2 border-emerald-400 hover:border-emerald-600 transition-all select-none">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-950 transition shadow cursor-pointer"
          title="Tutup Notifikasi"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="flex items-center gap-3">
          {/* Small Product / Package Thumbnail */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-sm">
            <img
              src={current.type === 'reseller' || current.type === 'reward' ? BUNDLE_PACK_IMAGE : PRODUCT_REAL_IMAGE}
              alt="HI-OMEGA"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-emerald-950/90 text-[7px] text-white font-black text-center py-0.2">
              RESMI
            </div>
          </div>

          {/* Activity Text Details - matches exact user format */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {current.name} <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">({current.city})</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold flex-shrink-0">
                {current.timeAgo}
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-700 mt-0.5 leading-snug">
              <span className="font-semibold">{current.action}</span>{' '}
              <strong className="text-slate-950 font-black">{current.highlight}</strong>
              {current.amount && (
                <span className="text-emerald-700 font-black ml-1">{current.amount}</span>
              )}
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full border ${getBadgeColor()}`}>
                {getIcon()}
                <span>Terverifikasi Sistem</span>
              </span>
              <span className="text-[9px] text-slate-400 flex items-center gap-0.5 font-bold">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
