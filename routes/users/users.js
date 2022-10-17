const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../../controllers/users/user");
const { protect } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.get("/", getAllUsers);
router.post("/login", authUser);
router.post("/profile", protect, updateUserProfile);
router.delete("/:id", deleteUser);

module.exports = router;
