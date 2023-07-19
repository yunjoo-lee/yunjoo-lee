/** Set properties
 */
const setPropertie = (p) => {
  interaction.set(p, $("#" + p).prop("checked"));
  if (!$("#scale").prop("checked")) $("#stretch").prop("disabled", true);
  else $("#stretch").prop("disabled", false);
};

const setAspectRatio = (p) => {
  if ($("#" + p).prop("checked"))
    interaction.set("keepAspectRatio", ol.events.condition.always);
  else
    interaction.set("keepAspectRatio", (e) => {
      return e.originalEvent.shiftKey;
    });
};

const interaction = new ol.interaction.Transform({
  enableRotatedTransform: false,
  addCondition: ol.events.condition.shiftKeyOnly,
  hitTolerance: 2,
  translateFeature: $("#translateFeature").prop("checked"),
  scale: $("#scale").prop("checked"),
  rotate: $("#rotate").prop("checked"),
  keepAspectRatio: $("#keepAspectRatio").prop("checked")
    ? ol.events.condition.always
    : undefined,
  keepRectangle: false,
  translate: $("#translate").prop("checked"),
  stretch: $("#stretch").prop("checked"),
  // Get scale on points
  pointRadius: (f) => {
    const radius = f.get("radius") || 10;
    return [radius, radius];
  },
});

map.addInteraction(interaction);

// DragBox 인터랙션 생성
const dragBox = new ol.interaction.DragBox({
  condition: ol.events.condition.platformModifierKeyOnly, // 마우스 드래그 조건을 Shift 키로 변경
});

// 박스 안에 있는 피처를 선택하는 함수
const selectFeaturesInBox = () => {
  const extent = dragBox.getGeometry().getExtent(); // 드래그 박스의 영역 가져오기
  vectorLayer
    .getSource()
    .forEachFeatureIntersectingExtent(extent, (feature) => {
      interaction.select(feature, true);
    });
};

// DragBox 인터랙션의 boxend 이벤트에서 박스 안에 있는 피처 선택 함수 호출
dragBox.on("boxend", selectFeaturesInBox);

// DragBox 인터랙션 활성화
map.addInteraction(dragBox);
