const schema = {
	type: "object",
	required: ["email", "password"],
	properties: {
		email: {
			type: "string",
			format: "email",
			errorMessage: {
				type: "must be a string",
				format: "must be a valid email",
			},
		},
		password: {
			type: "string",
			pattern: "^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\\d).{8,30}$",
			errorMessage: {
				type: "must be a string",
				pattern: "must match pattern",
			},
		},
	},
	errorMessage: {
		type: "should be an object",
		required: {
			email: "is required",
			password: "is required",
		},
	},
};

module.exports = schema;
