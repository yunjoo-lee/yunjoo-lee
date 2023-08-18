// 검색 결과 목록을 표출하는 함수입니다
const displayPlaces = (places, removeSpace) => {
  const listEl = document.getElementById("placesList"),
    menuEl = document.getElementById("menu_wrap"),
    fragment = document.createDocumentFragment();

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods(listEl);

  const searchInput = document.getElementById("searchAddress");
  // 여기서 if문으로 결과가 1개 이하일때 리스트 띄우지 말고 바로 이동하도록
  places.forEach((place) => {
    const itemEl = getListItem(place, removeSpace); // 검색 결과 항목 Element를 생성합니다

    // 마커와 검색결과 항목에 클릭 했을때 해당 장소로 이동
    ((placeObject) => {
      itemEl.onmouseover = function () {
        itemEl.style.backgroundColor = "#D3D3D3";
      };
      itemEl.onmouseout = function () {
        itemEl.style.backgroundColor = "";
      };
      itemEl.onclick = function () {
        moveMapOnPoi(placeObject, searchInput);
      };
    })(place);

    fragment.appendChild(itemEl);
  });

  // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;
};

// 검색결과 항목을 Element로 반환하는 함수입니다
const getListItem = (places, removeSpace) => {
  // Show overlay
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  // object 안에 있는 place name을 공백 제거
  const placeName = places.place_name;
  const normalizedplaceName = placeName.replace(/\s+/g, "");

  // 검색 단어와 일치하는 부분을 <span> 태그로 감싸는 작업
  const matchedPlaceName = normalizedplaceName
    .split(removeSpace)
    .join(`<span class="text-blue-800">${removeSpace}</span>`);

  const el = document.createElement("li");
  const itemStr = `<div class="info">${matchedPlaceName}</div>`;

  el.innerHTML = itemStr;
  el.className = "item";

  return el;
};

// 검색결과 검색 목록에서 결과를 선택했을 때, 해당하는 POI로 이동하는 함수
const moveMapOnPoi = async (clickedObject, searchInput) => {
  const overlay = document.getElementById("overlay");

  searchInput.value = clickedObject.place_name;

  // // 어떤 함수를 실행시켜서 data object 하나를 넣으면, 해당 위치로 이동
  await moveMapToResult(clickedObject);

  // Show overlay
  overlay.style.display = "none";
};

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
const removeAllChildNods = (el) => {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
};
