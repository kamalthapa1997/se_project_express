const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { BadRequestError } = require("../errors/BadRequestError");
const { NotFoundError } = require("../errors/NotFoundError");
const { ConflictError } = require("../errors/ConflictError");

const getUsers = (req, res, next) => {
  UserProfile.find({})
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("Error has occured.");
      }
      res.status(200).send({ data: userData });
    })

    .catch((err) => {
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  UserProfile.findById(userId)
    .orFail(() => new NotFoundError("Data was not found."))
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("Error has occured.");
      }

      res.status(200).send({ data: userData });
    })

    .catch((err) => {
      next(err);
    });
};

// login

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  UserProfile.findOne({ email })

    .then((user) => {
      if (!email) {
        throw new BadRequestError("Validation Error");
      }

      if (user) {
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
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  UserProfile.findUserByCredentials(email, password)

    .then((user) => {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })

    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const opts = { new: true, runValidators: true };

  UserProfile.findByIdAndUpdate(
    {
      _id: req.user._id,
    },
    { name: req.body.name, avatar: req.body.avatar },
    opts,
  )
    .orFail(() => new NotFoundError("Data was not found."))
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Name or Avatar"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  updateProfile,
  login,
  getCurrentUser,
};
