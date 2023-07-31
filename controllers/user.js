const user = require("../models/user");
const UserProfile = require("../models/user");
const handleError = require("../utils/config");

const getUsers = (req, res) => {
  UserProfile.find({})
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      console.log(" error", err);

      handleError(req, res, err);
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  console.log("kamal", userId);

  UserProfile.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      console.log(" error", err);
      handleError(req, res, err);
    });
};

const createProfile = (req, res) => {
  console.log(req.body);
  const { name, avatar } = req.body;

  UserProfile.create({ name, avatar })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("this is error", err);
      handleError(req, res, err);
    });
};

const updateProfile = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  console.log(userId, avatar);

  UserProfile.findByIdAndUpdate(userId, { $set: { avatar: avatar } })
    .orFail()
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const deleteProfile = (req, res) => {
  const { userId } = req.params;

  UserProfile.findByIdAndDelete(userId)
    .orFail()
    .then((userData) => {
      res.status(204).send({});
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = {
  createProfile,
  getUsers,
  updateProfile,
  deleteProfile,
  getCurrentUser,
};
