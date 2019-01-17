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
          place.formatted_address, +'</div>');
        infowindow.open(map, this);
      });
    }

//Modal
$(".modal-content").on('click',"shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
    map.setCenter(map);
  });
  console.log(".modal-content");