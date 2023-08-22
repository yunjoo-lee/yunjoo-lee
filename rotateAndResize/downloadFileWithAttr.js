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
  const georeferencingData = makeAttribute();
  if (!georeferencingData) {
    return;
  }

  const selectedLayer = vectorLayer.filter((e) => {
    return e.getProperties().visible === true;
  });

  if (selectedLayer.length === 0) {
    alert("선택한 레이어가 없습니다");
    return;
  }

  selectedLayer.forEach((eachLayer) => {
    // // 파일 정보 설정
    const filename = `${eachLayer.getProperties().layerType}.geojson`;
    // // 지도의 레이어를 object 형태의 geojson으로 만든다
    const geoJsonArr = eachLayer.getSource().getFeatures();

    geoJsonArr.forEach((e) => {
      e.setProperties(georeferencingData);
    });

    // // // 지도의 레이어를 object 형태의 geojson으로 만든다
    const geoJsonObj = new ol.format.GeoJSON().writeFeaturesObject(geoJsonArr);

    // 수동으로 crs 정보 추가
    const crs3857 = {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:EPSG::3857",
      },
    };
    // // object에 crs 정보를 추가
    geoJsonObj.crs = crs3857;

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
  });
};

// /////////////////////////////////////////////////////////////

// // 사용 예제
// storage.storeValue("username", "Alice");
// console.log(storage.getValue("username")); // Alice
// console.log(storage.getAllValues()); // { username: "Alice" }
