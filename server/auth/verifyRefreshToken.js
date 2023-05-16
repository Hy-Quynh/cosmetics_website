const jwt = require("jsonwebtoken");
const { getToken } = require("../models/token");
const privateKey = process.env.REFRESH_TOKEN_SECRET_KEY;

const verifyRefreshToken = async (refreshToken) => {
  try {
    const token = await getToken(refreshToken);
    if (token?._id) {
      const verifyJWT = jwt.verify(refreshToken, privateKey);
      if (verifyJWT?._id) {
        return verifyJWT;
      }
    }
  } catch (error) {
    return { error: true, message: "Invalid refresh token" };
  }
};

module.exports = verifyRefreshToken;
