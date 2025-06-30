const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");
require('dotenv').config({ path: '../.env' });

// Mapbox integration
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

main().then(() => {
    console.log("✅ Connected to DB");
}).catch((err) => {
    console.error("❌ DB Connection Error:", err);
}); 

async function main() {
    await mongoose.connect(process.env.mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    // Enrich data with geometry from Mapbox
    for (let obj of initData.data) {
        const geoData = await geocodingClient.forwardGeocode({
            query: obj.location,
            limit: 1
        }).send();

        obj.geometry = geoData.body.features[0]?.geometry || {
            type: "Point",
            coordinates: [0, 0] // fallback in case Mapbox fails
        };
    }

    await Listing.insertMany(initData.data);
    console.log("🌱 Data was Initialized with Geometry");
};

initDB();
