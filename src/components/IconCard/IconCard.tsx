import Image from "next/image";
import React from "react";

export const IconCard: React.FC<{
  alignItems?: "center";
  className?: string;
  title?: string;
  children?: React.ReactNode;
  iconUrl?: string;
  iconAlt?: string;
}> = props => {
  const { title: titleFromProps, className, children, iconUrl, iconAlt } = props;


  return (
    <div className={`${className && className} icon-card`}>
      <header className="icon-card-head">
        <Image
          src={iconUrl ?? ""}
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



