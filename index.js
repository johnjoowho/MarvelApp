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
    success: callback
  }; 

  $.ajax(settings); 
}

function renderResults(results) {
  return `
  <h1>Character name: ${data.results[0].name}</h1> 
  <p>description: ${data.results[0].description}</p> 
  <img src="${data.results[0].thumbnail.path}/portrait_xlarge.${data.results[0].thumbnail.extension}">
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