const router = require("express").Router();
const authorize = require("../middlewares/auth");
const { updateProfile, getCurrentUser } = require("../controllers/user");

// GET USER
router.get("/me", authorize, getCurrentUser);

// READ

// UPDATE
router.patch("/me", authorize, updateProfile);

// DELETE

module.exports = router;
