$(document).ready(function () {
  $(document).on("click", "#search", search);
});

function buildVideoSearchUrl(lat, long, keywords, radius) {

  var apiKey = "AIzaSyCdwC23T8LG-ANlisnBqfODfqoauzfNJO8";
  var queryURL = "https://www.googleapis.com/youtube/v3/search/?part=snippet&type=video&key=" + apiKey +
    "&location=" + lat + "%2C" + long +
    "&locationRadius=" + radius +
    "&q=" + keywords;

  return queryURL;

}

function buildVideoLocationSearchUrl(id) {

  var apiKey = "AIzaSyCdwC23T8LG-ANlisnBqfODfqoauzfNJO8";
  var queryURL = "https://www.googleapis.com/youtube/v3/videos?part=recordingDetails" +
    "&id=" + id +
    "&key=" + apiKey;

  return queryURL;

}

// Event listener for all button elements
function search() {

  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();

  // This line will grab the text from the input box
  var keywords = $("#keywords").val().trim();
  var address = $("#address").val().trim();
  var radius = $("#radius").val().trim();

  var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDgDiGe1sPYYqpbGQCbUR5W9gUVrv7L1Qk';
  $.ajax({
    url: geocodeUrl,
    method: "GET"
  })

    .then(function (response) {
      if (response.status == 'OK') {

        console.log(response);
        var lat = response.results[0].geometry.location.lat.toString();
        var long = response.results[0].geometry.location.lng.toString();

        $.ajax({
          url: buildVideoSearchUrl(lat, long, keywords, radius),
          method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.items;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
              var id = results[i].id.videoId;
              
              //Get video location details
              $.ajax({
                url: buildVideoLocationSearchUrl(id),
                method: "GET"
              })
                .then(function (myResponse) {
                  var location = myResponse.items[0].recordingDetails.location;
                  console.log(location);

                });
            }
          });
      }
    });


}
