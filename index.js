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
  return JSON.stringify(results[0]); 
} 

function displayMarvelData(data) { 
/*  console.log(Object(data)); */
  console.log(JSON.stringify(data.data)); 
  $('.js-search-results').html(renderResults(data.data.results)); 
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