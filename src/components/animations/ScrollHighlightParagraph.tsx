'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface HighlightPhrase {
  text: string;
  startIndex: number;
  endIndex: number;
}

interface ScrollHighlightParagraphProps {
  children: React.ReactNode;
  phrases: string[];
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  highlightRatio?: number; // Ratio of section height for each highlight (0-1)
  pauseRatio?: number; // Ratio of section height for pause between highlights (0-1)
}

const DEFAULT_ACTIVE_CLASS = 'font-semibold text-foreground';
const DEFAULT_INACTIVE_CLASS = 'text-muted-foreground';

export function ScrollHighlightParagraph({
  children,
  phrases,
  className,
  activeClassName = DEFAULT_ACTIVE_CLASS,
  inactiveClassName = DEFAULT_INACTIVE_CLASS,
  highlightRatio = 0.25, // 25% of section height for each highlight
  pauseRatio = 0.08, // 8% of section height for pause between highlights
}: ScrollHighlightParagraphProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const windowHeight = window.innerHeight;
    const phrasesCount = phrases.length;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;

      // Check if section is in viewport
      if (sectionBottom < 0 || sectionTop > windowHeight) {
        setActiveIndex(null);
        return;
      }

      // Calculate scroll progress through the section
      // Simple approach: track how much of the section has scrolled through the viewport
      // Progress 0: section top enters viewport
      // Progress 1: section bottom leaves viewport
      
      // When section top is at viewport top: progress = 0
      // When section bottom is at viewport bottom: progress = 1
      const sectionTopRelative = sectionTop; // position relative to viewport top
      const totalScrollDistance = sectionHeight + windowHeight; // total distance section travels
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTopRelative) / totalScrollDistance));

      // Calculate zone sizes based on ratios
      // Total zones: highlight + pause for each (except last pause)
      const totalZones = phrasesCount * 2 - 1;
      const highlightZoneSize = highlightRatio;
      const pauseZoneSize = pauseRatio;
      
      // Normalize zones so they fit within 0-1
      const totalZoneSize = (phrasesCount * highlightZoneSize) + ((phrasesCount - 1) * pauseZoneSize);
      const normalizedHighlightSize = highlightZoneSize / totalZoneSize;
      const normalizedPauseSize = pauseZoneSize / totalZoneSize;

      // Determine which zone we're in
      // Zones alternate: highlight, pause, highlight, pause, highlight
      let accumulatedProgress = 0;
      let currentIndex: number | null = null;
      
      for (let i = 0; i < phrasesCount; i++) {
        // Highlight zone for country i
        const highlightZoneStart = accumulatedProgress;
        const highlightZoneEnd = accumulatedProgress + normalizedHighlightSize;
        
        if (scrollProgress >= highlightZoneStart && scrollProgress < highlightZoneEnd) {
          currentIndex = i;
          break;
        }
        
        accumulatedProgress += normalizedHighlightSize;
        
        // Pause zone after this country (except after the last country)
        if (i < phrasesCount - 1) {
          const pauseZoneStart = accumulatedProgress;
          const pauseZoneEnd = accumulatedProgress + normalizedPauseSize;
          
          if (scrollProgress >= pauseZoneStart && scrollProgress < pauseZoneEnd) {
            // In pause zone - no highlight
            currentIndex = null;
            break;
          }
          
          accumulatedProgress += normalizedPauseSize;
        }
      }
      
      // If we've scrolled past all defined zones but are still in the section,
      // keep the last country highlighted
      if (currentIndex === null && scrollProgress >= accumulatedProgress - normalizedHighlightSize && scrollProgress <= 1) {
        currentIndex = phrasesCount - 1;
      }

      setActiveIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [phrases.length, prefersReducedMotion, highlightRatio, pauseRatio]);

  const highlightText = (text: string): ReactNode[] => {
    if (prefersReducedMotion || activeIndex === null) {
      return [text];
    }

    const activePhrase = phrases[activeIndex];
    if (!activePhrase) {
      return [text];
    }

    // Find all phrase matches in the text
    const phraseMatches: Array<{ phrase: string; index: number; phraseIndex: number }> = [];
    
    phrases.forEach((phrase, phraseIndex) => {
      const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedPhrase, 'gi');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        phraseMatches.push({
          phrase: match[0],
          index: match.index,
          phraseIndex,
        });
      }
    });

    // Sort by position in text
    phraseMatches.sort((a, b) => a.index - b.index);

    // Build parts array
    const parts: ReactNode[] = [];
    let lastIndex = 0;

    phraseMatches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const isActive = match.phraseIndex === activeIndex;
      parts.push(
        <span
          key={`${match.phraseIndex}-${match.index}`}
          className={isActive ? activeClassName : inactiveClassName}
        >
          {match.phrase}
        </span>
      );

      lastIndex = match.index + match.phrase.length;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  const content = typeof children === 'string' ? children : String(children);

  return (
    <div ref={containerRef} className={className}>
      {highlightText(content)}
    </div>
  );
}

