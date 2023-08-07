/**
 * 특정 경로에 고정 file 설정해두고 선택하거나 편집할 수 없도록 설정
 */

// const loadVectorLayer = () => {

// GeoJSON 파일 로드 및 표시
const fixedvectorSource = new ol.source.Vector({
  url: "./department_hyundae.geojson",
  format: new ol.format.GeoJSON(),
  loader: function (extent, resolution, projection) {
    const url = this.getUrl();
    if (url) {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          const format = fixedvectorSource.getFormat();
          const features = format.readFeatures(json, {
            dataProjection: "EPSG:4326", // GeoJSON 데이터의 좌표 체계
            featureProjection: "EPSG:3857", // 맵에 표시할 좌표 체계
          });
          fixedvectorSource.addFeatures(features);
        });
    }
  },
});

fixedVectorLayer = new ol.layer.Vector({
  source: fixedvectorSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(255, 255, 255, 0.7)",
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: "#718AE3",
    }),
    // 편집 기능을 비활성화하고 readonly 상태로 만듭니다.
    // interactions: ol.interaction.defaults({ edit: false, select: false }),
  }),
});

map.addLayer(fixedVectorLayer);
