const { reviewSchema } = require("../HotelSchema.js");
const Review=require("../Models/Review.js");
const Listing = require("../Models/Listing.js");

module.exports.PostReview=async (req,res)=>{
      const listing=await Listing.findById(req.params.id);
      const Newreview=new Review(req.body.review);
        Newreview.author = req.user._id;
       await Newreview.save();
      listing.Reviews.push(Newreview);
      await listing.save();   
      console.log("review Submitted");
      res.redirect(`/listings/${listing._id}`);
   };

module.exports.DeleteReview=async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: { Reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Your Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
};

