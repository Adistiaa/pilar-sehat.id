import React, { useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkModeButton() {
  const { isDarkMode, toggleDarkMode, isAutoMode, setAutoMode } = useTheme();

  const handleToggle = () => {
    if (isAutoMode) {
      setAutoMode(false);
      toggleDarkMode();
    } else {
      toggleDarkMode();
    }
  };

  const selectMode = (mode) => {
    if (mode === "auto") {
      setAutoMode(true);
    } else {
      setAutoMode(false);
      toggleDarkMode(mode === "dark");
      localStorage.setItem("theme", mode);
    }
  };

  return (
    <>
<motion.button
  onClick={handleToggle}
  className="w-11 h-11 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white transition-all"
  title={
    isAutoMode
      ? "System Theme (Double click for options)"
      : isDarkMode
      ? "Dark Mode (Double click for options)"
      : "Light Mode (Double click for options)"
  }
>
  {isAutoMode ? (
    <Monitor size={20} />
  ) : isDarkMode ? (
    <Sun size={20} />
  ) : (
    <Moon size={20} />
  )}
</motion.button>
    </>
  );
}
