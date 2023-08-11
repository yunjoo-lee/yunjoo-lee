/**
 * 지도 기본 구성을 위한 var 변수 설정
 */
// var map;
// var vectorLayer = [];

/**
 * 페이지에서 위경도 값 받아와서 OSM 배경 데이터 생성
 */
// const select = () => {
// const latitude = parseFloat(document.getElementById("latitude").value); // 위도
// const longitude = parseFloat(document.getElementById("longitude").value); // 경도

// OpenLayers 맵 생성

const osmSource = new ol.source.OSM();
const samahSource = new ol.source.XYZ({
  url: "http://tile.eartheye.ai/SKYMAP/BASEMAP/{z}/{x}/{y}.png",
});
const googleSource = new ol.source.XYZ({
  url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  crossOrigin: "anonymous",
});
const ngiSource = new ol.source.XYZ({
  url: "http://tile.eartheye.ai/NGII/2020/{z}/{x}/{y}.png",
});

// const layer = new ol.layer.Tile({
//   source: osmSource,
// });

// map = new ol.Map({
//   layers: [layer],
//   target: "map",
//   view: new ol.View({
//     center: ol.proj.fromLonLat([longitude, latitude]),
//     zoom: 16,
//   }),
// });

const styles = { osmSource, samahSource, googleSource, ngiSource };
const styleSelector = document.getElementById("myselectbox");

const update = () => {
  const style = styles[styleSelector.value];
  map.getAllLayers()[0].setSource(style);
};

styleSelector.addEventListener("change", update);
// };

// addTileLayer();
