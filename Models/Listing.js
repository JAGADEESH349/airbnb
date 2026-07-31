const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./Review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://i.pinimg.com/736x/a5/25/86/a52586ab1561ad8e9a9f6f7b7b159002.jpg"
    }
},

    price: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },
    Reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

 listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.Reviews}});
    }
 })

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;