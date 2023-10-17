import { promises as fs } from "fs";
import path from "path";

export async function fetchQuizData(vertical) {
	try {
		const dataDirectory = path.resolve(process.cwd(), "src/data");
		const filePath = path.join(dataDirectory, `quiz-${vertical}.json`);

		const fileContents = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(fileContents);

		return data;
	} catch (error) {
		throw new Error("Internal Server Error");
	}
}
