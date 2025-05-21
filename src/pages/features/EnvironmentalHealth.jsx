import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import ReactMarkdown from "react-markdown";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import useScrollAnimations from "../../components/AnimasiScroll";
import {
  Cloud,
  MapPin,
  Wind,
  Brain,
  Loader2,
  LocateFixed,
  AlertCircle,
  Leaf,
  LayoutGrid,
  TreePine,
  Droplets,
  Sparkle,
  HeartPulse,
  AlertTriangle,
  ChevronUp,
  BookOpen,
  Activity,
  Circle,
  PieChart,
  Target,
  AreaChart,
  Footprints,
  Flower
} from "lucide-react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,

} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
  
);

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
      style: "bar", // Gaya kontrol pencarian
      autoClose: true, // Tutup hasil pencarian setelah dipilih
      keepResult: true, // Tetap tampilkan marker hasil pencarian
      searchLabel: "Cari lokasi (contoh: Monas)", // Label placeholder
    });

    // Tambahkan kontrol ke peta
    map.addControl(searchControl);

    // Tangani hasil pencarian
    map.on("geosearch/showlocation", (result) => {
      const { location } = result;
      if (onSearchResult) {
        onSearchResult({
          lat: location.y,
          lon: location.x,
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
  "01d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747107956/Color3_zze7jd.png",
    label: "Cerah (Siang)",
  }, //udh
  "01n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108167/Color2_r3z3jx.png",
    label: "Cerah (Malam)",
  }, //udh
  "02d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109557/Color-5_ppbgu6.png",
    label: "Sedikit Berawan (Siang)",
  }, //udh
  "02n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109557/Color-5_ppbgu6.png",
    label: "Sedikit Berawan (Malam)",
  }, //udh
  "03d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109497/Color-4_ltyxwb.png",
    label: "Berawan Tersebar (Siang)",
  }, //udh
  "03n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109497/Color-4_ltyxwb.png",
    label: "Berawan Tersebar (Malam)",
  }, //udh
  "04d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747107337/Color3_a37nzs.png",
    label: "Berawan (Siang)",
  }, //udh
  "04n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747107881/Color-2_vmcdkp.png",
    label: "Berawan (Malam)",
  }, //udh
  "09d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108505/Color-10_vmdrec.png",
    label: "Hujan Ringan (Siang)",
  }, //udh
  "09n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108517/Color-11_xjsf0z.png",
    label: "Hujan Ringan (Malam)",
  }, //udh
  "10d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108303/Color-13_vda9cd.png",
    label: "Hujan (Siang)",
  }, //udh
  "10n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747108317/Color-14_dibjms.png",
    label: "Hujan (Malam)",
  }, //udh
  "11d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109208/Color-15_xdgqpu.png",
    label: "Badai Petir (Siang)",
  }, //udh
  "11n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109208/Color-15_xdgqpu.png",
    label: "Badai Petir (Malam)",
  }, //udh
  "13d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109004/Color-20_caxqpu.png",
    label: "Salju (Siang)",
  }, //udh
  "13n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109004/Color-20_caxqpu.png",
    label: "Salju (Malam)",
  }, //udh
  "50d": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109144/Color1_sxnhqd.png",
    label: "Berkabut (Siang)",
  }, //udh
  "50n": {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109144/Color1_sxnhqd.png",
    label: "Berkabut (Malam)",
  }, //udh
  default: {
    symbol:
      "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1747109724/Color-21_pvruvl.png",
    label: "Cuaca Tidak Diketahui",
  },
};

// Enhanced Weather Display Component
const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return <div className="text-center py-4">Data cuaca tidak tersedia.</div>;
  }
  const weatherIconCode = weatherData.weather[0].icon;
  const { symbol, label } =
    symbolWeather[weatherIconCode] || symbolWeather["default"];

  return (
    // This is the part the user selected and wants to improve
    <div className="space-y-4 p-1">
      {" "}
      {/* Added a bit of padding */}
      <div className="flex items-center justify-between mb-3">
        <img
          src={symbol}
          alt={label}
          className="w-16 h-16 sm:w-20 sm:h-20"
          draggable="false"
          loading="lazy"
          onContextMenu={(e) => e.preventDefault()}
        />
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
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
            Terasa Seperti
          </strong>
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">
            {Math.round(weatherData.main.feels_like)}°C
          </span>
        </div>
        <div>
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
            Kelembaban
          </strong>
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">
            {weatherData.main.humidity}%
          </span>
        </div>
        <div>
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
            Angin
          </strong>
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">
            {weatherData.wind.speed} m/s
          </span>
        </div>
        <div>
          <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
            Tutupan Awan
          </strong>
          <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">
            {weatherData.clouds.all}%
          </span>
        </div>
      </div>
      <p className="text-xs text-center text-[#01130c]/60 dark:text-[#ecfef7]/60 pt-3 capitalize">
        {weatherData.weather[0].description}
      </p>
    </div>
  );
};

const SoilImpactCalculator = ({ sectionVariants, itemVariants }) => {
  const [luasLahan, setLuasLahan] = useState(""); // dalam meter persegi
  const [praktikTerpilih, setPraktikTerpilih] = useState([]);
  const [hasilDampak, setHasilDampak] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const practices = [
    { id: "kompos", name: "Penambahan Kompos/Pupuk Organik", unit: "kg/tahun" },
    { id: "coverCrop", name: "Penanaman Tanaman Penutup (Cover Crop)", unit: "bulan/tahun" },
    { id: "noTill", name: "Tanpa Olah Tanah (No-Till)", unit: "" },
    { id: "rotasiTanaman", name: "Rotasi Tanaman", unit: "" },
    { id: "biochar", name: "Penggunaan Biochar", unit: "kg/tahun" },
  ];

  const calculateImpact = () => {
    setIsLoading(true);
    setError(null);
    if (!luasLahan || isNaN(luasLahan) || parseFloat(luasLahan) <= 0) {
      setError("Mohon masukkan luas lahan yang valid (angka positif).");
      setHasilDampak(null);
      setIsLoading(false);
      return;
    }
    if (praktikTerpilih.length === 0) {
      setError("Pilih setidaknya satu praktik pengelolaan tanah.");
      setHasilDampak(null);
      setIsLoading(false);
      return;
    }

    const luasM2 = parseFloat(luasLahan);

    let karbonTerserapKgCO2 = 0; // kg CO2 ekuivalen
    let penghematanAirLiterPerM2 = 0; // liter per meter persegi
    let peningkatanKeanekaragamanHayat = 0; // Skala 0-100

    praktikTerpilih.forEach(practice => {
      const { id, value } = practice;
      const val = parseFloat(value);

      // Faktor simulasi (ini adalah angka fiktif untuk demonstrasi)
      // Dalam aplikasi nyata, ini harus didasarkan pada data ilmiah yang akurat
      switch (id) {
        case "kompos":
          // Setiap kg kompos bisa menyerap X kg CO2 dan meningkatkan retensi air
          karbonTerserapKgCO2 += (val || 0) * 0.5; // Misal: 0.5 kg CO2 per kg kompos
          penghematanAirLiterPerM2 += (val || 0) * 0.01; // Misal: 0.01 liter per kg kompos
          peningkatanKeanekaragamanHayat += 2; // Peningkatan skala
          break;
        case "coverCrop":
          // Setiap bulan cover crop per m2 bisa menyerap Y kg CO2 dan retensi air
          karbonTerserapKgCO2 += (val || 0) * luasM2 * 0.002; // Misal: 0.002 kg CO2 per m2 per bulan
          penghematanAirLiterPerM2 += (val || 0) * 0.05; // Misal: 0.05 liter per m2 per bulan
          peningkatanKeanekaragamanHayat += 3;
          break;
        case "noTill":
          // Tanpa olah tanah menyerap Z kg CO2 per m2
          karbonTerserapKgCO2 += luasM2 * 0.01; // Misal: 0.01 kg CO2 per m2
          penghematanAirLiterPerM2 += 0.2;
          peningkatanKeanekaragamanHayat += 4;
          break;
        case "rotasiTanaman":
          // Rotasi tanaman menyerap A kg CO2 per m2
          karbonTerserapKgCO2 += luasM2 * 0.005; // Misal: 0.005 kg CO2 per m2
          penghematanAirLiterPerM2 += 0.1;
          peningkatanKeanekaragamanHayat += 3;
          break;
        case "biochar":
            // Setiap kg biochar bisa menyerap B kg CO2
            karbonTerserapKgCO2 += (val || 0) * 1.5; // Biochar sangat efektif menyerap karbon
            penghematanAirLiterPerM2 += (val || 0) * 0.02;
            peningkatanKeanekaragamanHayat += 2;
            break;
        default:
          break;
      }
    });

    // Sesuaikan dampak total berdasarkan luas lahan
    karbonTerserapKgCO2 = karbonTerserapKgCO2 * luasM2;
    penghematanAirLiterPerM2 = penghematanAirLiterPerM2 * luasM2;

    // Batasi peningkatan keanekaragaman hayati
    peningkatanKeanekaragamanHayat = Math.min(peningkatanKeanekaragamanHayat, 100);

    // Simulasi penundaan untuk UX
    setTimeout(() => {
      setHasilDampak({
        karbonTerserap: karbonTerserapKgCO2,
        penghematanAir: penghematanAirLiterPerM2,
        keanekaragamanHayat: peningkatanKeanekaragamanHayat,
        pesan: `Dengan luas lahan ${luasLahan} m² dan praktik yang Anda terapkan, Anda berkontribusi signifikan pada kesehatan lingkungan!`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePracticeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPraktikTerpilih([...praktikTerpilih, { id: value, value: "" }]);
    } else {
      setPraktikTerpilih(praktikTerpilih.filter(p => p.id !== value));
    }
    setHasilDampak(null); // Reset hasil jika praktik berubah
    setError(null);
  };

  const handlePracticeValueChange = (id, val) => {
    setPraktikTerpilih(praktikTerpilih.map(p =>
      p.id === id ? { ...p, value: val } : p
    ));
  };


  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="inline-block bg-[#67e8f9]/20 dark:bg-[#06b6d4]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
      >
        <span className="flex items-center text-sm font-medium">
          <Target className="w-4 h-4 mr-2" />
          Kalkulator Dampak Kesehatan Tanah
        </span>
      </motion.div>

      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-[#01130c] dark:text-[#ecfef7] mb-4">
        Hitung Dampak Positif Upaya Anda!
      </motion.h2>

      <motion.p variants={itemVariants} className="text-[#01130c]/70 dark:text-[#ecfef7]/70 mb-6">
        Estimasi kontribusi Anda terhadap lingkungan dengan praktik pengelolaan tanah yang berkelanjutan.
      </motion.p>

      {/* Input Luas Lahan */}
      <motion.div variants={itemVariants} className="mb-4">
        <label htmlFor="luasLahan" className="block text-sm font-medium text-[#01130c] dark:text-[#ecfef7] mb-2">
          Luas Lahan yang Dikelola (m²):
        </label>
        <input
          type="number"
          id="luasLahan"
          value={luasLahan}
          onChange={(e) => {
            setLuasLahan(e.target.value);
            setHasilDampak(null); // Reset hasil saat input berubah
            setError(null);
          }}
          placeholder="Contoh: 1000"
          className="w-full p-2 border border-[#b2ebf2] dark:border-[#4dd0e1]/30 rounded-md bg-[#e0f7fa] dark:bg-[#00acc1]/20 text-[#01130c] dark:text-[#ecfef7] focus:ring-[#1ff498] focus:border-[#1ff498] outline-none transition-all"
        />
      </motion.div>

      {/* Pilihan Praktik */}
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-lg font-semibold text-[#01130c] dark:text-[#ecfef7] mb-3">Pilih Praktik yang Anda Lakukan:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {practices.map(practice => (
            <div key={practice.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={practice.id}
                value={practice.id}
                checked={praktikTerpilih.some(p => p.id === practice.id)}
                onChange={handlePracticeChange}
                className="form-checkbox h-5 w-5 text-[#1ff498] rounded focus:ring-[#1ff498] transition-all"
              />
              <label htmlFor={practice.id} className="text-sm font-medium text-[#01130c] dark:text-[#ecfef7] flex-grow">
                {practice.name}
              </label>
              {praktikTerpilih.some(p => p.id === practice.id) && practice.unit && (
                <input
                  type="number"
                  placeholder={`Jumlah ${practice.unit}`}
                  value={praktikTerpilih.find(p => p.id === practice.id)?.value || ""}
                  onChange={(e) => handlePracticeValueChange(practice.id, e.target.value)}
                  className="w-24 p-1 border border-[#b2ebf2] dark:border-[#4dd0e1]/30 rounded-md bg-[#e0f7fa] dark:bg-[#00acc1]/20 text-[#01130c] dark:text-[#ecfef7] text-xs focus:ring-[#1ff498] focus:border-[#1ff498] outline-none transition-all"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 dark:bg-red-400/10 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm flex items-center"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </motion.div>
      )}

      {/* Tombol Hitung */}
      <motion.button
        variants={itemVariants}
        onClick={calculateImpact}
        disabled={isLoading}
        className="w-full bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#0be084] dark:hover:bg-[#1ff498] transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Menghitung Dampak...
          </>
        ) : (
          <>
            <AreaChart className="w-5 h-5 mr-2" />
            Hitung Dampak
          </>
        )}
      </motion.button>

      {/* Hasil Dampak */}
      <AnimatePresence>
        {hasilDampak && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sectionVariants} // Gunakan variants yang sama untuk fade in/out
            className="mt-8 p-6 bg-[#e0f7fa] dark:bg-[#00acc1]/20 border border-[#b2ebf2] dark:border-[#4dd0e1]/30 rounded-lg shadow-inner space-y-4"
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold text-[#01130c] dark:text-[#ecfef7] text-center mb-4">
              Ringkasan Dampak Lingkungan Anda
            </motion.h3>

            <motion.p variants={itemVariants} className="text-base text-[#01130c]/80 dark:text-[#ecfef7]/80 text-center mb-6">
              {hasilDampak.pesan}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Kartu Dampak Karbon */}
              <motion.div variants={itemVariants} className="bg-[#b2ebf2]/30 dark:bg-[#00acc1]/30 p-4 rounded-lg flex flex-col items-center text-center shadow-sm">
                <Footprints className="w-8 h-8 text-[#07798d] dark:text-[#67e8f9] mb-2" />
                <p className="text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">Karbon Terserap</p>
                <p className="text-xl font-bold text-[#01130c] dark:text-[#ecfef7]">
                  {hasilDampak.karbonTerserap.toFixed(2)} kg CO₂e
                </p>
                <p className="text-xs text-[#01130c]/60 dark:text-[#ecfef7]/60 mt-1">
                  ~ Setara dengan {Math.round(hasilDampak.karbonTerserap / 22)} pohon muda/tahun
                </p>
              </motion.div>

              {/* Kartu Dampak Air */}
              <motion.div variants={itemVariants} className="bg-[#b2ebf2]/30 dark:bg-[#00acc1]/30 p-4 rounded-lg flex flex-col items-center text-center shadow-sm">
                <Droplets className="w-8 h-8 text-[#07798d] dark:text-[#67e8f9] mb-2" />
                <p className="text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">Penghematan Air</p>
                <p className="text-xl font-bold text-[#01130c] dark:text-[#ecfef7]">
                  {hasilDampak.penghematanAir.toFixed(2)} Liter
                </p>
                <p className="text-xs text-[#01130c]/60 dark:text-[#ecfef7]/60 mt-1">
                  ~ Meningkatkan kapasitas retensi air tanah
                </p>
              </motion.div>

              {/* Kartu Dampak Keanekaragaman Hayati */}
              <motion.div variants={itemVariants} className="bg-[#b2ebf2]/30 dark:bg-[#00acc1]/30 p-4 rounded-lg flex flex-col items-center text-center shadow-sm">
                <Flower className="w-8 h-8 text-[#07798d] dark:text-[#67e8f9] mb-2" />
                <p className="text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">Keanekaragaman Hayati</p>
                <p className="text-xl font-bold text-[#01130c] dark:text-[#ecfef7]">
                  +{hasilDampak.keanekaragamanHayat.toFixed(0)}%
                </p>
                <p className="text-xs text-[#01130c]/60 dark:text-[#ecfef7]/60 mt-1">
                  ~ Peningkatan kesehatan dan ekosistem tanah
                </p>
              </motion.div>
            </div>

            <motion.p variants={itemVariants} className="text-sm text-center text-[#01130c]/60 dark:text-[#ecfef7]/60 pt-4">
              *Estimasi ini berdasarkan model sederhana. Hasil aktual dapat bervariasi.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
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
  const [showDetail, setShowDetail] = useState(false);
  const [showTanahTips, setShowTanahTips] = useState(false);
  const [showAirTips, setShowAirTips] = useState(false);

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

  const detailVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  // Improved animation variants
  const containerVariants = {
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
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLocation.lat}&lon=${newLocation.lon}`
            );
            const data = await response.json();
            newLocation.name =
              data.display_name ||
              `${newLocation.lat.toFixed(4)}, ${newLocation.lon.toFixed(4)}`;
          } catch (e) {
            console.error("Error fetching location name:", e);
            newLocation.name = `${newLocation.lat.toFixed(
              4
            )}, ${newLocation.lon.toFixed(4)}`;
          }
          setLocation(newLocation);
          if (!initialLocation) setInitialLocation(newLocation); // Set initial location only once
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Gagal mendapatkan lokasi Anda. Menggunakan lokasi default (Jakarta)."
          );
          const defaultLocation = {
            lat: -6.2088,
            lon: 106.8456,
            name: "Jakarta, Indonesia",
          };
          setLocation(defaultLocation);
          if (!initialLocation) setInitialLocation(defaultLocation);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError(
        "Geolocation tidak didukung. Menggunakan lokasi default (Jakarta)."
      );
      const defaultLocation = {
        lat: -6.2088,
        lon: 106.8456,
        name: "Jakarta, Indonesia",
      };
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
        if (!OPENWEATHER_API_KEY)
          console.error("OpenWeather API key is missing!");
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

        if (!pollutionResponse.ok)
          throw new Error(
            `Gagal mengambil data polusi: ${pollutionResponse.statusText}`
          );
        if (!weatherResponse.ok)
          throw new Error(
            `Gagal mengambil data cuaca: ${weatherResponse.statusText}`
          );

        const pollutionDataResult = await pollutionResponse.json();
        const weatherDataResult = await weatherResponse.json();

        setPollutionData(
          pollutionDataResult.list && pollutionDataResult.list[0]
            ? pollutionDataResult.list[0]
            : null
        );
        setWeatherData(weatherDataResult);
      } catch (err) {
        console.error("Error fetching environmental data:", err);
        setError(
          `Gagal memuat data lingkungan: ${err.message}. Coba lagi nanti.`
        );
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

    const getAqiInfoLocal = (aqi) => {
      // Local helper for AQI description
      if (aqi === 1) return "Baik";
      if (aqi === 2) return "Sedang";
      if (aqi === 3) return "Tidak Sehat (Kelompok Sensitif)";
      if (aqi === 4) return "Tidak Sehat";
      if (aqi === 5) return "Sangat Tidak Sehat";
      return "Berbahaya";
    };

    try {
      const prompt = `Analisis kondisi kualitas udara saat ini di ${location.name || "lokasi terpilih"
        } berdasarkan data berikut:
Cuaca: ${weatherData.weather[0].description}, Suhu ${weatherData.main.temp
        }°C (terasa ${weatherData.main.feels_like}°C), Kelembaban ${weatherData.main.humidity
        }%, Angin ${weatherData.wind.speed} m/s.
Indeks Kualitas Udara (AQI): ${pollutionData.main.aqi} (${getAqiInfoLocal(
          pollutionData.main.aqi
        )})
Komponen Polutan (μg/m³): CO: ${pollutionData.components.co.toFixed(
          2
        )}, NO₂: ${pollutionData.components.no2.toFixed(
          2
        )}, O₃: ${pollutionData.components.o3.toFixed(
          2
        )}, PM2.5: ${pollutionData.components.pm2_5.toFixed(
          2
        )}, PM10: ${pollutionData.components.pm10.toFixed(2)}.

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
        throw new Error(
          `Gagal mengambil analisis AI: ${errorBody.error?.message || res.statusText
          }`
        );
      }

      const data = await res.json();
      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
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
      mapRef.current.flyTo(
        [location.lat, location.lon],
        mapRef.current.getZoom()
      );
    }
    if (location && markerRef.current) {
      markerRef.current.setLatLng([location.lat, location.lon]);
      markerRef.current.setPopupContent(
        `<b>${location.name || "Lokasi Terpilih"
        }</b><br>Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(
          4
        )}`
      );
    }
  }, [location]);

  // AQI Info for Pollution Section
  const getAqiStyling = (aqi) => {
    if (aqi === 1)
      return {
        level: "Baik",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-500/10 dark:bg-green-400/10",
      };
    if (aqi === 2)
      return {
        level: "Sedang",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-500/10 dark:bg-yellow-400/10",
      };
    if (aqi === 3)
      return {
        level: "Tidak Sehat (Sensitif)",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-500/10 dark:bg-orange-400/10",
      };
    if (aqi === 4)
      return {
        level: "Tidak Sehat",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-500/10 dark:bg-red-400/10",
      };
    if (aqi === 5)
      return {
        level: "Sangat Tidak Sehat",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-500/10 dark:bg-purple-400/10",
      };
    return {
      level: "Berbahaya",
      color: "text-maroon-700 dark:text-maroon-500",
      bgColor: "bg-maroon-500/10 dark:bg-maroon-400/10",
    };
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Total Produksi Sampah di Indonesia (2019-2025)",
      },
    },
    animation: {
      tension: {
        duration: 1000,
        easing: "easeInOutQuad",
        from: 0.5,
        to: 0,
        loop: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Sumber Sampah di Indonesia",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Produksi Sampah per Daerah di Indonesia",
      },
    },
    animation: {
      delay: (context) => context.dataIndex * 100,
    },
  };

  function TotalSampahChart({ data }) {
    return <Line options={lineChartOptions} data={data} />;
  }

  function SumberSampahChart({ data }) {
    return <Pie options={pieChartOptions} data={data} />;
  }

  function SampahPerDaerahChart({ data }) {
    return <Bar options={barChartOptions} data={data} />;
  }

  const initialDataTotalSampah = {
    labels: [],
    datasets: [{ data: [], label: "Loading..." }],
  };

  const initialDataSumberSampah = {
    labels: [],
    datasets: [{ data: [], label: "Loading..." }],
  };

  const initialDataSampahPerDaerah = {
    labels: [],
    datasets: [{ data: [], label: "Loading..." }],
  };

  function GrafikSampahIndonesia() {
    const [dataTotalSampah, setDataTotalSampah] = useState(
      initialDataTotalSampah
    );
    const [dataSumberSampah, setDataSumberSampah] = useState(
      initialDataSumberSampah
    );
    const [dataSampahPerDaerah, setDataSampahPerDaerah] = useState(
      initialDataSampahPerDaerah
    );
    const [isLoading, setIsLoading] = useState(true);
    const isDataFetched = useRef(false);
    const hasLoaded = useRef(false);
    const sectionVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delayChildren: 0.2,
          staggerChildren: 0.1,
        },
      },
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      },
    };
    const chartVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      },
    };

    useEffect(() => {
      if (!isDataFetched.current) {
        // Simulasi pemanggilan data (hanya dijalankan sekali)
        const fetchData = async () => {

          const colorfulDataTotalSampah = {
            labels: [
              "2019",
              "2020",
              "2021",
              "2022",
              "2023",
              "2024 (Est)",
              "2025 (Est)",
            ],
            datasets: [
              {
                label: "Total Sampah (Juta Ton)",
                data: [67, 68.5, 69.1, 70, 70.8, 71.5, 72.3],
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
              },
            ],
          };

          const colorfulDataSumberSampah = {
            labels: [
              "Rumah Tangga",
              "Pasar",
              "Komersial",
              "Industri",
              "Lain-lain",
            ],
            datasets: [
              {
                label: "Persentase Sumber Sampah",
                data: [40, 15, 20, 10, 15],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.8)",
                  "rgba(255, 159, 64, 0.8)",
                  "rgba(255, 205, 86, 0.8)",
                  "rgba(75, 192, 192, 0.8)",
                  "rgba(153, 102, 255, 0.8)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 205, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
              },
            ],
          };

          const colorfulDataSampahPerDaerah = {
            labels: [
              "Jawa Barat",
              "Jawa Timur",
              "Jawa Tengah",
              "DKI Jakarta",
              "Sumatera Utara",
            ],
            datasets: [
              {
                label: "Produksi Sampah (Ton/Hari)",
                data: [18000, 15000, 13000, 7000, 6000],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.7)",
                  "rgba(255, 159, 64, 0.7)",
                  "rgba(255, 205, 86, 0.7)",
                  "rgba(75, 192, 192, 0.7)",
                  "rgba(153, 102, 255, 0.7)",
                ],
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderWidth: 1,
              },
            ],
          };

          setDataTotalSampah(colorfulDataTotalSampah);
          setDataSumberSampah(colorfulDataSumberSampah);
          setDataSampahPerDaerah(colorfulDataSampahPerDaerah);
          setIsLoading(false); // Set loading ke false setelah data berhasil dimuat
          isDataFetched.current = true; // Set flag menjadi true
        };

        fetchData();
      }
    }, []); // Dependensi array tetap kosong


    return (
      <motion.section
        variants={sectionVariants}
        initial="hidden" // UBAH: Mulai dari hidden
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // TAMBAH: `amount` untuk presisi pemicu
        className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-6"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block bg-[#67e8f9]/20 dark:bg-[#06b6d4]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
        >
          <span className="flex items-center text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path d="M3 3v18h18V3H3zm9 15a1 1 0 001-1v-4a1 1 0 00-2 0v4a1 1 0 001 1zm-3-5a1 1 0 001-1V6a1 1 0 00-2 0v6a1 1 0 001 1zm6 0a1 1 0 001-1v-2a1 1 0 00-2 0v2a1 1 0 001 1z" />
            </svg>
            Data dan Statistik Sampah Indonesia
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-6 p-4 bg-[#e0f7fa] dark:bg-[#00acc1]/20 rounded-md border border-[#b2ebf2] dark:border-[#4dd0e1]/30 text-[#01130c] dark:text-[#ecfef7]"
        >
          <p className="text-sm italic text-center text-[#01130c]/70 dark:text-[#ecfef7]/70">
            Berikut adalah visualisasi data dan statistik terkait sampah di
            Indonesia.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-80">
            <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
            <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
              Memuat data sampah...
            </p>
          </div>
        ) : (
          <motion.div
            variants={chartVariants}
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-80"
          >
            <TotalSampahChart data={dataTotalSampah} />
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-80">
            <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
            <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
              Memuat data sumber...
            </p>
          </div>
        ) : (
          <motion.div
            variants={chartVariants}
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-80"
          >
            <SumberSampahChart data={dataSumberSampah} />
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
            <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
              Memuat data daerah...
            </p>
          </div>
        ) : (
          <motion.div
            variants={chartVariants}
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-96"
          >
            <SampahPerDaerahChart data={dataSampahPerDaerah} />
          </motion.div>
        )}
      </motion.section>
    );
  }

  return (
    <div
      className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7]"
      ref={refs.container}
      id="content"
    >
      {/* Hero Section */}
      <motion.section
        ref={refs.hero}
        initial="visible"
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
              <Leaf className="w-4 h-4 mr-2" />
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            cumque molestiae ea facilis facere amet quibusdam, magni numquam
            accusamus quo praesentium. Ad, cumque consequatur! Possimus iure
            cumque aut expedita dolor!
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

        {/* 3 Aspek Utama - Table Overview */}
        <motion.section
          ref={refs.quotes}
          initial="hidden"
          animate={controls.quotes}
          variants={sectionVariants}
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] p-6 sm:p-8 rounded-2xl hover:shadow-md transition-all hover:border-[#1ff498] dark:hover:border-[#0be084]"
          data-section="overview"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block bg-[#1ff498]/20 dark:bg-[#0be084]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-6"
          >
            <span className="flex items-center text-sm font-medium">
              <LayoutGrid className="w-4 h-4 mr-2" />3 Aspek Utama
            </span>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card Udara */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
                boxShadow: "0 10px 25px -5px rgba(31, 244, 152, 0.2)",
              }}
              className="bg-gradient-to-b from-[#f6fefc] to-[#e0f7fd] dark:from-[#021a2e] dark:to-[#010907] border-l-4 border-[#50b7f7] rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#50b7f7]/20 p-3 rounded-lg mr-3 text-[#50b7f7] group-hover:bg-[#50b7f7]/30 transition-colors">
                  <Wind className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#086faf] dark:text-[#72e4f8]">
                  Kualitas Udara
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 mt-0.5 mr-2 text-rose-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Masalah Utama
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Laudantium vitae quo, soluta harum quos nesciunt non iusto
                      adipisci neque amet fugit, fuga tenetur enim
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HeartPulse className="w-5 h-5 mt-0.5 mr-2 text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Dampak Kesehatan
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Sparkle className="w-5 h-5 mt-0.5 mr-2 text-[#50b7f7] flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Solusi
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#72e4f8]/30">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#50b7f7] rounded-full"
                    style={{ width: "72%" }}
                    aria-label="Tingkat urgensi 72%"
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-[#01130c]/70 dark:text-[#ecfef7]/70">
                  Tingkat Urgensi: 72%
                </p>
              </div>
            </motion.div>

            {/* Card Tanah */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(11, 224, 132, 0.2)",
              }}
              className="bg-gradient-to-b from-[#f6fefc] to-[#e6f8f4] dark:from-[#0a1a16] dark:to-[#010907] border-l-4 border-[#0be084] rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#0be084]/20 p-3 rounded-lg mr-3 text-[#0be084] group-hover:bg-[#0be084]/30 transition-colors">
                  <TreePine className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0a865d] dark:text-[#0be084]">
                  Kesehatan Tanah
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 mt-0.5 mr-2 text-rose-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Masalah Utama
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Laudantium vitae quo, soluta harum quos nesciunt non iusto
                      adipisci neque amet fugit, fuga tenetur enim
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HeartPulse className="w-5 h-5 mt-0.5 mr-2 text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Dampak Kesehatan
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Sparkle className="w-5 h-5 mt-0.5 mr-2 text-[#0be084] flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Solusi
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0be084]/30">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0be084] rounded-full"
                    style={{ width: "65%" }}
                    aria-label="Tingkat urgensi 65%"
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-[#01130c]/70 dark:text-[#ecfef7]/70">
                  Tingkat Urgensi: 65%
                </p>
              </div>
            </motion.div>

            {/* Card Air */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(7, 121, 141, 0.2)",
              }}
              className="bg-gradient-to-b from-[#f6fefc] to-[#e0f7fd] dark:from-[#032b2e] dark:to-[#010907] border-l-4 border-[#07798d] rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#07798d]/20 p-3 rounded-lg mr-3 text-[#07798d] group-hover:bg-[#07798d]/30 transition-colors">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#07798d] dark:text-[#72e4f8]">
                  Kualitas Air
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 mt-0.5 mr-2 text-rose-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Masalah Utama
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Laudantium vitae quo, soluta harum quos nesciunt non iusto
                      adipisci neque amet fugit, fuga tenetur enim
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HeartPulse className="w-5 h-5 mt-0.5 mr-2 text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Dampak Kesehatan
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Sparkle className="w-5 h-5 mt-0.5 mr-2 text-[#07798d] flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                      Solusi
                    </h4>
                    <p className="text-sm text-[#01130c]/80 dark:text-[#ecfef7]/80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#07798d]/30">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#07798d] rounded-full"
                    style={{ width: "80%" }}
                    aria-label="Tingkat urgensi 80%"
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-[#01130c]/70 dark:text-[#ecfef7]/70">
                  Tingkat Urgensi: 80%
                </p>
              </div>
            </motion.div>
          </motion.div>
          {/* Legend */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
          >
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#50b7f7] rounded-full mr-2"></div>
              <span>Udara</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#0be084] rounded-full mr-2"></div>
              <span>Tanah</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#07798d] rounded-full mr-2"></div>
              <span>Air</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-rose-500 rounded-full mr-2"></div>
              <span>Masalah</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <span>Dampak</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Section Udara */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-gradient-to-br from-[#f6fefc] to-[#e0f7fd] dark:from-[#021a2e] dark:to-[#010907] p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg"
        >
          {/* Floating decorative elements with animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#50b7f7]/10 blur-xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
            className="absolute bottom-20 left-0 w-24 h-24 rounded-full bg-[#1ff498]/10 blur-lg"
          />

          <div className="relative flex flex-col lg:flex-row gap-8 items-center z-10">
            {/* Content Section */}
            <motion.div variants={itemVariants} className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#50b7f7]/10 backdrop-blur-sm border border-[#50b7f7]/30 text-[#086faf] dark:text-[#72e4f8] px-4 py-2 rounded-full mb-4 hover:bg-[#50b7f7]/20 transition-colors">
                <Wind className="w-5 h-5" />
                <span className="text-sm font-medium">Kualitas Udara</span>
              </div>

              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#086faf] to-[#50b7f7] bg-clip-text text-transparent dark:from-[#72e4f8] dark:to-[#50b7f7]"
              >
                Solusi Cerdas untuk Udara Bersih
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-[#01130c]/80 dark:text-[#ecfef7]/80 leading-relaxed"
              >
                Polusi udara adalah pembunuh tak terlihat yang bertanggung jawab
                atas 1 dari 9 kematian global. Partikel berbahaya seperti PM2.5
                dapat menembus jauh ke dalam sistem pernapasan dan peredaran
                darah.
              </motion.p>

              {/* Stats Grid with animation */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-4"
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 dark:bg-[#021a2e]/80 p-4 rounded-xl border border-[#50b7f7]/20 hover:shadow-md transition-all"
                >
                  <div className="text-2xl font-bold text-[#086faf] dark:text-[#50b7f7]">
                    7jt
                  </div>
                  <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    Kematian/tahun
                  </div>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 dark:bg-[#021a2e]/80 p-4 rounded-xl border border-[#50b7f7]/20 hover:shadow-md transition-all"
                >
                  <div className="text-2xl font-bold text-[#086faf] dark:text-[#50b7f7]">
                    90%
                  </div>
                  <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    Populasi terpapar
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Toggle Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 4px 15px rgba(80, 183, 247, 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-gradient-to-r from-[#50b7f7] to-[#1ff498] text-black rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                onClick={() => setShowDetail(!showDetail)}
              >
                {showDetail ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Sembunyikan Detail</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Pelajari Lebih Lanjut</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Image Section with enhanced animation */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-[#e0f7fd] dark:bg-[#021a2e] p-1 rounded-xl border border-[#50b7f7]/30 shadow-lg overflow-hidden">
                <motion.img
                  src="/air-quality.jpg"
                  alt="Polusi Udara"
                  className="rounded-lg w-full h-64 object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1584473457407-4c37b56a735c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
                  }
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white dark:bg-[#032b2e] px-4 py-2 rounded-lg border border-[#50b7f7]/30 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#50b7f7]" />
                  <div>
                    <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                      Indeks Kualitas Udara
                    </div>
                    <div className="font-medium text-[#086faf] dark:text-[#50b7f7]">
                      Sedang (AQI 78)
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Detailed Content with better animations */}
          <AnimatePresence>
            {showDetail && (
              <motion.div
                variants={detailVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-8 overflow-hidden"
              >
                <div className="bg-white/80 dark:bg-[#021a2e]/80 p-6 rounded-xl border border-[#50b7f7]/30 backdrop-blur-sm">
                  <motion.h3
                    className="text-xl font-bold text-[#086faf] dark:text-[#50b7f7] mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Dampak Mendalam Polusi Udara
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Sources */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                        Sumber Polusi
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Emisi kendaraan bermotor (40% kontribusi)",
                          "Pembangkit listrik berbahan bakar fosil",
                          "Industri manufaktur dan konstruksi",
                          "Pembakaran sampah dan pertanian",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start text-[#01130c]/80 dark:text-[#ecfef7]/80"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#50b7f7] flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Health Effects */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <HeartPulse className="w-5 h-5 text-amber-500" />
                        Efek Kesehatan
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Penyakit pernapasan kronis (PPOK, asma)",
                          "Peningkatan risiko stroke dan penyakit jantung",
                          "Gangguan perkembangan kognitif pada anak",
                          "Komplikasi kehamilan dan kelahiran prematur",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start text-[#01130c]/80 dark:text-[#ecfef7]/80"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#50b7f7] flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div
                      className="md:col-span-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <Sparkle className="w-5 h-5 text-[#50b7f7]" />
                        Solusi Nyata
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          {
                            title: "Transportasi",
                            icon: "🚍",
                            desc: "Gunakan transportasi umum, kendaraan listrik, atau bersepeda",
                          },
                          {
                            title: "Energi",
                            icon: "⚡",
                            desc: "Beralih ke energi terbarukan dan efisiensi energi",
                          },
                          {
                            title: "Penghijauan",
                            icon: "🌳",
                            desc: "Tanam pohon dan pertahankan ruang terbuka hijau",
                          },
                        ].map((solution, index) => (
                          <motion.div
                            key={index}
                            className="bg-[#50b7f7]/10 p-4 rounded-lg border border-[#50b7f7]/20 hover:shadow-md transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                          >
                            <div className="text-2xl mb-2">{solution.icon}</div>
                            <h5 className="font-medium text-[#086faf] dark:text-[#50b7f7] mb-2">
                              {solution.title}
                            </h5>
                            <p className="text-sm">{solution.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Section 1: Map and Weather */}
        <motion.section
          initial="visible"
          ref={refs.trust}
          animate={controls.trust}
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
            {isDataLoading ? (
              <div className="h-[350px] sm:h-[450px] lg:h-[500px] w-full rounded-lg flex items-center justify-center bg-[#e6f8f4] dark:bg-[#032b2e]">
                <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
                <p className="ml-2 text-[#01130c]/70 dark:text-[#ecfef7]/70">
                  Memuat peta...
                </p>
              </div>
            ) : location ? (
              <MapContainer
                ref={mapRef}
                center={
                  location // Gunakan lokasi saat ini (dari state `location`)
                    ? [location.lat, location.lon]
                    : [-6.2088, 106.8456] // Fallback ke Jakarta jika `location` belum ada
                }

                zoom={initialLocation ? 20 : 10}
                scrollWheelZoom={true}
                className="h-[150px] sm:h-[250px] lg:h-[250px] w-full rounded-lg z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <SearchControl onSearchResult={handleLocationSearchResult} />
                {location && (
                  <Marker
                    ref={markerRef}
                    position={[location.lat, location.lon]}
                  >
                    <Popup>
                      <b>{location.name || "Lokasi Terpilih"}</b>
                      <br />
                      Lat: {location.lat.toFixed(4)}, Lon:{" "}
                      {location.lon.toFixed(4)}
                    </Popup>
                  </Marker>
                )}

              </MapContainer>
            ) : (
              <div className="h-[300px] sm:h-[400px] lg:h-[450px] w-full rounded-lg flex items-center justify-center bg-[#e6f8f4] dark:bg-[#032b2e]">
                <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70">
                  Peta tidak tersedia.
                </p>
              </div>
            )}
            <motion.button
              onClick={returnToMyLocation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isDataLoading || isLoading || !initialLocation}
              className="mt-4 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8] dark:border-[#07798d]
                hover:border-[#1ff498] dark:hover:border-[#0be084] rounded-lg px-4 py-2 shadow-md
                hover:shadow-lg text-[#01130c] dark:text-[#ecfef7] transition-all duration-200
                flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    Memuat cuaca...
                  </p>
                </div>
              )}
              {!isDataLoading && weatherData && (
                <WeatherDisplay weatherData={weatherData} />
              )}
              {!isDataLoading && !weatherData && (
                <p className="text-center text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
                  Data cuaca tidak tersedia untuk lokasi ini.
                </p>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Section 2: Pollution Data */}
        <motion.section
          ref={refs.features}
          variants={sectionVariants}
          initial="visible"
          animate={controls.features}
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
          {isDataLoading && !pollutionData ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
              <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
                Memuat data polusi...
              </p>
            </div>
          ) : pollutionData?.main && pollutionData?.components ? (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-lg flex items-center justify-between text-sm border border-[#72e4f8]/30 dark:border-[#07798d]/30 hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors ${getAqiStyling(pollutionData.main.aqi).bgColor
                  }`}
              >
                <span className="font-semibold text-[#01130c] dark:text-[#ecfef7]">
                  Indeks Kualitas Udara (AQI):
                </span>
                <span
                  className={`font-bold px-2.5 py-1 rounded-full ${getAqiStyling(pollutionData.main.aqi).color
                    }`}
                >
                  {pollutionData.main.aqi} -{" "}
                  {getAqiStyling(pollutionData.main.aqi).level}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(pollutionData.components).map(
                  ([key, value]) => (
                    <motion.div
                      key={key}
                      variants={itemVariants}
                      className="p-4 bg-[#f6fefc] dark:bg-[#010907] border border-[#72e4f8]/30 dark:border-[#07798d]/30 rounded-lg hover:bg-[#1ff498]/5 dark:hover:bg-[#0be084]/5 transition-colors"
                    >
                      <strong className="block text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70 uppercase">
                        {key.replace(/_/g, ".").replace("pm25", "PM2.5")}:
                      </strong>
                      <span className="text-base font-medium text-[#01130c] dark:text-[#ecfef7]">
                        {typeof value === "number" ? value.toFixed(2) : value}{" "}
                        µg/m³
                      </span>
                    </motion.div>
                  )
                )}
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
              Data polusi tidak tersedia untuk lokasi ini.
            </p>
          )}
        </motion.section>

        {/* Section 3: AI Analysis */}
        {isAiLoading ? (
          <motion.section
            ref={refs.whyChooseUs}
            variants={sectionVariants}
            initial="visible"
            animate={controls.whyChooseUs}
            className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-[#1ff498] dark:text-[#0be084]" />
              <p className="mt-2 text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70">
                AI sedang menganalisis...
              </p>
            </div>
          </motion.section>
        ) : aiAnalysis ? (
          <motion.section
            ref={refs.faq}
            variants={sectionVariants}
            initial="visible"
            animate={controls.faq}
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
        ) : null}

        {/* Section Tanah */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="bg-gradient-to-br from-[#f6fefc] to-[#e6f8f4] dark:from-[#0a1a16] dark:to-[#010907] p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg"
          data-section="tanah"
        >
          {/* Floating decorative elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#0be084]/10 blur-xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-0 w-24 h-24 rounded-full bg-[#1ff498]/10 blur-lg"
          />

          <div className="relative flex flex-col lg:flex-row gap-8 items-center z-10">
            {/* Image Section */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2 order-2 lg:order-1 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-[#e6f8f4] dark:bg-[#0a1a16] p-1 rounded-xl border border-[#0be084]/30 shadow-lg overflow-hidden">
                <motion.img
                  src="/soil-health.jpg"
                  alt="Kesehatan Tanah"
                  className="rounded-lg w-full h-64 object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
                  }
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-[#0a1a16] px-4 py-2 rounded-lg border border-[#0be084]/30 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#0be084]" />
                  <div>
                    <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                      Komposisi Sampah
                    </div>
                    <div className="font-medium text-[#0a865d] dark:text-[#0be084]">
                      64% Organik
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2 order-1 lg:order-2 space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#0be084]/10 backdrop-blur-sm border border-[#0be084]/30 text-[#0a865d] dark:text-[#0be084] px-4 py-2 rounded-full mb-4 hover:bg-[#0be084]/20 transition-colors">
                <TreePine className="w-5 h-5" />
                <span className="text-sm font-medium">Kesehatan Tanah</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#0a865d] to-[#0be084] bg-clip-text text-transparent dark:from-[#0be084] dark:to-[#1ff498]">
                Transformasi Sampah Menjadi Sumber Kehidupan
              </h2>

              <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 leading-relaxed">
                Setiap orang di Indonesia menghasilkan 0,7 kg sampah per hari.
                Tanah yang tercemar plastik membutuhkan 20-500 tahun untuk
                pulih, mengancam ketahanan pangan dan ekosistem alami.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 dark:bg-[#0a1a16]/80 p-4 rounded-xl border border-[#0be084]/20">
                  <div className="text-2xl font-bold text-[#0a865d] dark:text-[#0be084]">
                    0.7kg
                  </div>
                  <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    Sampah/orang/hari
                  </div>
                </div>
                <div className="bg-white/80 dark:bg-[#0a1a16]/80 p-4 rounded-xl border border-[#0be084]/20">
                  <div className="text-2xl font-bold text-[#0a865d] dark:text-[#0be084]">
                    500thn
                  </div>
                  <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    Plastik terurai
                  </div>
                </div>
              </div>

              {/* Toggle Button */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 4px 15px rgba(11, 224, 132, 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-gradient-to-r from-[#0be084] to-[#1ff498] text-black rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                onClick={() => setShowTanahTips(!showTanahTips)}
              >
                {showTanahTips ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Sembunyikan Detail</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Pelajari Lebih Lanjut</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Detailed Content (Appears on button click) */}
          <AnimatePresence>
            {showTanahTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 overflow-hidden"
              >
                <div className="bg-white/80 dark:bg-[#0a1a16]/80 p-6 rounded-xl border border-[#0be084]/30 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-[#0a865d] dark:text-[#0be084] mb-4">
                    Dampak Sampah terhadap Kesehatan Tanah
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                        Jenis Pencemar Tanah
                      </h4>
                      <ul className="space-y-2 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#0be084] flex-shrink-0" />
                          <span>
                            Sampah plastik (kantong, kemasan, mikroplastik)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#0be084] flex-shrink-0" />
                          <span>Limbah elektronik mengandung logam berat</span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#0be084] flex-shrink-0" />
                          <span>
                            Bahan kimia pertanian (pestisida, herbisida)
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <HeartPulse className="w-5 h-5 text-amber-500" />
                        Dampak Lingkungan
                      </h4>
                      <ul className="space-y-2 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#0be084] flex-shrink-0" />
                          <span>Penurunan kesuburan tanah hingga 40%</span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#0be084] flex-shrink-0" />
                          <span>
                            Kontaminasi rantai makanan oleh mikroplastik
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#0be084] flex-shrink-0" />
                          <span>
                            Gangguan ekosistem alami dan biodiversitas
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <Sparkle className="w-5 h-5 text-[#0be084]" />
                        Solusi Berkelanjutan
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-[#0be084]/10 p-4 rounded-lg border border-[#0be084]/20">
                          <h5 className="font-medium text-[#0a865d] dark:text-[#0be084] mb-2">
                            Pengelolaan Sampah
                          </h5>
                          <p className="text-sm">
                            Sistem 3R (Reduce, Reuse, Recycle) dan bank sampah
                          </p>
                        </div>
                        <div className="bg-[#0be084]/10 p-4 rounded-lg border border-[#0be084]/20">
                          <h5 className="font-medium text-[#0a865d] dark:text-[#0be084] mb-2">
                            Pertanian Organik
                          </h5>
                          <p className="text-sm">
                            Kompos alami dan pestisida ramah lingkungan
                          </p>
                        </div>
                        <div className="bg-[#0be084]/10 p-4 rounded-lg border border-[#0be084]/20">
                          <h5 className="font-medium text-[#0a865d] dark:text-[#0be084] mb-2">
                            Bioremediasi
                          </h5>
                          <p className="text-sm">
                            Penggunaan mikroorganisme untuk pembersihan tanah
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

       <motion.section
          ref={refs.soilImpactCalculatorSection} // Referensi baru untuk section ini
          initial="visible"
          animate={controls.soilImpactCalculatorSection} // Kontrol baru untuk section ini
          variants={sectionVariants}
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-6"
        >
          <SoilImpactCalculator
            sectionVariants={sectionVariants}
            itemVariants={itemVariants}
          />
        </motion.section>
        {/* Kalkulator Dampak Lingkungan - END */}


        {/* Waste Statistics Section */}
        <motion.section
          ref={refs.wasteStatsSection}
          initial="visible"
          animate={controls.wasteStatsSection}
          variants={sectionVariants}
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-6"
        >
          <GrafikSampahIndonesia />
        </motion.section>


        {/* Section 4: Edukasi Sampah */}
        <motion.section
          ref={refs.testimoni}
          variants={sectionVariants}
          initial="visible"
          animate={controls.testimoni}
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-[#f6fefc] dark:bg-[#010907] border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block bg-[#a7f3d0]/20 dark:bg-[#22c55e]/20 text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
          >
            <span className="flex items-center text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zM12.75 7.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V8.25a.75.75 0 01.75-.75zm0 3a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              Edukasi Pengelolaan Sampah
            </span>
          </motion.div>
          <div className="space-y-6">
            <motion.h2
              variants={itemVariants}
              className="text-xl font-semibold text-[#01130c] dark:text-[#ecfef7]"
            >
              Krisis Sampah di Indonesia: Fakta dan Solusi
            </motion.h2>
            <div className="prose prose-sm dark:prose-invert prose-p:text-[#01130c]/80 dark:prose-p:text-[#ecfef7]/80 prose-ul:list-disc prose-li:text-[#01130c]/80 dark:prose-li:text-[#ecfef7]/80 max-w-none leading-relaxed">
              <p>
                Indonesia menghadapi tantangan besar dalam pengelolaan sampah.
                Setiap tahun, jutaan ton sampah dihasilkan, dan sebagian besar
                berakhir di tempat pembuangan akhir (TPA) yang sudah melebihi
                kapasitas, atau bahkan mencemari lingkungan seperti sungai dan
                laut.
              </p>
              <h3>Fakta Penting:</h3>
              <ul>
                <li>
                  Indonesia merupakan salah satu penyumbang sampah plastik
                  terbesar ke laut dunia.
                </li>
                <li>
                  Tingkat daur ulang sampah di Indonesia masih sangat rendah.
                </li>
                <li>
                  Pengelolaan sampah yang tidak tepat dapat menyebabkan masalah
                  kesehatan dan pencemaran lingkungan.
                </li>
              </ul>
              <h3>Jenis-jenis Sampah Utama di Indonesia:</h3>
              <ul>
                <li>
                  <strong>Sampah Organik:</strong> Sisa makanan, daun-daunan
                  (sekitar 60% dari total sampah).
                </li>
                <li>
                  <strong>Sampah Plastik:</strong> Kemasan, botol, kantong
                  plastik (sekitar 15%).
                </li>
                <li>
                  <strong>Sampah Kertas/Karton:</strong> Kardus, koran, majalah
                  (sekitar 10%).
                </li>
                <li>
                  <strong>Sampah Logam:</strong> Kaleng, besi (sekitar 5%).
                </li>
                <li>
                  <strong>Sampah Lainnya:</strong> Kaca, kain, elektronik
                  (sekitar 10%).
                </li>
              </ul>
              <h3>Solusi dan Upaya yang Dapat Dilakukan:</h3>
              <ul>
                <li>
                  <strong>Pengurangan Sampah dari Sumber:</strong> Membawa tas
                  belanja sendiri, menghindari kemasan sekali pakai.
                </li>
                <li>
                  <strong>Pemilahan Sampah:</strong> Memisahkan sampah organik,
                  anorganik, dan B3 (Bahan Berbahaya dan Beracun).
                </li>
                <li>
                  <strong>Daur Ulang:</strong> Mendukung industri daur ulang dan
                  memanfaatkan kembali barang bekas.
                </li>
                <li>
                  <strong>Pengomposan:</strong> Mengolah sampah organik menjadi
                  pupuk kompos.
                </li>
                <li>
                  <strong>Kebijakan Pemerintah:</strong> Penerapan regulasi yang
                  lebih ketat terkait pengelolaan sampah dan dukungan terhadap
                  inisiatif daur ulang.
                </li>
              </ul>
              <p>
                Mari bersama-sama berkontribusi untuk Indonesia yang lebih
                bersih dan sehat dengan mengelola sampah secara bertanggung
                jawab!
              </p>
            </div>
          </div>
        </motion.section>


        {/* Section Air */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="bg-gradient-to-br from-[#f6fefc] to-[#e0f7fd] dark:from-[#021a2e] dark:to-[#010907] p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg"
          data-section="air"
        >
          {/* Floating decorative elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#07798d]/10 blur-xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
            className="absolute bottom-20 left-0 w-24 h-24 rounded-full bg-[#50b7f7]/10 blur-lg"
          />

          <div className="relative flex flex-col lg:flex-row gap-8 items-center z-10">
            {/* Content Section */}
            <motion.div variants={itemVariants} className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#07798d]/10 backdrop-blur-sm border border-[#07798d]/30 text-[#07798d] dark:text-[#72e4f8] px-4 py-2 rounded-full mb-4 hover:bg-[#07798d]/20 transition-colors">
                <Droplets className="w-5 h-5" />
                <span className="text-sm font-medium">Kualitas Air</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#07798d] to-[#50b7f7] bg-clip-text text-transparent dark:from-[#72e4f8] dark:to-[#50b7f7]">
                Perlindungan Sumber Daya Air untuk Masa Depan
              </h2>

              <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 leading-relaxed">
                2,2 miliar orang kekurangan akses air minum aman. Limbah
                industri mencemari 80% sumber air global, mengancam ekosistem
                dan kesehatan masyarakat di seluruh dunia.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 dark:bg-[#021a2e]/80 p-4 rounded-xl border border-[#07798d]/20">
                  <div className="text-2xl font-bold text-[#07798d] dark:text-[#72e4f8]">
                    2.2B
                  </div>
                  <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    Orang tanpa air bersih
                  </div>
                </div>
                <div className="bg-white/80 dark:bg-[#021a2e]/80 p-4 rounded-xl border border-[#07798d]/20">
                  <div className="text-2xl font-bold text-[#07798d] dark:text-[#72e4f8]">
                    80%
                  </div>
                  <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                    Sumber air tercemar
                  </div>
                </div>
              </div>

              {/* Toggle Button */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 4px 15px rgba(7, 121, 141, 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-gradient-to-r from-[#07798d] to-[#50b7f7] text-white rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                onClick={() => setShowAirTips(!showAirTips)}
              >
                {showAirTips ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Sembunyikan Detail</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Pelajari Lebih Lanjut</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Image Section */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-[#e0f7fd] dark:bg-[#021a2e] p-1 rounded-xl border border-[#07798d]/30 shadow-lg overflow-hidden">
                <motion.img
                  src="/water-conservation.jpg"
                  alt="Konservasi Air"
                  className="rounded-lg w-full h-64 object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1437957146754-f6377debe171?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
                  }
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white dark:bg-[#032b2e] px-4 py-2 rounded-lg border border-[#07798d]/30 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-[#07798d]" />
                  <div>
                    <div className="text-xs text-[#01130c]/70 dark:text-[#ecfef7]/70">
                      Kebutuhan Air
                    </div>
                    <div className="font-medium text-[#07798d] dark:text-[#72e4f8]">
                      60 Liter/hari
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Detailed Content (Appears on button click) */}
          <AnimatePresence>
            {showAirTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 overflow-hidden"
              >
                <div className="bg-white/80 dark:bg-[#021a2e]/80 p-6 rounded-xl border border-[#07798d]/30 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-[#07798d] dark:text-[#72e4f8] mb-4">
                    Krisis Air Bersih dan Solusinya
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                        Sumber Pencemaran
                      </h4>
                      <ul className="space-y-2 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#07798d] flex-shrink-0" />
                          <span>
                            Limbah industri (bahan kimia, logam berat)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#07798d] flex-shrink-0" />
                          <span>Pertanian (pestisida, pupuk kimia)</span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#07798d] flex-shrink-0" />
                          <span>Rumah tangga (detergen, mikroplastik)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <HeartPulse className="w-5 h-5 text-amber-500" />
                        Dampak Kesehatan
                      </h4>
                      <ul className="space-y-2 text-[#01130c]/80 dark:text-[#ecfef7]/80">
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#07798d] flex-shrink-0" />
                          <span>Penyakit diare dan kolera</span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#07798d] flex-shrink-0" />
                          <span>Gangguan ginjal akibat logam berat</span>
                        </li>
                        <li className="flex items-start">
                          <Circle className="w-2 h-2 mt-1.5 mr-2 text-[#07798d] flex-shrink-0" />
                          <span>Gangguan hormon dari bahan kimia</span>
                        </li>
                      </ul>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-[#01130c] dark:text-[#ecfef7] flex items-center gap-2 mb-2">
                        <Sparkle className="w-5 h-5 text-[#07798d]" />
                        Strategi Konservasi
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-[#07798d]/10 p-4 rounded-lg border border-[#07798d]/20">
                          <h5 className="font-medium text-[#07798d] dark:text-[#72e4f8] mb-2">
                            Teknologi
                          </h5>
                          <p className="text-sm">
                            Sistem penyaringan modern dan pengolahan limbah
                          </p>
                        </div>
                        <div className="bg-[#07798d]/10 p-4 rounded-lg border border-[#07798d]/20">
                          <h5 className="font-medium text-[#07798d] dark:text-[#72e4f8] mb-2">
                            Kebijakan
                          </h5>
                          <p className="text-sm">
                            Regulasi ketat pembuangan limbah industri
                          </p>
                        </div>
                        <div className="bg-[#07798d]/10 p-4 rounded-lg border border-[#07798d]/20">
                          <h5 className="font-medium text-[#07798d] dark:text-[#72e4f8] mb-2">
                            Komunitas
                          </h5>
                          <p className="text-sm">
                            Program daur ulang dan penyadaran masyarakat
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
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
