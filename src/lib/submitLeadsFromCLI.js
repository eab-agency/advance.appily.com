const fetch = require("node-fetch");

async function submitForm(formData) {
	const updatedValues = {
		...formData,
		phone_number: formData.text_optin ? formData.phone_number : "",
	};

	const theFormData = {
		...updatedValues,
		formId: 100,
		formName: "submission from CLI",
		messenger: 1,
	};

	const response = await fetch("/api/appily/partnerAPI", {
		method: "POST",
		body: JSON.stringify(theFormData),
		headers: { "Content-Type": "application/json" },
	});

	if (!response.ok) {
		console.error("Network response was not ok");
		return null;
	}

	const data = await response.json();
	return data;
}

async function submitMultipleForms(formDatas) {
	let successfulSubmits = 0;
	for (const formData of formDatas) {
		const data = await submitForm(formData);
		if (data !== null) {
			console.log("🚀 ~ submitMultipleForms ~ data:", data);
			successfulSubmits++;
		}
		console.log("Data response: ", data);
	}
	console.log(`Successful submits: ${successfulSubmits}`);
}

// Replace with your actual form data
const formDatas = [
	{
		/* form data 1 */
	},
	{
		/* form data 2 */
	},
	// ...
];

submitMultipleForms(formDatas);
