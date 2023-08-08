const downloadFileWithAttr = (e) => {
  // 수동으로 crs 정보 추가
  const myCrs = {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::3857",
    },
  };

  const areaCode = "00000";
  const vectorOrder = vectorLayer.length;

  const canvasLayer = vectorLayer.find((e) => {
    return e.getProperties().layerType === "canvas";
  });

  // // 지도의 레이어를 object 형태의 geojson으로 만든다
  const geoJsonArr = vectorLayer[vectorOrder - 1].getSource().getFeatures();

  geoJsonArr.forEach((e) => {
    e.setProperties({
      map_id: "MP-r1l5pvkoe6p20169", //  mapId, -> imstudio api에서 받아오기
      group_code: document.getElementById("groupName").value, // 완료
      area_code: areaCode || "00000", // 카카오,네이버 지도 api에서 획득 가능
      level_section_name: "SECTION", // imstudio api에서 받아오기
      width_ratio: scaled[0] || 1, // 완료
      height_ratio: scaled[1] || 1, // 완료
      rotate: rotated || 0, // 완료
      source_crs: map.getProperties().view.getProjection().code_, // 완료 (지도 api에서 획득 가능)
      lon: canvasLayer
        .getSource()
        .getFeatures()[0]
        .getGeometry()
        .getFirstCoordinate()[0],
      lat: canvasLayer
        .getSource()
        .getFeatures()[0]
        .getGeometry()
        .getFirstCoordinate()[1],
    });
  });
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
