import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
  isAutoMode: true,
  setAutoMode: () => {},
});

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedAuto = localStorage.getItem("autoMode");
    const savedTheme = localStorage.getItem("theme");

    const auto = savedAuto !== "false";
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsAutoMode(auto);
    setIsDarkMode(auto ? systemDark : savedTheme === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (dark) => {
      if (dark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    };

    applyTheme(isDarkMode);

    if (isAutoMode) {
      localStorage.setItem("autoMode", "true");
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("autoMode", "false");
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, isAutoMode, mounted]);

  const toggleDarkMode = () => {
    setIsAutoMode(false);
    setIsDarkMode((prev) => !prev);
  };

  const setAutoMode = (auto) => {
    setIsAutoMode(auto);
    if (auto) {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemDark);
    }
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, isAutoMode, setAutoMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
