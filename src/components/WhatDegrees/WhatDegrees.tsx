import { Accordion } from "@/components";
import React from 'react'

interface WhatDegreesProps {
  whatDegreesData: WhatDegreesData;
}

interface WhatDegreesData {
  title: string;
  description: string;
  degrees: Degree[];
}

interface Degree {
  title: string;
  content: string;
}

function WhatDegrees({ whatDegreesData }: WhatDegreesProps) {

  return (
    <section className="whatDegrees">
      <div className="group column">
        <div className="intro-text">
          <h2 dangerouslySetInnerHTML={{ __html: whatDegreesData.title }} />
          <p>{whatDegreesData.description}</p>
        </div>
        <div className="accordionGroup">
          {whatDegreesData.degrees.map(degree => (
            <Accordion title={degree.title}>
              <div dangerouslySetInnerHTML={{ __html: degree.content }} />
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatDegrees;

