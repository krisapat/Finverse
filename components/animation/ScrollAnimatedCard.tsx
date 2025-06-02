"use client";

import * as motion from "motion/react-client";
import type { ReactNode } from "react";
import type { Variants } from "motion/react";

interface ScrollAnimatedCardProps {
  children: ReactNode;
  index?: number;
}

export function ScrollAnimatedCard({ children, index = 0 }: ScrollAnimatedCardProps) {
  return (
    <motion.div
      className={`scroll-animated-card-${index}`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6 }}
      variants={cardVariants}
    >
      {children}
    </motion.div>
  );
}

const cardVariants: Variants = {
  offscreen: {
    opacity: 100,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};
