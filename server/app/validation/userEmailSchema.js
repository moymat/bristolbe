const schema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    password: {
      type: "string",
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
      email: "is required",
      password: "is required",
    },
  },
};

module.exports = schema;
