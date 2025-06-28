const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// Get Route, Post Route 
router.route("/signup")
.get((req, res) => {res.render("users/signup.ejs")})
.post(wrapAsync(userController.signup));

router.route("/login")
.get((req, res) => {res.render("users/login.ejs")})
.post(saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Invalid username or password."
}),
userController.login
);


router.get("/logout", userController.logout);

module.exports = router;