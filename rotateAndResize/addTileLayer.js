var map;
const addTileLayer = () => {
  const latitude = parseFloat(document.getElementById("latitude").value); // 위도
  const longitude = parseFloat(document.getElementById("longitude").value); // 경도

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
};

addTileLayer();
