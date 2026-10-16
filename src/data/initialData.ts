import { ProductItem, Member, ContentAsset, SiteSettings, TrackingPixels, SymptomCategory } from '../types';
export { 
  PRODUCT_REAL_IMAGE, 
  SOFTGELS_SPILL_IMAGE, 
  BUNDLE_PACK_IMAGE, 
  HERO_BANNER_IMAGE,
  GOLDEN_SOFTGELS_IMAGE,
  SHIPPING_PARCEL_IMAGE,
  HAPPY_SENIORS_IMAGE
} from '../assets/productImages';
import { 
  PRODUCT_REAL_IMAGE, 
  SOFTGELS_SPILL_IMAGE, 
  BUNDLE_PACK_IMAGE, 
  HERO_BANNER_IMAGE,
  GOLDEN_SOFTGELS_IMAGE,
  SHIPPING_PARCEL_IMAGE,
  HAPPY_SENIORS_IMAGE
} from '../assets/productImages';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'hi-omega-60',
    name: 'PAKET PRIBADI',
    subName: 'Paket Pribadi 1 Botol (Isi 60 Kapsul @500mg - Segel Resmi Hologram)',
    bottleCount: 1,
    pillCount: 60,
    weightGrams: 75, // 1 botol berat 75 gram
    retailPrice: 100000,
    affiliateBasePrice: 70000,
    promoPrice: 100000,
    stock: 250,
    description: 'Kombinasi keajaiban alam sumber nabati terbaik di dunia: Omega 3, 6, 9 + Probiotik, EPA DHA & Asam Amino Esensial disetiap kapsul untuk memelihara kesehatan jantung, asam urat, kolesterol, dan vitalitas tubuh harian.',
    keyBenefits: [
      'Isi 1 Botol Resmi (tepat 60 kapsul herbal, berat 75 gram)',
      'Kombinasi Omega 3, 6, 9 + Probiotik, EPA DHA & Asam Amino Esensial',
      'Membantu menjaga kesehatan jantung, sendi & pembuluh darah',
      '100% Nabati Murni Bebas Logam Berat, Izin BPOM RI & Halal MUI'
    ],
    badge: '1 BOTOL (60 KAPSUL)',
    image: PRODUCT_REAL_IMAGE
  },
  {
    id: 'hi-omega-paket-3',
    name: 'PAKET FAMILY',
    subName: 'Paket Family 3 Botol (Total 180 Kapsul - @60 Kapsul/Botol)',
    bottleCount: 3,
    pillCount: 180,
    weightGrams: 225, // 3 botol x 75 gram = 225 gram
    retailPrice: 300000,
    affiliateBasePrice: 200000,
    promoPrice: 275000,
    stock: 95,
    isPopular: true,
    description: 'Paket terapi intensif 3 botol (masing-masing botol berisi 60 kapsul, total 180 kapsul) untuk konsumsi rutin 1 bulan penuh bersama pasangan atau keluarga.',
    keyBenefits: [
      'Isi 3 Botol (Masing-masing botol berisi 60 kapsul @75 gram, total 180 kapsul)',
      'Kombinasi Omega 3, 6, 9 + Probiotik, EPA DHA & Asam Amino Esensial',
      'Lebih hemat Rp 25.000 dibanding pembelian satuan',
      'Cukup untuk program pemulihan 30-45 hari'
    ],
    badge: '3 BOTOL (HEMAT Rp 25.000)',
    image: PRODUCT_REAL_IMAGE
  },
  {
    id: 'hi-omega-member-5',
    name: 'PAKET RESELLER',
    subName: 'Paket Reseller 5 Botol (Total 300 Kapsul - @60 Kapsul/Botol)',
    bottleCount: 5,
    pillCount: 300,
    weightGrams: 375, // 5 botol x 75 gram = 375 gram
    retailPrice: 500000,
    affiliateBasePrice: 350000,
    promoPrice: 350000,
    stock: 120,
    description: 'Hanya Rp 70.000/botol! Paket kemitraan 5 botol (masing-masing botol berisi 60 kapsul, total 300 kapsul). Langsung resmi menjadi Member Affiliate, dapat landing page khusus & bank konten.',
    keyBenefits: [
      'Isi 5 Botol (Masing-masing botol berisi 60 kapsul @75 gram, total 300 kapsul)',
      'Kombinasi Omega 3, 6, 9 + Probiotik, EPA DHA & Asam Amino Esensial',
      'Harga modal super murah: Rp 70.000 / botol',
      'Mendapatkan website landing page khusus dengan nomor WhatsApp Anda'
    ],
    badge: '5 BOTOL (PAKET RESELLER)',
    image: BUNDLE_PACK_IMAGE
  }
];

export interface SymptomDetail {
  id: SymptomCategory;
  name: string;
  iconName: string;
  badge: string;
  headline: string;
  subheadline: string;
  warningText: string;
  symptomsList: string[];
  mechanismTitle: string;
  mechanismSteps: { title: string; desc: string }[];
  highlightQuote: string;
  accentColor: string;
}

export const SYMPTOM_DATA: Record<SymptomCategory, SymptomDetail> = {
  kolesterol: {
    id: 'kolesterol',
    name: 'Kolesterol Tinggi',
    iconName: 'Activity',
    badge: 'BAHAYA PLAK PEMBULUH DARAH',
    headline: 'Sering Pegal di Leher & Pundak? Waspadai Kolesterol Tinggi!',
    subheadline: 'Jangan nebak-nebak, kenali ciri khas kolesterol dan larutkan plak lemak sebelum menyumbat jantung.',
    warningText: 'Kolesterol tinggi sering tanpa gejala awal, namun tiba-tiba memicu serangan jantung dan stroke.',
    symptomsList: [
      'Sering pegal dan kaku di area tengkuk leher & bahu',
      'Dada terasa berat atau seperti tertindih',
      'Cepat lelah walau hanya beraktivitas ringan',
      'Sering kesemutan di ujung jari tangan atau kaki',
      'Kadar LDL & Trigliserida di atas batas normal'
    ],
    mechanismTitle: 'Bagaimana HI-OMEGA Mengatasi Kolesterol?',
    mechanismSteps: [
      { title: 'Melarutkan Plak LDL', desc: 'Asam lemak Omega-3 dan 9 aktif mengikat lemak jahat di dinding pembuluh darah.' },
      { title: 'Meningkatkan Kolesterol Baik (HDL)', desc: 'Membantu organ hati membuang kelebihan kolesterol ke sistem pembuangan.' },
      { title: 'Menurunkan Trigliserida', desc: 'Minyak Sacha Inchi menstabilkan kadar lemak darah secara menyeluruh.' },
      { title: 'Melancarkan Sirkulasi Darah', desc: 'Meringankan beban kerja jantung sehingga rasa pegal di leher cepat lenyap.' }
    ],
    highlightQuote: '“Alhamdulillah setelah 1 minggu minum HI-OMEGA, leher yang kaku bertahun-tahun sudah enteng dan tidak gampang lelah!”',
    accentColor: 'from-amber-600 to-amber-800'
  },
  hipertensi: {
    id: 'hipertensi',
    name: 'Darah Tinggi (Hipertensi)',
    iconName: 'HeartPulse',
    badge: 'SI PEMBUNUH SENYAP (SILENT KILLER)',
    headline: '1 Dari 3 Orang Dewasa di Indonesia Mengidap Hipertensi!',
    subheadline: 'Tekanan darah tinggi yang dibiarkan merusak ginjal, pembuluh darah otak, dan memicu stroke sewaktu-waktu.',
    warningText: 'Data Riskesdas: Lebih dari 34% populasi menderita hipertensi tanpa menyadarinya sampai terjadi komplikasi.',
    symptomsList: [
      'Sering pusing, terutama saat baru bangun di pagi hari',
      'Telinga berdenging dan pandangan berkunang-kunang',
      'Leher belakang dan kepala terasa tegang menegang',
      'Mudah gelisah, berdebar, atau mudah terpancing emosi',
      'Tekanan darah konsisten di atas 130/80 mmHg'
    ],
    mechanismTitle: 'Cara Kerja HI-OMEGA Menurunkan Hipertensi',
    mechanismSteps: [
      { title: 'Mengembalikan Elastisitas Arteri', desc: 'Omega-3 nabati melenturkan dinding pembuluh darah yang kaku akibat penuaan.' },
      { title: 'Menstabilkan Tekanan Sistolik & Diastolik', desc: 'Merangsang pelepasan nitric oxide alami tubuh untuk melebarkan pembuluh darah.' },
      { title: 'Kaya Antioksidan Gamma-Tokoferol', desc: 'Melindungi sel endotel dari stres oksidatif dan pengerasan pembuluh darah.' },
      { title: 'Mengurangi Beban Pompa Jantung', desc: 'Aliran darah lancar tanpa hambatan, detak jantung kembali tenang dan stabil.' }
    ],
    highlightQuote: '“Tensi saya yang biasa 160-an sekarang stabil di 120-130. Kepala tidak lagi cenat-cenut tiap pagi!”',
    accentColor: 'from-rose-600 to-rose-900'
  },
  sendi_tulang: {
    id: 'sendi_tulang',
    name: 'Asam Urat & Nyeri Sendi',
    iconName: 'Bone',
    badge: 'SOLUSI USIA 40 TAHUN KE ATAS',
    headline: 'Tulang Kuat, Hidup Lebih Lama Tanpa Nyeri & Linu!',
    subheadline: 'Bebaskan diri dari nyeri tajam di jempol kaki, linu lutut, sakit pinggang, dan bahaya radang sendi.',
    warningText: 'Penumpukan kristal asam urat yang mengendap merusak tulang rawan dan membatasi mobilitas ibadah Anda.',
    symptomsList: [
      'Nyeri menusuk tajam di sendi jempol kaki, pergelangan, atau lutut',
      'Sendi membengkak, kemerahan, dan terasa panas saat disentuh',
      'Nyeri pinggang dan linu tulang terutama saat bangun tidur',
      'Sulit ditekuk untuk sholat atau berjalan agak jauh',
      'Kadar purin/asam urat tinggi setelah makan jeroan, emping, atau daging'
    ],
    mechanismTitle: 'Mekanisme Pemulihan Sendi HI-OMEGA',
    mechanismSteps: [
      { title: 'Menetralkan Kristal Asam Urat', desc: 'Zat aktif anti-inflamasi alami mempercepat pelarutan kristal asam urat di persendian.' },
      { title: 'Melumasi Tulang Rawan', desc: 'Minyak kelapa murni (VCO) dan omega nabati mengisi cairan sinovial sendi.' },
      { title: 'Meredakan Radang & Panas', desc: 'Menurunkan mediator nyeri tubuh tanpa efek samping merusak lambung.' },
      { title: 'Memperkuat Kepadatan Tulang', desc: 'Membantu penyerapan kalsium dan fosfat agar terhindar dari osteoporosis usia lanjut.' }
    ],
    highlightQuote: '“Kemarin jalan sebentar ngos-ngosan dan jempol kaki sakit nyut-nyutan. Sekarang sudah bisa jalan ke mesjid dengan nyaman!” — Pak Wanto (Surabaya)',
    accentColor: 'from-blue-600 to-blue-900'
  },
  jantung: {
    id: 'jantung',
    name: 'Jantung & Sirkulasi',
    iconName: 'Heart',
    badge: 'PERLINDUNGAN JANTUNG OPTIMAL',
    headline: 'Jaga Detak Sehat Jantung Anda & Bersihkan Pembuluh Darah',
    subheadline: 'Kombinasi Omega 3, 6, 9 murni melindungi otot jantung dari serangan mendadak dan aritmia.',
    warningText: 'Penyakit jantung koroner merupakan penyebab kematian nomor satu di Indonesia.',
    symptomsList: [
      'Dada terasa sesak atau terhimpit saat lelah',
      'Napas tersengal-sengal saat menaiki tangga',
      'Jantung sering berdebar tidak beraturan',
      'Kaki atau pergelangan sering membengkak karena sirkulasi melambat',
      'Riwayat keluarga dengan penyakit kardiovaskular'
    ],
    mechanismTitle: 'Keunggulan HI-OMEGA untuk Jantung',
    mechanismSteps: [
      { title: 'Menjaga Irama Jantung', desc: 'EPA & DHA alami menstabilkan ritme elektrik otot miokardium.' },
      { title: 'Mencegah Pembekuan Darah', desc: 'Sifat anti-trombogenik mencegah gumpalan darah menyumbat arteri koroner.' },
      { title: 'Melindungi Sel Jantung dari Oksidasi', desc: 'Kaya polifenol alami untuk melawan radikal bebas dalam darah.' },
      { title: 'Meningkatkan Pasokan Oksigen', desc: 'Aliran darah lancar membawa oksigen segar ke seluruh jaringan tubuh.' }
    ],
    highlightQuote: '“Dada plong, napas lega. Badan terasa jauh lebih bugar dan bertenaga!”',
    accentColor: 'from-emerald-700 to-teal-900'
  },
  diabetes: {
    id: 'diabetes',
    name: 'Diabetes & Gula Darah',
    iconName: 'Droplets',
    badge: 'DARURAT DIABETES NASIONAL',
    headline: 'Kendalikan Lonjakan Gula Darah dengan Solusi Nabati Teruji',
    subheadline: 'Membantu kerja pankreas, meningkatkan sensitivitas insulin, dan melindungi saraf dari kerusakan diabetes.',
    warningText: 'Lebih dari 20,4 Juta jiwa di Indonesia hidup dengan diabetes dan berisiko komplikasi luka menahun.',
    symptomsList: [
      'Sering haus berlebihan dan sering buang air kecil di malam hari',
      'Cepat merasa lapar padahal baru saja makan',
      'Luka di kulit lambat sembuh atau sering gatal di lipatan tubuh',
      'Mata cepat kabur dan badan terasa loyo/mengantuk sepanjang hari',
      'Gula darah sewaktu sering di atas 200 mg/dL'
    ],
    mechanismTitle: 'Peran Sacha Inchi pada Pasien Diabetes',
    mechanismSteps: [
      { title: 'Meningkatkan Sensitivitas Insulin', desc: 'Membantu sel tubuh menyerap glukosa darah menjadi energi aktif secara efektif.' },
      { title: 'Melindungi Sel Beta Pankreas', desc: 'Kandungan antioksidan tinggi mencegah kerusakan sel penghasil insulin.' },
      { title: 'Memperlambat Penyerapan Gula', desc: 'Mencegah lonjakan tajam kadar glukosa setelah mengonsumsi karbohidrat.' },
      { title: 'Mencegah Neuropati Diabetik', desc: 'Menjaga saraf tepi agar tidak mati rasa atau kesemutan parah.' }
    ],
    highlightQuote: '“Gula darah puasa yang tadinya 240, sekarang rutin di angka 135. Dokter saya ikut senang dengan kemajuannya!”',
    accentColor: 'from-teal-600 to-teal-900'
  },
  lambung: {
    id: 'lambung',
    name: 'Lambung, Maag & Sembelit',
    iconName: 'ShieldAlert',
    badge: 'PENCERNAAN NYAMAN & SEHAT',
    headline: 'Bebas Perih Maag, Gerd, dan Susah Buang Air Besar (Sembelit)',
    subheadline: 'Minyak kelapa murni & serat alami Sacha Inchi meredakan asam lambung dan melancarkan saluran cerna.',
    warningText: 'Asam lambung yang naik terus-menerus bisa mengikis kerongkongan dan menimbulkan rasa sesak di ulu hati.',
    symptomsList: [
      'Perut terasa begah, kembung, dan sering bersendawa asam',
      'Sensasi panas terbakar (heartburn) menjalar ke dada & tenggorokan',
      'Perih melilit di ulu hati jika telat makan',
      'BAB keras, tidak teratur, atau harus mengejan kuat berhari-hari',
      'Mudah mual dan nafsu makan menurun'
    ],
    mechanismTitle: 'Solusi Pencernaan Alami HI-OMEGA',
    mechanismSteps: [
      { title: 'Melapisi Mukosa Lambung', desc: 'VCO bertindak sebagai perisai alami melindungi dinding lambung dari asam korosif.' },
      { title: 'Meredakan Peradangan & Iritasi', desc: 'Sifat anti-bakteri dan anti-inflamasi menenangkan lambung yang meradang.' },
      { title: 'Merangsang Gerak Peristaltik Usus', desc: 'Melunakkan volume tinja secara alami sehingga buang air besar lancar setiap pagi.' },
      { title: 'Meningkatkan Penyerapan Nutrisi', desc: 'Enzim pencernaan bekerja optimal mengurai makanan tanpa kembung.' }
    ],
    highlightQuote: '“Tiap pagi sudah tidak sembelit lagi, perut adem dan tidak pernah mual perih sehabis makan.”',
    accentColor: 'from-emerald-600 to-green-900'
  },
  stroke_otak: {
    id: 'stroke_otak',
    name: 'Stroke & Pemulihan Saraf',
    iconName: 'Brain',
    badge: 'REHABILITASI & REGENERASI SARAF',
    headline: 'Dukung Pemulihan Otak & Lindungi Diri dari Risiko Stroke Ulang',
    subheadline: 'Nutrisi tinggi EPA & DHA untuk membantu regenerasi sel saraf, memulihkan gerak motorik, dan mempertajam memori.',
    warningText: 'Penyumbatan pembuluh darah otak sekecil apa pun dapat merenggut kemandirian hidup Anda.',
    symptomsList: [
      'Salah satu sisi tubuh terasa kebas, lemah, atau berat digerakkan',
      'Bicara sempat pelo, pelo ringan, atau sulit merangkai kata',
      'Sering lupa mendadak, sulit konsentrasi, atau kepala berat',
      'Pernah divonis ada penyumbatan kecil di hasil CT-scan kepala',
      'Mudah oleng saat berdiri atau berjalan'
    ],
    mechanismTitle: 'Tahapan Pemulihan Otak dengan HI-OMEGA',
    mechanismSteps: [
      { title: 'Membuka Sirkulasi Darah Otak', desc: 'Mencegah pembentukan gumpalan fibrin dan melancarkan mikrosirkulasi kapiler otak.' },
      { title: 'Regenerasi Membran Sel Saraf', desc: 'DHA nabati merupakan komponen utama pembentuk 30% lemak otak manusia.' },
      { title: 'Menekan Keradangan Pasca-Stroke', desc: 'Membantu pemulihan koneksi sinaps antar saraf yang sempat terganggu.' },
      { title: 'Mempertajam Fokus & Daya Ingat', desc: 'Mengurangi rasa kantuk berlebih di siang hari dan menenangkan pikiran.' }
    ],
    highlightQuote: '“Tangan ayah saya yang tadinya kaku pasca stroke, perlahan mulai bisa menggenggam cangkir kembali setelah 3 minggu konsumsi rutin.”',
    accentColor: 'from-indigo-600 to-indigo-950'
  },
  paru_respirasi: {
    id: 'paru_respirasi',
    name: 'Paru-paru & Pernapasan',
    iconName: 'Wind',
    badge: '100% ALAMI PEGUNUNGAN',
    headline: 'Keajaiban Minyak Sacha Inchi untuk Paru-paru & Napas Lega',
    subheadline: 'Nutrisi penting untuk memperkuat kapasitas saluran pernapasan, meredakan batuk menahun, dan proteksi dari polusi.',
    warningText: 'Polusi udara kota dan asap rokok mempercepat kerusakan alveolus dan menurunkan imunitas pernapasan.',
    symptomsList: [
      'Napas terasa pendek-pendek atau berbunyi ngik-ngik',
      'Sering batuk berkepanjangan dan dahak sulit keluar',
      'Dada terasa berat saat berada di udara dingin atau berdebu',
      'Riwayat perokok aktif maupun terpapar asap rokok orang lain',
      'Imunitas paru-paru mudah drop jika cuaca ekstrem'
    ],
    mechanismTitle: 'Perlindungan Paru-paru HI-OMEGA',
    mechanismSteps: [
      { title: 'Membersihkan Saluran Pernapasan', desc: 'Antioksidan alami membantu meluruhkan lendir tebal di bronkus.' },
      { title: 'Meredakan Inflamasi Paru-Paru', desc: 'Menghambat mediator radang pada dinding saluran udara.' },
      { title: 'Meningkatkan Kapasitas Oksigen', desc: 'Alveolus lebih lentur menyerap oksigen masuk ke aliran darah.' },
      { title: 'Memperkuat Imunitas Respiratori', desc: 'Membentengi tubuh dari infeksi virus dan bakteri musiman.' }
    ],
    highlightQuote: '“Napas jadi plong, tidak gampang sesak lagi saat jalan pagi di udara dingin.”',
    accentColor: 'from-amber-700 to-amber-950'
  },
  ibu_anak: {
    id: 'ibu_anak',
    name: 'Ibu Hamil & Kecerdasan Anak',
    iconName: 'Baby',
    badge: 'SUPERFOOD BEBAS MERKURI',
    headline: 'Rahasia Kecerdasan Anak & Vitalitas Ibu Hamil / Menyusui',
    subheadline: 'Sumber Omega-3 nabati murni tanpa risiko kontaminasi logam berat merkuri dari laut dalam.',
    warningText: 'Nutrisi di 1.000 hari pertama kehidupan sangat menentukan potensi IQ dan daya tahan tubuh anak.',
    symptomsList: [
      'Anak sulit fokus belajar dan gampang lelah saat di sekolah',
      'Ibu hamil sering lemas, tensi tidak stabil, atau kurang gizi',
      'Produksi ASI terasa kurang melimpah atau encer',
      'Khawatir mengonsumsi minyak ikan laut karena risiko merkuri dan bau amis',
      'Ingin anak memiliki daya ingat tajam dan mata sehat'
    ],
    mechanismTitle: 'Kebaikan untuk Dua Generasi',
    mechanismSteps: [
      { title: 'Pembentukan Sel Otak Janin & Anak', desc: 'DHA nabati murni merangsang pertumbuhan miliaran sel saraf otak anak.' },
      { title: 'Meningkatkan Kualitas & Volume ASI', desc: 'Kaya asam lemak esensial yang diteruskan langsung ke bayi lewat ASI.' },
      { title: 'Menjaga Ketajaman Penglihatan Mata', desc: 'Menutrisi fotoreseptor retina mata agar anak terhindar dari mata lelah gadget.' },
      { title: '100% Aman & Tanpa Bau Amis', desc: 'Kapsul nabati lembut, mudah ditelan, dan tidak menyebabkan mual.' }
    ],
    highlightQuote: '“Anak saya sekarang jauh lebih fokus belajar di kelas, dan nilainya meningkat pesat!”',
    accentColor: 'from-rose-500 to-pink-800'
  },
  pengentalan_darah: {
    id: 'pengentalan_darah',
    name: 'Pengentalan Darah',
    iconName: 'Droplets',
    badge: 'PENCEGAHAN TROMBOSIS & SUMBATAN',
    headline: 'Aliran Darah Kental Menghambat Oksigen ke Otak & Organ Vital',
    subheadline: 'Asam lemak tak jenuh ganda mengencerkan darah secara alami tanpa efek samping perdarahan.',
    warningText: 'Darah yang terlalu kental membebani kerja pompa jantung dan memicu pembekuan darah (trombosis).',
    symptomsList: [
      'Sering kesemutan menahun di jari-jari tangan dan kaki',
      'Sakit kepala berat, pusing berputar, dan pandangan berkunang-kunang',
      'Tangan dan telapak kaki sering terasa dingin atau membiru',
      'Badan cepat lelah, loyo, dan sering mengantuk di siang hari',
      'Hasil tes D-Dimer atau kekentalan darah di atas normal'
    ],
    mechanismTitle: 'Bagaimana HI-OMEGA Mengatasi Pengentalan Darah?',
    mechanismSteps: [
      { title: 'Anti-Agregasi Trombosit Alami', desc: 'Mencegah keping darah saling menempel dan menggumpal di pembuluh.' },
      { title: 'Mengencerkan Viskositas Darah', desc: 'Omega-3 meningkatkan fluiditas membran eritrosit sehingga darah mengalir lancar.' },
      { title: 'Melancarkan Mikrosirkulasi', desc: 'Menjangkau pembuluh kapiler terkecil di ujung jari dan otak.' },
      { title: 'Meningkatkan Pasokan Oksigen Sel', desc: 'Tubuh terasa lebih bugar, bebas kesemutan, dan kepala terasa ringan.' }
    ],
    highlightQuote: '“Darah kental saya normal kembali, kesemutan di tangan dan kaki hilang total setelah rutin minum HI-OMEGA.”',
    accentColor: 'from-red-600 to-rose-900'
  },
  otak_anak: {
    id: 'otak_anak',
    name: 'Kecerdasan Otak Anak',
    iconName: 'Brain',
    badge: 'NUTRISI EMAS PERKEMBANGAN OTAK',
    headline: 'Optimalkan Potensi IQ, Daya Ingat & Konsentrasi Anak Sejak Dini',
    subheadline: 'DHA & EPA nabati murni bebas merkuri laut untuk menutrisi miliaran sinaps sel saraf otak anak.',
    warningText: 'Kekurangan asam lemak esensial Omega-3 pada masa pertumbuhan dapat menghambat daya tangkap dan fokus belajar.',
    symptomsList: [
      'Anak sulit fokus belajar dan gampang terdistraksi',
      'Daya ingat kurang tajam, sering lupa materi pelajaran',
      'Mata cepat lelah akibat paparan layar gadget / ponsel',
      'Gampang lemas, kurang berenergi saat aktivitas sekolah',
      'Susah mengonsumsi suplemen ikan laut karena bau amis atau mual'
    ],
    mechanismTitle: 'Mekanisme HI-OMEGA Menutrisi Otak Anak',
    mechanismSteps: [
      { title: 'Membangun Membran Sel Saraf Otak', desc: 'DHA nabati adalah blok pembangun esensial jaringan abu-abu otak.' },
      { title: 'Meningkatkan Kecepatan Hantaran Sinaps', desc: 'Mempercepat transmisi sinyal saraf sehingga anak lebih tanggap dan kritis.' },
      { title: 'Melindungi Retina & Penglihatan', desc: 'Menutrisi makula mata anak dari kerusakan cahaya biru gadget.' },
      { title: '100% Nabati Murni Bebas Merkuri', desc: 'Aman untuk anak, kapsul lembut bisa digunting dan dicampur ke susu atau madu.' }
    ],
    highlightQuote: '“Anak saya sekarang jauh lebih fokus belajar, daya ingatnya meningkat dan prestasinya naik!”',
    accentColor: 'from-amber-600 to-orange-800'
  },
  anxiety_depresi: {
    id: 'anxiety_depresi',
    name: 'Depresi & Anxiety (Kecemasan)',
    iconName: 'Heart',
    badge: 'PENENANG SISTEM SARAF ALAMI',
    headline: 'Atasi Rasa Cemas Berlebih, Panic Attack & Gangguan Suasana Hati',
    subheadline: 'EPA & DHA nabati menyeimbangkan neurotransmitter serotonin & dopamin untuk pikiran tenang dan tidur lelap.',
    warningText: 'Peradangan kronis pada sistem saraf pusat terbukti memicu gangguan kecemasan (anxiety) dan depresi berkepanjangan.',
    symptomsList: [
      'Sering cemas mendadak, gelisah, atau jantung berdebar kencang (panic attack)',
      'Susah tidur nyenyak (insomnia) dan pikiran overthinking di malam hari',
      'Sering keringat dingin, nafas sesak tanpa sebab fisik yang jelas',
      'Suasana hati (mood) mudah drop, murung, dan kehilangan motivasi',
      'Otot pundak dan rahang sering tegang tanpa disadari'
    ],
    mechanismTitle: 'Cara Kerja HI-OMEGA Menenangkan Pikiran',
    mechanismSteps: [
      { title: 'Meredakan Neuroinflamasi Otak', desc: 'EPA menurunkan senyawa sitokin radang yang memicu kecemasan di otak.' },
      { title: 'Mendukung Sintesis Serotonin & Dopamin', desc: 'Menyeimbangkan hormon bahagia alami tubuh untuk stabilitas emosi.' },
      { title: 'Menstabilkan Respon Saraf Otonom', desc: 'Menenangkan denyut jantung berdebar dan mengurangi serangan panik.' },
      { title: 'Meningkatkan Kualitas Tidur', desc: 'Membantu tubuh rileks alami sehingga bangun pagi terasa segar dan tenang.' }
    ],
    highlightQuote: '“Tidur saya jauh lebih nyenyak, dada yang sering berdebar cemas sekarang tenang sekali.”',
    accentColor: 'from-violet-700 to-indigo-900'
  },
  autoimun: {
    id: 'autoimun',
    name: 'Auto Imun & Imunitas Tubuh',
    iconName: 'ShieldCheck',
    badge: 'MODULASI SISTEM KEKEBALAN ALAMI',
    headline: 'Keseimbangan Respon Imun Alami Tanpa Menekan Daya Tahan Tubuh',
    subheadline: 'Perpaduan Sacha Inchi + VCO meredakan badai sitokin dan meregulasi sel imunitas yang menyerang tubuh sendiri.',
    warningText: 'Penyakit autoimun memicu peradangan kronis pada organ, sendi, dan kulit jika sistem imun tidak dimodulasi.',
    symptomsList: [
      'Sering lelah ekstrem (fatigue) berkepanjangan tanpa sebab jelas',
      'Nyeri sendi dan otot berpindah-pindah disertai radang',
      'Ruam merah di kulit, sensitif terhadap sinar matahari atau alergi makanan',
      'Pencernaan sensitif (leaky gut) dan sering kambuh saat stres',
      'Kadar inflamasi tubuh (CRP / LED) sering menunjukkan angka tinggi'
    ],
    mechanismTitle: 'Peran Modulator Imun HI-OMEGA',
    mechanismSteps: [
      { title: 'Imunomodulator Alami', desc: 'Menyeimbangkan rasio sel T-helper tanpa menurunkan imunitas pertahanan tubuh.' },
      { title: 'Menekan Badai Sitokin Radang', desc: 'Omega-3 menghentikan produksi prostaglandin dan leukotrien perusak sel.' },
      { title: 'Memulihkan Integritas Dinding Usus', desc: 'Asam Laurat VCO memperbaiki mikrobioma usus dan mencegah leaky gut.' },
      { title: 'Regenerasi Sel Tubuh', desc: 'Antioksidan tokoferol melindungi jaringan tubuh yang meradang agar cepat pulih.' }
    ],
    highlightQuote: '“Kambuh-kambuhan autoimun saya berkurang drastis, badan jauh lebih kuat dan tidak gampang drop!”',
    accentColor: 'from-teal-700 to-emerald-900'
  },
  kanker: {
    id: 'kanker',
    name: 'Kanker (Uji Lab & Pendamping Terapi)',
    iconName: 'Shield',
    badge: 'TERAPI SUPORTIF & UJI LABORATORIUM',
    headline: 'Dukungan Nutrisi Alami Berdasarkan Uji Laboratorium dan Terapi Pendamping',
    subheadline: 'Sifat antiproliferatif PUFA nabati dan peran probiotik dalam meredakan efek samping kemoterapi & radioterapi.',
    warningText: 'Uji klinis menunjukkan terapi suportif nutrisi dan mikrobioma usus yang seimbang sangat membantu stamina selama terapi medis.',
    symptomsList: [
      'Menjalani kemoterapi atau radioterapi yang memicu mual, lemas, dan penurunan selera makan',
      'Gangguan pencernaan, mukositis (radang usus), dan diare akibat efek pengobatan',
      'Daya tahan tubuh sangat rentan terhadap infeksi bakteri dan virus oportunistik',
      'Membutuhkan perlindungan antioksidan tinggi melawan kerusakan radikal bebas DNA'
    ],
    mechanismTitle: 'Bagaimana HI-OMEGA Mendukung Terapi Kanker?',
    mechanismSteps: [
      { title: 'Aktivitas Antiproliferatif PUFA', desc: 'Uji in vitro laboratorium membuktikan PUFA sacha inchi merusak membran sel abnormal dan memicu apoptosis.' },
      { title: 'Senyawa Fenolik & Flavonoid', desc: 'Antioksidan kuat yang menetralkan radikal bebas pemicu mutasi DNA sel sehat.' },
      { title: 'Meredakan Efek Kemoterapi', desc: 'Probiotik membantu meredakan mual, diare, dan peradangan mukosa usus pasca-kemoterapi.' },
      { title: 'Mendukung Respon Imunoterapi', desc: 'Keseimbangan mikrobiota usus meningkatkan daya tahan tubuh melawan infeksi sekunder.' }
    ],
    highlightQuote: '“Uji in vitro membuktikan ekstrak Sacha Inchi memiliki aktivitas antiproliferatif dan memicu apoptosis sel abnormal.”',
    accentColor: 'from-rose-700 to-red-900'
  },
  degeneratif: {
    id: 'degeneratif',
    name: 'Penyakit Degeneratif & Penuaan Organ',
    iconName: 'Layers',
    badge: 'PERISAI PENUAAN DINI SEL & ORGAN',
    headline: 'Cegah dan Kendalikan Kerusakan Sel Akibat Penyakit Degeneratif',
    subheadline: 'Nutrisi asam lemak tak jenuh ganda (PUFA), kalium, dan tokoferol melawan stres oksidatif perusak organ vital seiring bertambahnya usia.',
    warningText: 'Penyakit degeneratif bermula dari peradangan kronis menahun yang merusak organ vital bila tidak diproteksi sejak dini.',
    symptomsList: [
      'Fungsi organ vital (jantung, pembuluh darah, pankreas, ginjal) mulai menurun',
      'Persendian sering kaku, linu menahun (osteoarthritis) saat bergerak',
      'Daya ingat dan konsentrasi sering menurun (gejala demensia / pikun)',
      'Gula darah, tensi, dan kolesterol sering tidak stabil bersamaan'
    ],
    mechanismTitle: 'Cara Kerja HI-OMEGA Menangani Kondisi Degeneratif',
    mechanismSteps: [
      { title: 'Perbaikan Integritas Membran Sel', desc: 'Omega-3 nabati menjaga keutuhan membran sel di seluruh sistem organ tubuh.' },
      { title: 'Kalium & Kelancaran Vaskular', desc: 'Meningkatkan sirkulasi darah dan menurunkan tekanan darah tinggi secara alami.' },
      { title: 'Produksi SCFA Pelindung Saraf', desc: 'Probiotik usus memproduksi asam lemak rantai pendek yang melindungi sawar otak (blood-brain barrier).' },
      { title: 'Peredam Inflamasi Kronis', desc: 'Menekan proses peradangan mikro menahun yang memicu penuaan organ dini.' }
    ],
    highlightQuote: '“Badan yang biasanya sering pegal linu dan cepat letih di usia 50-an sekarang terasa bertenaga dan segar kembali.”',
    accentColor: 'from-indigo-700 to-slate-900'
  },
  kulit_penuaan: {
    id: 'kulit_penuaan',
    name: 'Kesehatan Kulit & Anti Penuaan Dini',
    iconName: 'Sparkles',
    badge: 'DERMATOLOGI & SKIN BARRIER',
    headline: 'Kulit Kencang, Lembap Mendalam & Bebas Kerutan (Bisa Diminum & Dioleskan)',
    subheadline: 'Kaya Omega 3-6-9, Vitamin E, Vitamin A, dan Probiotik. Dapat diminum harian atau dioleskan langsung pada kulit dan rambut.',
    warningText: 'Sinar UV dan radikal bebas merusak kolagen kulit setiap hari. Perkuat skin barrier dari dalam dan luar.',
    symptomsList: [
      'Garis-garis halus, kerutan di wajah, dan bintik-bintik hitam (age spots) mulai muncul',
      'Kulit terasa kering, bersisik, sensitif, mudah memerah, atau eksim kambuhan',
      'Rambut rontok, kusam, kering bercabang, dan kulit kepala berminyak tidak seimbang',
      'Lapisan pelindung kulit (skin barrier) melemah akibat polusi dan penuaan dini'
    ],
    mechanismTitle: 'Keajaiban HI-OMEGA untuk Kulit & Rambut',
    mechanismSteps: [
      { title: 'Memperkuat Skin Barrier', desc: 'Asam lemak esensial menghidrasi kulit secara mendalam tanpa menyumbat pori-pori (non-comedogenic).' },
      { title: 'Menyamarkan Garis Halus & Kerutan', desc: 'Antioksidan tokoferol dan vitamin A merangsang regenerasi sel dan produksi kolagen alami.' },
      { title: 'Perawatan Kulit Kepala & Rambut', desc: 'Mengatur produksi sebum, menyehatkan folikel rambut, dan mengatasi rambut kusam bercabang.' },
      { title: 'Keseimbangan pH & Mikrobioma Kulit', desc: 'Probiotik mengembalikan keasaman alami kulit untuk menangkal bakteri jerawat.' }
    ],
    highlightQuote: '“Selain diminum, saya gunting kapsulnya untuk serum wajah malam hari. Kulit bangun pagi kenyal dan flek hitam memudar!”',
    accentColor: 'from-pink-600 to-rose-800'
  },
  semua: {
    id: 'semua',
    name: 'Semua Khasiat (Superfood Lengkap)',
    iconName: 'Sparkles',
    badge: 'SUPERFOOD KELUARGA LENGKAP',
    headline: 'Kombinasi Keajaiban Alam Sumber Nabati Terbaik di Dunia: Omega 3, 6, 9 + Probiotik, EPA DHA & Asam Amino Esensial Disetiap Kapsul',
    subheadline: 'Kombinasi nutrisi nabati terlengkap di dunia: Omega 3, 6, 9, Probiotik, EPA DHA, VCO & Asam Amino Esensial dalam satu kapsul.',
    warningText: 'Jangan Tunggu Sakit Semakin Parah Merawat Dan Mencegah Sejak Dini Jauh Lebih Murah Daripada Biaya Rumah Sakit',
    symptomsList: [
      'Sering Kesemutan, Sakit Kepala, Pundak Terasa berat, Mudah Marah',
      'Wajah Tampak Kusam, Kulit Keriput dan Penuaan Dini',
      'Sering Sakit Pada Tulang Dan Persendian, Linu-Linu Dan Asam Urat',
      'Mudah Cemas, Jantung Berdebar, Sering Keringat Dingin Dan Mudah Lupa'
    ],
    mechanismTitle: 'Kandungan Utama HI-OMEGA',
    mechanismSteps: [
      { title: 'Omega-3', desc: '17x lipat lebih tinggi dari minyak ikan salmon, menjada pembuluh darah & otak.' },
      { title: 'EPA & DHA', desc: 'Menjaga Kesehatan Jantung, MengOptimalkan Fungsi Otak, Serta Mengurangi Peradangan Dalam Tubuh, Juga Meringankan Depresi Dan Stress' },
      { title: 'Omega-6 & Omega-9 Seimbang', desc: 'Rasio alami ideal untuk menyeimbangkan metabolisme lemak dan metabolisme gula.' },
      { title: 'Probiotik Berupa VCO', desc: 'Menyeimbangkan Bakteri Di Saluran Pencernaan dan Meningkatkan Sel Kekebalan Tubuh Untuk Melawan Penyakit' },
      { title: 'Tinggi Antioksidan', desc: 'Melindungi dan Meregenerasi Sel Tubuh Dari Penuaan Dini dan Radikal Bebas.' }
    ],
    highlightQuote: '“Tubuh Manusia Tidak Dapat Memproduksi OMEGA-3, Sehingga Harus Di Dapatkan Dari Makanan / Suplemen Seperti Hi-OMEGA”',
    accentColor: 'from-emerald-600 to-teal-800'
  }
};

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-001',
    username: 'ahmadherbal',
    password: 'ahmad123',
    fullName: 'H. Ahmad Supriyadi',
    whatsapp: '081234567890',
    email: 'ahmad.herbal@gmail.com',
    customSlug: 'ahmadherbal',
    customPricePerBottle: 120000,
    status: 'active',
    initialOrderPcs: 10,
    totalSoldPcs: 342,
    totalCommissionRp: 17100000,
    bankName: 'BCA',
    bankAccountNumber: '8210394821',
    bankAccountHolder: 'Ahmad Supriyadi',
    registeredAt: '2026-08-10'
  },
  {
    id: 'mem-002',
    username: 'siti_omega',
    password: 'siti123',
    fullName: 'Hj. Siti Rahayu, S.Farm',
    whatsapp: '085712345678',
    email: 'sitirahayu@yahoo.com',
    customSlug: 'siti_omega',
    customPricePerBottle: 110000,
    status: 'active',
    initialOrderPcs: 5,
    totalSoldPcs: 218,
    totalCommissionRp: 8720000,
    bankName: 'Mandiri',
    bankAccountNumber: '1370009821234',
    bankAccountHolder: 'Siti Rahayu',
    registeredAt: '2026-08-25'
  },
  {
    id: 'mem-003',
    username: 'budi_sehat',
    password: 'budi123',
    fullName: 'Budi Hartono',
    whatsapp: '082198765432',
    email: 'budihartono.sehat@gmail.com',
    customSlug: 'budi_sehat',
    customPricePerBottle: 125000,
    status: 'active',
    initialOrderPcs: 5,
    totalSoldPcs: 165,
    totalCommissionRp: 9075000,
    bankName: 'BRI',
    bankAccountNumber: '020601009876504',
    bankAccountHolder: 'Budi Hartono',
    registeredAt: '2026-09-02'
  },
  {
    id: 'mem-004',
    username: 'dewikartika',
    password: 'dewi123',
    fullName: 'Dewi Kartika',
    whatsapp: '081399887766',
    email: 'dewikartika.shop@gmail.com',
    customSlug: 'dewikartika',
    customPricePerBottle: 115000,
    status: 'pending',
    initialOrderPcs: 5,
    totalSoldPcs: 12,
    totalCommissionRp: 540000,
    bankName: 'BSI',
    bankAccountNumber: '7123984712',
    bankAccountHolder: 'Dewi Kartika',
    registeredAt: '2026-09-26'
  }
];

export const INITIAL_TRACKING: TrackingPixels = {
  metaPixelIds: ['928374928172635'],
  metaHtmlSnippets: [
    `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '928374928172635');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`
  ],
  googlePixelIds: ['AW-11928374829'],
  googleHtmlSnippets: [
    `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-11928374829"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-11928374829');
</script>`
  ],
  tiktokPixelIds: ['C9K12L8MN4OPQ5R'],
  tiktokHtmlSnippets: [
    `<!-- TikTok Pixel Code -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('C9K12L8MN4OPQ5R');
  ttq.page();
}(window, document, 'ttq');
</script>`
  ],
  gtmIds: ['GTM-HIOMEGA01'],
  gtmHtmlSnippets: [
    `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-HIOMEGA01');</script>
<!-- End Google Tag Manager -->`
  ],
  gaIds: ['G-HIOMEGA999'],
  gaHtmlSnippets: [
    `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HIOMEGA999"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HIOMEGA999');
</script>`
  ]
};

export const INITIAL_SETTINGS: SiteSettings = {
  theme: 'emerald',
  language: 'id',
  backgroundMusicEnabled: false,
  backgroundMusicVolume: 0.35,
  selectedMusicTrack: 'herbal_zen',
  memberRegistrationEnabled: true,
  captchaEnabled: true,
  csWhatsapp: '0856-0774-6508',
  csName: 'Admin Konsultasi Resmi HI-OMEGA',
  officialAddress: 'Gedung Herbal Natural Center, Jl. Sacha Inchi Sehat No. 88, Indonesia',
  seo: {
    title: 'HI-OMEGA - Solusi Alami Sacha Inchi Superfood & Platform Affiliate',
    metaDescription: 'Website resmi HI-OMEGA kapsul Sacha Inchi & VCO. Bantu atasi kolesterol, nyeri sendi asam urat, hipertensi darah tinggi, diabetes & jantung.',
    keywords: 'hi omega, sacha inchi, sacha inchi vco, obat kolesterol alami, obat asam urat, obat darah tinggi, herbal jantung, suplemen orang tua, affiliate hi omega',
    canonicalUrl: 'https://hi-omega.com',
    ogImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200',
    focusKeywords: ['sacha inchi', 'hi omega', 'kolesterol', 'hipertensi', 'asam urat', 'affiliate herbal'],
    schemaMarkupJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "HI-OMEGA Sacha Inchi + VCO Capsules",
      "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200",
      "description": "Kapsul herbal superfood alami kaya Omega 3, 6, 9 dan Virgin Coconut Oil untuk memelihara kesehatan jantung, kolesterol, sendi dan tekanan darah.",
      "brand": {
        "@type": "Brand",
        "name": "HI-OMEGA"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://hi-omega.com",
        "priceCurrency": "IDR",
        "price": "100000",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "HI-OMEGA Indonesia"
        }
      }
    }, null, 2)
  },
  images: {
    logoUrl: '',
    heroBannerUrl: HERO_BANNER_IMAGE,
    productMainUrl: PRODUCT_REAL_IMAGE,
    productBoxUrl: SOFTGELS_SPILL_IMAGE,
    carouselImages: [
      PRODUCT_REAL_IMAGE,
      SOFTGELS_SPILL_IMAGE,
      BUNDLE_PACK_IMAGE
    ],
    footerImageUrl: ''
  }
};

export const CONTENT_BANK: ContentAsset[] = [
  {
    id: 'cnt-1',
    title: 'Flyer Edukasi: Bedakan Kolesterol, Asam Urat & Darah Tinggi',
    category: 'flyer',
    description: 'Panduan visual perbandingan gejala kolesterol vs asam urat vs hipertensi. Sangat efektif untuk menarik perhatian calon pembeli usia 40+.',
    imageUrl: PRODUCT_REAL_IMAGE,
    downloadUrl: PRODUCT_REAL_IMAGE,
    tags: ['Kolesterol', 'Asam Urat', 'Hipertensi', 'Infografis']
  },
  {
    id: 'cnt-2',
    title: 'Flyer Edukasi: Solusi Sendi Kuat & Bebas Linu di Usia 40+',
    category: 'flyer',
    description: 'Menampilkan keunggulan formula Sacha Inchi + VCO untuk melumasi sendi, menghilangkan sakit pinggang dan linu tulang.',
    imageUrl: SOFTGELS_SPILL_IMAGE,
    downloadUrl: SOFTGELS_SPILL_IMAGE,
    tags: ['Sendi', 'Tulang', 'Lansia', 'Asam Urat']
  },
  {
    id: 'cnt-3',
    title: 'Copywriting WhatsApp: Broadcast Edukasi Pegal Leher & Kolesterol',
    category: 'copywriting',
    description: 'Format pesan siap kirim untuk status WA atau broadcast kontak WhatsApp yang mengeluh sering pusing & leher kaku.',
    copyText: `Sering merasa leher belakang kaku dan pundak pegal seperti memikul beban berat? 😣

Hati-hati, itu salah satu tanda aliran darah mulai tersumbat plak kolesterol jahat (LDL)! Jangan tunggu sampai terjadi serangan mendadak di jalan.

Kini hadir solusi nabati alami terbaik: *HI-OMEGA Sacha Inchi + VCO Capsules* 🌿
✅ 17x lebih kaya Omega-3 dibanding minyak ikan salmon
✅ Melarutkan plak kolesterol & menstabilkan tensi
✅ 100% Herbal Bersertifikat Resmi BPOM & Halal

Spesial hari ini bisa konsultasi GRATIS & pesan langsung di:
👉 [LINK_AFFILIATE_ANDA]

Semoga kita dan keluarga selalu diberikan nikmat kesehatan! Aamiin. 🙏`,
    tags: ['WhatsApp Copy', 'Kolesterol', 'Broadcast']
  },
  {
    id: 'cnt-4',
    title: 'Copywriting Instagram / Facebook: Solusi Tulang & Lutut Linu',
    category: 'copywriting',
    description: 'Teks copywriting menggugah empati untuk target anak yang ingin membelikan orang tua suplemen kesehatan sendi.',
    copyText: `Pernahkah melihat orang tua kita meringis kesakitan saat hendak berdiri dari sholat atau jalan pagi? 🥺

Di usia 40 tahun ke atas, cairan pelumas sendi berkurang drastis dan kristal asam urat mudah mengendap di sela-sela tulang.

Hadiahkan yang terbaik untuk orang tua tercinta: *HI-OMEGA Sacha Inchi + VCO*! 💚
Kapsul alami tanpa bahan kimia, bekerja melumasi sendi yang kaku, meredakan bengkak asam urat, dan menguatkan kepadatan tulang.

Info & Pemesanan resmi bergaransi:
👉 [LINK_AFFILIATE_ANDA]

#HiOmega #SachaInchi #ObatAsamUrat #KesehatanSendi #SayangOrangTua`,
    tags: ['Instagram', 'Facebook', 'Sendi', 'Keluarga']
  },
  {
    id: 'cnt-5',
    title: 'Video Edukasi: Waspadai Hipertensi Si Pembunuh Senyap',
    category: 'video',
    description: 'Cuplikan video animasi pentingnya menjaga tekanan darah sejak dini dengan nutrisi asam lemak nabati.',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    tags: ['Video', 'Hipertensi', 'Edukasi']
  }
];

export interface ShippingRate {
  province: string;
  city: string;
  originCity: string;
  jneReg: number;
  jntReg: number;
  sicepatReg: number;
  posKilat: number;
  estDays: string;
}

export const SHIPPING_ORIGIN = {
  province: 'Jawa Timur',
  city: 'Kab. Sidoarjo',
  district: 'Kecamatan Candi',
  hub: 'Gudang Utama HI-OMEGA Sidoarjo'
};

export const INDONESIA_SHIPPING_RATES: ShippingRate[] = [
  // Local Origin: Jawa Timur
  { province: 'Jawa Timur', city: 'Kab. Sidoarjo', originCity: 'Sidoarjo', jneReg: 8000, jntReg: 9000, sicepatReg: 8000, posKilat: 8000, estDays: '1 Hari (Pengiriman Lokal)' },
  { province: 'Jawa Timur', city: 'Kota Surabaya', originCity: 'Sidoarjo', jneReg: 9000, jntReg: 9000, sicepatReg: 9000, posKilat: 8500, estDays: '1 Hari' },
  { province: 'Jawa Timur', city: 'Kota Malang', originCity: 'Sidoarjo', jneReg: 11000, jntReg: 11000, sicepatReg: 11000, posKilat: 10000, estDays: '1-2 Hari' },
  { province: 'Jawa Timur', city: 'Kab. Jember', originCity: 'Sidoarjo', jneReg: 13000, jntReg: 13000, sicepatReg: 13000, posKilat: 12000, estDays: '1-2 Hari' },
  { province: 'Jawa Timur', city: 'Kota Pasuruan', originCity: 'Sidoarjo', jneReg: 10000, jntReg: 10000, sicepatReg: 10000, posKilat: 9000, estDays: '1 Hari' },
  { province: 'Jawa Timur', city: 'Kota Mojokerto', originCity: 'Sidoarjo', jneReg: 10000, jntReg: 10000, sicepatReg: 10000, posKilat: 9000, estDays: '1 Hari' },
  { province: 'Jawa Timur', city: 'Kota Kediri', originCity: 'Sidoarjo', jneReg: 12000, jntReg: 12000, sicepatReg: 12000, posKilat: 11000, estDays: '1-2 Hari' },
  
  // Jawa Tengah & DIY
  { province: 'Jawa Tengah', city: 'Kota Semarang', originCity: 'Sidoarjo', jneReg: 15000, jntReg: 16000, sicepatReg: 15000, posKilat: 14000, estDays: '2-3 Hari' },
  { province: 'Jawa Tengah', city: 'Kota Solo (Surakarta)', originCity: 'Sidoarjo', jneReg: 15000, jntReg: 15000, sicepatReg: 15000, posKilat: 14000, estDays: '2-3 Hari' },
  { province: 'Jawa Tengah', city: 'Kab. Banyumas (Purwokerto)', originCity: 'Sidoarjo', jneReg: 17000, jntReg: 17000, sicepatReg: 16000, posKilat: 15000, estDays: '2-3 Hari' },
  { province: 'DI Yogyakarta', city: 'Kota Yogyakarta', originCity: 'Sidoarjo', jneReg: 15000, jntReg: 16000, sicepatReg: 15000, posKilat: 14000, estDays: '2-3 Hari' },
  { province: 'DI Yogyakarta', city: 'Kab. Sleman', originCity: 'Sidoarjo', jneReg: 15000, jntReg: 16000, sicepatReg: 15000, posKilat: 14000, estDays: '2-3 Hari' },

  // DKI Jakarta & Banten & Jabar
  { province: 'DKI Jakarta', city: 'Jakarta Pusat', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'DKI Jakarta', city: 'Jakarta Selatan', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'DKI Jakarta', city: 'Jakarta Barat', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'DKI Jakarta', city: 'Jakarta Timur', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'DKI Jakarta', city: 'Jakarta Utara', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'Jawa Barat', city: 'Kota Bandung', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'Jawa Barat', city: 'Kota Bekasi', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'Jawa Barat', city: 'Kota Bogor', originCity: 'Sidoarjo', jneReg: 19000, jntReg: 20000, sicepatReg: 19000, posKilat: 18000, estDays: '2-3 Hari' },
  { province: 'Jawa Barat', city: 'Kota Depok', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'Banten', city: 'Kota Tangerang', originCity: 'Sidoarjo', jneReg: 18000, jntReg: 19000, sicepatReg: 18000, posKilat: 17000, estDays: '2-3 Hari' },
  { province: 'Banten', city: 'Kota Serang', originCity: 'Sidoarjo', jneReg: 20000, jntReg: 21000, sicepatReg: 20000, posKilat: 19000, estDays: '2-3 Hari' },

  // Luar Jawa: Bali, NTB, NTT
  { province: 'Bali', city: 'Kota Denpasar', originCity: 'Sidoarjo', jneReg: 20000, jntReg: 21000, sicepatReg: 20000, posKilat: 19000, estDays: '2-3 Hari' },
  { province: 'Nusa Tenggara Barat', city: 'Kota Mataram', originCity: 'Sidoarjo', jneReg: 24000, jntReg: 25000, sicepatReg: 24000, posKilat: 22000, estDays: '2-3 Hari' },

  // Sumatera
  { province: 'Sumatera Utara', city: 'Kota Medan', originCity: 'Sidoarjo', jneReg: 34000, jntReg: 35000, sicepatReg: 34000, posKilat: 31000, estDays: '3-4 Hari' },
  { province: 'Sumatera Barat', city: 'Kota Padang', originCity: 'Sidoarjo', jneReg: 32000, jntReg: 33000, sicepatReg: 32000, posKilat: 29000, estDays: '3-4 Hari' },
  { province: 'Riau', city: 'Kota Pekanbaru', originCity: 'Sidoarjo', jneReg: 32000, jntReg: 33000, sicepatReg: 32000, posKilat: 29000, estDays: '3-4 Hari' },
  { province: 'Sumatera Selatan', city: 'Kota Palembang', originCity: 'Sidoarjo', jneReg: 26000, jntReg: 27000, sicepatReg: 26000, posKilat: 24000, estDays: '2-3 Hari' },
  { province: 'Lampung', city: 'Kota Bandar Lampung', originCity: 'Sidoarjo', jneReg: 22000, jntReg: 23000, sicepatReg: 22000, posKilat: 21000, estDays: '2-3 Hari' },

  // Kalimantan
  { province: 'Kalimantan Timur', city: 'Kota Balikpapan', originCity: 'Sidoarjo', jneReg: 34000, jntReg: 35000, sicepatReg: 34000, posKilat: 31000, estDays: '3-4 Hari' },
  { province: 'Kalimantan Selatan', city: 'Kota Banjarmasin', originCity: 'Sidoarjo', jneReg: 32000, jntReg: 33000, sicepatReg: 32000, posKilat: 29000, estDays: '3-4 Hari' },
  
  // Sulawesi & Papua
  { province: 'Sulawesi Selatan', city: 'Kota Makassar', originCity: 'Sidoarjo', jneReg: 32000, jntReg: 33000, sicepatReg: 32000, posKilat: 29000, estDays: '3-4 Hari' },
  { province: 'Sulawesi Utara', city: 'Kota Manado', originCity: 'Sidoarjo', jneReg: 45000, jntReg: 46000, sicepatReg: 44000, posKilat: 41000, estDays: '4-5 Hari' },
  { province: 'Papua', city: 'Kota Jayapura', originCity: 'Sidoarjo', jneReg: 82000, jntReg: 85000, sicepatReg: 82000, posKilat: 76000, estDays: '5-7 Hari' }
];
