const user=require("../Models/user.js")
const passport=require("passport");

module.exports.GetLoginPage=(req,res)=>{
            res.render("users/login.ejs");
};

module.exports.CheckLogin=async (req, res) => {
        req.flash("success", "Welcome to Wanderlust");

        let redirectUrl = res.locals.redirectUrl || "/listings";

        delete req.session.redirectUrl;   // Delete it here

        res.redirect(redirectUrl);
    };

module.exports.GetSignupPage=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.SignUp=async(req,res)=>{
        try{
            let {username,email,password}=req.body;
            const newUser=new user({username,email});
            await user.register(newUser,password); 
            req.login(newUser,(err)=>{
                if(err){
                    return next(err);
                }
                req.flash("success","Welcome to Wanderlust");
                res.redirect("/listings");
            })
            
        } 
        catch(err){

        let message = "Something went wrong. Please try again.  ";

        if(err.name === "UserExistsError"){
            message = "That username is already taken. Please choose another one.";
        }
        else if(err.name === "ValidationError"){
            message = "Please fill in all required fields correctly.";
        }
 
        req.flash("error", message);
        res.redirect("/signup");
        }
};

module.exports.Logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you logged out Successfully!");
        res.redirect("/listings");
    })
};