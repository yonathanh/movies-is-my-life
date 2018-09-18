
const express        = require('express');
const router         = express.Router();
const passport       = require("passport");
const ensureLogin    = require("connect-ensure-login");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const uploadCloud    = require('../config/cloudinary.js');
const Cinema         = require('../models/Cinema')
const nodemailer     = require('nodemailer');


// User model
const User = require("../models/User");

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


/* GET signup  page */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

//-------- sign up function

// defaoult cinemas should get all the cinema list from Cinema Model
let cinemaIDs =[];
Cinema.find()
.then((cinemas)=>{
  cinemas.forEach((cinema)=>{
    cinemaIDs.push(cinema._id); 
  })
//console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-",cinemaIDs);
})
.catch((err)=>{
    next(err);
}) // End defaoult cinemas should get all the cinema list


router.post("/signup", (req, res, next) => {
  const userObject = {
    username: req.body.username,
    password: req.body.password, 
    email   : req.body.email,
    image   : req.body.image,
    myCinema: cinemaIDs
    }
    if(req.file){
      userObject.imgName = req.file.originalname;
      userObject.imgPath = req.file.url;
      }

  //----------- validate that both fields are correctly filled up
  if (userObject.username === "" || userObject.password === "" || userObject.email === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  //--------- check  if the indicated username is already defined
  User.findOne({username: userObject.username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username already exists"
        });
        return;
      }

                    // --------  using nodemailer to send and get eMails
                    // let transporter = nodemailer.createTransport({
                    //   service: 'Gmail',
                    //   auth: {
                    //     user: process.env.appsGmailAccount,
                    //     pass: process.env.gmailPassword 
                    //   }
                    // });

                    // transporter.sendMail({
                    //   from: '"My Awesome Project 👻" <myawesome@project.com>',
                    //   to: email,  
                    //   text: message,
                    //   html: `<b>${message}</b>`

                    // });

  //------------------- continue after validations
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(userObject.password, salt);

      userObject.password = hashPass;

      const newUser = User(userObject);

      newUser.save()
      .then(user => {

        // login after signup
        req.login(user, function (err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      });
    })
    .catch(error => {
      next(error);
    });

}); //--------- End sign up function



/* GET login  page */
router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

//-------- Log In function
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  successFlash: true,
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//---------  logout
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

//-------- GOOGLE Log In routs
router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/"
}));

//-------- GOOGLE Log In function
passport.use(new GoogleStrategy({
  clientID: process.env.google_client_id,
  clientSecret: process.env.google_client_secret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  //console.log("=-=-=-=-=-=-=-=-",profile.emails[0].value);  // to see all what google profile sends the web app
  //console.log("-=-=-=-=-=-=-=-=-=",profile.photos[0].value)
  User.findOne({ googleID: profile.id })
    .then((user, err) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        username: profile.displayName,
        image:    profile.photos[0].value,
        email:    profile.emails[0].value,
        googleID: profile.id
      });

      newUser.save()
        .then(user => {
          done(null, newUser);
        })
    })
    .catch(error => {
      console.log(error)
    })

}));//--------- End sing up function


// must use form in html for post!
//================================================
/* GET /user edit page */
router.post('/profile/:id', (req, res, next)=>{
  //console.log("===========-----------",req.params.id);
  User.findById(req.params.id)
    .then((theUser) => {
      res.render('auth/profile', { user: theUser });

    })
    .catch((err) => {
      next(err);
    })

})

/*   rout sent, after using form action */
router.post('/profile/update/:id', uploadCloud.single('photo'), (req, res, next)=>{

  //----------------------------------- user example
  // const userSchema = new Schema({
  //   username: String,
  //   password: String,
  //   email:    String,
  //   googleID: String,
  //   image:    String,
  //   favorites: Array,
  //   mustWatch: Array,
  //   easySunday: Array
 
   const userObject = {
    username: req.body.username,
    password: req.body.password,  //need to figure out how to not chnage password if leave empty and change with hash if change
    email   : req.body.email,
    image   : req.body.image,
    }
    if(req.file){
      userObject.imgName = req.file.originalname;
      userObject.imgPath = req.file.url;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(userObject.password, salt);

      userObject.password = hashPass;

       User.findByIdAndUpdate(req.params.id, userObject )
      .then((response)=>{
         res.redirect('/')
            })
            .catch ((err)=>{
                next(err);
            })

})/*   End Editing A User page */

module.exports = router;





