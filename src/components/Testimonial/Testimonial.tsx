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
}

function Testimonial({ testimonialData }: TestimonialProps) {
	return (
		<section className="testimonial">
			<div className="quotation">
				<blockquote>
					<RichText content={testimonialData.richText} />
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
