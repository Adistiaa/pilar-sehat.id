import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import ReactMarkdown from "react-markdown";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import { motion } from "framer-motion"; // Import useAnimation
// Assuming useScrollAnimations is a custom hook you have defined elsewhere
// For this example, we'll mock it or define basic variants if not fully provided.
import useScrollAnimations from "../../components/AnimasiScroll"; 
import { Cloud, MapPin, Wind, Brain, Loader2, LocateFixed, Search, Users } from "lucide-react"; // Added Loader2, LocateFixed, Search

// Fixing default marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Mock implementation of useScrollAnimations if not provided
// In your actual code, this would come from your project structure.



// Komponen untuk menambahkan kontrol pencarian
function SearchControl({ onSearchResult }) {
    const map = useMap();
    
    useEffect(() => {
        // Inisialisasi provider OpenStreetMap
        const provider = new OpenStreetMapProvider();

        // Buat kontrol pencarian
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar', // Gaya kontrol pencarian
            autoClose: true, // Tutup hasil pencarian setelah dipilih
            keepResult: true, // Tetap tampilkan marker hasil pencarian
            searchLabel: 'Cari lokasi (contoh: Monas)', // Label placeholder
        });

        // Tambahkan kontrol ke peta
        map.addControl(searchControl);

        // Tangani hasil pencarian
        map.on('geosearch/showlocation', (result) => {
            const { location } = result;
            if (onSearchResult) {
                onSearchResult({
                    lat: location.y,
                    lon: location.x
                });
            }
        });

        // Hapus kontrol saat komponen dibersihkan
        return () => {
            map.removeControl(searchControl);
        };
    }, [onSearchResult]);

    return null;
}

// Weather Icons Mapping (as requested)
const symbolWeather = {
  '01d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747107956/Color3_zze7jd.png', label: 'Cerah (Siang)' }, //udh
  '01n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108167/Color2_r3z3jx.png', label: 'Cerah (Malam)' }, //udh
  '02d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109557/Color-5_ppbgu6.png', label: 'Sedikit Berawan (Siang)' }, //udh
  '02n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109557/Color-5_ppbgu6.png', label: 'Sedikit Berawan (Malam)' }, //udh
  '03d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109497/Color-4_ltyxwb.png', label: 'Berawan Tersebar (Siang)' }, //udh
  '03n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109497/Color-4_ltyxwb.png', label: 'Berawan Tersebar (Malam)' }, //udh
  '04d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747107337/Color3_a37nzs.png', label: 'Berawan (Siang)' },  //udh
  '04n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747107881/Color-2_vmcdkp.png', label: 'Berawan (Malam)' }, //udh
  '09d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108505/Color-10_vmdrec.png', label: 'Hujan Ringan (Siang)' }, //udh
  '09n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108517/Color-11_xjsf0z.png', label: 'Hujan Ringan (Malam)' }, //udh
  '10d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108303/Color-13_vda9cd.png', label: 'Hujan (Siang)' }, //udh
  '10n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108317/Color-14_dibjms.png', label: 'Hujan (Malam)' }, //udh
  '11d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109208/Color-15_xdgqpu.png', label: 'Badai Petir (Siang)' }, //udh
  '11n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109208/Color-15_xdgqpu.png', label: 'Badai Petir (Malam)' }, //udh
  '13d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109004/Color-20_caxqpu.png', label: 'Salju (Siang)' }, //udh
  '13n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109004/Color-20_caxqpu.png', label: 'Salju (Malam)' }, //udh
  '50d': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109144/Color1_sxnhqd.png', label: 'Berkabut (Siang)' }, //udh
  '50n': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109144/Color1_sxnhqd.png', label: 'Berkabut (Malam)' }, //udh
  'default': { symbol: 'https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109724/Color-21_pvruvl.png', label: 'Cuaca Tidak Diketahui' }
};


// Enhanced Weather Display Component
const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return <div className="text-center py-4">Data cuaca tidak tersedia.</div>;
  }
  const weatherIconCode = weatherData.weather[0].icon;
  const { symbol, label } = symbolWeather[weatherIconCode] || symbolWeather['default'];

  return (
    // This is the part the user selected and wants to improve
    <div className="space-y-4 p-1"> {/* Added a bit of padding */}
      <div className="flex items-center justify-between mb-3">
        <img src={symbol} alt={label} className="w-16 h-16 sm:w-20 sm:h-20" draggable="false" loading="lazy" onContextMenu={(e) => e.preventDefault()}/>
        <div className="text-right">
          <p className="text-3xl sm:text-4xl font-bold text-[#01130c] dark:text-[#ecfef7]">
            {Math.round(weatherData.main.temp)}°C 
          </p>
          <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80 capitalize">
            {label}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
        <div>
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">Terasa Seperti</strong> 
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">{Math.round(weatherData.main.feels_like)}°C</span>
        </div>
        <div>
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">Kelembaban</strong>
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">{weatherData.main.humidity}%</span>
        </div>
        <div>
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">Angin</strong>
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">{weatherData.wind.speed} m/s</span>
        </div>
        <div>
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">Tutupan Awan</strong>
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">{weatherData.clouds.all}%</span>
        </div>
      </div>
      <p className="text-xs text-center text-[#01130c]/60 dark:text-[#ecfef7]/60 pt-3 capitalize">
        {weatherData.weather[0].description}
      </p>
    </div>
  );
};

function EnvironmentalHealth() {
  const [location, setLocation] = useState(null);
  const [pollutionData, setPollutionData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // For initial page load
  const [isDataLoading, setIsDataLoading] = useState(false); // For subsequent data fetches
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [initialLocation, setInitialLocation] = useState(null); // To store user's first detected location
  const [error, setError] = useState(null); // For displaying errors

  const markerRef = useRef(null);
  const mapRef = useRef(null);

  // Get scroll animations from hook
const { refs, controls, sectionVariants } = useScrollAnimations();
   // Animation variants defined here (not in hooks)
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };


  const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const GEMINI_API_KEY = import.meta.env.VITE_URL; // Assuming VITE_URL is your Gemini API endpoint or key

  const getUserLocation = () => {
    setIsLoading(true); // For the very first load
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          // Fetch location name
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLocation.lat}&lon=${newLocation.lon}`);
            const data = await response.json();
            newLocation.name = data.display_name || `${newLocation.lat.toFixed(4)}, ${newLocation.lon.toFixed(4)}`;
          } catch (e) {
            console.error("Error fetching location name:", e);
            newLocation.name = `${newLocation.lat.toFixed(4)}, ${newLocation.lon.toFixed(4)}`;
          }
          setLocation(newLocation);
          if (!initialLocation) setInitialLocation(newLocation); // Set initial location only once
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Gagal mendapatkan lokasi Anda. Menggunakan lokasi default (Jakarta).");
          const defaultLocation = { lat: -6.2088, lon: 106.8456, name: "Jakarta, Indonesia" };
          setLocation(defaultLocation);
          if (!initialLocation) setInitialLocation(defaultLocation);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation tidak didukung. Menggunakan lokasi default (Jakarta).");
      const defaultLocation = { lat: -6.2088, lon: 106.8456, name: "Jakarta, Indonesia" };
      setLocation(defaultLocation);
      if (!initialLocation) setInitialLocation(defaultLocation);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation(); // Get user location on initial mount
  }, []); // Empty dependency array ensures this runs only once on mount

  
  useEffect(() => {
    const fetchEnvironmentalData = async () => {
      if (!location || !OPENWEATHER_API_KEY) {
        if (!OPENWEATHER_API_KEY) console.error("OpenWeather API key is missing!");
        return;
      }
      
      setIsDataLoading(true);
      setError(null);
      setAiAnalysis(null); // Clear previous AI analysis

      try {
        const pollutionResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}`
        );
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=id`
        );

        if (!pollutionResponse.ok) throw new Error(`Gagal mengambil data polusi: ${pollutionResponse.statusText}`);
        if (!weatherResponse.ok) throw new Error(`Gagal mengambil data cuaca: ${weatherResponse.statusText}`);

        const pollutionDataResult = await pollutionResponse.json();
        const weatherDataResult = await weatherResponse.json();

        setPollutionData(pollutionDataResult.list && pollutionDataResult.list[0] ? pollutionDataResult.list[0] : null);
        setWeatherData(weatherDataResult);

      } catch (err) {
        console.error("Error fetching environmental data:", err);
        setError(`Gagal memuat data lingkungan: ${err.message}. Coba lagi nanti.`);
        setPollutionData(null);
        setWeatherData(null);
      } finally {
        setIsDataLoading(false);
        setIsLoading(false); // Ensure main loading is also false
      }
    };

    if (location) {
      fetchEnvironmentalData();
    }
  }, [location, OPENWEATHER_API_KEY]);


  const handleAiAnalysis = async () => {
    if (!pollutionData || !weatherData) {
        setError("Data polusi atau cuaca tidak lengkap untuk analisis AI.");
        return;
    }
    if (!GEMINI_API_KEY) {
      console.error("Gemini API key/URL is missing");
      setError("Konfigurasi AI tidak lengkap.");
      return null;
    }

    setIsAiLoading(true);
    setError(null);

    const getAqiInfoLocal = (aqi) => { // Local helper for AQI description
        if (aqi === 1) return "Baik";
        if (aqi === 2) return "Sedang";
        if (aqi === 3) return "Tidak Sehat (Kelompok Sensitif)";
        if (aqi === 4) return "Tidak Sehat";
        if (aqi === 5) return "Sangat Tidak Sehat";
        return "Berbahaya";
    };

    try {
      const prompt = `Analisis kondisi kualitas udara saat ini di ${location.name || 'lokasi terpilih'} berdasarkan data berikut:
Cuaca: ${weatherData.weather[0].description}, Suhu ${weatherData.main.temp}°C (terasa ${weatherData.main.feels_like}°C), Kelembaban ${weatherData.main.humidity}%, Angin ${weatherData.wind.speed} m/s.
Indeks Kualitas Udara (AQI): ${pollutionData.main.aqi} (${getAqiInfoLocal(pollutionData.main.aqi)})
Komponen Polutan (μg/m³): CO: ${pollutionData.components.co.toFixed(2)}, NO₂: ${pollutionData.components.no2.toFixed(2)}, O₃: ${pollutionData.components.o3.toFixed(2)}, PM2.5: ${pollutionData.components.pm2_5.toFixed(2)}, PM10: ${pollutionData.components.pm10.toFixed(2)}.

Berikan Penilaian Udara beserta Penjelasan Singkat dan jelas mengenai Risiko Kesehatan serta Rekomendasi yang perlu dilakukan.`;

      // This is your fetchGeminiResponse function
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`; // Ensure this is the correct model and key variable
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        console.error("AI API Error:", errorBody);
        throw new Error(`Gagal mengambil analisis AI: ${errorBody.error?.message || res.statusText}`);
      }

      const data = await res.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        setAiAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error("Format respons AI tidak sesuai.");
      }

    } catch (err) {
      console.error("Error fetching AI analysis:", err);
      setError(`Analisis AI gagal: ${err.message}`);
      setAiAnalysis(null);
    } finally {
      setIsAiLoading(false);
    }
  };
  
  const handleLocationSearchResult = (newLocation) => {
    // newLocation should be { lat, lon, name }
    setLocation(newLocation); // This will trigger the useEffect to fetch new data
    if (mapRef.current) {
        mapRef.current.flyTo([newLocation.lat, newLocation.lon], 13);
    }
  };

  const returnToMyLocation = () => {
    if (initialLocation) {
      setLocation(initialLocation); // Set location back to the user's initial detected location
      if (mapRef.current) {
        mapRef.current.flyTo([initialLocation.lat, initialLocation.lon], 13);
      }
    } else {
        getUserLocation(); // If initial location wasn't set for some reason, try to get it again
    }
  };

  // Update map view when location state changes
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.flyTo([location.lat, location.lon], mapRef.current.getZoom());
    }
    if (location && markerRef.current) {
        markerRef.current.setLatLng([location.lat, location.lon]);
         markerRef.current.setPopupContent(`<b>${location.name || 'Lokasi Terpilih'}</b><br>Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}`);
    }
  }, [location]);


  if (isLoading && !location) { // Show full page loader only on initial load and if location is not yet set
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7]">
        <Loader2 className="w-16 h-16 animate-spin text-[#1ff498]" />
        <p className="mt-4 text-xl">Mencari lokasi Anda dan memuat data...</p>
      </div>
    );
  }
  
  // AQI Info for Pollution Section
  const getAqiStyling = (aqi) => {
    if (aqi === 1) return { level: "Baik", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-500/10 dark:bg-green-400/10" };
    if (aqi === 2) return { level: "Sedang", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-500/10 dark:bg-yellow-400/10" };
    if (aqi === 3) return { level: "Tidak Sehat (Sensitif)", color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-500/10 dark:bg-orange-400/10" };
    if (aqi === 4) return { level: "Tidak Sehat", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-500/10 dark:bg-red-400/10" };
    if (aqi === 5) return { level: "Sangat Tidak Sehat", color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-500/10 dark:bg-purple-400/10" };
    return { level: "Berbahaya", color: "text-maroon-700 dark:text-maroon-500", bgColor: "bg-maroon-500/10 dark:bg-maroon-400/10" };
  };


  return (
  <div
    className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7]"
    ref={refs.container}
    id="content"
  >
    {/* Hero Section */}
    <motion.section
      ref={refs.hero}
      initial="hidden"
      animate={controls.hero}
      variants={sectionVariants}
      className="relative pt-28 pb-6 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          variants={itemVariants}
          className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
        >
          <span className="flex items-center text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            Environmental Health
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold mb-4"
        >
          Kesehatan{" "}
          <span className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent">
            Lingkungan
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, cumque molestiae ea facilis facere amet quibusdam, 
          magni numquam accusamus quo praesentium. Ad, cumque consequatur! Possimus iure cumque aut expedita dolor!
        </motion.p>
      </div>
    </motion.section>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 pb-32 space-y-20">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 rounded-lg hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors"
        >
          <div className="flex items-start">
            <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-2 rounded-lg mr-3 text-[#1ff498] dark:text-[#0be084]">
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="leading-relaxed text-[#01130c]/80 dark:text-[#ecfef7]/ jon80">
              <span className="font-medium">Oops!</span> {error}
            </p>
          </div>
        </motion.div>
      )}

      {/* Section 1: Map and Weather */}
      <motion.section
        initial="hidden"
        ref={refs.quotes}
        animate={controls.quotes}
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
      >
        {/* Map Container */}
        <motion.div
          variants={itemVariants}
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
          >
            <span className="flex items-center text-sm font-medium">
              <MapPin className="w-4 h-4 mr-2" />
              Peta Interaktif
            </span>
          </motion.div>
          {location ? (
            <MapContainer
              ref={mapRef}
              center={[location.lat, location.lon]}
              zoom={13}
              scrollWheelZoom={true}
              className="h-[50px] sm:h-[100px] lg:h-[150px] w-full rounded-lg z-0"
            >
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <SearchControl onSearchResult={setLocation} />
              <Marker ref={markerRef} position={[location.lat, location.lon]}>
                <Popup>
                  <b>{location.name || 'Lokasi Saat Ini'}</b><br />
                  Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-[300px] sm:h-[400px] lg:h-[450px] w-full rounded-lg flex items-center justify-center bg-[#e6f8f4] dark:bg-[#032b2e]">
              <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
              <p className="ml-2 text-[#01130c]/70 dark:text-[#ecfef7]/70">Memuat peta...</p>
            </div>
          )}
          <motion.button
            onClick={returnToMyLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute z-[1000] top-10 right-10 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] rounded-lg px-3 py-1.5 shadow-md hover:shadow-lg text-[#01130c] dark:text-[#ecfef7] transition-all duration-200 flex items-center text-sm"
            disabled={isDataLoading || isLoading}
          >
            <LocateFixed className="w-4 h-4 mr-1.5" />
            Lokasi Saya
          </motion.button>
        </motion.div>

        {/* Weather Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
          >
            <span className="flex items-center text-sm font-medium">
              <Cloud className="w-4 h-4 mr-2" />
              Informasi Cuaca
            </span>
          </motion.div>
          <div className="space-y-4">
            {isDataLoading && !weatherData && (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
                <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">Memuat cuaca...</p>
              </div>
            )}
            {!isDataLoading && weatherData && <WeatherDisplay weatherData={weatherData} />}
            {!isDataLoading && !weatherData && (
              <p className="text-center text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">Data cuaca tidak tersedia untuk lokasi ini.</p>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* Section 2: Pollution Data */}
      {pollutionData && !isDataLoading && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
          >
            <span className="flex items-center text-sm font-medium">
              <Wind className="w-4 h-4 mr-2" />
              Data Polusi Udara
            </span>
          </motion.div>
          {pollutionData.main && pollutionData.components ? (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-lg flex items-center justify-between text-sm border border-[#72e4f8]/30 dark:border-[#07798d]/30 hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors ${getAqiStyling(
                  pollutionData.main.aqi
                ).bgColor}`}
              >
                <span className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                  Indeks Kualitas Udara (AQI):
                </span>
                <span
                  className={`font-bold px-2.5 py-1 rounded-full ${getAqiStyling(pollutionData.main.aqi).color}`}
                >
                  {pollutionData.main.aqi} - {getAqiStyling(pollutionData.main.aqi).level}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(pollutionData.components).map(([key, value]) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    className="p-4 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 rounded-lg hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors"
                  >
                    <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70 uppercase">
                      {key.replace(/_/g, '.').replace('pm25', 'PM2.5')}:
                    </strong>
                    <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">
                      {typeof value === 'number' ? value.toFixed(2) : value} µg/m³
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div className="text-center" variants={itemVariants}>
                <motion.button
                  onClick={handleAiAnalysis}
                  disabled={isAiLoading || isDataLoading}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 5px 15px rgba(31, 244, 152, 0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] hover:from-[#1ddc8c] hover:to-[#43a2dc] text-[#01130c] font-semibold px-6 py-2.5 rounded-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center mx-auto"
                >
                  {isAiLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Analisis dengan AI
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          ) : (
            <p className="text-center text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
              Data polusi tidak lengkap untuk lokasi ini.
            </p>
          )}
        </motion.section>
      )}
      {isDataLoading && !pollutionData && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
            <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">Memuat data polusi...</p>
          </div>
        </motion.section>
      )}

      {/* Section 3: AI Analysis */}
      {aiAnalysis && !isAiLoading && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
          >
            <span className="flex items-center text-sm font-medium">
              <Brain className="w-4 h-4 mr-2" />
              Analisis Kualitas Udara (AI)
            </span>
          </motion.div>
          <div className="prose prose-sm dark:prose-invert prose-p:text-[#01130c]/80 dark:prose-p:text-[#ecfef7]/80 prose-headings:text-[#01130c] dark:prose-headings:text-[#ecfef7] prose-strong:text-[#01130c] dark:prose-strong:text-[#ecfef7] prose-li:text-[#01130c]/80 dark:prose-li:text-[#ecfef7]/80 max-w-none leading-relaxed">
            <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
          </div>
        </motion.section>
      )}
      {isAiLoading && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
            <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">AI sedang menganalisis...</p>
          </div>
        </motion.section>
      )}
    </div>

    {/* Footer Wave */}
    <div className="relative h-32 w-full overflow-hidden">
      <motion.svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute top-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1, delay: 0.5 },
        }}
      >
        <motion.path
          fill="#1ff498"
          fillOpacity="0.1"
          d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{
            pathLength: 1,
            pathOffset: 0,
            transition: {
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
        />
        <motion.path
          fill="#1ff498"
          fillOpacity="0.2"
          d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9-9.42,98.6-31.56,31.77-25.39,62.32-62,103.63-73,40.44-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28-22.88,168.9-38.84,30.2-8.66,59-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{
            pathLength: 1,
            pathOffset: 0,
            transition: {
              duration: 3.5,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.2,
            },
          }}
        />
        <motion.path
          fill="#1ff498"
          fillOpacity="0.3"
          d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{
            pathLength: 1,
            pathOffset: 0,
            transition: {
              duration: 4,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.4,
            },
          }}
        />
      </motion.svg>
    </div>
  </div>
);
}

export default EnvironmentalHealth;
