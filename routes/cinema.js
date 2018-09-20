

const express     = require('express');
const router      = express.Router();
const Cinema      = require('../models/Cinema')
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');


/* GET /Links By link page */
router.get('/cinema', (req, res, next) => {

  Cinema.find()
  .then((cinemaData)=>{
     // console.log(cinemaData);
      res.render('cinema/cinema', {cinemaData: cinemaData})
  })
  .catch((err)=>{
      next(err);
  })
});

router.get('/cinema/new', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{

        res.render('cinema/new');
})

/*   Creating new Cinema Link */
router.post('/cinema/new', uploadCloud.single('photo'), (req, res, next)=>{

  //----------------------------------- movie example
//   const CinemaSchema = new Schema({
//     siteName: String, //'solar movies'
//     siteLink: String  //'http://www6.solarmoviesc.com'
//     imgName: String,
//     imgPath: String
//   }, {

    console.log("================",req.body);
  
        const linkObject = {
            siteName: req.body.siteName,
            siteLink: req.body.siteLink, 
            imageSRC: req.body.siteImage,
            }
            console.log("================",req.body.siteName); 
            console.log("================",req.body.siteLink);
        if (req.file) {
            linkObject.imgName = req.file.originalname;
            linkObject.imgPath = req.file.url;
             }
      
           Cinema.create(linkObject)
          .then((response)=>{
              res.redirect('/cinema') 
          })
          .catch((err)=>{
             next(err);
          })
      })

/*   Editing A cinema Link */
router.post('/cinema/edit/:id', ensureLogin.ensureLoggedIn("/login"),(req, res, next)=>{

    Cinema.findById(req.params.id)
        .then((theLink) => {

            res.render('cinema/edit', { theLink: theLink });
        })
        .catch((err) => {
            next(err);
        })
})
      
/*   rout sent, after using form action */
router.post('/cinema/update/:id', uploadCloud.single('photo'), (req, res, next)=>{
            
    const linkObject = {
        siteName: req.body.name, //.name must be diffrent then in creating new(siteName), beacuse if same name, will take the first one, (or use array)
        siteLink: req.body.link,
        imageSRC: req.body.siteImage,
        }
        console.log("================",req.body.name); 
        console.log("================",req.body.link);
    if (req.file) {
     linkObject.imgName = req.file.originalname;
     linkObject.imgPath = req.file.url;
      }
    Cinema.findByIdAndUpdate(req.params.id, linkObject)
    .then((response) => {
        res.redirect('/cinema')
    })
    .catch((err) => {
        next(err);
    })
})


/*   Deleting A Cinema Link */
// router.post('/cinema/delete/:id', ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{
//   Cinema.findByIdAndRemove(req.params.id)
//   .then((response)=>{
     
//       res.redirect('/cinema')
//   })
//   .catch((err)=>{
//      next(err);
//   })

// })

module.exports = router;