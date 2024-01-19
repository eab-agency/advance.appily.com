import { formatFormDataForAppilyPartnerAPI } from "@/lib/formatFormDataForAppilyPartnerAPI";
import { ConsoleLogger } from "aws-amplify/utils";
const logger = new ConsoleLogger("partnerAPI/route.ts");

const appilyAPI =
	process.env.NODE_ENV === "development"
		? process.env.DEV_APPILY_API_URL
		: process.env.APPILY_API_URL || "";

const partnerKey =
	process.env.NODE_ENV === "development"
		? process.env.DEV_APPILY_API_KEY
		: process.env.APPILY_API_KEY;

const partnerExternalId = process.env.PARTNER_EXTERNAL_ID;
// console.log("🚀 ~ file: route.ts:14 ~ partnerExternalId:", partnerExternalId);
const programExternalId = process.env.PROGRAM_EXTERNAL_ID;
// console.log("🚀 ~ file: route.ts:16 ~ programExternalId:", programExternalId);

export async function POST(request: Request) {
	// logger.error("🚀 ~ appilyAPI:", appilyAPI);
	// logger.error("🚀 ~ partnerKey:", partnerKey);

	try {
		const res = await request.json();

		const formattedData = formatFormDataForAppilyPartnerAPI(res);
		formattedData.partnerExternalId = partnerExternalId || "";

		formattedData.programExternalId = programExternalId || "";
		// logger.error(
		// 	"🚀 ~ POST ~ formattedData.partnerExternalId:",
		// 	formattedData.programExternalId,
		// );
		formattedData.partnerKey = partnerKey || "";
		// logger.error(
		// 	"🚀 ~ POST ~ formattedData.partnerExternalId:",
		// 	formattedData.partnerKey,
		// );
		if (process.env.NODE_ENV === "development") {
			console.log(
				"🚀 ~ file: route.ts:25 ~ POST ~ formattedData in development mode:",
				JSON.stringify(formattedData),
			);
		}

		// logger.error("info bar: formattedData", JSON.stringify(formattedData));

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
			logger.error(
				"🚨🚨🚨 responseFromAppily.headers",
				responseFromAppily.headers,
			);
			logger.error(
				"🚨🚨🚨 responseFromAppily.statusText",
				responseFromAppily.statusText,
			);
			logger.error(
				"🚨🚨🚨 responseFromAppily.status",
				responseFromAppily.status,
			);
			// console.log("🚨🚨🚨 ~ POST ~ responseFromAppily:", responseFromAppily);
			throw new Error(
				`HTTP request failed with status ${responseFromAppily.status}`,
			);
		}

		const data = await responseFromAppily.json();
		// console.log("🚀 ~ POST ~ data response:", data);
		// logger.error("info bar: data response", data);

		if (data.meta && data.meta.success === false) {
			const errorResponse = {
				error: data.meta.error,
				validationMessages: data.meta.validationMessages,
			};
			logger.error("error bar", errorResponse);
			console.error("🚨🚨 Error: ", errorResponse);
			return Response.json({ errorResponse });
		} else {
			return Response.json({ data });
		}
	} catch (error) {
		console.error("🚨🚨🚨🚨 Error: ", error);
		logger.error("error bar", error);
		return Response.json({ error: "An error occurred" });
	}
}
