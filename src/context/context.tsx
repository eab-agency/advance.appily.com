"use client";
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CarouselCard } from "../../payload-types";

import { on } from "events";
import { getMatchedSchool } from "../helpers/getMatchedSchool";

interface UserLocationContextProps {
	matchedSchools: CarouselCard[];
	setMatchedSchools: React.Dispatch<React.SetStateAction<any[]>>;
	location: {
		region_iso_code: string;
		country_code: string;
		notUS: boolean;
	} | null;
	formData: any;
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	utmSource: any;
	setUtmSource: React.Dispatch<React.SetStateAction<any>>;
	setLocation: React.Dispatch<
		React.SetStateAction<{
			region_iso_code: string;
			country_code: string;
			notUS: boolean;
		} | null>
	>;
	vertical: string;
	setVertical: React.Dispatch<React.SetStateAction<string>>;
}

const UserLocationContext = createContext<UserLocationContextProps>(null!);

function ContextProvider({ children }: { children: React.ReactNode }) {
	const [matchedSchools, setMatchedSchools] = useState<any[]>([]);
	const [oneTrust, setOneTrust] = useState<any>(null);

	const [globalPrivacyControl, setGlobalPrivacyControl] = useState(null);

	// check if window.OneTrust is defined and if so, set a listener for the OneTrustUpdated event
	useEffect(() => {
		const handleOneTrustUpdated = () => {
			if (window.OneTrust) {
				setOneTrust(window.OneTrust);
			}
		};

		if (typeof window !== "undefined") {
			if (window.OneTrust) {
				setOneTrust(window.OneTrust);
			} else {
				window.addEventListener("OneTrustUpdated", handleOneTrustUpdated);
			}
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("OneTrustUpdated", handleOneTrustUpdated);
			}
		};
	}, []);

	useEffect(() => {
		if (
			typeof navigator !== "undefined" &&
			"globalPrivacyControl" in navigator
		) {
			setGlobalPrivacyControl(navigator.globalPrivacyControl);
		}
	}, []);

	// Uncomment the below to simulate a 4XX error when making a GET request to apiURL
	// Create a new instance of axios mock
	// const mock = new MockAdapter(axios);
	// console.log(
	//     '🐛🐛🐛🐛 MockAdapter: Simulating a 4XX error for GET request to',
	//     apiURL
	// );
	// mock.onGet(apiURL).reply(416, { error: 'Bad Request' });

	// const [location, setLocation] = useLocalStorage('489hLocation', null);
	const [location, setLocation] = useState<{
		region_iso_code: string;
		country_code: string;
		notUS: boolean;
	} | null>({
		region_iso_code: "VA",
		country_code: "US",
		notUS: false,
	});

	const [formData, setFormData] = useState<any>(null);

	const [utmSource, setUtmSource] = useState<any>(null);

	const [vertical, setVertical] = useState<string>("Business");

	// check oneTrust.getGeolocation(), that returns an object of { country: 'US', region: 'CA' }, and set location
	useEffect(() => {
		if (oneTrust) {
			const { country, region } = oneTrust.getGeolocationData();
			setLocation({
				region_iso_code: region,
				country_code: country,
				notUS: country !== "US",
			});
		}
	}, [oneTrust, setLocation]);

	// wait for userLocation to be populated and then set matchedSchool based on userLocation.region_iso_code
	useEffect(() => {
		const fetchData = async () => {
			if (location) {
				const matchedSchoolInternal = await getMatchedSchool(
					location?.region_iso_code,
					vertical,
				);
				// console.log(
				// 	"🚀 ~ file: context.tsx:116 ~ fetchData ~ matchedSchoolInternal:",
				// 	matchedSchoolInternal,
				// );
				// grab first school from schools and set matchedSchool
				setMatchedSchools(matchedSchoolInternal);
			}
		};

		fetchData();
	}, [location, vertical]);

	const valueUser = useMemo(
		() => ({
			matchedSchools,
			setMatchedSchools,
			location,
			formData,
			setFormData,
			utmSource,
			setUtmSource,
			setLocation,
			vertical,
			setVertical,
			globalPrivacyControl,
		}),
		[
			matchedSchools,
			setMatchedSchools,
			location,
			formData,
			setFormData,
			utmSource,
			setUtmSource,
			setLocation,
			vertical,
			setVertical,
			globalPrivacyControl,
		],
	);

	return (
		<UserLocationContext.Provider value={valueUser}>
			{children}
		</UserLocationContext.Provider>
	);
}

function useUser() {
	const context = useContext(UserLocationContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a ContextProvider");
	}
	return context;
}

export { ContextProvider, useUser };
