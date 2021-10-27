const schema = {
	type: "object",
	required: ["first_name", "last_name", "email", "password", "confirm"],
	properties: {
		first_name: {
			type: "string",
			minLength: 1,
			errorMessage: {
				type: "must be a string",
			},
		},
		last_name: {
			type: "string",
			minLength: 1,
			errorMessage: {
				type: "must be a string",
			},
		},
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
		confirm: {
			type: "string",
			const: {
				$data: "1/password",
			},
			errorMessage: {
				type: "must be a string",
				const: "must match password",
			},
		},
	},
	errorMessage: {
		type: "should be an object",
		required: {
			first_name: "is required",
			last_name: "is required",
			email: "is required",
			password: "is required",
			confirm: "is required",
		},
	},
};

module.exports = schema;
