'use strict';

import { onEvent, getElement, select, print } from "./utils.js";

const loading = select('.loading');

function getLocation(position) {

    loading.style.visibility = 'hidden';
    const { latitude, longitude } = position.coords;

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbWFucHJlZXRiYXdhIiwiYSI6ImNsYmdyeDNhZzBodHYzb211MnNjNW43bjcifQ.LrFSdfTtOaY4wbKCUeXeWg';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/chamanpreetbawa/clbl4dyy7000a14o50895o0fc',
        zoom: 15,
        center: [longitude, latitude],
    });

    const marker = new mapboxgl.Marker({
        color: "#66bacf",
    }).setLngLat([longitude, latitude])
        .addTo(map);


        map.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
            })
            );

}


function errorHandler(error) {
    console.log(error.message);
}

const options = {
    enableHighAccuracy: true
};

onEvent('load',window, () =>{
if (navigator.geolocation) {
    let geo = navigator.geolocation;
    geo.getCurrentPosition(getLocation, errorHandler, options);
} else {
    console.log('Geo Location is not suppprted by your browser');
}
});