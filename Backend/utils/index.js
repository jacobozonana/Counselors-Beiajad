const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  comparePasswords: (passwordReq, passwordHashed) => {
    return bcrypt.compareSync(passwordReq, passwordHashed);
  },
  createToken: (user) => {
    const payload = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, //Estamos dandole un tiempo de expiracion al token
    };
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return token;
    } catch {
      return undefined;
    }
  },
};
