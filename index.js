const MARVEL_SEARCH_URL = 'https://gateway.marvel.com/v1/public/characters';

function getDataFromApi(searchTerm, callback) { 
  const settings = { 
    url: MARVEL_SEARCH_URL, 
    data: { 
      apikey: '90b607b8985a5ffb047be3c16cb800fb',
      name: `${searchTerm}`
    },
    dataType: 'json', 
    type: 'GET', 
    success: callback,
    error: function (req, status, error) {
      alert('There was an error with the Marvel API'); 
      console.error(JSON.stringify(error));
    }
  }; 

  $.ajax(settings); 
}

const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'

function getDataFromApi2(searchTerm, callback) { 
  const settings = { 
    url: TMDB_SEARCH_URL, 
    data: { 
      api_key: '439c6d600f4d4b4f26ce018423311ac2',
      query: `${searchTerm}`
    },
    dataType: 'json', 
    type: 'GET', 
    success: callback,
    error: function (req, status, error) {
      alert('There was an error with TMDB API'); 
    console.error(JSON.stringify(error));
    }
  }; 

  $.ajax(settings);  
}

function renderResults(data) {
  return data.data.results.length > 0 ?`
  <img class="character-img" src="${data.data.results[0].thumbnail.path}/portrait_uncanny.${data.data.results[0].thumbnail.extension}">
  <h2 class="character-name">${data.data.results[0].name}</h2> 
  <p class="character-description">Description: ${data.data.results[0].description}</p>
  <a href="${data.data.results[0].urls[0].url}" class="character-link">Link to comics ${data.data.results[0].name} appears in</a>
  <br> 
  `:
  `No character found`
} 

function renderResults2(data) { 
  return `
  <h3 class="movie-results-heading"> Top 5 movie results </h3>
  <div class="movies-container">
    <ol class="list-of-movies"> <br> 
      <li class="movietitlestop">Title: "${data.results[0].title}" <br>Released: "${data.results[0].release_date}" <br>Rating: ${data.results[0].vote_average}/10</li>
      <li class="movietitles">Title: "${data.results[1].title}" <br>Released: "${data.results[1].release_date}" <br>Rating: ${data.results[1].vote_average}/10</li>
      <li class="movietitles">Title: "${data.results[2].title}" <br>Released: "${data.results[2].release_date}" <br>Rating: ${data.results[2].vote_average}/10</li>
      <li class="movietitles">Title: "${data.results[3].title}" <br>Released: "${data.results[3].release_date}" <br>Rating: ${data.results[3].vote_average}/10</li>
      <li class="movietitles">Title: "${data.results[4].title}" <br>Released: "${data.results[4].release_date}" <br>Rating: ${data.results[4].vote_average}/10</li>
    </ol> 
  </div>s
  `
}

function displayMovieData(data) { 
  console.log(JSON.stringify(data)); 
  $('.js-search-results').append(renderResults2(data)); 
}

function displayMarvelData(data) { 
//  console.log(JSON.stringify(data.data)); 
  $('.js-search-results').html(renderResults(data)); 
  getDataFromApi2(data.data.results[0].name, displayMovieData);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $('.js-query');
    const query = queryTarget.val();
 //   console.log(query);
    // clear out the input
    getDataFromApi(query, displayMarvelData);
    queryTarget.val("");
  });
}

function handleHomeButton() {
  $('.header-container').on('click', '#home-button', function(event) {
  $('.js-search-results').html(''); 
  }); 
}

$(watchSubmit); 
$(handleHomeButton); 