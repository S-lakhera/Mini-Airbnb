process.on('unhandledRejection', err => {
    console.error("Unhandled Rejection:", err);
});
process.on('uncaughtException', err => {
    console.error("Uncaught Exception:", err);
});


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongo_url = process.env.mongo_url;
const PORT = process.env.PORT || 3000;

const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");

const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const store = MongoStore.create({
    mongoUrl: mongo_url,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
});
store.on("error", (err) => {
    console.log("Error on Mongo DB session Store", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
};

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Middlewares
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    console.error("Global Error Handler:", err);
    res.status(statusCode).render("error.ejs", { message });
});

// ✅ Better startup sequence
async function startServer() {
    try {
        await mongoose.connect(mongo_url);
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB", err);
    }
}

startServer();
