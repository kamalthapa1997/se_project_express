const router = require("express").Router();
const { updateProfile, getCurrentUser } = require("../controllers/user");
const { validateProfileUpdate } = require("../middlewares/validation");

// GET USER
router.get("/me", getCurrentUser);

// READ

// UPDATE
router.patch("/me", validateProfileUpdate, updateProfile);

// DELETE

module.exports = router;
