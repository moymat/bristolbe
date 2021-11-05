const { authModel } = require("../models");
const { decodeToken } = require("../auth");

const register = async (req, res, next) => {
	const browserId = req.headers.browser_id;

	if (!browserId) {
		res.status(400);
		return next(Error("need browser id"));
	}

	const { validationErrors, error, data } = await authModel.register(
		req.body,
		browserId
	);

	// If validation failed, send why it failed
	if (validationErrors) {
		return res.json({
			status: "registration failed",
			errors: validationErrors,
		});
	}

	if (error) {
		res.status(400);
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
			refresh,
			user,
		});
};

const verifyCode = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error } = await authModel.verifyCode(id, req.body.code);

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ status: "email verified" });
};

const resendCode = async (req, res, next) => {
	const { id } = decodeToken(req.cookies.access_token);
	const { error, status } = await authModel.resendCode(id);

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ status });
};

const login = async (req, res, next) => {
	const browserId = req.headers.browser_id;

	if (!browserId) {
		res.status(400);
		return next(Error("need browser id"));
	}

	const { error, data, validationErrors } = await authModel.login(
		req.body,
		browserId
	);

	// If validation failed, send why it failed
	if (validationErrors) {
		return res.json({
			status: "registration failed",
			errors: validationErrors,
		});
	}

	if (error) return next(Error(error));

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
			refresh,
			user,
		});
};

const postResetPassword = async (req, res, next) => {
	const { error, status } = await authModel.postResetPassword(req.body.email);

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ status });
};

const checkResetCode = async (req, res, next) => {
	const { error, status } = await authModel.checkResetCode(req.params.code);

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ status });
};

const patchResetPassword = async (req, res, next) => {
	const { error } = await authModel.patchResetPassword(req.body);

	if (error) {
		res.status(400);
		return next(error);
	}

	res.json({ status: "password updated" });
};

const logout = async (req, res, next) => {
	const browserId = req.headers.browser_id;

	if (!browserId) {
		res.status(400);
		return next(Error("need browser id"));
	}

	const { error } = await authModel.logout(browserId);

	if (error) {
		res.status(400);
		return next(Error(error));
	}

	res.clearCookie("access_token").json({ status: "logged out" });
};

const isAuth = async (req, res, next) => {
	const browserId = req.headers.browser_id;
	const headerRefresh = req.headers.authorization?.split("Bearer ")[1];

	if (!browserId || !headerRefresh) {
		res.status(400);
		return next(Error("need browser id and/or refresh token"));
	}

	const { error, data } = await authModel.isAuth(headerRefresh, browserId);

	if (error) {
		res.status(400);
		return next(error);
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
	verifyCode,
	resendCode,
	postResetPassword,
	checkResetCode,
	patchResetPassword,
};
