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
    error: function (request, status, error) {
      alert(request.responseText); 
    }
  }; 

  $.ajax(settings); 
}

function renderResults(data) {
  return `
  <h1>Character name: ${data.data.results[0].name}</h1> 
  
  <img src="${data.data.results[0].thumbnail.path}/portrait_xlarge.${data.data.results[0].thumbnail.extension}">
  <p class="character-description">Description: ${data.data.results[0].description}</p>
  <a href="${data.data.results[0].urls[0].url}">Link to comics ${data.data.results[0].name} appears in</a> 
  `

  
} 

function displayMarvelData(data) { 
/*  console.log(Object(data)); */
  console.log(JSON.stringify(data.data)); 
  $('.js-search-results').html(renderResults(data)); 
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $('.js-query');
    const query = queryTarget.val();
    console.log(query);
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayMarvelData);
  });
}

$(watchSubmit); 