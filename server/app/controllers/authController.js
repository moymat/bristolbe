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
	const refresh = req.headers.authorization.split("Bearer ")[1];

	const { error } = await authModel.logout(refresh);

	if (error) {
		res.status(500);
		return next(Error(error));
	}

	res.clearCookie("access_token").json({ status: "logged out" });
};

const isAuth = async (req, res, next) => {
	const headerRefresh = req.headers.authorization.split("Bearer ")[1];
	const { error, data } = await authModel.isAuth(headerRefresh);

	if (error) {
		next(error);
	}

	const { token, refresh, user } = data;

	res
		.cookie("access_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: process.env.REFRESH_EXP,
		})
		.json({ status: "logged in", user, refresh });
};

module.exports = {
	register,
	login,
	logout,
	isAuth,
};
