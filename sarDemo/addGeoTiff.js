// WMS 레이어 생성
var layer50224 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://editor.dabeeo.com:18080/geoserver/SARsample/wms", // GeoServer의 WMS 서비스 URL
    params: { LAYERS: "SARsample:K5_50224", TILED: false, CRS: "EPSG:3857" }, // 레이어 이름 등 WMS 파라미터 설정
    serverType: "geoserver", // 서버 타입 설정
  }),
  opacity: 0.7,
});

var layer44548 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://editor.dabeeo.com:18080/geoserver/SARsample/wms", // GeoServer의 WMS 서비스 URL
    params: { LAYERS: "SARsample:K5_44548", TILED: false, CRS: "EPSG:3857" }, // 레이어 이름 등 WMS 파라미터 설정
    serverType: "geoserver", // 서버 타입 설정
  }),
  opacity: 0.7,
});

var layer44563 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://editor.dabeeo.com:18080/geoserver/SARsample/wms", // GeoServer의 WMS 서비스 URL
    params: { LAYERS: "SARsample:K5_44563", TILED: false, CRS: "EPSG:3857" }, // 레이어 이름 등 WMS 파라미터 설정
    serverType: "geoserver", // 서버 타입 설정
  }),
  opacity: 0.7,
});

var spss = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://editor.dabeeo.com:18080/geoserver/SARsample/wms", // GeoServer의 WMS 서비스 URL
    params: {
      FORMAT: "image/jpeg",
      LAYERS: "SARsample:final_23",
      // VERSION: "1.1.1",
      // exceptiosns: "application/vnd.ogc.se_inimage",
      tiled: true,
      // tilesOrigin: "0,-294",
      CRS: "EPSG:3857",
    }, // 레이어 이름 등 WMS 파라미터 설정
    serverType: "geoserver", // 서버 타입 설정
  }),
  opacity: 0.5,
});
// map.addLayer(layer50224);
// map.addLayer(layer44548);
// map.addLayer(layer44563);
map.addLayer(spss);
