### WMS service On Google Map

Google Map don't provide API to add WMS. But we can use an alternate way to add it.

Google Map have ImageMapType Api to add Tile mapping server (TMS) which has x, y, z to define tiles at different zoom level. This x, y, z can be converted to Bounding box which is required by WMS.

### WMS Service Get Capabilities
```angular2html
https://gd-botkyrka.sokigohosting.com/public-maps/gator_och_parker/belysning?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&authkey=909ecf47a41b41659deec0e454326fac
```


## Sample  WMS Service url with parameter
````angular2html
"https://gd-botkyrka.sokigohosting.com/public-maps/gator_och_parker/belysning?" +
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
````



### For Details reading following article by Justin Poehnelt

````angular2html
https://jpoehnelt.medium.com/wms-layer-on-google-maps-1087a43d7556
````
