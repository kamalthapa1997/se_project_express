const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");

const getUsers = (req, res) => {
  UserProfile.find({})
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  console.log("ID", req.user.id);
  console.log(3);
  console.log(userId);
  UserProfile.findById(userId)
    .orFail()
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(212);
  console.log(req.body);

  UserProfile.findOne({ email })

    .then((user) => {
      if (!email) {
        throw new Error("Validation Error");
      }
      if (user) {
        throw new Error("Email already exist");
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
      handleError(req, res, err);
    });
};

// login

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  UserProfile.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch(() => {
      res.status(ERROR_401).send({ message: "Invalid Credentials" });
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
