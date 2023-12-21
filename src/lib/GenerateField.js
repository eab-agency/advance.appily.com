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

	const shouldHide = false; // Set to false for now

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
	}, [values, field]);

	useEffect(() => {
		if (parent) {
			const parentFieldValue = getParentFieldValue(parent);
			if (!isMyParentValueSelected(parentFieldValue)) {
				setFieldValue(alias, ""); // Clear child select value
			}
		}
	}, [values, parent]);

	if (shouldHide || !isVisible) {
		return null;
	}

	const renderField = () => {
		const commonProps = {
			name: alias,
			value: inputValue === null ? "" : inputValue,
			onChange: event => setFieldValue(alias, event.target.value),
			className: error ? "is-invalid" : "",
		};

		switch (type) {
			case "select": {
				const listArray = Array.isArray(properties.list.list)
					? properties.list.list
					: typeof properties.list.list === "object" &&
					  properties.list.list !== null
					? Object.values(properties.list.list)
					: [];

				const selectOptions = listArray.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				));

				const handleSelectChange = event => {
					setFieldValue(alias, event.target.value);
				};

				const showSelectOption = inputValue === "";

				return (
					<div
						className={`${styles.qGroup}  ${field.alias} ${
							styles[field.type]
						} ${error ? styles.isInvalid : ""} ${
							inputValue !== "" ? styles.notEmpty : styles.empty
						}`}
						key={field.id}
					>
						<div className={styles.fieldContainer}>
							<label htmlFor={alias}>
								{isRequired && <span className="required">*</span>}
								<Field
									as="select"
									value={inputValue === null ? "" : inputValue}
									onChange={handleSelectChange}
									{...commonProps}
								>
									{showSelectOption ? null : <option value="">Select</option>}
									{selectOptions}
								</Field>
								<span className={styles.fieldLabel}>
									{label} {isRequired && <span className="required">*</span>}
								</span>
							</label>
						</div>
						{error && error}
						{helpMessage && <small>{helpMessage}</small>}
					</div>
				);
			}
			case "text":
			case "email":
			case "tel":
			case "date":
			case "number": {
				return (
					<div
						className={`${styles.qGroup}  ${field.alias} ${
							styles[field.type]
						} ${error ? styles.isInvalid : ""} ${
							inputValue !== "" ? styles.notEmpty : ""
						}`}
						key={field.id}
					>
						<div className={styles.fieldContainer}>
							<label htmlFor={alias}>
								<Field
									type={type}
									placeholder={properties.placeholder}
									{...commonProps}
								/>
								<span className={styles.fieldLabel}>
									{label} {isRequired && <span className="required">*</span>}
								</span>
							</label>
						</div>
						{error && <div className={styles.fieldError}>{error}</div>}
						{helpMessage && <small>{helpMessage}</small>}
					</div>
				);
			}
			case "button": {
				return (
					<div
						className={`${styles.qGroup}  ${field.alias} ${
							styles[field.type]
						} `}
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
			}
			case "checkboxgrp": {
				if (alias === "text_optin" && !phoneHasValue) {
					return null;
				}
				return (
					<div
						className={`${styles.qGroup}  ${field.alias} ${
							styles[field.type]
						} ${alias === "text_optin" && styles.textOptin} ${
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
											{...commonProps}
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
			case "hidden": {
				return <Field key={id} type="hidden" {...commonProps} />;
			}
			case "freetext":
			case "freehtml": {
				return (
					<div
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{
							__html: properties.text,
						}}
					/>
				);
			}
			default: {
				return null;
			}
		}
	};

	return renderField();
};

export default GenerateField;
