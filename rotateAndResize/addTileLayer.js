/**
 * 지도 기본 구성을 위한 var 변수 설정
 */
var map;
var vectorLayer = [];

/**
 * 페이지에서 위경도 값 받아와서 OSM 배경 데이터 생성
 */
const addTileLayer = () => {
  const latitude = parseFloat(document.getElementById("latitude").innerHTML); // 위도
  const longitude = parseFloat(document.getElementById("longitude").innerHTML); // 경도

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

// google api 사용 시 필요한 콜밸 함수 정의
window.initMap = () => {};

addTileLayer();
