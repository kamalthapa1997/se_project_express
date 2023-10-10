const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");
const { UnauthorizedError } = require("../errors/UnauthorizationError");

const handleAuthError = (req, res, next) => {
  next(new UnauthorizedError("Authorization Error"));
  // res.status(ERROR_401).send({ message: "Authorization Error" });
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};

module.exports = authorize;
