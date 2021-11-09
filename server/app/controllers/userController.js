const express = require("express");
const { decodeToken } = require("../auth");
const { userModel } = require("../models");
router = express.Router();

const getUsers = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { data, error } = await userModel.getUsers(id, req.query.search);

	error ? next(error) : res.json({ data });
};

const getUser = async (req, res, next) => {
	const { data, error } = await userModel.getUser(req.params.userId);

	error ? next(error) : res.json({ data });
};

const patchUserInfo = async (req, res, next) => {
	const { error, validationErrors } = await userModel.patchUserInfo(
		req.params.userId,
		req.body
	);

	validationErrors
		? res.status(400).json({ validationErrors })
		: error
		? next(error)
		: res.json({ status: "update successfull" });
};

const patchUserEmail = async (req, res, next) => {
	const { error, validationErrors } = await userModel.patchUserEmail(
		req.params.userId,
		req.body
	);

	validationErrors
		? res.status(400).json({ validationErrors })
		: error
		? next(error)
		: res.json({ status: "update successfull" });
};

const patchUserPassword = async (req, res, next) => {
	const { error, validationErrors } = await userModel.patchUserPassword(
		req.params.userId,
		req.body
	);

	validationErrors
		? res.status(400).json({ validationErrors })
		: error
		? next(error)
		: res.json({ status: "update successfull" });
};

const deleteUser = async (req, res, next) => {
	const { error } = await userModel.deleteUser(req.params.userId);

	error ? next(error) : res.json({ status: "deletion successfull" });
};

const getUsersBristols = async (req, res, next) => {
	const { error, data } = await userModel.getUsersBristols(req.params.userId);

	error ? next(error) : res.json({ data });
};

module.exports = {
	getUsers,
	getUser,
	patchUserInfo,
	patchUserEmail,
	patchUserPassword,
	deleteUser,
	getUsersBristols,
};
