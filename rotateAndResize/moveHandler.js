addEventListener("DOMContentLoaded", (event) => {
  map.on("moveend", () => {
    const center = map.getView().getCenter();
    const [newLon, newLat] = ol.proj.toLonLat(center);

    document.getElementById("longitude").innerHTML = newLon.toFixed(8);
    document.getElementById("latitude").innerHTML = newLat.toFixed(8);

    // const selectedBtn = document.querySelector(
    //   "#buttonGroup button.opacity-100"
    // );

    // switch (selectedBtn.id) {
    //   case "naver":
    //     referMap.setCenter(new naver.maps.LatLng(newLat, newLon));
    //     break;

    //   case "google":
    //     referMap.setCenter(new google.maps.LatLng(newLat, newLon));
    //     break;

    //   case "kakao":
    //     referMap.setCenter(new kakao.maps.LatLng(newLat, newLon));
    //     break;
    // }
  });
});
