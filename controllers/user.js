const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");
const { default: isEmail } = require("validator/lib/isEmail");

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
  // console.log(email);
  // console.log(req.body);
  // console.log(!!email);

  UserProfile.findOne({ email })

    .then((user) => {
      if (email == false) {
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
      console.log("Create USER ERROR", err.name);
      if (err.message === "Email already exist") {
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
      const token = jwt.sign({ _id: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log(`login ko err:: ${err.name} `);
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
