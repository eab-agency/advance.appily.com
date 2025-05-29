import MainLogo from "@/components/Header/MainLogo";
import Image from "next/image";
import React from "react";

interface WhatIsCappexProps {
  children?: React.ReactNode;
}

export default function WhatIsCappex({ children }: WhatIsCappexProps) {
  return (
    <section className="whatIsCappex column">
      <div className="group row center-aligned cols-2">
        <div className="column">
          <figure>
            <Image
              src="/images/what-is-appily.jpg"
              width={480}
              height={480}
              alt="What is Cappex"
              className="highlighted-img"
            />
          </figure>
        </div>
        <div className="column">
          <h2>
            <MainLogo />
            Find Your Path, Plan Your Future,{" "}
            <strong>Advance with Confidence</strong>
          </h2>
          <p>
            Appily Advance is a comprehensive platform designed to help you take
            the next step in your education and career. Whether you&apos;re
            completing a degree or exploring new opportunities, our career
            quizzes provide insights into paths that align with your skills and
            interests. With personalized resources and degree planning tools,
            you can map out your goals and find programs that support your
            aspirations—so you can move forward with confidence.
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}
