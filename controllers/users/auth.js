// const User = require("../../models/users/User");
// const createError = require("../../utils/error");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const register = async (req, res, next) => {
//     try {
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);

//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: hash,
//         });

//         await newUser.save()
//         res.status(200).send("User has been Created");
//     } catch (err) {
//         next(err);
//     }
// }

// const login = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ username: req.body.username });
//         if (!user) return next(createError(404, "User not found!"));

//         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

//         const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
//         if (!isPasswordCorrect) return next(createError(400, "Wrong password!"));

//         const { password, ...otherDetails } = user._doc;
//         res.cookie("access_token", token, { httpOnly: true, }).status(200).json({ ...otherDetails, message: "Login successful" });
//         res.status(200).json(user);
//     } catch (err) {
//         next(err);
//     }
// }

// VALID PART
// exports.register = async (req, res, next) => {
//     const { username, email, password, isAdmin } = req.body;

//     if (password.length < 6) {
//         return res.status(400).json({ message: "Password less than 6 characters" });
//     }
//     bcrypt.hash(password, 10).then(async (hash) => {
//         await User.create({
//             username,
//             email,
//             password: hash,
//             isAdmin
//         })
//             .then((user) =>
//                 res.status(200).json({
//                     message: "User successfully created",
//                     user,
//                 })
//             )
//             .catch((error) =>
//                 res.status(400).json({
//                     message: "User not successful created",
//                     error: error.message,
//                 })
//             );
//     });
// };

// exports.login = async (req, res, next) => {
//     const { username, password } = req.body; //creating a new user object with the request body
//     // Check if username and password is provided
//     if (!username || !password) {
//         return res.status(400).json({
//             message: "Username or Password not present",
//         });
//     }
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             res.status(400).json({
//                 message: "Login not successful",
//                 error: "User not found",
//             });
//         } else {
//             // comparing given password with hashed password
//             bcrypt.compare(password, user.password).then(function (result) {
//                 result
//                     ? res.status(200).json({
//                         message: "Login successful",
//                         user,
//                     })
//                     : res.status(400).json({ message: "Login not succesful" });
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             message: "An error occurred",
//             error: error.message,
//         });
//     }
// };

// module.exports = { register, login }

