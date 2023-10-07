require("dotenv").config();
const { ERROR_400, ERROR_404, ERROR_500, ERROR_409 } = require("./errors");
//// JWT_SECRET

const { JWT_SECRET = "some long strinq" } = process.env;

const handleError = (req, res, error) => {
  if (
    error.name === "ValidationError" ||
    error.message === "Validation Error"
  ) {
    res.status(ERROR_400).send({ message: "Passed invalid data" });
  } else if (error === "Email already exist") {
    res.status(ERROR_409).send({ message: error.message });
  } else if (error.name === "CastError") {
    res.status(ERROR_400).send({ message: "Passed invalid ID" });
  } else if (error.name === "DocumentNotFoundError") {
    res.status(ERROR_404).send({ message: "Data was not found" });
  } else {
    res.status(ERROR_500).send({
      message: "An error has occured on the server",
    });
  }
};

module.exports = { handleError, JWT_SECRET };
