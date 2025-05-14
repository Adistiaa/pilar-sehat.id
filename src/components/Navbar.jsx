import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Github,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import SearchBar from "./SearchBar";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // Deteksi posisi scroll untuk mengatur efek blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (index) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Features",
      submenu: [
        { name: "Physical Health", path: "/features/physical-health" },
        {
          name: "Mental Health and Emotions",
          path: "/features/mental-health-emotions",
        },
        {
          name: "Environmental Health",
          path: "/features/environmental-health",
        },
        { name: "Social Connections", path: "/features/social-connections" },
        {
          name: "Financial and Occupational Wellbeing",
          path: "/features/financial-occupational-wellbeing",
        },
      ],
    },
    { name: "Daily News", path: "/daily" },
    { name: "Contact", path: "/contact" },
  ];

  // const toggleMobileSubmenu = (index) => {
  //   setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  // };

  //DarkModeButton
  const [showOptions, setShowOptions] = useState(false);
  const { isDarkMode, toggleDarkMode, isAutoMode, setAutoMode } = useTheme();
  const handleToggle = () => {
    if (isAutoMode) {
      setAutoMode(false);
      toggleDarkMode();
    } else {
      toggleDarkMode();
    }
  };

  // Logo URLs (replace with actual URLs)
  const lightLogo = 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747231230/const_staggerVariants_hidden_opacity_0_visible_opacity_1_transition_staggerChildren_0.1_delayChildren_0.2_l60kgk.svg'; // Light Mode logo
  const darkLogo = 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747259722/const_staggerVariants_hidden_opacity_0_visible_opacity_1_transition_staggerChildren_0.1_delayChildren_0.2_1_kjxtab.svg'; //  Dark Mode logo

  return (
    <>
      {/* Main Navbar - Fixed Height */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-white/40 dark:bg-[#010907]/80 backdrop-blur-md shadow-md dark:shadow-[#0be084]/10 border-b border-black/10 dark:border-[#0be084]/20"
            : "bg-white/85 dark:bg-[#010907]/90 backdrop-blur-none border-b border-black/10 dark:border-[#0be084]/20"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left Side (Logo) */}
          <motion.a
            href="/"
            draggable="false"
            className="flex items-center"
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={isDarkMode ? darkLogo : lightLogo}
            alt="Logo" 
            draggable="false" 
            onContextMenu={(e) => e.preventDefault()} 
            className="h-15" />
          </motion.a>

          {/* Center (Navigation + Search) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation */}
            <ul className="flex space-x-1">
              {navLinks.map((link, index) => (
                <li key={index} className="relative group">
                  <div className="flex items-center px-3 py-2 group">
                    <a
                      href={link.path}
                      className={`${
                        location.pathname === link.path
                          ? "text-[#50b7f7] dark:text-[#0be084] font-semibold"
                          : "text-[#01130c] dark:text-[#ecfef7] group-hover:text-[#50b7f7] dark:group-hover:text-[#086faf]"
                      } font-medium transition-colors`}
                    >
                      {link.name}
                    </a>
                    {link.submenu && (
                      <ChevronDown className="w-4 h-4 ml-1 text-[#01130c] dark:text-[#ecfef7] group-hover:text-[#50b7f7] dark:group-hover:text-[#086faf] transition-all duration-300 group-hover:rotate-180" />
                    )}
                  </div>

                  {/* Submenu */}
                  {link.submenu && (
                    <div className="absolute left-0 mt-0 w-48 bg-[#f6fefc] dark:bg-[#010907] rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 border border-gray-100 dark:border-[#0be084]/20">
                      <ul className="py-1">
                        {link.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={subItem.path}
                              className={`block px-4 py-2 ${
                                location.pathname === subItem.path
                                  ? "text-[#50b7f7] dark:text-[#0be084] font-semibold bg-blue-50 dark:bg-[#086faf]/10"
                                  : "text-[#01130c] dark:text-[#ecfef7] hover:bg-blue-50 dark:hover:bg-[#086faf]/10 hover:text-[#50b7f7] dark:hover:text-[#0be084]"
                              } transition-colors`}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* SearchBar */}
            <div className="ml-4">
              <SearchBar
                isFocused={searchFocused}
                setIsFocused={setSearchFocused}
              />
            </div>

            <a
              href="https://github.com/Adistiaa/pilar-sehat.id"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lihat di GitHub"
              className="inline-block p-1"
            >
              <Github className="w-6 h-6 text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#0be084] transition-colors" />
            </a>

            {/* Dark Mode (Desktop) */}
            <div className="relative">
              <motion.button
                onClick={handleToggle}
                className="w-10 h-10 flex items-center justify-center rounded-full p-1.5 leading-none text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#0be084] border border-gray-300 dark:border-gray-700 transition-all"
                whileTap={{ scale: 0.95 }}
                title={isDarkMode ? "Dark Mode" : "Light Mode"}
              >
                {isDarkMode ? (
                  <Sun size={22} className="flex-shrink-0" />
                ) : (
                  <Moon size={22} className="flex-shrink-0" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Right Side (Mobile Menu Button) */}
          <div className="flex items-center space-x-2 md:hidden">
            <a
              href="https://github.com/Adistiaa/pilar-sehat.id"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lihat di GitHub"
              className="inline-block p-1"
            >
              <Github className="w-6 h-6 text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#0be084] transition-colors" />
            </a>
            {/* Dark Mode (Mobile) */}
            <div className="relative">
              <motion.button
                onClick={handleToggle}
                className="w-10 h-10 flex items-center justify-center rounded-full p-1.5 leading-none text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#0be084] border border-gray-300 dark:border-gray-700 transition-all"
                whileTap={{ scale: 0.95 }}
                title={isDarkMode ? "Dark Mode" : "Light Mode"}
              >
                {isDarkMode ? (
                  <Sun size={22} className="flex-shrink-0" />
                ) : (
                  <Moon size={22} className="flex-shrink-0" />
                )}
              </motion.button>
            </div>

            <motion.button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-[#01130c] dark:text-[#ecfef7]" />
              ) : (
                <Menu className="w-6 h-6 text-[#01130c] dark:text-[#ecfef7]" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.5,
            }}
            className="fixed top-0 right-0 bottom-0 w-80 z-50 md:hidden flex flex-col bg-white/98 dark:bg-[#010907]/95 backdrop-blur-md border-l border-black/8 dark:border-[#0be084]/20"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100/50 dark:border-[#0be084]/20 h-16">
              <motion.h2
                className="text-xl font-semibold text-[#01130c] dark:text-[#ecfef7]"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.15, duration: 0.3 },
                }}
              >
                Menu
              </motion.h2>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setMobileSubmenuOpen(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-[#086faf]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400/30 dark:focus:ring-[#0be084]/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, rotate: 45 }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.3,
                    rotate: { type: "spring", stiffness: 500, damping: 15 },
                  },
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                  transition: { duration: 0.2 },
                }}
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#01130c] dark:text-[#ecfef7] pointer-events-none" />
              </motion.button>
            </div>

            {/* SearchBar */}
            <div className="md:flex mt-4 mb-4 px-4">
              <SearchBar
                isFocused={searchFocused}
                setIsFocused={setSearchFocused}
              />
            </div>

            {/* Navigation Links */}
            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide">
              <ul className="py-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: index * 0.03 + 0.2,
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      },
                    }}
                    className="relative"
                  >
                    <div className="flex flex-col">
                      {/* Main Menu Item - Entire area clickable */}
                      <div
                        className={`flex items-center justify-between px-4 py-2.5 group cursor-pointer hover:bg-[#f6fefc] dark:hover:bg-[#086faf]/10 transition-colors ${
                          mobileSubmenuOpen === index
                            ? "bg-[#f6fefc] dark:bg-[#086faf]/10"
                            : ""
                        }`}
                        onClick={() => {
                          if (!link.submenu) {
                            setMenuOpen(false);
                          }
                        }}
                      >
                        <a
                          href={link.path || "#"}
                          className={`flex-1 font-medium ${
                            location.pathname === link.path
                              ? "text-[#50b7f7] dark:text-[#0be084]"
                              : "text-[#01130c] dark:text-[#ecfef7] group-hover:text-[#50b7f7] dark:group-hover:text-[#0be084]"
                          } transition-colors`}
                          onClick={(e) => {
                            if (link.submenu) {
                              e.preventDefault();
                              toggleMobileSubmenu(index);
                            }
                          }}
                        >
                          {link.name}
                        </a>

                        {link.submenu && (
                          <motion.div
                            className="flex items-center justify-center w-6 h-6"
                            animate={{
                              rotate: mobileSubmenuOpen === index ? 180 : 0,
                              transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              },
                            }}
                          >
                            <ChevronDown className="w-4 h-4 text-[#01130c] dark:text-[#ecfef7] group-hover:text-[#50b7f7] dark:group-hover:text-[#0be084] transition-colors" />
                          </motion.div>
                        )}
                      </div>

                      {/* Mobile Submenu */}
                      {link.submenu && (
                        <AnimatePresence>
                          {mobileSubmenuOpen === index && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    duration: 0.3,
                                  },
                                  opacity: { duration: 0.2 },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.25 },
                                  opacity: { duration: 0.15 },
                                },
                              }}
                              className="overflow-hidden"
                            >
                              {link.submenu.map((subItem, subIndex) => (
                                <motion.li
                                  key={subIndex}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                      delay: subIndex * 0.03,
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 20,
                                    },
                                  }}
                                  className="hover:bg-[#f6fefc] dark:hover:bg-[#086faf]/10 transition-colors"
                                >
                                  <a
                                    href={subItem.path}
                                    className={`block px-8 py-2.5 text-sm ${
                                      location.pathname === subItem.path
                                        ? "text-[#50b7f7] dark:text-[#0be084] font-semibold bg-[#f6fefc] dark:bg-[#086faf]/10"
                                        : "text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#0be084]"
                                    } transition-colors w-full`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMenuOpen(false);
                                    }}
                                  >
                                    {subItem.name}
                                  </a>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer with GitHub link in mobile menu */}
            <div className="p-4 border-t border-gray-100/50 dark:border-[#0be084]/20">
              <a
                href="https://github.com/your-username/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-[#086faf]/10 transition-colors"
              >
                <Github className="w-5 h-5 text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#0be084] transition-colors" />
                <span className="text-sm font-medium text-[#01130c] dark:text-[#ecfef7] hover:text-[#50b7f7] dark:hover:text-[#0be084] transition-colors">
                  View on GitHub
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
