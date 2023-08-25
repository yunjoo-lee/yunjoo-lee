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

// Handle rotate on first point
const firstPoint = false;
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
  $("#rotateinfo").text((rotated - rotating).toFixed(2));
  // Set angle attribute to be used on style !
  // e.feature.set("angle", startangle - e.angle);
});

interaction.on("scaling", (e) => {
  scaling = [e.scale[0], e.scale[1]];
  $("#scaleinfo").text(
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
  rotated = rotated - rotating;
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

    boxLatitude.innerHTML = boxLonLat[1].toFixed(8);
    boxlongitude.innerHTML = boxLonLat[0].toFixed(8);

    storage.storeValue("boxCoordinate", boxLonLat);
  }
});
