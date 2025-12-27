'use client';

import { Reveal } from '../animations/Reveal';

export function StoryDiscovery() {
  return (
    <section className="relative py-32 sm:py-40 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900">
      {/* Chapter marker */}
      <div className="absolute top-8 left-8 text-zinc-400 font-light text-sm tracking-wide">
        Chapter II
      </div>
      
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="text-xl sm:text-2xl font-light tracking-wide mb-8 block" style={{color: 'var(--color-primary)'}}>
              We discovered something profound...
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
              Literature has no borders
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal delay={0.4}>
            <div className="space-y-8">
              <p className="text-xl sm:text-2xl leading-relaxed text-zinc-700 dark:text-zinc-300 font-light">
                In our digital age, creativity flows freely across geographical, cultural, and artistic boundaries. We realized that the most powerful stories emerge from this intersection—these borderlines.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                What started as a simple idea grew into something larger: a platform where writers from the United States, Australia, and Brazil could share not just their words, but their worlds.
              </p>
              
              <div className="pt-8">
                <div className="w-24 h-px" style={{background: 'var(--color-primary)'}} />
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="space-y-6">
              <Reveal delay={0.6}>
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Cross-Cultural Voices
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Stories that transcend geographical boundaries and speak to universal human experiences.
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={0.8}>
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Emerging & Established
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    A space where new voices learn from masters, and masters discover fresh perspectives.
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={1.0}>
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Print Meets Digital
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Honoring traditional literary forms while embracing new modes of storytelling.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}