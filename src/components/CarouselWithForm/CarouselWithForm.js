"use client";
import { useState } from "react";

import SchoolCarousel from "@/components/SchoolCarousel";
import { useUser } from "@/context/context";
import styles from "@/styles/components/CarouselWithForm.module.scss";
import RichText from "../RichText";

const CarouselWithForm = ({
  blockType,
  blockName,
  title,
  richText,
  carouselBackgroundColor,
  formId = "4",
  collectData = true,
}) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const { user, location, vertical, globalPrivacyControl } = useUser();

  const onCarouselClick = (school) => {
    if (location.notUS || globalPrivacyControl || !collectData) {
      window.open(school.links[0].link.url, "_blank");
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
      <section className={styles.matchedSchools} id={sectionId()}>
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
    </>
  );
};

export default CarouselWithForm;
