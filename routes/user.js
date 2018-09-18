


const express     = require('express');
const router      = express.Router();
const Cinema      = require('../models/Cinema')
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');


//---------- User Cinema

/* GET /Links By link page */
// router.get('/cinema/myCinema', (req, res, next) => {

//   console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-",req.user.myCinema);

//   let arrayOfIDs = req.user.myCinema;
//   let listOfCinemas = [];

//     for(let i = 0; i < arrayOfIDs.length; i++) {
      
//       Cinema.findById(arrayOfIDs[i]).then((cinemaData)=>{
//       console.log(myCinema)
//         listOfCinemas.push(cinemaData);
//         console.log(listOfCinemas);
//     }).then((cinemaData)=>{

//        // console.log(cinemaData);
//         res.render('cinema/userCinema', {cinemaData: cinemaData})
//     })
//     .catch((err)=>{
//         next(err);
//     })
//   };

//--------------------------

//---------- User Cinema

/* GET /Links By link page */
router.get('/cinema/myCinema', (req, res, next) => {

  //console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-",req.user.myCinema);

  let arrayOfIDs = req.user.myCinema;
  let listOfCinemas = [];

        for(let i = 0; i < arrayOfIDs.length; i++) {
          Cinema.findById(req.user.myCinema[i])
          .then((cinemaData)=>{
              //console.log("===========",cinemaData);
              listOfCinemas.push(cinemaData);
              console.log("===========",listOfCinemas);
            // res.render('cinema/userCinema', {cinemaData: cinemaData})
            })
            .catch((err)=>{
              next(err);
          })
        }
        
  
  });

  // router.get('/cinema/myCinema', (req, res, next) => {

  //   Cinema.find()
  //   .then((cinemaData)=>{
  //      console.log(cinemaData.id);
  //       //res.render('cinema/cinema', {cinemaData: cinemaData})
  //   })
  //   .catch((err)=>{
  //       next(err);
  //   })
  // });

//--------------------------



// /* GET /user Info page */
// router.get('/user', ensureLogin.ensureLoggedIn("/login"), (req, res, next) => {

//   User.findById(req.user._id)
//   .then((oneUser)=>{
//       console.log(oneUser);
//       res.render('users/user', {oneUser: oneUser})
//   })
//   .catch((err)=>{
//       next(err);
//   })
// });


// /* GET movies page */
// router.get('/users/movies', ensureLogin.ensureLoggedIn("/login"), (req, res, next) => {

//   Movie.find( {creator: req.user._id} )
//   .then((movieData)=>{

//     console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=', movieData );

//       res.render('users/movies', {movieData: movieData})
//   })
//   .catch((err)=>{
//       next(err);
//   })

// });


module.exports = router;

