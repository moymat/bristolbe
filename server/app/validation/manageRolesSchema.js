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
		deleted_id: {
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
			required: ["deleted_id"],
		},
	],
};

module.exports = schema;
