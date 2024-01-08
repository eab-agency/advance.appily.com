"use client";
import { useUser } from "@/context/context";
import { statesToMatchAgainst } from "@/helpers/getMatchedSchool";
import isDevMode from "@/helpers/isDevMode";


const LocationInDevMode = () => {
  const { location, setLocation, globalPrivacyControl } = useUser();

  const setInputLocation = selectedLocation => {
    setLocation({ region_iso_code: selectedLocation });
  };
  // only return if isDevMode
  if (!isDevMode()) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "9999",
    backgroundColor: "white",
    padding: "1rem",
  }

  const paragraphStyles: React.CSSProperties = {
    margin: "0",
    padding: "0",
    color: "black",
    fontSize: "0.9rem",
    borderBottom: "1px solid lightgrey",
    paddingBlock: "0.2em",
  }


  return (
    <div style={containerStyles}>
      {location ? (
        <>
          <p style={paragraphStyles}>Region: {location.region_iso_code}</p>
          <p style={paragraphStyles}>Country: {location.country_code}</p>
          <p style={paragraphStyles}>Not US: {location.notUS ? "true" : "false"}</p>
          <p style={paragraphStyles}>
            global privacy set on browser: {globalPrivacyControl ? "yes" : "no"}
          </p>
          <p style={paragraphStyles}>
            Will skip forms:{" "}
            {globalPrivacyControl || location.notUS ? "yes" : "no"}
          </p>
        </>
      ) : (
        <p style={paragraphStyles}>Location: loading...</p>
      )}
      <div style={paragraphStyles}>
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
  );
};

export default LocationInDevMode;
