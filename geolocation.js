var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            removeCover();


            infoWindow.setPosition(pos);
            infoWindow.setContent('<div id="info-window-text">Police are being dispatched to your location</div>');
            infoWindow.open(map);
            map.setCenter(pos);

            var copCarDif = 0.01;
            var copCarLat = pos.lat - copCarDif;
            var copCarLng = pos.lng - copCarDif;
            var copCarPos = {
                lat: copCarLat,
                lng: copCarLng,
            };
            var copCar = new google.maps.Marker({
                position: copCarPos,
                icon: 'copcar-icon.gif',
                map: map,
            });

            var helicopterDif = 0.015;
            var helicopterLat = pos.lat - helicopterDif;
            var helicopterLng = pos.lng - helicopterDif;
            var helicopterPos = {
                lat: helicopterLat,
                lng: helicopterLng,
            }
            var helicopterMarker = new google.maps.Marker({
                position: helicopterPos,
                icon: 'helicopter.gif',
                map: map,
            });
            
            flyHelicopter(helicopterMarker, helicopterPos, pos, helicopterDif);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        removeCover();
    }
}

function flyHelicopter(helicopterMarker, helicopterPos, pos, helicopterDif) {
    var radius = Math.sqrt(Math.pow(helicopterDif, 2) * 2)
    var angle = 5 * Math.PI / 4; 
    var increment = Math.PI / 10;
    var newLat;
    var newLng;
    
    while (true) {
        angle += increment;
        newLat = pos.lat - radius * Math.sin(angle);
        newLng = pos.lng + radius * Math.cos(angle);
        helicopterMarker.setPosition( new google.maps.LatLng( newLat, newLng ) );
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function removeCover() {
    document.getElementById("cover").style.display = "none";  
}
