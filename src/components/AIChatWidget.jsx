import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, StarsIcon, SendHorizonal } from 'lucide-react';

const AIChatWidget = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const openChat = () => {
    setIsOpen(true);
    setShowChat(true); // Remove the delay here
  };

  const closeChat = () => {
    setShowChat(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200); // Keep delay for closing animation
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await fetchGeminiResponse(inputMessage, apiKey);
      const aiMessage = { text: aiResponse, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const fetchGeminiResponse = async (prompt, key) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!res.ok) throw new Error('API request failed');

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={openChat}
            className="bg-[var(--accent)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            aria-label="Open AI Chat"
          >
            <StarsIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          key="chat-box"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.3
          }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden w-80 h-[500px] flex flex-col border border-gray-200"
        >
          {/* Chat Header */}
          <div className="bg-[var(--accent)] text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Artificial Intelligence Assistant</h3>
            <button
              onClick={closeChat}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
            {messages.length === 0 && (
              <div>
                <div className="text-center text-sm text-gray-500 py-8">
                Ask me anything!
                </div>
              </div>
              
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg p-3 text-sm max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-[var(--accent)] text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none max-w-[60%]">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[var(--accent)] text-white p-2 rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity"
                disabled={!inputMessage.trim() || isTyping}
              >
                <SendHorizonal className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center text-xs text-gray-500 mt-2">
              Terintegrasi dengan AI Gemini 2.0 Flash
            </div>  
          </form>
          
        </motion.div>
      )}
    </div>
  );
};

export default AIChatWidget;
