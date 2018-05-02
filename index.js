const MARVEL_SEARCH_URL = 'https)://gateway.marvel.com/v1/public/characters';

function getDataFromApi(searchTerm, callback) { 
  const settings = { 
    url: MARVEL_SEARCH_URL, 
    data: { 
      apikey: '90b607b8985a5ffb047be3c16cb800fb'
    },
    dataType: 'json', 
    type: 'GET', 
    success: callback
  }; 

  $.ajax(settings); 
}

function renderResults(result) { 
  return `
    <h1>${result.name}</h1> 
  `
}

function displayMarvelData(data) { 
  $('.js-search-results').html(renderResult); 
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayMarvelData);
  });
}

$(watchSubmit); 