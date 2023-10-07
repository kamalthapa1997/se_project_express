const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRoutes = require("./users");
const { ERROR_404 } = require("../utils/errors");
const { login, createUser } = require("../controllers/user");
const authorize = require("../middlewares/auth");
const {
  validateuserInfo,
  validateloginAuth,
} = require("../middlewares/validation");

router.post("/signup", validateuserInfo, createUser);

router.post("/signin", validateloginAuth, login);

router.use("/items", clothingItems);
router.use("/users", authorize, userRoutes);

// router.use((req, res) => {
//   res
//     .status(ERROR_404)
//     .send({ message: "The requested resource not found sorry" });
// });

module.exports = router;
