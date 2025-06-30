const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const { storage } = require("../cloudConfig.js");

const multer = require('multer')
const upload = multer({ storage })

// ShowListing Route, CreateNewListing Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing));

//Render NewListing Form Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Load More Listings API
router.get("/load", wrapAsync(listingController.loadMoreListings));

//Show Route, Update Route, Delete Route
router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.updateListing))

    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)
    );

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;