import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = [
  "Sedang menyiapkan pengalaman terbaik untuk Anda",
  "Tunggu, sebentar lagi",
  "Terima kasih mau menunggu"
];

const colors = ["#1ff498", "#72e4f8", "#50b7f7"];  

export default function LoadingScreenTime() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500); // Ganti teks tiap 2.5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f6fefc]">
      {/* Dots Loader */}
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
          key={i}
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colors[i] }} // <- kasih warna dari array
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
        ))}
      </div>

      {/* Text Loader */}
      <div className="relative mt-5 h-6 sm:h-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-sm sm:text-base md:text-lg font-semibold text-[#01130c]"
          >
            {texts[index]}<span className="animate-pulse">...</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
