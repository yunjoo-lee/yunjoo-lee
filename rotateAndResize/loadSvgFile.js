/**
 * svg 파일 불러오기 버튼을 클릭하면 실행되는 함수
 * file input 창을 띄우고, svg를 선택
 */
const openSVGFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "svg";
  input.onchange = (event) => {
    transFile(event.target.files[0]).then(convertGeojson).catch(console.error);
  };
  input.click();
};

/**
 * fileReader로 svg 파일을 텍스트로 읽고,
 * svg의 이미지 형태로 html 화면에 출력
 */
const transFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      outsvg.innerHTML = reader.result;
      resolve();
    };
    reader.onerror = reject;
    reader.readAsText(file, "euc-kr");
  });
};

/**
 * svg 객체의 속성을 읽어와서 geojson으로 변환하기 위해
 * viewBox에 대한 설정 및 좌표 기준 값 설정
 * -> svg를 geojson으로 변환
 * 이후 svg 파일을 지도 레이어로 올리는 함수 연속적으로 실행
 */
const convertGeojson = () => {
  const outsvg = document.getElementById("outsvg");
  const svg = outsvg.querySelector("svg");
  let box = svg.getAttribute("viewBox");
  box = svg.viewBox.baseVal;
  svg.setAttribute("id", "mysvg");
  svg.setAttribute("width", String(box.width) + "px"); // 가로 설정
  svg.setAttribute("height", String(box.height) + "px"); // 세로 설정

  const center = map.getView().getCenter();
  const [longitude, latitude] = ol.proj.toLonLat(center);

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

/**
 * convertGeojson 함수에서
 * svg를 geojson 형태로 바꾼 fileData를 인자로 받아
 * 지도 상에 띄우는 함수
 * @param {*} fileData
 */
const svgToMapLayer = (fileData) => {
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

  const vectorFromSvg = new ol.layer.Vector({
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

  // map에 레이어 추가하고, vectorLayer 배열에 추가한 레이어 객체 추가
  vectorLayer.push(vectorFromSvg);
  map.addLayer(vectorFromSvg);
};
