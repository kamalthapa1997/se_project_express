const { NotFoundError } = require("../errors/NotFoundError");
const ClothingItems = require("../models/clothingItems");

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItems.findByIdAndUpdate(
    itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => new NotFoundError("Data was not found"))
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItems.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Data was not found"))
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
