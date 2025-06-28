const joi = require("joi");
// import joi from 'joi';

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().trim().required(),
        country: joi.string().required(),
        location: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.object({
            url: joi.string().allow("", null),
            filename: joi.string().optional()
        }),
        category: joi.string().valid(
            "Trending",
            "Rooms",
            "Iconic Cities",
            "Pools",
            "Beach",
            "Mountains",
            "Farms",
            "Lake Front",
            "Cabin",
            "Castle",
            "Other"
          ).default("Other") // optional: default value
    }).required()
}) 

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().min(1).max(5).required(),
        comment: joi.string().required()
    }).required()
})