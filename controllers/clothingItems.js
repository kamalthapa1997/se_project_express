const ClothingItems = require("../models/clothingItems");
const handleError = require("../utils/config");

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;
  ClothingItems.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const getItems = (req, res) => {
  ClothingItems.find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const updateItems = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItems.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItems.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({}))
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  updateItems,
  deleteItems,
};
