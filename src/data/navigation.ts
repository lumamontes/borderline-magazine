// Navigation data structure for better maintainability
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  imageSrc: string;
  alt: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'magazine',
    label: 'Magazine',
    href: '/magazine',
    imageSrc: '/src/assets/hero/magazine.png',
    alt: 'Magazine'
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    imageSrc: '/src/assets/hero/about.png',
    alt: 'About'
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    imageSrc: '/src/assets/hero/contact.png',
    alt: 'Contact'
  }
  // {
  //   id: 'community',
  //   label: 'Community',
  //   href: '/community',
  //   imageSrc: '/src/assets/hero/community.png',
  //   alt: 'Community'
  // },
  // {
  //   id: 'projects',
  //   label: 'Projects',
  //   href: '/projects',
  //   imageSrc: '/src/assets/hero/projects.png',
  //   alt: 'Projects'
  // },
  // {
  //   id: 'newsletter',
  //   label: 'Newsletter',
  //   href: '/newsletter',
  //   imageSrc: '/src/assets/hero/newsletter.png',
  //   alt: 'Newsletter'
  // }
];

// Constants for consistent styling
export const NAVIGATION_CONSTANTS = {
  DESKTOP_ICON_SIZE: 'w-20 h-20',
  DESKTOP_ICON_INNER_SIZE: 'w-12 h-12',
  MOBILE_ICON_SIZE: 'w-12 h-12',
  MOBILE_ICON_INNER_SIZE: 'w-8 h-8',
  DESKTOP_GAP: 'gap-10',
  MOBILE_GAP: 'gap-1',
  TRANSITION_DURATION: 'duration-300',
  MOBILE_TRANSITION_DURATION: 'duration-200'
} as const;
