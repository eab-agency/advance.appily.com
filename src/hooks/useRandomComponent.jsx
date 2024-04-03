"use client";
import React, { useState, useEffect } from "react";
import percentageSplit from "@/lib/percentageSplit";
import { useSearchParams } from "next/navigation";

const useRandomButton = ({ ButtonOne, ButtonTwo }) => {
  const searchParams = useSearchParams();
  const force = searchParams.has("force");
  const [showButtonOne, setShowButtonOne] = useState(force);

  useEffect(() => {
    let inPercentageRange;
    if (force) {
      inPercentageRange = true;
    } else {
      inPercentageRange = percentageSplit(0.25);
    }
    setShowButtonOne(inPercentageRange);
  }, [force]);

  return <>{showButtonOne ? ButtonOne : ButtonTwo}</>;
};

export default useRandomButton;
