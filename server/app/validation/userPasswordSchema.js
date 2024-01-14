const schema = {
  type: "object",
  required: ["password", "new_password", "confirm"],
  additionalProperties: false,
  properties: {
    password: {
      type: "string",
      errorMessage: {
        type: "must be a string",
      },
    },
    new_password: {
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
        $data: "1/new_password",
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
      password: "is required",
      new_password: "is required",
      confirm: "is required",
    },
  },
};

module.exports = schema;
