const getPoiList = async (e) => {
  storage.storeValue("changedPoi", []);

  // 이벤트가 발생한 a 태그를 가져옵니다.
  const anchorElement = e.currentTarget;

  // a 태그의 자식 중 id가 'childDiv'인 div 요소를 찾습니다.
  const childDiv = anchorElement.querySelector("#childDiv");

  // div의 innerHTML 값을 가져와 변수에 저장합니다.
  const floorId = childDiv.innerHTML;

  // // 현재 dev서버로 세팅되어있음
  const response = await axios(
    `https://ims-develop3.dabeeomaps.com/api/georeferencing/poi-tel/${storage.getValue(
      "mapId"
    )}/${floorId}`
  );

  // console.log(response.data);
  const tableBody = document.getElementById("tableBody");

  response.data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className = "h-14 text-center border-b";

    const tdPoiId = document.createElement("td");
    tdPoiId.textContent = item.poiId;
    tr.appendChild(tdPoiId);

    const tdPoiName = document.createElement("td");
    tdPoiName.textContent = item.title;
    tr.appendChild(tdPoiName);

    const tdAttribute = document.createElement("td");
    const inputBox = document.createElement("input");
    inputBox.className =
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-7/12";

    inputBox.onfocus = recordValue;
    inputBox.onblur = saveChangedValue;
    if (item.tel === "") {
      inputBox.placeholder = "전화번호를 입력해주세요.";
    } else {
      inputBox.value = item.tel;
    }
    tdAttribute.appendChild(inputBox);
    tr.appendChild(tdAttribute);

    tableBody.appendChild(tr);
  });

  // storage.storeValue("pxRatio", 1 / response.data.scaleCm);

  // const selectBox = document.getElementById("groupName");
  // const defaultOption = document.createElement("option");
  // defaultOption.value = "";

  // if (response.data.groupCodes.length === 0) {
  //   defaultOption.innerHTML = "선택할 건물 그룹이 없습니다";
  //   selectBox.appendChild(defaultOption);
  //   selectBox.disabled = true;
  //   return;
  // }
  // defaultOption.innerHTML = "컨트롤 할 건물 그룹을 선택하세요";
  // selectBox.appendChild(defaultOption);

  // response.data.groupCodes.forEach((item) => {
  //   const option = document.createElement("option");
  //   option.value = item.code;
  //   option.innerHTML = item.code; // 또는 item.name 등 원하는 값을 사용
  //   selectBox.appendChild(option);
  // });
};
