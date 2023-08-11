/** Set properties
 */
const setPropertie = (p) => {
  interaction.set(p, $("#" + p).prop("checked"));
  if (!$("#scale").prop("checked")) $("#stretch").prop("disabled", true);
  else $("#stretch").prop("disabled", false);
};

const setAspectRatio = (p) => {
  // if ($("#" + p).prop("checked"))
  //   interaction.set("keepAspectRatio", ol.events.condition.always);
  // else
  interaction.set("keepAspectRatio", (e) => {
    return e.originalEvent.shiftKey;
  });
};

/**
 * interaction 관련 설정
 * layer를 특정 레이어로 제한하여, 고정할 수 있는 레이어 설정
 */
const interaction = new ol.interaction.Transform({
  layers: vectorLayer,
  selection: true,
  enableRotatedTransform: false,
  addCondition: ol.events.condition.shiftKeyOnly,
  hitTolerance: 2,
  translateFeature: true,
  scale: true,
  rotate: true,
  // keepRectangle: ,
  translate: true,
  stretch: false,
});

map.addInteraction(interaction);

// // 드래그영역으로 선택해야할 경우 아래 주석을 해제하면 됩니다.
/** // /////////////////////////////////////////////////////////////////////////

// DragBox 인터랙션 생성
const dragBox = new ol.interaction.DragBox({
  condition: ol.events.condition.platformModifierKeyOnly, // 마우스 드래그 조건을 ctr 키로 변경
});

// //  드래그로 그린 박스 영역 안에 있는 피처를 선택하는 함수
const selectFeaturesInBox = () => {
  // 지도에 아무 레이어도 추가되지 않았을 때 오류 console.log 출력
  if (vectorLayer.length === 0) {
    console.log("선택할 수 있는 레이어가 없습니다.");
    return;
  }

  const extent = dragBox.getGeometry().getExtent(); // 드래그 박스의 영역 가져오기
  vectorLayer.map((layer) =>
    layer.getSource().forEachFeatureIntersectingExtent(extent, (feature) => {
      interaction.select(feature, true);
    })
  );
};

// DragBox 인터랙션의 boxend 이벤트에서 박스 안에 있는 피처 선택 함수 호출
dragBox.on("boxend", selectFeaturesInBox);

// DragBox 인터랙션 활성화
map.addInteraction(dragBox);
*/ // ////////////////////////////////////////////////////////////////////////
