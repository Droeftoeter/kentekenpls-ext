import React, { JSX, useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { motion } from "framer-motion";

type Bounds = Pick<DOMRectReadOnly, "height" | "width">;

type AnimatedHeightProps = JSX.IntrinsicElements["div"];

const AnimatedHeight = ({ children, ...rest }: AnimatedHeightProps) => {
  const [bounds, setBounds] = useState<Bounds>({ height: 0, width: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setBounds(entry.contentRect);
    });

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return (
    <motion.div
      style={{ overflow: "hidden" }}
      initial={{ height: 0, width: 0 }}
      animate={{
        height: bounds.height,
        width: bounds.width,
      }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
    >
      <div
        ref={ref}
        style={{ width: "min-content", minWidth: "15rem" }}
        {...rest}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedHeight;
