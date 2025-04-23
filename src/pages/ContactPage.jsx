import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  User,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import DayNightGlobe from "../components/DayNightGlobe";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const controls = useAnimation();
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

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

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
      loading: true
    });
    
    // EmailJS integration
    emailjs.sendForm(
      'YOUR_SERVICE_ID', 
      'YOUR_TEMPLATE_ID', 
      formRef.current, 
      'YOUR_PUBLIC_KEY'
    )
      .then((result) => {
        setFormStatus({
          submitted: true,
          error: false,
          message: "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.",
          loading: false
        });
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, (error) => {
        setFormStatus({
          submitted: true,
          error: true,
          message: "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
          loading: false
        });
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      } 
    },
    tap: { scale: 0.95 }
  };

  const inputFocusVariants = {
    rest: { 
      boxShadow: "0 0 0 0 rgba(31, 244, 152, 0)" 
    },
    focus: { 
      boxShadow: "0 0 0 3px rgba(31, 244, 152, 0.2)" 
    }
  };

  return (
    <div className="bg-[#f6fefc] text-[#01130c] min-h-screen relative">
      {/* Header Section */}
      <section className="pt-20 pb-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block border-2 border-[#1ff498] text-[#01130c] px-4 py-1 rounded-full mb-4"
            >
              <span className="flex items-center text-sm font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Hubungi Kami
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent">
              Mari Berbincang
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-[#01130c]">
              Ada pertanyaan atau ingin tahu lebih banyak tentang layanan kami? Kami siap membantu Anda mencapai kesehatan yang lebih baik dalam semua aspek kehidupan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Globe and Contact Info Side-by-Side */}
            <div className="space-y-8">
              {/* Globe Visualization - Now in a separate container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg border border-[#72e4f8]/20"
              >
                <div className="h-[350px] relative overflow-hidden rounded-xl">
                  <DayNightGlobe />
                </div>
              </motion.div>
              
              {/* Contact Info in a separate card below the globe */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-[#1ff498]/20"
              >
                <h3 className="text-xl font-bold mb-4 text-[#01130c]">
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#50b7f7]/10 text-[#50b7f7]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <p className="ml-4 text-[#01130c]">
                      Jl. Kesehatan No. 123, Jakarta Selatan
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#1ff498]/10 text-[#1ff498]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <p className="ml-4">
                      <a 
                        href="mailto:hello@healthpillar.com" 
                        className="text-[#01130c] hover:text-[#1ff498] transition-colors"
                      >
                        hello@healthpillar.com
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#72e4f8]/10 text-[#72e4f8]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <p className="ml-4">
                      <a 
                        href="tel:+6221234567890" 
                        className="text-[#01130c] hover:text-[#72e4f8] transition-colors"
                      >
                        +62 21 2345 6789
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-[#1ff498]/20"
            >
              <div>
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl font-bold mb-6 text-[#01130c]"
                >
                  Kirim Pesan
                </motion.h2>

                {formStatus.submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`p-4 mb-6 rounded-lg flex items-start ${
                      formStatus.error ? "bg-red-100 text-red-700 border border-red-200" : "bg-green-100 text-green-700 border border-green-200"
                    }`}
                  >
                    <AlertCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${formStatus.error ? "text-red-500" : "text-green-500"}`} />
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <motion.div variants={itemVariants} className="relative">
                    <label htmlFor="name" className="block mb-2 font-medium text-[#01130c]">
                      Nama
                    </label>
                    <div className="relative">
                      <motion.input
                        initial="rest"
                        whileFocus="focus"
                        variants={inputFocusVariants}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#72e4f8] focus:border-[#1ff498] focus:outline-none transition bg-white"
                        placeholder="Nama lengkap Anda"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1ff498]" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <label htmlFor="email" className="block mb-2 font-medium text-[#01130c]">
                      Email
                    </label>
                    <div className="relative">
                      <motion.input
                        initial="rest"
                        whileFocus="focus"
                        variants={inputFocusVariants}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#72e4f8] focus:border-[#1ff498] focus:outline-none transition bg-white"
                        placeholder="email@contoh.com"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1ff498]" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <label htmlFor="subject" className="block mb-2 font-medium text-[#01130c]">
                      Subjek
                    </label>
                    <div className="relative">
                      <motion.input
                        initial="rest"
                        whileFocus="focus"
                        variants={inputFocusVariants}
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#72e4f8] focus:border-[#1ff498] focus:outline-none transition bg-white"
                        placeholder="Topik pesan Anda"
                      />
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1ff498]" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <label htmlFor="message" className="block mb-2 font-medium text-[#01130c]">
                      Pesan
                    </label>
                    <motion.textarea
                      initial="rest"
                      whileFocus="focus"
                      variants={inputFocusVariants}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-[#72e4f8] focus:border-[#1ff498] focus:outline-none transition bg-white"
                      placeholder="Ceritakan lebih detail tentang pertanyaan atau kebutuhan Anda..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={formStatus.loading}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonVariants}
                      className="w-full px-6 py-3 bg-[#1ff498] hover:bg-[#50b7f7] text-[#01130c] font-medium rounded-lg flex items-center justify-center group transition-colors duration-300"
                    >
                      {formStatus.loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                  </motion.div>
                </form>

                <motion.div
                  variants={itemVariants}
                  className="mt-6 text-center text-sm text-[#01130c]/70"
                >
                  Dengan mengirimkan pesan, Anda menyetujui{" "}
                  <Link to="/kebijakan-privasi" className="text-[#1ff498] hover:underline">
                    Kebijakan Privasi
                  </Link>{" "}
                  kami.
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;