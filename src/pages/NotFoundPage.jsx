import { motion } from "framer-motion";
import { Headset, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f6fefc] to-[#e0f7f5] dark:from-[#010907] dark:to-[#01130c] flex flex-col items-center justify-center px-4 py-12">
      {/* Enhanced Decorative Animated Shapes - More visible in light mode */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-90 dark:opacity-60">
        {/* Floating Circles */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute top-1/4 left-1/4 fill-[#1ff498]/50 dark:fill-[#0be084]/30"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7, 0],
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
          <circle cx="100" cy="30" r="18" className="fill-[#72e4f8]/40 dark:fill-[#07798d]/25" />
        </motion.svg>

        {/* Bubbles - More pronounced */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute top-1/3 right-1/4 fill-[#50b7f7]/50 dark:fill-[#086faf]/30"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.6, 0],
            scale: [0.7, 1.4, 0.9, 1.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <path d="M30,50 Q50,30 70,50 Q50,70 30,50 Z" />
          <path 
            d="M80,80 Q90,70 100,80 Q90,90 80,80 Z" 
            className="fill-[#0be084]/40 dark:fill-[#1ff498]/25" 
          />
        </motion.svg>

        {/* Floating Triangles - New element */}
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

        {/* Organic Blob - More movement */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute bottom-1/3 right-1/4 fill-[#72e4f8]/50 dark:fill-[#07798d]/30"
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

        {/* Sparkles - New element */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#1ff498] dark:bg-[#0be084]"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center p-8 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative inline-block mb-6">
            <h1 className="text-9xl md:text-9xl font-bold text-[#01130c] dark:text-[#ecfef7] mb-4 relative z-10">
              404
            </h1>
            <div className="absolute -inset-4 bg-[#1ff498]/20 dark:bg-[#0be084]/15 rounded-full blur-md z-0"></div>
          </div>
          
          <h2 className="text-3xl md:text-3xl font-semibold text-[#01130c] dark:text-[#ecfef7] mb-6">
            Oops! Kamu nyasar ke halaman yang nggak ada.
          </h2>
          
          <p className="text-lg text-[#01130c]/90 dark:text-[#ecfef7]/90 mb-8 max-w-2xl mx-auto">
            Sepertinya kamu tersesat di timeline kosong dan hampa sendirian tanpa ada yang menemani mu. 
            Yuk, kita balik aja ke timeline kamu yang benar!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#1ff498] to-[#50b7f7] dark:from-[#0be084] dark:to-[#086faf] text-[#f6fefc] dark:text-[#010907] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Return Home
                <Home className="inline-block ml-2" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-block px-8 py-4 rounded-full bg-white dark:bg-[#01130c] border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Support
                <Headset className="inline-block ml-2" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated floating elements */}
        <div className="mt-12 flex justify-center space-x-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-16 w-16 rounded-full bg-[#1ff498]/20 dark:bg-[#0be084]/15 border-2 border-[#1ff498]/30 dark:border-[#0be084]/20 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              <svg
                className="w-6 h-6 text-[#01130c] dark:text-[#ecfef7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
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

export default NotFoundPage;