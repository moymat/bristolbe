const jwt = require("jsonwebtoken");
const cache = require("../db/cache");

const signToken = (payload, isRefresh = false) => {
  return isRefresh
    ? jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
        expiresIn: process.env.REFRESH_EXP,
      })
    : jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {
        expiresIn: process.env.TOKEN_EXP,
      });
};

const decodeToken = (token, isRefresh = false) => {
  return isRefresh
    ? jwt.decode(token, process.env.SECRET_REFRESH_KEY)
    : jwt.decode(token, process.env.SECRET_TOKEN_KEY);
};

const verifyToken = (token, isRefresh = false) => {
  return isRefresh
    ? jwt.verify(token, process.env.SECRET_REFRESH_KEY)
    : jwt.verify(token, process.env.SECRET_TOKEN_KEY);
};

const isAuth = async (req, res, next) => {
  // Retrieve access_tokens from cookie & refresh_token and browser_id  from headers
  const browserId = req.headers.browser_id;
  const refresh = req.headers.authorization?.split("Bearer ")[1];
  const { access_token: token } = req.cookies;

  let decodedRefresh;
  const notLoggedInError = new Error("not logged in");

  try {
    if (!browserId || !refresh || !token) throw notLoggedInError;

    decodedRefresh = verifyToken(refresh, true);
    const decodedToken = verifyToken(token);

    if (decodedToken.id !== decodedRefresh.id) throw notLoggedInError;

    // If both tokens valid, continue
    return next();
  } catch (err) {
    if (
      !decodedRefresh ||
      err === notLoggedInError ||
      (decodedRefresh && err.message !== "jwt expired")
    ) {
      // If refresh token invalid, throw error
      res.status(401);
      return next(notLoggedInError);
    }
  }

  // Retrieve stored refresh token
  const cachedRefresh = cache.get(`refresh_token_${browserId}`);

  if (cachedRefresh !== refresh) {
    // If cached refresh token and sent refresh token are different, delete cookie and throw error
    res.status(401).clearCookie("access_token");
    return next(notLoggedInError);
  }

  try {
    const decodedCached = decodeToken(cachedRefresh, true);
    // If cached refresh token id and sent refresh token id are different, throw error
    if (decodedCached.id !== decodedRefresh.id) throw notLoggedInError;
  } catch (err) {
    // Delete cookie and throw error
    res.status(401).clearCookie("access_token");
    return next(err);
  }

  // Get a new access token and send it as a cookie
  const newToken = signToken({ id: decodedRefresh.id });
  res.cookie("access_token", newToken, {
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV !== "development" ? "none" : null,
    maxAge: process.env.REFRESH_EXP,
  });

  next();
};

// Function to verify if the user making the request is authorize to do so
const isUserAuthz = (req, res, next) => {
  try {
    // Retrieving access token from the cookies and decoding it
    const { access_token: token } = req.cookies;
    const { id } = decodeToken(token);
    // Retrieving the user id in the query
    const { userId } = req.params;

    // If userId and if from token different, error
    if (userId !== id)
      throw Error("user doesn't have permission to access data");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signToken,
  decodeToken,
  verifyToken,
  isAuth,
  isUserAuthz,
};
