const savePoiTel = async () => {
  const saveArray = storage.getValue("changedPoi");
  if (saveArray.length === 0) {
    alert("수정된 전화번호가 없습니다.");
    return;
  }
  const response = await axios.put(
    `https://ims-develop3.dabeeomaps.com/api/georeferencing/poi-tel/${storage.getValue(
      "mapId"
    )}/${storage.getValue("selectFloor")}`,
    saveArray,
    { headers: { "Content-Type": "application/json" } }
  );

  // // 응답 코드에 따라 잘 됐는지 얼럿 띄우기
  if (response.status === 200) {
    alert("Georeferencing 정보가 저장되었습니다.");
    // // POI array 초기화
    storage.storeValue("changedPoi", []);
    return;
  }
};
