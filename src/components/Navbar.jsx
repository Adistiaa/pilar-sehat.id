import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, Github } from "lucide-react";
import SearchBar from "./SearchBar";
import DarkModeButton from "./DarkModeButton";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
          path: "/about/financial-occupational-wellbeing",
        },
      ],
    },
    { name: "Forum", path: "/forum" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileSubmenu = (index) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  };

  return (
    <>
      {/* Main Navbar - Fixed Height */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.40)"
            : "rgba(255, 255, 255, 0.85)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: scrolled ? "0 2px 10px rgba(0, 0, 0, 0.08)" : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left Side (Logo) */}
          <motion.a
            href="/"
            className="flex items-center"
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="..." alt="Logo" className="h-10" />
          </motion.a>

          {/* Center (Navigation + Search) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation */}
            <ul className="flex space-x-1">
              {navLinks.map((link, index) => (
                <li key={index} className="relative group">
                  <div className="flex items-center px-3 py-2">
                    <a
                      href={link.path}
                      className="text-[#01130c] hover:text-[#50b7f7] font-medium transition-colors"
                    >
                      {link.name}
                    </a>
                    {link.submenu && (
                      <ChevronDown className="w-4 h-4 ml-1 text-[#01130c] transition-transform group-hover:rotate-180" />
                    )}
                  </div>

                  {/* Submenu */}
                  {link.submenu && (
                    <div className="absolute left-0 mt-0 w-48 bg-[#f6fefc] rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 border border-gray-100">
                      <ul className="py-1">
                        {link.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={subItem.path}
                              className="block px-4 py-2 text-[#01130c] hover:bg-blue-50 hover:text-[#50b7f7] transition-colors"
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
            
            <DarkModeButton />

            {/* SearchBar */}
            <div className="ml-4">
              <SearchBar
                isFocused={searchFocused}
                setIsFocused={setSearchFocused}
              />
            </div>
            
            <a
              href="https://github.com/your-username/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className="inline-block p-1"
            >
              <Github className="w-6 h-6 text-[#01130c] hover:text-[#50b7f7] transition-colors" />
            </a>
          </div>

          {/* Right Side (Mobile Menu Button) */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-[#01130c]" />
            ) : (
              <Menu className="w-6 h-6 text-[#01130c]" />
            )}
          </motion.button>
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
            className="fixed top-0 right-0 bottom-0 w-80 z-50 md:hidden flex flex-col"
            style={{
              backdropFilter: "blur(16px)",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100/50 h-16">
              <motion.h2
                className="text-xl font-semibold text-[#01130c]"
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
                  e.stopPropagation(); // Mencegah event bubbling
                  setMenuOpen(false);
                  setMobileSubmenuOpen(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400/30"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.15 },
                }}
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
                <X className="w-5 h-5 text-[#01130c] pointer-events-none" />
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
                  >
                    <div className="flex flex-col">
                      <motion.div
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-[#f6fefc] transition-colors"
                        whileTap={{
                          backgroundColor: "rgba(243, 244, 246, 0.5)",
                        }}
                      >
                        <a
                          href={link.path}
                          className="font-medium text-[#01130c] hover:text-[#50b7f7] transition-colors"
                          onClick={(e) => {
                            if (link.submenu) {
                              e.preventDefault();
                              toggleMobileSubmenu(index);
                            } else {
                              setMenuOpen(false);
                            }
                          }}
                        >
                          {link.name}
                        </a>
                        {link.submenu && (
                          <motion.div
                            animate={{
                              rotate: mobileSubmenuOpen === index ? 180 : 0,
                              transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              },
                            }}
                          >
                            <ChevronDown className="w-4 h-4 text-[#01130c]" />
                          </motion.div>
                        )}
                      </motion.div>

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
                                  className="hover:bg-[#f6fefc] transition-colors"
                                >
                                  <a
                                    href={subItem.path}
                                    className="block px-8 py-2.5 text-[#01130c] text-sm hover:text-[#50b7f7] transition-colors"
                                    onClick={() => setMenuOpen(false)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
