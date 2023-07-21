const loadGeojsonFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "geojson";
  input.onchange = (event) => {
    processFile(event.target.files[0]);
  };
  input.click();
};

const processFile = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    const fileData = reader.result;
    addVectorLayer(fileData);
  };
  reader.readAsText(file);
};

const addVectorLayer = (fileData) => {
  const geojsonFormat = new ol.format.GeoJSON();
  const features = geojsonFormat.readFeatures(fileData);

  // GeoJSON 데이터의 좌표 체계를 3857로 변환
  features.forEach((feature) => {
    const geometry = feature.getGeometry();
    geometry.transform("EPSG:4326", "EPSG:3857");
  });

  const vectorSource = new ol.source.Vector({
    features: features,
  });

  const vectorFromGeojson = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "rgba(255, 255, 255, 0.7)",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "rgba(0, 130, 15, 0.6)",
      }),
    }),
  });
  // map에 레이어 추가하고, vectorLayer 배열에 추가한 레이어 객체 추가
  vectorLayer.push(vectorFromGeojson);
  map.addLayer(vectorFromGeojson);
};
