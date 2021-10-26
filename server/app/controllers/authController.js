const { authModel } = require("../models");

const register = (req, res) => {
	const response = authModel.register();

	res.json({
		status: response,
	});
};

const login = (req, res) => {
	const response = authModel.login();

	res.json({
		status: response,
	});
};

module.exports = {
	register,
	login,
};
