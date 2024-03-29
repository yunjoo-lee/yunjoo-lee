map.on("moveend", () => {
  const center = map.getView().getCenter();
  const [newLon, newLat] = ol.proj.toLonLat(center);

  document.getElementById("longitude").innerHTML = newLon;
  document.getElementById("latitude").innerHTML = newLat;

  const mapSelector = document.getElementById("tileMapSelect");

  switch (mapSelector.value) {
    case "naver":
      referMap.setCenter(new naver.maps.LatLng(newLat, newLon));
      break;

    case "google":
      referMap.setCenter(new google.maps.LatLng(newLat, newLon));
      break;

    case "kakao":
      referMap.setCenter(new kakao.maps.LatLng(newLat, newLon));
      break;
  }
});
