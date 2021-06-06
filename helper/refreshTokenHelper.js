const uuidv4 = require("uuid").v4;

module.exports = {
  generateRefreshToken: () => {
    let refreshExpiryDate = new Date();
    refreshExpiryDate.setSeconds(refreshExpiryDate.getSeconds() + 86400); //24 hrs
    const refreshToken = uuidv4();
    return {
      refreshToken: refreshToken,
      refreshExpiryDate: refreshExpiryDate,
    };
  },

  verifyRefreshToken: (token) => {
    return token.refreshExpiryDate.getTime() > new Date(Date.now()).getTime();
  },
};
