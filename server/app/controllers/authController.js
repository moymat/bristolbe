const { authModel } = require("../models");

const register = async (req, res, next) => {
	const { error, token, refresh } = await authModel.register(req.body);

	if (error) return next(Error(error));

	res
		.cookie("access_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: process.env.REFRESH_EXP,
		})
		.json({ status: "success", refreshToken: refresh });
};

const login = async (req, res, next) => {
	const { error, token, refresh } = await authModel.login(req.body);

	if (error) return next(Error(error));

	res
		.cookie("access_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: process.env.REFRESH_EXP,
		})
		.json({ status: "success", refreshToken: refresh });
};

module.exports = {
	register,
	login,
};
