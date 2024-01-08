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

	const styles = {
		position: "fixed",
		top: "0",
		left: "0",
		zIndex: "9999",
		backgroundColor: "white",
		padding: "1rem",
	};

	return (
		<div style={styles}>
			{location ? (
				<>
					<p>Region: {location.region_iso_code}</p>
					<p>Country: {location.country_code}</p>
					<p>Not US: {location.notUS ? "true" : "false"}</p>
					<p>
						global privacy set on browser: {globalPrivacyControl ? "yes" : "no"}
					</p>
					<p>
						Will skip forms:{" "}
						{globalPrivacyControl || location.notUS ? "yes" : "no"}
					</p>
				</>
			) : (
				<p>Location: loading...</p>
			)}
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
	);
};

export default LocationInDevMode;
