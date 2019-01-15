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

  var videos = [];
  var videoCoordinates = [];
  var lat;
  var long;
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
        var geoResults = response.results;
        console.log(response);
        lat = geoResults[0].geometry.location.lat.toString();
        long = geoResults[0].geometry.location.lng.toString();

        $.ajax({
          url: buildVideoSearchUrl(lat, long, keywords, radius),
          method: "GET"
        })

          .then(function (response) {

            var searchResults = response.items;
            console.log(searchResults);

            for (var i = 0; i < searchResults.length; i++) {
              var videoId = searchResults[i].id.videoId;
              var videoTitle = searchResults[i].snippet.title;
              var obj = {
                id: videoId,
                title: videoTitle
              };

              videos.push(obj);
            }

            for (var i = 0; i < videos.length; i++) {
              //Get video location details
              $.ajax({
                url: buildVideoLocationSearchUrl(videos[i].id),
                method: "GET"
              })
                .then(function (response) {
                  var recordingDetails = response.items;
                  var coordinates = {
                    lat: recordingDetails[0].recordingDetails.location.latitude,
                    long: recordingDetails[0].recordingDetails.location.longitude
                  };
                  videoCoordinates.push(coordinates);
                  console.log(location);
        
                  
                });
            }
            
          });
      }
    });

    

}

//create map
function initMap(centerLat, centerLong, videoLat, videoLong, videoTitle, id) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(centerLat, centerLong),
    mapTypeId: 'terrain'
  });

  var latLng = new google.maps.LatLng(videoLat, videoLong);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: videoTitle,
    url: "https://youtu.be/" + id
  });
  google.maps.event.addListener(marker, 'click', function () {
    window.open(this.url);
  });
}