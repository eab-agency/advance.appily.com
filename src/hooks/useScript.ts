/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';

function useScript(src, containerRef, multiple) {
    // Keep track of script status ("idle", "loading", "ready", "error")
    const [status, setStatus] = useState(src ? 'loading' : 'idle');
    useEffect(() => {
        if (multiple) {
            src = `${src}&${Math.floor(Math.random() * 90000) + 10000}`;
        }
    }, []);
    useEffect(
        () => {
            // Allow falsy src value if waiting on other data needed for
            // constructing the script URL passed to this hook.
            if (!src) {
                setStatus('idle');
                return;
            }
            // Fetch existing script element by src
            // It may have been added by another intance of this hook
            let script = document.querySelector(`script[src="${src}"]`);
            if (!script) {
                // Create script
                script = document.createElement('script');
                //@ts-ignore
                script.src = src;
                //@ts-ignore
                script.async = true;
                script.setAttribute('data-status', 'loading');
                // Add script to document body or container element
                if (containerRef) {
                    containerRef.current.appendChild(script);
                } else {
                    document.body.appendChild(script);
                }
                // Store status in attribute on script
                // This can be read by other instances of this hook
                const setAttributeFromEvent = (event) => {
                //@ts-ignore
                    script.setAttribute(
                        'data-status',
                        event.type === 'load' ? 'ready' : 'error'
                    );
                };
                script.addEventListener('load', setAttributeFromEvent);
                script.addEventListener('error', setAttributeFromEvent);
            } else {
                // Grab existing script status from attribute and set to state.
                //@ts-ignore
                setStatus(script.getAttribute('data-status'));
            }
            // Script event handler to update status in state
            // Even if the script already exists we still need to add
            // event handlers to update the state for *this* hook instance.
            const setStateFromEvent = (event) => {
                setStatus(event.type === 'load' ? 'ready' : 'error');
            };
            // Add event listeners
            script.addEventListener('load', setStateFromEvent);
            script.addEventListener('error', setStateFromEvent);
            // Remove event listeners on cleanup
            return () => {
                if (script) {
                    script.removeEventListener('load', setStateFromEvent);
                    script.removeEventListener('error', setStateFromEvent);
                }
            };
        },
        [src, containerRef] // Only re-run effect if script src changes
    );
    return status;
}
export default useScript;
