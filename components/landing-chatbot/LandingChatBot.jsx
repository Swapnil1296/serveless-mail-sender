'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const GREETING =
  "Hi! I'm the Project Hub assistant. Ask me about Swapnil, his skills, projects, or how to get in touch.";

export default function LandingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', content: GREETING, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: text, timestamp: new Date() },
    ]);
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply =
        data.reply ??
        "I couldn't process that. Try asking about skills, projects, or contact info.";
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: 'Connection error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="landing-chatbot-root">
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.4)] flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-300 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[9998] w-full max-w-md h-[420px] flex flex-col overflow-hidden rounded-lg border-2 border-cyan-400/50 bg-zinc-900 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(6,182,212,0.2)]"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/80 border-b border-cyan-400/30 rounded-t-lg">
              <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase">
                PORTFOLIO_ASSIST
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-zinc-900/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-sm border ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-100'
                        : 'bg-zinc-800/90 border-cyan-400/30 text-cyan-50/90'
                    }`}
                  >
                    <p className="text-xs leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 bg-zinc-800/90 border border-cyan-400/30 rounded-sm">
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-cyan-400/30 bg-zinc-800/90 rounded-b-lg">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 px-4 py-2.5 bg-zinc-950/80 border border-cyan-400/40 text-cyan-100 placeholder-cyan-500/50 text-sm font-mono focus:outline-none focus:border-cyan-400 rounded"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="px-4 py-2.5 bg-cyan-500/30 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
