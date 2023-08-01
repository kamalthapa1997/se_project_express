const UserProfile = require("../models/user");
const handleError = require("../utils/config");

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

const createProfile = (req, res) => {
  const { name, avatar } = req.body;

  UserProfile.create({ name, avatar })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
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
  createProfile,
  getUsers,
  updateProfile,

  getCurrentUser,
};
