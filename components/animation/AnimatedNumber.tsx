"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  format?: (val: number) => string;
  className?: string;
};

export function AnimatedNumber({ value, format, className }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const animation = animate(motionValue, value, {
      duration: 0.5, //time animate number
      ease:"easeInOut",
      onUpdate(latest) {
        setDisplayValue(latest);
      },
    });
    return () => animation.stop();
  }, [value]);

  return (
    <motion.span className={className}>
      {format ? format(displayValue) : Math.round(displayValue)}
    </motion.span>
  );
}
