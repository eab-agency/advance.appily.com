import { formatFormDataForAppilyPartnerAPI } from "@/lib/formatFormDataForAppilyPartnerAPI";
import { ConsoleLogger } from "aws-amplify/utils";
const logger = new ConsoleLogger("foo");

const appilyAPI =
	process.env.NODE_ENV === "development"
		? process.env.DEV_APPILY_API_URL
		: process.env.APPILY_API_URL || "";
// console.log("🚀 ~ file: route.ts:4 ~ appilyAPI:", appilyAPI);

const partnerKey =
	process.env.NODE_ENV === "development"
		? process.env.DEV_APPILY_API_KEY
		: process.env.APPILY_API_KEY;
// console.log("🚀 ~ file: route.ts:9 ~ partnerKey:", partnerKey);

const partnerExternalId = process.env.PARTNER_EXTERNAL_ID;
// console.log("🚀 ~ file: route.ts:14 ~ partnerExternalId:", partnerExternalId);
const programExternalId = process.env.PROGRAM_EXTERNAL_ID;
// console.log("🚀 ~ file: route.ts:16 ~ programExternalId:", programExternalId);

export async function POST(request: Request) {
	try {
		const res = await request.json();

		const formattedData = formatFormDataForAppilyPartnerAPI(res);
		formattedData.partnerExternalId = partnerExternalId || "";
		formattedData.programExternalId = programExternalId || "";
		formattedData.partnerKey = partnerKey || "";
		if (process.env.NODE_ENV === "development") {
			console.log(
				"🚀 ~ file: route.ts:25 ~ POST ~ formattedData in development mode:",
				JSON.stringify(formattedData),
			);
		}

		logger.info("info bar", JSON.stringify(formattedData));

		const responseFromAppily = await fetch(
			`${appilyAPI}/partner/v1/register-student/adult-learner`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(formattedData),
			},
		);

		if (responseFromAppily.status !== 200) {
			logger.error("error bar", JSON.stringify(responseFromAppily));
			console.log("🚨🚨🚨 ~ POST ~ responseFromAppily:", responseFromAppily);
			throw new Error(
				`HTTP request failed with status ${responseFromAppily.status}`,
			);
		}

		const data = await responseFromAppily.json();
		console.log("🚀 ~ POST ~ data response:", data);
		logger.info("info bar", data);

		if (data.meta && data.meta.success === false) {
			const errorResponse = {
				error: data.meta.error,
				validationMessages: data.meta.validationMessages,
			};
			console.error("🚨🚨 Error: ", errorResponse);
			return Response.json({ errorResponse });
		} else {
			return Response.json({ data });
		}
	} catch (error) {
		console.error("🚨🚨🚨🚨 Error: ", error);
		logger.error("error bar", JSON.stringify(error));
		return Response.json({ error: "An error occurred" });
	}
}
