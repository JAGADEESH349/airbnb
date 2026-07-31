const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn,saveRedirectUrl,isOwner,validatelisting}=require("../middleware.js");
const listingController=require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

   router.route("/")
      //all listings route
      .get( wrapAsync(listingController.index))
      // Create listing  Route
      .post(isLoggedIn,upload.single('hotel[image]'),validatelisting,wrapAsync(listingController.addNewListing))
      
   


   //Create listing form Route
   router.get("/new",isLoggedIn,listingController.RenderNewHotel);


   router.route("/:id")
      //listing update Route
      .patch(isLoggedIn,isOwner,upload.single('hotel[image]'),validatelisting, wrapAsync(listingController.UpdateListing))
      // listing show Route
      .get( wrapAsync(listingController.ShowListing))
      //listing delete Route
      .delete(isLoggedIn,isOwner, wrapAsync(listingController.DeleteListing));

   //listing edit form Route
   router.get("/edit/:id",isLoggedIn,isOwner,wrapAsync(listingController.getEditForm));

module.exports=router;