var vectorLayer;

const convertGeojson = () => {
  const svg = document.querySelector("svg");
  let box = svg.getAttribute("viewBox");
  box = svg.viewBox.baseVal;
  svg.setAttribute("id", "mysvg");
  svg.setAttribute("width", String(box.width) + "px"); // 가로 설정
  svg.setAttribute("height", String(box.height) + "px"); // 세로 설정

  const latitude = parseFloat(document.getElementById("latitude").value); // 위도
  const longitude = parseFloat(document.getElementById("longitude").value); // 경도

  const bound = [
    [latitude + box.height * 0.000001, longitude + box.width * 0.000001],
    [latitude, longitude],
  ];

  const geoJson = svgtogeojson.svgToGeoJson(
    bound,
    document.getElementById("mysvg"),
    10
  );

  svgToMapLayer(geoJson);

  document.getElementById("outsvg").innerHTML =
    "지도에 SVG 레이어를 추가했습니다.";
};

const svgToMapLayer = (fileData) => {
  const geojsonFormat = new ol.format.GeoJSON();
  const features = geojsonFormat.readFeatures(fileData);

  // GeoJSON 데이터의 좌표 체계를 3857로 변환
  features.forEach((feature) => {
    const geometry = feature.getGeometry();
    geometry.transform("EPSG:4326", "EPSG:3857");
    // console.log(feature.getGeometry());
  });

  const vectorSource = new ol.source.Vector({
    features: features,
  });

  vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "rgba(255, 255, 255, 0.7)",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "rgba(109, 0, 126, 0.6)",
      }),
    }),
  });

  map.addLayer(vectorLayer);
};