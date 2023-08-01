const router = require("express").Router();
const clothingItems = require("./clothingItems");
const createProfile = require("./users");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItems);
router.use("/users", createProfile);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "The requested resource not found" });
});

module.exports = router;
