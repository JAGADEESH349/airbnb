 const Listing = require("../Models/Listing.js");
  const {HotelSchema}=require("../HotelSchema.js");

 module.exports.index=async (req, res) => {
       const listings = await Listing.find({});
       res.render("listings/index.ejs", { listings, title: "home" });
 
    };

module.exports.RenderNewHotel=(req, res) => {
      res.render("listings/new.ejs");
   };

module.exports.addNewListing = async (req, res) => {
    const listing = new Listing(req.body.hotel);

    listing.owner = req.user._id;

    // Save Cloudinary image
    listing.image = {
        url: req.file.path,
        filename: req.file.filename
    };

    await listing.save();

    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
};

module.exports.getEditForm=async (req, res) => {
      const { id } = req.params;
      const hotel = await Listing.findById(id);
      res.render("listings/edit.ejs", { hotel, title: "edit hotel" });
   };

module.exports.UpdateListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
        id,{...req.body.hotel}
    );

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", `${listing.title} Updated Successfully`);
    res.redirect(`/listings/${id}`);
};

module.exports.ShowListing=async (req, res) => {
      const { id } = req.params;

      const hotel = await Listing.findById(id)
      .populate({path:"Reviews",
         populate:{path:"author"},
      }).populate("owner");
      res.render("listings/show.ejs", { hotel, title: "see hotel" });
   };

module.exports.DeleteListing=async (req, res) => {
      const { id } = req.params;
      const listing = await Listing.findByIdAndDelete(id);
      req.flash("success",`${listing.title} Deleted Successfully`);
      res.redirect("/listings");
   };