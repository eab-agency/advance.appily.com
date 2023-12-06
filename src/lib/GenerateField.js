/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import styles from "@/styles/components/Form.module.scss";
import { Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";

const GenerateField = ({ field, error, formData }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [phoneHasValue, setPhoneHasValue] = useState(false);
	const { values, isSubmitting, isValid, dirty, setFieldValue } =
		useFormikContext();

	const { phone_number } = values;

	// if phone_number has a value, set phoneHasValue to true
	// if phone_number is empty, set phoneHasValue to false
	useEffect(() => {
		if (phone_number !== undefined && phone_number !== "") {
			setPhoneHasValue(true);
		} else {
			setPhoneHasValue(false);
		}
	}, [phone_number]);

	// const shouldHide = formData && Boolean(formData[alias]); // check if field is already populated in formData
	// setting to false for now to show all fields b/c I haven't figured out how to populate fields correctly
	const shouldHide = false;

	//  const [field, meta] = useField(props);
	const {
		id,
		label,
		alias,
		type,
		defaultValue,
		isRequired,
		validationMessage,
		helpMessage,
		properties,
		parent,
		conditions,
	} = field;

	const inputValue = values[alias] ?? "";

	const getParentFieldValue = parentFieldId => {
		//    convert parentFieldId to number
		const parentFieldIdNumber = Number(parentFieldId);
		const parentField = formData.find(
			theField => theField.id === parentFieldIdNumber,
		);
		const parentFieldValue = parentField.alias
			? values[parentField.alias]
			: null;
		return parentField ? parentFieldValue : null;
	};
	const isMyParentValueSelected = parentFieldValue => {
		const childConditions = conditions.values[0];
		return parentFieldValue === childConditions;
	};

	const shouldFieldBeHidden = () => {
		if (parent) {
			const parentFieldValue = getParentFieldValue(parent);
			return (
				parentFieldValue !== null && !isMyParentValueSelected(parentFieldValue)
			);
		}
		return false;
	};

	useEffect(() => {
		setIsVisible(!shouldFieldBeHidden());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, field]);

	useEffect(() => {
		if (parent) {
			const parentFieldValue = getParentFieldValue(parent);

			// Clear the child select's value when parent value changes
			if (!isMyParentValueSelected(parentFieldValue)) {
				setFieldValue(alias, ""); // Clear child select value
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, parent]);

	if (shouldFieldBeHidden()) {
		return null;
	}

	if (!isVisible) {
		return null; // Hide the field if it should be hidden
	}

	switch (type) {
		case "select": {
			let listArray = [];

			if (Array.isArray(properties.list.list)) {
				listArray = properties.list.list;
			} else if (
				typeof properties.list.list === "object" &&
				properties.list.list !== null
			) {
				listArray = Object.values(properties.list.list);
			}

			const selectOptions = listArray.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			));

			const handleSelectChange = event => {
				setFieldValue(alias, event.target.value);
			};

			return (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} ${
						error ? styles.isInvalid : ""
					}`}
					key={field.id}
				>
					<div className={styles.fieldLabel}>
						<label htmlFor={alias}>{label}</label>
						{isRequired && <span className="required">*</span>}
					</div>
					<Field
						name={alias}
						as="select"
						value={inputValue === null ? "" : inputValue}
						onChange={handleSelectChange}
						className={error ? "is-invalid" : ""}
					>
						<option value="">Select</option>
						{selectOptions}
					</Field>
					{error && error}
					{helpMessage && <small>{helpMessage}</small>}
				</div>
			);
		}
		case "text":
			return !shouldHide ? (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} ${
						error ? styles.isInvalid : ""
					} ${inputValue !== "" ? styles.notEmpty : ""}`}
					key={field.id}
				>
					<div className={styles.fieldContainer}>
						<label htmlFor={alias}>
							<Field
								name={alias}
								type="text"
								value={inputValue === null ? "" : inputValue}
								onChange={event => setFieldValue(alias, event.target.value)}
								placeholder={properties.placeholder}
								className={error ? "is-invalid" : ""}
							/>
							<span className={styles.fieldLabel}>
								{label} {isRequired && <span className="required">*</span>}
							</span>
						</label>
					</div>
					{error && <div className={styles.fieldError}>{error}</div>}
					{helpMessage && <small>{helpMessage}</small>}
				</div>
			) : (
				<Field key={id} name={alias} type="hidden" />
			);
		case "email":
			return !shouldHide ? (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} ${
						error ? styles.isInvalid : ""
					}`}
					key={field.id}
				>
					<div className={styles.fieldLabel}>
						<label htmlFor={alias}>{label}</label>
						{isRequired && <span className="required">*</span>}
					</div>
					<Field
						name={alias}
						type="email"
						placeholder={properties.placeholder}
						value={inputValue === null ? "" : inputValue}
						onChange={event => setFieldValue(alias, event.target.value)}
						className={error ? "is-invalid" : ""}
					/>
					{error && <span>{error}</span>}
					{helpMessage && <small>{helpMessage}</small>}
				</div>
			) : (
				<Field key={id} name={alias} type="hidden" />
			);
		case "hidden":
			return (
				<Field
					key={id}
					name={alias}
					type="hidden"
					value={inputValue === null ? "" : inputValue}
				/>
			);
		case "button":
			return (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} `}
					key={field.id}
				>
					<button
						className={`${styles.submitButton} button btn-primary btn-click-submit`}
						type="submit"
						disabled={isSubmitting && isValid && dirty}
					>
						<span>{label}</span>
					</button>
				</div>
			);
		case "tel": {
			return (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} ${
						error ? styles.isInvalid : ""
					}`}
					key={field.id}
				>
					<div className={styles.fieldLabel}>
						<label htmlFor={alias}>{label}</label>
						{isRequired && <span className="required">*</span>}
					</div>
					<Field
						name={alias}
						type="tel"
						placeholder={properties.placeholder}
						value={inputValue === null ? "" : inputValue}
						onChange={event => setFieldValue(alias, event.target.value)}
						className={error ? "is-invalid" : ""}
					/>
					{error && error}
					{helpMessage && <small>{helpMessage}</small>}
				</div>
			);
		}
		case "date":
			return (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} ${
						error ? styles.isInvalid : ""
					}`}
					key={field.id}
				>
					<div className={styles.fieldLabel}>
						<label htmlFor={alias}>{label}</label>
						{isRequired && <span className="required">*</span>}
					</div>
					<Field
						name={alias}
						type="date"
						placeholder={properties.placeholder}
						value={inputValue === null ? "" : inputValue}
						onChange={event => setFieldValue(alias, event.target.value)}
						className={error ? "is-invalid" : ""}
					/>
					{error && error}
					{helpMessage && <small>{helpMessage}</small>}
				</div>
			);
		case "freetext":
		case "freehtml":
			return (
				<div
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: properties.text,
					}}
				/>
			);
		case "checkboxgrp": {
			if (alias === "text_optin" && !phoneHasValue) {
				return null;
			}
			return (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} ${
						error ? styles.isInvalid : ""
					}`}
					key={field.id}
				>
					<div id="checkbox-group" className={styles.checkboxGroupLabel}>
						{label}
					</div>
					<div
						role="group"
						aria-labelledby="checkbox-group"
						className={styles.checkboxGroupContainer}
					>
						<div className={styles.checkboxGroup}>
							{isRequired && <span className="required">*</span>}
							{properties.optionlist.list.map(option => (
								<div key={option.value} className={styles.checkBox}>
									<Field
										name={alias}
										id={option.value}
										type="checkbox"
										value={option.value}
										checked={inputValue.includes(option.value)}
										onChange={event => {
											const { value } = event.target;
											const isChecked = event.target.checked;

											setFieldValue(
												alias,
												isChecked
													? [...inputValue, value]
													: inputValue.filter(v => v !== value),
											);
										}}
										className={error ? "is-invalid" : ""}
									/>
									<label htmlFor={option.value}>{option.label}</label>
								</div>
							))}
						</div>
						{error && error}
						{helpMessage && <small>{helpMessage}</small>}
					</div>
				</div>
			);
		}
		case "number": {
			return (
				<div
					className={`${styles.qGroup}  ${field.alias} ${styles[field.type]} ${
						error ? styles.isInvalid : ""
					}`}
					key={field.id}
				>
					<div className={styles.fieldLabel}>
						<label htmlFor={alias}>{label}</label>
						{isRequired && <span className="required">*</span>}
					</div>
					<Field
						name={alias}
						type="number"
						placeholder={properties.placeholder}
						value={inputValue === null ? "" : inputValue}
						onChange={event => setFieldValue(alias, event.target.value)}
						className={error ? "is-invalid" : ""}
					/>
					{error && error}
					{helpMessage && <small>{helpMessage}</small>}
				</div>
			);
		}
		default:
			return null;
	}
};

export default GenerateField;
