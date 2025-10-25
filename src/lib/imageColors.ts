/**
 * Image color extraction utilities for Astro
 * Provides color palette generation from magazine cover images
 */

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  button: string;
  buttonHover: string;
  border: string;
}

/**
 * Generate color palette based on magazine data and cover image
 */
export function getMagazineColorPalette(magazine: any): ColorPalette {
  // Check if magazine has a specific theme
  if (magazine.data.theme) {
    return getThemePalette(magazine.data.theme);
  }
  
  // Check tags for theme hints
  const tags = magazine.data.tags || [];
  
  if (tags.some((tag: string) => ['art', 'visual', 'creative', 'poetry'].includes(tag.toLowerCase()))) {
    return getThemePalette('artistic');
  }
  
  if (tags.some((tag: string) => ['modern', 'contemporary', 'digital'].includes(tag.toLowerCase()))) {
    return getThemePalette('modern');
  }
  
  if (tags.some((tag: string) => ['minimal', 'clean', 'simple'].includes(tag.toLowerCase()))) {
    return getThemePalette('minimalist');
  }
  
  if (tags.some((tag: string) => ['colorful', 'vibrant', 'bold'].includes(tag.toLowerCase()))) {
    return getThemePalette('vibrant');
  }
  
  // Default to literary theme
  return getThemePalette('literary');
}

/**
 * Get predefined theme palettes
 */
function getThemePalette(theme: string): ColorPalette {
  const palettes: { [key: string]: ColorPalette } = {
    // Literary/Classic theme
    literary: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#7c3aed',
      background: '#f8fafc',
      text: '#1f2937',
      button: '#7c3aed',
      buttonHover: '#6d28d9',
      border: '#e5e7eb'
    },
    
    // Modern/Contemporary theme
    modern: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#06b6d4',
      background: '#f1f5f9',
      text: '#0f172a',
      button: '#06b6d4',
      buttonHover: '#0891b2',
      border: '#cbd5e1'
    },
    
    // Artistic/Creative theme
    artistic: {
      primary: '#7c2d12',
      secondary: '#a16207',
      accent: '#dc2626',
      background: '#fef7ed',
      text: '#7c2d12',
      button: '#dc2626',
      buttonHover: '#b91c1c',
      border: '#fed7aa'
    },
    
    // Minimalist theme
    minimalist: {
      primary: '#000000',
      secondary: '#4b5563',
      accent: '#000000',
      background: '#ffffff',
      text: '#000000',
      button: '#000000',
      buttonHover: '#374151',
      border: '#e5e7eb'
    },
    
    // Vibrant theme
    vibrant: {
      primary: '#1e40af',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#f0f9ff',
      text: '#1e40af',
      button: '#f59e0b',
      buttonHover: '#d97706',
      border: '#bfdbfe'
    }
  };
  
  return palettes[theme] || palettes.literary;
}

/**
 * Generate CSS custom properties from a color palette
 */
export function generateCSSVariables(palette: ColorPalette): string {
  return Object.entries(palette).map(([key, value]) => 
    `--magazine-${key}: ${value}`
  ).join('; ');
}

/**
 * Create a blur background effect using CSS
 */
export function createBlurBackground(coverImageSrc: string): string {
  return `
    background-image: url('${coverImageSrc}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(20px) brightness(0.7);
    transform: scale(1.1);
  `;
}
