import { useState, useEffect } from "react";

export function useTypewriter(text, speed = 34) {
  const [out, setOut]   = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
    }, 420);
    return () => clearTimeout(t);
  }, [text, speed]);
  return { out, done };
}
