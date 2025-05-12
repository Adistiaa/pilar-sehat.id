import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
// Assuming these icons are from lucide-react or similar
import {
  ShieldCheck,
  Users,
  Award,
  TrendingUp,
  Heart,
  Brain,
  Leaf,
  Briefcase,
  ChevronRight,
  Stars,
  HelpCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
// Assuming Link is from react-router-dom or similar
import { Link } from "react-router-dom";
import useScrollAnimations from "../components/AnimasiScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css"; // Import style Swiper
import "swiper/css/autoplay";
import "swiper/css/pagination";

const Home = () => {
  const { refs, controls, isVisible, sectionVariants, isHeroInView } =
    useScrollAnimations();

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Framer Motion Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced stagger for faster appearance
        when: "beforeChildren", // Ensure parent animates first
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20, // Reduced initial offset for subtler animation
      scale: 0.98, // Slight scale for depth
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 0.77, 0.47, 0.97], // Custom bezier curve for smoother motion
      },
    },
    hover: {
      scale: 0.3, // More subtle hover effect
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const heroImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95, // Less dramatic initial scale
      filter: "blur(4px)", // Subtle blur for smooth appearance
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1], // Smooth easing
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -8, 0], // Reduced floating range
      rotate: [0, -1, 0], // Slight rotation for organic feel
      transition: {
        duration: 6, // Slightly faster
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const floatSlowVariants = {
    animate: {
      y: [0, -5, 0], // Even more subtle
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 0.5, // Staggered timing
      },
    },
  };

  const pulseSlowVariants = {
    animate: {
      opacity: [1, 0.9, 1], // More subtle pulse
      scale: [1, 1.01, 1], // Tiny scale change
      transition: {
        duration: 4, // Slower pulse
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const highlightVariants = {
    animate: {
      color: ["#1ff498", "#3ac8ff", "#1ff498"], // Smoother color transition
      transition: {
        duration: 8, // Slower cycle
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const faqData = [
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    },
  ];

  const testimoniData = [
    {
      image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1740908252/WhatsApp_Image_2025-03-02_at_16.35.11_f8a5e4ec_dqk9mc.jpg",
      nama: "Ikhsan Rasyid Rabbani",
      sekolah: "SMKN 69 Jakarta",
      kesan:
        "Website ini sangat membantu saya memahami materi dengan lebih mudah.",
    },
    {
      image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1740908252/WhatsApp_Image_2025-03-02_at_16.35.11_f8a5e4ec_dqk9mc.jpg",
      nama: "Ikhsan Rasyid Rabbani",
      sekolah: "SMKN 69 Jakarta",
      kesan: "Desainnya keren dan navigasinya gampang banget!",
    },
    {
      image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1740908252/WhatsApp_Image_2025-03-02_at_16.35.11_f8a5e4ec_dqk9mc.jpg",
      nama: "Ikhsan Rasyid Rabbani",
      sekolah: "SMKN 69 Jakarta",
      kesan:
        "Sangat recommended untuk teman-teman yang mau belajar lebih efektif.",
    },
    {
      image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1740908252/WhatsApp_Image_2025-03-02_at_16.35.11_f8a5e4ec_dqk9mc.jpg",
      nama: "Ikhsan Rasyid Rabbani",
      sekolah: "SMKN 69 Jakarta",
      kesan: "Fitur-fiturnya lengkap dan tampilannya enak dilihat.",
    },
  ];

  // // New subtle background element variant
  // const backgroundElementVariants = {
  //   animate: {
  //     opacity: [0.3, 0.5, 0.3], // Gentle opacity wave
  //     transition: {
  //       duration: 12,
  //       ease: "easeInOut",
  //       repeat: Infinity,
  //       repeatType: "reverse"
  //     }
  //   }
  // };

  return (
      <div
        className="min-h-screen text-[#01130c] dark:text-[#ecfef7] bg-[#f6fefc] dark:bg-[#010907]"
        id="content"
      >
        {/* Hero Section with Dynamic Animation */}
        <motion.section
          ref={refs.hero}
          initial="hidden"
          animate={controls.hero}
          variants={sectionVariants}
          className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Original Decorative Elements - Maintained */}
          <motion.div
            className="absolute top-0 left-0 w-40 h-40 bg-[#72e4f8]/20 dark:bg-[#07798d]/20 rounded-full -translate-x-1/3 -translate-y-1/3"
            variants={pulseSlowVariants}
            animate="animate"
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 bg-[#1ff498]/10 dark:bg-[#0be084]/10 rounded-full translate-x-1/3 translate-y-1/3"
            variants={floatVariants}
            animate="animate"
          ></motion.div>
          <motion.div
            className="absolute top-1/4 right-10 w-20 h-20 bg-[#50b7f7]/30 dark:bg-[#086faf]/30 rounded-full"
            variants={floatSlowVariants}
            animate="animate"
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[#1ff498]/10 dark:bg-[#0be084]/10 rounded-full opacity-70"
            variants={floatVariants}
            animate="animate"
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.6,
            }}
          ></motion.div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Original Badge - Maintained */}
            <motion.div
              variants={itemVariants}
              className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center text-sm font-medium">
                <Stars className="w-4 h-4 mr-2" />
                Terintegrasi dengan AI Gemini
              </span>
            </motion.div>

            {/* Main Heading - Optimized for Responsiveness */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-5xl font-bold mb-5 leading-snug text-[#01130c] dark:text-[#ecfef7]"
            >
              Pilar Kuat untuk{" "}
              <motion.span
                variants={highlightVariants}
                animate="animate"
                className="inline-block text-[#1ff498] dark:text-[#0be084]"
              >
                Hidup Sehat
              </motion.span>{" "}
            </motion.h1>

            {/* Inspirational Quote */}
            <motion.div
              variants={itemVariants}
              className="relative max-w-3xl mx-auto mb-10"
            >
              <div className="absolute -left-6 top-0 text-4xl text-[#1ff498] dark:text-[#0be084]">
                "
              </div>
              <p className="text-xl md:text-2xl italic font-medium text-[#01130c]/90 dark:text-[#ecfef7]/90 px-8">
                Kesehatan dan Kesejahteraan adalah 2 hal yang berbeda, tetapi dengan perbedaan itu akan membawa kehidupan yang sehat.
              </p>
              <div className="absolute -right-6 bottom-0 text-4xl text-[#1ff498] dark:text-[#0be084]">
                "
              </div>
              <p className="mt-4 text-[#01130c]/70 dark:text-[#ecfef7]/70">
                - Sija69Rek
              </p>
            </motion.div>

            {/* Description Text */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-12 text-[#01130c]/80 dark:text-[#ecfef7]/80 max-w-3xl mx-auto leading-relaxed"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. A nam
              ducimus tempora reprehenderit repudiandae amet officiis unde saepe
              iure fugit, explicabo corrupti harum veritatis molestias quaerat
              quisquam eum laboriosam commodi!
            </motion.p>

            {/* Action Buttons with Enhanced Design */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls.hero}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.div variants={itemVariants}>
                <Link
                  to="/about"
                  className="inline-flex items-center bg-gradient-to-r from-[#1ff498] to-[#50b7f7] hover:from-[#1ff498]/90 hover:to-[#50b7f7]/90 text-[#01130c] font-semibold px-8 py-4 rounded-lg transition-all shadow-lg shadow-[#1ff498]/30 dark:shadow-[#0be084]/30 hover:scale-105 hover:shadow-xl"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/forum"
                  className="inline-flex items-center bg-white/80 dark:bg-[#010907]/80 border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105 backdrop-blur-sm"
                >
                  Bergabung dengan Komunitas
                  <Users className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Original Wave Animation - Maintained */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16 md:h-20"
            >
              <motion.path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                className="fill-[#72e4f8]/15 dark:fill-[#07798d]/15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.path>
              <motion.path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                className="fill-[#1ff498]/15 dark:fill-[#0be084]/15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.3,
                }}
              ></motion.path>
            </svg>
          </div>
        </motion.section>
        {/* Enhanced Trust Banner */}
        <motion.section
          ref={refs.trust}
          initial="hidden"
          animate={controls.trust}
          variants={sectionVariants}
          className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4">
              <span className="text-sm font-medium">Kepercayaan Kami</span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Mengapa Memilih Kami?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ipsa
              non id minima nulla eaque, autem ducimus nobis voluptates
              reiciendis distinctio molestias nam ipsam. Sequi dolorem modi
              porro labore harum.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                >
                  <ShieldCheck className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">100% Aman</h3>
                <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 text-sm">
                  Perlindungan data
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                >
                  <Users className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">5000+ Pengguna</h3>
                <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 text-sm">
                  Pengguna aktif
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                >
                  <Award className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Bersertifikat</h3>
                <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 text-sm">
                  Diakui ahli kesehatan
                </p>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                >
                  <TrendingUp className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">93% Kepuasan</h3>
                <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 text-sm">
                  Tingkat kepuasan tinggi
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
        {/* Enhanced Features Navigation Section */}
        <motion.section
          ref={refs.features}
          initial="hidden"
          animate={controls.features}
          variants={sectionVariants}
          className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="text-sm font-medium">Fitur Utama</span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Jelajahi Dimensi Kesehatan Kami
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              quis risus eget urna mollis ornare vel eu leo.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card - Physical Health */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Link
                to="/features/physical-health"
                className="group feature-card"
              >
                <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 h-full flex flex-col">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                  >
                    <Heart className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">Kesehatan Fisik</h3>
                  <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 mb-4 flex-grow">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam quis risus eget urna mollis ornare vel eu leo.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-[#1ff498] dark:text-[#0be084] font-medium"
                  >
                    Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Feature Card - Mental Health */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Link
                to="/features/mental-health-emotions"
                className="group feature-card"
              >
                <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 h-full flex flex-col">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                  >
                    <Brain className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">
                    Kesehatan Mental & Emosi
                  </h3>
                  <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 mb-4 flex-grow">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam quis risus eget urna mollis ornare vel eu leo.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-[#1ff498] dark:text-[#0be084] font-medium"
                  >
                    Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Feature Card - Environmental Health */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Link
                to="/features/environmental-health"
                className="group feature-card"
              >
                <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 h-full flex flex-col">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                  >
                    <Leaf className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">
                    Kesehatan Lingkungan
                  </h3>
                  <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 mb-4 flex-grow">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam quis risus eget urna mollis ornare vel eu leo.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-[#1ff498] dark:text-[#0be084] font-medium"
                  >
                    Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Feature Card - Social Connections */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Link
                to="/features/social-connections"
                className="group feature-card"
              >
                <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 h-full flex flex-col">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                  >
                    <Users className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">Koneksi Sosial</h3>
                  <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 mb-4 flex-grow">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam quis risus egen urna mollis ornare vel eu leo.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-[#1ff498] dark:text-[#0be084] font-medium"
                  >
                    Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Feature Card - Financial Occupational Wellbeing */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Link
                to="/features/financial-occupational-wellbeing"
                className="group feature-card"
              >
                <div className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300 h-full flex flex-col">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 dark:group-hover:bg-[#0be084]/20 transition-colors"
                  >
                    <Briefcase className="text-[#1ff498] dark:text-[#0be084] w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">
                    Kesejahteraan Finansial & Pekerjaan
                  </h3>
                  <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 mb-4 flex-grow">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam quis risus eget urna mollis ornare vel eu leo.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-[#1ff498] dark:text-[#0be084] font-medium"
                  >
                    Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Forum Link */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Link to="/daily" className="group feature-card">
                <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 border-2 border-[#1ff498] dark:border-[#0be084] p-6 rounded-xl transition-all duration-300 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3">Berita Kesehatan Terkini</h3>
                  <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 mb-4 flex-grow">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam quis risus eget urna mollis ornare vel eu leo.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-[#1ff498] dark:text-[#0be084] font-medium"
                  >
                    Lihat Sekarang <ChevronRight className="w-5 h-5 ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.section>
        {/* Enhanced Banner Section */}
        <motion.section
          ref={refs.whyChooseUs}
          initial="hidden"
          animate={controls.whyChooseUs}
          variants={sectionVariants}
          className="relative py-12 px-4 md:px-8 lg:px-16 overflow-hidden"
        >
          {/* Animated background skew */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1ff498]/20 to-[#72e4f8]/30 dark:from-[#0be084]/20 dark:to-[#07798d]/30 transform -skew-y-3"
            initial={{ skewY: -3 }}
            whileHover={{ skewY: 0 }}
            transition={{ duration: 0.7 }}
          ></motion.div>
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold mb-4"
              >
                Mengapa Memilih Pillar Sehat?
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-[#01130c]/80 dark:text-[#ecfef7]/80 mb-6"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper
                nulla non metus auctor fringilla.
              </motion.p>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate={controls.whyChooseUs}
                className="space-y-3"
              >
                <motion.li
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-[#1ff498] dark:bg-[#0be084] rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-[#f6fefc] dark:text-[#010907]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-[#1ff498] dark:bg-[#0be084] rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-[#f6fefc] dark:text-[#010907]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Nullam quis risus eget urna mollis ornare vel eu leo</p>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-[#1ff498] dark:bg-[#0be084] rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-[#f6fefc] dark:text-[#010907]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Donec ullamcorper nulla non metus auctor fringilla</p>
                </motion.li>
              </motion.ul>
            </div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="md:w-5/12 relative"
            >
              <motion.div
                className="absolute -top-6 -left-6 w-full h-full bg-[#50b7f7]/20 dark:bg-[#086faf]/20 rounded-lg"
                variants={floatSlowVariants}
                animate="animate"
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 w-full h-full bg-[#1ff498]/20 dark:bg-[#0be084]/20 rounded-lg"
                variants={floatVariants}
                animate="animate"
              ></motion.div>
              <div className="relative bg-[#f6fefc] dark:bg-[#010907] p-6 rounded-lg shadow-lg">
                <motion.div
                  whileHover={{ backgroundColor: "rgba(1, 19, 12, 0.2)" }}
                  className="aspect-w-16 aspect-h-9 bg-[#01130c]/10 dark:bg-[#ecfef7]/10 rounded mb-4 overflow-hidden flex items-center justify-center cursor-pointer transition-colors duration-300"
                >
                  <motion.svg
                    whileHover={{ scale: 1.1 }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-[#1ff498] dark:text-[#0be084]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </motion.svg>
                </motion.div>
                <h3 className="font-bold text-lg mb-2">
                  Lihat Bagaimana Pillar Sehat Bekerja
                </h3>
                <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam quis risus eget urna mollis ornare vel eu leo.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
        {/* Enhanced FAQ Section */}
        <motion.section
          ref={refs.faq}
          initial="hidden"
          animate={controls.faq}
          variants={sectionVariants}
          className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="text-sm font-medium">FAQ</span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Pertanyaan Umum
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
            >
              Temukan jawaban atas pertanyaan yang sering diajukan kepada kami.
            </motion.p>
          </div>

          {/* FAQ Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Text */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-semibold text-[#01130c] dark:text-[#ecfef7] mb-4">
                Masih ada pertanyaan?
              </h3>
              <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 text-base">
                Berikut beberapa pertanyaan yang sering ditanyakan oleh user
                kami. Klik untuk melihat jawabannya.
              </p>
            </motion.div>

            {/* Accordion */}
            <motion.div variants={itemVariants} className="space-y-2 w-full">
              {faqData.map((faq, index) => (
                <div key={index} className="w-full">
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="text-[#1ff498] dark:text-[#0be084] w-5 h-5" />
                      <span className="text-[#01130c] dark:text-[#ecfef7] font-medium">
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-[#01130c] dark:text-[#ecfef7] w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pl-9 text-[#01130c]/80 dark:text-[#ecfef7]/80 text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Divider */}
                  {index !== faqData.length - 1 && (
                    <div className="border-t border-[#e0f7f5] dark:border-[#07798d]/50 mx-2" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>
        {/* Enhanced Testimonials Section */}
        <motion.section
          ref={refs.testimoni}
          initial="hidden"
          animate={controls.testimoni}
          variants={sectionVariants}
          className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="text-sm font-medium">Testimoni</span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Apa Kata Mereka?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
            >
              Testimoni dari pengguna kami yang telah merasakan manfaat dari
              website ini.
            </motion.p>
          </div>

          {/* Swiper Testimoni */}
          <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        el: '.testimoni-pagination',
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="testimoni-swiper pb-12"
    >
      {testimoniData.map((testi, index) => (
        <SwiperSlide key={index}>
          <motion.div
            variants={itemVariants}
            className="bg-[#f6fefc] dark:bg-[#010907] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full border border-[#1ff498]/20 dark:border-[#0be084]/20 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1ff498] to-[#0be084]"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#1ff498]/10 dark:bg-[#0be084]/10"></div>
            
            {/* Protected Image */}
            <div className="relative w-20 h-20 mb-4 group">
              <div 
                className="w-full h-full rounded-full border-2 border-[#1ff498] dark:border-[#0be084] bg-gray-100 dark:bg-gray-800 overflow-hidden pointer-events-none select-none"
                style={{
                  backgroundImage: `url(${testi.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                unselectable="on"
              />
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#1ff498] dark:group-hover:border-[#0be084] transition-all duration-300"></div>
            </div>
            
            <h4 className="text-lg font-semibold text-[#01130c] dark:text-[#ecfef7] mb-1">
              {testi.nama}
            </h4>
            <p className="text-sm text-[#01130c]/60 dark:text-[#ecfef7]/60 mb-4">
              {testi.sekolah}
            </p>
            <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80 italic relative z-10">
              "{testi.kesan}"
            </p>
            
            {/* Quote icon */}
            <svg 
              className="absolute bottom-2 right-4 text-[#1ff498]/20 dark:text-[#0be084]/20 w-12 h-12" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg> 
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>

        </motion.section>
        {/* Enhanced Call to Action */}
        <motion.section
          ref={refs.cta}
          initial="hidden"
          animate={controls.cta}
          variants={sectionVariants}
          className="bg-[#72e4f8]/20 dark:bg-[#07798d]/20 py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 bg-[#1ff498]/20 dark:bg-[#0be084]/20 rounded-full -translate-x-1/2 -translate-y-1/2"
            variants={floatSlowVariants}
            animate="animate"
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 bg-[#1ff498]/20 dark:bg-[#0be084]/20 rounded-full translate-x-1/2 translate-y-1/2"
            variants={floatVariants}
            animate="animate"
          ></motion.div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6"
            >
              Mulai Perjalanan Kesehatan Anda Sekarang
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg mb-8 max-w-2xl mx-auto text-[#01130c]/80 dark:text-[#ecfef7]/80"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper
              nulla non metus auctor fringilla.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-[#1ff498] to-[#50b7f7] hover:from-[#1ff498]/90 hover:to-[#50b7f7]/90 text-[#01130c] font-semibold px-8 py-4 rounded-lg transition-all shadow-lg shadow-[#1ff498]/30 dark:shadow-[#0be084]/30 hover:scale-105 hover:shadow-xl"
              >
                Hubungi Kami
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Notes:Added dark: classes for all className attributes that involve
      colors, ensuring they map to the dark mode palette.Changed SVG fill
      attributes to use className with Tailwind's fill- utility for consistency
      and to support dark mode (e.g., fill-[#72e4f8]/10
      dark:fill-[#07798d]/10).Adjusted opacity classes (e.g., /80, /70) to
      include dark mode equivalents with the same opacity but different base
      colors.Ensured all color references (#01130c, #f6fefc, #1ff498, #72e4f8,
      #50b7f7) were replaced with their dark mode counterparts (#ecfef7,
      #010907, #0be084, #07798d, #086faf) where applicable.Preserved all
      non-color-related classes and structure exactly as provided.For the
      divider in the FAQ section, adjusted the border color to a dark mode
      equivalent (border-[#e0f7f5] dark:border-[#07798d]/50).For the checkmark
      SVGs in the "Why Choose Pillar Sehat" section, inverted the text color to
      ensure contrast (text-[#f6fefc] dark:text-[#010907]).This code should now
      support dark mode styling while maintaining the original design and
      functionality. Let me know if you need further adjustments! */}
      </div>
  );
};

export default Home;
