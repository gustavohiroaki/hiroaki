"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./BrandMark";

export function SiteOpening() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const overlay = root.current;
    const moving = mark.current;
    const target = document.querySelector<SVGSVGElement>(".hero-mark");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!overlay || !moving || reduced.matches) {
      setFinished(true);
      return;
    }
    // Other entry routes keep the opening fade; only the Home has this destination.
    if (!target) {
      const timeout = window.setTimeout(() => setFinished(true), 3300);
      return () => clearTimeout(timeout);
    }

    let disposed = false;
    let ended = false;
    let motion: Animation | undefined;
    let timeout = 0;
    const previousVisibility = target.style.visibility;
    const finish = () => {
      if (disposed || ended) return;
      ended = true;
      clearTimeout(timeout);
      target.style.visibility = previousVisibility;
      setFinished(true);
    };
    target.dataset.intro = "complete";
    target.style.visibility = "hidden";
    overlay.classList.add("site-opening-morph");
    // Browser scroll restoration and viewport settling are not skip requests.
    const skip = () => { motion?.cancel(); finish(); };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") skip();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a, button")) skip();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    reduced.addEventListener("change", skip);

    timeout = window.setTimeout(() => {
      if (disposed || ended || !target.isConnected) { finish(); return; }
      // The flight belongs to the document, just like its destination. Freeze
      // the opening's current viewport bounds into document coordinates before
      // moving it, so scrolling moves both marks by exactly the same amount.
      const bounds = overlay.getBoundingClientRect();
      overlay.style.setProperty("--opening-page-top", `${bounds.top + window.scrollY}px`);
      overlay.style.setProperty("--opening-height", `${bounds.height}px`);
      overlay.classList.add("site-opening-travel");
      const from = moving.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      motion = moving.animate([
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${to.x + to.width / 2 - from.x - from.width / 2}px, ${to.y + to.height / 2 - from.y - from.height / 2}px) scale(${to.width / from.width})`, opacity: 0.8 },
      ], { duration: 1200, easing: "cubic-bezier(0.45, 0, 0.2, 1)", fill: "forwards" });
      motion.finished.then(finish).catch(() => {});
    }, 2100);

    return () => {
      disposed = true;
      clearTimeout(timeout);
      motion?.cancel();
      target.style.visibility = previousVisibility;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
      reduced.removeEventListener("change", skip);
    };
  }, []);

  if (finished) return null;
  return <div ref={root} className="site-opening" aria-hidden="true">
    <div ref={mark} className="site-opening-mark"><BrandMark animated /></div>
  </div>;
}
