var referMap;

let latitude = parseFloat(document.getElementById("latitude").value); // 위도
let longitude = parseFloat(document.getElementById("longitude").value); // 경도

const setNaverMap = (latitude, longitude) => {
  //   const mapOptions = ;

  referMap = new naver.maps.Map("referMap", {
    center: new naver.maps.LatLng(latitude, longitude),
    zoom: 17,
  });
};

const setGoogleMap = async (latitude, longitude) => {
  //   const infowindow = await new google.maps.InfoWindow();

  referMap = await new google.maps.Map(document.getElementById("referMap"), {
    center: await new google.maps.LatLng(latitude, longitude),
    zoom: 17,
  });
};

const setKakaoMap = (latitude, longitude) => {
  const container = document.getElementById("referMap"); //지도를 담을 영역의 DOM 레퍼런스
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도) (낮을 수록 확대한 값, 높을 수록 축소한 값)
  };

  referMap = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
};

const maplist = {
  naver: setNaverMap,
  google: setGoogleMap,
  kakao: setKakaoMap,
};
const mapSelector = document.getElementById("tileMapSelect");

const update = () => {
  latitude = parseFloat(document.getElementById("latitude").value); // 위도
  longitude = parseFloat(document.getElementById("longitude").value); // 경도

  const loadMap = maplist[mapSelector.value];

  loadMap(latitude, longitude);
};

mapSelector.addEventListener("change", update);

// setGoogleMap();
// setNaverMap();
setKakaoMap(latitude, longitude);
