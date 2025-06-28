const User = require("../models/user.js");
module.exports.signup = 
async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email })
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser,(err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to the Wanderlust...");
            res.redirect("/listings");
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

module.exports.login = async (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout =  (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        };
        req.flash("success","Logged You Out!!");
        res.redirect("/listings");
    });
};