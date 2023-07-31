const router = require("express").Router();
const clothingItems = require("./clothingItems");
const createProfile = require("./users");
const handleError = require("../utils/config");

router.use("/items", clothingItems);
router.use("/users", createProfile);

router.use((req, res) => {
  handleError(req, res, err);
});

module.exports = router;
