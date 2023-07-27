const downloadFile = (e) => {
  // // 수동으로 crs 정보 추가
  const myCrs = {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::3857",
    },
  };

  // // 지도의 레이어를 object 형태의 geojson으로 만든다
  const geoJsonObj = new ol.format.GeoJSON().writeFeaturesObject(
    vectorLayer[0].getSource().getFeatures()
  );
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
