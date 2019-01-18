//For Modal - JS JQuery

var map;
var infowindow;
//Original Google Map Loaction
function initMap() {
  var pyrmont = {
    lat: -33.867,
    lng: 151.195
  };
  console.log(pyrmont);

  //Original Google Map Center and Distance
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });
  console.log('map');
  //Google Maps Services
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['restaurants', 'bars']
  }, callback);
  console.log('restaurants', 'bars');
}
//Google Maps Markers
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
  console.log(google.maps.places.PlacesServiceStatus.OK);
}

//Google Maps Marker Creation
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  console.log(marker);
  //Google Maps Marker Creation
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  console.log(marker);
}

//Modal Call Up 
$(document).ready(function () {
  // Re-init map before show modal
  $('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    $("#location-map").css("width", "100%");
    $("#map_canvas").css("width", "100%");
  });


  // Trigger map resize event after modal shown
  $('#myModal').on('shown.bs.modal', function () {
    google.maps.event.trigger(map, "resize");
    map.setCenter(map);
  });
});
