//retrieved from firebase (even though thats public too :/)
var youtubeAPIKey;
var geocodeAPIKey;
var map;

$(document).ready(function () {

    $("#map").hide();
    // INITIALIZE FIREBASE
    var config = {
        apiKey: "AIzaSyCtHL7f2YUS9l46Rdo3ilu9v8VJLbMOMPo",
        authDomain: "projectonelightbox.firebaseapp.com",
        databaseURL: "https://projectonelightbox.firebaseio.com",
        projectId: "projectonelightbox",
        storageBucket: "",
        messagingSenderId: "369764684225"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // INITIALIZE API Key FIREBASE
    var config2 = {
        apiKey: "AIzaSyAaOwHDCyONUt6l2TKF0FVr9pdjWCxFzuU",
        authDomain: "ketchup-apikeys.firebaseapp.com",
        databaseURL: "https://ketchup-apikeys.firebaseio.com",
        projectId: "ketchup-apikeys",
        storageBucket: "ketchup-apikeys.appspot.com",
        messagingSenderId: "486669493180"
    };
    var apiKeyApp = firebase.initializeApp(config2, "apiKeys");
    var apiKeyDatabase = apiKeyApp.database();

    //get api key values from firebase
    apiKeyDatabase.ref().on("value", function (snapshot) {
        console.log(snapshot.val());
        geocodeAPIKey = snapshot.val().geocodeAPIKey;
        youtubeAPIKey = snapshot.val().youtubeAPIKey;

        // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
        // Again we could have named errorObject anything we wanted.
    }, function (errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    });

    // LIGHTBOX FUNCTION //
    $(function () {
        $(".lightbox").delay(500).fadeIn(2000);

        // LIGHTBOX - SUBMIT BUTTON ON CLICK EVENT 
        $(".submitButton").on("click", function (event) {
            event.preventDefault();
            // SUBMIT BUTTON IS CLICKED LIGHTBOX WILL HIDE 
            $(".lightbox").hide();
            // alert("you clicked me");
            $(".display-3").hide(3000);
            $(".paragraph").hide(2500);

            // GRABBING USERS INPUT IN FORM
            var submitName = $(".name").val().trim();
            var submitEmail = $(".email").val().trim();

            // PUSH INFO OF USER TO DATABASE
            database.ref().push({
                submitName: submitName,
                submitEmail: submitEmail
            });
        });

    });
    // SEARCH FORM BUTTON - MAGNIFYING GLASS 
    $(document).on("click", "#search", search);

});

function getVideoSearchUrl(lat, long, keywords, radius) {

    var queryURL = "https://www.googleapis.com/youtube/v3/search/?part=snippet" +
        "&type=video" +
        "&maxResults=10" +
        "&key=" + youtubeAPIKey +
        "&location=" + lat + "%2C" + long +
        "&locationRadius=" + radius +
        "&q=" + keywords;

    return queryURL;

}

function getVideoLocationSearchUrl(id) {

    var queryURL = "https://www.googleapis.com/youtube/v3/videos?" +
        "part=snippet%2CrecordingDetails" +
        "&id=" + id +
        "&key=" + youtubeAPIKey;

    return queryURL;

}

function getGeocodeUrl(address) {

    var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?' +
        'address=' + address +
        '&key=' + geocodeAPIKey;

    return queryURL;

}

// Event listener for all button elements
function search() {

    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // This line will grab the text from the input box
    var keywords = $("#keywords").val().trim();
    var address = "atlanta";
    var radius = "15mi";


    $.ajax({
        url: getGeocodeUrl(address),
        method: "GET"
    })

        .then(function (response) {
            //if response status is OK, get the latitude and longitude for the address
            if (response.status == 'OK') {
                var geoResults = response.results;
                console.log(response);

                addressLat = geoResults[0].geometry.location.lat.toString();
                addressLong = geoResults[0].geometry.location.lng.toString();
                initMap(addressLat, addressLong);

                //search for videos in the area of the given address
                $.ajax({
                    url: getVideoSearchUrl(addressLat, addressLong, keywords, radius),
                    method: "GET"
                })

                    .then(function (response) {

                        var searchResults = response.items;
                        console.log(searchResults);

                        for (var i = 0; i < searchResults.length; i++) {
                            //Get video location details
                            $.ajax({
                                url: getVideoLocationSearchUrl(searchResults[i].id.videoId),
                                method: "GET"
                            })
                                .then(function (response) {
                                    var details = response.items;
                                    var videoLat = details[0].recordingDetails.location.latitude;
                                    var videoLong = details[0].recordingDetails.location.longitude;
                                    var videoId = details[0].id;
                                    var videoTitle = details[0].snippet.title;

                                    addMarker(videoLat, videoLong, videoTitle, videoId);

                                    $("#map").show();
                                });
                        }

                    });
            }
        });
}

//create map
function initMap(addressLat, addressLong) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: new google.maps.LatLng(addressLat, addressLong),
        mapTypeId: 'terrain'
    });
}

function addMarker(videoLat, videoLong, videoTitle, id) {
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










