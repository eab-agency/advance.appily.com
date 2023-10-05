"use client";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

import Form from "@/components/Form";
import SchoolCarousel from "@/components/SchoolCarousel";
import { useUser } from "@/context/context";
import styles from "@/styles/components/CarouselWithForm.module.scss";

const CarouselWithForm = ({ formId = "4" }) => {
	const [visibleForm, setVisibleForm] = useState(false);
	const { user, location, vertical } = useUser();

	const [selectedSchool, setSelectedSchool] = useState(null);

	const onCarouselClick = school => {
		// if location.notUS === true, then redirect to selectedSchool.link
		if (location.notUS) {
			window.open(school.link, "_blank");
		} else {
			setSelectedSchool(school);
			setVisibleForm(!visibleForm);
		}
	};
	return (
		<>
			<section className={styles.matchedSchools}>
				<div className={styles.wrapper}>
					<div className={styles.intro}>
						<h2>Explore Your School Matches</h2>
						<p>
							The following schools offer business programs that could help you
							reach your goals.
						</p>
					</div>

					<div className={styles.container}>
						<SchoolCarousel
							handleClick={school => onCarouselClick(school)}
							className={`${visibleForm ? styles.hide : ""}`}
						/>
					</div>
				</div>
			</section>
			{visibleForm && (
				<div className={styles.carouselForm}>
					<div className={styles.formContentWrapper}>
						<button
							className={styles.closeBtn}
							type="button"
							onClick={() => onCarouselClick()}
						>
							Back{" "}
							<i>
								<RiArrowGoBackFill />
							</i>
						</button>
						<div className={styles.formContent}>
							<div className={styles.intro}>
								{/* <h3>Let's Get Started</h3> */}
								<p>
									Let us know the best way to contact you with helpful
									information and potential college or university matches.
								</p>
							</div>
							<Form
							school={selectedSchool}
							redirectTo={`${selectedSchool.links[0].link.url}?utm_source=appily_advance&utm_campaign=${vertical}}`}
							user={user}
							id={formId || "4"}
						/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CarouselWithForm;
