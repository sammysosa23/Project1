$(document).ready(function () {
  $(document).on("click", "#search", search);
});
var map;

function buildVideoSearchUrl(lat, long, keywords, radius) {

  var apiKey = "AIzaSyCdwC23T8LG-ANlisnBqfODfqoauzfNJO8";
  var queryURL = "https://www.googleapis.com/youtube/v3/search/?part=snippet&type=video&maxResults=10&key=" + apiKey +
    "&location=" + lat + "%2C" + long +
    "&locationRadius=" + radius +
    "&q=" + keywords;

  return queryURL;

}

function buildVideoLocationSearchUrl(id) {

  var apiKey = "AIzaSyCdwC23T8LG-ANlisnBqfODfqoauzfNJO8";
  var queryURL = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CrecordingDetails" +
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
  // var address = $("#address").val().trim();
  // var radius = $("#radius").val().trim();
  var address = "atlanta";
  var radius = "15mi";

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
        initMap(lat, long);

        $.ajax({
          url: buildVideoSearchUrl(lat, long, keywords, radius),
          method: "GET"
        })

          .then(function (response) {

            var searchResults = response.items;
            console.log(searchResults);

            for (var i = 0; i < searchResults.length; i++) {
              videos.push(searchResults[i].id.videoId);
            }

            for (var i = 0; i < videos.length; i++) {
              //Get video location details
              $.ajax({
                url: buildVideoLocationSearchUrl(videos[i]),
                method: "GET"
              })
                .then(function (response) {
                  var details = response.items;
                  var videoLat = details[0].recordingDetails.location.latitude;
                  var videoLong = details[0].recordingDetails.location.longitude;
                  var videoId = details[0].id;
                  var videoTitle = details[0].snippet.title;
                  console.log(location);
        
                  addMarker(videoLat, videoLong, videoTitle, videoId);
                });
            }
            
          });
      }
    });

    

}

//create map
function initMap(centerLat, centerLong) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: new google.maps.LatLng(centerLat, centerLong),
    mapTypeId: 'terrain'
  });

  
}

function addMarker(videoLat, videoLong, videoTitle, id){
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