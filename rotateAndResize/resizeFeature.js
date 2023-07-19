const editInteraction = new ol.interaction.Select({
  condition: ol.events.condition.click, // 더블클릭 이벤트로 선택
});

const selectedFeature = null; // 선택된 feature
const referencePoint = null; // 기준점

document.addEventListener("DOMContentLoaded", () => {
  // Add interaction to the map
  map.addInteraction(editInteraction);

  // 선택된 feature 변경 시 동작할 이벤트 리스너
  editInteraction.on("select", (event) => {
    const selectedFeatures = event.target.getFeatures();

    selectedFeatures.forEach((feature) => {
      // 선택된 feature 처리
      //   console.log("Selected Feature:", feature.getProperties());
    });
  });

  const resizeButton = document.getElementById("resizeButton");
  resizeButton.addEventListener("click", () => {
    const scaleFactorInput = document.getElementById("scaleFactorInput");
    const scaleFactor = parseFloat(scaleFactorInput.value);
    resizeFeature(scaleFactor);
  });
});

const scaleFactorInput = document.getElementById("scaleFactorInput");
scaleFactorInput.addEventListener("input", function () {
  scaleValue = parseFloat(scaleFactorInput.value);
});

const resizeFeature = (scaleFactor) => {
  const selectedFeatures = editInteraction.getFeatures();

  selectedFeatures.forEach((feature) => {
    const geometry = feature.getGeometry();
    // console.log("Geom:", geometry); // 제대로 나옴
    const type = geometry.getType();
    console.log("type:", type); // 제대로 나옴

    if (type === "Polygon") {
      //   const coordinates = geometry.getCoordinates();
      //   console.log(coordinates);

      function customResize(poly, height, width) {
        var newPoly = poly.clone(); //Clone to prevent modifying current polygon points
        var heightRatio = height / newPoly.getBounds().getHeight();
        var widthRatio = width / newPoly.getBounds().getWidth();

        var points = newPoly.components[0].components;
        var center = new OpenLayers.Geometry.Point(
          newPoly.getBounds().getCenterLonLat().lon,
          newPoly.getBounds().getCenterLonLat().lat
        );

        for (var i = 0; i < points.length; i++) {
          var newX = (points[i].x - center.x) * widthRatio + center.x;
          var newY = (points[i].y - center.y) * heightRatio + center.y;
          points[i].move(newX - points[i].x, newY - points[i].y);
        }

        return new OpenLayers.Geometry.Polygon([
          new OpenLayers.Geometry.LinearRing(points),
        ]);
      }
      //   const transformedCoordinates = coordinates.map((coordinate) => {
      //     return coordinate.map((coord) => {
      //       var transformed = ol.proj.transform(coord, "EPSG:3857", "EPSG:4326");
      //       transformed[0] *= scaleFactor;
      //       transformed[1] *= scaleFactor;
      //       return ol.proj.transform(transformed, "EPSG:4326", "EPSG:3857");
      //     });
      //   });

      //   console.log(transformedCoordinates);
      //   geometry.setCoordinates(transformedCoordinates, { type });
      //   //   feature.setStyle(createFeatureStyle(feature)); // 크기 조절 후에 스타일 다시 설정
    }
  });
};

const createFeatureStyle = (feature) => {
  // 스타일 생성
  return new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(255, 255, 255, 0.7)",
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: "#718AE3",
    }),
  });
};
