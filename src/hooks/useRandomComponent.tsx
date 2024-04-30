"use client";
import React, { useState, useEffect, ReactElement, Suspense } from "react";
import percentageSplit from "@/lib/percentageSplit";
import { useSearchParams } from "next/navigation";

interface UseRandomComponentProps {
  PercentageComponent: ReactElement;
  FallBackComponent: ReactElement;
  percentage?: number;
}

const RandomComponent = ({
  PercentageComponent,
  FallBackComponent,
  percentage = 100,
}: UseRandomComponentProps): ReactElement => {
  const searchParams = useSearchParams() || new URLSearchParams();
  const force = searchParams.has("force");
  const [showPercentageComponent, setShowPercentageComponent] = useState(force);

  useEffect(() => {
    let inPercentageRange: boolean | ((prevState: boolean) => boolean);
    if (force) {
      inPercentageRange = true;
    } else {
      inPercentageRange = percentageSplit(percentage);
    }
    console.log("🆎:", inPercentageRange);
    setShowPercentageComponent(inPercentageRange);
  }, [force, percentage]);

  return (
    <>{showPercentageComponent ? PercentageComponent : FallBackComponent}</>
  );
};

const useRandomComponent = ({
  PercentageComponent,
  FallBackComponent,
  percentage,
}: UseRandomComponentProps): ReactElement => {
  const WinningComponent = RandomComponent({
    PercentageComponent,
    FallBackComponent,
    percentage,
  });
  return (
    <Suspense fallback={<>{FallBackComponent}</>}>{WinningComponent}</Suspense>
  );
};
export default useRandomComponent;
