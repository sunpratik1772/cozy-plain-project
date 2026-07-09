import { useEffect, useState } from "react";

/** Reveals `text` a few characters at a time when `active`; renders instantly otherwise. */
export function useTypewriter(text: string, active: boolean, speed = 12) {
  const [shown, setShown] = useState(active ? "" : text);
  const [done, setDone] = useState(!active);

  useEffect(() => {
    if (!active) {
      setShown(text);
      setDone(true);
      return;
    }

    setShown("");
    setDone(false);
    let i = 0;
    const step = Math.max(1, Math.round(text.length / 60));
    const id = window.setInterval(() => {
      i += step;
      if (i >= text.length) {
        setShown(text);
        setDone(true);
        window.clearInterval(id);
      } else {
        setShown(text.slice(0, i));
      }
    }, speed);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active]);

  return { shown, done };
}
