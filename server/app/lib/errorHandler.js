errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.message === "not logged in" || err.message === "jwt expired")
    res.clearCookie("access_token");
  res.status(400).json({ error: err.message });
};

module.exports = errorHandler;
