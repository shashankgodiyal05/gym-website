import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Zap,
  ArrowRight,
  RotateCcw,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { getPulseAiAssistantResponse } from '../data/aiKnowledge';
import { useGym } from '../context/GymContext';

const DEFAULT_MESSAGES = [
  {
    sender: 'bot',
    text: `Hey athlete! 👋 I'm **PulseAI**, your 24/7 personal fitness intelligence coach.

How can I help you level up today? Ask me about:
• Personalized workout splits & exercise cues
• Caloric & macronutrient calculation
• Master coach recommendations & slot booking
• PulseFit memberships & contrast spa recovery`,
    time: 'Just now'
  }
];

const QUICK_PROMPTS = [
  'Recommend a Trainer',
  'Calculate my Macros',
  'Pro Beast vs Starter Plan',
  'Best Warm-up for Squats',
  'Contrast Spa Protocol'
];

export default function AiAssistantModal({ onOpenBookingModal, onOpenCheckoutModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useGym();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const responseData = getPulseAiAssistantResponse(text);
      const botMsg = {
        sender: 'bot',
        text: responseData.reply,
        action: responseData.action,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages(DEFAULT_MESSAGES);
  };

  const handleActionButton = (action) => {
    if (action.type === 'link' && action.path) {
      setIsOpen(false);
      navigate(action.path);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-xl backdrop-blur-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>Need advice? Ask PulseAI</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3.5 sm:p-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none ${
            isOpen
              ? 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              : 'bg-[#CCFF00] hover:bg-[#B3E600] text-black shadow-glow-lime hover:scale-105'
          }`}
          title="PulseAI Fitness Assistant"
          aria-label="Open PulseAI Fitness Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <>
              <Bot className="w-6 h-6 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0A0D14] animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[80vh] flex flex-col rounded-3xl bg-[#121722] border border-slate-800 shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#CCFF00] to-emerald-400 text-black flex items-center justify-center shadow-glow-lime">
                <Bot className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white font-heading">PULSE AI COACH</h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {user ? `Personalized for ${user.name}` : 'Athletic Intelligence Engine'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-[#0D111A] border-b border-slate-800/80 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/70 hover:border-[#CCFF00]/50 hover:text-white text-slate-300 text-[11px] font-medium transition shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-[#CCFF00] text-black font-medium rounded-tr-none'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Action Button inside message if available */}
                    {msg.action && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800">
                        <button
                          onClick={() => handleActionButton(msg.action)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#CCFF00] text-black font-extrabold text-[11px] hover:bg-[#B3E600] transition shadow-glow-lime"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 w-24 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            <div className="flex items-center gap-2 bg-[#121722] border border-slate-800 rounded-2xl p-1.5 pl-3 focus-within:border-[#CCFF00]/50 transition">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about workouts, diet, coaches..."
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-xl bg-[#CCFF00] text-black flex items-center justify-center font-bold hover:bg-[#B3E600] transition disabled:opacity-40 disabled:hover:bg-[#CCFF00]"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              PulseAI delivers science-based athletic coaching & nutrition protocols.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
