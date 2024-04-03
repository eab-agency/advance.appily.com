"use client";
import React, { useState, useEffect, ReactElement, Suspense } from "react";
import percentageSplit from "@/lib/percentageSplit";
import { useSearchParams } from "next/navigation";

interface UseRandomComponentProps {
  PercentageComponent: ReactElement;
  FallBackComponent: ReactElement;
}

const RandomComponent = ({ PercentageComponent, FallBackComponent }: UseRandomComponentProps): ReactElement => {
  const searchParams = useSearchParams() || new URLSearchParams();
  const force = searchParams.has("force");
  const [showPercentageComponent, setShowPercentageComponent] = useState(force);

  useEffect(() => {
    let inPercentageRange: boolean | ((prevState: boolean) => boolean);
    if (force) {
      inPercentageRange = true;
    } else {
      inPercentageRange = percentageSplit(0.25);
    }
    console.log("🆎:", inPercentageRange)
    setShowPercentageComponent(inPercentageRange);
  }, [force]);

  return (
    <>{showPercentageComponent ? PercentageComponent : FallBackComponent}</>
  );
};

const useRandomComponent = ({ PercentageComponent, FallBackComponent }: UseRandomComponentProps): ReactElement => {
  const WinningComponent = RandomComponent({ PercentageComponent, FallBackComponent });
   return <Suspense fallback={<>{FallBackComponent}</>}>{WinningComponent}</Suspense>;
};

export default useRandomComponent;
