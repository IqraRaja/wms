### WMS service On Google Map

Google Map don't provide API to add WMS. But we can use an alternate way to add it.

Google Map have ImageMapType Api to add Tile mapping server (TMS) which has x, y, z to define tiles at different zoom level. This x, y, z can be converted to Bounding box which is required by WMS.

### WMS Service
```angular2html
http://172.105.50.132:8080/geoserver/tiger/wms?service=WMS&version=1.1.0&request=GetMap&FORMAT=image%2Fpng&layers=tiger%3Atiger_roads&bbox=-8247861.1000836585,4960457.387594799,-8238077.160463156,4970241.327215301&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&Transparent=True
```


## Sample  WMS Service url with parameter
````angular2html

````



### For Details reading following article by Justin Poehnelt

````angular2html
https://jpoehnelt.medium.com/wms-layer-on-google-maps-1087a43d7556
````
