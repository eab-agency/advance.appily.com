import React from "react";
import RichText from "../RichText";

interface TestimonialProps {
  testimonialData: TestimonialData;
}

interface TestimonialData {
  richText?: {
    [k: string]: unknown;
  }[];
  alignment?: string;
  author?: string;
  authortitle?: string;
  text?: string; //Note Andrei: this prop was added to solve the issue for static pages. Once all pages are dynamic, this prop can be removed.
}

function Testimonial({ testimonialData }: TestimonialProps) {
  return (
    <section className="testimonial">
      <div className="quotation">
        <blockquote>
          {testimonialData.text ? <div dangerouslySetInnerHTML={{ __html: testimonialData.text }} /> :
            <RichText content={testimonialData.richText} />
            //Note Andrei: this prop was added to solve the issue for static pages. Once all pages are dynamic, this prop can be removed.
          }

          {/* //Note Andrei this should be render when all pages are dynamic <RichText content={testimonialData.richText} /> */}

          <div className="testimonialAuthor">
            <p>{testimonialData.author}</p>
            <small>{testimonialData.authortitle}</small>
          </div>
        </blockquote>
      </div>
    </section>
  );
}

export default Testimonial;
