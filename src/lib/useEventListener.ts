import { useEffect, useRef } from 'react';

type EventListener = (event: Event) => void;

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: EventListener,
  element: HTMLElement | Window = window
) {
  // Store the handler in a ref so it persists across renders
  const savedHandler = useRef<EventListener>();

  useEffect(() => {
    // Update the ref value if the handler changes
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    const targetElement: HTMLElement | Window | null = element;
    if (!targetElement || !targetElement.addEventListener) return;

    // Create an event listener that calls the handler stored in ref
    const eventListener: EventListener = (event) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    // Add event listener
    targetElement.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]); // Re-run if eventName or element changes
}

export default useEventListener;
