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
    const url = "http://172.105.50.132:8080/" +
        "geoserver/tiger/wms?" +
        "service=WMS" +
        "&version=1.1.0" +
        "&request=GetMap" +
        "&FORMAT=image%2Fpng" +
        "&layers=tiger%3Atiger_roads" +
        "&bbox=" + bbox +
        "&SRS=EPSG:3857" +
        "&WIDTH=256&HEIGHT=256" +
        "&Transparent=True"
    return url;
}

function initMap() {
    const targetDiv = document.getElementById("map")
    const map = new google.maps.Map(targetDiv, {
        center: {lat: 40.7850, lng: -73.9660},
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
