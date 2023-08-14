const router = require("express").Router();
const authorize = require("../middlewares/auth");
// CRUD
// CREATE
const {
  createItem,
  getItems,

  deleteItems,
} = require("../controllers/clothingItems");
const { likeItem, dislikeItem } = require("../controllers/likes");

console.log(1);

router.post("/", authorize, createItem);

// READ
router.get("/", getItems);

// Update

// DELETE
router.delete("/:itemId", authorize, deleteItems);

router.put("/:itemId/likes", authorize, likeItem);

router.delete("/:itemId/likes", authorize, dislikeItem);

module.exports = router;
