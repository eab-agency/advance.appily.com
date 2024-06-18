import { useState, useEffect } from "react";

function useOnetrustActiveGroups() {
  const [activeGroups, setActiveGroups] = useState(
    typeof window !== "undefined" ? window.OnetrustActiveGroups : null,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      let currentValue = window.OnetrustActiveGroups;

      Object.defineProperty(window, "OnetrustActiveGroups", {
        get() {
          return currentValue;
        },
        set(newValue) {
          if (newValue !== currentValue) {
            currentValue = newValue;
            setActiveGroups(newValue);
          }
        },
        configurable: true,
      });

      // Initialize the state with the current value
      setActiveGroups(window.OnetrustActiveGroups);

      // Cleanup the effect
      return () => {
        delete window.OnetrustActiveGroups;
        window.OnetrustActiveGroups = currentValue;
      };
    }
  }, []);

  return activeGroups;
}

export default useOnetrustActiveGroups;
