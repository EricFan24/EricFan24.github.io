mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY2ZhbjI0IiwiYSI6ImNrcHhlY3dsajIzbXQydnFjZGd3ZWR0MWkifQ.2UHQDJPhlp5Cx423H0MQOg';

// get user location
navigator.geolocation.getCurrentPosition(
    successLocation, 
    errorLocation, 
    { enableHighAccuracy: true })

function successLocation(position) {
    setupMap(
        [position.coords.longitude, position.coords.latitude],
        15)
}

function errorLocation() {
    setupMap(
        [-73.9665, 40.7812],
        12)
}

function setupMap(center, zoom) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: zoom
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav)

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })

    map.addControl(directions, "top-left")
}

