module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const message = err.message;
  console.log(message);

  console.log("error satuscode", statusCode);
  res.status(statusCode).send({ message });
};
