const router = require("express").Router();
const authorize = require("../middlewares/auth");
const {
  createUser,
  updateProfile,
  getUsers,
  getCurrentUser,
  login,
} = require("../controllers/user");

// CRUD
// CREATE
// router.post("/", createUser);
// router.post("/signin", login);

// READ
// router.get("/", getUsers);

// UPDATE
router.put("/me", authorize, updateProfile);

// DELETE

// GET USER
router.get("/me", authorize, getCurrentUser);

module.exports = router;
