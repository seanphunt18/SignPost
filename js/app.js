var TRAIL_BASE_URL = 'https://trailapi-trailapi.p.mashape.com/?';

function getDataFromApi() {
  var query = '';
  if ($('#city').val() !== " ") query.concat('q[city_cont]=' + $('#city').val());
  if ($('#state').val() !== " ") query.concat('&q[state_cont]=' + $('#state').val());
  if ($('#country').val() !== " ") query.concat('&q[country_cont]=' + $('#country').val());
  if ($('#activity').val() !== " ") query.concat('&q[activities_activity_type_name_eq]=' + $('#activity').val());
  var settings = {
    url: TRAIL_BASE_URL + query,
    headers: {
      'X-Mashape-Key': 'rPJrcSA8o7mshqanN4pzWBaYJa67p1CWL5EjsnFO23OZK87yn0',
      'Accept': 'text/plain'
    },
    dataType: 'json',
    type: 'GET',
    success: displayTrailSearchData
  };
  $.ajax(settings);
}

function displayTrailSearchData(data) {
  console.log(data);
  var resultElement = '<div class="row">';
  if (data.places.length > 0) {
    for (var i=0; i<data.places.length; i++) {
        data.places[i].activities.forEach(function(activity, index) {
          if (activity.thumbnail !== null) {
            resultElement += '<div class="col-md-4"><a target="_blank" href="' + activity.url + '" data-toggle="lightbox" data-gallery="sigma-gallery"><img src="' + activity.thumbnail + '" class="img-thumbnail sigmapad"></a><h3>' + activity.name + '</h3><p>' + activity.activity_type_name + '</p></div>';
          } else {
            resultElement += '<div class="col-md-4"><a target="_blank" href="' + activity.url + '" data-toggle="lightbox" data-gallery="sigma-gallery"><img src="http://placehold.it/540x450" class="img-thumbnail sigmapad"></a><h3>' + activity.name + '</h3><p>' + activity.activity_type_name + '</p></div>';
          }
          if ((index + 1) % 3 == 0) {
            resultElement += '</div><div class="row">';
          }
        });
    }  
  } else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    getDataFromApi(displayTrailSearchData);
  });
}

$(function(){watchSubmit();});