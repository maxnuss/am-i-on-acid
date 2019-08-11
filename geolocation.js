var map, infoWindow, helicopterMarker, pos;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
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
            var helicopterLat = pos.lat + helicopterDif;
            var helicopterLng = pos.lng;
            var helicopterPos = {
                lat: helicopterLat,
                lng: helicopterLng,
            }
            helicopterMarker = new google.maps.Marker({
                position: helicopterPos,
                icon: 'helicopter-icon.jpg',
                map: map,
            });
            google.maps.event.addListener(map, 'click', flyHelicopter);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        removeCover();
    }
}

var radius = 0.015;
var angle = 0; 
var increment = Math.PI / 10;
var newLat;
var newLng;
var i = 0;

function flyHelicopter() {    
    angle += increment;
    newLng = pos.lng + radius * Math.sin(angle);
    newLat = pos.lat + radius * Math.cos(angle);
    helicopterMarker.setPosition(new google.maps.LatLng(newLat, newLng));
    i++;
    if (i < 100) {
        setTimeout(flyHelicopter, 200);
    } else {
        i = 0;
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
