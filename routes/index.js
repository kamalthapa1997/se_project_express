const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRoutes = require("./users");
const { ERROR_404 } = require("../utils/errors");
const { login, createUser } = require("../controllers/user");
const { authorize } = require("../middlewares/auth");

router.use("/items", clothingItems);
router.use("/users", authorize, userRoutes);
router.post("/signup", createUser);
router.post("/signin", login);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "The requested resource not found" });
});

module.exports = router;
