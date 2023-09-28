const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "secret3", (err, decoded) => {
      if (err) {
        res.status(201).send({ msg: "Please log in first" });
      } else {
        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
      }
    });
  } else {
    res.status(201).send({ msg: "Please log in again" });
  }
};
module.exports = auth;
