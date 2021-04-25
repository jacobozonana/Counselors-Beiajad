const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      // Bearer y el token que le mandamos
      // authorization.split -> ['Bearer', 'token']
      const token = authorization.split(" ")[1]; // El 0 es Bearer y 1 es el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Auth error", err });
    }
  },
};
