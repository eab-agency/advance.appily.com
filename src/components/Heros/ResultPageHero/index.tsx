'use client'
import React, { useEffect, useState } from 'react'
import { Page, } from '../../../../payload-types'
import { Media } from '../../Media'
import RichText from '../../RichText'
import Lottie from "lottie-react";
import { Button } from "@/components";

export const ResultPageHero: React.FC<Page['hero']> = ({animation, richText, title, links}) => {
const [jsonData, setJsonData] = useState(null);
const renderButton = (link, i) => {
	const href =
		typeof link.reference?.value === 'object' && link.reference.value.slug
			? `/${link.reference.value.slug}`
			: link.url;
	return (
		<Button
			appearance={link.appearance}
			className="button btn-primary"
			href={href}
			label={link.label}
			newTab={link.newTab}
			key={i} />
	)
}

// Fetch JSON data from the URL
useEffect(() => {
	const animationUrl = typeof animation === 'object' && animation.url ? animation.url : '';
	if(animationUrl !== ''){
    fetchJsonData(animationUrl);
	}
  }, []);

  const fetchJsonData = (animationUrl) => {
	fetch(animationUrl)
	.then(response => {
	  if (!response.ok) {
		throw new Error('Network response was not ok');
	  }
	  return response.json();
	})
	.then(data => {
	  setJsonData(data);
	})
	.catch(error => {
	  console.error('Error fetching JSON data:', error);
	});
  }
  
    return (
		<section className="resultsHero">
			<div className="group">
				<div className="heroContent column">
					<div className="intro-title">
						<span>{title}</span>
					</div>
					<div>
					<RichText content={richText} />
					{(links || []).map(({ link }, i) =>
                        renderButton(link, i)
                    )}
					
                </div>
				</div>
				<figure className="column">
					<Lottie animationData={jsonData} loop={true} />
				</figure>
			</div>
		</section>
		
    )
}