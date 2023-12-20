import { formatFormDataForAppilyPartnerAPI } from "@/lib/formatFormDataForAppilyPartnerAPI";

const appilyAPI =
	process.env.NODE_ENV === "development"
		? process.env.DEV_APPILY_API_URL
		: process.env.APPILY_API_URL || "";

const partnerKey =
	process.env.NODE_ENV === "development"
		? process.env.DEV_APPILY_API_KEY
		: process.env.APPILY_API_KEY;

const partnerExternalId = process.env.PARTNER_EXTERNAL_ID;
const programExternalId = process.env.PROGRAM_EXTERNAL_ID;

export async function POST(request: Request) {
	try {
		const res = await request.json();

		const formattedData = formatFormDataForAppilyPartnerAPI(res);
		formattedData.partnerExternalId = partnerExternalId || "";
		formattedData.programExternalId = programExternalId || "";
		formattedData.partnerKey = partnerKey || "";
		if (process.env.NODE_ENV === "development") {
			console.log(
				"🚀 ~ file: route.ts:25 ~ POST ~ formattedData:",
				JSON.stringify(formattedData),
			);
		}

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
			throw new Error(
				`HTTP request failed with status ${responseFromAppily.status}`,
			);
		}

		const data = await responseFromAppily.json();

		if (data.meta && data.meta.success === false) {
			const errorResponse = {
				error: data.meta.error,
				validationMessages: data.meta.validationMessages,
			};
			console.error("🚨🚨🚨🚨 Error: ", errorResponse);
			return Response.json({ errorResponse });
		} else {
			return Response.json({ data });
		}
	} catch (error) {
		console.error("🚨🚨🚨🚨 Error: ", error);
		return Response.json({ error: "An error occurred" });
	}
}
