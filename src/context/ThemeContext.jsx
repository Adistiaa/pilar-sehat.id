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
  const [isReady, setIsReady] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get saved preferences
    const savedTheme = localStorage.getItem("theme");
    const savedAutoMode = localStorage.getItem("autoMode");

    // Set auto mode preference
    if (savedAutoMode !== null) {
      setIsAutoMode(savedAutoMode === "true");
    }

    // If auto mode is enabled or not set yet, use system preference
    if (savedAutoMode === null || savedAutoMode === "true") {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemIsDark);
    } 
    // Otherwise use saved theme preference
    else if (savedTheme !== null) {
      setIsDarkMode(savedTheme === "dark");
    }

    setIsReady(true);
  }, []);

  // Apply theme changes and handle system preference changes
  useEffect(() => {
    if (!isReady || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = (e) => {
      if (isAutoMode) {
        setIsDarkMode(e.matches);
      }
    };

    // Apply current theme
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Listen for system theme changes
    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [isDarkMode, isAutoMode, isReady]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setIsAutoMode(false);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    localStorage.setItem("autoMode", "false");
  };

  const setAutoMode = (auto) => {
    setIsAutoMode(auto);
    localStorage.setItem("autoMode", auto.toString());
    if (auto) {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemIsDark);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode,
      isAutoMode,
      setAutoMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}