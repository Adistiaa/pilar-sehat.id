import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ForumPage from "./pages/ForumPage"
import ContactPage from "./pages/ContactPage"
import PhysicalHealth from "./pages/features/PhysicalHealth"
import MentalHealthEmotions from "./pages/features/MentalHealthEmotions"
import EnvironmentalHealth from "./pages/features/EnvironmentalHealth"
import SocialConnections from "./pages/features/SocialConnections"
import FinancialOccupationalWellbeing from "./pages/features/FinancialOccupationalWellbeing"
import NotFoundPage from "./pages/NotFoundPage"
import Navbar from "./components/Navbar"
import AIChatWidget from "./components/AIChatWidget.jsx"
import Footer from "./components/Footer.jsx"


 
function App() {
  const URL = import.meta.env.VITE_URL
  return (
    <Router>
      <Navbar />
      <AIChatWidget apiKey={URL} />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
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
      <Footer/>
    </Router>
  )
}

export default App