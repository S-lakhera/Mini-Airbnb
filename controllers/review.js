const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Added New Review !!");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteReview = async(req,res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
    req.flash("success","Review Deleted !!");
    res.redirect(`/listings/${id}`);
}