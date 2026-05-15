'use client';

import { useEffect, useCallback } from 'react';

export default function AudioFeedback() {
  const playClickSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitch for sci-fi feel
      oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Quiet volume
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Ignore if AudioContext is not supported
    }
  }, []);

  const playHoverSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Ignore
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        playClickSound();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        playHoverSound();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [playClickSound, playHoverSound]);

  return null;
}
