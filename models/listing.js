const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String 
    }, 
    image:{
        filename:String,
        url:String
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    category:{
        type:String,
        enum:["Trending","Rooms","Iconic Cities","Pools","Beach","Mountains","Farms","Lake Front","Cabin","Castle","Other"],
        default:"Other",
    }
});

listingSchema.post("findOneAndDelete", async(listing)=> {
    if(listing){
        await review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = new mongoose.model("Listing",listingSchema);

module.exports = Listing;