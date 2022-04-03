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

function getTileURL(coordinates, zoom) {
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

function initMap() {
    const targetDiv = document.getElementById("map")
    const map = new google.maps.Map(targetDiv, {
        center: {lat: 59.21, lng: 17.8974},
        zoom: 12,
    });

    const landcover = new google.maps.ImageMapType({
        getTileUrl: getTileURL,
        name: "Landcover",
        alt: "National Land Cover Database 2016",
        minZoom: 0,
        maxZoom: 19,
        opacity: 1.0
    });
    map.overlayMapTypes.push(landcover);
}
