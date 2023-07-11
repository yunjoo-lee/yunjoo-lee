import * as ol from "ol";

export function initMap() {
  // OpenLayers 맵 생성
  var map = new ol.Map({
    target: "map", // 앞서 생성한 지도 컨테이너의 ID
    layers: [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", // 타일 주소
        }),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([126.9517, 37.5443]), // 지도 초기 중심 위치 (경도, 위도)
      zoom: 14, // 초기 줌 레벨
    }),
  });
}

initMap();
