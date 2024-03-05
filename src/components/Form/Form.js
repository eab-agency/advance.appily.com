/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { useUser } from "@/context/context";
// eslint-disable-next-line import/no-extraneous-dependencies
// import { useUser } from '@/context/context'
import isDevMode from "@/helpers/isDevMode";
import useForm from "@/hooks/useForm";
import styles from "@/styles/components/Form.module.scss";
import Link from "next/link";
import GenerateField from "../../lib/GenerateField";

// const validationSchema = Yup.object().shape({
//     // validation schema here
//     preferred_email: Yup.string()
//         .email('Invalid email')
//         .required('Email is required'),
// });

const AcquiaFormHandle = ({
	redirectTo,
	answers = {},
	user = {},
	id,
	school = {},
}) => {
	// keep track of whether the form has been submitted
	const [isSent, setIsSent] = useState(false);
	const [fieldsProcessed, setFieldsProcessed] = useState(false);
	const { data: acsForm, error } = useForm(id);

	const { utmSource } = useUser();
	// const { utmSource } = {};
	const [formValues, setFormValues] = useState({});

	const [theForm, setTheForm] = useState(null);
	const [theFields, setTheFields] = useState([]);

	const { location } = useUser();

	const [formData, setFormData] = useState({});

	const router = useRouter();

	// console log when formValues changes
	// useEffect(() => {
	// 	console.log("🚀🚀🚀🚀🚀 ~ file: Form.js:51- formValues:", formValues);
	// }, [formValues]);

	useEffect(() => {
		if (acsForm) {
			const { form, errors } = acsForm;
			if (form) {
				const { fields, ...otherFormProps } = form;
				// const modifiedFields = modifyFields(fields);
				// setTheFields(modifiedFields);
				setTheFields(fields);
				setTheForm(otherFormProps);
			} else {
				errors.map(error => console.error(error.message, error.type));
			}
		}
	}, [acsForm]);

	useEffect(() => {
		if (theFields.length > 0 && !fieldsProcessed) {
			const newFormValues = { ...formValues };

			theFields.forEach(field => {
				if (field.alias === "quiz_result") {
					newFormValues[field.alias] = answers.highestScorePersonality;
				} else if (field.alias === "paid_social_source_of_con") {
					// Handle specific logic for this field if needed
				} else if (field.alias === "state1" || field.alias === "state") {
					newFormValues[field.alias] = location.region_iso_code;
				} else if (field.alias === "school_carousel") {
					newFormValues[field.alias] = school.title;
				} else {
					newFormValues[field.alias] = field.defaultValue || "";
					if (answers.answers) {
						answers.answers.forEach(answer => {
							if (answer.associatedField.startsWith("quizresponse")) {
								newFormValues[
									answer.associatedField
								] = `${answer.question} | ${answer.answer}`;
							}
							if (answer.associatedField === field.alias) {
								newFormValues[field.alias] = answer.value || answer.answer;
							}
						});
					}
				}

				if (user) {
					if (field.alias === "preferred_email") {
						newFormValues[field.alias] = user.email;
					} else if (field.alias === "first_name") {
						newFormValues[field.alias] = user.fname;
					} else if (field.alias === "last_name") {
						newFormValues[field.alias] = user.lname;
					}
				}
			});

			setFormValues(prev => ({
				...prev,
				...newFormValues,
			}));

			setFieldsProcessed(true);
		}
	}, [answers.answers, answers.highestScorePersonality, theFields, user, fieldsProcessed, school, utmSource, answers.areaOfInterest, formValues, location.region_iso_code]);

	if (error) return <p>Error loading form.</p>;
	if (!acsForm) return <p className="loading">Loading...</p>;

	const modifyFields = fields =>
		fields.map(
			field =>
				// if (
				//     field.conditions &&
				//     field.conditions.values &&
				//     field.conditions.values.length > 0
				// ) {
				//     return {
				//         ...field,
				//         initialHide: true,
				//     };
				// }
				field,
		);

	const onSubmit = async (values, { setSubmitting }) => {
		// Create a copy of values and clear phone_number if text_optin is not checked
		const updatedValues = {
			...values,
			phone_number: values.text_optin ? values.phone_number : "",
		};

		try {
			const theFormData = {
				...updatedValues,
				// moved these to
				formId: theForm.id,
				formName: theForm.name,
				messenger: 1,
				// state1: location.region_iso_code,
				// state: location.region_iso_code,
			};

			// Make the first API request to ACS
			const response1 = await fetch(`/api/submit?formId=${theForm.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ mauticform: theFormData }),
			});

			if (!response1.ok) {
				// Check if the first API request was successful
				throw new Error("Network response was not ok");
			} else {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
					event: "formSubmitSuccess",
					formId: theForm.id,
					formName: theForm.name,
				});
			}

			// Make the second API request
			const response2 = await fetch("/api/appily/partnerAPI", {
				method: "POST",
				body: JSON.stringify(theFormData),
			});

			if (!response2.ok) {
				// Check if the second API request was successful
				console.error("Network response was not ok for response2");
			} else {
				const data = await response2.json();
				// console.log("Data response: ", data);
			}

			setSubmitting(false);
			// Redirect to the specified path on successful form submission
			if (redirectTo) {
				!isDevMode() && router.push(redirectTo);
			}
		} catch (error) {
			console.error(error);
			setSubmitting(false);
		}
	};

	const initialValues = { ...formData };

	// Assume `fields` is the array of form fields received from the API
	const validationSchema = Yup.object().shape(
		theFields.reduce((schema, field) => {
			// For each field, create a Yup validation object based on its validation rules
			let fieldValidation = "";

			if (field.type === "text" || field.type === "email") {
				fieldValidation = Yup.string();
			} else if (field.type === "number") {
				fieldValidation = Yup.number();
			} else {
				fieldValidation = Yup.mixed(); // Initialize with a generic Yup type
			}

			if (field.isRequired) {
				fieldValidation = fieldValidation.required(
					field.validationMessage || `${field.label} is required`,
				);
			}

			if (field.type === "email") {
				fieldValidation = fieldValidation.email("Invalid email");
			}

			// if field is a number, and field alias is zip_code, add min and max length
			if (field.alias === "zip_code") {
				fieldValidation = fieldValidation.test(
					"len",
					"Zip Code needs to be excatly 5 digits",
					val => !val || val.toString().length === 5,
				);
			}

			// Add more validation rules here as needed

			// Add the validation object to the schema object using the field's alias as the key
			// schema[field.alias] = fieldValidation;
			return { ...schema, [field.alias]: fieldValidation };
			// return schema;
		}, {}),
	);

	return (
		<Formik
			enableReinitialize
			initialValues={formValues || initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			validateOnChange={false}
			validateOnBlur={false}
		>
			{({ errors, isSubmitting, isValid, dirty }) =>
				!isSent ? (
					<Form className={styles.form} id={theForm?.name}>
						{theFields.map(field => (
							<GenerateField
								field={field}
								error={errors[field.alias]}
								formData={theFields}
								key={field.id}
							/>
						))}

						{/* <DisplayFormikState {...values} /> */}
					</Form>
				) : (
					<div className={styles.formSuccess}>
						<h2>Thank you for your submission!</h2>
						{isDevMode() && (
							<p>
								If you weren&apos;t in dev mode, you would be redirecting to{" "}
								<Link href={redirectTo}>{redirectTo}</Link>
							</p>
						)}
					</div>
				)
			}
		</Formik>
	);
};

export default AcquiaFormHandle;
