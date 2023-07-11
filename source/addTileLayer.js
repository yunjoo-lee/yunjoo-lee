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
      center: ol.proj.fromLonLat([126.981527, 37.563295]),
      zoom: 18,
    }),
  });
});
