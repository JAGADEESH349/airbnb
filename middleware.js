const Listing = require("./Models/Listing.js");
const Review = require("./Models/Review.js");
const { HotelSchema } = require("./HotelSchema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./HotelSchema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        if (!req.session.redirectUrl) {
            req.session.redirectUrl = req.originalUrl;
        }
        req.flash("error","please login to the Wanderlust");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {

    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
};

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you dont have access to this Service");
        return res.redirect(`/listings/${id}`);
    }

    next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You can't delete this review.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validatelisting=(req,res,next)=>{
           let {error}=HotelSchema.validate(req.body);  
           if(error){
              let errMsg=error.details.map((el)=>el.message).join(".");
              throw new ExpressError(400,errMsg);
           }
           else{
              next();
           }
        }

module.exports.validatereview=(req,res,next)=>{
         let {error}=reviewSchema.validate(req.body);
         if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errMsg);
         }
         else{
            next();
         }
      }