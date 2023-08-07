/**
 * 지도 기본 구성을 위한 var 변수 설정
 */
// var map;
// var vectorLayer = [];

/**
 * 페이지에서 위경도 값 받아와서 OSM 배경 데이터 생성
 */
const select = () => {
  const latitude = parseFloat(document.getElementById("latitude").value); // 위도
  const longitude = parseFloat(document.getElementById("longitude").value); // 경도

  // OpenLayers 맵 생성

  const osmSource = new ol.source.OSM();
  const samahSource = new ol.source.XYZ({
    url: "http://tile.eartheye.ai/SKYMAP/BASEMAP/{z}/{x}/{y}.png",
  });
  const maxarSource = new ol.source.XYZ({
    url: "http://tile.eartheye.ai/MAXAR/BASEMAP/{z}/{x}/{y}.png",
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

  const styles = { osmSource, samahSource, maxarSource, ngiSource };
  const styleSelector = document.getElementById("dd");

  // const update = () => {
  //   const style = styles[styleSelector.value];
  //   map.getAllLayers()[0].setSource(style);
  // };

  // styleSelector.addEventListener("change", update);
};

// addTileLayer();

var untiled;

// setup single tiled layer
untiled = new ol.source.ImageWMS(
  "SARsample:K5_44563 - Untiled",
  "https://editor.dabeeo.com:18080/geoserver/SARsample/wms",
  {
    STYLES: "",
    LAYERS: "SARsample:K5_44563",
    exceptions: "application/vnd.ogc.se_inimage",
    format: "image/png",
  },
  {
    singleTile: true,
    ratio: 1,
    // isBaseLayer: true,
    yx: { "EPSG:32652": false },
  }
);

map.addLayer([untiled]);
