const Ajv = require("ajv");
const registerSchema = require("./registerSchema");
const loginSchema = require("./loginSchema");

const ajv = new Ajv({ allErrors: true, removeAdditional: true, $data: true });
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const validateRegister = async data => {
	try {
		const validate = ajv.compile(registerSchema);
		const result = await validate(data);

		console.log(validate.errors);

		if (!result) {
			const errors = validate.errors.map(({ instancePath, message }) => ({
				field: instancePath.replace("/", ""),
				message,
			}));
			return { errors };
		}

		return { errors: false };
	} catch (errors) {
		return { errors };
	}
};

const validateLogin = async data => {
	try {
		const validate = ajv.compile(loginSchema);
		const result = await validate(data);

		if (!result) {
			const errors = validate.errors.map(({ instancePath, message }) => ({
				field: instancePath.replace("/", ""),
				message,
			}));
			return { errors };
		}

		return { errors: false };
	} catch (errors) {
		return { errors };
	}
};

module.exports = {
	validateRegister,
	validateLogin,
};
