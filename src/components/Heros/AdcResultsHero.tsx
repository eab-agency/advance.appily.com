import styles from '@/styles/components/AdcResultsHero.module.scss';
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef, useState } from 'react';


export default function AdcResultsHero({ data, animationData }) {
  const lottieRef = useRef<LottieType | null>(null);
  const adcResultDescription = useRef(null);
  const adcResult = useRef(null);

  // const [duration, setDuration] = useState(0);

  // destructure data
  const { title, result, detailedDescription } = data;

  const handleLoaded = () => {

    setTimeout(() => {
      if (adcResultDescription.current) {
        (adcResultDescription.current as HTMLDivElement).classList.toggle("hide");
      }

      if (adcResult.current) {
        (adcResult.current as HTMLDivElement).classList.toggle("hide");
      }
    }, 4000);

  }


  return (
    <section className={`${styles.adcResultsHero} column`}>
      <h1 className={styles.adcResultsTitle}>
        {title}
        <strong className='hide' ref={adcResult}>{result}</strong>
      </h1>

      <figure className={`${styles.animation} `}>
        <Lottie
          animationData={animationData}
          loop={false}
          // onComplete={handleComplete}
          lottieRef={lottieRef}
          onDOMLoaded={handleLoaded}
        />
      </figure>
      <div id="adcResult" ref={adcResultDescription} className={`${styles.theResult} hide`}>
        <div
          className="resultsDescription"
          dangerouslySetInnerHTML={{ __html: detailedDescription }}
        />
      </div>
    </section>
  )
}

type LottieType = LottieRefCurrentProps & {
  getDuration: () => number;
}
