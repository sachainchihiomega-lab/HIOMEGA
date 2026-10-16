import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Search,
  CheckCircle2,
  Leaf,
  Heart,
  Droplets,
  Package,
  Activity,
  Flame,
  Brain,
  Shield,
  Apple,
  Smile,
  Stethoscope,
  BookOpen,
  Zap,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SiteSettings, Member } from '../../types';

interface FAQSectionProps {
  settings?: SiteSettings;
  activeAffiliate?: Member | null;
  onScrollToProducts?: () => void;
}

interface FaqItem {
  id: number;
  question: string;
  answer: React.ReactNode;
  category: 'umum' | 'kandungan' | 'konsumsi' | 'keamanan' | 'manfaat';
}

interface DiseaseCondition {
  id: number;
  number: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  sachaInchiKhasiat: {
    summary: string;
    points: { label: string; desc: string }[];
  };
  probiotikKhasiat: {
    summary: string;
    points: { label: string; desc: string }[];
  };
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  settings,
  activeAffiliate,
  onScrollToProducts
}) => {
  // Accordion state for FAQ: exactly one open, clicking another collapses the previous
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Interactive state for 15 Clinical Conditions from PDF
  const [activeConditionIndex, setActiveConditionIndex] = useState<number | null>(0);
  const [conditionSearch, setConditionSearch] = useState<string>('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  const toggleCondition = (index: number) => {
    setActiveConditionIndex(prev => (prev === index ? null : index));
  };

  // 12 FAQs verbatim as provided in user request and PDF
  const faqs: FaqItem[] = [
    {
      id: 1,
      category: 'umum',
      question: 'Apa itu kapsul Sacha Inchi HIOMEGA ?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          Suplemen yang berisi minyak hasil ekstraksi dingin (<strong className="text-emerald-950 font-bold">cold-pressed</strong>) dari biji tanaman Sacha Inchi atau <em className="font-semibold text-emerald-850">Plukenetia volubilis</em> asal hutan Amazon. Juga mengandung probiotik berupa VCO dan juga kandungan EPA & DHA. Kapsul bersumber nabati ini cocok buat semua usia dan kalangan vegan.
        </p>
      )
    },
    {
      id: 2,
      category: 'kandungan',
      question: 'Apa saja kandungan kapsul HIOMEGA?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          Disetiap kapsul HIOMEGA mengandung <strong className="text-emerald-900 font-bold">Sacha Inchi Oil</strong>, <strong className="text-emerald-900 font-bold">Probiotik berbentuk VCO</strong> dan juga kandungan <strong className="text-emerald-900 font-bold">EPA & DHA</strong>.
        </p>
      )
    },
    {
      id: 3,
      category: 'keamanan',
      question: 'Apakah sacha inchi aman dikonsumsi setiap hari?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          <strong className="text-emerald-800 font-bold">Ya, aman dikonsumsi setiap hari</strong> sebagai bagian dari pola makan yang seimbang. Mengonsumsi dalam keadaan perut kosong bisa memicu efek samping kadar ringan pada pencernaan seperti mual, kembung, sakit perut, atau diare.
        </p>
      )
    },
    {
      id: 4,
      category: 'konsumsi',
      question: 'Berapa dosis konsumsi harian yang dianjurkan?',
      answer: (
        <div className="space-y-2.5 text-slate-700 leading-relaxed text-base sm:text-lg">
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
            <p>
              • Untuk <strong className="text-slate-900 font-bold">pemeliharaan kesehatan umum</strong>, dianjurkan mengonsumsi <strong className="text-emerald-850 font-bold">1–2 kapsul per hari</strong>.
            </p>
          </div>
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
            <p>
              • Sedangkan untuk <strong className="text-slate-900 font-bold">masa penyembuhan dan pemulihan</strong>, dianjurkan <strong className="text-amber-900 font-bold">3 - 4 kapsul per hari</strong>.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      category: 'konsumsi',
      question: 'Kapan waktu terbaik untuk mengonsumsinya?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          <strong className="text-emerald-900 font-bold">Sebaiknya dikonsumsi setelah makan.</strong> Dianjurkan diminum bersamaan atau sesudah makanan yang mengandung sedikit lemak agar penyerapan asam lemak Omega lebih optimal oleh tubuh. Bisa pagi, siang, maupun malam hari secara konsisten.
        </p>
      )
    },
    {
      id: 6,
      category: 'konsumsi',
      question: 'Apakah boleh untuk mengonsumsinya meskipun tidak sakit?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          <strong className="text-emerald-850 font-bold">Iya Boleh</strong>, sebagai bagian dari pemeliharaan kesehatan agar terhindar dari penyakit. Menghindari sakit sejak dini jauh lebih mudah dan murah dibandingkan dengan rumitnya dan tingginya biaya berobat kerumah sakit.
        </p>
      )
    },
    {
      id: 7,
      category: 'keamanan',
      question: 'Apakah aman untuk dikonsumsi oleh penderita alergi terhadap kacang kacangan?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          <strong className="text-emerald-850 font-bold">Iya Aman</strong>, Sacha inchi secara teknis adalah biji-bijian (<em className="font-semibold text-emerald-850">Plukenetia volubilis</em>), bukan kacang tanah atau kacang pohon sejati. Orang yang memiliki alergi terhadap kacang tanah tetap aman mengonsumsinya.
        </p>
      )
    },
    {
      id: 8,
      category: 'umum',
      question: 'Bisakah sacha inchi sepenuhnya menggantikan minyak ikan?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          <strong className="text-emerald-850 font-bold">Iya Bisa</strong>, Hi-Omega Sacha inchi Oil adalah sumber Omega-3 nabati (ALA) terbaik dan sudah mengandung EPA dan DHA.
        </p>
      )
    },
    {
      id: 9,
      category: 'keamanan',
      question: 'Apakah suplemen sacha inchi aman untuk ibu hamil dan menyusui?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          Secara umum, sumber Omega-3 sangat penting untuk perkembangan otak janin dan bayi. Sehingga <strong className="text-emerald-850 font-bold">aman untuk dikonsumsi dengan dosis bertahap</strong>.
        </p>
      )
    },
    {
      id: 10,
      category: 'keamanan',
      question: 'Apakah suplemen sacha inchi aman untuk bayi sebagai MPASI?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          <strong className="text-emerald-850 font-bold">Iya Aman diberikan kepada anak sebagai lemak tambahan dalam MPASI</strong> secara harian. Caranya, Gunting 1 kapsul lalu campurkan pada bubur sebagai makanan sehat.
        </p>
      )
    },
    {
      id: 11,
      category: 'manfaat',
      question: 'Apakah suplemen sacha inchi bisa dioleskan sebagai perawatan kulit dan rambut?',
      answer: (
        <div className="space-y-3.5 text-slate-700 leading-relaxed text-base sm:text-lg">
          <p>
            <strong className="text-emerald-850 font-bold">Iya Bisa</strong>, Minyak Sacha Inchi bertekstur ringan, mudah meresap, serta aman bagi kulit dan rambut. kandungan asam lemak esensial (omega-3, omega-6, omega-9), vitamin E, serta antioksidan yang tinggi sangat baik untuk perawatan kulit dan rambut.
          </p>
          <div className="bg-emerald-50 border-2 border-emerald-200/90 p-4 rounded-2xl space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5">
              <span className="font-black text-emerald-950 sm:min-w-44 text-sm sm:text-base">• Manfaat untuk kulit :</span>
              <span className="text-slate-800 text-sm sm:text-base">Sebagai anti-aging (anti-penuaan), Menenangkan kulit sensitive dan membantu regenerasi sel.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5">
              <span className="font-black text-emerald-950 sm:min-w-44 text-sm sm:text-base">• Manfaat untuk Rambut :</span>
              <span className="text-slate-800 text-sm sm:text-base">Melembapkan rambut kering, Menyehatkan kulit kepala, Mengatur produksi minyak dan Memperkuat folikel.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 12,
      category: 'konsumsi',
      question: 'Bagaimana cara menyimpan kapsul Sacha Inchi HIOMEGA agar aman?',
      answer: (
        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          Tutup botol dengan rapat dan meletakkannya di tempat yang sejuk (suhu ruangan 15°C–25°C), kering, dan terhindar dari paparan sinar matahari langsung. Hindari tempat yang terlalu panas atau tempat yang basah dan terlalu lembab karena dapat merusak cangkang kapsul.
        </p>
      )
    }
  ];

  // 15 Comprehensive Health Condition Points directly extracted from PDF
  const diseaseConditions: DiseaseCondition[] = [
    {
      id: 1,
      number: '01',
      title: 'Asam Urat & Nyeri Persendian',
      badge: 'Sendi & Inflamasi',
      icon: Flame,
      color: 'rose',
      sachaInchiKhasiat: {
        summary: 'Kadar asam urat yang tinggi dalam darah dapat menyebabkan terjadinya hiperurisemia. Tanaman Sacha Inchi berkhasiat menurunkan kadar asam urat melalui senyawa flavonoid (kaempferol) yang menghambat pembentukan radikal bebas dan asam urat.',
        points: [
          { label: 'Flavonoid Kaempferol', desc: 'Menghambat pembentukan asam urat dalam tubuh dan menekan pembentukan kristal asam urat pada persendian.' },
          { label: 'Anti-inflamasi Nyeri Sendi', desc: 'Kandungan asam lemak Omega-3 (ALA), Omega-6, dan Omega-9 yang tinggi meredakan gejala nyeri sendi atau peradangan seperti rheumatoid arthritis.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik membantu menurunkan kadar asam urat dan meredakan peradangan pada sendi dengan memperbaiki keseimbangan mikrobioma usus dan menurunkan penanda inflamasi.',
        points: [
          { label: 'Modulasi Flora Usus', desc: 'Bakteri baik membantu mengoptimalkan metabolisme tubuh dan pembuangan sisa zat yang tidak diperlukan, termasuk asam urat.' },
          { label: 'Mengurangi Peradangan', desc: 'Menekan sitokin pro-inflamasi yang menyebabkan pembengkakan dan rasa ngilu hebat pada persendian.' }
        ]
      }
    },
    {
      id: 2,
      number: '02',
      title: 'Kolesterol Tinggi & Trigliserida',
      badge: 'Profil Lipid',
      icon: Activity,
      color: 'amber',
      sachaInchiKhasiat: {
        summary: 'Sacha Inchi (Plukenetia volubilis) membantu menurunkan kolesterol total, kolesterol LDL (jahat), dan trigliserida, sekaligus meningkatkan kolesterol HDL (baik). Kandungan PUFA di atas 80% dan tokoferol alami mencegah oksidasi kolesterol di pembuluh darah.',
        points: [
          { label: 'Omega-3 (ALA) Sangat Tinggi', desc: 'Hingga 48% dalam minyak/kapsul berperan menurunkan trigliserida dan menurunkan peradangan dinding arteri.' },
          { label: 'Inhibitor Enzim HMG-CoA Reduktase', desc: 'Bekerja menghambat enzim pembentuk kolesterol serupa mekanisme beberapa obat penurun kolesterol.' },
          { label: 'Aktivasi PPAR-α & Nitric Oxide (NO)', desc: 'Mengatur metabolisme lemak dan meningkatkan elastisitas pembuluh darah.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik membantu memperbaiki profil lipid dengan menurunkan kolesterol total, LDL, dan trigliserida secara terukur melalui pengaturan metabolisme lemak di saluran pencernaan.',
        points: [
          { label: 'Menghambat Penyerapan Kolesterol', desc: 'Probiotik mengikat molekul kolesterol di usus sehingga sulit diserap kembali ke peredaran darah.' },
          { label: 'Produksi Enzim Empedu Hidrolase', desc: 'Memecah asam empedu sehingga lebih banyak kolesterol dibuang secara alami melalui saluran pembuangan.' },
          { label: 'Pengaturan Metabolisme Lipid', desc: 'Menekan sintesis trigliserida baru di dalam saluran cerna.' }
        ]
      }
    },
    {
      id: 3,
      number: '03',
      title: 'Hipertensi (Tekanan Darah Tinggi)',
      badge: 'Kardiovaskular',
      icon: Heart,
      color: 'emerald',
      sachaInchiKhasiat: {
        summary: 'Sacha Inchi memiliki khasiat untuk membantu menurunkan dan mengontrol tekanan darah tinggi dengan menjaga fleksibilitas dinding pembuluh darah serta menurunkan beban pompa jantung.',
        points: [
          { label: 'Kandungan ALA 48% & PUFA', desc: 'Membantu pembuluh darah lebih lentur sehingga hambatan aliran darah menurun secara alami.' },
          { label: 'Antioksidan & Polifenol', desc: 'Mengurangi peradangan mikrovaskular dan meningkatkan fungsi kardiovaskular secara keseluruhan.' },
          { label: 'Kelancaran Aliran Darah', desc: 'Rutin konsumsi sacha inchi terbukti klinis membantu menstabilkan tekanan darah sistolik dan diastolik.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Konsumsi probiotik teratur membantu menurunkan tekanan darah sistolik dan diastolik serta mendukung terapi pengobatan hipertensi melalui poros usus-pembuluh darah.',
        points: [
          { label: 'Produksi Asam Lemak Rantai Pendek (SCFA)', desc: 'SCFA memicu sinyal relaksasi dan pelebaran pembuluh darah alami.' },
          { label: 'Menurunkan Beban Stres Oksidatif', desc: 'Menurunkan ketegangan dinding arteri dan memelihara kesehatan endotel vaskular.' },
          { label: 'Memperbaiki Fungsi Endotel', desc: 'Mendukung integritas lapisan dalam arteri agar tidak mudah mengeras.' }
        ]
      }
    },
    {
      id: 4,
      number: '04',
      title: 'Jantung, Kardiovaskular & Penyumbatan Arteri',
      badge: 'Kesehatan Jantung',
      icon: Zap,
      color: 'red',
      sachaInchiKhasiat: {
        summary: 'Kandungan Asam Alfa-Linolenat (ALA) nabati pada Sacha Inchi jauh melampaui sumber hewani seperti salmon. Berperan utama mencegah penumpukan plak aterosklerosis dan menjaga ritme sirkulasi jantung.',
        points: [
          { label: 'Mencegah Oksidasi LDL & Plak Arteri', desc: 'Tokoferol (Vitamin E) dan polifenol mencegah kolesterol LDL teroksidasi menjadi kerak/plak penyumbat.' },
          { label: 'Menjaga Kelenturan Arteri', desc: 'Menjaga integritas membran sel vaskular sehingga mencegah kekakuan arteri pemicu serangan jantung mendadak.' },
          { label: 'Meringankan Beban Jantung', desc: 'Tekanan darah yang terkontrol meminimalkan kerusakan mikro pada lapisan dalam pembuluh darah.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Berdasarkan tinjauan medis dan studi klinis Kemenkes RI, probiotik spesifik (Lactobacillus & Bifidobacterium) terbukti mengoptimalkan kesehatan jantung.',
        points: [
          { label: 'Mengurangi Beban LDL & Trigliserida', desc: 'Mengurangi jumlah lemak jahat yang beredar menuju arteri koroner.' },
          { label: 'Meningkatkan Elastisitas Endotel', desc: 'Membantu meningkatkan respons relaksasi pembuluh darah saat aktivitas berat.' }
        ]
      }
    },
    {
      id: 5,
      number: '05',
      title: 'Kadar Gula Darah Tinggi (Diabetes Melitus)',
      badge: 'Metabolik',
      icon: Activity,
      color: 'teal',
      sachaInchiKhasiat: {
        summary: 'Minyak Sacha Inchi membantu menstabilkan respon metabolisme glukosa dan meningkatkan sensitivitas reseptor insulin tubuh tanpa mengganggu terapi medis utama.',
        points: [
          { label: 'Meningkatkan Sensitivitas Insulin', desc: 'Mengaktivasi jalur pensinyalan glukosa (seperti IRS-1) agar sel lebih mudah menyerap glukosa darah.' },
          { label: 'Kombinasi Omega-3, 6, dan 9 Seimbang', desc: 'Memperbaiki profil lipid yang sering memburuk pada penderita komplikasi diabetes.' },
          { label: 'Mencegah Sugar Spikes', desc: 'Lemak sehat memperlambat penyerapan karbohidrat sehingga lonjakan gula darah setelah makan dapat diredam.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik membantu memperbaiki kontrol glikemik, menstabilkan kadar glukosa puasa, dan menurunkan kadar HbA1c pada pasien diabetes tipe 2.',
        points: [
          { label: 'Mengatasi Disbiosis Usus', desc: 'Memperbaiki ketidakseimbangan bakteri yang kerap terjadi pada pasien diabetes melitus.' },
          { label: 'Rangsang Hormon GLP-1', desc: 'Menstimulasi pelepasan hormon GLP-1 alami yang bertugas merangsang sekresi insulin sehat.' },
          { label: 'Strain Bakteri Unggulan', desc: 'Lactobacillus acidophilus & Bifidobacterium lactis diteliti efektif meningkatkan respon insulin.' }
        ]
      }
    },
    {
      id: 6,
      number: '06',
      title: 'Asam Lambung, GERD & Masalah Pencernaan',
      badge: 'Saluran Cerna',
      icon: Apple,
      color: 'amber',
      sachaInchiKhasiat: {
        summary: 'Sacha Inchi kaya akan ALA, protein nabati, dan antioksidan yang menutrisi lapisan mukosa lambung dan membantu menyeimbangkan ekosistem flora pencernaan.',
        points: [
          { label: 'Menyeimbangkan Bakteri Baik', desc: 'Memberikan nutrisi pelindung yang mendukung mikrobioma usus bekerja normal.' },
          { label: 'Melancarkan Buang Air Besar', desc: 'Membantu menambah volume dan keteraturan pergerakan usus (mencegah konstipasi/sembelit).' },
          { label: 'Aturan Pakai Tepat', desc: 'Dianjurkan diminum sesudah makan saat lambung sudah terisi makanan agar penyerapan maksimal tanpa mual.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Kandungan probiotik berbasis VCO secara langsung menenangkan gas lambung, meredakan sensasi kembung, begah, dan memperkuat dinding saluran cerna.',
        points: [
          { label: 'Meredakan Gejala Begah & Kembung', desc: 'Bakteri ramah melawan bakteri pembusuk penghasil gas berlebih di lambung.' },
          { label: 'Adaptasi Usus Sehat', desc: 'Pada awal konsumsi membantu proses pembersihan dan penyesuaian mikrobioma saluran cerna.' }
        ]
      }
    },
    {
      id: 7,
      number: '07',
      title: 'Stroke & Pemulihan Syaraf Otak',
      badge: 'Neuroproteksi',
      icon: Brain,
      color: 'indigo',
      sachaInchiKhasiat: {
        summary: 'Kandungan Omega-3 (ALA) hingga 48% bekerja sinergis memperbaiki sirkulasi darah ke otak, menjaga suplai oksigen, dan mendukung proses rehabilitasi saraf pascastroke.',
        points: [
          { label: 'Melancarkan Suplai Oksigen ke Otak', desc: 'Menurunkan trigliserida dan mencegah sumbatan baru di jaringan mikrovaskular serebral.' },
          { label: 'Mendukung Neuroplastisitas', desc: 'Omega-3 menjadi bahan utama membran sel saraf untuk membentuk koneksi seluler baru pascacedera.' },
          { label: 'Meredakan Neuroinflamasi', desc: 'Antioksidan tokoferol dan ALA menenangkan peradangan hebat dan menangkal radikal bebas di jaringan otak.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Melalui konsep Gut-Brain Axis (poros usus-otak), probiotik memberikan efek neuroprotektif yang mempercepat regenerasi sel otak pascastroke.',
        points: [
          { label: 'Melindungi Sawar Darah Otak (Blood-Brain Barrier)', desc: 'Mencegah racun dan toksin dari usus bocor masuk ke jaringan otak yang sedang rentan.' },
          { label: 'Stimulasi Saraf Vagus Melalui SCFA', desc: 'Menghasilkan asam lemak rantai pendek yang memicu produksi senyawa peningkat fungsi motorik & memori.' }
        ]
      }
    },
    {
      id: 8,
      number: '08',
      title: 'Pengentalan Darah & Sirkulasi Vaskular',
      badge: 'Anti-Gumpalan',
      icon: Droplets,
      color: 'rose',
      sachaInchiKhasiat: {
        summary: 'Dengan kadar ALA 47–51%, minyak Sacha Inchi berpotensi besar menjaga keenceran darah yang seimbang dan mencegah terbentuknya gumpalan abnormal di pembuluh darah.',
        points: [
          { label: 'Efek Anti-Agregasi Trombosit', desc: 'Mencegah keping darah (platelet) saling menempel dan menggumpal secara berlebih di dinding vena/arteri.' },
          { label: 'Melancarkan Sirkulasi Vaskular', desc: 'Menjaga kelenturan pembuluh darah dan menurunkan kekentalan akibat tingginya trigliserida.' },
          { label: 'Anti-inflamasi Dinding Pembuluh Darah', desc: 'Melindungi endotel pembuluh darah dari peradangan kronis pasca infeksi atau vaksinasi.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Penelitian terbaru membuktikan poros usus-pembuluh darah (Gut-Heart Axis) sangat menentukan kesehatan pembekuan darah alami tubuh.',
        points: [
          { label: 'Mencegah Pelepasan Toksin LPS', desc: 'Dinding usus yang rapat mencegah racun Lipopolisakarida (LPS) masuk ke darah pemicu radang dan penggumpalan.' },
          { label: 'Menekan Senyawa TMAO', desc: 'Menekan bakteri pengubah lemak menjadi TMAO yang kerap membuat keping platelet menjadi agresif.' }
        ]
      }
    },
    {
      id: 9,
      number: '09',
      title: 'Kecerdasan & Kesehatan Otak Anak',
      badge: 'Tumbuh Kembang',
      icon: Sparkles,
      color: 'emerald',
      sachaInchiKhasiat: {
        summary: 'Superfood kaya Omega-3 nabati, Omega-6, dan asam amino esensial lengkap yang sangat dibutuhkan otak anak pada masa emas perkembangan kognitif.',
        points: [
          { label: 'Komponen Membran Sel Otak', desc: 'ALA merupakan prekursor asam lemak esensial yang menyusun sel saraf pusat dan kecerdasan anak.' },
          { label: 'Meningkatkan Fokus & Daya Ingat', desc: 'Konsumsi rutin mendukung performa memori dan rentang konsentrasi saat belajar.' },
          { label: 'Asam Amino Triptofan', desc: 'Memicu produksi hormon serotonin agar suasana hati anak tetap ceria, tenang, dan tidak mudah cemas.' },
          { label: 'Mudah Diberikan untuk MPASI', desc: 'Kapsul dapat digunting dan minyaknya dicampurkan ke bubur/makanan anak balita sebagai lemak tambahan sehat.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik mendukung suasana hati dan tumbuh kembang anak lewat komunikasi Gut-Brain Axis.',
        points: [
          { label: 'Penyerapan Mikronutrien Maksimal', desc: 'Memastikan vitamin dan mineral pertumbuhan otak terserap secara efisien di usus.' },
          { label: 'Meredakan Perilaku Hiperaktif', desc: 'Strain seperti Lactobacillus plantarum terbukti membantu meredakan hiperaktivitas dan meningkatkan interaksi sosial.' }
        ]
      }
    },
    {
      id: 10,
      number: '10',
      title: 'Depresi, Alzheimer, Pikun & Gangguan Anxiety',
      badge: 'Kesehatan Mental',
      icon: Smile,
      color: 'blue',
      sachaInchiKhasiat: {
        summary: 'Sacha Inchi kaya triptofan alami, ALA, dan vitamin E yang menstabilkan neurotransmiter pembawa rasa bahagia serta melindungi saraf dari penurunan kognitif dini.',
        points: [
          { label: 'Keseimbangan Serotonin & Dopamin', desc: 'Omega-3 menenangkan transmisi saraf otak dan menyeimbangkan neurotransmiter pengatur mood.' },
          { label: 'Sumber Alami Triptofan', desc: 'Bahan baku esensial tubuh untuk memproduksi serotonin, mengurangi rasa tertekan dan stres berkepanjangan.' },
          { label: 'Meredam Neuroinflamasi & Stres Oksidatif', desc: 'PUFA dan Vitamin E tinggi melindungi sel otak dari degradasi memori (pikun / Alzheimer).' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik bertindak sebagai terapi pendamping (adjuvan) yang menenangkan respon kecemasan melalui pengaturan neurotransmiter usus.',
        points: [
          { label: 'Poros Usus-Otak Sehat', desc: 'Mengatur jalur triptofan dan peradangan sistemik yang memicu episode depresi kronis.' },
          { label: 'Meredakan Ketegangan Syaraf', desc: 'Membantu tubuh lebih rileks dan meningkatkan kualitas tidur di malam hari.' }
        ]
      }
    },
    {
      id: 11,
      number: '11',
      title: 'Penyakit Autoimun & Penguatan Imunitas Tubuh',
      badge: 'Imunomodulator',
      icon: ShieldCheck,
      color: 'violet',
      sachaInchiKhasiat: {
        summary: 'Sifat imunomodulator Sacha Inchi tidak mendongkrak imun secara buta, melainkan menyeimbangkan dan menenangkan sistem imun agar tidak menyerang sel tubuh sendiri.',
        points: [
          { label: 'Menurunkan Sitokin Pro-Inflamasi', desc: 'Menghambat mediator peradangan seperti TNF-alpha, IL-6, dan IL-1beta yang memicu flare-up autoimun.' },
          { label: 'Potensi Khusus Rheumatoid Arthritis', desc: 'Bekerja menyerupai anti-inflamasi biologis dalam meredam erosi tulang rawan dan bengkak sendi.' },
          { label: '9 Asam Amino Esensial Lengkap', desc: 'Bahan baku utama tubuh membentuk antibodi dan memicu aktivitas sel makrofag pemusnah virus/bakteri.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Sekitar 80% sistem imun manusia bermukim di saluran cerna. Probiotik memperkuat dinding usus untuk mencegah respon imun yang keliru.',
        points: [
          { label: 'Memperbaiki Leaky Gut (Usus Bocor)', desc: 'Mencegah racun makanan bocor ke aliran darah yang kerap menjadi pemicu utama serangan autoimun.' },
          { label: 'Meningkatkan Antibodi Perlindungan (IgA)', desc: 'Meningkatkan pertahanan mukosa saluran cerna dan menekan peradangan sistemik.' }
        ]
      }
    },
    {
      id: 12,
      number: '12',
      title: 'Kanker (Fakta Laboratorium & Terapi Pendamping)',
      badge: 'Onkologi Support',
      icon: Shield,
      color: 'rose',
      sachaInchiKhasiat: {
        summary: 'Dalam uji laboratorium ilmiah (in vitro), ekstrak Sacha Inchi menunjukkan aktivitas antiproliferatif yang menghambat replikasi sel abnormal dan memicu apoptosis sel tumor.',
        points: [
          { label: 'PUFA & Apoptosis Sel Abnormal', desc: 'Asam lemak tak jenuh ganda mengganggu stabilitas membran sel kanker dan memicu kematian sel terprogram.' },
          { label: 'Senyawa Fenolik & Flavonoid', desc: 'Antioksidan tangguh yang menetralkan radikal bebas sebelum merusak DNA sel sehat.' },
          { label: 'Uji Sel Kanker Tertentu', desc: 'Tercatat dalam studi laboratorium menghambat pertumbuhan sel kanker usus besar, lambung, dan serviks.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik terbukti secara klinis menjadi terapi suportif yang sangat bernilai bagi pasien yang sedang menjalani kemoterapi atau radioterapi.',
        points: [
          { label: 'Mengurangi Efek Samping Kemoterapi', desc: 'Meredakan mual, diare, dan peradangan mukosa usus (mukositis) akibat terapi medis kanker.' },
          { label: 'Meningkatkan Respon Imunoterapi', desc: 'Keseimbangan mikrobiota usus yang sehat meningkatkan efektivitas pengobatan imunoterapi modern.' }
        ]
      }
    },
    {
      id: 13,
      number: '13',
      title: 'Penyakit Degeneratif & Penuaan Organ',
      badge: 'Anti-Degenerasi',
      icon: Layers,
      color: 'indigo',
      sachaInchiKhasiat: {
        summary: 'Penyakit degeneratif (jantung, diabetes, osteoarthritis, demensia) dipicu peradangan kronis dan stres oksidatif menahun. Sacha Inchi menyediakan perisai nutrisi seluler lengkap.',
        points: [
          { label: 'Kandungan Kalium & PUFA Alami', desc: 'Meningkatkan sirkulasi darah dan menurunkan tekanan darah tinggi secara simultan.' },
          { label: 'Menjaga Integritas Membran Sel', desc: 'Nutrisi lemak sehat mencegah penuaan dini pada organ vital termasuk ginjal, hati, dan pembuluh darah.' },
          { label: 'Meredakan Kekakuan Sendi Lansia', desc: 'Menjaga pelumasan dan fleksibilitas persendian seiring bertambahnya usia.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik menjaga komunikasi poros usus-otak dan usus-organ untuk menekan peradangan kronis pemicu degenerasi sistemik.',
        points: [
          { label: 'Produksi SCFA Pelindung Saraf', desc: 'Menjaga integritas sawar darah otak agar fungsi memori dan atensi tetap terjaga tajam.' },
          { label: 'Keseimbangan Ekosistem Organ Vital', desc: 'Meringankan beban filtrasi ginjal dan mendukung fungsi metabolisme pankreas.' }
        ]
      }
    },
    {
      id: 14,
      number: '14',
      title: 'Kesehatan Kulit & Anti-Penuaan Dini (Anti-Aging)',
      badge: 'Dermatologi',
      icon: Sparkles,
      color: 'emerald',
      sachaInchiKhasiat: {
        summary: 'Kaya Omega-3, 6, 9, vitamin E dan fitosterol yang memperkuat skin barrier, menghidrasi kulit tanpa menyumbat pori-pori (non-comedogenic), dan dapat dioleskan langsung ke kulit & rambut.',
        points: [
          { label: 'Mengurangi Garis Halus & Kerutan', desc: 'Antioksidan tinggi menyamarkan keriput dan bintik hitam (age spots) akibat penuaan dan paparan sinar matahari.' },
          { label: 'Menenangkan Kulit Sensitif & Eksim', desc: 'Minyak bertekstur ringan cepat meresap untuk menenangkan kemerahan, dermatitis, dan jerawat meradang.' },
          { label: 'Perawatan Kulit Kepala & Rambut', desc: 'Melembapkan rambut kering, mengontrol produksi minyak kulit kepala, dan menguatkan akar rambut.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Probiotik oral dan topikal menjaga keseimbangan mikrobioma kulit, mengembalikan pH asam alami, dan mengunci kelembapan jaringan.',
        points: [
          { label: 'Memperbaiki Sawar Kulit (Skin Barrier)', desc: 'Mencegah kehilangan air transepidermal (TEWL) agar kulit tetap kenyal, elastis, dan kencang.' },
          { label: 'Menangkal Stres Oksidatif UV & Polusi', desc: 'Menekan enzim perusak kolagen sehingga proses regenerasi sel berlangsung lebih cepat.' }
        ]
      }
    },
    {
      id: 15,
      number: '15',
      title: 'Khasiat Harian & Studi Medis Terbaru 2026',
      badge: 'Studi Klinis 2026',
      icon: BookOpen,
      color: 'emerald',
      sachaInchiKhasiat: {
        summary: 'Dijuluki kacang Inka dari hutan hujan Amazon Peru, Sacha Inchi diakui sebagai superfood nabati terbaik di dunia yang mengungguli minyak ikan laut untuk gaya hidup sehat harian maupun vegan.',
        points: [
          { label: 'Studi Klinis 2026 (Journal of Nutritional Biochemistry)', desc: 'Uji klinis 300 partisipan hiperlipidemia membuktikan konsumsi 2 gram minyak Sacha Inchi per hari selama 12 minggu menurunkan LDL hingga rata-rata 18% dan meningkatkan antioksidan serum darah secara signifikan.' },
          { label: 'Riset Global Institute of Plant-Based Medicine (2026)', desc: 'Bioavailabilitas ALA Sacha Inchi menempati peringkat tertinggi di dunia, mengalahkan chia seed dan flaxseed.' },
          { label: 'Pembentukan Massa Otot & Daya Tahan', desc: 'Mengandung protein nabati mudah cerna dan serat tinggi yang mempercepat pemulihan fisik setelah beraktivitas.' }
        ]
      },
      probiotikKhasiat: {
        summary: 'Kombinasi harian Sacha Inchi Oil, Probiotik VCO, dan EPA/DHA pada kapsul HI-OMEGA menciptakan sinergi perlindungan komprehensif bagi seluruh anggota keluarga.',
        points: [
          { label: 'Perlindungan Seluler Total', desc: 'Membawa nutrisi langsung menembus membran sel sekaligus membentengi tubuh dari serangan patogen.' },
          { label: 'Energi Segar Sepanjang Hari', desc: 'Asam laurat rantai sedang (MCFA) dari probiotik VCO diubah seketika menjadi energi bersih tanpa membebani liver.' }
        ]
      }
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    if (!faqSearch.trim()) return matchesCategory;
    const q = faqSearch.toLowerCase();
    const matchesQuery = f.question.toLowerCase().includes(q) || (typeof f.answer === 'string' && f.answer.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const filteredConditions = diseaseConditions.filter(c => {
    if (!conditionSearch.trim()) return true;
    const q = conditionSearch.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.badge.toLowerCase().includes(q) || c.sachaInchiKhasiat.summary.toLowerCase().includes(q);
  });

  const csPhone = activeAffiliate?.whatsapp || settings?.csWhatsapp || '0856-0774-6508';
  const cleanPhone = csPhone.replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/60 to-emerald-50/30 border-t border-slate-200 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* BAGIAN 1: PERTANYAAN YANG SERING DI AJUKAN (ACCORDION DROPDOWN OTOMATIS) */}
        {/* ========================================================================= */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>Pusat Informasi & Tanya Jawab</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              PERTANYAAN YANG SERING DI AJUKAN
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
              Klik pertanyaan di bawah untuk membuka jawaban lengkap seputar manfaat, dosis konsumsi harian, keamanan MPASI, hingga cara penyimpanan kapsul <span className="text-emerald-850 font-bold">HI-OMEGA Sacha Inchi</span>.
            </p>

            {/* Quick Search Bar */}
            <div className="pt-2 max-w-md mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ketik kata kunci (contoh: dosis, MPASI, aman, alergi)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-white border-2 border-slate-300 focus:border-emerald-600 rounded-2xl pl-11 pr-16 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-900 focus:outline-none shadow-xs transition"
              />
              {faqSearch && (
                <button
                  type="button"
                  onClick={() => setFaqSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { id: 'all', label: 'Semua Tanya Jawab' },
                { id: 'umum', label: 'Tentang HI-OMEGA' },
                { id: 'konsumsi', label: 'Aturan & Dosis' },
                { id: 'keamanan', label: 'Keamanan & Alergi' },
                { id: 'manfaat', label: 'Kulit & Rambut' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion FAQ List (Single Open Dropdown Logic) */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-500 font-bold">
                Tidak ada pertanyaan yang cocok dengan "{faqSearch}". Coba kata kunci lainnya.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                      isOpen 
                        ? 'border-emerald-600 ring-4 ring-emerald-500/10' 
                        : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {/* Question Button (Click to expand this and collapse others) */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-xs sm:text-base flex-shrink-0 transition-colors ${
                          isOpen 
                            ? 'bg-emerald-700 text-white shadow-sm' 
                            : 'bg-emerald-50 text-emerald-850 border border-emerald-200'
                        }`}>
                          {faq.id}
                        </div>
                        <h3 className={`text-base sm:text-xl font-black leading-snug transition-colors ${
                          isOpen ? 'text-emerald-950' : 'text-slate-900'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>

                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-emerald-100 text-emerald-850 rotate-180' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </button>

                    {/* Answer Dropdown Content */}
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-slate-100 bg-gradient-to-b from-white to-emerald-50/20 animate-fadeIn">
                        <div className="pl-11 sm:pl-14">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN 2: APA YANG TERKANDUNG DI SETIAP KAPSUL HIOMEGA?                  */}
        {/* ========================================================================= */}
        <div className="pt-6 sm:pt-10 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-900 border border-teal-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Komposisi Formulasi Alami & Superior</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              REVOLUSI KESEHATAN DENGAN SACHA INCHI OIL KAPSUL HI-OMEGA
            </h2>

            <h3 className="text-xl sm:text-2xl font-black text-emerald-850">
              Apa yang terkandung di setiap kapsul HIOMEGA?
            </h3>

            <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
              HI-OMEGA memadukan 3 komponen sinergis berstandar klinis dunia: Minyak Ekstraksi Dingin Biji Sacha Inchi Amazon, Probiotik Aktif berbasis VCO, serta Asam Lemak Esensial EPA & DHA.
            </p>
          </div>

          {/* 3 Main Ingredients Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* 1. Sacha Inchi Oil */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-sm hover:shadow-lg transition flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100/60 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    1
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Sumber Omega Nabati No. 1</span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">Sacha Inchi Oil</h4>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Disetiap kapsul HIOMEGA mengandung minyak Sacha Inchi. Minyak ini sangat istimewa karena kadar <strong className="text-emerald-950 font-bold">Omega-3 yang lebih tinggi</strong> daripada minyak nabati lainnya. Sacha Inchi Oil kaya akan <strong className="text-slate-900 font-bold">asam α-linolenat (ALA, Omega-3)</strong>, <strong className="text-slate-900 font-bold">asam linoleat (LA, Omega-6)</strong>, dan <strong className="text-slate-900 font-bold">asam oleat (OA, Omega-9)</strong>.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Menurunkan Kolesterol LDL:</strong> Lemak sehat nabati menurunkan kadar kolesterol jahat di pembuluh darah.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Sumber Fitosterol Alami:</strong> Menghambat penyerapan kolesterol makanan dan menjaga kesehatan sistem kardiovaskular.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Antioksidan & Anti-inflamasi:</strong> Melindungi dari penyakit kronis seperti diabetes, hipertensi, jantung, dan kanker.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">9 Asam Amino Esensial & Peptida Bioaktif:</strong> Valin, isoleusin, lisin, leusin untuk pertumbuhan serta perbaikan jaringan sel.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Kandungan PUFA di Atas 80%:</strong> Rasio ideal Omega-3 dan Omega-6 untuk stabilitas membran plasma dan fungsi otak.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100 bg-emerald-50/60 -mx-6 -mb-6 p-4 rounded-b-3xl text-xs font-bold text-emerald-900">
                🌱 Diekstraksi dingin (cold-pressed) murni dari biji Plukenetia volubilis Amazon.
              </div>
            </div>

            {/* 2. Probiotik */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-300 shadow-sm hover:shadow-lg transition flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-teal-100/60 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    2
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold text-teal-700 tracking-wider">Keseimbangan Mikrobiota Usus</span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">Probiotik (Minyak VCO)</h4>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Probiotik yang terkandung dalam setiap kapsul HIOMEGA berupa minyak nabati VCO (Virgin Coconut Oil) yang memiliki khasiat istimewa untuk seluruh organ pencernaan dan imunitas.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Mendukung Sistem Pencernaan:</strong> Melancarkan pencernaan, meningkatkan penyerapan nutrisi, dan meredakan sembelit.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Keseimbangan Mikrobiota Usus:</strong> Memelihara populasi bakteri baik dan menekan perkembangan patogen jahat.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Membawa Nutrisi & Perlindungan Sel:</strong> Bertindak sebagai perisai alami sel terhadap paparan virus dan infeksi patogen.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p><strong className="text-slate-900 font-bold">Regenerasi & Fungsi Organ Vital:</strong> Mempercepat peremajaan sel serta menunjang fungsi kerja ginjal dan pankreas.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-teal-100 bg-teal-50/60 -mx-6 -mb-6 p-4 rounded-b-3xl text-xs font-bold text-teal-900">
                🥥 Medium VCO murni melipatgandakan daya tahan hidup bakteri baik di lambung.
              </div>
            </div>

            {/* 3. EPA dan DHA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-300 shadow-sm hover:shadow-lg transition flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-100/60 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    3
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold text-blue-700 tracking-wider">Asam Lemak Rantai Panjang</span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">EPA dan DHA</h4>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  EPA (<em className="font-semibold text-slate-800">Eicosapentaenoic Acid</em>) dan DHA (<em className="font-semibold text-slate-800">Docosahexaenoic Acid</em>) adalah jenis asam lemak omega-3 rantai panjang yang sangat penting bagi kesehatan tubuh manusia.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-200">
                    <span className="font-bold text-blue-900 block mb-1">Fungsi Utama EPA (Jantung & Radang):</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      <li>Menurunkan trigliserida & kelenturan pembuluh darah.</li>
                      <li>Mengurangi nyeri radang sendi (osteoarthritis/rheumatoid).</li>
                      <li>Meredakan kecemasan dan memperkuat sistem imun.</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200">
                    <span className="font-bold text-indigo-900 block mb-1">Fungsi Utama DHA (Otak, Mata & Anak):</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      <li>Struktur utama jaringan otak, memori & konsentrasi.</li>
                      <li>Kesehatan retina mata & pencegah degenerasi makula.</li>
                      <li>Kecerdasan anak, kurangi gejala ADHD, esensial bagi bumil & busui.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-100 bg-blue-50/60 -mx-6 -mb-6 p-4 rounded-b-3xl text-xs font-bold text-blue-900">
                🧠 Esensial untuk kecerdasan otak anak dan perlindungan kardiovaskular dewasa.
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN 3: 15 KELUHAN KESEHATAN DARI FILE PDF (TABBED / ACCORDION DETAIL) */}
        {/* ========================================================================= */}
        <div className="pt-6 sm:pt-10 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 border border-indigo-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
              <Stethoscope className="w-4 h-4 text-indigo-700" />
              <span>Kajian Medis & Khasiat Berdasarkan Dokumen PDF Resmi</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              Keluhan Kesehatan yang Mampu Diatasi oleh Kapsul HIOMEGA Sacha Inchi Oil
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
              Berikut adalah 15 penyakit dan kondisi kesehatan utama yang telah terbukti dapat diatasi dan dibantu pemulihannya secara ilmiah melalui aksi ganda Sacha Inchi Oil dan Probiotik HI-OMEGA.
            </p>

            {/* Disease Filter Search */}
            <div className="pt-2 max-w-md mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari keluhan (contoh: kolesterol, diabetes, stroke, GERD)..."
                value={conditionSearch}
                onChange={(e) => setConditionSearch(e.target.value)}
                className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 rounded-2xl pl-11 pr-16 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-900 focus:outline-none shadow-xs transition"
              />
              {conditionSearch && (
                <button
                  type="button"
                  onClick={() => setConditionSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* 15 Diseases Accordion List */}
          <div className="space-y-4">
            {filteredConditions.map((item, idx) => {
              const isOpen = activeConditionIndex === idx;
              const IconComp = item.icon;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                    isOpen 
                      ? 'border-emerald-600 ring-4 ring-emerald-500/10' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleCondition(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-black text-sm sm:text-lg flex-shrink-0 transition-colors ${
                        isOpen 
                          ? 'bg-emerald-700 text-white shadow-md' 
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {item.number}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className={`text-base sm:text-xl font-black leading-snug transition-colors ${
                          isOpen ? 'text-emerald-950' : 'text-slate-900'
                        }`}>
                          {item.id}. {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-emerald-100 text-emerald-850 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Body Content */}
                  {isOpen && (
                    <div className="px-4 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/50 space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Box 1: Khasiat Sacha Inchi Oil */}
                        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 space-y-4">
                          <div className="flex items-center gap-2.5">
                            <Leaf className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                            <h4 className="text-base sm:text-lg font-black text-emerald-950">
                              Khasiat Sacha Inchi Oil untuk {item.title}
                            </h4>
                          </div>

                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                            {item.sachaInchiKhasiat.summary}
                          </p>

                          <div className="space-y-2 pt-2 border-t border-emerald-200">
                            {item.sachaInchiKhasiat.points.map((pt, pIdx) => (
                              <div key={pIdx} className="bg-white/90 p-3 rounded-xl border border-emerald-200 text-xs sm:text-sm">
                                <span className="font-bold text-emerald-950 block mb-0.5">• {pt.label}:</span>
                                <span className="text-slate-700">{pt.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Box 2: Khasiat Probiotik */}
                        <div className="bg-teal-50/70 border-2 border-teal-300 rounded-3xl p-5 sm:p-6 space-y-4">
                          <div className="flex items-center gap-2.5">
                            <Sparkles className="w-5 h-5 text-teal-700 flex-shrink-0" />
                            <h4 className="text-base sm:text-lg font-black text-teal-950">
                              Khasiat Probiotik untuk {item.title}
                            </h4>
                          </div>

                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                            {item.probiotikKhasiat.summary}
                          </p>

                          <div className="space-y-2 pt-2 border-t border-teal-200">
                            {item.probiotikKhasiat.points.map((pt, pIdx) => (
                              <div key={pIdx} className="bg-white/90 p-3 rounded-xl border border-teal-200 text-xs sm:text-sm">
                                <span className="font-bold text-teal-950 block mb-0.5">• {pt.label}:</span>
                                <span className="text-slate-700">{pt.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Box for Consultation and Orders */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border-2 border-emerald-500/80">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300 block">
              Konsultasi Langsung dengan Tim Ahli Herbal
            </span>
            <h4 className="text-xl sm:text-3xl font-black leading-tight">
              Ingin Mengetahui Dosis Khusus untuk Keluhan Anda?
            </h4>
            <p className="text-xs sm:text-base text-slate-300 max-w-xl">
              Hubungi konsultan kesehatan HI-OMEGA melalui WhatsApp resmi untuk konsultasi gratis mengenai keluhan asam urat, kolesterol, tensi, diabetes, maupun MPASI anak.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-shrink-0">
            {onScrollToProducts && (
              <button
                type="button"
                onClick={onScrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 active:scale-95 text-emerald-950 font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-md transition cursor-pointer"
              >
                <Package className="w-5 h-5 text-emerald-700" />
                <span>Pesan Paket Sekarang</span>
              </button>
            )}

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                'Halo Tim Ahli HI-OMEGA, saya ingin berkonsultasi mengenai dosis dan khasiat kapsul Sacha Inchi HI-OMEGA untuk keluhan saya...'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-lg transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

// Also export as FaqSection for backward compatibility
export const FaqSection = FAQSection;
export default FAQSection;
