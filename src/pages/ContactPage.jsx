import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import DayNightGlobe from "../components/DayNightGlobe";
import emailjs from "@emailjs/browser";
import useScrollAnimations from "../components/AnimasiScroll";

const ContactPage = () => {
  // const controls = useAnimation();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
    loading: false,
  });

  // useEffect(() => {
  //   controls.start("visible");
  // }, [controls]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      ...formStatus,
      loading: true,
    });

    // EmailJS integration
    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          setFormStatus({
            submitted: true,
            error: false,
            message:
              "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.",
            loading: false,
          });

          // Reset form after successful submission
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          setFormStatus({
            submitted: true,
            error: true,
            message:
              "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
            loading: false,
          });
        }
      );
  };

  // // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // const buttonVariants = {
  //   rest: { scale: 1 },
  //   hover: {
  //     scale: 1.05,
  //     transition: {
  //       duration: 0.3,
  //       ease: "easeOut"
  //     }
  //   },
  //   tap: { scale: 0.95 }
  // };

  // const inputFocusVariants = {
  //   rest: {
  //     boxShadow: "0 0 0 0 rgba(31, 244, 152, 0)"
  //   },
  //   focus: {
  //     boxShadow: "0 0 0 3px rgba(31, 244, 152, 0.2)"
  //   }
  // };
  const { refs, controls, isVisible, sectionVariants, isHeroInView } =
    useScrollAnimations();

  return (
    <div
      className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] min-h-screen relative"
      id="content"
    >
      {/* Header Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative pt-28 pb-3 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center text-sm font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Hubungi Kami
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Mari{" "}
              <span className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent">
                Berbincang
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
            >
              Ada pertanyaan atau ingin tahu lebih banyak tentang layanan kami?
              Kami siap membantu Anda mencapai kesehatan yang lebih baik dalam
              semua aspek kehidupan.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Main Contact Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="py-12 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Globe and Contact Info */}
            <div className="space-y-8">
              {/* Globe Card */}
              <motion.div
                variants={itemVariants}
                className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] rounded-xl transition-all duration-300 overflow-hidden"
              >
                <div className="h-[350px] relative">
                  <DayNightGlobe />
                </div>
              </motion.div>

              {/* Contact Info Card */}
              <motion.div
                variants={itemVariants}
                className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-[#1ff498] dark:text-[#0be084] w-5 h-5 mr-3 flex-shrink-0" />
                    <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Jl. Dr. KRT Radjiman Widyodiningrat No.32, RT.07/RW.7,
                      Rawa Badung, Kec. Cakung, Kota Jakarta Timur, Daerah
                      Khusus Ibukota Jakarta 13930
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-[#1ff498] dark:text-[#0be084] w-5 h-5 mr-3 flex-shrink-0" />
                    <a
                      href="mailto:pilarsehat@gmail.com"
                      className="text-[#01130c]/80 dark:text-[#ecfef7]/80 hover:text-[#1ff498] dark:hover:text-[#0be084] transition-colors"
                    >
                      pilarsehat@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-[#1ff498] dark:text-[#0be084] w-5 h-5 mr-3 flex-shrink-0" />
                    <a
                      href="tel:+6289693440807"
                      className="text-[#01130c]/80 dark:text-[#ecfef7]/80 hover:text-[#72e4f8] dark:hover:text-[#0be084] transition-colors"
                    >
                      +62 896-9344-0807
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-6 rounded-xl transition-all duration-300"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Kirim Pesan</h2>

                {formStatus.submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`p-4 mb-6 rounded-lg flex items-start ${
                      formStatus.error
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                    }`}
                  >
                    <AlertCircle
                      className={`w-5 h-5 mr-2 flex-shrink-0 ${
                        formStatus.error ? "text-red-500" : "text-green-500"
                      }`}
                    />
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block mb-2 font-medium text-[#01130c] dark:text-[#ecfef7]"
                    >
                      Nama
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#72e4f8] dark:border-[#07798d] focus:border-[#1ff498] dark:focus:border-[#0be084] focus:outline-none transition bg-[#f6fefc] dark:bg-[#010907]"
                        placeholder="Nama lengkap Anda"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1ff498] dark:text-[#0be084]" />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-[#01130c] dark:text-[#ecfef7]"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#72e4f8] dark:border-[#07798d] focus:border-[#1ff498] dark:focus:border-[#0be084] focus:outline-none transition bg-[#f6fefc] dark:bg-[#010907]"
                        placeholder="email@contoh.com"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1ff498] dark:text-[#0be084]" />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="subject"
                      className="block mb-2 font-medium text-[#01130c] dark:text-[#ecfef7]"
                    >
                      Subjek
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#72e4f8] dark:border-[#07798d] focus:border-[#1ff498] dark:focus:border-[#0be084] focus:outline-none transition bg-[#f6fefc] dark:bg-[#010907]"
                        placeholder="Topik pesan Anda"
                      />
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1ff498] dark:text-[#0be084]" />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block mb-2 font-medium text-[#01130c] dark:text-[#ecfef7]"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#72e4f8] dark:border-[#07798d] focus:border-[#1ff498] dark:focus:border-[#0be084] focus:outline-none transition bg-[#f6fefc] dark:bg-[#010907]"
                      placeholder="Ceritakan lebih detail tentang pertanyaan atau kebutuhan Anda..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formStatus.loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#1ff498] to-[#50b7f7] text-[#01130c] font-medium rounded-lg flex items-center justify-center group transition-all duration-300 shadow-lg hover:shadow-[#1ff498]/20"
                  >
                    {formStatus.loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengirim Pesan...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Kirim Pesan
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
                  Dengan mengirimkan pesan, Anda menyetujui{" "}
                  <Link
                    to="/kebijakan-privasi"
                    className="text-[#1ff498] dark:text-[#0be084] hover:underline"
                  >
                    Kebijakan Privasi
                  </Link>{" "}
                  kami.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
    </div>
  );
};

export default ContactPage;
