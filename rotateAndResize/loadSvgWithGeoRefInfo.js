const convertGeojonWithRef = (layerName, geoRef) => {
  storage.storeValue("widthRatio", geoRef.widthRatio);
  storage.storeValue("heightRatio", geoRef.heightRatio);
  storage.storeValue("rotate", geoRef.rotate);

  const svg = outsvg.querySelector("svg");
  const box = svg.viewBox.baseVal;
  svg.setAttribute("id", "mysvg");
  svg.setAttribute("width", String(box.width) + "px"); // 가로 설정
  svg.setAttribute("height", String(box.height) + "px"); // 세로 설정

  const [longitude, latitude] = [geoRef.lon, geoRef.lat];

  const mapPxToRatioCm = [
    box.height * storage.getValue("pxRatio") * geoRef.heightRatio * -1,
    box.width * storage.getValue("pxRatio") * geoRef.widthRatio,
  ];
  //
  //
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

  document.getElementById("loadingOverlay").classList.add("hidden");
};
