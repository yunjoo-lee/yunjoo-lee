import OpenLayers from "openlayers";

var map, vectorLayer, pointFeature, lineFeature, polygonFeature;

function init() {
  map = new OpenLayers.Map("map");
  var layer = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0",
    { layers: "basic" }
  );
  map.addLayer(layer);

  var style_blue = OpenLayers.Util.extend(
    {},
    OpenLayers.Feature.Vector.style["default"]
  );
  style_blue.strokeColor = "blue";
  style_blue.fillColor = "blue";
  var style_green = {
    strokeColor: "#339933",
    strokeOpacity: 1,
    strokeWidth: 3,
    pointRadius: 6,
    pointerEvents: "visiblePainted",
  };

  vectorLayer = new OpenLayers.Layer.Vector("Simple Geometry");

  // create a point feature
  var point = new OpenLayers.Geometry.Point(-110, 45);
  pointFeature = new OpenLayers.Feature.Vector(point, null, style_blue);

  // create a line feature from a list of points
  var pointList = [];
  var newPoint = point;
  for (var p = 0; p < 5; ++p) {
    newPoint = new OpenLayers.Geometry.Point(
      newPoint.x + Math.random(1),
      newPoint.y + Math.random(1)
    );
    pointList.push(newPoint);
  }
  lineFeature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.LineString(pointList),
    null,
    style_green
  );

  // create a polygon feature from a linear ring of points
  var pointList = [];
  for (var p = 0; p < 6; ++p) {
    var a = (p * (2 * Math.PI)) / 7;
    var r = Math.random(1) + 1;
    var newPoint = new OpenLayers.Geometry.Point(
      point.x + r * Math.cos(a),
      point.y + r * Math.sin(a)
    );
    pointList.push(newPoint);
  }
  pointList.push(pointList[0]);

  var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
  polygonFeature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Polygon([linearRing])
  );

  map.addLayer(vectorLayer);
  map.setCenter(new OpenLayers.LonLat(point.x, point.y), 5);
  vectorLayer.addFeatures([pointFeature, lineFeature, polygonFeature]);
}

var origin = new OpenLayers.Geometry.Point(-111.04, 45.68);
function resizeFeatures(scale) {
  pointFeature.geometry.resize(scale, origin);
  lineFeature.geometry.resize(scale, origin);
  polygonFeature.geometry.resize(scale, origin);
  vectorLayer.redraw();
}

resizeFeatures(1.5);
