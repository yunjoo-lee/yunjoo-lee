// const loadVectorLayer = () => {
// GeoJSON 파일 로드 및 표시
const fixedvectorSource = new ol.source.Vector({
  url: "./sample_section.geojson",
  format: new ol.format.GeoJSON(),
  loader: function (extent, resolution, projection) {
    const url = this.getUrl();
    if (url) {
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
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

const fixedVectorLayer = new ol.layer.Vector({
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

map.getInteractions().forEach(function (interaction) {
  if (interaction.getFeatures().getArray()[0].getLayer() === fixedVectorLayer) {
    interaction.setActive(false);
  }
  if (interaction instanceof ol.interaction.Modify) {
    var features = interaction.getFeatures().getArray();
    if (features.length > 0 && features[0].getLayer() === fixedVectorLayer) {
      interaction.setActive(false);
    }
  }
});

map.getInteractions().forEach((i) => {
  console.log(i.getFeatures().getArray()[0].getLayer());
});

// // 고정 상태의 새로운 벡터 레이어를 생성합니다.
// var fixedVectorLayer = new ol.layer.Vector({
//   source: new ol.source.Vector(),
// });

map.addLayer(fixedVectorLayer);
// };
