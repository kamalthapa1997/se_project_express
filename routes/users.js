const router = require("express").Router();
const {
  createProfile,
  updateProfile,
  getUsers,
  getCurrentUser,
} = require("../controllers/user");

//CRUD
//CREATE
router.post("/", createProfile);

//READ
router.get("/", getUsers);

//UPDATE
router.put("/:userId", updateProfile);

//DELETE

//GET USER
router.get("/:userId", getCurrentUser);

module.exports = router;
