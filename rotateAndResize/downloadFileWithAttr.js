/**
 * save 기능만을 하는 함수 구현
 * @returns 필요한 함수
 */
const createStore = () => {
  const data = {};

  /**
   * Store a value by key.
   * @param {string} key - The key under which the value should be stored.
   * @param {*} value - The value to be stored.
   */
  const storeValue = (key, value) => {
    data[key] = value;
  };

  /**
   * Retrieve a value by key.
   * @param {string} key - The key of the value to be retrieved.
   * @return {*} The value associated with the key or undefined if not found.
   */
  const getValue = (key) => {
    return data[key];
  };

  /**
   * Retrieve all stored data.
   * @return {object} The entire storage object.
   */
  const getAllValues = () => {
    return data;
  };

  return {
    storeValue,
    getValue,
    getAllValues,
  };
};

var storage = createStore();

const downloadFileWithAttr = (e) => {
  // 수동으로 crs 정보 추가
  const myCrs = {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::3857",
    },
  };

  const vectorOrder = vectorLayer.length;

  // // 지도의 레이어를 object 형태의 geojson으로 만든다
  const geoJsonArr = vectorLayer[vectorOrder - 1].getSource().getFeatures();

  if (vectorOrder > 1) {
    geoJsonArr.forEach((e) => {
      e.setProperties({
        map_id: storage.getValue("mapId"), //
        group_code: document.getElementById("groupName").value, //
        area_code: storage.getValue("areaCode"), //
        level_section_name: "SECTION", // imstudio api에서 받아오기 [하드코딩]
        width_ratio: scaled[0] || 1, // 완료
        height_ratio: scaled[1] || 1, // 완료
        rotate: rotated || 0,
        source_crs: map.getProperties().view.getProjection().code_, // osm 지도 기준
        lon: document.getElementById("boxlongitude").innerHTML,
        lat: document.getElementById("boxLatitude").innerHTML,
      });
    });
  }

  // // // 지도의 레이어를 object 형태의 geojson으로 만든다
  const geoJsonObj = new ol.format.GeoJSON().writeFeaturesObject(geoJsonArr);
  // // object에 crs 정보를 추가
  geoJsonObj.crs = myCrs;

  // // 파일 정보 설정
  const filename = "converted_file.geojson";
  // 문자열로 변환
  const myJson = JSON.stringify(geoJsonObj);

  // Blob 객체 생성
  const blob = new Blob([myJson], { type: "text/plain" });

  // 바로 다운로드 링크 생성
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // 메모리 해제
  URL.revokeObjectURL(link.href);
};

// /////////////////////////////////////////////////////////////

// // 사용 예제
// storage.storeValue("username", "Alice");
// console.log(storage.getValue("username")); // Alice
// console.log(storage.getAllValues()); // { username: "Alice" }
