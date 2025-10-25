/**
 * Magazine color palette system
 * Provides predefined color palettes based on magazine themes
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
 * Predefined color palettes for different magazine themes
 */
export const magazineColorPalettes: { [key: string]: ColorPalette } = {
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

/**
 * Get color palette based on magazine data
 */
export function getMagazineColorPalette(magazine: any): ColorPalette {
  // Check if magazine has a specific theme
  if (magazine.data.theme && magazineColorPalettes[magazine.data.theme]) {
    return magazineColorPalettes[magazine.data.theme];
  }
  
  // Check tags for theme hints
  const tags = magazine.data.tags || [];
  
  if (tags.some((tag: string) => ['art', 'visual', 'creative'].includes(tag.toLowerCase()))) {
    return magazineColorPalettes.artistic;
  }
  
  if (tags.some((tag: string) => ['modern', 'contemporary', 'digital'].includes(tag.toLowerCase()))) {
    return magazineColorPalettes.modern;
  }
  
  if (tags.some((tag: string) => ['minimal', 'clean', 'simple'].includes(tag.toLowerCase()))) {
    return magazineColorPalettes.minimalist;
  }
  
  if (tags.some((tag: string) => ['colorful', 'vibrant', 'bold'].includes(tag.toLowerCase()))) {
    return magazineColorPalettes.vibrant;
  }
  
  // Default to literary theme
  return magazineColorPalettes.literary;
}

/**
 * Generate CSS custom properties from a color palette
 */
export function generateCSSVariables(palette: ColorPalette): string {
  return Object.entries(palette).map(([key, value]) => 
    `--magazine-${key}: ${value}`
  ).join('; ');
}
