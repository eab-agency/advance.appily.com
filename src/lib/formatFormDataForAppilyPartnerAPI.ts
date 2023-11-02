interface FormData {
	preferred_email: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	zip_code: string;
	area_of_interest: string;
	[key: string]: string;
}

interface StudentAddressForm {
	zipCode: string;
	stateCode?: string;
}

interface StudentAreaOfInterestForm {
	areaOfInterestId: string;
}

interface QuestionAnswerForm {
	question: string;
	answers: string[];
}

interface StudentQuestionAnswerForm {
	questionAnswerForms: QuestionAnswerForm[];
}

interface StudentInfoForm {
	levelOfDegreeSeekingId?: string;
	yearsOfWorkExperience?: string;
	modalityIds?: string[];
}

interface StudentFormData {
	partnerExternalId: string;
	programExternalId: string;
	partnerKey: string;
	emailAddress: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	phoneCountryCode?: string;
	studentAddressForm: StudentAddressForm;
	studentAreaOfInterestForm?: StudentAreaOfInterestForm;
	studentQuestionAnswerForm?: StudentQuestionAnswerForm;
	studentTypeId: number;
	tcpaConsent?: string;
	studentInfoForm?: StudentInfoForm;
	collegeIds?: string[];
}

export function formatFormDataForAppilyPartnerAPI(
	formData: FormData,
): StudentFormData {
	const questionAnswerForms: QuestionAnswerForm[] = [];

	for (const key in formData) {
		if (key.startsWith("quizresponse")) {
			const answer = formData[key].split(" | ")[1];
			const question = formData[key].split(" | ")[0];
			if (question !== "" && answer !== "") {
				const existingQuestionAnswerForm = questionAnswerForms.find(
					form => form.question === question,
				);
				if (existingQuestionAnswerForm) {
					existingQuestionAnswerForm.answers.push(answer);
				} else {
					questionAnswerForms.push({ question, answers: [answer] });
				}
			}
		}
	}

	if (formData.quiz_result && formData.formName) {
		let appendedQuestion = "generic_microsite_persona_quiz";
		if (formData.formName === "Business Quiz Form") {
			appendedQuestion = "business_microsite_persona_quiz";
		} else if (formData.formName === "Healthcare Quiz Form") {
			appendedQuestion = "healthcare_microsite_persona_quiz";
		}
		questionAnswerForms.push({
			question: appendedQuestion,
			answers: [formData.quiz_result],
		});
	}

	let studentQuestionAnswerForm: StudentQuestionAnswerForm | undefined;
	if (questionAnswerForms.length > 0) {
		studentQuestionAnswerForm = { questionAnswerForms };
	}

	const formattedData: StudentFormData = {
		partnerExternalId: "",
		programExternalId: "",
		partnerKey: "",
		emailAddress: formData.preferred_email,
		firstName: formData.first_name,
		lastName: formData.last_name,
		studentAddressForm: {
			zipCode: formData.zip_code,
			stateCode: formData.state1 || formData.state,
		},
		studentAreaOfInterestForm: {
			areaOfInterestId: formData.area_of_interest,
		},
		studentQuestionAnswerForm,
		studentTypeId: 3,
		studentInfoForm: {
			levelOfDegreeSeekingId:
				formData.education_journey__select1 ||
				formData.education_journey__select,
			modalityIds: formData.preferred_modality
				? [formData.preferred_modality]
				: [],
			yearsOfWorkExperience: formData.years_of_work_experience,
		},
	};

	// TODO: Uncomment this when we have a phone number field and TCPA finalized in partnerAPI
	// if (formData.phone_number !== "") {
	// 	formattedData.phoneNumber = formData.phone_number;
	// 	formattedData.phoneCountryCode = "+1";
	// 	formattedData.tcpaConsent = formData.text_optin[0] !== "" ? "2" : "3";
	// 	formattedData.collegeIds = ["154095"];
	// }

	return formattedData;
}
