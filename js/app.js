var TRAIL_BASE_URL = 'https://trailapi-trailapi.p.mashape.com/?';

function getDataFromApi() {
  var query = "";
  if ($('#city').val().length > 0) {
    query += "q[city_cont]=" + $('#city').val() + "&";
  }
  if ($('#state').val().length > 0) {
    query += "q[state_cont]=" + $('#state').val() + "&";
  }
  if ($('#country').val().length > 0) {
    query += "q[country_cont]=" + $('#country').val() + "&";
  }
  if ($('#activity').val().length > 0) {
    query += "q[activities_activity_type_name_eq]=" + $('#activity').val();
  }
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
  var resultElement = '<div class="row"><div class="col-md-12"><hr class="sigma-hr result-divider"></div></div><div class="row">';
  var itemNum = 0;
  if (data.places.length > 0) {
    for (var i=0; i<data.places.length; i++) {
        data.places[i].activities.forEach(function(activity, index) {
          if (activity.thumbnail !== null) {
            resultElement += '<div class="col-md-4 result-card"><a target="_blank" href="' + activity.url + '" data-toggle="lightbox" data-gallery="sigma-gallery"><img src="' + activity.thumbnail + '" class="img-thumbnail sigmapad"></a><h3>' + activity.name + '</h3><p>Activity: ' + activity.activity_type_name + '</p></div>';
            itemNum += 1;
          } else {
            resultElement += '<div class="col-md-4 result-card"><a target="_blank" href="' + activity.url + '" data-toggle="lightbox" data-gallery="sigma-gallery"><img src="https://github.com/seanphunt18/capstone/blob/master/images/missing-img.gif?raw=true" class="img-thumbnail sigmapad"></a><h3>' + activity.name + '</h3><p>Activity: ' + activity.activity_type_name + '</p></div>';
            itemNum += 1;
          }
          if (itemNum % 3 == 0) {
            resultElement += '</div><div class="row">';
          }
        });
    }
    resultElement += '</div>';  
  } else {
    resultElement += '<h3 style="text-align: center;">No results</h3>';
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