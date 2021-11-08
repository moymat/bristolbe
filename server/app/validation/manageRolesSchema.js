const schema = {
	type: "object",
	additionalProperties: false,
	properties: {
		editors_id: {
			type: "array",
			errorMessage: {
				type: "must be an array",
			},
		},
		viewers_id: {
			type: "array",
			errorMessage: {
				type: "must be an array",
			},
		},
		delete_id: {
			type: "array",
			errorMessage: {
				type: "must be an array",
			},
		},
	},
	anyOf: [
		{
			required: ["editors_id"],
		},
		{
			required: ["viewers_id"],
		},
		{
			required: ["delete_id"],
		},
	],
};

module.exports = schema;
