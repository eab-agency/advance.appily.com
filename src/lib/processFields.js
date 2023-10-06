function processFields(fields, answers, user) {
	const newFormValues = {};

	fields.forEach(field => {
		if (field.alias === "quiz_result") {
			newFormValues[field.alias] = answers.highestScorePersonality;
		} else {
			newFormValues[field.alias] = field.defaultValue || "";
			if (answers.answers) {
				answers.answers.forEach(answer => {
					if (answer.associatedField === field.alias) {
						newFormValues[
							field.alias
						] = `${answer.question} | ${answer.answer}`;
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

	return newFormValues;
}

export default processFields;
