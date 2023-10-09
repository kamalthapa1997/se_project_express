const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");
const { ERROR_401, ConflictError } = require("../utils/errors");
const { BadRequestError } = require("../errors/BadRequestError");

const getUsers = (req, res) => {
  UserProfile.find({})
    .then((userData) => {
      if (!userData) {
        throw new Error("Error has occured.");
      }
      res.status(200).send({ data: userData });
    })

    .catch((err) => {
      handleError(req, res, err);
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  UserProfile.findById(userId)
    .orFail()
    .then((userData) => {
      if (!userData) {
        throw new Error("Error has occured.");
      }
      res.status(200).send({ data: userData });
    })

    .catch((err) => {
      handleError(req, res, err);
    });
};

// login

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  UserProfile.findOne({ email })

    .then((user) => {
      if (!email) {
        // throw new Error("Validation Error");
        throw new BadRequestError("Validation Error");
      }

      if (user) {
        // throw new Error("Email already exist");
        throw new ConflictError("Email already exist");
      }

      return bcrypt.hash(password, 10);
    })

    .then((hash) =>
      UserProfile.create({
        name,

        avatar,

        email,

        password: hash,
      }),
    )

    .then((user) => {
      res

        .status(200)

        .send({ name: user.name, avatar: user.avatar, email: user.email });
    })

    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Data Entered"));
      } else {
        next(err);
      }

      // handleError(req, res, err);
    });
};
const login = (req, res) => {
  const { email, password } = req.body;

  UserProfile.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Error("Invalid email or password");
      }

      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })

    .catch(() => {
      res
        .status(ERROR_401)
        .send({ message: " you have entered invalid Credentials" });
    });
};

const updateProfile = (req, res) => {
  const opts = { new: true, runValidators: true };

  UserProfile.findByIdAndUpdate(
    {
      _id: req.user._id,
    },
    { name: req.body.name, avatar: req.body.avatar },
    opts,
  )
    .orFail()
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = {
  createUser,
  getUsers,
  updateProfile,
  login,
  getCurrentUser,
};
