/**
 * mapId와 groupcode를 넣으면 svg 태그를 string으로 받아오는 함수
 */
const pressSvgBtn = async () => {
  const groupCodeBox = document.getElementById("groupName");
  storage.storeValue("groupName", groupCodeBox.value);

  if (groupCodeBox.options.length > 1 && groupCodeBox.value === "") {
    alert("컨트롤 할 건물 그룹을 선택하세요.");
    return;
  }

  document.getElementById("loadingOverlay").classList.remove("hidden");
  // // 현재 개발 서버 주소로 설정됨
  const response = await axios.post(
    `https://ims-develop3.dabeeomaps.com/api/georeferencing/svg`,
    {
      mapId: storage.getValue("mapId"),
      groupCode: groupCodeBox.value,
      floorId: null,
      includeCanvas: true,
      includeSection: true,
      includeObject: true,
    }
  );

  responseToSvg(response.data);
  return response.data;
};

/**
 * string -> svg로 만들고, svg를 html 화면에 출력
 */
const responseToSvg = (resObj) => {
  const outsvg = document.getElementById("outsvg");

  // object을 순회하면서 geojson을 만드는 반복문
  Object.entries(resObj).forEach(([key, value]) => {
    outsvg.innerHTML = value;
    convertGeojson(key);
  });
};

/**
 * svg 객체의 속성을 읽어와서 geojson으로 변환하기 위해
 * viewBox에 대한 설정 및 좌표 기준 값 설정
 * -> svg를 geojson으로 변환
 * 이후 svg 파일을 지도 레이어로 올리는 함수 연속적으로 실행
 */
const convertGeojson = (layerName) => {
  const svg = outsvg.querySelector("svg");
  const box = svg.viewBox.baseVal;
  svg.setAttribute("id", "mysvg");
  svg.setAttribute("width", String(box.width) + "px"); // 가로 설정
  svg.setAttribute("height", String(box.height) + "px"); // 세로 설정

  const center = map.getView().getCenter();
  const [longitude, latitude] = ol.proj.toLonLat(center);

  const mapPxToCm = [
    box.height * storage.getValue("pxRatio"),
    box.width * storage.getValue("pxRatio"),
  ];

  const bound = [
    [
      calculateLat(longitude, latitude, mapPxToCm),
      calculateLon(longitude, latitude, mapPxToCm),
    ],
    [latitude, longitude],
  ];

  const geoJson = svgtogeojson.svgToGeoJson(
    bound,
    document.getElementById("mysvg"),
    10
  );

  svgToMapLayer(geoJson, layerName);

  document.getElementById("outsvg").innerHTML = "";

  document.getElementById("loadingOverlay").classList.add("hidden");
};

/**
 * convertGeojson 함수에서
 * svg를 geojson 형태로 바꾼 fileData를 인자로 받아
 * 지도 상에 띄우는 함수
 * @param {*} fileData
 */
const svgToMapLayer = (fileData, layerName) => {
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

  if (layerName.includes("canvas")) {
    const convasLayer = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(255, 0, 0, 0.8)",
          width: 2,
        }),
        fill: new ol.style.Fill({
          color: "rgba(0, 0, 0, 0)",
        }),
      }),
      zIndex: 0,
      properties: {
        layerType: layerName,
      },
    });

    // map에 레이어 추가하고, vectorLayer 배열에 추가한 레이어 객체 추가
    vectorLayer.push(convasLayer);
    map.addLayer(convasLayer);

    const canvasFeature = features[0].getGeometry();
    const boxLonLat = new ol.proj.toLonLat(canvasFeature.getFirstCoordinate());

    boxLatitude.innerHTML = boxLonLat[1].toFixed(8);
    boxlongitude.innerHTML = boxLonLat[0].toFixed(8);

    storage.storeValue("boxCoordinate", boxLonLat);

    return;
  }

  if (layerName.includes("sections")) {
    const vectorFromSvg = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(255, 255, 255, 0.3)",
          width: 1,
        }),
        fill: new ol.style.Fill({
          color: "rgba(102, 102, 102, 0.4)",
        }),
      }),
      zIndex: 1,
      properties: {
        layerType: layerName,
      },
    });

    // map에 레이어 추가하고, vectorLayer 배열에 추가한 레이어 객체 추가
    vectorLayer.push(vectorFromSvg);
    map.addLayer(vectorFromSvg);

    return;
  }

  if (!layerName.includes("canvas") && !layerName.includes("sections")) {
    const vectorFromSvg = new ol.layer.Vector({
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(255, 255, 255, 0.3)",
          width: 1,
        }),
        fill: new ol.style.Fill({
          color: "rgba(102, 255, 102, 0.5)",
        }),
      }),
      zIndex: 5,
      properties: {
        layerType: layerName,
      },
    });

    // map에 레이어 추가하고, vectorLayer 배열에 추가한 레이어 객체 추가
    vectorLayer.push(vectorFromSvg);
    map.addLayer(vectorFromSvg);
    return;
  }
};

/**
 * 위도와 경도를 넣어서 경도의 값 구하는 공식 (width)
 */
const calculateLon = (lon, lat, mapPxToCm) => {
  const a = 6378137.0; // WGS 84 타원체의 장축 meters
  const b = 6356752.3142; // WGS 84 타원체의 단축 meters

  // 타원체의 이심률의 제곱 계산
  const eSquared = (a ** 2 - b ** 2) / a ** 2;
  // 위도를 라디안 단위로 변환
  const phi = (lat * Math.PI) / 180;

  // 타원체의 수평 반경 (normal radius of curvature) 계산
  const N = a / Math.sqrt(1 - eSquared * Math.sin(phi) ** 2);
  // (box.width * 0.1)m 동쪽으로 이동할 때의 라디안 경도 변화 계산
  const deltaLambda = mapPxToCm[1] / (N * Math.cos(phi));

  // 변화한 경도 값
  const deltaLon = (deltaLambda * 180) / Math.PI;

  // 새로운 경도 반환
  return lon + deltaLon;
};

/**
 * 위도와 경도를 넣어서 위도의 값 구하는 공식 (height)
 */
const calculateLat = (lon, lat, mapPxToCm) => {
  const a = 6378137.0; // WGS 84 타원체의 장축 meters
  const b = 6356752.3142; // WGS 84 타원체의 단축 meters

  // 타원체의 이심률의 제곱 계산
  const eSquared = (a ** 2 - b ** 2) / a ** 2;
  // 주어진 위도 값을 라디안 단위로 변환
  const phi = (lat * Math.PI) / 180;

  // 타원체의 meridional radius of curvature (위도 방향의 반경) 계산
  const M =
    (a * (1 - eSquared)) / Math.pow(1 - eSquared * Math.sin(phi) ** 2, 1.5);

  // (box.height * 0.1)만큼 북쪽으로 이동할 때의 위도 라디안 변화량 계산
  const deltaPhi = mapPxToCm[0] / M;

  // 변화한 위도 값
  const deltaLat = (deltaPhi * 180) / Math.PI;

  return lat + deltaLat;
};
