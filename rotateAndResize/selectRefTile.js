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
 * select box가 선택될 때 실행될 함수 정의
 */
const setReferenceMap = async (option) => {
  // // 초기 로딩 시 불러올 지도 설정 (option ? option.id : "초기 선택 지도")
  const selectedOption = option ? option.id : "kakao";

  const buttonList = {
    naver: setNaverMap,
    google: setGoogleMap,
    kakao: setKakaoMap,
  };

  // 'buttonGroup' 내의 모든 버튼에 대해서
  document.querySelectorAll("#buttonGroup button").forEach((button) => {
    // 클릭된 버튼이 아닌 다른 버튼의 투명도를 40%로 설정
    if (button.id !== selectedOption) {
      button.classList.remove("opacity-100");
      button.classList.add("opacity-50");
    } else {
      // 클릭된 버튼의 투명도를 100%로 설정
      button.classList.remove("opacity-50");
      button.classList.add("opacity-100");
    }
  });

  const loadMap = buttonList[selectedOption];

  const latitude = parseFloat(document.getElementById("latitude").innerHTML); // 위도
  const longitude = parseFloat(document.getElementById("longitude").innerHTML); // 경도

  // 부모 요소 찾기
  const containerElement = document.querySelector("#mapContainer");

  // 기존 referMap 요소 삭제
  if (containerElement) {
    containerElement.querySelector("#referMap")?.remove();

    const referMapElement = document.createElement("div");

    referMapElement.id = "referMap";
    referMapElement.style.height = "100%";
    containerElement.append(referMapElement);

    setTimeout(() => {
      loadMap(latitude, longitude);
    }, 100);
  }
};

setReferenceMap();
