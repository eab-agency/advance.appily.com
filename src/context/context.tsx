"use client";
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import type { CarouselCard } from "../../payload-types";

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

	const [cookies, setCookies] = useCookies(["initialData"]);

	const apiURL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_API_KEY}&fields=region_iso_code,country_code`;

	const [globalPrivacyControl, setGlobalPrivacyControl] = useState(null);

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
	} | null>(null);

	const [formData, setFormData] = useState<any>(null);

	const [utmSource, setUtmSource] = useState<any>(null);

	const [apiRequestMade, setApiRequestMade] = useState<boolean>(false);

	const [vertical, setVertical] = useState<string>("business");

	useEffect(() => {
		// Check if the initial data is already stored in cookies
		const { initialData } = cookies;

		if (initialData) {
			// Use the initial data from cookies instead of hitting the api
			setLocation(initialData);
		} else if (!apiRequestMade) {
			// Only make the API request if it hasn't been made yet
			setApiRequestMade(true);
			fetch(apiURL)
				.then(response => response.json())
				.then(data => {
					const { region_iso_code, country_code } = data;
					// Store the initial data in cookies
					const initialResponseData = {
						region_iso_code,
						country_code,
						notUS: country_code !== "US",
					};
					setLocation(initialResponseData);
					setCookies("initialData", initialResponseData);
				})
				.catch(error => {
					// Handle the error here
					console.log("API Error:", error);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiURL, setLocation, setCookies]);

	// wait for userLocation to be populated and then set matchedSchool based on userLocation.region_iso_code
	useEffect(() => {
		const fetchData = async () => {
			if (location) {
				const matchedSchoolInternal = await getMatchedSchool(
					location?.region_iso_code,
				);
				// grab first school from schools and set matchedSchool
				setMatchedSchools(matchedSchoolInternal);
			}
		};

		fetchData();
	}, [location]);

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
