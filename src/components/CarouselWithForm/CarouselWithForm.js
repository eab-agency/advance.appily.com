"use client";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

import Form from "@/components/Form";
import SchoolCarousel from "@/components/SchoolCarousel";
import { useUser } from "@/context/context";
import styles from "@/styles/components/CarouselWithForm.module.scss";
import RichText from "../RichText";

const CarouselWithForm = ({
  blockName,
  title,
  richText,
  formId = "4",
  collectData = false,
}) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const { user, location, vertical, globalPrivacyControl } = useUser();

  const [selectedSchool, setSelectedSchool] = useState(null);

  const onCarouselClick = (school) => {
    const shouldOpenInNewTab = location.notUS || globalPrivacyControl || !collectData;
  
    if (shouldOpenInNewTab) {
      const url = school.links[0].link.url;
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        console.error("Invalid URL");
      }
    } else {
      setSelectedSchool(school);
      setVisibleForm(!visibleForm);
    }
  };

  const sectionId = () => {
    // prevent errors if blockName is not defined
    if (!blockName) {
      return "";
    }
    let theBlockName = blockName.replace(/\s+/g, "-").toLowerCase();
    return theBlockName;
  };

  return (
    <>
      <section className={`${styles.matchedSchools} school-carousel`} id={sectionId()}>
        <div className={styles.wrapper}>
          <div className={styles.intro}>
            <h2>{title ? title : "Explore Your School Matches"}</h2>
            <RichText content={richText} />
          </div>

          <div className={styles.container}>
            <SchoolCarousel
              handleClick={(school) => onCarouselClick(school)}
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
                redirectTo={`${selectedSchool.links[0].link.url}?utm_source=appily_advance&utm_campaign=${vertical}`}
                user={user}
                id={formId}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarouselWithForm;
