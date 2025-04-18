'use client'
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

interface AccordionProps {
  className?: string;
  title: string;
  titleLevel?: "h2" | "h3" | "h4" | "h5";
  children: React.ReactNode;
}

export const Accordion = ({ className = "", title, titleLevel, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const TitleTag = titleLevel || "h3";

  return (
    <div className={`grid grid-cols-1 border border-brand-orange rounded-md overflow-hidden ${className}`}>
      <TitleTag className="w-full m-0 relative z-1">
        <button
          className="grid grid-cols-[1fr_auto] justify-between items-center w-full text-left py-3 px-4 font-semibold focus:outline-none focus:ring-2 focus:inner-ring-brand-teal cursor-pointer hover:bg-brand-orange-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {title}
          <IoChevronDownSharp
            className={`transition-transform duration-300 text-brand-darkteal ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </TitleTag>
      <div
        className={`grid transition-all duration-300 bg-[#FDF4E8] relative ${
          isOpen ? "mt-0 z-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 -mt-12 z-0"
        }`}
      >
        <div className="overflow-hidden py-fluid-lg px-fluid-xl w-[95%] mx-auto border-t border-brand-orange">{children}</div>
      </div>
    </div>
  );
};
