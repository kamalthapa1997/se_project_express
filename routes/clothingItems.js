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
router.put("/:itemid", updateItems);

//DELETE
router.delete("/:itemid", deleteItems);

router.put("/:itemid/likes", likeItem);
router.delete("/:itemid/likes", dislikeItem);

module.exports = router;
