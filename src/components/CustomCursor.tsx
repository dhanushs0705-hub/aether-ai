'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neon-cyan/50 rounded-full pointer-events-none z-[100] mix-blend-screen flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.2 }}
      >
        {isHovering && (
          <motion.div 
            className="w-1 h-1 bg-neon-cyan rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </motion.div>

      {/* Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[50px] pointer-events-none z-[90]"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30, mass: 1 }}
      />
    </>
  );
}
