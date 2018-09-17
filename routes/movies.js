

const express     = require('express');
const router      = express.Router();

const Movie       = require('../models/Movie')
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Cinema      = require('../models/Cinema')

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

//-------------------------- Movie Example
// const movieSchema = new Schema({
//   user: String,
//   title: String,
//   genre: String,
//   imdbRating: String,
//   image: String,
//   imgName: String,
//   imgPath: String,
//   links: Array
// }

/*   Creating new movie page */
router.post('/movies/addMovie', uploadCloud.single('photo'), (req, res, next)=>{
  

     const movieObject = {
          user:       req.user._id,
          title:      req.body.title,
          genre:      req.body.genre,
          imdbRating: req.body.imdbRating,
          image:      req.body.image,
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
router.post('/movies/editMovie/:id', ensureLogin.ensureLoggedIn("/login"),(req, res, next)=>{

  Cinema.find()
    .then((links) => {

      Movie.findById(req.params.id)

        .then((theMovie) => {
          res.render('movies/editMovie', { theMovie: theMovie, links: links });
        })
        .catch((err) => {
          next(err);
        })
    })
    .catch((err) => {
      next(err);
    })

})
    
//-------------------------- Movie Example
// const movieSchema = new Schema({
//   user: String,
//   title: String,
//   genre: String,
//   imdbRating: String,
//   image: String,
//   imgName: String,
//   imgPath: String,
//   links: Array
// }


/*   rout sent, after using form action */
router.post('/movies/update/:id', uploadCloud.single('photo'), (req, res, next)=>{
          
  const movieObject = {
      user:       req.user._id,
      title:      req.body.theTitle, //.theTitle must be diffrent then in creating new(title), beacuse if same name, will take the first one, (or use array)
      genre:      req.body.theGenre,
      imdbRating: req.body.theImdbRating,
      image:      req.body.theImage,
      links:      req.body.theLinks
      }
  if (req.file) {
   movieObject.imgName = req.file.originalname;
   movieObject.imgPath = req.file.url;
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

// /* GET /movie By Search page */
// router.post('/search', (req, res, next) => {
//    console.log("-=-=-=-=-=-=-=-=-=-=",req.body.searchText);
//    res.render('index');
//   // Movie.findById(req.params.searchText)
//   // .then((oneMovie)=>{
//   //     console.log(oneMovie);
//   //     res.render('/movieName', {oneMovie: oneMovie})
//   // })
//   // .catch((err)=>{
//   //     next(err);
//   // })
// });


/*   Edding from imdbAPI new movie page */
router.post('/', (req, res, next)=>{
  

    const movieObject = {
         user:       req.user._id,
         title:      movieData.Title,
         genre:      movieData.Genre,
         image:      movieData.Poster,
         }
     Movie.create(movieObject)
         .then((response)=>{
             res.redirect('/movies/moviesAll') 
         })
         .catch((err)=>{
            next(err);
         })
})// --------------- End creating new movie


module.exports = router;