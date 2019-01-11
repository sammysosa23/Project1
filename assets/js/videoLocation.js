

function buildVideoLocationSearchUrl(id) {

  var apiKey = "AIzaSyBY4WNlt7XxKT8nkIktT9cJC7DEgDr8EZ0";
  var queryURL = "https://www.googleapis.com/youtube/v3/videos?part=recordingDetails" +
    "&id=" + id +
    "&key=" + apiKey;

  return queryURL;

}

// Event listener for all button elements
function videoLocationSearch(id) {

  var queryURL = buildVideoLocationSearchUrl(id);
  console.log(queryURL);
  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (myResponse) {
      // Storing an array of results in the results variable
      var location = myResponse.items[0].recordingDetails.location;
      console.log(location);

      return location;
    });
}