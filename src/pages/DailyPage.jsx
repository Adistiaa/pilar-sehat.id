import { useState, useEffect, useCallback } from "react";
import { 
  Newspaper, 
  ChevronRight, 
  Calendar, 
  X, 
  Search,
  ArrowLeft,
  ArrowRight,
  Globe,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";
import * as _ from 'lodash';
import useScrollAnimations from "../components/AnimasiScroll";

const NewsCard = ({ newsItem, onClick }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      return "Tidak ada tanggal";
    }
  };

  return (
    <div 
      className="bg-white dark:bg-[#0a1a16] rounded-xl overflow-hidden border-2 border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084] transition-all hover:shadow-lg cursor-pointer group"
      onClick={onClick} id="content"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-xs text-[#01130c]/60 dark:text-[#ecfef7]/60">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{newsItem.pubDate ? formatDate(newsItem.pubDate) : "Tidak ada tanggal"}</span>
          </div>
          <span className="bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] text-xs font-medium px-2 py-1 rounded-full">
            {newsItem.categories[0]}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-[#1ff498] dark:group-hover:text-[#0be084] transition-colors">
          {newsItem.title}
        </h3>
        <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 text-sm mb-4 line-clamp-3">
          {newsItem.headline || "Baca selengkapnya untuk detail berita"}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[#1ff498] dark:text-[#0be084] text-sm font-medium flex items-center group-hover:underline">
            Baca selengkapnya <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="flex items-center text-xs text-[#01130c]/60 dark:text-[#ecfef7]/60">
            <Globe className="w-3 h-3 mr-1" />
            <span>{newsItem.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsModal = ({ newsItem, onClose }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      return "Tidak ada tanggal";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-[#010907] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-10 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white dark:bg-[#010907] rounded-full p-2 shadow-lg hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10 transition-colors z-20"
        >
          <X className="w-5 h-5 text-[#01130c] dark:text-[#ecfef7]" />
        </button>
        
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#1ff498]/20 to-[#50b7f7]/20 dark:from-[#0be084]/20 dark:to-[#07798d]/20 p-6 md:p-8 border-b-2 border-[#1ff498] dark:border-[#0be084]">
            <div className="flex items-center space-x-2 mb-3">
              {newsItem.categories && newsItem.categories.map((cat, idx) => (
                <span key={idx} className="bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] text-xs font-medium px-2 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-[#01130c] dark:text-[#ecfef7]">{newsItem.title}</h2>
          </div>
          
          {/* News Details */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 text-sm text-[#01130c]/60 dark:text-[#ecfef7]/60">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{newsItem.pubDate ? formatDate(newsItem.pubDate) : "Tidak ada tanggal"}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                <span>{newsItem.source}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg font-medium text-[#01130c] dark:text-[#ecfef7]">
                {newsItem.headline || newsItem.title}
              </p>
              
              <div className="prose dark:prose-invert max-w-none text-[#01130c]/80 dark:text-[#ecfef7]/80">
                <p>
                  Untuk membaca artikel lengkap, silakan kunjungi sumber berita di bawah ini:
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href={newsItem.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] font-medium rounded-lg hover:bg-[#1ff498]/80 dark:hover:bg-[#0be084]/80 transition-colors"
                  >
                    Buka Artikel Asli <ChevronRight className="w-4 h-4 ml-2" />
                  </a>
                  <button 
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-[#72e4f8] dark:border-[#07798d] text-[#01130c] dark:text-[#ecfef7] font-medium rounded-lg hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10 transition-colors"
                  >
                    Kembali ke Daftar Berita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
            currentPage === 1
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-200 dark:border-gray-700"
              : "bg-white dark:bg-[#0a1a16] text-[#01130c] dark:text-[#ecfef7] border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              currentPage === index + 1
                ? "bg-[#1ff498] dark:bg-[#0be084] text-white border-2 border-[#1ff498] dark:border-[#0be084]"
                : "bg-white dark:bg-[#0a1a16] text-[#01130c] dark:text-[#ecfef7] border border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084]"
            }`}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
            currentPage === totalPages
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-200 dark:border-gray-700"
              : "bg-white dark:bg-[#0a1a16] text-[#01130c] dark:text-[#ecfef7] border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084]"
          }`}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// const FooterWave = () => {
//   return (
//     <div className="relative h-32 w-full overflow-hidden">
//       <svg
//         viewBox="0 0 1200 120"
//         preserveAspectRatio="none"
//         className="absolute top-0 w-full h-full"
//       >
//         <path
//           fill="#1ff498"
//           fillOpacity="0.1"
//           d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
//         />
//         <path
//           fill="#1ff498"
//           fillOpacity="0.2"
//           d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9-9.42,98.6-31.56,31.77-25.39,62.32-62,103.63-73,40.44-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28-22.88,168.9-38.84,30.2-8.66,59-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
//         />
//         <path
//           fill="#1ff498"
//           fillOpacity="0.3"
//           d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
//         />
//       </svg>
//     </div>
//   );
// };

const LoadingState = () => (
  <div className="flex flex-col justify-center items-center py-20">
    <div className="w-16 h-16 border-4 border-[#1ff498] border-t-transparent dark:border-[#0be084] dark:border-t-transparent rounded-full animate-spin mb-4"></div>
    <div className="text-center">
      <p className="text-xl font-medium bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent animate-pulse">Mohon Menunggu</p>
      <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 mt-2">Sedang mengambil berita terbaru untuk Anda...</p>
    </div>
  </div>
);

const EmptyState = ({ searchTerm }) => (
  <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-8 rounded-xl text-center">
    <p className="text-lg font-medium">Tidak ada berita yang ditemukan</p>
    {searchTerm && <p className="mt-2">Coba dengan kata kunci lain</p>}
  </div>
);

const ErrorState = ({ message }) => (
  <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg text-center">
    {message}
  </div>
);

const DailyPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const newsPerPage = 6;

  // Use the imported scroll animations
  useScrollAnimations();
  
  const parseXML = useCallback((xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    
    const items = xmlDoc.querySelectorAll("item");
    const parsedItems = [];
    
    items.forEach(item => {
      const title = item.querySelector("title")?.textContent || "";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      
      // Extract source name from description or from source tag
      let source = item.querySelector("source")?.textContent || "";
      if (!source && description) {
        const sourceMatch = description.match(/<font color="#6f6f6f">(.*?)<\/font>/);
        source = sourceMatch ? sourceMatch[1] : "Google News";
      }
      
      // Extract headline from description
      let headline = "";
      if (description) {
        // Clean up the HTML from description to get a readable headline
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = description;
        headline = tempDiv.textContent || "";
        headline = headline.replace(source, "").trim();
      }
      
      // Enhanced categories extraction
      let categories = ["Kesehatan"];
      
      // Try to extract more specific health categories using keywords
      const keywordMap = {
        "diet": "Diet",
        "nutrisi": "Nutrisi",
        "olahraga": "Olahraga",
        "mental": "Kesehatan Mental",
        "virus": "Penyakit",
        "penyakit": "Penyakit",
        "dokter": "Medis",
        "rumah sakit": "Medis",
        "vaksin": "Vaksinasi",
        "jantung": "Kardiologi",
        "kanker": "Onkologi",
        "gigi": "Gigi"
      };
      
      const lowerTitle = title.toLowerCase();
      const lowerHeadline = headline.toLowerCase();
      
      Object.entries(keywordMap).forEach(([keyword, category]) => {
        if (lowerTitle.includes(keyword) || lowerHeadline.includes(keyword)) {
          if (!categories.includes(category)) {
            categories.push(category);
          }
        }
      });
      
      parsedItems.push({
        title,
        link,
        pubDate,
        headline,
        source,
        image: "",
        categories
      });
    });
    
    return parsedItems;
  }, []);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use a CORS proxy for development - in production you'd handle this server-side
        const newsEndpoint = "https://news.google.com/rss/search?q=kesehatan&hl=id&gl=ID&ceid=ID:id";
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(newsEndpoint)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const xmlText = await response.text();
        const parsedNews = parseXML(xmlText);
        
        setNews(parsedNews);
        
        // Extract unique categories
        const allCategories = _.uniq(parsedNews.flatMap(item => item.categories));
        setCategories(allCategories);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Gagal mengambil berita. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [parseXML]);
  
  // Reset page when search term or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);
  
  // Filter news based on search term and selected category
  const filteredNews = news.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.headline && item.headline.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || 
      item.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate pagination
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  
  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  return (
    <div className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] min-h-screen" id="content">
      {/* Hero Section */}
      <section className="relative pt-28 pb-6 px-4 md:px-8 lg:px-16 data-scroll-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4 data-scroll data-scroll-speed='0.5'">
            <span className="flex items-center text-sm font-medium">
              <Newspaper className="w-4 h-4 mr-2" />
              Berita Harian
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 data-scroll data-scroll-speed='1'">
            Berita{" "}
            <span className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent">
              Kesehatan
            </span>
          </h1>

          <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto data-scroll data-scroll-speed='1.5'">
            Informasi terkini seputar kesehatan yang perlu Anda ketahui untuk menjaga gaya hidup sehat.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 pb-32 data-scroll-section">
        {/* Search Bar and Filters */}
        <div className="mb-8">
          <div className="flex items-center bg-white dark:bg-[#0a1a16] border-2 border-[#72e4f8] dark:border-[#07798d] rounded-full p-2 px-4 focus-within:border-[#1ff498] dark:focus-within:border-[#0be084] transition-all">
            <Search className="w-5 h-5 text-[#01130c]/50 dark:text-[#ecfef7]/50" />
            <input
              type="text"
              placeholder="Cari berita kesehatan..."
              className="flex-1 bg-transparent border-none outline-none px-3 py-1 text-[#01130c] dark:text-[#ecfef7]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70 mr-2">
                <Tag className="w-4 h-4 mr-1" />
                <span>Filter:</span>
              </div>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    selectedCategory === category 
                      ? "bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907]" 
                      : "bg-white dark:bg-[#0a1a16] text-[#01130c] dark:text-[#ecfef7] border border-[#72e4f8] dark:border-[#07798d] hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10"
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 transition-all"
                >
                  Reset Filter <X className="w-3 h-3 inline-block ml-1" />
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* News Content */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : currentNews.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map((newsItem, index) => (
                <div key={index} className="data-scroll data-scroll-speed='0.2'">
                  <NewsCard 
                    newsItem={newsItem} 
                    onClick={() => openModal(newsItem)} 
                  />
                </div>
              ))}
            </div>
            
            {/* Results summary */}
            <div className="mt-8 text-center text-sm text-[#01130c]/60 dark:text-[#ecfef7]/60">
              Menampilkan {indexOfFirstNews + 1}-{Math.min(indexOfLastNews, filteredNews.length)} dari {filteredNews.length} berita 
              {searchTerm && ` untuk pencarian "${searchTerm}"`}
              {selectedCategory && ` dalam kategori "${selectedCategory}"`}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        )}
      </div>

      {/* News Detail Modal */}
      {isModalOpen && selectedNews && (
        <NewsModal newsItem={selectedNews} onClose={closeModal} />
      )}
      
      {/* Footer Wave
      <FooterWave /> */}
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
};

export default DailyPage;