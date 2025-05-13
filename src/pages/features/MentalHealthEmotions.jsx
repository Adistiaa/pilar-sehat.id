import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const GEMINI_API_KEY = import.meta.env.VITE_URL; // Replace with your actual API key
const NINJAS_API_KEY = import.meta.env.VITE_QUOTES; // Ganti dengan API key Anda dari api-ninjas.com

function MentalHealthEmotions() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [emotionScores, setEmotionScores] = useState({
    ceria: 0,
    tenang: 0,
    marah: 0,
    cemas: 0,
    sedih: 0,
  });
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiAnalysisButton, setShowAiAnalysisButton] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [quotesError, setQuotesError] = useState(null);
  const [aiRoast, setAiRoast] = useState(null);
  const [isAiRoastLoading, setIsAiRoastLoading] = useState(false);
  const [showAiRoastButton, setShowAiRoastButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/data/questions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        setQuizData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz data. Please try again later.');
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
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', { // Ambil 3 quotes
          headers: {
            'X-Api-Key': NINJAS_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch quotes: ${response.status}`);
        }
        const data = await response.json();
        setQuotes(data);
        setQuotesLoading(false);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setQuotesError('Failed to load quotes.');
        setQuotesLoading(false);
      }
    };

    fetchQuotes();
  }, []); // Fetch quotes hanya sekali saat komponen mount

  const handleOptionSelect = (option) => {
    if (!quizData) return;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option,
    });

    const newScores = { ...emotionScores };
    Object.entries(option.points).forEach(([emotion, point]) => {
      newScores[emotion] += point;
    });
    setEmotionScores(newScores);

    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
        setShowAiAnalysisButton(true); // Show the AI analysis button after completing the quiz
        setShowAiRoastButton(true); // Show the AI roast button
      }
    }, 300);
  };

  const fetchAIAnalysis = async (scores) => {
    setIsAiLoading(true);
    setShowAiAnalysisButton(false); // Hide the button while loading
    try {
      const prompt = `Analisis kondisi emosional berdasarkan skor berikut:
        Keceriaan: ${scores.ceria}/30
        Ketenangan: ${scores.tenang}/30
        Kemarahan: ${scores.marah}/20
        Kecemasan: ${scores.cemas}/20
        Kesedihan: ${scores.sedih}/20

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
        throw new Error(`Failed to get AI analysis: ${errorBody.error?.message || res.statusText}`);
      }

      const data = await res.json();
      if (data.candidates?.[0]?.content?.parts?.[0]) {
        setAiAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Invalid AI response format');
      }
    } catch (err) {
      console.error('Error fetching AI analysis:', err);
      setError(`AI Analysis failed: ${err.message}`);
      setAiAnalysis(null);
    } finally {
      setIsAiLoading(false);
    }
  };

  const fetchAIRoast = async (scores) => {
    setIsAiRoastLoading(true);
    setShowAiRoastButton(false); // Hide the roast button while loading
    try {
      const prompt = `Berdasarkan skor emosi berikut:
        Keceriaan: ${scores.ceria}/30
        Ketenangan: ${scores.tenang}/30
        Kemarahan: ${scores.marah}/20
        Kecemasan: ${scores.cemas}/20
        Kesedihan: ${scores.sedih}/20

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
        throw new Error(`Failed to get AI roast: ${errorBody.error?.message || res.statusText}`);
      }

      const data = await res.json();
      if (data.candidates?.[0]?.content?.parts?.[0]) {
        setAiRoast(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Invalid AI roast response format');
      }
    } catch (err) {
      console.error('Error fetching AI roast:', err);
      setError(`AI Roast failed: ${err.message}`);
      setAiRoast(null);
    } finally {
      setIsAiRoastLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setEmotionScores({
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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Memuat kuesioner...</p>
        </div>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <p className="text-red-500 mb-4">{error || 'Something went wrong'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const renderResults = () => {
    const dominantEmotion = Object.entries(emotionScores).reduce(
      (max, [emotion, score]) => {
        const normalized = (score / (emotion === 'ceria' || emotion === 'tenang' ? 30 : 20)) * 100;
        return normalized > max.score ? { emotion, score: normalized } : max;
      },
      { emotion: 'none', score: 0 }
    ).emotion;

    const getEmotionCategory = (emotion, score) => {
      const maxScore = emotion === 'ceria' || emotion === 'tenang' ? 30 : 20;
      const percentage = (score / maxScore) * 100;
      return percentage < 33 ? 'low' : percentage < 66 ? 'medium' : 'high';
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
          <Brain className="inline-block mr-2 mb-1" />
          Hasil Penilaian Emosi Anda
        </h2>

        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-xl font-semibold mb-4">
            Emosi Dominan:&nbsp;
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              {dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1)}
            </span>
          </h3>

          <p className="text-gray-700 mb-2 text-lg">
            {quizData.emotionCategories[dominantEmotion][getEmotionCategory(dominantEmotion, emotionScores[dominantEmotion])]}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {Object.entries(emotionScores).map(([emotion, score]) => {
            const category = getEmotionCategory(emotion, score);
            const maxScore = emotion === 'ceria' || emotion === 'tenang' ? 30 : 20;
            const percentage = (score / maxScore) * 100;

            return (
              <div key={emotion} className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700">
                    {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">{score} poin</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ease-out ${
                      emotion === 'ceria'
                        ? 'bg-yellow-400'
                        : emotion === 'tenang'
                        ? 'bg-green-400'
                        : emotion === 'marah'
                        ? 'bg-red-400'
                        : emotion === 'cemas'
                        ? 'bg-purple-400'
                        : 'bg-blue-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {quizData.emotionCategories[emotion][category]}
                </p>
              </div>
            );
          })}
        </div>

        {showAiAnalysisButton && (
          <div className="mt-8 text-center">
            <button
              onClick={() => fetchAIAnalysis(emotionScores)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              disabled={isAiLoading}
            >
              {isAiLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Menganalisis...
                </div>
              ) : (
                'Dapatkan Analisis AI'
              )}
            </button>
          </div>
        )}

        {showAiRoastButton && (
          <div className="mt-4 text-center">
            <button
              onClick={() => fetchAIRoast(emotionScores)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              disabled={isAiRoastLoading}
            >
              {isAiRoastLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Me-roasting...
                </div>
              ) : (
                'Roast Me AI!'
              )}
            </button>
          </div>
        )}

        {isAiLoading && !aiAnalysis && !error && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Menganalisis hasil...</span>
            </div>
          </div>
        )}

        {aiAnalysis && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Analisis AI</h3>
            <div className="prose prose-blue max-w-none">
              <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
            </div>
          </div>
        )}

        {isAiRoastLoading && !aiRoast && !error && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              <span className="ml-3 text-gray-600">Memproses roasting...</span>
            </div>
          </div>
        )}

        {aiRoast && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">AI Roasting</h3>
            <div className="prose prose-red max-w-none">
              <ReactMarkdown>{aiRoast}</ReactMarkdown>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Mulai Lagi
          </button>
          </div>
      </div>
    );
  };

  const renderQuestion = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>
              Pertanyaan {currentQuestionIndex + 1} dari {quizData.questions.length}
            </span>
            <span>{Math.round(progress)}% selesai</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 hover:shadow-sm"
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Menampilkan 3 Kutipan dalam Bentuk Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {quotesLoading && (
            <div className="col-span-3 text-center text-gray-500">Memuat kutipan...</div>
          )}
          {quotesError && (
            <div className="col-span-3 text-center text-red-500">{quotesError}</div>
          )}
          {quotes.map((quoteItem, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 text-center">
              <p className="text-sm italic text-gray-700">"{quoteItem.quote}"</p>
              {quoteItem.author && <p className="text-xs text-gray-600 mt-2">- {quoteItem.author}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          <Brain className="inline-block mr-2 mb-1" />
          Penilaian Kesehatan Mental dan Emosi
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Jawab pertanyaan-pertanyaan berikut untuk mengevaluasi kondisi emosional Anda saat ini. Kuesioner ini
          membantu Anda memahami emosi dominan yang Anda rasakan.
        </p>
      </div>

      {showResults ? renderResults() : renderQuestion()}
    </div>
  );
}

export default MentalHealthEmotions;