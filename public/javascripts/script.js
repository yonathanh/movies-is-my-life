
//<!-- ==================  Scripts  ===================== -->

    function addMovie(movie) {
console.log("-=xxxxxxxxxxxxxxxxxxxxx");
        movieData = movie.split(",");
        console.log("-=-=-=-========================", movieData);

          axios.post('/movies/addImdb', { movieData })
          .then((movieData)=>{

            console.log("@#!#$!@#$!@#!#!~@#~!@#",movieData);
//need to add promise here! so I can redirect syncroneslly to favoriets page or must watch page or somthing else to fix it???
           console.log('added Success!');
           location.href='/movies/moviesAll';
           //window.location.replace("http://localhost:3000/movies/moviesAll");
          });
    }

//<!-- ================== End Scripts  ===================== -->


// document.addEventListener('DOMContentLoaded', () => {
//     console.log('IronGenerator JS imported successfully!');
  
//     document.getElementById('searchForm').onclick = movieSearch;


//     function movieSearch(e) {
//       const searchValue = document.getElementById('searchText').value;

//       e.preventDefault();
      
//      // location.href='/';
      
//       axios.get('http://www.omdbapi.com?s='+ searchValue + '&apikey=thewdb')
//       .then((listOfMovies)=>{
    
//           let movies = listOfMovies.data.Search;
//           let output = '';

//           movies.forEach((movie) => {

//             //console.log(movie);
          
//             output += `
//             <div class="col-md-3">
//               <div id="frame" class="well text-center">
//               <img src="${movie.Poster}"> 
//                <h5>${movie.Title}</h5>
//                <a  class="btn btn-dark" href="http://imdb.com/title/${movie.imdbID}" target="_blank" >Movie Details</a>
//                <li class="dropdown btn btn-dark">
//                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Add To<span class="caret"></span></a>
//                  <ul class="dropdown-menu">
//                    <li><a href="#">My Favorites</a></li>
//                    <li role="separator" class="divider"></li>
//                    <li><a href="#">Must Watch</a></li>
//                    <li role="separator" class="divider"></li>
//                    <li><a href="#">Easy Sunday</a></li>
//                  </ul>
//                </li>
//                <button onclick="addMovie('${movie.Title},${movie.imdbID},${movie.Poster}')" type="submit" class="btn btn-dark">Add</button>
//               </div>
//             </div>
//             `;
           
//           });

//         const resultDiv = document.getElementById('results')
//         resultDiv.innerHTML = output;
           
   

//       })
//       .catch((err)=>{
//         console.log(err)
//       })

//     } // ----------- End movie search function btn


// }, false);
