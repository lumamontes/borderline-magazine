'use client';

import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import type { ColorPalette } from '../lib/magazineColors';

interface PageImage {
  src: string;
  alt?: string;
}

interface MagazineFlipbookProps {
  pageImages: PageImage[];
  title?: string;
  isPreview?: boolean;
  magazineSlug?: string;
  colorPalette?: ColorPalette;
  coverImage?: string;
}

const Page = React.forwardRef<HTMLDivElement, { image: PageImage; number: number }>((props, ref) => {
  return (
    <div 
      className="page bg-white shadow-lg" 
      ref={ref} 
      data-density="hard"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="page-content w-full h-full flex items-center justify-center"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src={props.image.src}
          alt={props.image.alt || `Page ${props.number + 1}`}
          className="object-contain w-full h-full"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
});
Page.displayName = 'Page';

export default function MagazineFlipbook({ pageImages, title, isPreview = false, magazineSlug, colorPalette, coverImage }: MagazineFlipbookProps) {
  const book = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  // Limit pages in preview mode
  const displayImages = isPreview ? pageImages.slice(0, 3) : pageImages;
  const [totalPages, setTotalPages] = useState(displayImages.length);
  
  // Magazine aspect ratio (adjust based on your magazine dimensions)
  const aspectRatio = 8.5 / 11; // Standard magazine ratio, adjust as needed
  const baseWidth = 600;
  const calculatedHeight = Math.round(baseWidth / aspectRatio);
  
  const [isMobile, setIsMobile] = useState(false);
  const [displayWidth, setDisplayWidth] = useState(baseWidth);
  const [displayHeight, setDisplayHeight] = useState(calculatedHeight);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        const mobileWidth = Math.min(window.innerWidth - 40, 350);
        setDisplayWidth(mobileWidth);
        setDisplayHeight(Math.round(mobileWidth / aspectRatio));
      } else {
        setDisplayWidth(baseWidth);
        setDisplayHeight(calculatedHeight);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [aspectRatio, baseWidth, calculatedHeight]);

  useEffect(() => {
    setTotalPages(displayImages.length);
  }, [displayImages.length]);

  const onPageFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const onInit = () => {
    setTotalPages(displayImages.length);
  };

  if (pageImages.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No pages available for this magazine.</p>
      </div>
    );
  }

  return (
    <div 
      className="magazine-flipbook-container w-full flex flex-col items-center relative"
      style={colorPalette ? {
        '--magazine-primary': colorPalette.primary,
        '--magazine-secondary': colorPalette.secondary,
        '--magazine-accent': colorPalette.accent,
        '--magazine-background': colorPalette.background,
        '--magazine-text': colorPalette.text,
        '--magazine-button': colorPalette.button,
        '--magazine-button-hover': colorPalette.buttonHover,
        '--magazine-border': colorPalette.border,
      } as React.CSSProperties : {}}
    >
      <div className="flipbook-wrapper" style={{ marginBottom: '20px' }}>
        <HTMLFlipBook
          width={displayWidth}
          height={displayHeight}
          size="fixed"
          minWidth={200}
          maxWidth={800}
          minHeight={300}
          maxHeight={1200}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          style={{ 
            backgroundColor: colorPalette?.background || "#f8f8f8",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}
          onFlip={onPageFlip}
          onInit={onInit}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          className="magazine-flipbook"
          ref={book}
        >
          {displayImages.map((image, index) => (
            <Page key={index} number={index} image={image} />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="flipbook-controls flex items-center gap-4 mb-4">
        <button
          onClick={() => book.current?.pageFlip().flipPrev()}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <span 
          className="text-sm min-w-[100px] text-center"
          style={{ color: colorPalette?.text || 'inherit' }}
        >
          {currentPage + 1} of {totalPages}
        </span>
        
        <button
          onClick={() => book.current?.pageFlip().flipNext()}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      <div className="flipbook-navigation flex flex-wrap gap-2 justify-center">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => book.current?.pageFlip().flip(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentPage 
                ? 'bg-gray-800' 
                : 'bg-gray-300 hover:bg-gray-500'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}