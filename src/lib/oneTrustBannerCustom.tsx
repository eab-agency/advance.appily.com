'use client'
import { useEffect } from 'react'

export const OneTrustBannerCustom = () => {

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // check if the dark filter is added to the DOM
          const addedNode = Array.from(mutation.addedNodes).find(
            (node) => node instanceof HTMLElement && node.matches('.onetrust-pc-dark-filter')
          );
          const pageBody = document.querySelector('body')
          const pageHtml = document.querySelector('html')
          if (addedNode) {
            observer.disconnect(); // Stop observing to prevent unnecessary checks

            addedNode.addEventListener('click', () => {
              window.OneTrust.Close();
              pageBody?.attributes.removeNamedItem('style');
              pageHtml?.attributes.removeNamedItem('style');
            })

          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true })


    return () => {
      observer.disconnect();
    };
  }, []);

  return null
}
