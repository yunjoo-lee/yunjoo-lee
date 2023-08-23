const getPoiList = async (e) => {
  // // POI array 초기화
  storage.storeValue("changedPoi", []);

  document.getElementById("loadingOverlay").classList.remove("hidden");

  document
    .querySelectorAll("#floorGroup a")
    .forEach((button) => button.classList.remove("bg-slate-400"));

  const tableBody = document.getElementById("tableBody");

  // // 검색 결과 노출하기 전 초기화
  tableBody.innerHTML = "";

  // 이벤트가 발생한 a 태그를 가져옵니다.
  const anchorElement = e.currentTarget;

  // 클릭된 a 태그에만 배경색을 추가합니다.
  anchorElement.classList.add("bg-slate-400");

  // a 태그의 자식 중 id가 'childDiv'인 div 요소를 찾습니다.
  const childDiv = anchorElement.querySelector("#childDiv");

  // div의 innerHTML 값을 가져와 변수에 저장합니다.
  const floorId = childDiv.innerHTML;
  storage.storeValue("selectFloor", floorId);
  // // 현재 dev서버로 세팅되어있음
  const response = await axios(
    `https://ims-develop3.dabeeomaps.com/api/georeferencing/poi-tel/${storage.getValue(
      "mapId"
    )}/${floorId}`
  );

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
    inputBox.onblur = storeChangedValue;
    if (item.tel === "") {
      inputBox.placeholder = "전화번호를 입력해주세요.";
    } else {
      inputBox.value = item.tel;
    }
    tdAttribute.appendChild(inputBox);
    tr.appendChild(tdAttribute);

    tableBody.appendChild(tr);
  });

  document.getElementById("loadingOverlay").classList.add("hidden");
};
