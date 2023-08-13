const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");

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

    .then((data) => {
      if (!email) {
        throw new Error({ message: "Validation Error" });
      }
      if (email) {
        throw new Error({ message: "Email already exist" });
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
      res.send(user);
    })
    .catch((err) => {
      console.log(`create user KO error ${err.name}`);
      handleError(req, res, err);
    });
};

// login

const login = (req, res) => {
  const { email, password } = req.body;

  UserProfile.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log(`login ko err:: ${err.name} `);
      res.status(401).send({ message: err.message });
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
