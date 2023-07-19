const loadFromSvg = (fileData) => {
  //   console.log(fileData); // 일단 여기까지는 geojson으로 제대로 변환됨
  const geojsonFormat = new ol.format.GeoJSON();
  const features = geojsonFormat.readFeatures(JSON.stringify(fileData));
  // // 여기서 뭔가 이상해 지는듯
  // GeoJSON 데이터의 좌표 체계를 3857로 변환
  features.forEach((feature) => {
    const geometry = feature.getGeometry();
    geometry.transform("EPSG:4326", "EPSG:3857");
    console.log(feature.getGeometry());
  });

  const vectorSource = new ol.source.Vector({
    features: features,
  });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "rgba(255, 255, 255, 0.7)",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "#FAE889",
      }),
    }),
  });

  map.addLayer(vectorLayer);
};
