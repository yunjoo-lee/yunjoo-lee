var service;
var qqq;
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
      qqq = results[0];
      map.getView().setCenter(ol.proj.fromLonLat([newLon, newLat]));
    }
  });
};

// var geocoder;
// // var service;
// window.initialize = () => {
//   geocoder = new google.maps.Geocoder();
// };

// const searchCoordinate = () => {
//   var address = document.getElementById('address').value;
//   geocoder.geocode( { 'address': address}, function(results, status) {
//     if (status == 'OK') {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }
// };
