const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");
const {
  ERROR_401,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

const getUsers = (req, res, next) => {
  UserProfile.find({})
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("Error has occured.");
      }
      res.status(200).send({ data: userData });
    })
    .catch(next);
  // .catch((err) => {
  //   handleError(req, res, err);
  // });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  console.log("ID", req.user.id);
  console.log(3);
  console.log(userId);
  UserProfile.findById(userId)
    .orFail()
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("Error has occured.");
      }
      res.status(200).send({ data: userData });
    })
    .catch(next);
  // .catch((err) => {
  //   handleError(req, res, err);
  // });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  console.log(req.body);

  UserProfile.findOne({ email })

    .then((user) => {
      if (!email) {
        // throw new Error("Validation Error");
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
      if (!user) {
        throw new BadRequestError("Validation Error");
      }
      res
        .status(200)
        .send({ name: user.name, avatar: user.avatar, email: user.email });
    })
    .catch((err) => {
      console.log("error for creating id", err);
      // next(err);

      handleError(req, res, err);
    });
};

// login

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  UserProfile.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Invalid email or password");
      }
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((e) => {
      // const err = new UnauthorizedError("Incorrect email or password");
      next(e);
    });
  // .catch(() => {
  //   res.status(ERROR_401).send({ message: "Invalid Credentials" });
  // });
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
    .orFail()
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      next(err);
      // handleError(req, res, err);
    });
};

module.exports = {
  createUser,
  getUsers,
  updateProfile,
  login,
  getCurrentUser,
};
