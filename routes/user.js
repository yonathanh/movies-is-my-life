


const express     = require('express');
const router      = express.Router();
const Cinema      = require('../models/Cinema')
const User        = require('../models/User')
const Movie       = require('../models/Movie');
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');


//---------- User Cinema

/* GET /Links from user cinema links*/
router.get('/cinema/myCinema', ensureLogin.ensureLoggedIn("/login"), (req, res, next) => {

  //console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-",req.user.myCinema);

        Cinema.find({_id: req.user.myCinema})
        .then((cinemaResults) => {
          res.render('cinema/userCinema', {listOfCinemas: cinemaResults} ) 
        })
        .catch((err) => {
          next(err);
        })
 
});
//--------------------------

/*   Deleting A Cinema Link */
router.post('/userCinema/delete/:id', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{
  let user = req.user;
  user.myCinema = user.myCinema.filter(cinemaIds => cinemaIds !== req.params.id);
  user.save()
  .then((response)=>{
      res.redirect('/cinema/myCinema')
  })
  .catch((err)=>{
     next(err);
  })

})





/*   Edding from imdbAPI to user movies */
router.post('/movies/addImdb', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{

  const movieInfo =  req.body;
  //console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=",req.body);

  const movieObject = {
       user:       req.user._id,
       title:      movieInfo.movieData[0],
       imdbID:     movieInfo.movieData[1],
       image:      movieInfo.movieData[2],
       year:       movieInfo.movieData[3],
       }

      // console.log(movieObject);
   Movie.create(movieObject)
       .then((response)=>{
         //console.log("the movie info after it has been created $$$$$$$$$$$$$$$$$$$$$ ", response);
          User.findById(req.user._id)
          .then((userFromDB) => {

            req.session.destination = movieInfo.movieData[4];

            
            if(movieInfo.movieData[4] == 'f') {
              userFromDB.favorites.push(response._id.toString())

                userFromDB.save().then((userUpdated) =>{

                  //res.redirect('/movies/favorites') 
                   res.redirect("/movies/editMovie/" + response._id) 
                })
                .catch((err) => {
                    next(err);
                })
              }else if(movieInfo.movieData[4] == 'm') {
                userFromDB.mustWatch.push(response._id.toString())

                  userFromDB.save().then((userUpdated) =>{
                    //  console.log("the updated user info after adding to favoriets @@@@@@@@@@@@@@@@@@@@@ ", userUpdated);
                    // res.redirect('/movies/mustWatch') 
                      res.redirect("/movies/editMovie/" + response._id) 
                  })
                  .catch((err) => {
                      next(err);
                  })
                }else if(movieInfo.movieData[4] == 'e') {
                userFromDB.easySunday.push(response._id.toString())

                  userFromDB.save().then((userUpdated) =>{
                    //  console.log("the updated user info after adding to favoriets @@@@@@@@@@@@@@@@@@@@@ ", userUpdated);
                    // res.redirect('/movies/easySunday') 
                      res.redirect("/movies/editMovie/" + response._id) 
                  })
                  .catch((err) => {
                      next(err);
                  })
                } 


          })
          .catch((err) => {
              next(err);
          })
       })
       .catch((err)=>{
          next(err);
       })
})// --------------- End creating new movie



/*   Edding from allMovies to movie category folder */
router.post('/movies/addToFolder/:id', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{

  const folderLocation =  req.body.location;

  User.findById(req.user._id)

        .then((userFromDB) => {

              if(folderLocation == 'f') {
                userFromDB.favorites.push(req.params.id.toString())

                  userFromDB.save().then((userUpdated) =>{
                      res.redirect('/movies/favorites') 
                
                  })
                  .catch((err) => {
                      next(err);
                  })
                }else if(folderLocation == 'm') {
                  userFromDB.mustWatch.push(req.params.id.toString())

                    userFromDB.save().then((userUpdated) =>{
                      res.redirect('/movies/mustWatch') 
                    })
                    .catch((err) => {
                        next(err);
                    })
                  }else if(folderLocation == 'e') {
                  userFromDB.easySunday.push(req.params.id.toString())

                    userFromDB.save().then((userUpdated) =>{
                        res.redirect('/movies/easySunday') 
                    })
                    .catch((err) => {
                        next(err);
                    })
                  } 

     })       
})/*   End Edding from allMovies to movie category folder folder */


//---------- User Options

/* GET movies from users favorites list */
router.get('/movies/favorites', ensureLogin.ensureLoggedIn("/login"), (req, res, next) => {

        
          Movie.find({_id: req.user.favorites})
          .then((movieData)=>{
              
            res.render('movies/favorites', {listOfMovies: movieData} ) 

            })
            .catch((err)=>{
              next(err);
          })
 
}); //-----------  End movies from favorites users list ---------------
/*   Deleting A favorites Link */
router.post('/movies/favorites/delete/:id', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{
  let user = req.user;
  user.favorites = user.favorites.filter(favoritesIds => favoritesIds !== req.params.id);
  user.save()
  .then((response)=>{
      res.redirect('/movies/favorites')
  })
  .catch((err)=>{
     next(err);
  })
})


/* GET movies from users mustWatch list */
router.get('/movies/mustWatch', ensureLogin.ensureLoggedIn("/login"), (req, res, next) => {

    Movie.find({_id: req.user.mustWatch})
      .then((movieData)=>{
          
        res.render('movies/mustWatch', {listOfMovies: movieData} ) 

        })
        .catch((err)=>{
          next(err);
      })
 
}); //-----------  End movies from users mustWatch list ---------------
/*   Deleting A mustWatch Link */
router.post('/movies/mustWatch/delete/:id', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{
  let user = req.user;
  user.mustWatch = user.mustWatch.filter(mustWatchIds => mustWatchIds !== req.params.id);
  user.save()
  .then((response)=>{
      res.redirect('/movies/mustWatch')
  })
  .catch((err)=>{
     next(err);
  })
})



/* GET movies from users easySunday list */
router.get('/movies/easySunday', ensureLogin.ensureLoggedIn("/login"), (req, res, next) => {
  
      Movie.find({_id: req.user.easySunday})
      .then((movieData)=>{

        res.render('movies/easySunday', {listOfMovies: movieData} ) 
  
        })
        .catch((err)=>{
          next(err);
      })

}); //-----------  End movies from users easySunday list ---------------
/*   Deleting A easySunday Link */
router.post('/movies/easySunday/delete/:id', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{
  let user = req.user;
  user.easySunday = user.easySunday.filter(easySundayIds => easySundayIds !== req.params.id);
  user.save()
  .then((response)=>{
      res.redirect('/movies/easySunday')
  })
  .catch((err)=>{
     next(err);
  })
})


module.exports = router;

