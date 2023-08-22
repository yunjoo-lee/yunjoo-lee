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
  const selectedOption = option.id;

  const latitude = parseFloat(document.getElementById("latitude").innerHTML); // 위도
  const longitude = parseFloat(document.getElementById("longitude").innerHTML); // 경도

  const coor3857 = ol.proj.transform(
    [longitude, latitude],
    "EPSG:4326",
    "EPSG:3857"
  );

  const coorKakao = new kakao.maps.LatLng(latitude, longitude).toCoords();

  const buttonList = {
    naver: `https://map.naver.com/p/?c=${coor3857[0]},${coor3857[1]},17,0,0,0,dh`,
    google: `https://www.google.co.kr/maps/@${latitude},${longitude},17z?hl=ko`,
    kakao: `https://map.kakao.com/?urlX=${coorKakao.getX()}&urlY=${coorKakao.getY()}&level=2`,
  };

  const url = buttonList[selectedOption];
  if (url) {
    window.open(url, "_blank");
  }
};
