import { Button } from "@/components";
import styles from "@/styles/components/AdcResultsHero.module.scss";
import { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Use Lottie in your component
interface Props {
  data: {
    title: string;
    result: string;
    detailedDescription: string;
    needHelpTitle: string;
    needHelpCtaLabel: string;
    needHelpCtaLink: string;
  };
  animationData: any;
  animationState?: (animationState: boolean) => void;
}

export default function ReadynessResultsHero({
  data,
  animationData,
  animationState,
}: Props) {
  const lottieRef = useRef<LottieType | null>(null);
  const adcResultDescription = useRef(null);
  const adcResult = useRef(null);
  const [animationStateValue, setAnimationStateValue] = useState(false);

  // destructure data
  const {
    title,
    result,
    detailedDescription,
    needHelpTitle,
    needHelpCtaLabel,
    needHelpCtaLink,
  } = data;

  const handleLoaded = () => {
    // timer to show the result once the animation is loaded
    setTimeout(() => {
      if (adcResultDescription.current) {
        (adcResultDescription.current as HTMLDivElement).style.opacity = "1";
      }

      if (adcResult.current) {
        (adcResult.current as HTMLDivElement).style.opacity = "1";
      }

      handleComplete();
    }, 4000);
  };

  useEffect(() => {
    animationState?.(animationStateValue);
  }, [animationState, animationStateValue]);

  const handleComplete = () => {
    setAnimationStateValue(true);
  };

  return (
    <section className={`${styles.adcResultsHero} column`}>
      <h1 className={styles.adcResultsTitle}>
        {title}
        <strong className={`${styles.theResult}`} ref={adcResult}>
          {result}
        </strong>
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
      <div
        id="adcResult"
        ref={adcResultDescription}
        className={`${styles.theResultDescription}`}
      >
        <div className="resultsDescription">
          <div
            className={`${styles.detailedDescription}`}
            dangerouslySetInnerHTML={{ __html: detailedDescription }}
          />
          <div className={styles.needHelpCta}>
            <h2>{needHelpTitle}</h2>
            <Button
              label={needHelpCtaLabel}
              appearance="primary"
              href={needHelpCtaLink}
              className="button btn-primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type LottieType = LottieRefCurrentProps & {
  getDuration: () => number;
};
