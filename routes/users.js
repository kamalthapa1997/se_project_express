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
router.put("/:userid", updateProfile);

//DELETE
router.delete("/:userid", deleteProfile);

//GET USER
router.get("/users/:userid", getCurrentUser);

module.exports = router;
