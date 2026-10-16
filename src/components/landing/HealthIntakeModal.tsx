import React from 'react';
import { SymptomCategory, SiteSettings, Member } from '../../types';
import { 
  Heart, 
  Activity, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Droplets,
  Brain,
  Wind,
  CheckCircle2,
  ChevronRight,
  Stethoscope,
  MessageCircle,
  X
} from 'lucide-react';

interface HealthIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComplaint: (category: SymptomCategory) => void;
  selectedComplaint?: SymptomCategory;
  settings?: SiteSettings;
  activeAffiliate?: Member | null;
}

interface ComplaintOption {
  id: SymptomCategory;
  name: string;
  badge: string;
  description: string;
  keySigns: string[];
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  recommendedPackage: string;
}

const COMPLAINT_OPTIONS: ComplaintOption[] = [
  {
    id: 'sendi_tulang',
    name: 'Asam Urat & Nyeri Sendi',
    badge: 'Sering Dikeluhkan Usia 40+',
    description: 'Nyeri menusuk di persendian kaki, lutut linu kaku, pinggang pegal saat bangun tidur atau sholat.',
    keySigns: ['Lutut susah ditekuk / berbunyi', 'Jempol kaki bengkak & panas', 'Kadar asam urat / purin tinggi'],
    icon: Flame,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    recommendedPackage: 'Paket Family (3 Botol)'
  },
  {
    id: 'kolesterol',
    name: 'Kolesterol Tinggi & Trigliserida',
    badge: 'Bahaya Plak Arteri',
    description: 'Pundak dan leher belakang terasa tegang kaku, dada berat, darah kental, dan tubuh cepat lelah.',
    keySigns: ['Tengkuk leher kaku berat', 'Kesemutan di ujung jari', 'Kadar LDL & Trigliserida tinggi'],
    icon: Activity,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    recommendedPackage: 'Paket Family (3 Botol)'
  },
  {
    id: 'hipertensi',
    name: 'Hipertensi (Tekanan Darah Tinggi)',
    badge: 'Cegah Risiko Stroke',
    description: 'Kepala pusing berdenyut, tensi sering melonjak di atas 140/90, telinga berdenging, dan dada berdebar.',
    keySigns: ['Pusing tegang bangun pagi', 'Tekanan darah di atas normal', 'Jantung mudah berdebar kencang'],
    icon: Heart,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    recommendedPackage: 'Paket Family (3 Botol)'
  },
  {
    id: 'jantung',
    name: 'Jantung & Penyumbatan Pembuluh',
    badge: 'Perlindungan Kardiovaskular',
    description: 'Dada kiri ngilu atau sesak, nafas terasa pendek, dan sirkulasi peredaran darah terasa tersumbat.',
    keySigns: ['Nafas gampang ngos-ngosan', 'Dada kiri terasa tertekan', 'Pembuluh darah mulai kaku'],
    icon: Heart,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    recommendedPackage: 'Paket Reseller (5 Botol)'
  },
  {
    id: 'diabetes',
    name: 'Gula Darah Tinggi (Diabetes)',
    badge: 'Stabilisasi Glukosa',
    description: 'Badan sering lemas loyo tanpa tenaga, sering haus dan kencing malam hari, luka lambat kering.',
    keySigns: ['Badan cepat lemas & ngantuk', 'Sering buang air kecil di malam hari', 'Kesemutan menahun di kaki'],
    icon: Droplets,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    recommendedPackage: 'Paket Family (3 Botol)'
  },
  {
    id: 'lambung',
    name: 'Asam Lambung, GERD & Pencernaan',
    badge: 'Formula Minyak Kelapa VCO',
    description: 'Ulu hati perih melilit, perut begah kembung, sering bersendawa asam, mual dan susah buang air besar.',
    keySigns: ['Perut begah & kembung', 'Perih panas di dada/tenggorokan', 'BAB keras tidak teratur'],
    icon: ShieldCheck,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    recommendedPackage: 'Paket Pribadi (1 Botol) / Paket Family (3 Botol)'
  },
  {
    id: 'stroke_otak',
    name: 'Stroke & Pemulihan Syaraf Otak',
    badge: 'Regenerasi Sel Saraf',
    description: 'Salah satu sisi tubuh kebas atau sulit digerakkan, bicara pelo, pemulihan gerak motorik pasca stroke.',
    keySigns: ['Tangan/kaki sering kebas lemah', 'Pernah ada penyumbatan di kepala', 'Daya ingat sering menurun'],
    icon: Brain,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    recommendedPackage: 'Paket Reseller (5 Botol)'
  },
  {
    id: 'pengentalan_darah',
    name: 'Pengentalan Darah',
    badge: 'Cegah Trombosis & Sumbatan',
    description: 'Darah kental menghambat suplai oksigen, sering kesemutan di ujung jari tangan/kaki, kepala berat, dan telapak dingin.',
    keySigns: ['Kesemutan menahun di tangan/kaki', 'Darah kental & D-Dimer tinggi', 'Kepala sering pusing berputar'],
    icon: Droplets,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
    recommendedPackage: 'Paket Family (3 Botol)'
  },
  {
    id: 'otak_anak',
    name: 'Kecerdasan Otak Anak',
    badge: 'DHA & EPA Murni',
    description: 'Optimalkan potensi IQ, daya tangkap, fokus belajar di kelas, daya ingat kuat, serta proteksi mata dari radiasi gadget.',
    keySigns: ['Anak sulit fokus & gampang terdistraksi', 'Mata cepat lelah akibat layar ponsel', '100% Nabati Bebas Merkuri Laut'],
    icon: Brain,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    recommendedPackage: 'Paket Pribadi (1 Botol) / Paket Family (3 Botol)'
  },
  {
    id: 'anxiety_depresi',
    name: 'Depresi & Anxiety (Kecemasan)',
    badge: 'Penenang Saraf & Mood',
    description: 'Sering cemas mendadak, panic attack, jantung berdebar, susah tidur nyenyak (insomnia), dan overthinking di malam hari.',
    keySigns: ['Jantung berdebar cemas mendadak', 'Insomnia & susah tidur nyenyak', 'Mood sering drop & overthinking'],
    icon: Heart,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    recommendedPackage: 'Paket Family (3 Botol)'
  },
  {
    id: 'autoimun',
    name: 'Auto Imun & Imunitas Tubuh',
    badge: 'Modulasi Sel Imun',
    description: 'Badan cepat lelah ekstrem (fatigue), radang sendi/kulit sensitif, perbaiki mikrobioma usus, dan seimbangkan respon imun.',
    keySigns: ['Lelah kronis berkepanjangan', 'Radang sendi & kulit sensitif', 'Menyeimbangkan sel imunitas alami'],
    icon: ShieldCheck,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
    recommendedPackage: 'Paket Family (3 Botol)'
  },
  {
    id: 'semua',
    name: 'Semua Khasiat (Superfood Sehari-hari)',
    badge: 'Nutrisi Keluarga Lengkap',
    description: 'Saya ingin memelihara daya tahan tubuh seluruh keluarga, menjaga kesehatan organ vital, dan mencegah sakit di masa tua.',
    keySigns: ['100% Herbal Alami BPOM', 'Asam Lemak Omega 3-6-9 + VCO', 'Aman dikonsumsi harian'],
    icon: Sparkles,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-800',
    recommendedPackage: 'Paket Pribadi (1 Botol), Family (3 Botol), atau Reseller (5 Botol)'
  }
];

export const HealthIntakeModal: React.FC<HealthIntakeModalProps> = ({
  isOpen,
  onClose,
  onSelectComplaint,
  selectedComplaint,
  settings,
  activeAffiliate
}) => {
  if (!isOpen) return null;

  const handleWaConsultation = () => {
    const rawNumber = activeAffiliate?.whatsapp || settings?.csWhatsapp || '0856-0774-6508';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const formattedNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.slice(1) : cleanNumber;
    const message = encodeURIComponent(
      'Halo Admin Konsultasi HI-OMEGA, keluhan kesehatan saya belum ada dalam daftar di website. Saya ingin berkonsultasi mengenai keluhan kesehatan saya dan solusi kapsul HI-OMEGA.'
    );
    const waUrl = `https://wa.me/${formattedNumber}?text=${message}`;
    const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!opened) {
      window.location.href = waUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-emerald-500 overflow-hidden h-[90vh] sm:h-auto sm:max-h-[88vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="intake-title"
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-4 sm:p-6 text-white flex-shrink-0 relative">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 text-emerald-200 border border-emerald-400/40 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
                <span>SOLUSI DENGAN KAPSUL HI-OMEGA</span>
              </div>
              <h2 id="intake-title" className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                Apa Keluhan Kesehatan Anda & Keluarga Saat ini ?
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm font-semibold max-w-2xl leading-relaxed">
                Geser ke Bawah Untuk Memilih Keluhan
              </p>
            </div>

            {/* Close Button if user wants to skip or view all */}
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition flex-shrink-0 cursor-pointer border border-white/30"
              aria-label="Tutup dialog"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Options List (Scrollable with smooth touch scrolling) */}
        <div className="p-3 sm:p-5 overflow-y-auto overscroll-contain flex-1 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMPLAINT_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedComplaint === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectComplaint(item.id);
                  }}
                  className={`group relative text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-white hover:bg-emerald-50/40 border-slate-200 hover:border-emerald-400 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Header item: Icon + Name + Badge */}
                    <div className="flex items-start gap-2.5 mb-2">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg} shadow-sm`}>
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase truncate">
                            {item.badge}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Terpilih
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mt-1 group-hover:text-emerald-800 transition">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-2.5">
                      {item.description}
                    </p>

                    {/* Key Symptoms / Checklist */}
                    <div className="space-y-1 pt-1.5 border-t border-slate-100">
                      {item.keySigns.map((sign, signIdx) => (
                        <div key={signIdx} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{sign}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs">
                    <span className="font-bold text-slate-500 truncate mr-2">
                      Rekomendasi: <span className="text-slate-900 font-extrabold">{item.recommendedPackage}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-black text-emerald-700 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <span>Pilih</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-600 flex-shrink-0">
          <div className="flex items-center gap-2 font-semibold text-[11px] sm:text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Pilihan Dapat Di Ubah Melalui Tombol "Butuh Solusi" Di Halaman Utama</span>
          </div>

          <button
            type="button"
            onClick={handleWaConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200 flex-shrink-0" />
            <span>Keluhan Tidak Ada Dalam Daftar , Konsultasi Melalui WA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
