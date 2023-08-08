// Style handles
setHandleStyle();

// Events handlers
// let startangle = 0;
// let startRadius = 10;
let previousLength = vectorLayer.length;

var rotated, scaled;
let rotating, scaling;

const makeResetValue = () => {
  rotating = 0;
  rotated = 0;
  scaling = [1, 1];
  scaled = [1, 1];
};

// const sumArrayElements = (arr) => {
//   return arr.reduce((sum, current) => sum + current, 0);
// };

// const multiplyArrayElements = (arr) => {
//   return arr.reduce(
//     (product, current) => [product[0] * current[0], product[1] * current[1]],
//     [1, 1]
//   );
// };

// Handle rotate on first point
const firstPoint = false;
interaction.on(["select"], (e) => {
  if (vectorLayer.length > previousLength) {
    makeResetValue();
    // 이전 배열의 길이 업데이트
    previousLength = vectorLayer.length;
  }
  if (firstPoint) {
    interaction.setCenter(
      e.features.getArray()[0].getGeometry().getFirstCoordinate()
    );
  }
});

interaction.on("rotating", (e) => {
  rotating = (((e.angle * 180) / Math.PI - 180) % 360) + 180 || 0;
  $("#rotateinfo").text("rotate: " + (rotated + rotating).toFixed(2));
  // Set angle attribute to be used on style !
  // e.feature.set("angle", startangle - e.angle);
});

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

// // 이동이 끝났을 때 rotated, scaled에 기존 값 저장
interaction.on(["scaleend"], (e) => {
  scaled = [scaling[0] * scaled[0], scaling[1] * scaled[1]];
});

// // 이동이 끝났을 때 rotated, scaled에 기존 값 저장
interaction.on(["rotateend"], (e) => {
  rotated = rotating + rotated;
});
