'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Brain, Save, CalendarDays } from 'lucide-react';

export default function JournalPage() {
  const [entry, setEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const handleSave = () => {
    if (!entry.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate AI emotional analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setInsight("Sentiment analysis indicates elevated stress levels but strong determination. Recommendation: Prioritize 8 hours of sleep tonight and schedule a 20-minute meditation session tomorrow morning to optimize cognitive recovery.");
    }, 2000);
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Neural Logs</h1>
          <p className="text-slate-400 flex items-center gap-2 text-sm mt-1">
            <CalendarDays size={14} /> Log Entry: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Area */}
        <motion.div variants={itemVars} className="lg:col-span-2 space-y-4">
          <div className="glass p-1 rounded-2xl border border-white/10 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Record your thoughts, Commander..."
              className="w-full h-96 bg-transparent text-white placeholder:text-slate-600 p-6 focus:outline-none resize-none custom-scrollbar relative z-10"
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <button className="px-6 py-3 rounded-xl glass text-slate-300 hover:text-white transition-colors">
              Discard
            </button>
            <button 
              onClick={handleSave}
              disabled={!entry.trim() || isAnalyzing}
              className="px-6 py-3 rounded-xl bg-neon-cyan text-background font-bold hover:bg-neon-cyan/80 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Brain size={18} className="animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Commit to Memory
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div variants={itemVars} className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-neon-purple/30 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 blur-2xl -z-10 rounded-full" />
            
            <div className="flex items-center gap-2 text-neon-purple mb-4">
              <Sparkles size={18} />
              <h3 className="font-bold">AETHER Insights</h3>
            </div>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-48 space-y-4 text-neon-purple">
                <Brain size={32} className="animate-bounce" />
                <p className="text-sm font-mono tracking-widest text-center">PROCESSING<br/>NEURAL PATTERNS...</p>
              </div>
            ) : insight ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {insight}
                </p>
                <div className="p-3 bg-neon-purple/10 border border-neon-purple/20 rounded-lg">
                  <p className="text-xs text-neon-purple font-mono uppercase">Detected Mood: Determined</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500 space-y-4">
                <BookOpen size={32} className="opacity-20" />
                <p className="text-sm text-center">Commit a log entry to receive AI-driven cognitive analysis.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
