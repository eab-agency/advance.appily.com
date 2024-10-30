import { useEffect, useRef } from "react";

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: HTMLElement | Window = typeof window !== 'undefined' ? window : null // Only set window if available
) {
  // Store the handler in a ref so it persists across renders
  const savedHandler = useRef<EventListener>();

  // Update ref.current to the latest handler
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure the element is available
    if (!element) return;

    const eventListener: EventListener = (event) => savedHandler.current?.(event);

    // Add event listener
    element.addEventListener(eventName, eventListener);

    // Cleanup function to remove the event listener
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
