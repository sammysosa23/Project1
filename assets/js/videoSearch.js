$(document).ready(function () {
  $(document).on("click", "#search", search);
});

function buildVideoSearchUrl(lat, long, keywords, radius){
  
  var apiKey = "AIzaSyBY4WNlt7XxKT8nkIktT9cJC7DEgDr8EZ0";
  var queryURL = "https://www.googleapis.com/youtube/v3/search/?part=snippet&type=video&key=" + apiKey + 
  "&location=" + lat + "%2C" + long + 
  "&locationRadius=" + radius + 
  "&q=" + keywords;

  return queryURL;

}

// Event listener for all button elements
function search() {

  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();

  // This line will grab the text from the input box
  var keywords = $("#keywords").val().trim();
  var lat = $("#lat").val().trim();
  var long = $("#long").val().trim();
  var radius = $("#radius").val().trim();

  var queryURL = buildVideoSearchUrl(lat, long, keywords, radius);
  console.log(queryURL);
  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.items;
      console.log(results);
      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        var id = results[i].id.videoId;
        var myLocation = videoLocationSearch(id);
      }
    });
}