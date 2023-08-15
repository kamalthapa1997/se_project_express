const router = require("express").Router();
const { updateProfile, getCurrentUser } = require("../controllers/user");

// GET USER
router.get("/me", getCurrentUser);

// READ

// UPDATE
router.patch("/me", updateProfile);

// DELETE

module.exports = router;
