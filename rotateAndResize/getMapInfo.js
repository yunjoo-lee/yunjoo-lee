const getMapInfo = async () => {
  // // 현재 하드 코딩됨 추후에는 접속 url window.location.href로 받아오기
  const urlObject = new URL(
    "http://localhost:3000/dev?mapId=MP-1iauw5wdscoyt0262"
  );
  //   const urlObject = new URL(window.location.href);

  const queryString = urlObject.searchParams;
  const mapId = queryString.get("mapId");

  // // 현재 Scott 주소로 임시 설정됨
  const response = await axios(
    `http://192.168.2.240:8080/api/georeferencing/groupCode/${mapId}`
  );

  const selectBox = document.getElementById("groupName");

  const defaultOption = document.createElement("option");
  defaultOption.value = 1 / response.data.scaleCm;

  if (response.data.groupCodes.length === 0) {
    defaultOption.innerHTML = "선택할 건물 그룹이 없습니다";
    selectBox.appendChild(defaultOption);
    selectBox.disabled = true;
    return;
  }

  defaultOption.innerHTML = "컨트롤 할 건물 그룹을 선택하세요";
  selectBox.appendChild(defaultOption);

  response.data.groupCodes.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.code;
    option.innerHTML = item.code; // 또는 item.name 등 원하는 값을 사용
    selectBox.appendChild(option);
  });
};

addEventListener("DOMContentLoaded", (event) => {
  getMapInfo();
});
