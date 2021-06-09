const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  req.isAuth = false;
  /*No Auth header Found */
  if (!authHeader) {
    //console.log("here1");
    return next();
  }

  /*No Token found or token is empty */
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    //console.log("here2");
    return next();
  }

  /*Validate Token */
  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    /*Token Invalid */
    //console.log("here3");
    return next();
  }
  //console.log("here4");
  req.isAuth = true;
  req.userId = decodedToken.userId;
  //console.log(req.isAuth);
  next();
};
