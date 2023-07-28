const latitude = parseFloat(document.getElementById("latitude").value); // 위도
const longitude = parseFloat(document.getElementById("longitude").value); // 경도

var naverMap, googleMap;

const setNaverMap = () => {
  const mapOptions = {
    center: new naver.maps.LatLng(latitude, longitude),
    zoom: 17,
  };

  naverMap = new naver.maps.Map("navermap", mapOptions);
};

const setGoogleMap = async () => {
  const infowindow = await new google.maps.InfoWindow();

  googleMap = await new google.maps.Map(document.getElementById("navermap"), {
    center: await new google.maps.LatLng(latitude, longitude),
    zoom: 17,
  });
};

const maplist = { naver: setNaverMap, google: setGoogleMap };
const mapSelector = document.getElementById("tileMapSelect");

const update = () => {
  const loadMap = maplist[mapSelector.value];
  loadMap();
};

mapSelector.addEventListener("change", update);

setGoogleMap();
// setNaverMap();