"use client";
import React, { useState, useEffect, ReactElement, Suspense } from "react";
import percentageSplit from "@/lib/percentageSplit";
import { useSearchParams } from "next/navigation";

interface RandomComponentProps {
  PercentageComponent: ReactElement;
  FallBackComponent: ReactElement;
}

const RandomComponent = ({ PercentageComponent, FallBackComponent }: RandomComponentProps) => {
  const searchParams = useSearchParams() || new URLSearchParams();
  const force = searchParams.has("force");
  const [showPercentageComponent, setShowPercentageComponent] = useState(force);

  useEffect(() => {
    let inPercentageRange: boolean | ((prevState: boolean) => boolean);
    if (force) {
      inPercentageRange = true;
    } else {
      inPercentageRange = percentageSplit();
    }
    console.log("🆎:", inPercentageRange)
    setShowPercentageComponent(inPercentageRange);
  }, [force]);

  return (
    <Suspense fallback={<>{FallBackComponent}</>}>
      {showPercentageComponent ? PercentageComponent : FallBackComponent}
    </Suspense>
  );
};

export default RandomComponent;