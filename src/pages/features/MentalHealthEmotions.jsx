import React, { useState, useEffect, useRef } from 'react';
import { Brain, Play, Pause, Ban, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ReactHowler from 'react-howler';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GEMINI_API_KEY = import.meta.env.VITE_URL;
const NINJAS_API_KEY = import.meta.env.VITE_QUOTES;

const meditationThemes = [
  { id: 'alam', name: 'Suara Alam', sound: '/sounds/alam.mp3' },
  { id: 'frekuensi', name: 'Frekuensi Khusus', sound: '/sounds/frekuensi.mp3' },
  { id: 'mangkuk', name: 'Suara Mangkuk Tibet', sound: '/sounds/mangkuk.mp3' },
  { id: 'instrumental', name: 'Musik Instrumental', sound: '/sounds/instrumental.mp3' },
  { id: 'mantra', name: 'Mantra / Om Chanting', sound: '/sounds/mantra.mp3' },
];

const meditationDurations = [
  { value: 120, label: '2 Menit' },
  { value: 300, label: '5 Menit' },
  { value: 600, label: '10 Menit' },
  { value: 900, label: '15 Menit' },
  { value: 1800, label: '30 Menit' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const LoadingState = () => (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500 mx-auto mb-3"></div>
    <p className="text-gray-600 dark:text-gray-400">Memuat...</p>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="text-center py-8">
    <p className="text-red-500 dark:text-red-400 mb-3">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-2 px-6 rounded-md"
    >
      Muat Ulang
    </button>
  </div>
);

function MentalHealthEmotions() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [finalEmotionScores, setFinalEmotionScores] = useState({
    ceria: 0,
    tenang: 0,
    marah: 0,
    cemas: 0,
    sedih: 0,
  });
  const [emotionCategories, setEmotionCategories] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiAnalysisButton, setShowAiAnalysisButton] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [quotesError, setQuotesError] = useState(null);
  const [aiRoast, setAiRoast] = useState(null);
  const [isAiRoastLoading, setIsAiRoastLoading] = useState(false);
  const [showAiRoastButton, setShowAiRoastButton] = useState(false);

  // State untuk fitur meditasi
  const [isMeditating, setIsMeditating] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(meditationThemes[0]);
  const [duration, setDuration] = useState(meditationDurations[1].value);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const soundPlayer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/questions.json');
        if (!response.ok) {
          throw new Error('Gagal memuat data kuesioner');
        }
        const data = await response.json();
        setQuizData(data.questions);
        setEmotionCategories(data.emotionCategories);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data kuesioner. Silakan coba lagi nanti.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      setQuotesLoading(true);
      setQuotesError(null);
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
          headers: {
            'X-Api-Key': NINJAS_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`Gagal memuat kutipan: ${response.status}`);
        }
        const data = await response.json();
        setQuotes(data.sort(() => Math.random() - 0.5).slice(0, 3));
        setQuotesLoading(false);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setQuotesError('Gagal memuat kutipan.');
        setQuotesLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    let intervalId;
    if (isMeditating && isPlaying && timeLeft > 0) {
      intervalId = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
    } else if (timeLeft === 0 && isMeditating) {
      setIsPlaying(false);
      setIsFinished(true);
      setIsMeditating(false);
      // Anda bisa menambahkan logika setelah meditasi selesai di sini jika perlu
    }
    return () => clearInterval(intervalId);
  }, [isMeditating, isPlaying, timeLeft]);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setIsMeditating(false); // Pastikan meditasi berhenti saat kuis dimulai
    setIsPlaying(false);
  };

  const handleOptionSelect = (option) => {
    if (!quizData || !quizData[currentQuestionIndex]) return;

    const currentQuestion = quizData[currentQuestionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option,
    });

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
        setShowAiAnalysisButton(true);
        setShowAiRoastButton(true);
      }
    }, 300);
  };

  useEffect(() => {
    if (showResults && quizData) {
      const calculatedScores = {
        ceria: 0,
        tenang: 0,
        marah: 0,
        cemas: 0,
        sedih: 0,
      };
      Object.values(selectedAnswers).forEach(answer => {
        Object.entries(answer.points).forEach(([emotion, point]) => {
          calculatedScores[emotion] += point;
        });
      });
      setFinalEmotionScores(calculatedScores);
    }
  }, [showResults, selectedAnswers, quizData]);

  const fetchAIAnalysis = async (scores) => {
    setIsAiLoading(true);
    setShowAiAnalysisButton(false);
    try {
      const prompt = `Analisis kondisi emosional berdasarkan skor berikut:
        Keceriaan: ${scores.ceria}/100
        Ketenangan: ${scores.tenang}/100
        Kemarahan: ${scores.marah}/100
        Kecemasan: ${scores.cemas}/100
        Kesedihan: ${scores.sedih}/100

        Berikan analisis mendalam tentang kondisi emosional, serta berikan saran dan rekomendasi yang dapat membantu meningkatkan kesejahteraan mental. Jawaban dalam Bahasa Indonesia.`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        console.error('AI API Error:', errorBody);
        throw new Error(`Gagal mendapatkan analisis AI: ${errorBody.error?.message || res.statusText}`);
      }

      const data = await res.json();
      if (data.candidates?.[0]?.content?.parts?.[0]) {
        setAiAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Format respons AI tidak valid');
      }
    } catch (err) {
      console.error('Error fetching AI analysis:', err);
      setError(`Analisis AI gagal: ${err.message}`);
      setAiAnalysis(null);
    } finally {
      setIsAiLoading(false);
    }
  };

  const fetchAIRoast = async (scores) => {
    setIsAiRoastLoading(true);
    setShowAiRoastButton(false);
    try {
      const prompt = `Berdasarkan skor emosi berikut:
        Keceriaan: ${scores.ceria}/100
        Ketenangan: ${scores.tenang}/100
        Kemarahan: ${scores.marah}/100
        Kecemasan: ${scores.cemas}/100
        Kesedihan: ${scores.sedih}/100

        Berikan roasting singkat dan lucu (tapi jangan terlalu kasar atau menyakitkan) tentang kondisi emosional orang ini. Gunakan Bahasa Indonesia.`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        console.error('AI Roast API Error:', errorBody);
        throw new Error(`Gagal mendapatkan roasting AI: ${errorBody.error?.message || res.statusText}`);
      }

      const data = await res.json();
      if (data.candidates?.[0]?.content?.parts?.[0]) {
        setAiRoast(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Format respons roasting AI tidak valid');
      }
    } catch (err) {
      console.error('Error fetching AI roast:', err);
      setError(`Roasting AI gagal: ${err.message}`);
      setAiRoast(null);
    } finally {
      setIsAiRoastLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(-1);
    setSelectedAnswers({});
    setShowResults(false);
    setFinalEmotionScores({
      ceria: 0,
      tenang: 0,
      marah: 0,
      cemas: 0,
      sedih: 0,
    });
    setAiAnalysis(null);
    setIsAiLoading(false);
    setShowAiAnalysisButton(false);
    setAiRoast(null);
    setIsAiRoastLoading(false);
    setShowAiRoastButton(false);
    setIsMeditating(false);
    setIsPlaying(false);
  };

  // Fungsi-fungsi untuk fitur meditasi
  const startMeditation = () => {
    setIsMeditating(true);
    setIsPlaying(true);
    setTimeLeft(duration);
    setIsFinished(false);
    setCurrentQuestionIndex(-2); // Status khusus untuk meditasi
    setShowResults(false);
  };

  const pauseMeditation = () => setIsPlaying(false);
  const resumeMeditation = () => setIsPlaying(true);
  const endMeditation = () => {
    setIsMeditating(false);
    setIsPlaying(false);
    setTimeLeft(duration);
    setIsFinished(true);
    setCurrentQuestionIndex(-1); // Kembali ke status awal kuis
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const renderMeditation = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] rounded-lg shadow-lg p-8 max-w-xl mx-auto mt-10 text-center"
    >
      <h2 className="text-3xl font-bold mb-6">Sesi Meditasi</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Pilih tema dan durasi untuk memulai sesi meditasi Anda.
      </p>
      <div className="mb-4">
        <label htmlFor="theme" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Pilih Tema:
        </label>
        <select
          id="theme"
          value={selectedTheme.id}
          onChange={(e) => setSelectedTheme(meditationThemes.find(t => t.id === e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        >
          {meditationThemes.map(theme => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="duration" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Pilih Durasi:
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        >
          {meditationDurations.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      <div className="timer text-2xl font-semibold mb-4">
        <Clock className="inline-block mr-2 align-middle" /> {formatTime(timeLeft)}
      </div>
      <div className="controls flex justify-center space-x-4 mb-6">
        {isPlaying ? (
          <motion.button onClick={pauseMeditation} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            <Pause className="inline-block align-middle" /> Pause
          </motion.button>
        ) : (
          <motion.button onClick={resumeMeditation} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            <Play className="inline-block align-middle" /> Lanjutkan
          </motion.button>
        )}
        <motion.button onClick={endMeditation} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
          <Ban className="inline-block align-middle" /> Akhiri
        </motion.button>
      </div>
      <ReactHowler src={selectedTheme.sound} playing={isPlaying && isMeditating} loop={true} ref={soundPlayer} />
      {isFinished && (
        <div className="finished-message mt-6 text-gray-600 dark:text-gray-400">
          Sesi meditasi selesai.
        </div>
      )}
      <motion.button onClick={() => setCurrentQuestionIndex(-1)} className="bg-gradient-to-r from-[#50b7f7] to-[#1ff498] hover:from-[#1ff498] hover:to-[#50b7f7] text-[#01130c] font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-[#50b7f7]/30 mt-4">
        Kembali ke Kuesioner
      </motion.button>
    </motion.div>
  );

  const renderResults = () => {
    const dominantEmotion = Object.entries(finalEmotionScores).reduce(
      (max, [emotion, score]) => (score > max.score ? { emotion, score } : max),
      { emotion: 'none', score: -1 }
    ).emotion;

    const getEmotionCategory = (emotion, score) => {
      const percentage = (score / 100) * 100;
      return percentage < 33 ? 'low' : percentage < 66 ? 'medium' : 'high';
    };

    const emotionData = Object.keys(finalEmotionScores).map(emotion => ({
      emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      score: Math.min(finalEmotionScores[emotion], 100), // Batasi skor untuk chart
    }));

    const chartData = {
      labels: emotionData.map(data => data.emotion),
      datasets: [
        {
          label: 'Skor Emosi',
          data: emotionData.map(data => data.score),
          backgroundColor: [
            'rgba(255, 206, 86, 0.8)', // Ceria (Kuning)
            'rgba(75, 192, 192, 0.8)', // Tenang (Hijau)
            'rgba(255, 99, 132, 0.8)', // Marah (Merah)
            'rgba(153, 102, 255, 0.8)', // Cemas (Ungu)
            'rgba(54, 162, 235, 0.8)', // Sedih (Biru)
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Skor Emosi Anda',
          font: {
            size: 16,
          },
          color: '#01130c',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100, // Tetapkan nilai maksimum chart menjadi 100
          ticks: {
            color: '#01130c',
          },
        },
        x: {
          ticks: {
            color: '#01130c',
          },
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] rounded-lg shadow-lg p-8 max-w-3xl mx-auto mt-10"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          <Brain className="inline-block mr-2 mb-1 text-[#1ff498] dark:text-[#0be084]" />
          Hasil Penilaian Emosi
        </h2>

        <motion.div variants={itemVariants} className="mb-8 p-6 bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg border border-[#c1f9ed] dark:border-[#07798d]">
          <h3 className="text-xl font-semibold text-[#0be084] dark:text-[#1ff498] mb-4">
            Emosi Dominan:&nbsp;
            <span className="ml-2 px-3 py-1 bg-[#8ef2e0]/50 dark:bg-[#0b798d]/50 text-[#01130c] dark:text-[#ecfef7] rounded-full">
              {dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1)}
            </span>
          </h3>
          {emotionCategories[dominantEmotion] && (
            <p className="text-[#01130c]/80 dark:text-[#ecfef7]/80 text-lg">
              {emotionCategories[dominantEmotion][getEmotionCategory(dominantEmotion, finalEmotionScores[dominantEmotion])]}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <Bar data={chartData} options={chartOptions} />
        </motion.div>

        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Interpretasi Skor Emosi
          </h3>
          {Object.entries(finalEmotionScores).map(([emotion, score]) => {
            const category = getEmotionCategory(emotion, score);
            return (
              <motion.div key={emotion} variants={itemVariants} className="mb-4 p-4 bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg border border-[#c1f9ed] dark:border-[#07798d]">
                <h4 className="font-semibold text-[#0be084] dark:text-[#1ff498] mb-2">
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)} ({Math.min(score, 100)}/100)
                </h4>
                {emotionCategories[emotion] && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {emotionCategories[emotion][category]}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {showAiAnalysisButton && (
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <button
              onClick={() => fetchAIAnalysis(finalEmotionScores)}
              className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] hover:from-[#50b7f7] hover:to-[#1ff498] text-[#01130c] font-medium py-3 px-8 rounded-full transition-colors duration-300 disabled:opacity-50"
              disabled={isAiLoading}
            >
              {isAiLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Menganalisis...
                </div>
              ) : (
                'Analisis Lebih Lanjut'
              )}
            </button>
          </motion.div>
        )}

        {showAiRoastButton && (
          <motion.div variants={itemVariants} className="mt-4 text-center">
            <button
              onClick={() => fetchAIRoast(finalEmotionScores)}
              className="bg-[#ff6b6b] hover:bg-[#e04f4f] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 disabled:opacity-50"
              disabled={isAiRoastLoading}
            >
              {isAiRoastLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Me-roasting...
                </div>
              ) : (
                'Isengin AI (Roast Me!)'
              )}
            </button>
          </motion.div>
        )}

        {isAiLoading && !aiAnalysis && !error && (
          <motion.div variants={itemVariants} className="mt-8 p-6 bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg text-center">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-[#1ff498] mr-3"></div>
              <span className="text-gray-600 dark:text-gray-400">Menganalisis hasil...</span>
            </div>
          </motion.div>
        )}

        {aiAnalysis && (
          <motion.div variants={itemVariants} className="mt-8 p-6 bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg border border-[#c1f9ed] dark:border-[#07798d]">
            <h3 className="text-xl font-semibold text-[#0be084] dark:text-[#1ff498] mb-4">Analisis AI</h3>
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
              <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
            </div>
          </motion.div>
        )}

        {isAiRoastLoading && !aiRoast && !error && (
          <motion.div variants={itemVariants} className="mt-4 p-6 bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg text-center">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-[#ff6b6b] mr-3"></div>
              <span className="text-gray-600 dark:text-gray-400">Memproses roasting...</span>
            </div>
          </motion.div>
        )}

        {aiRoast && (
          <motion.div variants={itemVariants} className="mt-4 p-6 bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg border border-[#c1f9ed] dark:border-[#07798d]">
            <h3 className="text-xl font-semibold text-[#ff6b6b] mb-4">AI Roasting</h3>
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
              <ReactMarkdown>{aiRoast}</ReactMarkdown>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] hover:from-[#50b7f7] hover:to-[#1ff498] text-[#01130c] font-medium py-3 px-8 rounded-full transition-colors duration-300"
          >
            Coba Lagi
          </button>
        </motion.div>
      </motion.div>
    );
  };

  const renderQuestion = () => {
    if (!quizData || !quizData[currentQuestionIndex]) return null;

    const currentQuestion = quizData[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] rounded-lg shadow-lg p-8 max-w-2xl mx-auto mt-10"
      >
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span>
              Pertanyaan {currentQuestionIndex + 1} dari {quizData.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => handleOptionSelect(option)}
              className="w-full text-left p-4 border border-[#72e4f8] dark:border-[#07798d] rounded-lg hover:bg-[#e3fdf7] dark:hover:bg-[#0a1a16] hover:border-[#1ff498] dark:hover:border-[#0be084] transition-colors duration-200 shadow-sm"
            >
              {option.text}
            </motion.button>
          ))}
        </div>

        {!quotesLoading && !quotesError && quotes.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((quoteItem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg shadow-md p-4 text-center border border-[#c1f9ed] dark:border-[#07798d]"
              >
                <p className="text-sm italic text-gray-700 dark:text-gray-300">"{quoteItem.quote}"</p>
                {quoteItem.author && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">- {quoteItem.author}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
        {quotesLoading && (
          <div className="mt-10 text-center text-gray-500 dark:text-gray-400">Memuat kutipan...</div>
        )}
        {quotesError && (
          <div className="mt-10 text-center text-red-500 dark:text-red-400">{quotesError}</div>
        )}
      </motion.div>
    );
  };

  const renderStartQuiz = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] rounded-lg shadow-lg p-8 max-w-xl mx-auto mt-10 text-center"
    >
      <h2 className="text-3xl font-bold mb-6">Siap Menguji Emosimu?</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Tekan tombol di bawah untuk memulai kuesioner dan mendapatkan wawasan tentang kondisi emosional Anda saat ini.
      </p>
      <motion.button
        onClick={startQuiz}
        className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] hover:from-[#50b7f7] hover:to-[#1ff498] text-[#01130c] font-semibold py-4 px-10 rounded-full transition-colors duration-300 shadow-md hover:shadow-[#1ff498]/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Mulai Kuesioner
      </motion.button>
      <motion.button
        onClick={startMeditation}
        className="mt-4 bg-gradient-to-r from-[#a78bfa] to-[#818cf8] hover:from-[#818cf8] hover:to-[#a78bfa] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-[#a78bfa]/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Mulai Meditasi
      </motion.button>
      {!quotesLoading && !quotesError && quotes.length > 0 && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quoteItem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#e3fdf7] dark:bg-[#0a1a16] rounded-lg shadow-md p-4 text-center border border-[#c1f9ed] dark:border-[#07798d]"
            >
              <p className="text-sm italic text-gray-700 dark:text-gray-300">"{quoteItem.quote}"</p>
              {quoteItem.author && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">- {quoteItem.author}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
      {quotesLoading && (
        <div className="mt-10 text-center text-gray-500 dark:text-gray-400">Memuat kutipan...</div>
      )}
      {quotesError && (
        <div className="mt-10 text-center text-red-500 dark:text-red-400">{quotesError}</div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7] min-h-screen py-12 px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={staggerVariants}
    >
      <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#0be084] dark:text-[#1ff498] mb-3">
          <Brain className="inline-block mr-2 mb-1 text-[#50b7f7] dark:text-[#72e4f8]" />
          Kenali Emosimu Lebih Baik
        </h1>
        <p className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-xl mx-auto">
          Jawab pertanyaan-pertanyaan berikut untuk mendapatkan pemahaman yang lebih dalam tentang kondisi emosional Anda saat ini. Atau, coba sesi meditasi singkat untuk menenangkan pikiran.
        </p>
      </motion.div>

      {currentQuestionIndex === -2 ? renderMeditation() : currentQuestionIndex === -1 ? renderStartQuiz() : showResults ? renderResults() : renderQuestion()}
    </motion.div>
  );
}

export default MentalHealthEmotions;