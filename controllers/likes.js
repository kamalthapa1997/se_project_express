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
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch(() => {
      next(new NotFoundError("Data was not found"));
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItems.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch(() => {
      next(new NotFoundError("Data was not found"));
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
