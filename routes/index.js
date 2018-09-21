const express = require('express');
const router  = express.Router();
const axios = require('axios');

let firstSearchValue = 'star'; // want to make option to change this from client side, in options -> defaoult search

/* GET Default search word page */
router.post('/default', (req, res, next) => {
  console.log("PPPPPPPPPPPPPP",req.body.defaultSearch);
  firstSearchValue = req.body.defaultSearch;
  res.redirect('/')
});



/* GET home page */
router.get('/', (req, res, next) => {
  
  axios.get(`http://www.omdbapi.com?s=${firstSearchValue}&apikey=thewdb`)
  .then((listOfMovies)=>{
    let movies = listOfMovies.data.Search;
      res.render('index', {movies: movies})
  })
  .catch((err)=>{
    console.log(err)
  })
  // res.render('index');
});

/* GET home page */
router.post('/search', (req, res, next) => {

  axios.get('http://www.omdbapi.com?s='+req.body.searchText+'&apikey=thewdb')
  .then((listOfMovies)=>{
    let movies = listOfMovies.data.Search;
  //console.log("#####################%%%%%%%%%",movies[0]);
      res.render('index', {movies: movies})
  })
  .catch((err)=>{
    console.log(err)
  })
});


module.exports = router;
