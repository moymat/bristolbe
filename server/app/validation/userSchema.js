const schema = {
  type: "object",
  required: ["first_name", "last_name", "email"],
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
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        type: "must be a string",
        format: "must be a valid email",
      },
    },
  },
  errorMessage: {
    type: "should be an object",
    required: {
      first_name: "is required",
      last_name: "is required",
      email: "is required",
    },
  },
};

module.exports = schema;
