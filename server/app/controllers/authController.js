const { authModel } = require("../models");

const register = async (req, res, next) => {
	const { validationErrors, error, data } = await authModel.register(req.body);

	if (validationErrors) {
		return res
			.status(403)
			.json({ status: "registration failed", errors: validationErrors });
	}

	if (error) {
		res.status(403);
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
			data: { refresh, user },
		});
};

const login = async (req, res, next) => {
	const { validationErrors, error, data } = await authModel.login(req.body);

	if (validationErrors) {
		return res
			.status(403)
			.json({ status: "registration failed", errors: validationErrors });
	}

	if (error) {
		res.status(403);
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
			data: { refresh, user },
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

module.exports = {
	register,
	login,
	logout,
};
