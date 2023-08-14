const ClothingItems = require("../models/clothingItems");
const handleError = require("../utils/config");

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
  console.log("Getting items");
  ClothingItems.find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((err) => {
      handleError(req, res, err);
      console.log(data);
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItems.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({ message: "Item successfully deleted" }))
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItems,
};
