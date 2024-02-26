"use client";
import { useUser } from "@/context/context";
import { statesToMatchAgainst } from "@/helpers/getMatchedSchool";
import isDevMode from "@/helpers/isDevMode";

import styles from "@/styles/components/LocationScoreDev.module.scss";

const LocationInDevMode = () => {
  const { location, setLocation, globalPrivacyControl } = useUser();

  const setInputLocation = selectedLocation => {
    setLocation({ region_iso_code: selectedLocation });
  };
  // only return if isDevMode
  if (!isDevMode()) {
    return null;
  }

  // open the dev info box

  const openDevInfoBox = () => {
    const devInfoBox = document.querySelector("#devInfoBox");
    if (devInfoBox) {
      devInfoBox.classList.toggle(styles.open);
    }
  };


  return (
    <div id="devInfoBox" className={styles.containerStyles}>
      <button type="button" className={styles.devBoxOpener} onClick={() => openDevInfoBox()}>Dev Info Box</button>
      <div className={styles.devInfoContainer}>

        {location ? (
          <>
            <p>Region: <span className={styles.locationValue}>{location.region_iso_code}</span></p>

            <p>Country: <span className={styles.locationValue}>{location.country_code}</span></p>

            <p>Not US: <span className={styles.locationValue}>{location.notUS ? "true" : "false"}</span></p>

            <p>
              Global privacy set on browser: <span className={styles.locationValue}>{globalPrivacyControl ? "yes" : "no"}</span>
            </p>

            <p>
              Will skip forms: <span className={styles.locationValue}>
                {globalPrivacyControl || location.notUS ? "yes" : "no"}
              </span>
            </p>
          </>
        ) : (
          <p>Location: loading...</p>
        )}
        <div className={styles.selectState}>
          <label htmlFor="location">Change Location:</label>
          <select id="location" onChange={e => setInputLocation(e.target.value)}>
            <option value="">Select a state</option>
            {/* iterated through the statesToMatchAgainst object for each option */}
            {Object.keys(statesToMatchAgainst).map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
};

export default LocationInDevMode;
