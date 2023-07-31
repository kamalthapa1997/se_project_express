const router = require("express").Router();
const clothingItems = require("./clothingItems");
const createProfile = require("./users");

router.use("/items", clothingItems);
router.use("/users", createProfile);

router.use((req, res) => {
  res.status(500).send({ message: "Router   not  Found" });
});

module.exports = router;
