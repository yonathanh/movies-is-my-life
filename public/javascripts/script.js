
document.addEventListener('DOMContentLoaded', () => {
    console.log('IronGenerator JS imported successfully!');
  


    document.getElementById('searchForm').onclick = movieSearch;


    function movieSearch(e) {
      const searchValue = document.getElementById('searchText').value;

      e.preventDefault();
     
      axios.get('http://www.omdbapi.com?s='+ searchValue + '&apikey=thewdb')
      .then((listOfMovies)=>{
          let movies = listOfMovies.data.Search;
          let output = '';
          movies.forEach((movie) => {
            output += `
            <div class="col-md-3">
              <div id="frame" class="well text-center">
              <img src="${movie.Poster}"> 
               <h5>${movie.Title}</h5>
               <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-dark" href="http://imdb.com/title/${movie.imdbID}" target="_blank" >Movie Details</a>
              </div>
            </div>
            `;
          });
  
        const resultDiv = document.getElementById('results')
        resultDiv.innerHTML = output;

      })
      .catch((err)=>{
        console.log(err)
      })

    } // ----------- End movie search function btn

}, false);
