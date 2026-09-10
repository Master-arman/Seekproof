import { Variants } from 'framer-motion';

/**
 * Reusable, performance-optimized, and accessible Framer Motion variants for SeekProof.
 * All animations are restrained, snappy (150ms-250ms), and support prefers-reduced-motion.
 */

// Helper to check if reduced motion is requested
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// 1. Clean Opacity Fade In
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

// 2. Subtle Upward Fade In (Max 10px displacement)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

// 3. Stagger Container for Grids and Lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02
    }
  }
};

// 4. Directional Slide In (Drawers, Menus, Navbars)
export const slideIn: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.14, ease: 'easeIn' }
  }
};

// 5. Scale In (Modals, Dialogs, Tooltips)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.18, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.12, ease: 'easeIn' }
  }
};

// 6. Accessible Reduced Motion Fallback Variants
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } }
};

// 7. Micro Interaction Tokens for Buttons and Cards
export const microInteractions = {
  buttonHover: { y: -1, transition: { duration: 0.1 } },
  buttonTap: { scale: 0.98, transition: { duration: 0.05 } },
  cardHover: { y: -2, transition: { duration: 0.15, ease: 'easeOut' } }
};

export default {
  fadeIn,
  fadeUp,
  staggerContainer,
  slideIn,
  scaleIn,
  reducedMotionVariants,
  microInteractions
};
