

const express     = require('express');
const router      = express.Router();
const Cinema       = require('../models/Cinema')
const ensureLogin = require("connect-ensure-login");


/* GET /Links By link page */
router.get('/cinema', (req, res, next) => {
   console.log("-=-=-=-=-=-=-=-=-=-=");

  Cinema.find()
  .then((cinemaData)=>{
      console.log(cinemaData);
      res.render('cinema/cinema', {cinemaData: cinemaData})
  })
  .catch((err)=>{
      next(err);
  })
});

// router.post('/cinema/delete/:id', (req, res, next)=>{
//   Cinema.findByIdAndRemove(req.params.id)
//   .then((response)=>{
//       res.redirect('/cinema')
//   })
//   .catch((err)=>{
//      next(err);
//   })

// })

module.exports = router;