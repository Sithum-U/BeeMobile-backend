const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../../controllers/users/user");
const { protect } = require("../../middlewares/authMiddleware");
// const { verifyToken, verifyUser, verifyAdmin } = require("../../utils/verifyToken");

const router = express.Router();

router.post("/", registerUser);
router.get("/", getAllUsers);
router.post("/login", authUser);
router.post("/profile", protect, updateUserProfile);
router.delete("/:id", deleteUser);

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in");
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in and you can delete your account");
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, you are logged in and you can delete all accounts");
// })

//UPDATE
// router.put("/:id", verifyUser, updateUser);

// //DELETE
// router.delete("/:id", verifyUser, deleteUser);

// //GET
// router.get("/:id", verifyUser, getUser);

// //GETALL
// router.get("/", verifyAdmin, getUsers);

module.exports = router;
