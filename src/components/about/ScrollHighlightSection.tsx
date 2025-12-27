'use client';

import { Reveal } from '../animations/Reveal';
import { ScrollHighlightParagraph } from '../animations/ScrollHighlightParagraph';
import { useReducedMotion } from 'framer-motion';

// Only highlight country names for a more focused, international emphasis
const phrases = [
  'United States',
  'Australia',
  'Brazil',
];

export function ScrollHighlightSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-32 sm:py-40 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center overflow-hidden">
      {/* Subtle animated background pattern */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none animate-[slide_20s_linear_infinite]"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 30%, currentColor 50%, transparent 70%),
                             linear-gradient(-45deg, transparent 30%, currentColor 50%, transparent 70%)`,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-50/50 dark:to-zinc-900/30 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Reveal>
          <ScrollHighlightParagraph
            phrases={phrases}
            highlightRatio={0.28}
            pauseRatio={0.06}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed text-zinc-800 dark:text-zinc-200"
            activeClassName="font-bold text-zinc-900 dark:text-zinc-50 transition-all duration-700 bg-zinc-200/40 dark:bg-zinc-700/40 px-2 py-1 rounded-md underline decoration-2 decoration-zinc-500 dark:decoration-zinc-400 underline-offset-4 shadow-sm"
            inactiveClassName="text-zinc-600 dark:text-zinc-400 transition-all duration-500"
          >
            Based in United States, Australia and Brazil. Themes in the works include 'print / digital,' 'writing / visual art,' 'emerging / established.'
          </ScrollHighlightParagraph>
        </Reveal>
      </div>
      
    </section>
  );
}

