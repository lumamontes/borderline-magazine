/**
 * Color extraction utility for magazine cover images
 * Extracts dominant colors and creates a cohesive color palette
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
 * Extract dominant colors from an image
 * This is a simplified version - in production you might want to use a more sophisticated library
 */
export function extractColorsFromImage(imageSrc: string): Promise<ColorPalette> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(getDefaultPalette());
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const colors = extractDominantColors(imageData);
      const palette = generatePalette(colors);
      
      resolve(palette);
    };
    
    img.onerror = () => {
      resolve(getDefaultPalette());
    };
    
    img.src = imageSrc;
  });
}

/**
 * Extract dominant colors from image data
 */
function extractDominantColors(imageData: ImageData): string[] {
  const data = imageData.data;
  const colors: { [key: string]: number } = {};
  
  // Sample every 10th pixel for performance
  for (let i = 0; i < data.length; i += 40) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    // Skip transparent pixels
    if (a < 128) continue;
    
    // Skip very dark or very light colors
    const brightness = (r + g + b) / 3;
    if (brightness < 30 || brightness > 225) continue;
    
    const color = `rgb(${r},${g},${b})`;
    colors[color] = (colors[color] || 0) + 1;
  }
  
  // Sort by frequency and return top colors
  return Object.entries(colors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([color]) => color);
}

/**
 * Generate a cohesive color palette from extracted colors
 */
function generatePalette(colors: string[]): ColorPalette {
  if (colors.length === 0) {
    return getDefaultPalette();
  }
  
  // Use the most dominant color as primary
  const primary = colors[0];
  const secondary = colors[1] || colors[0];
  const accent = colors[2] || colors[1] || colors[0];
  
  // Generate complementary colors
  const primaryRgb = hexToRgb(primary) || { r: 0, g: 0, b: 0 };
  const background = `rgb(${Math.max(0, primaryRgb.r - 30)}, ${Math.max(0, primaryRgb.g - 30)}, ${Math.max(0, primaryRgb.b - 30)})`;
  const text = getContrastColor(primary);
  const button = primary;
  const buttonHover = darkenColor(primary, 20);
  const border = lightenColor(primary, 20);
  
  return {
    primary,
    secondary,
    accent,
    background,
    text,
    button,
    buttonHover,
    border
  };
}

/**
 * Get default color palette
 */
function getDefaultPalette(): ColorPalette {
  return {
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#3b82f6',
    background: '#f8fafc',
    text: '#1f2937',
    button: '#3b82f6',
    buttonHover: '#2563eb',
    border: '#e5e7eb'
  };
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 10),
      g: parseInt(result[2], 10),
      b: parseInt(result[3], 10)
    };
  }
  return null;
}

/**
 * Get contrasting text color (black or white)
 */
function getContrastColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

/**
 * Darken a color by a percentage
 */
function darkenColor(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const factor = (100 - percent) / 100;
  return `rgb(${Math.floor(rgb.r * factor)}, ${Math.floor(rgb.g * factor)}, ${Math.floor(rgb.b * factor)})`;
}

/**
 * Lighten a color by a percentage
 */
function lightenColor(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const factor = percent / 100;
  return `rgb(${Math.floor(rgb.r + (255 - rgb.r) * factor)}, ${Math.floor(rgb.g + (255 - rgb.g) * factor)}, ${Math.floor(rgb.b + (255 - rgb.b) * factor)})`;
}

/**
 * Generate CSS custom properties from a color palette
 */
export function generateCSSVariables(palette: ColorPalette): string {
  return `
    --magazine-primary: ${palette.primary};
    --magazine-secondary: ${palette.secondary};
    --magazine-accent: ${palette.accent};
    --magazine-background: ${palette.background};
    --magazine-text: ${palette.text};
    --magazine-button: ${palette.button};
    --magazine-button-hover: ${palette.buttonHover};
    --magazine-border: ${palette.border};
  `;
}
