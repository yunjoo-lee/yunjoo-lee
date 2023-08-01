// Style handles
setHandleStyle();

// Events handlers
// let startangle = 0;
// let startRadius = 10;
let previousLength = vectorLayer.length;

let rotatedElement, scaledElement;

var rotateArray, scaleArray;

const makeResetValue = () => {
  rotatedElement = 0;
  scaledElement = [1, 1];

  rotateArray = [rotatedElement];
  scaleArray = [scaledElement];
};

const sumArrayElements = (arr) => {
  return arr.reduce((sum, current) => sum + current, 0);
};

const multiplyArrayElements = (arr) => {
  return arr.reduce(
    (product, current) => [product[0] * current[0], product[1] * current[1]],
    [1, 1]
  );
};

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

interaction.on(["rotatestart", "translatestart", "scalestart"], (e) => {
  // Rotation
  // startangle = e.feature.get("angle") || 0;
  // radius
  // startRadius = e.feature.get("radius") || 10;
  // // Translation: 이동 거리를 구해야할 때 이 옵션 주석 처리 해제
  // d=[0,0];
});

interaction.on("rotating", (e) => {
  rotatedElement = (((e.angle * 180) / Math.PI - 180) % 360) + 180;
  $("#rotateinfo").text(
    "rotate: " + (sumArrayElements(rotateArray) + rotatedElement).toFixed(2)
  );
  // Set angle attribute to be used on style !
  // e.feature.set("angle", startangle - e.angle);
});

interaction.on("scaling", (e) => {
  scaledElement = [e.scale[0], e.scale[1]];
  $("#scaleinfo").text(
    "scale: " +
      (multiplyArrayElements(scaleArray)[0] * scaledElement[0]).toFixed(2) +
      " , " +
      (multiplyArrayElements(scaleArray)[1] * scaledElement[1]).toFixed(2)
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

interaction.on(["rotateend", "translateend", "scaleend"], (e) => {
  rotateArray.push(rotatedElement);
  scaleArray.push(scaledElement);
});
