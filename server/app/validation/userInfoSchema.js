const schema = {
	type: "object",
	required: ["first_name", "last_name"],
	additionalProperties: false,
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
	},
	errorMessage: {
		type: "should be an object",
		required: {
			first_name: "is required",
			last_name: "is required",
		},
	},
};

module.exports = schema;
