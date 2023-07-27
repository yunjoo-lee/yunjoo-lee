// Style handles
setHandleStyle();

// Events handlers
// let startangle = 0;
// let startRadius = 10;
let previousLength = vectorLayer.length;

let rotating = 0;
let rotated = 0;
let scaled = [1, 1];
let scaling = [1, 1];

// Handle rotate on first point
const firstPoint = false;
interaction.on(["select"], (e) => {
  if (vectorLayer.length > previousLength) {
    rotating = 0;
    rotated = 0;
    scaled = [1, 1];
    scaling = [1, 1];
    // 이전 배열의 길이 업데이트
    previousLength = vectorLayer.length;
  }
  if (firstPoint) {
    interaction.setCenter(
      e.features.getArray()[0].getGeometry().getFirstCoordinate()
    );
  }
});

interaction.on(["rotatestart", "translatestart", "scalestart"], (e) => {
  // Rotation
  // startangle = e.feature.get("angle") || 0;
  // radius
  // startRadius = e.feature.get("radius") || 10;
  // // Translation: 이동 거리를 구해야할 때 이 옵션 주석 처리 해제
  // d=[0,0];
});
interaction.on("rotating", (e) => {
  rotating = (((e.angle * 180) / Math.PI - 180) % 360) + 180 || 0;
  $("#rotateinfo").text("rotate: " + (rotated + rotating).toFixed(2));
  // Set angle attribute to be used on style !
  // e.feature.set("angle", startangle - e.angle);
});
interaction.on(["rotateend", "translateend", "scaleend"], (e) => {
  rotated = rotating + rotated;
  scaled = [scaling[0] * scaled[0], scaling[1] * scaled[1]];
});

// "scale: " + e.scale[0].toFixed(2) + "," + e.scale[1].toFixed(2)
interaction.on("scaling", (e) => {
  scaling = [e.scale[0], e.scale[1]];
  $("#scaleinfo").text(
    "scale: " +
      (scaling[0] * scaled[0]).toFixed(2) +
      "," +
      (scaling[1] * scaled[1]).toFixed(2)
  );
  if (firstPoint) {
    interaction.setCenter(
      e.features.getArray()[0].getGeometry().getFirstCoordinate()
    );
  }
  // if (e.features.getLength() === 1) {
  //   const feature = e.features.item(0);
  // feature.set("radius", startRadius * Math.abs(e.scale[0]));
  // }
});
