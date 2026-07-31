const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
 const {isLoggedIn,isAuthor,validatereview}=require("../middleware.js");
 const reviewController=require("../controllers/reviews.js");


   ///posting reviews route
   router.post("/",isLoggedIn,validatereview,wrapAsync(reviewController.PostReview));

   //review delete route
   router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.DeleteReview));

   module.exports=router;