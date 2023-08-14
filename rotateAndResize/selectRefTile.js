var referMap;

/**
 * 위경도값을 변수로 받아 네이버맵 로드
 */
const setNaverMap = async (latitude, longitude) => {
  referMap = new naver.maps.Map("referMap", {
    center: new naver.maps.LatLng(latitude, longitude),
    zoom: 17,
  });
};

/**
 * 위경도값을 변수로 받아 구글맵 로드
 */
const setGoogleMap = async (latitude, longitude) => {
  referMap = new google.maps.Map(document.getElementById("referMap"), {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 17,
  });
};

/**
 * 위경도값을 변수로 받아 카카오맵 로드
 */
const setKakaoMap = async (latitude, longitude) => {
  const container = document.getElementById("referMap"); //지도를 담을 영역의 DOM 레퍼런스
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도) (낮을 수록 확대한 값, 높을 수록 축소한 값)
  };

  referMap = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
};

/**
 * select box의 value와 함수 매치
 */
const maplist = {
  naver: setNaverMap,
  google: setGoogleMap,
  kakao: setKakaoMap,
};
const mapSelector = document.getElementById("tileMapSelect");

/**
 * select box가 선택될 때 실행될 함수 정의
 */
const setReferenceMap = () => {
  console.log("실행됨?? 1");
  const latitude = parseFloat(document.getElementById("latitude").innerHTML); // 위도
  const longitude = parseFloat(document.getElementById("longitude").innerHTML); // 경도

  const loadMap = maplist[mapSelector.value];

  console.log("실행됨2");
  // 부모 요소 찾기
  const parentCont = document.querySelector(".mapContainer");
  // 기존 referMap 요소 찾기
  const childCont = document.querySelector("#referMap");

  console.log("실행됨3");
  // // 기존 referMap 요소 삭제
  // if (childCont) {
  //   console.log("if 문 실행됨4");
  //   parentCont.removeChild(childCont);
  //   const referMapContainer = document.createElement("div");
  //   // 생성된 요소에 id 설정
  //   referMapContainer.id = "referMap";
  //   document.querySelector(".mapContainer").prepend(referMapContainer);
  // }
  console.log("실행됨5");
  loadMap(latitude, longitude);
};

/**
 * 셀렉트 박스의 선택이 바뀔 때 마다 지도 불러오는 함수 실행
 */
mapSelector.addEventListener("change", setReferenceMap);

/**
 * 기본값으로 선택된 함수 실행
 */
setReferenceMap();
