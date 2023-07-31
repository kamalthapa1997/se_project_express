const router = require("express").Router();
const {
  createProfile,
  updateProfile,
  getUsers,
  deleteProfile,
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
router.delete("/:userId", deleteProfile);

//GET USER
router.get("/:userId", getCurrentUser);

module.exports = router;
