const { BadRequestError } = require("../errors/BadRequestError");
const { ForbiddenError } = require("../errors/ForbiddenError");
const { NotFoundError } = require("../errors/NotFoundError");

const ClothingItems = require("../models/clothingItems");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItems.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("You have Passed invalid data"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItems.find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((err) => {
      next(err);
      // next(new NotFoundError("Error on getting items"));
    });
};

const deleteItems = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItems.findById(itemId)
    .orFail(() => new NotFoundError("Item is not found."))
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        throw new ForbiddenError("Requedted permission has been denied.");
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully" }),
        );
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItems,
};
