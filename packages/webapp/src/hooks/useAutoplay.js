import { useEffect, useState } from "react";
const DEFAULT_TIMER = 3000;

function disposableInterval(handler, timeout) {
  const interval = setInterval(handler, timeout);
  return () => clearInterval(interval);
}

export default function useAutoplay(current, handleChange) {
  const [autoplay, setAutoplay] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (autoplay) {
      return disposableInterval(handleChange, DEFAULT_TIMER);
    }
  }, [autoplay, current, handleChange]);

  useEffect(() => {
    setElapsed(0);

    if (autoplay) {
      const start = performance.now();
      return disposableInterval(() => {
        setElapsed(performance.now() - start);
      }, 30);
    }
  }, [autoplay, current]);

  const time = (elapsed / DEFAULT_TIMER) * 100;

  return { autoplay, onAutoplayChange: setAutoplay, time };
}
