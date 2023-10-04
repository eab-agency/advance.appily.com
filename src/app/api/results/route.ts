import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const vertical = searchParams.get("vertical");
		const slug = searchParams.get("slug");
		if (!slug) {
			return new Response(JSON.stringify({ error: "Slug not provided" }), {
				status: 400,
			});
		}
		const dataDirectory = path.resolve(process.cwd(), "src/data");
		const filePath = path.join(dataDirectory, `results-${vertical}.json`);

		console.log("🚀 ~ file: route.ts:17 ~ GET ~ filePath:", filePath);
		const fileContents = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(fileContents);
		console.log("🚀 ~ file: route.ts:20 ~ GET ~ data:", data);
		const { results } = data;

		const filteredResults = results.filter(
			(result: { slug: string }) => result.slug === slug?.toLowerCase(),
		);

		return new Response(JSON.stringify(filteredResults[0]));
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
