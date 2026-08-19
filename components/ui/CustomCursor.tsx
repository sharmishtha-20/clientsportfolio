"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState<string>("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "action">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(hover: hover)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check for cursor data attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("action");
        return;
      }

      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      if (isInteractive) {
        setCursorText("");
        setCursorVariant("hover");
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        animate={{
          width: cursorVariant === "action" ? 80 : cursorVariant === "hover" ? 44 : 10,
          height: cursorVariant === "action" ? 80 : cursorVariant === "hover" ? 44 : 10,
          backgroundColor: cursorVariant === "action" ? "#F5F4EF" : cursorVariant === "hover" ? "#F5F4EF" : "#F5F4EF",
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="rounded-full flex items-center justify-center text-center backdrop-blur-[1px]"
      >
        {cursorText && (
          <span className="text-[10px] font-medium tracking-widest text-[#111111] uppercase select-none px-1">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
