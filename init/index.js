const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");
require('dotenv').config();

main().then((res) => { 
    console.log("Connected to DB");
})
.catch((err) => {console.log(err);})
 
async function main(){
    await mongoose.connect(process.env.mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner:"685794bb0171272f644fe6b9",
    }))
    await Listing.insertMany(initData.data);
    console.log("Data was Initialized");
}
 
initDB();
