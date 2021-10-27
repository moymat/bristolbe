const { authModel } = require("../models");

const register = async (req, res, next) => {
	const { validationErrors, error, data } = await authModel.register(req.body);

	// If validation failed, send why it failed
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
		// Sending of the access_token in the cookie
		.cookie("access_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: process.env.REFRESH_EXP,
		})
		// Sending of the user info and the refresh token as JSON
		.json({
			status: "registered",
			data: { refresh, user },
		});
};

const login = async (req, res, next) => {
	const { validationErrors, error, data } = await authModel.login(req.body);

	// If validation failed, send why it failed
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
		// Sending of the access_token in the cookie
		.cookie("access_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: process.env.REFRESH_EXP,
		})
		// Sending of the user info and the refresh token as JSON
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
		// Deletion of the access_token from the cookie
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
