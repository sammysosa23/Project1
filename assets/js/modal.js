//For Modal - JS JQuery

var map;
var service;
var infowindow;
//Original Google Map Loaction
function initMap() {
  var atlanta = {
    lat: 33.753746,
    lng: -84.386330,
  };
  //Original Google Map Center and Distance
  map = new google.maps.Map(document.getElementById('mapCanvas'), {
    center: atlanta,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  //Google Maps Services
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: atlanta,
    radius: 500,
    type: ['restaurant'],
  }, callback);

  service.nearbySearch({
    location: atlanta,
    radius: 500,
    type: ['bar'],
  }, callback);

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i])

    }
  }
}
//Google Maps Markers
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });
  console.log(marker)

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      'Place Rating: ' + place.rating + '<br>' +
      place.vicinity, +'</div>');
    infowindow.open(map, this);
  });
}


// //Modal
// $(".modal-content").on('click', "shown.bs.modal", function () {
//   google.maps.event.trigger(map, "resize");
//   map.setCenter(map);
// });
// console.log(".modal-content");

// function initAutocomplete() {
//   google.maps.Map(document.getElementById('mapCanvas'), {
//     mapTypeId: 'roadmap'
//   });
//   // Create the search box and link it to the UI element.
//   var input = document.getElementById('pac-input');
//   var searchBox = new google.maps.places.SearchBox(input);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
// console.log(input);
// console.log(searchBox);
// console.log(google.maps.ControlPosition.TOP_LEFT);

//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener('bounds_changed', function () {
//     searchBox.setBounds(map.getBounds());
//   });
// console.log('bounds_changed');

//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener('places_changed', function () {
//     var places = searchBox.getPlaces();
//   console.log(markers);
//     if (places.length == 0) {
//       return;
//     } console.log(places.length);
//     // Clear out the old markers.
//     marker.forEach(function (marker) {
//       marker.setMap(null);
//     });
//     marker = [];
//   console.log(marker);

//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//   console.log(marker);
//     places.forEach(function (place) {
//       if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//       }
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };
// console.log(place);
// console.log(icon);
//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));
// console.log(markers);
//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//       console.log(place.geometry.viewport);
//     });
//     map.fitBounds(bounds);
//   });
//   console.log(bounds);
// }