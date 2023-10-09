const router = require("express").Router();
const { updateProfile, getCurrentUser } = require("../controllers/user");
const {
  validateUpdateCurrentUser,
  validateUserId,
} = require("../middlewares/validation");

// GET USER
router.get("/me", validateUpdateCurrentUser, getCurrentUser);

// READ

// UPDATE
router.patch("/me", validateUserId, updateProfile);

// DELETE

module.exports = router;
