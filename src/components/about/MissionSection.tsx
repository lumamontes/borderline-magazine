'use client';

import { Reveal } from '../animations/Reveal';
import { ParallaxLayer } from '../animations/ParallaxLayer';
import { WorldMap } from '../svg/WorldMap';

export function MissionSection() {
  return (
    <section className="relative py-32 sm:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full animate-float" style={{background: 'var(--color-primary)', opacity: 0.3, animationDelay: '0s'}} />
      <div className="absolute top-40 right-20 w-2 h-2 rounded-full animate-float" style={{background: 'var(--color-accent)', opacity: 0.4, animationDelay: '2s'}} />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full animate-float" style={{background: 'var(--color-accent-light)', opacity: 0.2, animationDelay: '4s'}} />
      
      <div className="max-w-7xl mx-auto">
        {/* Centered single column layout */}
        <div className="max-w-4xl mx-auto text-center space-y-16">
          {/* Mission text */}
          <div>
            <Reveal delay={0.3} distance="large">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-12 text-zinc-900 dark:text-zinc-50">
                Our mission
              </h2>
            </Reveal>

            <Reveal delay={0.6} distance="medium">
              <div className="prose prose-xl prose-zinc dark:prose-invert max-w-none mx-auto">
                <p className="text-xl sm:text-2xl leading-relaxed font-light text-zinc-700 dark:text-zinc-300 mb-0">
                  Drawing 'borderlines' of connection amongst the litmag community through thought-provoking, frontier-pushing publications and projects.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Elegant map presentation below text */}
          <div>
            <Reveal delay={0.9} distance="medium">
              <div className="relative group">
                {/* Clean map container with enhanced visuals */}
                <div className="relative p-8">
                  <ParallaxLayer speed={0.02} className="w-full max-w-2xl mx-auto">
                    <WorldMap className="w-full h-auto opacity-70 dark:opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.02]" />
                  </ParallaxLayer>
                  
                  {/* Animated connection lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl h-full">
                      {/* Animated connection markers */}
                      <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full animate-pulse" style={{background: 'var(--color-primary)'}} />
                      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full animate-pulse" style={{background: 'var(--color-accent)', animationDelay: '0.5s'}} />
                      <div className="absolute top-2/3 left-1/3 w-3 h-3 rounded-full animate-pulse" style={{background: 'var(--color-accent-light)', animationDelay: '1s'}} />
                      
                      {/* Connecting lines with animation */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line 
                          x1="25%" y1="50%" 
                          x2="33.33%" y2="66.67%" 
                          stroke="var(--color-primary)" 
                          strokeWidth="1" 
                          opacity="0.3"
                          className="animate-pulse"
                          strokeDasharray="4 4"
                        />
                        <line 
                          x1="33.33%" y1="66.67%" 
                          x2="75%" y2="66.67%" 
                          stroke="var(--color-accent)" 
                          strokeWidth="1" 
                          opacity="0.3"
                          className="animate-pulse"
                          strokeDasharray="4 4"
                          style={{animationDelay: '0.5s'}}
                        />
                        <line 
                          x1="25%" y1="50%" 
                          x2="75%" y2="66.67%" 
                          stroke="var(--color-accent-light)" 
                          strokeWidth="1" 
                          opacity="0.2"
                          className="animate-pulse"
                          strokeDasharray="4 4"
                          style={{animationDelay: '1s'}}
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Elegant caption below map */}
                  <div className="mt-8">
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light italic">
                      Based in the United States, Australia, and Brazil
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

