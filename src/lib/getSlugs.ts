import { promises as fs } from "fs";
import path from "path";

export async function getSlugs(vertical: string) {
	try {
		const dataDirectory = path.resolve(process.cwd(), "src/data");
		const filePath = path.join(dataDirectory, `links-${vertical}.json`);

		const fileContents = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(fileContents);
		const { results } = data;
		const transformedData = results.map(({ slug, title }) => ({
			href: slug,
			label: title,
		}));
		return transformedData;
	} catch (error) {
		console.error("🐛🐛🐛🐛🐛", error);
		throw new Error("Internal Server Error");
	}
}
