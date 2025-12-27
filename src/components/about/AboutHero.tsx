'use client';

import { Typewriter } from '../animations/Typewriter';
import { Reveal } from '../animations/Reveal';

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-accent-light) 100%)'}}>
      {/* Animated background texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          animation: 'float 20s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-8 sm:right-16 lg:right-24 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none animate-pulse">
        <div className="w-full h-full border-2 border-white rounded-full animate-spin" style={{animationDuration: '20s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-white rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '2s'}} />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-12 leading-tight tracking-tight text-left text-white">
              <Typewriter text="Connecting&nbsp;borderlines since&nbsp;2021" />
            </h1>
          </Reveal>
          
          <Reveal delay={0.8}>
            <div className="max-w-4xl space-y-8">
              <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-white/90 font-medium">
                A literary magazine drawing rich and collaborative 'borderlines' of connection within the litmag community.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/70 max-w-3xl">
                Through inventive publications and projects, we create spaces for emerging and established voices to flourish across print, digital, writing, and visual art.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={1.2}>
            <div className="mt-16 flex items-center space-x-4 text-white/60 animate-pulse">
              <div className="w-12 h-px bg-white animate-pulse" />
              <span className="text-sm font-light tracking-wide">Discover our story</span>
              <div className="w-4 h-4 border border-white/60 rotate-45 animate-bounce" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

