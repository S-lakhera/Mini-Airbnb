mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // style: "mapbox://styles/mapbox/dark-v11",
        style: "mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 11 // starting zoom
    });

    // console.log(coordinates);
const marker = new mapboxgl.Marker({color:"#e41d55"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset:25}).setHTML(
        `<H4>${listing.location}</H4> <p>Exact location will be provided after booking<p/> `
    ))
    .addTo(map); 