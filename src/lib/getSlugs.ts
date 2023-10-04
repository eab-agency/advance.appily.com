export async function getSlugs(vertical: string) {
	const res = await fetch(
		process.env.NEXT_PUBLIC_APP_URL + `/api/quiz/slugs?vertical=${vertical}`,
	);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}
	const data = await res.json();

	const transformedData = data.map(({ slug, title }) => ({
		href: slug,
		label: title,
	}));
	return transformedData;
}
