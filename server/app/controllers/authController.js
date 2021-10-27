const { authModel } = require("../models");

const register = async (req, res, next) => {
	const { error, token, refresh } = await authModel.register(req.body);

	error
		? next(Error(error))
		: res
				.cookie("access_token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					maxAge: process.env.REFRESH_EXP,
				})
				.json({ status: "registered", refreshToken: refresh });
};

const login = async (req, res, next) => {
	const { error, token, refresh } = await authModel.login(req.body);

	error
		? next(Error(error))
		: res
				.cookie("access_token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					maxAge: process.env.REFRESH_EXP,
				})
				.json({ status: "logged in", refreshToken: refresh });
};

const logout = async (req, res, next) => {
	const { error } = await authModel.logout(req.cookies);

	error
		? next(Error(error))
		: res.cookie("access_token", "").json({ status: "logged out" });
};

module.exports = {
	register,
	login,
	logout,
};
