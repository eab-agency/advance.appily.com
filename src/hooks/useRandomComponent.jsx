"use client";
// Not really a hook. Needs to move.
import React, { useState, useEffect } from "react";
import percentageSplit from "@/lib/percentageSplit";

const RandomButton = ({ ButtonOne, ButtonTwo }) => {
  const [showButtonOne, setShowButtonOne] = useState(false);

  useEffect(() => {
    const inPercentageRange = percentageSplit(25);
    console.log("🚀:", inPercentageRange);
    setShowButtonOne(inPercentageRange);
  }, []);

  return <>{showButtonOne ? ButtonOne : ButtonTwo}</>;
};

export default RandomButton;
