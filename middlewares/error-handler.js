const errorHandler = (err, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(message);

  console.log("error satuscode", statusCode);
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error has aoccured on the server" : "",
  });
};

module.exports = { errorHandler };
