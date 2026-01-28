// Glassmorphism utility classes
export const glassStyles = {
  // Basic glass effect
  base: 'backdrop-blur-md bg-white/70 border border-white/20',
  
  // Light glass
  light: 'backdrop-blur-sm bg-white/50 border border-white/10',
  
  // Dark glass
  dark: 'backdrop-blur-md bg-black/30 border border-white/10',
  
  // Colored glass
  primary: 'backdrop-blur-md bg-primary-500/10 border border-primary-500/20',
  
  // Card with glass effect
  card: 'backdrop-blur-lg bg-white/80 border border-white/30 shadow-2xl',
  
  // Modal/overlay
  modal: 'backdrop-blur-xl bg-black/20',
} as const;
