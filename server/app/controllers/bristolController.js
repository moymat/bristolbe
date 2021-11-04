const { decodeToken } = require("../auth");
const { bristolModel } = require("../models");

const getBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { data, error } = await bristolModel.getBristol(
		req.params.bristolId,
		id
	);

	if (error) {
		res.status(401);
		return next(error);
	}

	res.json({ data });
};

const moveBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, data } = await bristolModel.moveBristol(req.body, id);

	if (error) {
		res.status(401);
		return next(error);
	}

	console.log(data);

	res.json({ status: "bristol moved successfully", data });
};

const createBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, validationErrors, data } = await bristolModel.createBristol(
		req.body,
		id
	);

	if (validationErrors) return res.status(400).json({ validationErrors });

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ data });
};

const patchBristol = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, validationErrors } = await bristolModel.patchBristol(
		req.body,
		req.params.bristolId,
		id
	);

	if (validationErrors) return res.status(400).json({ validationErrors });

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ status: "bristol updated" });
};

const getBristolRoles = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, data } = await bristolModel.getBristolRoles(
		req.params.bristolId,
		id
	);

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ data });
};

module.exports = {
	getBristol,
	moveBristol,
	createBristol,
	patchBristol,
	getBristolRoles,
};
