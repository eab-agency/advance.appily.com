interface FormDataInterface {
	preferred_email: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	zip_code: string;
	area_of_interest: string;
	formId: number;
	state_code: string;
	education_journey__select1?: string;
	education_journey__select?: string;
	preferred_modality?: string;
	years_of_work_experience?: number;
	[key: string]: string | number | undefined;
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
	yearsOfWorkExperience?: number;
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
	formData: FormDataInterface,
): StudentFormData {
	const questionAnswerForms: QuestionAnswerForm[] = [];

	for (const key in formData) {
		if (key.startsWith("quizresponse")) {
			// if null, skip
			if (!formData[key]) {
				continue;
			}
			const answer = formData[key].split(" | ")[1];
			let question = formData[key].split(" | ")[0];
			if (question.length > 85) {
				question = question.substring(0, 85);
			}
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

	if (formData.quiz_result && formData.formId) {
		let appendedQuestion = "generic_microsite_persona_quiz";
		if (formData.formId === 13) {
			appendedQuestion = "adc_plan_quiz";
		}
		if (formData.formId === 12) {
			appendedQuestion = "adc_readiness_quiz";
		}
		if (formData.formId === 6) {
			appendedQuestion = "business_microsite_persona_quiz";
		} else if (formData.formId === 16) {
			appendedQuestion = "healthcare_microsite_persona_quiz";
		}
		questionAnswerForms.push({
			question: appendedQuestion,
			answers: [String(formData.quiz_result)],
		});
	}

	// biome-ignore lint/style/useConst: <explanation>
	let studentQuestionAnswerForm: StudentQuestionAnswerForm | undefined;
	const modifiedQuestionAnswerForms = questionAnswerForms.map(form => {
		const modifiedAnswers = form.answers.map(answer => {
			if (answer.length > 85) {
				return answer.substring(0, 85);
			}
			return answer;
		});

		return {
			...form,
			answers: modifiedAnswers,
		};
	});

	studentQuestionAnswerForm = {
		questionAnswerForms: modifiedQuestionAnswerForms,
	};

	let studentInfoForm: any = {
		modalityIds: formData.preferred_modality ? [formData.preferred_modality] : [],
		yearsOfWorkExperience: formData?.years_of_work_experience,
	  };
	  
	  if (formData.education_journey__select1 !== null) {
		studentInfoForm.levelOfDegreeSeekingId = formData.education_journey__select1;
	  } else if (formData.education_journey__select !== null) {
		studentInfoForm.levelOfDegreeSeekingId = formData.education_journey__select;
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
			stateCode: formData.state_code,
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
			yearsOfWorkExperience: formData?.years_of_work_experience,
		},
	};

	// TODO: Uncomment this when we have a phone number field and TCPA finalized in partnerAPI
	// if (formData.phone_number !== "") {
	// 	formattedData.phoneNumber = formData.phone_number;
	// 	formattedData.phoneCountryCode = "+1";
	// 	formattedData.tcpaConsent = formData.text_optin[0] !== "" ? "2" : "3";
	// 	formattedData.collegeIds = ["154095"];
	// }

	// console.log(
	// 	"🚀 ~ file: formatFormDataForAppilyPartnerAPI.ts:144 ~ formattedData:",
	// 	formattedData,
	// );
	return formattedData;
}
