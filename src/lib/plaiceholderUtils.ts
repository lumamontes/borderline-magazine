/**
 * Plaiceholder utilities for extracting colors and generating blur placeholders
 * This provides a more elegant solution than manual color extraction
 */

export interface PlaiceholderData {
  colors: {
    dominant: string;
    vibrant: string;
    muted: string;
    lightVibrant: string;
    darkVibrant: string;
  };
  blur: string;
  base64: string;
}

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
 * Generate a color palette from plaiceholder colors
 */
export function generateColorPaletteFromPlaiceholder(plaiceholderData: PlaiceholderData): ColorPalette {
  const { colors } = plaiceholderData;
  
  return {
    primary: colors.dominant,
    secondary: colors.muted,
    accent: colors.vibrant,
    background: colors.lightVibrant,
    text: getContrastColor(colors.dominant),
    button: colors.vibrant,
    buttonHover: darkenColor(colors.vibrant, 20),
    border: lightenColor(colors.muted, 30)
  };
}

/**
 * Get contrasting text color (black or white)
 */
function getContrastColor(backgroundColor: string): string {
  // Remove # if present
  const hex = backgroundColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#ffffff';
}

/**
 * Darken a color by a percentage
 */
function darkenColor(color: string, percent: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) * (100 - percent) / 100);
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) * (100 - percent) / 100);
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) * (100 - percent) / 100);
  
  return `#${Math.floor(r).toString(16).padStart(2, '0')}${Math.floor(g).toString(16).padStart(2, '0')}${Math.floor(b).toString(16).padStart(2, '0')}`;
}

/**
 * Lighten a color by a percentage
 */
function lightenColor(color: string, percent: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + (255 - parseInt(hex.substr(0, 2), 16)) * percent / 100);
  const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + (255 - parseInt(hex.substr(2, 2), 16)) * percent / 100);
  const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + (255 - parseInt(hex.substr(4, 2), 16)) * percent / 100);
  
  return `#${Math.floor(r).toString(16).padStart(2, '0')}${Math.floor(g).toString(16).padStart(2, '0')}${Math.floor(b).toString(16).padStart(2, '0')}`;
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
 * Create a fallback color palette if plaiceholder fails
 */
export function getFallbackColorPalette(): ColorPalette {
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
