import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, AlertCircle, Info, ChevronLeft } from "lucide-react";

const KebijakanPrivPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f6fefc] to-[#e0f7f5] dark:from-[#010907] dark:to-[#01130c] px-4 py-12">
      {/* Decorative Animated Shapes - Enhanced version */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-80 dark:opacity-60">
        {/* Floating Circles */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute top-1/4 left-1/4 fill-[#1ff498]/40 dark:fill-[#0be084]/25"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.6, 0],
            scale: [0.8, 1.2, 0.9, 1.3],
            x: [-30, 15, -15, 30, -30],
            y: [0, 20, -15, 10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="50" cy="50" r="25" />
          <circle cx="100" cy="30" r="18" className="fill-[#72e4f8]/30 dark:fill-[#07798d]/20" />
        </motion.svg>

        {/* Organic Blob - More movement */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute bottom-1/3 right-1/4 fill-[#72e4f8]/40 dark:fill-[#07798d]/25"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.5, 0],
            d: [
              "M40,80 C60,40 100,40 120,80 C140,120 100,140 60,120 C20,100 20,120 40,80 Z",
              "M30,90 C50,30 110,50 130,90 C150,130 90,150 50,110 C10,70 10,150 30,90 Z",
              "M50,70 C70,50 110,60 110,90 C110,120 70,130 50,110 C30,90 30,90 50,70 Z",
              "M60,60 C80,40 120,50 120,80 C120,110 80,120 60,100 C40,80 40,80 60,60 Z"
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M40,80 C60,40 100,40 120,80 C140,120 100,140 60,120 C20,100 20,120 40,80 Z" />
        </motion.svg>

        {/* New Floating Triangles */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute top-1/5 right-1/5 fill-[#07798d]/40 dark:fill-[#72e4f8]/25"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.5, 0.3, 0.5, 0],
            rotate: [0, 180, 360, 90, 0],
            scale: [0.8, 1.3, 0.9, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <polygon points="50,50 80,80 20,80" />
        </motion.svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-[#01130c]/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#e0f7f5] dark:border-[#07798d]/30"
        >
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] dark:from-[#0be084] dark:to-[#086faf] p-6 text-center relative">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute left-6 top-6"
            >
              <Link
                to="/"
                className="inline-flex items-center text-[#f6fefc] dark:text-[#010907] hover:text-white dark:hover:text-[#ecfef7] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Kembali
              </Link>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-[#f6fefc] dark:text-[#010907]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Kebijakan Privasi (Design Sementara)
            </motion.h1>
            <p className="text-[#f6fefc]/90 dark:text-[#010907]/90 mt-2">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content Sections */}
          <div className="p-6 md:p-8 space-y-8 text-[#01130c] dark:text-[#ecfef7]">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 rounded-xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
            >
              <motion.div
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Pengantar
                </span>
              </motion.div>
              <p className="leading-relaxed text-[#01130c]/80 dark:text-[#ecfef7]/80">
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika Anda menggunakan platform PilarSehat. Dengan mengakses atau menggunakan layanan kami, Anda setuju dengan pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.
              </p>
            </motion.div>

            {/* Data Collection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 rounded-xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
            >
              <motion.div
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Informasi yang Kami Kumpulkan
                </span>
              </motion.div>
              
              <div className="space-y-4 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p>Kami mengumpulkan beberapa jenis informasi untuk menyediakan dan meningkatkan layanan kami:</p>
                
                <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Data Pribadi</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nama lengkap dan informasi kontak</li>
                    <li>Alamat email dan data akun</li>
                    <li>Informasi demografis (usia, jenis kelamin, dll)</li>
                    <li>Data kesehatan yang Anda berikan secara sukarela</li>
                  </ul>
                </div>
                
                <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Data Penggunaan</h4>
                  <p>Kami dapat mengumpulkan informasi tentang bagaimana layanan diakses dan digunakan:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Alamat IP dan jenis perangkat</li>
                    <li>Halaman yang dikunjungi dan waktu akses</li>
                    <li>Preferensi dan interaksi dengan fitur</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Data Usage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 rounded-xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
            >
              <motion.div
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Penggunaan Data
                </span>
              </motion.div>
              
              <div className="space-y-4 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p>Kami menggunakan data yang dikumpulkan untuk berbagai tujuan:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Layanan Inti</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Menyediakan dan memelihara layanan kami</li>
                      <li>Memberikan dukungan pelanggan</li>
                      <li>Memantau penggunaan layanan</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Pengembangan</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Mengembangkan fitur baru</li>
                      <li>Meningkatkan pengalaman pengguna</li>
                      <li>Analisis data untuk pengembangan produk</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 rounded-xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
            >
              <motion.div
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Perlindungan Data
                </span>
              </motion.div>
              
              <div className="space-y-4 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p>Kami menerapkan berbagai langkah keamanan untuk melindungi data Anda:</p>
                
                <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Keamanan Teknis</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Enkripsi data dalam transit dan diam</li>
                    <li>Autentikasi akses yang ketat</li>
                    <li>Pemantauan keamanan 24/7</li>
                  </ul>
                </div>
                
                <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Kebijakan Internal</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Pelatihan keamanan data untuk staf</li>
                    <li>Pembatasan akses berdasarkan kebutuhan</li>
                    <li>Audit keamanan berkala</li>
                  </ul>
                </div>
                
                <p className="text-sm italic">
                  Meskipun kami menggunakan standar industri untuk melindungi data Anda, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.
                </p>
              </div>
            </motion.div>

            {/* User Rights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 rounded-xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
            >
              <motion.div
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Hak Pengguna
                </span>
              </motion.div>
              
              <div className="space-y-4 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p>Anda memiliki hak tertentu terkait data pribadi Anda:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Mengakses data pribadi Anda",
                    "Memperbarui atau mengoreksi data",
                    "Menghapus data pribadi",
                    "Membatasi pemrosesan data",
                    "Menerima data dalam format terstruktur",
                    "Menolak pemrosesan data",
                    "Mencabut persetujuan"
                  ].map((right, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#1ff498] dark:text-[#0be084] mr-2">•</span>
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm">
                  Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang tersedia di bagian akhir dokumen ini.
                </p>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 rounded-xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
            >
              <motion.div
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Penafian
                </span>
              </motion.div>
              
              <div className="space-y-4 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Informasi Kesehatan</h4>
                  <p>
                    PilarSehat adalah platform informasi kesehatan dan tidak dimaksudkan untuk menggantikan saran medis profesional. Selalu konsultasikan dengan penyedia layanan kesehatan yang memenuhi syarat mengenai pertanyaan medis apa pun.
                  </p>
                </div>
                
                <div className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084] mb-2">Akurasi Informasi</h4>
                  <p>
                    Meskipun kami berusaha untuk menyediakan informasi yang akurat dan terkini, kami tidak menjamin kelengkapan atau keakuratan informasi yang disajikan di platform ini.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 rounded-xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
            >
              <motion.div
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Info className="w-4 h-4 mr-2" />
                  Hubungi Kami
                </span>
              </motion.div>
              
              <div className="space-y-4 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-[#1ff498]/10 to-[#50b7f7]/10 dark:from-[#0be084]/10 dark:to-[#086faf]/10 p-4 rounded-lg border border-[#72e4f8]/30 dark:border-[#07798d]/30">
                    <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084]">Email</h4>
                    <p>privasi@pilarsehat.com</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1ff498]/10 to-[#50b7f7]/10 dark:from-[#0be084]/10 dark:to-[#086faf]/10 p-4 rounded-lg border border-[#72e4f8]/30 dark:border-[#07798d]/30">
                    <h4 className="font-semibold text-[#1ff498] dark:text-[#0be084]">Telepon</h4>
                    <p>(021) 1234-5678</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="pt-6"
            >
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#1ff498] to-[#50b7f7] dark:from-[#0be084] dark:to-[#086faf] text-[#f6fefc] dark:text-[#010907] font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#1ff498] dark:bg-[#0be084]"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default KebijakanPrivPage;