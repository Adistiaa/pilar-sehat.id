import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  HeartPulse,
  Brain,
  Leaf,
  Home,
  PenLine,
  Headset,
  Handshake,
  Newspaper,
  HandHeart
} from "lucide-react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <footer className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] py-12 border-t border-[#1ff498] dark:border-[#0be084]">
      <div className="container mx-auto px-4">
        {/* Logo and tagline section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center mb-5"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center mb-3"
          >
            <img src="https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747231223/PilarSehat_4_eovrhn.svg" alt="PilarSehat Logo" className="h-35" draggable="false" loading="lazy" onContextMenu={(e) => e.preventDefault()} />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-[#01130c] dark:text-[#ecfef7] opacity-80 dark:opacity-90 text-lg"
          >
            Kesehatan untuk semua masyarakat Indonesia
          </motion.p>
        </motion.div>

        {/* Navigation links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Main Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-xl font-semibold mb-6 text-[#01130c] dark:text-[#ecfef7] relative">
              <span className="relative z-10">Halaman Utama</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1ff498] dark:bg-[#0be084] opacity-40 z-0"></span>
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <motion.li variants={itemVariants}>
                <Link
                  to="/"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <Home size={18} /> Home
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  to="/about"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/about"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <PenLine size={18} /> About
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  to="/daily"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/daily"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <Newspaper size={18} /> Daily News
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  to="/contact"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/contact"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <Headset size={18} /> Contact
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Features Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-xl font-semibold mb-6 text-[#01130c] dark:text-[#ecfef7] relative">
              <span className="relative z-10">Fitur Kesehatan</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1ff498] dark:bg-[#0be084] opacity-40 z-0"></span>
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <motion.li variants={itemVariants}>
                <Link
                  to="/features/physical-health"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/features/physical-health"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <HeartPulse size={18} /> Physical Health
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  to="/features/mental-health-emotions"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/features/mental-health-emotions"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <Brain size={18} /> Mental Health
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  to="/features/environmental-health"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/features/environmental-health"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <Leaf size={18} /> Environmental
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  to="/features/social-connections"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/features/social-connections"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <Handshake size={18} /> Social
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-xl font-semibold mb-6 text-[#01130c] dark:text-[#ecfef7] relative">
              <span className="relative z-10">Kesejahteraan</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1ff498] dark:bg-[#0be084] opacity-40 z-0"></span>
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <motion.li variants={itemVariants}>
                <Link
                  to="/features/donation"
                  className={`flex items-center gap-2 transition-colors duration-300 font-medium ${
                    location.pathname === "/features/donation"
                      ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                      : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#086faf]"
                  }`}
                >
                  <HandHeart size={18} /> Donation
                </Link>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex justify-center md:justify-start space-x-4 pt-4"
              >
                <motion.a
                  href="#"
                  aria-label="Facebook"
                  whileHover={{ scale: 1.1 }}
                  className="text-[#72e4f8] dark:text-[#07798d] hover:text-[#1ff498] dark:hover:text-[#0be084] transition-colors duration-300"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="Twitter"
                  whileHover={{ scale: 1.1 }}
                  className="text-[#72e4f8] dark:text-[#07798d] hover:text-[#1ff498] dark:hover:text-[#0be084] transition-colors duration-300"
                >
                  <Twitter size={20} />
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-[#72e4f8] dark:border-[#07798d] opacity-30 dark:opacity-50"
        >
          <p className="text-center text-[#01130c] dark:text-[#ecfef7] opacity-70 dark:opacity-80">
            © {new Date().getFullYear()} Pillar Sehat. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
