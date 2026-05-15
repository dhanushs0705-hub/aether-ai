import type { Metadata } from 'next'
import './globals.css'
import ParticleBackground from '@/components/ParticleBackground'
import CustomCursor from '@/components/CustomCursor'
import AudioFeedback from '@/components/AudioFeedback'

export const metadata: Metadata = {
  title: 'AETHER AI | Holographic Life OS',
  description: 'An AI-powered operating system designed to optimize productivity, focus, growth, and personal evolution.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-light-soft min-h-screen relative overflow-hidden cursor-none">
        <AudioFeedback />
        <CustomCursor />
        {/* Global ambient particle background */}
        <ParticleBackground />
        
        {/* Main application wrapper */}
        <div className="relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
