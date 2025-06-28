const express = require("express");
const router = express.Router({ mergeParams:true });
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");
const reviewController = require("../controllers/review.js")

//Post Route
router.post("/",
isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
)

//Delete Review Route
router.delete("/:reviewId", 
isLoggedIn,
isReviewAuthor,
wrapAsync(reviewController.deleteReview))

module.exports = router;