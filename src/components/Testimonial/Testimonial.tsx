import React from 'react'

interface TestimonialProps {
  testimonialData: TestimonialData;
}

interface TestimonialData {
  text: string;
  author: string;
  authorTitle: string;
}


function Testimonial({ testimonialData }: TestimonialProps) {

  return (
    <section className="testimonial">
      <div className="quotation">
        <blockquote>
          <p>{testimonialData.text}</p>
          <div className="testimonialAuthor">
            <p>{testimonialData.author}</p>
            <small>{testimonialData.authorTitle}</small>
          </div>
        </blockquote>
      </div>
    </section>
  )
}

export default Testimonial;
