// const vectorOrder = vectorLayer.length;

// // // 지도의 레이어를 object 형태의 geojson으로 만든다
// const geoJsonArr = vectorLayer[vectorOrder - 1].getSource().getFeatures();

const pressSaveBtn = () => {
  const georeferencingData = {
    map_id: storage.getValue("mapId"), //
    group_code: storage.getValue("groupName"), //
    area_code: storage.getValue("areaCode"), //
    level_section_name: document.getElementById("bottomSection").value, // imstudio api에서 받아오기 [하드코딩]
    width_ratio: scaled ? scaled[0] : 1, // 완료
    height_ratio: scaled ? scaled[1] : 1, // 완료
    rotate: rotated || 0,
    source_crs: map.getProperties().view.getProjection().code_, // osm 지도 기준
    lon: document.getElementById("boxlongitude").innerHTML,
    lat: document.getElementById("boxLatitude").innerHTML,
  };

  console.log(georeferencingData);
};
