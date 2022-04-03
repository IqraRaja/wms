let map;


const EXTENT = [-Math.PI * 6378137, Math.PI * 6378137];

function xyzToBounds(x, y, z) {
    var tileSize = EXTENT[1] * 2 / Math.pow(2, z);
    var minx = EXTENT[0] + x * tileSize;
    var maxx = EXTENT[0] + (x + 1) * tileSize;
    // remember y origin starts at top
    var miny = EXTENT[1] - (y + 1) * tileSize;
    var maxy = EXTENT[1] - y * tileSize;
    return [minx, miny, maxx, maxy];
}

function getKabelTileURL(coordinates, zoom) {
    const bbox = xyzToBounds(coordinates.x, coordinates.y, zoom).join(",");
    console.log("bbox", bbox);
    const url = "https://gd-botkyrka.sokigohosting.com/public-maps/gator_och_parker/belysning?" +
        "service=WMS" +
        "&version=1.3.0" +
        "&authkey=909ecf47a41b41659deec0e454326fac" +
        "&request=GetMap" +
        "&FORMAT=image%2Fpng" +
        "&layers=Belysningskabel" +
        "&bbox=" + bbox +
        "&SRS=EPSG:3857" +
        "&WIDTH=256&HEIGHT=256" +
        "&Transparent=True"
    return url;
}

function getPOITileURL(coordinates, zoom) {
    const bbox = xyzToBounds(coordinates.x, coordinates.y, zoom).join(",");
    console.log("bbox", bbox);
    const url = "https://gd-botkyrka.sokigohosting.com/public-maps/gator_och_parker/belysning?" +
        "service=WMS" +
        "&version=1.3.0" +
        "&authkey=909ecf47a41b41659deec0e454326fac" +
        "&request=GetMap" +
        "&FORMAT=image%2Fpng" +
        "&layers=Belysningsstolpe" +
        "&bbox=" + bbox +
        "&SRS=EPSG:3857" +
        "&WIDTH=256&HEIGHT=256" +
        "&Transparent=True"
    return url;
}

function initMap() {
    // Displaying map on HTML Div
    const targetDiv = document.getElementById("map")
    const map = new google.maps.Map(targetDiv, {
        center: {lat: 59.21, lng: 17.8974},
        zoom: 12,
    });

    //adding spain cabel network on top of google map
    const kabel = new google.maps.ImageMapType({
        getTileUrl: getKabelTileURL,
        name: "Kabel",
        alt: "Kabel Network",
        minZoom: 0,
        maxZoom: 19,
        opacity: 1.0
    });
    map.overlayMapTypes.push(kabel);

    //add spain poi
    const poi = new google.maps.ImageMapType({
        getTileUrl: getPOITileURL,
        name: "POI",
        alt: "Point of Interest",
        minZoom: 0,
        maxZoom: 19,
        opacity: 1.0
    });
    map.overlayMapTypes.push(poi);

}
