const registerSchema = require("./registerSchema");
const loginSchema = require("./loginSchema");
const userSchema = require("./userSchema");
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true, removeAdditional: true, $data: true });
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const validateSchema = async (schema, data) => {
	try {
		const validate = ajv.compile(schema);
		const result = await validate(data);

		if (!result) {
			const errors = validate.errors.map(({ instancePath, message }) => ({
				field: instancePath.replace("/", ""),
				message,
			}));
			return { errors };
		}

		return { data };
	} catch (errors) {
		return { errors };
	}
};

const validateRegister = async data => {
	return await validateSchema(registerSchema, data);
};

const validateLogin = async data => {
	return await validateSchema(loginSchema, data);
};

const validateUser = async data => {
	return await validateSchema(userSchema, data);
};

module.exports = {
	validateRegister,
	validateLogin,
	validateUser,
};
