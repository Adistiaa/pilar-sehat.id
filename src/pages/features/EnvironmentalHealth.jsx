import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import ReactMarkdown from 'react-markdown';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';

// Fixing default marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

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

function EnvironmentalHealth() {
    // State untuk lokasi dan data polusi
    const [location, setLocation] = useState(null);
    const [pollutionData, setPollutionData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [initialLocation, setInitialLocation] = useState(null);

    // Referensi untuk menyimpan marker
    const markerRef = useRef(null);
    const mapRef = useRef(null);

    // API Keys from environment variables
    const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const GEMINI_API_KEY = import.meta.env.VITE_URL;

    // Fungsi untuk mengambil lokasi pengguna menggunakan geolocation
    const getUserLocation = () => {
        setIsLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                    setLocation(newLocation);
                    setInitialLocation(newLocation);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // Default to a central location if geolocation fails
                    const defaultLocation = { lat: -6.2088, lon: 106.8456 }; // Jakarta
                    setLocation(defaultLocation);
                    setInitialLocation(defaultLocation);
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            // Default to Jakarta
            const defaultLocation = { lat: -6.2088, lon: 106.8456 };
            setLocation(defaultLocation);
            setInitialLocation(defaultLocation);
        }
    };

    // Fungsi untuk mengambil data dari Gemini
    const fetchGeminiResponse = async (prompt) => {
        if (!GEMINI_API_KEY) {
            console.error('Gemini API key is missing');
            return null;
        }

        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!res.ok) {
                throw new Error('Failed to fetch AI analysis');
            }

            const data = await res.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error in AI analysis:', error);
            return null;
        }
    };

    // Efek untuk mengambil data polusi dan cuaca ketika lokasi berubah
    useEffect(() => {
        const fetchEnvironmentalData = async () => {
            if (!location || !OPENWEATHER_API_KEY) return;

            try {
                setIsLoading(true);
                // Ambil data polusi
                const pollutionResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}`
                );
                
                // Ambil data cuaca
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
                );
                
                if (!pollutionResponse.ok || !weatherResponse.ok) {
                    throw new Error('Gagal mengambil data lingkungan');
                }
                
                const pollutionData = await pollutionResponse.json();
                const weatherData = await weatherResponse.json();

                setPollutionData(pollutionData.list[0]);
                setWeatherData(weatherData);
            } catch (err) {
                console.error('Error fetching environmental data:', err);
                setPollutionData(null);
                setWeatherData(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (location) {
            fetchEnvironmentalData();
        }
    }, [location, OPENWEATHER_API_KEY]);

    // Fungsi untuk menganalisis data dengan AI
    const handleAiAnalysis = async () => {
        if (!pollutionData || !GEMINI_API_KEY) return;

        try {
            setIsAiLoading(true);
            // Buat prompt untuk analisis AI yang lebih singkat dan efektif
            const prompt = `Analisis data kualitas udara ini secara ringkas:
AQI: ${pollutionData.main.aqi}
CO: ${pollutionData.components.co.toFixed(2)} μg/m³
NO₂: ${pollutionData.components.no2.toFixed(2)} μg/m³
O₃: ${pollutionData.components.o3.toFixed(2)} μg/m³
PM2.5: ${pollutionData.components.pm2_5.toFixed(2)} μg/m³
PM10: ${pollutionData.components.pm10.toFixed(2)} μg/m³

Berikan penilaian singkat dan jelas mengenai risiko kesehatan serta rekomendasi yang perlu dilakukan.`;

            // Ambil analisis AI
            const aiAnalysisText = await fetchGeminiResponse(prompt);
            setAiAnalysis(aiAnalysisText);
        } catch (err) {
            console.error('Error fetching AI analysis:', err);
            setAiAnalysis(null);
        } finally {
            setIsAiLoading(false);
        }
    };

    // Fungsi untuk kembali ke lokasi awal
    const returnToMyLocation = () => {
        if (initialLocation && mapRef.current) {
            mapRef.current.setView([initialLocation.lat, initialLocation.lon], 13);
            setLocation(initialLocation);
        }
    };

    // Efek untuk mengambil lokasi pengguna
    useEffect(() => {
        getUserLocation();
    }, []);

    // Render loading state
    if (isLoading) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-xl">Memuat data... Harap tunggu.</p>
            </div>
        );
    }

    // Render konten utama
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pelacak Polusi Lingkungan</h1>

            {/* Peta Interaktif */}
            {location && (
                <div className="relative">
                    <MapContainer 
                        ref={mapRef}
                        center={[location.lat, location.lon]} 
                        zoom={13} 
                        scrollWheelZoom={true}
                        className="h-[400px] w-full mb-4"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SearchControl onSearchResult={setLocation} />
                        <Marker 
                            ref={markerRef}
                            position={[location.lat, location.lon]}
                        >
                            <Popup>
                                Lokasi: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                            </Popup>
                        </Marker>
                    </MapContainer>
                    {/* Tombol Kembali ke Lokasi Saya */}
                    <button 
                        onClick={returnToMyLocation}
                        className="absolute z-[1000] top-4 right-4 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-md hover:bg-gray-100"
                    >
                        🏠 Kembali ke Lokasi Saya
                    </button>
                </div>
            )}

            {/* Informasi Cuaca */}
            {weatherData && (
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Informasi Cuaca</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <strong>Suhu:</strong> {weatherData.main.temp}°C
                        </div>
                        <div>
                            <strong>Terasa Seperti:</strong> {weatherData.main.feels_like}°C
                        </div>
                        <div>
                            <strong>Cuaca:</strong> {weatherData.weather[0].description}
                        </div>
                        <div>
                            <strong>Kelembaban:</strong> {weatherData.main.humidity}%
                        </div>
                        <div>
                            <strong>Kecepatan Angin:</strong> {weatherData.wind.speed} m/s
                        </div>
                        <div>
                            <strong>Awan:</strong> {weatherData.clouds.all}%
                        </div>
                    </div>
                </div>
            )}

            {/* Informasi Polusi */}
            {pollutionData && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Data Polusi Terperinci</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <strong>Indeks Kualitas Udara (AQI):</strong> {pollutionData.main.aqi}
                        </div>
                        <div>
                            <strong>CO:</strong> {pollutionData.components.co.toFixed(2)} μg/m³
                        </div>
                        <div>
                            <strong>NO₂:</strong> {pollutionData.components.no2.toFixed(2)} μg/m³
                        </div>
                        <div>
                            <strong>O₃:</strong> {pollutionData.components.o3.toFixed(2)} μg/m³
                        </div>
                        <div>
                            <strong>PM2.5:</strong> {pollutionData.components.pm2_5.toFixed(2)} μg/m³
                        </div>
                        <div>
                            <strong>PM10:</strong> {pollutionData.components.pm10.toFixed(2)} μg/m³
                        </div>
                    </div>

                    {/* Tombol Analisis AI */}
                    <div className="mt-4">
                        <button 
                            onClick={handleAiAnalysis} 
                            disabled={isAiLoading}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                        >
                            {isAiLoading ? 'Menganalisis...' : 'Analisis dengan AI'}
                        </button>
                    </div>
                </div>
            )}

            {/* Analisis AI */}
            {aiAnalysis && (
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Analisis Kualitas Udara</h2>
                    <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}

export default EnvironmentalHealth;