'use client';

import { Media } from "@/components/Media";
import React, { useEffect, useState } from "react";

export const Icon = ({ icon, darkicon }) => {

  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  }, []);

  const iconSrc = themeMode === "dark" && darkicon ? darkicon : icon ?? "";

  return (
    <Media
      resource={iconSrc}
      priority
      width={480}
      height={480}
      alt={iconSrc?.alt ?? ""}
    />
  )
}
