'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, Shield } from 'lucide-react';

export default function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound here
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - (timeLeft / (mode === 'focus' ? 25 * 60 : 5 * 60));

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center relative">
      {/* Ambient background that pulses when active */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000 ${
        isActive 
          ? mode === 'focus' ? 'bg-neon-cyan/20 animate-pulse-glow' : 'bg-neon-purple/20 animate-pulse-glow'
          : 'bg-white/5'
      }`} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass border border-white/10 p-12 rounded-[3rem] w-full max-w-lg text-center relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-1 rounded-full flex gap-1 border border-white/10">
            <button 
              onClick={() => switchMode('focus')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                mode === 'focus' ? 'bg-neon-cyan text-background' : 'text-slate-400 hover:text-white'
              }`}
            >
              Deep Work
            </button>
            <button 
              onClick={() => switchMode('break')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                mode === 'break' ? 'bg-neon-purple text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Restoration
            </button>
          </div>
        </div>

        {/* Circular Progress (Simplified representation) */}
        <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center">
          <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
            <circle 
              cx="128" cy="128" r="120" 
              className="stroke-white/10 fill-none" 
              strokeWidth="4" 
            />
            <motion.circle 
              cx="128" cy="128" r="120" 
              className={`fill-none ${mode === 'focus' ? 'stroke-neon-cyan' : 'stroke-neon-purple'}`} 
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress)}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - progress) }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
          <div className="text-6xl font-black text-white tracking-tighter">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>

        <div className="flex justify-center items-center gap-6">
          <button onClick={resetTimer} className="p-4 rounded-full glass hover:bg-white/10 text-slate-300 transition-colors">
            <RotateCcw size={24} />
          </button>
          <button 
            onClick={toggleTimer}
            className={`p-6 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all transform hover:scale-105 active:scale-95 ${
              mode === 'focus' ? 'bg-neon-cyan text-background' : 'bg-neon-purple text-white'
            }`}
          >
            {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>
          <button className="p-4 rounded-full glass hover:bg-white/10 text-slate-300 transition-colors">
            <Volume2 size={24} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
