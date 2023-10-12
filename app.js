const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/error-handler");
const { limiter } = require("./middlewares/rateLimit");

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());

// our centralized handler

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
