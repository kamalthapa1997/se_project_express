const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    unique: true,
    validate: {
      validator: (e) => validator.isEmail(e),
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userProfile.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      throw new Error({ message: "Incorrect Password or Email" });
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new Error({ message: "Incorrect Password or Email" });
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userProfile);
