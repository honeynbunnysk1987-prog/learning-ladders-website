"use client";

import { useEffect, useState } from "react";

export default function LadderRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rungs = 6;

  return (
    <div className="ladder-rail" aria-hidden="true">
      <div className="ladder-rail-track" />
      <div className="ladder-rail-fill" style={{ height: `${progress}%` }} />
      <div className="absolute inset-0 flex flex-col justify-between py-1">
        {Array.from({ length: rungs }).map((_, i) => {
          const rungPct = ((rungs - i) / (rungs + 1)) * 100;
          const lit = progress >= rungPct - 5;
          return (
            <div
              key={i}
              className="h-[3px] w-4 -translate-x-[5px] rounded-full transition-colors duration-300"
              style={{ backgroundColor: lit ? "#FBBF24" : "#DBEAFE" }}
            />
          );
        })}
      </div>
    </div>
  );
}
