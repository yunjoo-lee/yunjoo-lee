var service;
window.initialize = () => {
  service = new google.maps.places.PlacesService(document.createElement("div"));
};

const searchCoordinate = () => {
  const request = {
    query: document.getElementById("searchAddress").value,
    fields: [
      "name",
      "geometry",
      "business_status",
      "formatted_address",
      "place_id",
      "plus_code",
      "types",
    ],
  };

  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const newLat = results[0].geometry.location.lat();
      const newLon = results[0].geometry.location.lng();

      map.getView().setCenter(ol.proj.fromLonLat([newLon, newLat]));
    }
  });
};
