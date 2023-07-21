map.on("moveend", () => {
  const center = map.getView().getCenter();
  const [newLon, newLat] = ol.proj.toLonLat(center);

  document.getElementById("longitude").setAttribute("value", newLon);
  document.getElementById("latitude").setAttribute("value", newLat);
});
