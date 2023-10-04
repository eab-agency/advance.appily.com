import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const vertical = searchParams.get("vertical");

		const dataDirectory = path.resolve(process.cwd(), "src/data");
		const filePath = path.join(dataDirectory, `quiz-${vertical}.json`);

		const fileContents = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(fileContents);

		return new Response(JSON.stringify(data));
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
