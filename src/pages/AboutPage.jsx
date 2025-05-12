import { motion } from "framer-motion";
import {
  Users,
  Target,
  Palette,
  Code,
  Star,
  Shield,
  Layers,
  Github,
  Mail,
  Linkedin,
  Instagram,
  Map,
  Calendar,
  Heart,
  DollarSign,
  Activity,
  Bell,
  CodeXml,
  BadgeInfo,
  PenLine,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import useScrollAnimations from "../components/AnimasiScroll";
import BackToTop from "../components/BackToTop";

const AboutPage = () => {
  // Animation variants defined here (not in hooks)
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Get scroll animations from hook
  const { refs, controls, sectionVariants } = useScrollAnimations();

  // Data
  const teamMembers = [
    {
      name: "Muhammad Adistia Pratama",
      role: "Frontend Developer",
      bio: "Saya Muhammad Adistia Pratama, siswa SMKN 69 Jakarta, Jurusan SIJA (Sistem Informatika Jaringan Aplikasi). Saya sebagai pelajar berusaha mencari berbagai pengalaman untuk menciptakan sebuah App/Web.",
      img: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1746971246/Adis_yqvzkx.png",
      socials: [
        { icon: <Linkedin className="w-5 h-5" />, url: "#" },
        { icon: <Github className="w-5 h-5" />, url: "#" },
        { icon: <Instagram className="w-5 h-5" />, url: "#" },
      ],
    },
    {
      name: "Wahyu Andhika Rahadi",
      role: "Backend Developer",
      bio: "Saya Wahyu Andhika Rahadi, siswa SMKN 69 Jakarta, Jurusan SIJA (Sistem Informatika Jaringan Aplikasi). Saya memiliki pengalaman dalam pengembangan aplikasi backend dan database.",
      img: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1746971286/Wahyu_s84a47.png",
      socials: [
        { icon: <Linkedin className="w-5 h-5" />, url: "#" },
        { icon: <Github className="w-5 h-5" />, url: "#" },
        { icon: <Instagram className="w-5 h-5" />, url: "#" },
      ],
    },
    {
      name: "Rifqi Gusatria Rhiano",
      role: "Frontend Developer",
      bio: "Saya Rifqi Gusatria Rhiano, siswa SMKN 69 Jakarta, Jurusan SIJA (Sistem Informatika Jaringan Aplikasi). Saya memiliki pengalaman dalam pengembangan aplikasi frontend dan desain UI/UX.",
      img: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1746972646/Rifqi_rask28.png",
      socials: [
        { icon: <Linkedin className="w-5 h-5" />, url: "#" },
        { icon: <Github className="w-5 h-5" />, url: "#" },
        { icon: <Instagram className="w-5 h-5" />, url: "#" },
      ],
    },
  ];

  const features = [
    {
      title: "Peta Sehat",
      desc: "Menampilkan kualitas udara real-time dan rekomendasi tempat olahraga terbaik di kota-kota Indonesia.",
      icon: <Map className="w-5 h-5" />,
    },
    {
      title: "Rencana Sehat",
      desc: "Panduan personal untuk pola makan, olahraga, dan kesehatan mental sesuai kebutuhan pengguna.",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Mindful Zone",
      desc: "Berisi latihan mindfulness, meditasi, dan tips kesehatan mental yang mudah diterapkan.",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "Komunitas & Event",
      desc: "Forum diskusi dan acara kesehatan untuk berbagi pengalaman dan belajar langsung dari ahli.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Manajemen Keuangan Sehat",
      desc: "Edukasi tentang pengelolaan keuangan yang mendukung kesejahteraan hidup.",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Dashboard Kesehatan",
      desc: "Memantau progres kesehatan pribadi melalui statistik dan rekomendasi berbasis AI.",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      title: "Notifikasi Sehat",
      desc: "Pengingat otomatis untuk minum air, olahraga, istirahat, dan aktivitas sehat lainnya.",
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  const techStack = [
    {
      category: "Frontend",
      items: [
        {
          name: "React",
          desc: "Library JavaScript untuk membangun antarmuka pengguna",
        },
        {
          name: "Tailwind CSS",
          desc: "Framework CSS utility-first untuk desain responsif",
        },
        {
          name: "Framer Motion",
          desc: "Library animasi untuk interaksi yang halus",
        },
        {
          name: "SweetAlert2",
          desc: "Library notifikasi untuk menginformasikan pengguna",
        },
        { name: "Vite", desc: "Build tool modern untuk pengembangan cepat" },
      ],
      icon: <Code className="w-6 h-6" />,
    },
    {
      category: "Backend dan API",
      items: [
        {
          name: "Node.js",
          desc: "Runtime JavaScript untuk server-side development",
        },
        {
          name: "Gemini 2.0 Flash",
          desc: "API AI untuk integrasi dengan layanan kesehatan",
        },
        {
          name: "Google Forms",
          desc: "Di gunakan untuk membuat komunitas diskusi",
        },
      ],
      icon: <Layers className="w-6 h-6" />,
    },
    {
      category: "Pengalaman Pengguna",
      items: [
        {
          name: "Firebase",
          desc: "Platform untuk autentikasi dan penyimpanan cloud",
        },
        { name: "Mapbox", desc: "API pemetaan untuk fitur Peta Sehat" },
        { name: "OpenWeather", desc: "API data cuaca dan kualitas udara" },
      ],
      icon: <PenLine className="w-6 h-6" />,
    },
  ];

  return (
    <div
      className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7]"
      ref={refs.container}
    >
      {/* Hero Section */}
      <motion.section
        ref={refs.hero}
        initial="hidden"
        animate={controls.hero}
        variants={sectionVariants}
        className="relative pt-28 pb-6 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
          >
            <span className="flex items-center text-sm font-medium">
              <Users className="w-4 h-4 mr-2" />
              Tentang Kami
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold mb-4"
          >
            Mengenal{" "}
            <span className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent">
              PilarSehat
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
          >
            Platform kesehatan holistik yang membantu Anda mencapai keseimbangan
            dalam semua aspek kehidupan.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 pb-32 space-y-20">
        {/* About Section */}
        <motion.section
          initial="hidden"
          ref={refs.trust}
          animate={controls.trust}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={itemVariants}>
            <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <motion.div
                variants={itemVariants}
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <BadgeInfo className="w-4 h-4 mr-2" />
                  Tentang Kami
                </span>
              </motion.div>
              <div className="space-y-5 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p className="leading-relaxed">
                  PilarSehat adalah platform digital kesehatan yang dirancang
                  untuk membantu masyarakat dalam menjaga keseimbangan hidup
                  berdasarkan lima pilar utama kesehatan: fisik, mental,
                  lingkungan, sosial, dan finansial. Platform ini bertujuan
                  untuk memberikan informasi, panduan, serta alat bantu
                  interaktif yang mendukung gaya hidup sehat dan berkualitas.{" "}
                </p>
                <p className="leading-relaxed">
                  Lebih dari sekadar aplikasi kesehatan, PilarSehat adalah
                  pendamping harian yang dirancang untuk memberdayakan individu
                  dalam membuat keputusan hidup yang lebih baik. Setiap pilar
                  dikembangkan dengan dukungan pakar dan komunitas untuk
                  memastikan relevansi dan dampaknya dalam kehidupan nyata.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] p-6 rounded-xl hover:shadow-md transition-all"
            >
              <motion.div
                variants={itemVariants}
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Target className="w-4 h-4 mr-2" />
                  Tujuan Kami
                </span>
              </motion.div>
              <ul className="space-y-3 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <li className="flex items-start">
                  <span className="text-[#1ff498] dark:text-[#0be084] mr-2">
                    •
                  </span>
                  Mengedukasi masyarakat tentang pentingnya kesehatan holistik.
                </li>
                <li className="flex items-start">
                  <span className="text-[#1ff498] dark:text-[#0be084] mr-2">
                    •
                  </span>
                  Menyediakan akses ke informasi kesehatan yang mudah dipahami.
                </li>
                <li className="flex items-start">
                  <span className="text-[#1ff498] dark:text-[#0be084] mr-2">
                    •
                  </span>
                  Mendorong kebiasaan sehat melalui fitur interaktif dan
                  komunitas.
                </li>
                <li className="flex items-start">
                  <span className="text-[#1ff498] dark:text-[#0be084] mr-2">
                    •
                  </span>
                  Membantu pengguna dalam mengambil keputusan yang lebih sehat.
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] p-6 rounded-xl hover:shadow-md transition-all"
            >
              <motion.div
                variants={itemVariants}
                className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
              >
                <span className="flex items-center text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Visi & Misi
                </span>
              </motion.div>
              <div className="space-y-4 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p className="leading-relaxed">
                  <span className="font-semibold">Visi:</span> Menjadi platform
                  kesehatan digital terdepan yang dapat membantu masyarakat.
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold">Misi:</span> Memberikan solusi
                  kesehatan yang mudah diakses, komprehensif, dan berbasis bukti
                  untuk meningkatkan kualitas hidup masyarakat.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Color Palette */}
        <motion.section
          initial="hidden"
          ref={refs.features}
          animate={controls.features}
          variants={sectionVariants}
        >
          <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] p-8 rounded-2xl hover:shadow-md transition-all">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center text-sm font-medium">
                <Palette className="w-4 h-4 mr-2" />
                Desain Kami
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-5 text-[#1ff498] dark:text-[#0be084]">
                  Light Mode
                </h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="w-20 h-20 rounded-lg bg-[#f6fefc] border border-gray-300 flex flex-col items-center justify-center text-[#01130c]">
                    <span className="text-xs font-mono">#f6fefc</span>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-[#1ff498] flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-mono">#1ff498</span>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-[#50b7f7] flex flex-col items-center justify-center text-[#01130c]">
                    <span className="text-xs font-mono">#50b7f7</span>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-[#01130c] flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-mono">#01130c</span>
                  </div>
                </div>
                <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 leading-relaxed">
                  Warna hijau muda (#1ff498) melambangkan pertumbuhan dan
                  kesehatan, biru (#50b7f7) menunjukkan kepercayaan dan
                  profesionalisme, sementara latar belakang putih (#f6fefc)
                  memberikan kesan bersih dan segar.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-5 text-[#0be084]">
                  Dark Mode
                </h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="w-20 h-20 rounded-lg bg-[#010907] border border-gray-700 flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-mono">#010907</span>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-[#0be084] flex flex-col items-center justify-center text-[#010907]">
                    <span className="text-xs font-mono">#0be084</span>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-[#086faf] flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-mono">#086faf</span>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-[#ecfef7] flex flex-col items-center justify-center text-[#01130c]">
                    <span className="text-xs font-mono">#ecfef7</span>
                  </div>
                </div>
                <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 leading-relaxed">
                  Warna hijau neon (#0be084) pada dark mode memberikan kontras
                  tinggi untuk aksesibilitas, dengan latar belakang hitam
                  (#010907) yang mengurangi ketegangan mata dan menciptakan
                  pengalaman membaca yang nyaman di malam hari.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial="hidden"
          ref={refs.whyChooseUs}
          animate={controls.whyChooseUs}
          variants={sectionVariants}
        >
          <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-8 rounded-2xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Fitur Unggulan
              </span>
            </motion.div>
            <motion.div
              variants={staggerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(31, 244, 152, 0.05)",
                    borderColor: "#1ff498",
                    transition: { duration: 0.2 },
                  }}
                  className="p-6 rounded-xl bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30
          hover:bg-[#1ff498]/5 hover:border-[#1ff498] dark:hover:bg-[#0be084]/5 dark:hover:border-[#0be084]
          transition-colors duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-2 rounded-lg mr-3 text-[#1ff498] dark:text-[#0be084]">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          initial="hidden"
          ref={refs.faq}
          animate={controls.faq}
          variants={sectionVariants}
        >
          <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-8 rounded-2xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center text-sm font-medium">
                <CodeXml className="w-4 h-4 mr-2" />
                Tech Stack
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mb-8 text-[#01130c]/80 dark:text-[#ecfef7]/80"
            >
              PilarSehat dibangun menggunakan teknologi web modern yang fokus
              pada performa dan pengalaman pengguna:
            </motion.p>

            <motion.div
              variants={staggerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {techStack.map((stack, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    borderLeftColor: "#1ff498",
                    borderRightColor: "#1ff498",
                    transition: { duration: 0.3 },
                  }}
                  className="bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 
          border-l-4 border-r-4 border-l-transparent border-r-transparent
          hover:border-l-[#1ff498] hover:border-r-[#1ff498] dark:hover:border-l-[#0be084] dark:hover:border-r-[#0be084]
          p-6 rounded-xl transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-2 rounded-lg mr-3 text-[#1ff498] dark:text-[#0be084]">
                      {stack.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{stack.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {stack.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#1ff498] dark:text-[#0be084] mr-2">
                          •
                        </span>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial="hidden"
          ref={refs.testimoni}
          animate={controls.testimoni}
          variants={sectionVariants}
        >
          <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-8 rounded-2xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center text-sm font-medium">
                <Users className="w-4 h-4 mr-2" />
                Tim Kami
              </span>
            </motion.div>
            <motion.div
              variants={staggerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="overflow-hidden rounded-xl border border-[#72e4f8]/30 dark:border-[#07798d]/30 bg-white dark:bg-[#0a1a16] transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#e6f8f4] dark:bg-[#032b2e] transition-colors duration-300">
                    <img
                      src={member.img}
                      alt={member.name}
                      draggable="false"
                      loading="lazy"
                      onContextMenu={(e) => e.preventDefault()}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 hover:scale-150"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-[#1ff498] dark:text-[#0be084] text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70 mb-4">
                      {member.bio}
                    </p>
                    <div className="flex space-x-3">
                      {member.socials.map((social, i) => (
                        <a
                          key={i}
                          href={social.url}
                          className="text-[#01130c] dark:text-[#ecfef7] hover:text-[#1ff498] dark:hover:text-[#0be084] transition-colors"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.section
          initial="hidden"
          ref={refs.cta}
          animate={controls.cta}
          variants={sectionVariants}
        >
          <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-8 rounded-2xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-6"
            >
              <span className="flex items-center text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Kebijakan & Penafian
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold mb-6"
            >
              Penting untuk Dibaca
            </motion.h2>

            <motion.div variants={staggerVariants} className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="p-5 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 rounded-lg hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors"
              >
                <div className="flex items-start">
                  <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-2 rounded-lg mr-3 text-[#1ff498] dark:text-[#0be084]">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <p className="leading-relaxed text-[#01130c]/80 dark:text-[#ecfef7]/80">
                    PilarSehat adalah platform informasi kesehatan dan tidak
                    dimaksudkan untuk menggantikan saran medis profesional.
                    Selalu konsultasikan dengan penyedia layanan kesehatan yang
                    memenuhi syarat mengenai pertanyaan medis apa pun.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-5 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 rounded-lg hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors"
              >
                <div className="flex items-start">
                  <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-2 rounded-lg mr-3 text-[#1ff498] dark:text-[#0be084]">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <p className="leading-relaxed text-[#01130c]/80 dark:text-[#ecfef7]/80">
                    Meskipun kami berusaha untuk menyediakan informasi yang
                    akurat dan terkini, kami tidak menjamin kelengkapan atau
                    keakuratan informasi yang disajikan di platform ini.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-5 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 rounded-lg hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors"
              >
                <div className="flex items-start">
                  <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-2 rounded-lg mr-3 text-[#1ff498] dark:text-[#0be084]">
                    <Info className="w-5 h-5" />
                  </div>
                  <p className="leading-relaxed text-[#01130c]/80 dark:text-[#ecfef7]/80">
                    Penggunaan informasi dari PilarSehat sepenuhnya menjadi
                    risiko pengguna. Tim pengembang tidak bertanggung jawab atas
                    konsekuensi yang timbul dari penggunaan informasi ini.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-5 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 rounded-lg hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors mt-8"
              >
                <div className="flex items-start">
                  <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-2 rounded-lg mr-3 text-[#1ff498] dark:text-[#0be084]">
                    <Github className="w-5 h-5" />
                  </div>
                  <p className="leading-relaxed text-[#01130c]/80 dark:text-[#ecfef7]/80">
                    PilarSehat adalah proyek open-source yang dikembangkan untuk
                    tujuan edukasi. Silahkan cek Code nya di{" "}
                    <a
                      href="https://github.com/your-repo"
                      className="text-[#1ff498] dark:text-[#0be084] hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Footer Wave */}
      <div className="relative h-32 w-full overflow-hidden">
        <motion.svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, delay: 0.5 },
          }}
        >
          <motion.path
            fill="#1ff498"
            fillOpacity="0.1"
            d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{
              pathLength: 1,
              pathOffset: 0,
              transition: {
                duration: 3,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          />
          <motion.path
            fill="#1ff498"
            fillOpacity="0.2"
            d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9-9.42,98.6-31.56,31.77-25.39,62.32-62,103.63-73,40.44-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28-22.88,168.9-38.84,30.2-8.66,59-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{
              pathLength: 1,
              pathOffset: 0,
              transition: {
                duration: 3.5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.2,
              },
            }}
          />
          <motion.path
            fill="#1ff498"
            fillOpacity="0.3"
            d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{
              pathLength: 1,
              pathOffset: 0,
              transition: {
                duration: 4,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.4,
              },
            }}
          />
        </motion.svg>
      </div>
      <BackToTop />
    </div>
  );
};

export default AboutPage;
