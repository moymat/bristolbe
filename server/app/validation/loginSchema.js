const schema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      errorMessage: {
        type: "must be a string",
      },
    },
    password: {
      type: "string",
      errorMessage: {
        type: "must be a string",
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
