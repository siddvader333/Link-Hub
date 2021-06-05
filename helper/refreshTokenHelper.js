const uuidv4 = require("uuid").v4;

module.exports = {
  generateRefreshToken: () => {
    let expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + 86400); //24 hrs
    const refreshToken = uuidv4();
    return {
      refreshToken: refreshToken,
      expiryDate: expiryDate,
    };
  },

  verifyRefreshToken: (token) => {
    return token.expiryDate.getTime() < newDate().getTime();
  },
};
