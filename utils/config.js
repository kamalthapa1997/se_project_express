const { ERROR_400, ERROR_404, ERROR_500 } = require("./errors");

const handleError = (req, res, error) => {
  if (error.name === "CastError") {
    res.status(ERROR_400).send({ message: "Passed invalid ID" });
  } else if (error.name === "ValidationError") {
    res.status(ERROR_400).send({ message: "Passed invalid data" });
  } else if (error.name === "DocumentNotFoundError") {
    res.status(ERROR_404).send({ message: "Data was not found" });
  } else {
    res.status(ERROR_500).send({
      message: "An error has occured on the server",
    });
  }
};
module.exports = handleError;
