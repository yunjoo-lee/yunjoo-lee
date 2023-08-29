// Style handles
setHandleStyle();

let previousLength = vectorLayer.length;

let rotated, scaled;
let rotating, scaling;

const makeResetValue = () => {
  rotating = 0;
  rotated = storage.getValue("rotate") || 0;
  scaling = [1, 1];
  scaled = [
    storage.getValue("widthRatio") || 1,
    storage.getValue("heightRatio") || 1,
  ];

  $("#rotateinfo").text(rotated.toFixed(2));
  $("#scaleinfo").text(scaled[0].toFixed(2) + "," + scaled[1].toFixed(2));
};

map.on("moveend", () => {
  const center = map.getView().getCenter();
  const [newLon, newLat] = ol.proj.toLonLat(center);

  document.getElementById("longitude").innerHTML = newLon.toFixed(8);
  document.getElementById("latitude").innerHTML = newLat.toFixed(8);
});

interaction.on("select", (e) => {
  if (vectorLayer.length > previousLength) {
    makeResetValue();
    // 이전 배열의 길이 업데이트
    previousLength = vectorLayer.length;
  }

  if (e.features.getArray().length === 1) {
    const allFeatures = vectorLayer
      .map((item) => item.getSource().getFeatures())
      .flat();
    interaction.setSelection(allFeatures);
  }
});

interaction.on("rotating", (e) => {
  rotating = (((e.angle * 180) / Math.PI - 180) % 360) + 180 || 0;
  $("#rotateinfo").text(
    ((rotated - rotating) % 360 >= 0
      ? (rotated - rotating) % 360
      : ((rotated - rotating) % 360) + 360
    ).toFixed(2)
  );
});

interaction.on("scaling", (e) => {
  if (compareAngles(rotated, rotated - rotating)) {
    scaling = [e.scale[0], e.scale[1]];
  } else {
    scaling = [e.scale[1], e.scale[0]];
  }

  $("#scaleinfo").text(
    (scaling[0] * scaled[0]).toFixed(2) + // 캔버스 기준 width
      "," +
      (scaling[1] * scaled[1]).toFixed(2) // 캔버스 기준 height
  );
});

// // 이동이 끝났을 때 rotated, scaled에 기존 값 저장
interaction.on("scaleend", (e) => {
  scaled = [scaling[0] * scaled[0], scaling[1] * scaled[1]];
});

// // 이동이 끝났을 때 rotated, scaled에 기존 값 저장
interaction.on("rotateend", (e) => {
  rotated = (rotated - rotating) % 360;
  if (rotated < 0) rotated += 360;
});

// // edit이 끝났을 때 좌상단의 좌표값 수정
interaction.on(["rotateend", "translateend", "scaleend"], (e) => {
  const canvasLayer = vectorLayer.find((e) => {
    return e.getProperties().layerType.includes("canvas");
  });

  if (canvasLayer) {
    const canvasFeature = canvasLayer
      .getSource()
      .getFeatures()[0]
      .getGeometry();
    const boxLonLat = new ol.proj.toLonLat(canvasFeature.getFirstCoordinate());
    const boxLonLat2 = new ol.proj.toLonLat(
      canvasFeature.getCoordinates()[0][2]
    );

    boxLatitude.innerHTML = boxLonLat[1].toFixed(8);
    boxlongitude.innerHTML = boxLonLat[0].toFixed(8);

    storage.storeValue("topLeftCoor", boxLonLat);
    storage.storeValue("bottomRightCoor", boxLonLat2);
  }
});

/**
 * 두 개의 각도를 받아, 각도가 특정 범위에 속하는지에 대한 논리곱을 구하는 함수
 * @param {*} angle1 -180~180도
 * @param {*} angle2 -180~180도
 * @returns true/false
 */
const compareAngles = (angle1, angle2) => {
  const isTrueRange = (angle) => angle % 90 < 45;

  const angle1Result = isTrueRange(angle1);
  const angle2Result = isTrueRange(angle2);

  if (angle1 === angle2 && rotating === 0) {
    return angle1Result;
  }
  if (angle1Result === angle2Result) {
    return true;
  }
  if (!angle1Result === angle2Result) {
    return false;
  }
};
