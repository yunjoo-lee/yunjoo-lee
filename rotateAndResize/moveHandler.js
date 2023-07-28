map.on("moveend", () => {
  const center = map.getView().getCenter();
  const [newLon, newLat] = ol.proj.toLonLat(center);

  document.getElementById("longitude").setAttribute("value", newLon);
  document.getElementById("latitude").setAttribute("value", newLat);

  const mapSelector = document.getElementById("tileMapSelect");

  switch (mapSelector.value) {
    case "naver":
      moveNaver(newLat, newLon);
      break;

    case "google":
      moveGoogle(newLat, newLon);
      break;

    case "kakao":
      moveKakao(newLat, newLon);
      break;
  }
});

const moveGoogle = (newLat, newLon) => {
  referMap.setCenter({ lat: newLat, lng: newLon });
};

const moveNaver = (newLat, newLon) => {
  referMap.setCenter(new naver.maps.LatLng(newLat, newLon));
};

const moveKakao = (newLat, newLon) => {
  referMap.setCenter(new kakao.maps.LatLng(newLat, newLon));
};
