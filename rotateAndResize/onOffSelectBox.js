// 체크박스 클릭 시 호출될 함수
const updateProperty = (checkboxElement) => {
  // 체크박스에 지정된 속성을 가져옵니다.
  const optionLayer = vectorLayer.find((e) => {
    return e.getProperties().layerType.includes(checkboxElement.value);
  });

  // 객체의 해당 속성을 업데이트하고 화면에 표시합니다.
  optionLayer.setProperties({ visible: checkboxElement.checked });
};
