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
