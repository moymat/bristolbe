const registerSchema = require("./registerSchema");
const loginSchema = require("./loginSchema");
const userSchema = require("./userSchema");
const userInfoSchema = require("./userInfoSchema");
const userEmailSchema = require("./userEmailSchema");
const userPasswordSchema = require("./userPasswordSchema");
const bristolSchema = require("./bristolSchema");
const manageRoles = require("./manageRolesSchema");
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

const validateRegister = async (data) => {
  return await validateSchema(registerSchema, data);
};

const validateLogin = async (data) => {
  return await validateSchema(loginSchema, data);
};

const validateUser = async (data) => {
  return await validateSchema(userSchema, data);
};

const validateUserInfo = async (data) => {
  return await validateSchema(userInfoSchema, data);
};

const validateUserEmail = async (data) => {
  return await validateSchema(userEmailSchema, data);
};

const validateUserPassword = async (data) => {
  return await validateSchema(userPasswordSchema, data);
};

const validateBristol = async (data) => {
  return await validateSchema(bristolSchema, data);
};

const validateManageRoles = async (data) => {
  return await validateSchema(manageRoles, data);
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUser,
  validateUserInfo,
  validateUserEmail,
  validateUserPassword,
  validateBristol,
  validateManageRoles,
};
