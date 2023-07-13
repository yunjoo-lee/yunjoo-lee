const longitude = 127.1119894;
const latitude = 37.3925837;

var map;
document.addEventListener("DOMContentLoaded", function () {
  // OpenLayers 맵 생성
  const layers = [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ];
  map = new ol.Map({
    layers: layers,
    target: "map",
    view: new ol.View({
      center: ol.proj.fromLonLat([longitude, latitude]),
      zoom: 17,
    }),
  });
});
