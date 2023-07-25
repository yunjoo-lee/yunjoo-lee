window.initialize = function () {
  var service = new google.maps.places.PlacesService(
    document.createElement("div")
  );
  var request = {
    query: document.getElementById("searchAddress").value,
    fields: ["name", "geometry"],
  };

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log("Latitude: " + results[0].geometry.location.lat());
      console.log("Longitude: " + results[0].geometry.location.lng());
      console.log(request.query);
    }
  });
};
