import { promises as fs } from "fs";
import path from "path";

export async function fetchQuizResult(vertical, slug) {
	try {
		if (!slug) {
			throw new Error("Slug not provided");
		}

		const dataDirectory = path.resolve(process.cwd(), "data");
		const filePath = path.join(dataDirectory, `/results-${vertical}.json`);
		console.log(
			"🚀 ~ file: fetchQuizResults.ts:17 ~ fetchQuizResult ~ filePath:",
			filePath,
		);
		const fileContents = await fs.readFile(filePath, "utf8").catch(error => {
			throw new Error(`Error reading file: ${error.message}`);
		});

		const data = JSON.parse(fileContents);

		const { results } = data;

		const filteredResults = results.filter(
			result => result.slug === slug.toLowerCase(),
		);
		if (filteredResults.length === 0) {
			throw new Error("Result not found");
		}

		return filteredResults[0];
	} catch (error) {
		console.error(error); // Log the error for troubleshooting purposes
		throw new Error("Internal Server Error");
	}
}
