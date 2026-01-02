
import { Variants } from "framer-motion";

// Page Transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.4, 0.25, 1.0] // Smooth ease-out
    } 
  },
  exit: { opacity: 0, y: -10 }
};

// Card Hover Effects
export const cardHoverVariants: Variants = {
  initial: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  hover: { 
    y: -4, 
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    transition: { duration: 0.2 }
  }
};

// List Item Stagger
export const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const itemVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 }
};

// Sidebar/Drawer
export const sidebarVariants: Variants = {
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { x: "100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } } // RTL: 100% means right side
};

// Modal/Dialog
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.5 } }
};
