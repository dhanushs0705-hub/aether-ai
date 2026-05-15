'use client';

import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Activity, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [bootText, setBootText] = useState('');
  const fullText = "INITIALIZING AETHER AI... SYSTEM NOMINAL. WELCOME COMMANDER.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setBootText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-10 px-4">
      {/* Top Navbar Placeholder */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <Activity className="text-neon-cyan animate-pulse-glow" size={24} />
          <span className="font-bold tracking-widest text-lg text-white">AETHER<span className="text-neon-cyan">.AI</span></span>
        </div>
        <Link href="/dashboard" className="glass-neon px-6 py-2 rounded-full font-medium text-neon-cyan hover:bg-neon-cyan/10 transition-colors flex items-center gap-2">
          <LogIn size={16} />
          <span>SYSTEM LOGIN</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          {/* Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-cyan/20 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-cyan/30 text-neon-cyan text-sm tracking-widest mb-8">
            <Terminal size={14} />
            <span>{bootText}</span>
            <span className="w-2 h-4 bg-neon-cyan animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            YOUR DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple drop-shadow-[0_0_30px_rgba(0,245,255,0.5)]">
              LIFE OS.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
            An AI-powered operating system designed to optimize productivity, focus, growth, and personal evolution. Enter the next generation of life management.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative group-hover:text-white transition-colors duration-300">
                  INITIALIZE SYSTEM
                </span>
              </motion.button>
            </Link>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-white font-bold rounded-lg border border-white/10 hover:border-white/30 transition-colors"
            >
              VIEW PROTOCOLS
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full"
        >
          {[
            { title: "AI Life Assistant", icon: Cpu, desc: "Gemini-powered neural network analyzing and optimizing your daily routines." },
            { title: "Holographic Dashboard", icon: Activity, desc: "Immersive glassmorphism interface tracking goals, habits, and productivity." },
            { title: "Focus Mode", icon: Shield, desc: "Distraction-free environment with ambient sounds and cinematic timers." }
          ].map((feature, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-purple/20 to-transparent blur-2xl -z-10 group-hover:from-neon-cyan/30 transition-all duration-500" />
              <feature.icon className="text-neon-purple group-hover:text-neon-cyan mb-4 transition-colors duration-300" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
