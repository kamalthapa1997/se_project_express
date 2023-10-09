module.exports = (err, req, res) => {
  const statusCode = err.statusCode;
  const message = err.message;

  console.log("error satuscode", statusCode);
  res.status(statusCode).send({ message });
};
