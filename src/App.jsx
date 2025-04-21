import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ForumPage from "./pages/ForumPage";
import ContactPage from "./pages/ContactPage";
import PhysicalHealth from "./pages/features/PhysicalHealth";
import MentalHealthEmotions from "./pages/features/MentalHealthEmotions";
import EnvironmentalHealth from "./pages/features/EnvironmentalHealth";
import SocialConnections from "./pages/features/SocialConnections";
import FinancialOccupationalWellbeing from "./pages/features/FinancialOccupationalWellbeing";
import NotFoundPage from "./pages/NotFoundPage";

import Navbar from "./components/Navbar";
import AIChatWidget from "./components/AIChatWidget.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import LoadingScreenTime from "./components/loading time/LoadingScreenTime.jsx";

import { AnimatePresence, motion } from "framer-motion";

function App() {
  const URL = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Loading muncul 3 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 6 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <LoadingScreenTime />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col min-h-screen"
            >
              <Navbar />
              <AIChatWidget apiKey={URL} />

              <main className="flex-grow">
                <Routes>
                  {/* Main Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/oo" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/forum" element={<ForumPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Features Submenu Pages */}
                  <Route path="/features/physical-health" element={<PhysicalHealth />} />
                  <Route path="/features/mental-health-emotions" element={<MentalHealthEmotions />} />
                  <Route path="/features/environmental-health" element={<EnvironmentalHealth />} />
                  <Route path="/features/social-connections" element={<SocialConnections />} />
                  <Route path="/about/financial-occupational-wellbeing" element={<FinancialOccupationalWellbeing />} />

                  {/* Optional 404 Not Found Page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
