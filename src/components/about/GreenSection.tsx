'use client';

import { Reveal } from '../animations/Reveal';
import { useReducedMotion } from 'framer-motion';

export function GreenSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 story-section">
      {/* Floating storytelling elements */}
      <div className="absolute top-20 left-10 w-3 h-3 rounded-full animate-float" style={{background: 'var(--color-primary)', opacity: 0.4, animationDelay: '0s'}} />
      <div className="absolute top-40 right-16 w-2 h-2 rounded-full animate-float" style={{background: 'var(--color-accent)', opacity: 0.3, animationDelay: '2s'}} />
      <div className="absolute bottom-32 left-1/4 w-4 h-4 rounded-full animate-float" style={{background: 'var(--color-accent-light)', opacity: 0.2, animationDelay: '4s'}} />
      
      {/* Clean layout with enhanced visual storytelling */}
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 transition-all duration-700 hover:shadow-xl" style={{background: 'var(--color-secondary)', borderColor: 'var(--color-primary)', borderWidth: '1px'}}>
          {/* Animated left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl animate-pulse" style={{background: 'var(--color-primary)'}} aria-hidden="true" />
          
          {/* Floating geometric accent */}
          {!prefersReducedMotion && (
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full blur-3xl opacity-30 animate-pulse" style={{background: 'var(--color-primary)'}} aria-hidden="true" />
          )}
          
          {/* Enhanced content with storytelling flow */}
          <div className="relative z-10">
            {/* Animated quote mark */}
            <div className="mb-6 sm:mb-8">
              <div className="w-12 h-px animate-scaleIn" style={{background: 'var(--color-primary)'}} aria-hidden="true" />
            </div>
            
            <Reveal>
              <div className="prose prose-xl prose-zinc dark:prose-invert max-w-none">
                <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed font-light text-zinc-800 dark:text-zinc-200 mb-0">
                  Beyond our main litmag volumes, we hope you will find thought-provoking surprises and more avenues to participate in our wider range of activities, including new litmag community-centred projects and publications.
                </p>
              </div>
            </Reveal>
            
            {/* Animated closing accent */}
            <div className="mt-8 sm:mt-10 flex justify-end">
              <div className="w-12 h-px animate-slideInRight" style={{background: 'var(--color-primary)'}} aria-hidden="true" />
            </div>
          </div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{background: 'linear-gradient(135deg, transparent 0%, transparent 50%, rgba(249, 187, 124, 0.1) 100%)'}} aria-hidden="true" />
          
          {/* Floating story elements inside card */}
          <div className="absolute top-4 right-4 w-1 h-1 rounded-full animate-pulse" style={{background: 'var(--color-accent)', animationDelay: '1s'}} />
          <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--color-accent-light)', animationDelay: '3s'}} />
        </div>
      </div>
    </section>
  );
}

