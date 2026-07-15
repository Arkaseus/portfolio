import { useState, useEffect, useRef } from "react";

export function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [big, setBig] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let tx = 0, ty = 0, rx = 0, ry = 0, raf;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const over  = (e) => setBig(!!e.target.closest("a, button, [data-hover]"));
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    const tick = () => {
      rx += (tx - rx) * 0.11;
      ry += (ty - ry) * 0.11;
      if (dotRef.current)
        dotRef.current.style.transform  = `translate(${tx}px,${ty}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 -translate-x-1/2 -translate-y-1/2" />
      </div>
      {/* outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full border border-emerald-400 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            big
              ? "w-9 h-9 border-opacity-70 bg-emerald-500 bg-opacity-5"
              : "w-5 h-5 border-opacity-40"
          }`}
        />
      </div>
    </>
  );
}
