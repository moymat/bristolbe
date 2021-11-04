const schema = {
	type: "object",
	required: ["title"],
	additionalProperties: false,
	properties: {
		title: {
			type: "string",
			errorMessage: {
				type: "must be a string",
			},
		},
		content: {
			type: "string",
			errorMessage: {
				type: "must be a string",
			},
		},
	},
	errorMessage: {
		type: "should be an object",
		required: {
			title: "is required",
		},
	},
};

module.exports = schema;
