"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

const interactiveSelector = "a, button, input, select, textarea, [role='button']";

/** Fine-pointer cursor enhancer with no effect on touch or reduced-motion users. */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!query.matches || motion.matches || !ring.current || !dot.current) return;

    document.documentElement.dataset.customCursor = "true";
    let frame = 0;
    let x = -100;
    let y = -100;

    const paint = () => {
      ring.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`);
      dot.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`);
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const target = (event: PointerEvent) => {
      const isInteractive = event.target instanceof Element && Boolean(event.target.closest(interactiveSelector));
      ring.current?.toggleAttribute("data-active", isInteractive);
    };
    const press = () => ring.current?.setAttribute("data-pressed", "");
    const release = () => ring.current?.removeAttribute("data-pressed");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", target, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", target);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className={styles.ring} />
      <div ref={dot} aria-hidden className={styles.dot} />
    </>
  );
}
