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
  Tag,
  RefreshCw,
  Home,
  Map,
  Layers
} from "lucide-react";
import * as _ from 'lodash';
import useScrollAnimations from "../components/AnimasiScroll";

const NewsCard = ({ newsItem, onClick }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(newsItem.isInternational ? "en-US" : "id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      return newsItem.isInternational ? "No date available" : "Tidak ada tanggal";
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
            <span>{newsItem.pubDate ? formatDate(newsItem.pubDate) : (newsItem.isInternational ? "No date available" : "Tidak ada tanggal")}</span>
          </div>
          <span className="bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] text-xs font-medium px-2 py-1 rounded-full">
          {newsItem.isInternational ? "International" : "Dalam Negeri"}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-[#1ff498] dark:group-hover:text-[#0be084] transition-colors">
          {newsItem.title}
        </h3>
        <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 text-sm mb-4 line-clamp-3">
          {newsItem.headline || (newsItem.isInternational ? "Read more for news details" : "Baca selengkapnya untuk detail berita")}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[#1ff498] dark:text-[#0be084] text-sm font-medium flex items-center group-hover:underline">
            {newsItem.isInternational ? "Read more" : "Baca selengkapnya"} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
      return date.toLocaleDateString(newsItem.isInternational ? "en-US" : "id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      return newsItem.isInternational ? "No date available" : "Tidak ada tanggal";
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
                <span>{newsItem.pubDate ? formatDate(newsItem.pubDate) : (newsItem.isInternational ? "No date available" : "Tidak ada tanggal")}</span>
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
                  {newsItem.isInternational 
                    ? "To read the full article, please visit the news source below:"
                    : "Untuk membaca artikel lengkap, silakan kunjungi sumber berita di bawah ini:"}
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href={newsItem.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] font-medium rounded-lg hover:bg-[#1ff498]/80 dark:hover:bg-[#0be084]/80 transition-colors"
                  >
                    {newsItem.isInternational ? "Open Original Article" : "Buka Artikel Asli"} <ChevronRight className="w-4 h-4 ml-2" />
                  </a>
                  <button 
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-[#72e4f8] dark:border-[#07798d] text-[#01130c] dark:text-[#ecfef7] font-medium rounded-lg hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10 transition-colors"
                  >
                    {newsItem.isInternational ? "Back to News List" : "Kembali ke Daftar Berita"}
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
  // Function to determine which pages to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of visible pages
    
    if (totalPages <= maxVisiblePages) {
      // If total pages less than or equal to maxVisiblePages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Determine middle pages to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Make sure we always show 3 pages in the middle
      if (startPage === 2) endPage = Math.min(totalPages - 1, startPage + 2);
      if (endPage === totalPages - 1) startPage = Math.max(2, endPage - 2);
      
      // Add "..." after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add "..." before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

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
        
        {getPageNumbers().map((page, index) => (
          page === "..." ? (
            <span 
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 text-[#01130c] dark:text-[#ecfef7]"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                currentPage === page
                  ? "bg-[#1ff498] dark:bg-[#0be084] text-white border-2 border-[#1ff498] dark:border-[#0be084]"
                  : "bg-white dark:bg-[#0a1a16] text-[#01130c] dark:text-[#ecfef7] border border-[#72e4f8] dark:border-[#07798d] hover:border-[#1ff498] dark:hover:border-[#0be084]"
              }`}
            >
              {page}
            </button>
          )
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

const LoadingState = ({ isInternational }) => (
  <div className="flex flex-col justify-center items-center py-20">
    <div className="w-16 h-16 border-4 border-[#1ff498] border-t-transparent dark:border-[#0be084] dark:border-t-transparent rounded-full animate-spin mb-4"></div>
    <div className="text-center">
      <p className="text-xl font-medium bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent animate-pulse">
        {isInternational ? "Please Wait" : "Mohon Menunggu"}
      </p>
      <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 mt-2">
        {isInternational 
          ? "Fetching the latest news for you..." 
          : "Sedang mengambil berita terbaru untuk Anda..."}
      </p>
    </div>
  </div>
);

const EmptyState = ({ searchTerm, isInternational }) => (
  <div className="bg-[#1ff498]/10 dark:bg-[#0be084]/10 p-8 rounded-xl text-center">
    <p className="text-lg font-medium">
      {isInternational ? "No news found" : "Tidak ada berita yang ditemukan"}
    </p>
    {searchTerm && <p className="mt-2">
      {isInternational ? "Try with another keyword" : "Coba dengan kata kunci lain"}  
    </p>}
  </div>
);

const ErrorState = ({ message, isInternational }) => (
  <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg text-center">
    {isInternational 
      ? `Error loading news: ${message}` 
      : `Gagal mengambil berita: ${message}`}
  </div>
);

const DailyPage = () => {
  // State for domestic news
  const [domesticNews, setDomesticNews] = useState([]);
  const [loadingDomestic, setLoadingDomestic] = useState(true);
  const [errorDomestic, setErrorDomestic] = useState(null);
  const [currentPageDomestic, setCurrentPageDomestic] = useState(1);
  const [searchTermDomestic, setSearchTermDomestic] = useState("");
  const [categoriesDomestic, setCategoriesDomestic] = useState([]);
  const [selectedCategoryDomestic, setSelectedCategoryDomestic] = useState(null);
  const [isRefreshingDomestic, setIsRefreshingDomestic] = useState(false);
  
  // State for international news
  const [internationalNews, setInternationalNews] = useState([]);
  const [loadingInternational, setLoadingInternational] = useState(true);
  const [errorInternational, setErrorInternational] = useState(null);
  const [currentPageInternational, setCurrentPageInternational] = useState(1);
  const [searchTermInternational, setSearchTermInternational] = useState("");
  const [categoriesInternational, setCategoriesInternational] = useState([]);
  const [selectedCategoryInternational, setSelectedCategoryInternational] = useState(null);
  const [isRefreshingInternational, setIsRefreshingInternational] = useState(false);
  
  // Shared state
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('domestic'); // 'domestic' or 'international'
  
  const newsPerPage = 6;

  // Use the imported scroll animations
  useScrollAnimations();
  
  // XML parsing function for both domestic and international news
  const parseXML = useCallback((xmlString, isInternational) => {
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
        source = sourceMatch ? sourceMatch[1] : (isInternational ? "Google News" : "Google Berita");
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
      
      // Define categories based on news content
      let categories = isInternational ? ["Health"] : ["Kesehatan"];
      
      // Enhanced categories extraction using keywords
      const keywordMap = isInternational ? {
        "diet": "Diet",
        "nutrition": "Nutrition",
        "exercise": "Exercise",
        "mental": "Mental Health",
        "virus": "Disease",
        "disease": "Disease",
        "doctor": "Medical",
        "hospital": "Medical",
        "vaccine": "Vaccination",
        "heart": "Cardiology",
        "cancer": "Oncology",
        "dental": "Dental"
      } : {
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
        categories,
        isInternational
      });
    });
    
    return parsedItems;
  }, []);
  
  // Fetch domestic news
  const fetchDomesticNews = useCallback(async () => {
    try {
      setIsRefreshingDomestic(true);
      
      // Use a CORS proxy for development - in production you'd handle this server-side
      const newsEndpoint = "https://news.google.com/rss/search?q=kesehatan&hl=id&gl=ID&ceid=ID:id";
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(newsEndpoint)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const xmlText = await response.text();
      const parsedNews = parseXML(xmlText, false);
      
      setDomesticNews(parsedNews);
      
      // Extract unique categories
      const allCategories = _.uniq(parsedNews.flatMap(item => item.categories));
      setCategoriesDomestic(allCategories);
      
      setLoadingDomestic(false);
      setIsRefreshingDomestic(false);
      setErrorDomestic(null);
    } catch (err) {
      console.error("Error fetching domestic news:", err);
      setErrorDomestic(err.message);
      setLoadingDomestic(false);
      setIsRefreshingDomestic(false);
    }
  }, [parseXML]);
  
  // Fetch international news
  const fetchInternationalNews = useCallback(async () => {
    try {
      setIsRefreshingInternational(true);
      
      // Use a CORS proxy for development - in production you'd handle this server-side
      const newsEndpoint = "https://news.google.com/rss/search?q=health&hl=en-US&gl=US&ceid=US:en";
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(newsEndpoint)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const xmlText = await response.text();
      const parsedNews = parseXML(xmlText, true);
      
      setInternationalNews(parsedNews);
      
      // Extract unique categories
      const allCategories = _.uniq(parsedNews.flatMap(item => item.categories));
      setCategoriesInternational(allCategories);
      
      setLoadingInternational(false);
      setIsRefreshingInternational(false);
      setErrorInternational(null);
    } catch (err) {
      console.error("Error fetching international news:", err);
      setErrorInternational(err.message);
      setLoadingInternational(false);
      setIsRefreshingInternational(false);
    }
  }, [parseXML]);
  
  // Initial data fetch
  useEffect(() => {
    fetchDomesticNews();
    fetchInternationalNews();
  }, [fetchDomesticNews, fetchInternationalNews]);
  
  // Reset page when search term or category changes for domestic news
  useEffect(() => {
    setCurrentPageDomestic(1);
  }, [searchTermDomestic, selectedCategoryDomestic]);
  
  // Reset page when search term or category changes for international news
  useEffect(() => {
    setCurrentPageInternational(1);
  }, [searchTermInternational, selectedCategoryInternational]);
  
  // Filter domestic news based on search term and selected category
  const filteredDomesticNews = domesticNews.filter(item => {
    const matchesSearch = searchTermDomestic === "" || 
      item.title.toLowerCase().includes(searchTermDomestic.toLowerCase()) ||
      (item.headline && item.headline.toLowerCase().includes(searchTermDomestic.toLowerCase()));
    
    const matchesCategory = selectedCategoryDomestic === null || 
      item.categories.includes(selectedCategoryDomestic);
    
    return matchesSearch && matchesCategory;
  });
  
  // Filter international news based on search term and selected category
  const filteredInternationalNews = internationalNews.filter(item => {
    const matchesSearch = searchTermInternational === "" || 
      item.title.toLowerCase().includes(searchTermInternational.toLowerCase()) ||
      (item.headline && item.headline.toLowerCase().includes(searchTermInternational.toLowerCase()));
    
    const matchesCategory = selectedCategoryInternational === null || 
      item.categories.includes(selectedCategoryInternational);
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate pagination for domestic news
  const indexOfLastDomesticNews = currentPageDomestic * newsPerPage;
  const indexOfFirstDomesticNews = indexOfLastDomesticNews - newsPerPage;
  const currentDomesticNews = filteredDomesticNews.slice(indexOfFirstDomesticNews, indexOfLastDomesticNews);
  const totalDomesticPages = Math.ceil(filteredDomesticNews.length / newsPerPage);
  
  // Calculate pagination for international news
  const indexOfLastInternationalNews = currentPageInternational * newsPerPage;
  const indexOfFirstInternationalNews = indexOfLastInternationalNews - newsPerPage;
  const currentInternationalNews = filteredInternationalNews.slice(indexOfFirstInternationalNews, indexOfLastInternationalNews);
  const totalInternationalPages = Math.ceil(filteredInternationalNews.length / newsPerPage);
  
  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };
  
  const handleDomesticPageChange = (page) => {
    setCurrentPageDomestic(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleInternationalPageChange = (page) => {
    setCurrentPageInternational(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleDomesticCategorySelect = (category) => {
    setSelectedCategoryDomestic(category === selectedCategoryDomestic ? null : category);
  };
  
  const handleInternationalCategorySelect = (category) => {
    setSelectedCategoryInternational(category === selectedCategoryInternational ? null : category);
  };
  
  const handleDomesticRefresh = () => {
    setLoadingDomestic(true);
    fetchDomesticNews();
  };
  
  const handleInternationalRefresh = () => {
    setLoadingInternational(true);
    fetchInternationalNews();
  };
  
  return (
    <div className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] min-h-screen" id="content">
      {/* Hero Section */}
      <section className="relative pt-28 pb-6 px-4 md:px-8 lg:px-16 data-scroll-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4 data-scroll data-scroll-speed='0.5'">
            <span className="flex items-center text-sm font-medium">
              <Newspaper className="w-4 h-4 mr-2" />
              Berita Kesehatan
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 data-scroll data-scroll-speed='1'">
            <span className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent">
              Berita Kesehatan
            </span>{" "}
            Terkini
          </h1>

          <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto data-scroll data-scroll-speed='1.5'">
            Informasi terkini seputar kesehatan dari dalam dan luar negeri
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 mb-8">
        <div className="bg-white dark:bg-[#0a1a16] rounded-lg shadow-sm border border-[#72e4f8] dark:border-[#07798d] p-1 flex">
          <button
            onClick={() => setActiveTab('domestic')}
            className={`flex-1 py-3 flex justify-center items-center gap-2 rounded-md transition-all ${
              activeTab === 'domestic'
                ? 'bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] font-medium'
                : 'hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Berita Terkini Dalam Negeri</span>
          </button>
          <button
           onClick={() => setActiveTab('international')}
            className={`flex-1 py-3 flex justify-center items-center gap-2 rounded-md transition-all ${
              activeTab === 'international'
                ? 'bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] font-medium'
                : 'hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Berita Terkini Mancanegara</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 pb-32 data-scroll-section">
        {activeTab === 'domestic' ? (
          <>
            {/* Search Bar and Filters for Domestic News */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center bg-white dark:bg-[#0a1a16] border-2 border-[#72e4f8] dark:border-[#07798d] rounded-full p-2 px-4 focus-within:border-[#1ff498] dark:focus-within:border-[#0be084] transition-all">
                    <Search className="w-5 h-5 text-[#01130c]/50 dark:text-[#ecfef7]/50" />
                    <input
                      type="text"
                      placeholder="Cari berita kesehatan dalam negeri..."
                      className="flex-1 bg-transparent border-none outline-none px-3 py-1 text-[#01130c] dark:text-[#ecfef7]"
                      value={searchTermDomestic}
                      onChange={(e) => setSearchTermDomestic(e.target.value)}
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleDomesticRefresh}
                  disabled={isRefreshingDomestic}
                  className={`flex items-center justify-center px-4 py-2 rounded-full bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] font-medium transition-all 
                    ${isRefreshingDomestic ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1ff498]/80 dark:hover:bg-[#0be084]/80'}`}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshingDomestic ? 'animate-spin' : ''}`} />
                  {isRefreshingDomestic ? 'Memuat...' : 'Refresh'}
                </button>
              </div>
              
              {/* Category Filters for Domestic News */}
              {categoriesDomestic.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70 mr-2">
                    <Tag className="w-4 h-4 mr-1" />
                    <span>Filter:</span>
                  </div>
                  {categoriesDomestic.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleDomesticCategorySelect(category)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        selectedCategoryDomestic === category 
                          ? "bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907]" 
                          : "bg-white dark:bg-[#0a1a16] text-[#01130c] dark:text-[#ecfef7] border border-[#72e4f8] dark:border-[#07798d] hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                  {selectedCategoryDomestic && (
                    <button
                      onClick={() => setSelectedCategoryDomestic(null)}
                      className="text-xs px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 transition-all"
                    >
                      Reset Filter <X className="w-3 h-3 inline-block ml-1" />
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Domestic News Content */}
            {loadingDomestic ? (
              <LoadingState isInternational={false} />
            ) : errorDomestic ? (
              <ErrorState message={errorDomestic} isInternational={false} />
            ) : currentDomesticNews.length === 0 ? (
              <EmptyState searchTerm={searchTermDomestic} isInternational={false} />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentDomesticNews.map((newsItem, index) => (
                    <div key={index} className="data-scroll data-scroll-speed='0.2'">
                      <NewsCard 
                        newsItem={newsItem} 
                        onClick={() => openModal(newsItem)} 
                      />
                    </div>
                  ))}
                </div>
                
                {/* Results summary for Domestic News */}
                <div className="mt-8 text-center text-sm text-[#01130c]/60 dark:text-[#ecfef7]/60">
                  Menampilkan {indexOfFirstDomesticNews + 1}-{Math.min(indexOfLastDomesticNews, filteredDomesticNews.length)} dari {filteredDomesticNews.length} berita 
                  {searchTermDomestic && ` untuk pencarian "${searchTermDomestic}"`}
                  {selectedCategoryDomestic && ` dalam kategori "${selectedCategoryDomestic}"`}
                </div>
                
                {/* Pagination for Domestic News */}
                {totalDomesticPages > 1 && (
                  <Pagination 
                    currentPage={currentPageDomestic} 
                    totalPages={totalDomesticPages} 
                    onPageChange={handleDomesticPageChange} 
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* Search Bar and Filters for International News */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center bg-white dark:bg-[#0a1a16] border-2 border-[#72e4f8] dark:border-[#07798d] rounded-full p-2 px-4 focus-within:border-[#1ff498] dark:focus-within:border-[#0be084] transition-all">
                    <Search className="w-5 h-5 text-[#01130c]/50 dark:text-[#ecfef7]/50" />
                    <input
                      type="text"
                      placeholder="Cari berita kesehatan mancanegera..."
                      className="flex-1 bg-transparent border-none outline-none px-3 py-1 text-[#01130c] dark:text-[#ecfef7]"
                      value={searchTermInternational}
                      onChange={(e) => setSearchTermInternational(e.target.value)}
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleInternationalRefresh}
                  disabled={isRefreshingInternational}
                  className={`flex items-center justify-center px-4 py-2 rounded-full bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907] font-medium transition-all 
                    ${isRefreshingInternational ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1ff498]/80 dark:hover:bg-[#0be084]/80'}`}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshingInternational ? 'animate-spin' : ''}`} />
                  {isRefreshingInternational ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              
              {/* Category Filters for International News */}
              {categoriesInternational.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-[#01130c]/70 dark:text-[#ecfef7]/70 mr-2">
                    <Tag className="w-4 h-4 mr-1" />
                    <span>Filter:</span>
                  </div>
                  {categoriesInternational.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleInternationalCategorySelect(category)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        selectedCategoryInternational === category 
                          ? "bg-[#1ff498] dark:bg-[#0be084] text-[#01130c] dark:text-[#010907]" 
                          : "bg-white dark:bg-[#0a1a16] text-[#01130c] dark:text-[#ecfef7] border border-[#72e4f8] dark:border-[#07798d] hover:bg-[#1ff498]/10 dark:hover:bg-[#0be084]/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                  {selectedCategoryInternational && (
                    <button
                      onClick={() => setSelectedCategoryInternational(null)}
                      className="text-xs px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 transition-all"
                    >
                      Reset Filter <X className="w-3 h-3 inline-block ml-1" />
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* International News Content */}
            {loadingInternational ? (
              <LoadingState isInternational={true} />
            ) : errorInternational ? (
              <ErrorState message={errorInternational} isInternational={true} />
            ) : currentInternationalNews.length === 0 ? (
              <EmptyState searchTerm={searchTermInternational} isInternational={true} />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentInternationalNews.map((newsItem, index) => (
                    <div key={index} className="data-scroll data-scroll-speed='0.2'">
                      <NewsCard 
                        newsItem={newsItem} 
                        onClick={() => openModal(newsItem)} 
                      />
                    </div>
                  ))}
                </div>
                
                {/* Results summary for International News */}
                <div className="mt-8 text-center text-sm text-[#01130c]/60 dark:text-[#ecfef7]/60">
                  Showing {indexOfFirstInternationalNews + 1}-{Math.min(indexOfLastInternationalNews, filteredInternationalNews.length)} of {filteredInternationalNews.length} news items
                  {searchTermInternational && ` for search "${searchTermInternational}"`}
                  {selectedCategoryInternational && ` in category "${selectedCategoryInternational}"`}
                </div>
                
                {/* Pagination for International News */}
                {totalInternationalPages > 1 && (
                  <Pagination 
                    currentPage={currentPageInternational} 
                    totalPages={totalInternationalPages} 
                    onPageChange={handleInternationalPageChange} 
                  />
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* News Detail Modal */}
      {isModalOpen && selectedNews && (
        <NewsModal newsItem={selectedNews} onClose={closeModal} />
      )}
      
      {/* Footer Wave */}
      <div className="relative h-32 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 w-full h-full"
        >
          <path
            fill="#1ff498"
            fillOpacity="0.1"
            d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
          />
          <path
            fill="#1ff498"
            fillOpacity="0.2"
            d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9-9.42,98.6-31.56,31.77-25.39,62.32-62,103.63-73,40.44-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28-22.88,168.9-38.84,30.2-8.66,59-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
          />
          <path
            fill="#1ff498"
            fillOpacity="0.3"
            d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default DailyPage;
