const { authModel } = require("../models");

const register = async (req, res, next) => {
	const { validationErrors, error, data } = await authModel.register(req.body);

	if (validationErrors) {
		return res.json({
			status: "registration failed",
			errors: validationErrors,
		});
	}

	if (error) {
		return next(Error(error));
	}

	const { refresh, token, user } = data;

	res
		.cookie("access_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: process.env.REFRESH_EXP,
		})
		.json({
			status: "registered",
			refresh,
			user,
		});
};

const login = async (req, res, next) => {
	const { error, data, validationErrors } = await authModel.login(req.body);

	if (validationErrors) {
		return res.json({
			status: "registration failed",
			errors: validationErrors,
		});
	}

	if (error) {
		return next(Error(error));
	}

	const { refresh, token, user } = data;

	res
		.cookie("access_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: process.env.REFRESH_EXP,
		})
		.json({
			status: "logged in",
			refresh,
			user,
		});
};

const logout = async (req, res, next) => {
	const { error } = await authModel.logout(req.cookies);

	if (error) {
		res.status(500);
		return next(Error(error));
	}

	res
		.cookie("access_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 0,
		})
		.json({ status: "logged out" });
};

const isAuth = async (req, res, next) => {
	console.log(res.cookies);
	res.json({ status: "ok" });
};

module.exports = {
	register,
	login,
	logout,
	isAuth,
};
