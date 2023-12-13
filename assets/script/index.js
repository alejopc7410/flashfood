'use strict';

import { select, onEvent } from './utility.js'

const acceptBtn = select('.accept-btn')

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvcGMwNSIsImEiOiJjbHEzd2ZoYzgwMHM4MnJvaGhoZWFybnpoIn0.27E07iRs7vSpMJ9dA3gmGw';
let latitude = 49.8204672;
let longitude = -97.1702272;


const map = new mapboxgl.Map({
    container: 'map',
    center: [longitude, latitude],
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9.5
});


function getLocation(position) {
    let { latitude: newLatitude, longitude: newLongitude } = position.coords;

    longitude = newLongitude 
    latitude = newLatitude

    let marker = new mapboxgl.Marker()
    .setLngLat([newLongitude, newLatitude])
    .addTo(map)

    map.setZoom(13)
    map.setCenter([newLongitude, newLatitude]);
}

function handleError(error) {
    console.log(error.message)
}

const options = {
    enableHighAccuracy: true
}

onEvent('click', acceptBtn, () => {
    if ('geolocation' in navigator) {
        const geo = navigator.geolocation
        geo.getCurrentPosition(getLocation, handleError)
    } else {
        console.log('Geolocation API is not supported by your browser')
    }
})