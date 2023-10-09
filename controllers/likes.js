const ClothingItems = require("../models/clothingItems");
const { handleError } = require("../utils/config");

const likeItem = (req, res) => {
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
    .catch((err) => {
      handleError(req, res, err);
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  console.log("dislike id", itemId);

  ClothingItems.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
