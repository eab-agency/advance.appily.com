import MainLogo from "@/components/Header/MainLogo";
import Stats from "@/components/Stats/Stats";
import Image from 'next/image'
import React from 'react'

export default function WhatIsCappex({ children }) {
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
            An All-in-One Resource for <strong>Going to College</strong>
          </h2>
          <p>
            Appily is the future of higher education guidance, uniting trusted
            tools that have empowered students for almost two decades. Born
            from respected platforms including Cappex, Concourse, YouVisit, and
            College Greenlight, Appily offers a seamless experience for
            students of all ages on their journey to college.{" "}
          </p>
          <p>
            Discover your ideal career path, make a plan to reach your
            academic and professional goals, and match with colleges that can
            help you get there—all in one place. Take the next step in
            achieving your academic goals with confidence.
          </p>
        </div>
      </div>
      {children}
    </section>
  )
}
