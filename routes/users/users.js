const express = require("express");

const { verifyToken, verifyUser, verifyAdmin } = require("../../utils/verifyToken");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("Hello user, you are logged in");
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("Hello user, you are logged in and you can delete your account");
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Hello admin, you are logged in and you can delete all accounts");
})

module.exports = router;