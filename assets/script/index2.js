'use strict';

import { onEvent, getElement, select, print } from "./utils.js";

const loading = select('.loading');
const overlay = select('.overlay');

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbWFucHJlZXRiYXdhIiwiYSI6ImNsYmdyeDNhZzBodHYzb211MnNjNW43bjcifQ.LrFSdfTtOaY4wbKCUeXeWg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chamanpreetbawa/clbl4dyy7000a14o50895o0fc',
    zoom: 16,
    center: [0, 0],
    pitch: 40
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();


const marker = new mapboxgl.Marker({
    color: "#3898ff",
});

function getLocation(position) {

    const { longitude, latitude } = position.coords;

    if (longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        setTimeout(() => { overlay.style.display = 'none' }, 750);
        loading.style.visibility = 'visible';
    }
}


function errorHandler(error) {
    loading.style.animationPlayState = 'paused';
    console.log(error.message);

}

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
};

if (navigator.geolocation) {
    let geo = navigator.geolocation;
    geo.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geo Location is not suppprted by your browser');
}
