'use client';
import styles from '@/styles/components/Error.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/* eslint-disable no-nested-ternary */
function NotFound() {
  const [isLightMode, setIsLightMode] = useState(false);
  const statusCode = 404;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    setIsLightMode(mediaQuery.matches);

    const handleMediaQueryChange = (e) => setIsLightMode(e.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () =>
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  const errorImg =
    statusCode === 404
      ? isLightMode
        ? '/images/404-street-light.svg'
        : '/images/404-street-dark.svg'
      : isLightMode
        ? '/images/error-street-light.svg'
        : '/images/error-street-dark.svg';

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <figure>
            <Image
              src={errorImg}
              alt="404"
              width={300}
              height={300}
            />
          </figure>
          <div className={styles.content}>
            <div className={styles.intro}>
              <h1>Oops! Page not found.</h1>
            </div>
            <p>
              Do not worry, you can visit{' '}
              <a
                href="https://advance.appily.com"
                target="_blank"
                rel="noreferrer"
              >
                advance.appily.com
              </a>{' '}
              to start over and explore all the great resources we
              offer for students interested in health care.
            </p>
            <small>
              {`An error ${statusCode} occurred. Page not found.`}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
