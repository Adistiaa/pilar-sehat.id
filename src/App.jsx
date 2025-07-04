import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DailyPage from "./pages/DailyPage.jsx";
import ContactPage from "./pages/ContactPage";
import PhysicalHealth from "./pages/features/PhysicalHealth";
import MentalHealthEmotions from "./pages/features/MentalHealthEmotions";
import EnvironmentalHealth from "./pages/features/EnvironmentalHealth";
import SocialConnections from "./pages/features/SocialConnections";
import Donation from "./pages/features/Donation.jsx";
import NotFoundPage from "./pages/NotFoundPage";

import Navbar from "./components/Navbar";
import AIChatWidget from "./components/AIChatWidget.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import KebijakanPrivPage from "./pages/KebijakanPrivPage.jsx";
import BackToTop from "./components/BackToTop.jsx";

function App() {
  const URL = import.meta.env.VITE_URL;

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        {/* <AIChatWidget apiKey={URL} /> */}
        <ScrollToTop />
        <BackToTop />
        <main className="flex-grow">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/oo" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/daily" element={<DailyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/kebijakan-privasi" element={<KebijakanPrivPage />} />

            {/* Features Submenu Pages */}
            <Route path="/features/physical-health" element={<PhysicalHealth />} />
            <Route path="/features/mental-health-emotions" element={<MentalHealthEmotions />} />
            <Route path="/features/environmental-health" element={<EnvironmentalHealth />} />
            <Route path="/features/social-connections" element={<SocialConnections />} />
            <Route path="/features/donation" element={<Donation />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
