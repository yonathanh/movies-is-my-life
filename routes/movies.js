

const express     = require('express');
const router      = express.Router();

const Movie       = require('../models/Movie');
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Cinema      = require('../models/Cinema');
const User        = require('../models/User');

/* GET ALL movies page */
router.get('/movies/moviesAll', ensureLogin.ensureLoggedIn("/login"), (req, res, next) => {

  Movie.find( {user: req.user._id} )
  .then((movieData)=>{

   // console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=', movieData );

      res.render('movies/moviesAll', {movieData: movieData})
  })
  .catch((err)=>{
      next(err);
  })

});

//--------------- creating new movie
router.get('/movies/addMovie', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{

  Cinema.find()
  .then((links)=>{
      res.render('movies/addMovie', {links: links});
  })
  .catch((err)=>{
      next(err);
  })

})


/*   Creating new movie page */
router.post('/movies/addMovie', uploadCloud.single('photo'), (req, res, next)=>{
  

     const movieObject = {
          user:       req.user._id,
          title:      req.body.title,
          genre:      req.body.genre,
          imdbRating: req.body.imdbRating,
          image:      req.body.imageSrc,
          links:      req.body.links
          }
      if (req.file) {
      movieObject.imgName = req.file.originalname;
      movieObject.imgPath = req.file.url;
        }
      Movie.create(movieObject)
          .then((response)=>{
              res.redirect('/movies/moviesAll') 
          })
          .catch((err)=>{
             next(err);
          })
})// --------------- End creating new movie

/*   Editing A movie */
router.get('/movies/editMovie/:id', ensureLogin.ensureLoggedIn("/login"),(req, res, next)=>{

  Cinema.find()
    .then((links) => {

      Movie.findById(req.params.id)

        .then((theMovie) => {
          res.render('movies/editMovie', { theMovie: theMovie, links: links});
        })
        .catch((err) => {
          next(err);
        })
    })
    .catch((err) => {
      next(err);
    })

})


/*   rout sent, after using form action */
router.post('/movies/update/:id', uploadCloud.single('photo'), (req, res, next)=>{
          
  const movieObject = {
      user:       req.user._id,
      title:      req.body.theTitle, //.theTitle must be diffrent then in creating new(title), beacuse if same name, will take the first one, (or use array)
      genre:      req.body.theGenre,
      imdbRating: req.body.theImdbRating,
      image:      req.body.theImage,
      }

  if(req.body.theLinks) {
    movieObject.$push = {links: req.body.theLinks};
      }
  if (req.file) {
   movieObject.imgName = req.file.originalname;
   movieObject.imgPath = req.file.url;
    }
  Movie.findByIdAndUpdate(req.params.id, movieObject)
  .then((response) => {

        let redir = "";

        if(req.session.destination == 'f'){
        redir = 'favorites'
    }else if(req.session.destination == 'm'){
        edir = 'mustWatch'
    }else if(req.session.destination == 'e'){
        redir = 'easySunday'
    }else {redir = 'moviesAll'}

      res.redirect('/movies/' + redir)
  })
  .catch((err) => {
      next(err);
  })
})

/*   rout sent, after using form action updating the links only */
router.post('/movies/updateLinks/:id', (req, res, next)=>{
          
    const movieObject = {user: req.user._id};
  //console.log('0000000000000000',req.body.aLink);
    if(req.body.aLink) {
      movieObject.$push = {links: req.body.aLink};
        }
    Movie.findByIdAndUpdate(req.params.id, movieObject)
    .then((response) => {
        res.redirect('/movies/moviesAll')
    })
    .catch((err) => {
        next(err);
    })
  })

/*   Deleting A movies Link */
router.post('/movies/delete/:id', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{
Movie.findByIdAndRemove(req.params.id)
.then((response)=>{
    res.redirect('/movies/moviesAll')
})
.catch((err)=>{
   next(err);
})

})

module.exports = router;