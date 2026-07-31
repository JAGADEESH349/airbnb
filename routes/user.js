const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({ mergeParams: true });
const passport=require("passport");
 const {isLoggedIn,saveRedirectUrl,isOwner}=require("../middleware.js");
 const userController=require("../controllers/users.js");


    router.route("/login")
            //loginPage
        .get(userController.GetLoginPage)
            //check login
        .post(saveRedirectUrl,passport.authenticate("local", 
                {
                    failureRedirect: "/login",
                    failureFlash: true,
                }),
        userController.CheckLogin
        );

    router.route("/signup")
            //SignUp page
            .get(userController.GetSignupPage)
            //Register Route
            .post(wrapAsync(userController.SignUp));
    
            
    //Logout Route
    router.get("/logout",userController.Logout);

module.exports=router;