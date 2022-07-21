const EXTENT = [-Math.PI * 6378137, Math.PI * 6378137];
const layers = [];
let map = null;

// function covert24326(x, y) {
//     const source = new Proj4js.Proj('WGS84');
//     const dest = new Proj4js.Proj('EPSG:3857');
//     const point = new Proj4js.Point(x, y);
//     const newPoint = Proj4js.transform(source, dest, point);
//     return newPoint;
//
// }

function xyzToBounds3857(x, y, z) {
    const tileSize = EXTENT[1] * 2 / Math.pow(2, z);
    const minx = EXTENT[0] + x * tileSize;
    const maxx = EXTENT[0] + (x + 1) * tileSize;
    // remember y origin starts at top
    const miny = EXTENT[1] - (y + 1) * tileSize;
    const maxy = EXTENT[1] - y * tileSize;
    const buffSize = 0

    return [minx + buffSize, miny + buffSize, maxx + buffSize, maxy + buffSize];
}

function xyzToBounds(tile_x, tile_y, zoom) {
    const n = Math.pow(2, zoom)
    const left_lon_deg = tile_x / n * 360.0 - 180.0
    const right_lon_deg = (tile_x + 1) / n * 360.0 - 180.0
    const top_lat_deg = (Math.atan(Math.sinh(Math.PI * (1 - 2 * tile_y / n)))) * 180 / Math.PI
    const bottom_lat_deg = (Math.atan(Math.sinh(Math.PI * (1 - 2 * (tile_y + 1) / n)))) * 180 / Math.PI
    return [ bottom_lat_deg, left_lon_deg, top_lat_deg, right_lon_deg]
}
function getKabelTileURL(coordinates, zoom) {
    const bbox = xyzToBounds(coordinates.x, coordinates.y, zoom).join(",");
    // console.log("bbox", bbox);
    const url = "https://gd-botkyrka.sokigohosting.com/public-maps/gator_och_parker/belysning?" +
        "service=WMS" +
        "&version=1.3.0" +
        "&token=909ecf47a41b41659deec0e454326fac" +
        "&request=GetMap" +
        "&FORMAT=image%2Fpng" +
        "&layers=Belysningskabel" +
        "&bbox=" + bbox +
        "&SRS=EPSG:4326" +
        "&WIDTH=256&HEIGHT=256" +
        "&Transparent=True"
    return url;
}

function getPOITileURL(coordinates, zoom) {
    const bbox = xyzToBounds(coordinates.x, coordinates.y, zoom).join(",");
    // console.log("bbox", bbox);
    const url = "https://gd-botkyrka.sokigohosting.com/public-maps/gator_och_parker/belysning?" +
        "service=WMS" +
        "&version=1.3.0" +
        "&token=909ecf47a41b41659deec0e454326fac" +
        "&request=GetMap" +
        "&FORMAT=image%2Fpng" +
        "&layers=Belysningsstolpe" +
        "&bbox=" + bbox +
        "&crs=EPSG:4326" +
        "&WIDTH=256&HEIGHT=256" +
        "&Transparent=True"
    return url;
}

function initMap() {
    // Displaying map on HTML Div
    const targetDiv = document.getElementById("map")
    map = new google.maps.Map(targetDiv, {
        center: {lat: 59.18284, lng: 17.81808},
        zoom: 14,
    });

    //adding spain cabel network on top of google map
    layers.push(new google.maps.ImageMapType({
        getTileUrl: getKabelTileURL,
        name: "Kabel",
        alt: "Kabel Network",
        minZoom: 0,
        maxZoom: 19,
        opacity: 1.0
    }));
    map.overlayMapTypes.push(layers[layers.length - 1]);

    //add spain poi
    layers.push(new google.maps.ImageMapType({
        getTileUrl: getPOITileURL,
        name: "POI",
        alt: "Point of Interest",
        minZoom: 0,
        maxZoom: 19,
        opacity: 1.0
    }));
    map.overlayMapTypes.push(layers[layers.length - 1]);
    createLayerSwitcher();
    createIdentifier();
}
function  createIdentifier() {
    var controlDiv = document.createElement('div');
    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
    const btn=document.createElement("button");
    btn.innerHTML='Green'
    controlDiv.appendChild(btn);
    btn.onclick=function () {
        const url = "https://gd-botkyrka.sokigohosting.com/public-maps/gator_och_parker/belysning?" +
            "service=WFS" +
            "&version=1.3.0" +
            "&token=909ecf47a41b41659deec0e454326fac" +
            "&request=GetFeature" +
            "&FORMAT=image%2Fpng"
        alert(url)

    }
}

function createLayerSwitcher() {
    var controlDiv = document.createElement('div');
    // var myControl = new MyControl(controlDiv);
    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
    // Set CSS for the control border.
    const controlUI = document.createElement("div");

    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.marginRight = "10px";

    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    // controlUI.style.height="200px";
    controlDiv.appendChild(controlUI);

    layers.forEach((layer, index) => {
        const controlText = document.createElement("div");

        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.fontSize = "16px";
        controlText.style.lineHeight = "38px";
        controlText.style.paddingLeft = "5px";
        controlText.style.paddingRight = "5px";
        let html = `<input type="checkbox" id="${layer.name}" onclick="toggleLayer(this);" value="${index}" checked>`
        html += `<label for="${layer.name}"> ${layer.name}</label><br>`
        controlText.innerHTML = html;
        controlUI.appendChild(controlText);
    })
    // Set CSS for the control interior.

    // Setup the click event listeners: simply set the map to Chicago.
    // controlUI.addEventListener("click", () => {
    //     map.setCenter(chicago);
    // });
}

function toggleLayer(chk) {
    // alert(chk.value);
    const layer = layers[chk.value];
    console.log("layer", layer);
    // const i = chk.value;
    // if (layers[i].getMap() === null) {
    //     layers[i].setMap(map);
    // } else {
    //     layers[i].setMap(null);
    // }
}
