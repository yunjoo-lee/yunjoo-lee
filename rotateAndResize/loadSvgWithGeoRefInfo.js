const convertGeojonWithRef = (layerName, geoRef) => {
  storage.storeValue("widthRatio", geoRef.widthRatio);
  storage.storeValue("heightRatio", geoRef.heightRatio);
  storage.storeValue("rotate", geoRef.rotate);

  const svg = outsvg.querySelector("svg");
  const box = svg.viewBox.baseVal;
  svg.setAttribute("id", "mysvg");
  svg.setAttribute("width", String(box.width) + "px"); // 가로 설정
  svg.setAttribute("height", String(box.height) + "px"); // 세로 설정

  // const center = map.getView().getCenter();
  const [longitude, latitude] = [geoRef.lon, geoRef.lat];

  const mapPxToRatioCm = [
    box.height * storage.getValue("pxRatio") * geoRef.heightRatio * -1,
    box.width * storage.getValue("pxRatio") * geoRef.widthRatio,
  ];

  const bound = [
    [latitude, calculateLon(longitude, latitude, mapPxToRatioCm)],
    [calculateLat(longitude, latitude, mapPxToRatioCm), longitude],
  ];

  const geoJson = svgtogeojson.svgToGeoJson(
    bound,
    document.getElementById("mysvg"),
    10
  );

  $("#rotateinfo").text(geoRef.rotate.toFixed(2));
  $("#scaleinfo").text(
    `${geoRef.widthRatio.toFixed(2)},${geoRef.heightRatio.toFixed(2)}`
  );

  svgToMapLayer(geoJson, layerName);

  document.getElementById("outsvg").innerHTML = "";

  // // TO-DO: rotate값 반영해보기

  document.getElementById("loadingOverlay").classList.add("hidden");
};

// const canvasFeature = map.getAllLayers()[1].getSource().getFeatures()[0];
// const rotateCenter = canvasFeature.getGeometry().getFirstCoordinate();
// canvasFeature
//   .getGeometry()
//   .rotate(convertRotate(geoRefInfo.rotate), rotateCenter);

/**
 * 회전 로직에 필요한 공식
 * 도 단위 각도 -> 라디안 단위 각도
 */
const convertRotate = (degrees) => {
  const PI = Math.PI;
  // 시계 방향의 각도를 반시계 방향으로 바꿉니다.
  const minusDegree = -degrees;
  // 도를 라디안으로 변환합니다.
  return minusDegree * (PI / 180);
};

const rotateMultipleLayerFeatures = (layers, angle, anchor) => {
  layers.forEach((layer) => {
    layer.getSource().forEachFeature(function (feature) {
      let geometry = feature.getGeometry();
      geometry.rotate(angle, anchor);
    });
    layer.changed(); // 레이어를 갱신하여 변동 사항을 반영
  });
};

rotateMultipleLayerFeatures(vectorLayer, convertRotate(30));
