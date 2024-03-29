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

  // // GeoJSON의 좌표체계를 수정할 수 있도록 좌표코드 변수 할닫
  const orgProjection = geojsonFormat.dataProjection.getCode();

  // GeoJSON 데이터의 좌표 체계를 3857로 변환
  features.forEach((feature) => {
    const geometry = feature.getGeometry();
    geometry.transform(orgProjection, "EPSG:3857");
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
        color: "rgba(25, 42, 104, 0.4)",
      }),
    }),
  });

  // // geojson을 편집 가능한 상태로 불러오고 싶을 경우 아래 코드 주석해제하여 import
  // vectorLayer.push(vectorFromGeojson);

  // map에 레이어 추가
  map.addLayer(vectorFromGeojson);
};
