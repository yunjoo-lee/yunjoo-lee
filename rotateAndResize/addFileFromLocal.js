const loadVectorLayer = () => {
  // GeoJSON 파일 로드 및 표시
  const vectorSource = new ol.source.Vector({
    url: "./sample.geojson",
    format: new ol.format.GeoJSON(),
    loader: function (extent, resolution, projection) {
      const url = this.getUrl();
      if (url) {
        fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            const format = vectorSource.getFormat();
            const features = format.readFeatures(json, {
              dataProjection: "EPSG:4326", // GeoJSON 데이터의 좌표 체계
              featureProjection: "EPSG:3857", // 맵에 표시할 좌표 체계
            });
            vectorSource.addFeatures(features);
          });
      }
    },
  });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "rgba(255, 255, 255, 0.7)",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "#718AE3",
      }),
    }),
  });

  map.addLayer(vectorLayer);
};
