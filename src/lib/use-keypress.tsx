import { useEffect, useRef } from "react";

export default function useKeypress(
  keys: string | string[],
  handler?: (event: KeyboardEvent) => void,
) {
  const eventListenerRef = useRef<((event: KeyboardEvent) => void) | null>(
    null,
  );

  useEffect(() => {
    eventListenerRef.current = (event: KeyboardEvent) => {
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler?.(event);
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      eventListenerRef.current?.(event);
    };
    window.addEventListener("keydown", eventListener);
    return () => {
      window.removeEventListener("keydown", eventListener);
    };
  }, []);
}
