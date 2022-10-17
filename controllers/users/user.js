const asyncHandler = require("express-async-handler");
const User = require("../../models/users/User");
const generateToken = require("../../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await User.findByIdAndDelete(_id);
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Record is not Deleted successfully",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Record is Deleted successfully",
        data: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Not Found record",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Result Found",
        data: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registerUser,
  authUser,
  updateUserProfile,
  deleteUser,
  getAllUsers,
};

// const { createError } = require("../../utils/error");

// const updateUser = async (req, res, next) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updatedUser);
//     } catch (err) {
//         next(err);
//     }
// }

// const deleteUser = async (req, res, next) => {
//     try {
//         await User.findByIdAndDelete(
//             req.params.id
//         );
//         res.status(200).json("User has been deleted");
//     } catch (err) {
//         next(err);
//     }
// }

// const getUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(
//             req.params.id
//         );
//         res.status(200).json(user);
//     } catch (err) {
//         next(err);
//     }
// }

// const getUsers = async (req, res, next) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (err) {
//         next(err);
//     }
// }

// module.exports = { updateUser, deleteUser, getUser, getUsers }
