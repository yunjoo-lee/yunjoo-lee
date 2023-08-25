const pressSaveBtn = async () => {
  const georeferencingData = makeAttribute();
  if (!georeferencingData) {
    return;
  }

  const response = await axios.put(
    `https://ims-develop3.dabeeomaps.com/api/georeferencing`,
    georeferencingData,
    { headers: { "Content-Type": "application/json" } }
  );

  // // 응답 코드에 따라 잘 됐는지 얼럿 띄우기
  if (response.status === 200 && typeof response.data === "number") {
    alert("Georeferencing 정보가 저장되었습니다.");
    return;
  }
};

const makeAttribute = () => {
  if (vectorLayer.length === 0) {
    alert("지도 SVG를 불러와주세요.");
    return;
  }
  storage.storeValue(
    "levelSectionName",
    document.getElementById("bottomSection").value
  );

  if (!storage.getValue("levelSectionName")) {
    alert("바닥판 이름을 입력해주세요");
    return;
  }
  storage.storeValue("widthRatio", scaled ? scaled[0] : 1);
  storage.storeValue("heightRatio", scaled ? scaled[1] : 1);

  const georeferencingData = {
    mapId: storage.getValue("mapId"), //
    groupCode: storage.getValue("groupName"), //
    areaCode: storage.getValue("areaCode"), //
    levelSectionName: storage.getValue("levelSectionName"), // imstudio api에서 받아오기 [하드코딩]
    widthRatio: storage.getValue("widthRatio"), // 완료
    heightRatio: storage.getValue("heightRatio"), // 완료
    rotate: rotated || 0,
    lon: storage.getValue("boxCoordinate")[0],
    lat: storage.getValue("boxCoordinate")[1],
    sourceCrs: map.getProperties().view.getProjection().code_, // osm 지도 기준
  };

  return georeferencingData;
};
