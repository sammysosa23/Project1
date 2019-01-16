$(document).ready(function () {
  $(document).on("click", "#search", search);
});

function buildVideoSearchUrl(keywords) {

  var apiKey = "AIzaSyCdwC23T8LG-ANlisnBqfODfqoauzfNJO8";
  var queryURL = "https://www.googleapis.com/youtube/v3/search/?part=snippet&type=video&maxResults=10" +
   "&key=" + apiKey +
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

  // This line will grab the text from the input box
  var keywords = $("#keywords").val().trim();

  $.ajax({
    url: buildVideoSearchUrl(keywords),
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
            var recordingDetails = response.items;
            var lat = recordingDetails[0].recordingDetails.location.latitude;
            var long = recordingDetails[0].recordingDetails.location.longitude;
            
  
            //initMap(lat, long, )
          });
      }
      
    });

    

}

//create map
function initMap(videoLat, videoLong, videoTitle, id) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    //center: new google.maps.LatLng(centerLat, centerLong),
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