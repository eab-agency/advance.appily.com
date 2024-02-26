'use client';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
// import React from "react";
import React, { useEffect, useState } from "react";


export const IconCard: React.FC<{
  alignItems?: "center";
  className?: string;
  title?: string;
  children?: React.ReactNode;
  iconUrl?: string | StaticImport;
  darkMode?: boolean;
  iconAlt?: string;
}> = props => {
  const { title: titleFromProps, className, children, iconUrl, darkMode, iconAlt } = props;


  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  }, []);

  const iconSrc = themeMode === "dark" && darkMode ? (iconUrl as string)?.replace?.(".svg", "-dark.svg") : iconUrl ?? "";

  return (
    <div className={`${className && className} icon-card`}>
      <header className="icon-card-head">
        <Image
          src={iconSrc}
          width={480}
          height={480}
          alt={iconAlt ?? ""}
        />
        {titleFromProps && <h3 className="icon-card-title">{titleFromProps}</h3>}
      </header>
      {children && (
        <div className="card-content">
          {children}
        </div>)}
    </div>
  );
};



