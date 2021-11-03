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
	const { error } = await bristolModel.moveBristol(req.body, id);

	if (error) {
		res.status(401);
		return next(error);
	}

	res.json({ status: "bristol moved successfully" });
};

module.exports = {
	getBristol,
	moveBristol,
};
