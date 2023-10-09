const errorHandler = (err, req, res, next) => {
  console.error("error names", err);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has aoccured on the server" : message,
  });
};

module.exports = { errorHandler };
