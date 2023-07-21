// Style handles
setHandleStyle();

// Events handlers
var startangle = 0;
var startRadius = 10;
var d = [0, 0];

// Handle rotate on first point
var firstPoint = false;
interaction.on(["select"], (e) => {
  if (firstPoint) {
    interaction.setCenter(
      e.features.getArray()[0].getGeometry().getFirstCoordinate()
    );
  }
});

interaction.on(["rotatestart", "translatestart", "scalestart"], (e) => {
  // Rotation
  startangle = e.feature.get("angle") || 0;
  // radius
  startRadius = e.feature.get("radius") || 10;
  // // Translation: 이동 거리를 구해야할 때 이 옵션 주석 처리 해제
  // d=[0,0];
});
interaction.on("rotating", (e) => {
  $("#rotateinfo").text(
    "rotate: " + ((((e.angle * 180) / Math.PI - 180) % 360) + 180).toFixed(2)
  );
  // Set angle attribute to be used on style !
  e.feature.set("angle", startangle - e.angle);
});
// interaction.on('translating', function (e){
//   d[0]+=e.delta[0];
//   d[1]+=e.delta[1];
//   $('#info').text("translate: "+d[0].toFixed(2)+","+d[1].toFixed(2));
//   if (firstPoint) {
//     interaction.setCenter(e.features.getArray()[0].getGeometry().getFirstCoordinate());
//   }
// });
interaction.on("scaling", (e) => {
  $("#scaleinfo").text(
    "scale: " + e.scale[0].toFixed(2) + "," + e.scale[1].toFixed(2)
  );
  if (firstPoint) {
    interaction.setCenter(
      e.features.getArray()[0].getGeometry().getFirstCoordinate()
    );
  }
  if (e.features.getLength() === 1) {
    const feature = e.features.item(0);
    feature.set("radius", startRadius * Math.abs(e.scale[0]));
  }
});
