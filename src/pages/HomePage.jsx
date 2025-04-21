import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, Brain, Leaf, Users, Briefcase, Star, ShieldCheck, Award, TrendingUp } from "lucide-react";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
      
      // Simple section tracking for animations
      const sections = document.querySelectorAll('.animate-section');
      const currentPosition = window.pageYOffset + window.innerHeight * 0.7;
      
      sections.forEach((section, index) => {
        if (section.offsetTop <= currentPosition && 
            section.offsetTop + section.offsetHeight > currentPosition) {
          section.classList.add('animate-active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen text-[#01130c] bg-[#f6fefc]" id="content">
      {/* Hero Section with Dynamic Animation */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#72e4f8]/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1ff498]/10 rounded-full translate-x-1/4 translate-y-1/4 animate-float"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-[#50b7f7]/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#1ff498]/10 rounded-full animate-float-delayed opacity-70"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 animate-fade-in">
            <div className="inline-block bg-[#1ff498]/20 text-[#01130c] px-4 py-1 rounded-full mb-4 animate-slide-up">
              <span className="flex items-center text-sm font-medium">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Aplikasi Kesehatan Terpercaya
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-title">
              Pilar Kuat untuk <span className="text-[#1ff498] animate-highlight">Hidup Sehat</span> Anda
            </h1>
            <p className="text-lg mb-8 text-[#01130c]/80 max-w-xl animate-fade-in-delayed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum et facilisis magna.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-delayed-2">
              <Link to="/about" className="bg-[#1ff498] hover:bg-[#1ff498]/80 text-[#01130c] font-medium px-6 py-3 rounded-lg transition-all shadow-lg shadow-[#1ff498]/30 hover:scale-105">
                Pelajari Lebih Lanjut
              </Link>
              <Link to="/forum" className="bg-[#f6fefc] border-2 border-[#72e4f8] hover:border-[#1ff498] text-[#01130c] font-medium px-6 py-3 rounded-lg transition-all hover:scale-105">
                Bergabung dengan Komunitas
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end animate-fade-in-delayed">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#72e4f8] rounded-lg rotate-6 animate-float-slow"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#1ff498] rounded-lg -rotate-6 animate-float"></div>
              <div className="relative z-10 bg-[#f6fefc] p-2 rounded-xl shadow-xl">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-[#01130c]/10 rounded-lg flex items-center justify-center animate-pulse-slow">
                  <div className="text-center p-6">
                    <Award className="w-16 h-16 text-[#1ff498] mx-auto mb-4 animate-pulse" />
                    <p className="font-bold text-lg mb-2">Pillar Sehat</p>
                    <p className="text-[#01130c]/70 text-sm">Solusi kesehatan terlengkap untuk keluarga Anda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#72e4f8" fillOpacity=".1"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#1ff498" fillOpacity=".1"></path>
          </svg>
        </div>
      </section>

      {/* Enhanced Trust Banner */}
      <section className="bg-[#72e4f8]/10 py-8 border-y border-[#72e4f8]/30 animate-section transform transition-all duration-700">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center hover:scale-105 transition-transform">
              <ShieldCheck className="w-8 h-8 text-[#1ff498] mr-3" />
              <div>
                <p className="font-bold">100% Aman</p>
                <p className="text-sm text-[#01130c]/70">Perlindungan data</p>
              </div>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform">
              <Users className="w-8 h-8 text-[#1ff498] mr-3" />
              <div>
                <p className="font-bold">5000+</p>
                <p className="text-sm text-[#01130c]/70">Pengguna aktif</p>
              </div>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform">
              <Award className="w-8 h-8 text-[#1ff498] mr-3" />
              <div>
                <p className="font-bold">Bersertifikat</p>
                <p className="text-sm text-[#01130c]/70">Diakui ahli kesehatan</p>
              </div>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform">
              <TrendingUp className="w-8 h-8 text-[#1ff498] mr-3" />
              <div>
                <p className="font-bold">93%</p>
                <p className="text-sm text-[#01130c]/70">Tingkat kepuasan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Navigation Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto animate-section transform transition-all duration-700">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#1ff498]/20 text-[#01130c] px-4 py-1 rounded-full mb-4">
            <span className="text-sm font-medium">Fitur Utama</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Jelajahi Dimensi Kesehatan Kami</h2>
          <p className="text-[#01130c]/70 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Physical Health - with hover animation */}
          <Link to="/features/physical-health" className="group feature-card" style={{transitionDelay: "100ms"}}>
            <div className="bg-[#f6fefc] border-2 border-[#72e4f8] hover:border-[#1ff498] p-6 rounded-xl transition-all duration-300 hover:shadow-lg h-full flex flex-col transform hover:-translate-y-2">
              <div className="bg-[#72e4f8]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 transition-colors">
                <Heart className="text-[#1ff498] w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kesehatan Fisik</h3>
              <p className="text-[#01130c]/80 mb-4 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
              </p>
              <div className="flex items-center text-[#1ff498] font-medium group-hover:translate-x-2 transition-transform">
                Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>

          {/* Mental Health */}
          <Link to="/features/mental-health-emotions" className="group feature-card" style={{transitionDelay: "200ms"}}>
            <div className="bg-[#f6fefc] border-2 border-[#72e4f8] hover:border-[#1ff498] p-6 rounded-xl transition-all duration-300 hover:shadow-lg h-full flex flex-col transform hover:-translate-y-2">
              <div className="bg-[#72e4f8]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 transition-colors">
                <Brain className="text-[#1ff498] w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kesehatan Mental & Emosi</h3>
              <p className="text-[#01130c]/80 mb-4 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
              </p>
              <div className="flex items-center text-[#1ff498] font-medium group-hover:translate-x-2 transition-transform">
                Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>

          {/* Environmental Health */}
          <Link to="/features/environmental-health" className="group feature-card" style={{transitionDelay: "300ms"}}>
            <div className="bg-[#f6fefc] border-2 border-[#72e4f8] hover:border-[#1ff498] p-6 rounded-xl transition-all duration-300 hover:shadow-lg h-full flex flex-col transform hover:-translate-y-2">
              <div className="bg-[#72e4f8]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 transition-colors">
                <Leaf className="text-[#1ff498] w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kesehatan Lingkungan</h3>
              <p className="text-[#01130c]/80 mb-4 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
              </p>
              <div className="flex items-center text-[#1ff498] font-medium group-hover:translate-x-2 transition-transform">
                Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>

          {/* Social Connections */}
          <Link to="/features/social-connections" className="group feature-card" style={{transitionDelay: "400ms"}}>
            <div className="bg-[#f6fefc] border-2 border-[#72e4f8] hover:border-[#1ff498] p-6 rounded-xl transition-all duration-300 hover:shadow-lg h-full flex flex-col transform hover:-translate-y-2">
              <div className="bg-[#72e4f8]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 transition-colors">
                <Users className="text-[#1ff498] w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3">Koneksi Sosial</h3>
              <p className="text-[#01130c]/80 mb-4 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
              </p>
              <div className="flex items-center text-[#1ff498] font-medium group-hover:translate-x-2 transition-transform">
                Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>

          {/* Financial Occupational Wellbeing */}
          <Link to="/about/financial-occupational-wellbeing" className="group feature-card" style={{transitionDelay: "500ms"}}>
            <div className="bg-[#f6fefc] border-2 border-[#72e4f8] hover:border-[#1ff498] p-6 rounded-xl transition-all duration-300 hover:shadow-lg h-full flex flex-col transform hover:-translate-y-2">
              <div className="bg-[#72e4f8]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-[#1ff498]/20 transition-colors">
                <Briefcase className="text-[#1ff498] w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kesejahteraan Finansial & Pekerjaan</h3>
              <p className="text-[#01130c]/80 mb-4 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
              </p>
              <div className="flex items-center text-[#1ff498] font-medium group-hover:translate-x-2 transition-transform">
                Selengkapnya <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>

          {/* Forum Link */}
          <Link to="/forum" className="group feature-card" style={{transitionDelay: "600ms"}}>
            <div className="bg-[#1ff498]/10 border-2 border-[#1ff498] p-6 rounded-xl transition-all duration-300 hover:shadow-lg h-full flex flex-col transform hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-3">Forum Komunitas</h3>
              <p className="text-[#01130c]/80 mb-4 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
              </p>
              <div className="flex items-center text-[#1ff498] font-medium group-hover:translate-x-2 transition-transform">
                Bergabung Sekarang <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Enhanced Banner Section */}
      <section className="relative py-12 px-4 md:px-8 lg:px-16 overflow-hidden animate-section transform transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1ff498]/20 to-[#72e4f8]/30 -skew-y-3 transform transition-all hover:skew-y-0 duration-700"></div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Pillar Sehat?</h2>
            <p className="text-[#01130c]/80 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start hover:translate-x-2 transition-transform">
                <div className="bg-[#1ff498] rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#f6fefc]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </li>
              <li className="flex items-start hover:translate-x-2 transition-transform">
                <div className="bg-[#1ff498] rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#f6fefc]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Nullam quis risus eget urna mollis ornare vel eu leo</p>
              </li>
              <li className="flex items-start hover:translate-x-2 transition-transform">
                <div className="bg-[#1ff498] rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#f6fefc]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Donec ullamcorper nulla non metus auctor fringilla</p>
              </li>
            </ul>
          </div>
          <div className="md:w-5/12 relative transform transition-all hover:scale-105 duration-300">
            <div className="absolute -top-6 -left-6 w-full h-full bg-[#50b7f7]/20 rounded-lg animate-float-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#1ff498]/20 rounded-lg animate-float"></div>
            <div className="relative bg-[#f6fefc] p-6 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-[#01130c]/10 rounded mb-4 overflow-hidden">
                <div className="flex items-center justify-center h-full hover:bg-[#01130c]/20 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1ff498] hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Lihat Bagaimana Pillar Sehat Bekerja</h3>
              <p className="text-[#01130c]/70 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="bg-[#72e4f8]/20 py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden animate-section transform transition-all duration-700">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#1ff498]/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1ff498]/20 rounded-full translate-x-1/2 translate-y-1/2 animate-float"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Mulai Perjalanan Kesehatan Anda Sekarang</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
          <Link to="/contact" className="bg-[#50b7f7] hover:bg-[#50b7f7]/80 text-[#f6fefc] font-medium px-8 py-3 rounded-lg inline-block transition-all shadow-lg shadow-[#50b7f7]/30 hover:scale-105 animate-pulse-slow">
            Hubungi Kami
          </Link>
        </div>
      </section>

      {/* Back to Top Button - appears when scrolling */}
      <button 
        className={`fixed bottom-6 right-6 bg-[#72e4f8]/80 text-[#01130c] w-12 h-12 rounded-full flex items-center justify-center shadow-md z-40 transition-all duration-300 ${isVisible ? 'opacity-80 hover:opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes float-delayed {
          0%, 30% { transform: translateY(0px); }
          65% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes highlight {
          0%, 100% { color: #1ff498; }
          50% { color: #50b7f7; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-highlight {
          animation: highlight 5s ease-in-out infinite;
        }
        
        .animate-title span {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .animate-title:hover span {
          transform: scale(1.05);
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
        
           .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.5s;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
      </div>
  )
}

export default HomePage