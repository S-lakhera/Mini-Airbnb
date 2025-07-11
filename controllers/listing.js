const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = (async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
});

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing is Deleted / Not found...");
        res.redirect("/listings");
    }
    // console.log(listing.reviews);
    
    res.render("listings/show.ejs", { listing });

};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    let response = await geocodingClient.forwardGeocode({
        query: newListing.location,
        limit: 1
      })
        .send()

    newListing.geometry = response.body.features[0].geometry;

    let url = req.file.path;
    let filename = req.file.filename;

    newListing.owner = req.user._id;
    newListing.image = {filename, url};
    // Save the new listing to the database
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    // Redirect to the listings page
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing is Deleted / Not found...");
        res.redirect("/listings");
    }
    let imageUrl = listing.image.url;
    imageUrl = imageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs", { listing, imageUrl }); 
}

module.exports.updateListing = 
    async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        if(typeof req.file !== "undefined"){
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = {filename, url};
            await listing.save()
        }
        req.flash("success","Changes Saved Successfully!!");
        res.redirect(`/listings/${id}`);
    }
    

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Successfully!!");
    res.redirect("/listings");
}

module.exports.loadMoreListings = async (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = 12;

    const listings = await Listing.find({})
        .skip(offset)
        .limit(limit);

    res.json(listings);
};