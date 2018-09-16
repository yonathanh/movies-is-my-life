

const express     = require('express');
const router      = express.Router();

const Movie       = require('../models/Movie')
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Cinema      = require('../models/Cinema')


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
  
        const theUser      = req.user._id;
        const theTitle     = req.body.title;
        const theGenre     = req.body.genre;
        const theRating    = req.body.imdbRating;
        const theImageSrc  = req.body.image;
        const theImageName = req.file.originalname;
        const theImgPath   = req.file.url;
        const theLinks     = req.body.links;
      
        Movie.create({
          user:       theUser,
          title:      theTitle,
          genre:      theGenre,
          imdbRating: theRating,
          image:      theImageSrc,
          imgName:    theImageName,
          imgPath:    theImgPath,
          links:      theLinks

          })
          .then((response)=>{
              res.redirect('/') 
          })
          .catch((err)=>{
             next(err);
          })
})// --------------- End creating new movie



/* GET /movie By Search page */
router.post('/search', (req, res, next) => {
   console.log("-=-=-=-=-=-=-=-=-=-=",req.body.searchText);
   res.render('index');
  // Movie.findById(req.params.searchText)
  // .then((oneMovie)=>{
  //     console.log(oneMovie);
  //     res.render('/movieName', {oneMovie: oneMovie})
  // })
  // .catch((err)=>{
  //     next(err);
  // })
});


/* GET movieInfo page */
router.get('/movieAll', (req, res, next) => {
  res.render('movies/movieAll');
});

module.exports = router;