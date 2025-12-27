'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ANIMATION_CONFIG } from './config';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

export function Typewriter({ 
  text, 
  speed = ANIMATION_CONFIG.typewriter.speed, 
  className,
  showCursor = true 
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);

    const type = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutRef.current = setTimeout(type, speed);
      } else {
        setIsComplete(true);
      }
    };

    timeoutRef.current = setTimeout(type, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, prefersReducedMotion]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && !prefersReducedMotion && (
        <span className="inline-block w-0.5 h-[1em] ml-1 bg-current animate-[blink_1s_step-end_infinite]" />
      )}
    </span>
  );
}

