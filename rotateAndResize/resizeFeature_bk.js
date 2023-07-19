var editInteraction = new ol.interaction.Select({
  condition: ol.events.condition.doubleClick, // 더블클릭 이벤트로 선택
});

var selectedFeature = null; // 선택된 feature
var referencePoint = null; // 기준점

document.addEventListener("DOMContentLoaded", function () {
  // Add interaction to the map
  map.addInteraction(editInteraction);

  // 선택된 feature 변경 시 동작할 이벤트 리스너
  editInteraction.on("select", function (event) {
    var selectedFeatures = event.target.getFeatures();

    selectedFeatures.forEach(function (feature) {
      // 선택된 feature 처리
      // 예: 선택된 feature의 스타일 변경 등
      console.log("Selected Feature:", feature.getProperties());

      // 더블클릭된 feature에 대한 편집모드 시작
      if (event.selected.length > 0) {
        startEditMode(feature);
      } else {
        // 선택 해제 시 편집모드 종료
        endEditMode();
      }
    });
  });
});

// 편집모드 시작 함수
function startEditMode(feature) {
  // 선택된 feature를 저장
  selectedFeature = feature;

  // 첫 번째 클릭을 기다리는 상태로 변경
  map.on("singleclick", handleFirstClick);
}

// 첫 번째 클릭 이벤트 핸들러
function handleFirstClick(event) {
  // 첫 번째 클릭에서 기준점 선택
  referencePoint = event.coordinate;
  console.log("Reference Point:", referencePoint);

  // 첫 번째 클릭 이벤트 핸들러 제거
  map.un("singleclick", handleFirstClick);

  // 두 번째 클릭을 기다리는 상태로 변경
  map.on("singleclick", handleSecondClick);
}

// 두 번째 클릭 이벤트 핸들러
function handleSecondClick(event) {
  // 두 번째 클릭에서 크기 조정
  var secondPoint = event.coordinate;
  console.log("Second Point:", secondPoint);

  // 선택된 feature의 크기 조정 함수 호출
  resizeFeature(selectedFeature, referencePoint, secondPoint);

  // 편집모드 종료
  endEditMode();
}

// 편집모드 종료 함수
function endEditMode() {
  // 선택된 feature와 기준점 초기화
  selectedFeature = null;
  referencePoint = null;

  // 두 번째 클릭 이벤트 핸들러 제거
  map.un("singleclick", handleSecondClick);
}

// 선택된 feature의 크기 조정 함수
function resizeFeature(feature, referencePoint, secondPoint) {
  if (selectedFeature && referencePoint) {
    var secondPoint = map.getEventCoordinate(event); // 두 번째 클릭한 지점
    var distance = ol.sphere.getDistance(referencePoint, secondPoint); // 거리 계산

    // 크기 조정
    var scaleFactor = 1 + distance * 0.1; // 조정 비율 조정 가능
    resizePolygonFeature(selectedFeature, scaleFactor);

    // // 선택 상태 및 편집 상태 초기화
    // selectedFeature = null;
    // referencePoint = null;
    // selectInteraction.getFeatures().clear();
    map.getInteractions().remove(modifyInteraction);
  }
  console.log("Resizing Feature:", feature.getProperties());
}

/*


////////////////////////////////////////////////////////////////////////////
var selectedFeature = null; // 선택된 feature
var referencePoint = null; // 기준점

// 첫 번째 클릭 이벤트에서 선택된 feature와 기준점 설정
selectInteraction.on("select", function (event) {
  selectedFeature = event.selected[0]; // 첫 번째 선택된 feature
  referencePoint = map.getEventCoordinate(event.mapBrowserEvent); // 클릭한 지점
});
document.addEventListener("DOMContentLoaded", function () {
  // 두 번째 클릭 이벤트에서 크기 조정
  map.on("click", function (event) {
    if (selectedFeature && referencePoint) {
      var secondPoint = map.getEventCoordinate(event); // 두 번째 클릭한 지점
      var distance = ol.sphere.getDistance(referencePoint, secondPoint); // 거리 계산

      // 크기 조정
      var scaleFactor = 1 + distance * 0.1; // 조정 비율 조정 가능
      resizePolygonFeature(selectedFeature, scaleFactor);
    }
  });
});
*/

// var selectedFeature = null; // 선택된 feature
// var referencePoint = null; // 기준점

// // 첫 번째 클릭 이벤트에서 선택된 feature와 기준점 설정
// map.on("click", function (event) {
//   if (!selectedFeature) {
//     // feature 선택
//     var selectedFeatures = selectInteraction.getFeatures();
//     var clickedFeatures = map.getFeaturesAtPixel(event.pixel);

//     if (clickedFeatures && clickedFeatures.length > 0) {
//       selectedFeatures.push(clickedFeatures[0]);
//       selectedFeature = clickedFeatures[0];
//       referencePoint = map.getEventCoordinate(event); // 클릭한 지점

//       // feature 편집을 위한 Modify interaction 추가
//       var modifyInteraction = new ol.interaction.Modify({
//         features: selectedFeatures,
//       });
//       map.addInteraction(modifyInteraction);
//     }
//   }
// });

// // 두 번째 클릭 이벤트에서 크기 조정
// map.on("click", function (event) {
//   if (selectedFeature && referencePoint) {
//     var secondPoint = map.getEventCoordinate(event); // 두 번째 클릭한 지점
//     var distance = ol.sphere.getDistance(referencePoint, secondPoint); // 거리 계산

//     // 크기 조정
//     var scaleFactor = 1 + distance * 0.1; // 조정 비율 조정 가능
//     resizePolygonFeature(selectedFeature, scaleFactor);

//     // 선택 상태 및 편집 상태 초기화
//     selectedFeature = null;
//     referencePoint = null;
//     selectInteraction.getFeatures().clear();
//     map.getInteractions().remove(modifyInteraction);
//   }
// });

// // 선택한 feature의 크기를 조정하는 함수
// function resizePolygonFeature(feature, scaleFactor) {
//   var geometry = feature.getGeometry();
//   var coordinates = geometry.getCoordinates();

//   // 좌표 스케일 조정
//   coordinates = coordinates.map(function (ring) {
//     return ring.map(function (point) {
//       return [
//         referencePoint[0] + (point[0] - referencePoint[0]) * scaleFactor,
//         referencePoint[1] + (point[1] - referencePoint[1]) * scaleFactor,
//       ];
//     });
//   });

//   // 조정된 좌표로 Geometry 업데이트
//   geometry.setCoordinates(coordinates);

//   // 맵을 다시 렌더링
//   map.render();
// }
