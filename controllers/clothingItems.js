const ClothingItems = require("../models/clothingItems");
const { handleError } = require("../utils/config");
const { ERROR_403 } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
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

const deleteItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItems.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(ERROR_403)
          .send({ message: "Request permission is forbidden " });
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully" }),
        );
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItems,
};
