import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-600 text-emerald-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            Bukti Nyata Konsumen Kami
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Kesaksian Nyata Pengguna HI-OMEGA
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-emerald-100 font-medium">
            Kisah nyata pemulihan kesehatan kolesterol, sendi, darah tinggi, dan stamina tubuh dari berbagai kota di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Pak Wanto - Surabaya (From user image) */}
          <div className="bg-emerald-900/90 border-2 border-emerald-600/70 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-emerald-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs bg-emerald-800 text-emerald-200 font-bold px-3 py-1 rounded-full border border-emerald-700">
                  Surabaya, Jawa Timur
                </span>
              </div>

              <div className="text-emerald-300 font-black text-lg mb-2">
                “Kemarin Jalan Sebentar Ngos-ngosan, Sekarang Badan Enak!”
              </div>

              <p className="text-base sm:text-lg text-emerald-50 leading-relaxed italic">
                “Alhamdulillah saya tadi malam minum 2... sore sama malam... alhamdulillah pagi ini badan sudah enakan... Kemarin badan agak lemes... Jalan sebentar ngos-ngosan... Ini sekarang sudah bisa jalan ke rumah pak haji.”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-800 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-white text-base">Pak Wanto</h4>
                <p className="text-xs text-emerald-300">Konsumen Rutin HI-OMEGA</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          {/* Card 2: Testimoni Jakarta WhatsApp (From user image) */}
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs bg-slate-800 text-emerald-300 font-bold px-3 py-1 rounded-full border border-slate-700">
                  DKI Jakarta
                </span>
              </div>

              {/* Chat Simulation replica */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 font-sans text-xs sm:text-sm">
                <div className="bg-slate-800 text-slate-200 p-2.5 rounded-xl rounded-tl-none max-w-[85%]">
                  “Awakmu minum sacha inchi,,, piye rasane nang awak??”
                </div>
                <div className="bg-emerald-900 text-white p-2.5 rounded-xl rounded-tr-none max-w-[85%] ml-auto text-right">
                  “Alhamdulillah ris, awak ga gampang ngantukkan. Biasane ngantukan pol 🙏”
                </div>
              </div>

              <div className="text-emerald-300 font-black text-lg mt-4 mb-1">
                Stamina Prima & Tidak Mudah Lelah
              </div>
              <p className="text-sm text-slate-300">
                Membantu pembentukan energi seluler (ATP) sehingga badan bugar sepanjang hari tanpa rasa kantuk berlebih.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-white text-base">Ibu Risma & Teman</h4>
                <p className="text-xs text-slate-400">Tangkapan Layar Obrolan WA</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          {/* Card 3: Nyeri Sendi & Hipertensi */}
          <div className="bg-emerald-900/90 border-2 border-emerald-600/70 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-emerald-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs bg-emerald-800 text-emerald-200 font-bold px-3 py-1 rounded-full border border-emerald-700">
                  Bandung, Jawa Barat
                </span>
              </div>

              <div className="text-emerald-300 font-black text-lg mb-2">
                “Tensi Darah Kembali 120/80 & Lutut Tidak Ngilu Lagi”
              </div>

              <p className="text-base sm:text-lg text-emerald-50 leading-relaxed italic">
                “Sudah 2 tahun tensi saya sering naik ke 160 kalau kepikiran. Minum HI-OMEGA botol pertama, tengkuk leher langsung enteng dan waktu sholat sujud lutut sudah tidak berbunyi ngilu lagi.”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-800 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-white text-base">H. Bambang S. (58 Th)</h4>
                <p className="text-xs text-emerald-300">Pensiunan Guru</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
