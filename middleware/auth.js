const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  req.isAuth = false;
  /*No Auth header Found */
  if (!authHeader) {
    return next();
  }

  /*No Token found or token is empty */
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return next();
  }

  /*Validate Token */
  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    /*Token Invalid */
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
