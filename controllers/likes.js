const ClothingItems = require("../models/clothingItems");
const handleError = require("../utils/config");

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
      console.log("itemID for llike", req.params.itemId);
      console.log("like ko lagi", req.user._id);
      handleError(req, res, err);
    });
};

const dislikeItem = (req, res) => {
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
    .catch((err) => {
      console.log("unlikelike ko lagi", req.user._id);

      handleError(req, res, err);
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
