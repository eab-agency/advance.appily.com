// components/AWSRumInitializer.tsx
"use client";

import { initializeAWSRum } from "@/utilities/initializeAWSRum";
import { useEffect } from "react";

const AWSRumInitializer = () => {
  useEffect(() => {
    initializeAWSRum();
  }, []);

  return null; // This component doesn't render anything visible
};

export default AWSRumInitializer;
