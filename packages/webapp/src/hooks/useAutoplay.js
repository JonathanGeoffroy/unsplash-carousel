import { useEffect, useState } from "react";
export const DEFAULT_HANDLE_CHANGE_TIMER = 3000;
export const DEFAULT_TIME_TIMER = 30;

function disposableInterval(handler, timeout) {
  const interval = setInterval(handler, timeout);
  return () => clearInterval(interval);
}

export default function useAutoplay(current, handleChange) {
  const [autoplay, setAutoplay] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (autoplay) {
      return disposableInterval(handleChange, DEFAULT_HANDLE_CHANGE_TIMER);
    }
  }, [autoplay, current, handleChange]);

  useEffect(() => {
    setElapsed(0);

    if (autoplay) {
      const start = performance.now();
      return disposableInterval(() => {
        setElapsed(performance.now() - start);
      }, DEFAULT_TIME_TIMER);
    }
  }, [autoplay, current]);

  const time = (elapsed / DEFAULT_HANDLE_CHANGE_TIMER) * 100;

  return { autoplay, onAutoplayChange: setAutoplay, time };
}
