const initMap = () => {
  // OpenLayers 맵 생성
  const layers = [
    new ol.layer.Tile({
      source: new ol.source.OSM(), // new ol.source.XYZ({
      // url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      // }),
    }),
  ];
  const map = new ol.Map({
    layers: layers,
    target: "map",
    view: new ol.View({
      center: ol.proj.fromLonLat([126.982627, 37.563795]),
      zoom: 17,
    }),
  });
};

// OpenLayers 맵 초기화 함수 호출
initMap();
