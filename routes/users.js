const router = require("express").Router();
const { updateProfile, getCurrentUser } = require("../controllers/user");
const { validateUserId } = require("../middlewares/validation");

// GET USER
router.get("/me", getCurrentUser);

// READ

// UPDATE
router.patch("/me", validateUserId, updateProfile);

// DELETE

module.exports = router;
