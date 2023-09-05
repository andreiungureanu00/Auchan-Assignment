const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (header) {
    const token = header.split(" ")[1];

    jwt.verify(token, process.env.secretKey, (err, user) => {
      if (err) {
        return res.status(403).send("Incorrect token");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(403).send("User not authenticated");
  }
};

module.exports = { authenticate };
