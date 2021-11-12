const { decodeToken } = require("../auth");
const { bristolModel } = require("../models");

const getBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { data, error } = await bristolModel.getBristol(
		req.params.bristolId,
		id
	);

	error ? next(error) : res.json({ data });
};

const moveBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, data } = await bristolModel.moveBristol(req.body, id);

	error
		? next(error)
		: res.json({ status: "bristol moved successfully", data });
};

const createBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, validationErrors, data } = await bristolModel.createBristol(
		req.body,
		id
	);

	validationErrors
		? res.json({ validationErrors })
		: error
		? next(error)
		: res.json({ data });
};

const deleteBristols = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, status } = await bristolModel.deleteBristols(
		req.params.bristolId,
		id
	);

	error ? next(error) : res.json({ status });
};

const patchBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, validationErrors } = await bristolModel.patchBristol(
		req.body,
		req.params.bristolId,
		id
	);

	validationErrors
		? res.json({ validationErrors })
		: error
		? next(error)
		: res.json({ status: "bristol updated" });
};

const getBristolRoles = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, data } = await bristolModel.getBristolRoles(
		req.params.bristolId,
		id
	);

	error ? next(error) : res.json({ data });
};

const manageRoles = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, validationErrors } = await bristolModel.manageRoles(
		req.params.bristolId,
		id,
		req.body
	);

	validationErrors
		? res.json({ validationErrors })
		: error
		? next(error)
		: res.json({ status: "roles added successfully" });
};

module.exports = {
	getBristol,
	moveBristol,
	createBristol,
	deleteBristols,
	patchBristol,
	getBristolRoles,
	manageRoles,
};
