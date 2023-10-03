// const errorHandler = require("errorhandler");
// module.exports = { errorHandler };
module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const message = err.message;
  console.log("error details ", err);
  console.log("error satuscode", statusCode);
  res.status(statusCode).send({ message });
};
