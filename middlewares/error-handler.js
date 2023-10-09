module.exports = (err, res) => {
  const { statusCode, message } = err;

  console.log(message);

  console.log("error satuscode", statusCode);
  res.status(statusCode).send({ message });
};
