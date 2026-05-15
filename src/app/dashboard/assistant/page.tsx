'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Cpu, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Neural link established. How can I optimize your protocols today, Commander?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Analyzing parameters for "${userMessage}"... Strategy formulated. I recommend focusing on deep work blocks of 90 minutes followed by 20 minutes of restorative activity.` 
      }]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col glass rounded-2xl border border-white/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 blur-3xl -z-10 rounded-full" />
      
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/5 backdrop-blur-md z-10">
        <div className="relative">
          <Cpu className="text-neon-purple" size={24} />
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-neon-cyan rounded-full animate-ping" />
        </div>
        <div>
          <h2 className="font-bold text-white tracking-widest">AETHER CORE</h2>
          <p className="text-xs text-neon-cyan font-mono">ONLINE & LISTENING</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar z-10">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-white/5 border border-neon-purple/30 flex items-center justify-center shrink-0">
                <Terminal size={14} className="text-neon-purple" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-white rounded-tr-sm' 
                : 'glass border-white/5 text-slate-300 rounded-tl-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px] shrink-0">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">CM</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-neon-purple/30 flex items-center justify-center">
              <Loader2 size={14} className="text-neon-purple animate-spin" />
            </div>
            <div className="glass border-white/5 text-neon-cyan rounded-2xl rounded-tl-sm p-4 flex items-center gap-1">
              <span className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce delay-200" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-background/50 backdrop-blur-md z-10">
        <form onSubmit={handleSend} className="flex gap-4">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-neon-cyan animate-pulse" />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-cyan/50 focus:bg-neon-cyan/5 transition-all"
            />
          </div>
          <button 
            type="submit"
            disabled={!input.trim()}
            className="bg-neon-cyan text-background p-4 rounded-xl hover:bg-neon-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
