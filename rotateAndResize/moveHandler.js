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
  }
});

const moveGoogle = (newLat, newLon) => {
  googleMap.setCenter({ lat: newLat, lng: newLon });
};

const moveNaver = (newLat, newLon) => {
  naverMap.setCenter({ y: newLat, _lat: newLat, x: newLon, _lng: newLon });
};
