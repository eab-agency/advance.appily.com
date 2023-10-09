import {
	fetchCarouselCards,
	fetchReaminingCarouselCards,
} from "../app/graphql";

// import CarouselCard type from payload-types.ts
import type { CarouselCard, Media, Partner } from "../../payload-types";

type statesToMatchAgainst = {
	[key: string]: string[];
};

const statesToMatchAgainst: statesToMatchAgainst = {
	AL: ["AL", "FL", "GA", "MS", "TN"],
	AK: ["AK", "CA", "HI", "OR", "WA"],
	AZ: ["AZ", "CA", "CO", "NV", "NM", "UT"],
	AR: ["AR", "LA", "MS", "MO", "OK", "TN", "TX"],
	CA: ["CA", "AZ", "NV", "OR"],
	CO: ["CO", "AZ", "KS", "NE", "NM", "OK", "UT", "WY"],
	CT: ["CT", "MA", "NY", "RI"],
	DE: ["DE", "MD", "NJ", "PA"],
	FL: ["FL", "AL", "GA", "MS", "SC"],
	GA: ["GA", "AL", "FL", "NC", "SC", "TN"],
	HI: ["HI", "AK", "CA", "OR", "WA"],
	ID: ["ID", "MT", "NV", "OR", "UT", "WA", "WY"],
	IL: ["IL", "IN", "IA", "MI", "KY", "MO", "WI"],
	IN: ["IN", "IL", "KY", "MI", "OH"],
	IA: ["IA", "IL", "MN", "MO", "NE", "SD", "WI"],
	KS: ["KS", "CO", "MO", "NE", "OK"],
	KY: ["KY", "IL", "IN", "MO", "OH", "TN", "VA", "WV"],
	LA: ["LA", "AR", "MS", "TX"],
	ME: ["VT", "MA", "NH", "NY", "RI", "CT"],
	MD: ["MD", "DE", "PA", "VA", "WV"],
	MA: ["MA", "CT", "NH", "NY", "RI", "VT"],
	MI: ["MI", "IL", "IN", "MN", "OH", "WI"],
	MN: ["MN", "IA", "MI", "ND", "SD", "WI", "IL"],
	MS: ["MS", "AL", "AR", "LA", "TN"],
	MO: ["MO", "AR", "IL", "IA", "KS", "KY", "NE", "OK", "TN"],
	MT: ["MT", "ID", "ND", "SD", "WY", "WA", "OR", "NE"],
	NE: ["NE", "CO", "IA", "KS", "MO", "SD", "WY"],
	NV: ["NV", "AZ", "CA", "ID", "OR", "UT"],
	NH: ["VT", "MA", "NH", "NY", "RI", "CT"],
	NJ: ["NJ", "DE", "NY", "PA"],
	NM: ["NM", "AZ", "CO", "OK", "TX", "UT"],
	NY: ["NY", "CT", "MA", "NJ", "PA", "RI", "VT"],
	NC: ["NC", "GA", "SC", "TN", "VA"],
	ND: ["ND", "MN", "SD", "IA", "WI", "WY", "NE"],
	OH: ["OH", "IN", "KY", "MI", "PA", "WV"],
	OK: ["OK", "AR", "CO", "KS", "MO", "NM", "TX"],
	OR: ["OR", "CA", "ID", "NV", "WA"],
	PA: ["PA", "DE", "MD", "NJ", "NY", "OH", "WV"],
	RI: ["RI", "CT", "MA", "NY"],
	SC: ["NC", "GA", "SC", "TN", "VA"],
	SD: ["ND", "MN", "SD", "IA", "WI", "WY", "NE"],
	TN: ["TN", "AL", "AR", "GA", "KY", "MS", "MO", "NC", "VA"],
	TX: ["TX", "AR", "LA", "NM", "OK"],
	UT: ["UT", "AZ", "CO", "ID", "NV", "NM", "WY"],
	VT: ["VT", "MA", "NH", "NY", "RI", "CT"],
	VA: ["VA", "KY", "MD", "NC", "TN", "WV"],
	WA: ["WA", "ID", "OR", "CA", "MT"],
	WV: ["WV", "KY", "MD", "OH", "PA", "VA"],
	WI: ["WI", "IA", "IL", "MI", "MN"],
	WY: ["WY", "CO", "ID", "MT", "NE", "SD", "ND", "UT"],
	DC: ["DC", "MD", "VA", "WV", "PA", "DE"],
};

// function that checks region_iso_code and returns a school if matched from .schools.associatedStates otherwise returns the first school from schools
export const getMatchedSchool = async (
	state?: string,
): Promise<CarouselCard[]> => {
	// const response = await fetch('/api/quiz/schools')
	// const { data: schools, error }: { data: School[]; error?: string } = await response.json()
	// match incoming state to the statesToMatchAgainst key/value to pass to fetchCarouselCards
	const arrayOfStates: string[] | undefined = state
		? statesToMatchAgainst[state]
		: undefined;

	const cards: CarouselCard[] = await fetchCarouselCards(
		arrayOfStates || ["VA", "KY", "MD", "NC", "TN", "WV"],
	);

	// if cards is less than 5 then await fetchAllCards and append the results
	if (cards.length < 5) {
		const allCards: CarouselCard[] = await fetchReaminingCarouselCards(
			arrayOfStates,
		);
		return shuffleArray([...cards, ...allCards]).slice(0, 5);
	}

	// if there is an error or no schools, return null
	if (!cards) {
		return [];
	}

	return shuffleArray(cards).slice(0, 5);
};

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
	const newArr = [...array];
	for (let i = newArr.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
	}
	return newArr;
};
