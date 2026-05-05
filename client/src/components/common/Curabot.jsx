import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Star, Calendar, Loader2 } from 'lucide-react';
import Button from './Button.jsx';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm CuraBot, your AI health assistant. Describe your symptoms, and I'll suggest the right specialist for you.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const symptoms = input.trim();
    if (!symptoms || loading) return;

    const userMsg = { id: Date.now(), text: symptoms, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setDoctors([]);

    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) throw new Error('API failed');

      const data = await response.json();
      
      const botMsg = { 
        id: Date.now() + 1, 
        text: `Based on your symptoms, you should consult a ${data.specialist}.`, 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botMsg]);
      
      if (data.doctors && data.doctors.length > 0) {
        setDoctors(data.doctors);
      } else {
        const noDocMsg = {
          id: Date.now() + 2,
          text: "No doctors available for this specialization at the moment.",
          sender: 'bot'
        };
        setMessages(prev => [...prev, noDocMsg]);
      }
    } catch (error) {
      const errorMsg = {
        id: Date.now() + 3,
        text: "Something went wrong. Please try again.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Doctor Recommendations Display */}
      {isOpen && doctors.length > 0 && (
        <div className="w-[350px] md:w-[400px] max-h-[300px] overflow-y-auto space-y-3 p-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft-lg border border-primary-100 animate-slide-up">
          <p className="text-xs font-bold text-primary-600 px-2 py-1 uppercase tracking-wider">Recommended Doctors</p>
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white p-3 rounded-xl border border-surface-100 shadow-sm flex gap-3 items-center">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                <Bot size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-surface-900 truncate">{doc.name}</h4>
                <p className="text-xs text-surface-500">{doc.specialization} • {doc.experience}</p>
                <div className="flex items-center gap-1 mt-1 text-amber-500">
                  <Star size={10} fill="currentColor" />
                  <span className="text-[10px] font-bold">{doc.rating}</span>
                </div>
              </div>
              <Button size="sm" className="text-[10px] px-2 py-1 h-auto" onClick={() => window.location.href='/appointments'}>Book</Button>
            </div>
          ))}
        </div>
      )}

      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-soft-lg border border-surface-100 flex flex-col animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-primary-600 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold">CuraBot</h3>
                <p className="text-xs text-primary-100">AI Assistant • Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none' 
                    : 'bg-white text-surface-700 shadow-sm border border-surface-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-surface-500 p-3 rounded-2xl rounded-tl-none text-sm border border-surface-100 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing symptoms...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-surface-100 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your symptoms..."
              disabled={loading}
              className="flex-1 bg-surface-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="bg-primary-600 text-white p-2 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg shadow-primary-500/40 flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse-soft"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
