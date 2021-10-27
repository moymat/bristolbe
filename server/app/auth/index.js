const jwt = require("jsonwebtoken");
const redisClient = require("../db/redis")();

const signToken = (payload, refresh = false) => {
	return refresh
		? jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
				expiresIn: process.env.REFRESH_EXP,
		  })
		: jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {
				expiresIn: process.env.TOKEN_EXP,
		  });
};

const decodeToken = (token, refresh = false) => {
	return refresh
		? jwt.decode(token, process.env.SECRET_REFRESH_KEY)
		: jwt.decode(token, process.env.SECRET_TOKEN_KEY);
};

const isAuth = async (req, res, next) => {
	// Retrieve tokens from cookie & header
	const refresh = req.headers.authorization.split("Bearer ")[1];
	const { access_token: token } = req.cookies;

	console.log(refresh, token);

	let decodedRefresh;

	try {
		decodedRefresh = jwt.verify(refresh, process.env.SECRET_REFRESH_KEY);
		jwt.verify(token, process.env.SECRET_TOKEN_KEY);

		if (decodedToken.id !== decodedRefresh.id) throw Error("not logged in");

		// If both token valid, continue
		return next();
	} catch (err) {
		if (!decodedRefresh) {
			// If refresh token invalid, throw error
			res.status(401);
			return next(err);
		}
	}

	// Retrieve stored refresh token
	const cachedRefresh = await redisClient.getAsync(decodedRefresh.id);

	if (cachedRefresh !== refresh) {
		// If cached refresh token and sent refresh token are different, delete cookie and throw error
		res.status(401).cookie("access_token", "");
		return next(Error("not logged in"));
	}

	try {
		const decodedCached = jwt.decode(cachedRefresh, process.env.REFRESH_EXP);
		// If cached refresh token id and sent refresh token id are different, throw error
		if (decodedCached.id !== decodedRefresh.id)
			throw new Error("not logged in");
	} catch (err) {
		// Delete cookie and throw error
		res.status(401).cookie("access_token", "");
		return next(err);
	}

	// Get a new access token and send it as a cookie
	const newToken = signToken({ id: decodedRefresh.id });
	res.cookie("access_token", newToken);

	next();
};

module.exports = {
	signToken,
	decodeToken,
	isAuth,
};
