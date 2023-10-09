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
const { validateUserId } = require("../middlewares/validation");

router.post("/", authorize, createItem);

// READ
router.get("/", getItems);

// Update

// DELETE
router.delete("/:itemId", authorize, validateUserId, deleteItems);

router.put("/:itemId/likes", authorize, validateUserId, likeItem);

router.delete("/:itemId/likes", authorize, validateUserId, dislikeItem);

module.exports = router;
