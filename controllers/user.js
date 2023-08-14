const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");
const { default: isEmail } = require("validator/lib/isEmail");
const user = require("../models/user");

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
  const { userId } = req.params;
  UserProfile.findById(userId)
    .orFail()
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

////CREATE-USER

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(req.body);

  UserProfile.findOne({ email })
    .select("+password")

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
        .status(201)
        .send({ name: user.name, avatar: user.avatar, email: user.email });
    })
    .catch((err) => {
      console.log("Create USER kooooo ERROR", err.name);
      // if (err.message === "Error") {
      //   return res.status(409).send({ message: err.message });
      // }
      if (err.message === "Validation Error") {
        return res.status(400).send({ message: err.message });
      }
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
    .catch((err) => {
      console.log(`login ko err:: ${err.name} `);
      console.log(user._id);

      handleError(req, res, err);
    });
};

const updateProfile = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  UserProfile.findByIdAndUpdate(userId, { $set: { avatar } })
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
