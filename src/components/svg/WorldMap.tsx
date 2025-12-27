'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface WorldMapProps {
  className?: string;
}

interface LocationMarker {
  name: string;
  top: string;
  left: string;
  delay: string;
}

const locations: LocationMarker[] = [
  { name: 'United States', top: '30%', left: '20%', delay: '0s' },
  { name: 'Australia', top: '60%', left: '75%', delay: '0.7s' },
  { name: 'Brazil', top: '45%', left: '25%', delay: '1.4s' },
];

export function WorldMap({ className }: WorldMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Trigger fade-in animation after load
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`${className} relative`}
      role="img" 
      aria-label="World map showing The Borderline's international presence in United States, Australia, and Brazil"
    >
      <img 
        src="/map.svg" 
        width={400}
        height={300}
        alt="" 
        className={`w-full h-auto opacity-80 dark:opacity-70 transition-opacity duration-1000 filter contrast-110 ${
          isLoaded ? 'opacity-80 dark:opacity-70' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        aria-hidden="true"
      />
      
      {/* Premium location markers with sophisticated styling */}
      <div className="absolute inset-0">
        {locations.map((location) => (
          <div
            key={location.name}
            className="absolute group/marker pointer-events-auto"
            style={{ 
              top: location.top, 
              left: location.left,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredLocation(location.name)}
            onMouseLeave={() => setHoveredLocation(null)}
            onFocus={() => setHoveredLocation(location.name)}
            onBlur={() => setHoveredLocation(null)}
          >
            {/* Outer pulse ring - sophisticated animation */}
            {!prefersReducedMotion && (
              <div 
                className="absolute inset-0 w-4 h-4 rounded-full bg-zinc-600 dark:bg-zinc-400 opacity-40 animate-ping"
                style={{ 
                  animationDelay: location.delay, 
                  animationDuration: '3s',
                  transform: 'translate(-50%, -50%)',
                }}
                aria-hidden="true"
              />
            )}
            
            {/* Main marker dot */}
            <div 
              className="relative w-3 h-3 bg-zinc-900 dark:bg-zinc-100 rounded-full border-2 border-white dark:border-zinc-900 shadow-lg transition-all duration-300 group-hover/marker:scale-150 group-hover/marker:shadow-xl z-10"
              style={{ transform: 'translate(-50%, -50%)' }}
              tabIndex={0}
              role="button"
              aria-label={`${location.name} - The Borderline has presence here`}
            >
              {/* Inner glow */}
              <div 
                className="absolute inset-0 w-3 h-3 rounded-full bg-zinc-600 dark:bg-zinc-400 opacity-60 blur-sm"
                style={{ transform: 'translate(-50%, -50%)' }}
                aria-hidden="true"
              />
            </div>
            
            {/* Sophisticated hover tooltip */}
            {hoveredLocation === location.name && (
              <div 
                className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs sm:text-sm font-light px-3 py-1.5 rounded-md shadow-xl whitespace-nowrap pointer-events-auto z-20 border border-zinc-700 dark:border-zinc-300"
                style={{ transform: 'translateX(-50%)' }}
              >
                {location.name}
                {/* Tooltip arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 border-l border-t border-zinc-700 dark:border-zinc-300 rotate-45" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

