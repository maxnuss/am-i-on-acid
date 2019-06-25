var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('<div id="info-window-text">Police are being dispatched to your location</div>');
            infoWindow.open(map);
            map.setCenter(pos);

            var copCarDif = .01;
            var copCarLat = pos.lat - copCarDif;
            var copCarLng = pos.lng + copCarDif;
            var copCarPos = {
                lat: copCarLat,
                lng: copCarLng,
            };
            var copCar = new google.maps.Marker({
                position: copCarPos,
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png',
                map: map,
            });

            var cover = document.getElementById('cover');
            cover.remove();

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}