const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid").v4;
const jwt = require("jsonwebtoken");
const {
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../../helper/refreshTokenHelper");

module.exports = {
  createUser: async (args) => {
    const { email, name, password, confirmPassword } = args.userInput;

    /*Validation of Input */
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error("An account has already been created for this email.");
    }

    if (password !== confirmPassword) {
      throw new Error("These Passwords do not match");
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: hash,
      userId: uuidv4(),
    });

    const res = await newUser.save();
    return { ...res._doc, password: null };
  },
  loginUser: async (args, req) => {
    const { email, password } = args;
    //Validate User
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid Credentials!");
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      "somesupersecretkey",
      { expiresIn: 900 } //15 minutes
    );

    /*Generate refresh token and save in database */
    const refreshToken = generateRefreshToken();
    user.refreshToken = refreshToken.refreshToken;
    user.refreshExpiryDate = refreshToken.refreshExpiryDate;

    await user.save();

    /*Set Refresh Token in HttpOnly Cookie */
    req.res.cookie("refresh-token", refreshToken.refreshToken, {
      expires: refreshToken.refreshExpiryDate,
      httpOnly: true,
    });

    req.res.cookie(
      "refresh-token-expiry",
      refreshToken.refreshExpiryDate.toString(),
      {
        expires: refreshToken.refreshExpiryDate,
        httpOnly: true,
      }
    );

    return {
      userId: user.userId,
      token: token,
      tokenExpiration: 900,
    };
  },

  refreshAccessToken: async (args, req) => {
    /*Build Refresh Token from cookies */
    const refreshToken = req.cookies["refresh-token"];

    if (!refreshToken || refreshToken === "") {
      throw new Error("Refresh Token not found.");
    }

    const refreshExpiryDate = new Date(req.cookies["refresh-token-expiry"]);
    const token = {
      refreshToken: refreshToken,
      refreshExpiryDate: refreshExpiryDate,
    };

    const user = await User.findOne({
      refreshToken: refreshToken,
    });

    if (!user) {
      throw new Error("Refresh Token not found.");
    }

    const refreshValid = verifyRefreshToken(token);
    if (!refreshValid) {
      throw new Error("Refresh Token has expired. Please Sign In again.");
    }

    /*Valid Refresh token found  -- get user with that valid refresh token*/
    const newAccessToken = jwt.sign(
      { userId: user.userId, email: user.email },
      "somesupersecretkey",
      { expiresIn: 900 } //15 minutes
    );

    return {
      userId: user.userId,
      token: newAccessToken,
      tokenExpiration: 900,
    };
  },
};
