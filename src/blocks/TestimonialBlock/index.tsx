import RichText from "@/components/RichText";
import React from "react";

interface TestimonialProps {
	richText?: {
		[k: string]: unknown;
	  }[];
	alignment?: string;
	author?: string;
	authortitle?: string;
    blockType?: string;

}

function Testimonial({ richText, alignment, author, authortitle  }: TestimonialProps) {

    return (
		<section className="testimonial">
			<div className="quotation">
				<blockquote>
					<RichText content={richText} />
					<div className="testimonialAuthor">
						<p>{author}</p>
						<small>{authortitle}</small>
					</div>
				</blockquote>
			</div>
		</section>
	);
}

export default Testimonial;
