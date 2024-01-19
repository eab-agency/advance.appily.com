import React from "react";

interface TestimonialProps {
	testimonialData: TestimonialData;
}

interface TestimonialData {
	text: string;
	author: string;
	authorTitle?: string;
}

function Testimonial({ testimonialData }: TestimonialProps) {
	return (
		<section className="testimonial">
			<div className="quotation">
				<blockquote>
					<div
						className="testimonialText"
						dangerouslySetInnerHTML={{ __html: testimonialData.text }}
					/>
					<div className="testimonialAuthor">
						<p>{testimonialData.author}</p>
						<small>{testimonialData.authorTitle}</small>
					</div>
				</blockquote>
			</div>
		</section>
	);
}

export default Testimonial;
