import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
	// Find the absolute path of the data directory
	const vertical = req.query.vertical;
	const dataDirectory = path.join(process.cwd(), "src/data");
	// Read the json data file data.json
	const fileContents = await fs.readFile(
		`${dataDirectory}/quiz-${vertical}.json`,
		"utf8",
	);
	// Parse the JSON string into an object
	const data = JSON.parse(fileContents);
	// Extract the question number from the request query parameters
	const { questionNumber } = req.query;
	// Find the index of the question with the specified number in the questions array
	const questionIndex = data.questions[questionNumber];
	// If the question is found, return its index in json format. Otherwise, return a 404 error
	if (questionIndex !== -1) {
		res.status(200).json(questionIndex);
	} else {
		res.status(404).json({
			message: `Question ${questionNumber} not found`,
		});
	}
}
