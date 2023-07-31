const router = require("express").Router();
//CRUD
//CREATE
const {
  createItem,
  getItems,
  updateItems,
  deleteItems,
} = require("../controllers/clothingItems");
const { likeItem, dislikeItem } = require("../controllers/likes");
router.post("/", createItem);

//READ
router.get("/", getItems);

//Update
router.put("/:itemId", updateItems);

//DELETE
router.delete("/:itemId", deleteItems);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
