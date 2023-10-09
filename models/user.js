const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { UnauthorizedError } = require("../utils/errors");
const { handleError } = require("../utils/config");

const userProfile = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,

    validate: {
      validator: (v) => validator.isEmail(v),
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userProfile.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new Error("Incorrect Password or Email");
      }

      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error("Incorrect Password or Email");
          }
          return user;
        })
        .catch((err) => {
          handleError(req, res, err);
          // throw new Error("Incorrect Password or Email");
        });
    });
};

module.exports = mongoose.model("user", userProfile);
