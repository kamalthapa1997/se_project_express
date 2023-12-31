const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRoutes = require("./users");
const { login, createUser } = require("../controllers/user");
const authorize = require("../middlewares/auth");
const {
  validateuserInfo,
  validateloginAuth,
} = require("../middlewares/validation");

const { NotFoundError } = require("../errors/NotFoundError");

router.post("/signup", validateuserInfo, createUser);

router.post("/signin", validateloginAuth, login);

router.use("/items", clothingItems);
router.use("/users", authorize, userRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("The request resource is not found."));
});

module.exports = router;
