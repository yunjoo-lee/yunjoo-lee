const recordValue = (event) => {
  const inputElement = event.target;
  // input 요소가 포커스될 때 현재 값을 data-prev-value 속성에 저장합니다.
  inputElement.dataset.prevValue = inputElement.value;
};

const storeChangedValue = (event) => {
  const inputElement = event.target;
  const currentValue = inputElement.value;
  const previousValue = inputElement.dataset.prevValue;

  // 포커스 되기 전 값과 포커스 아웃 이후의 값을 비교합니다.
  if (previousValue !== currentValue) {
    const parentRow = inputElement.closest("tr"); // 부모 tr 요소를 찾습니다.

    const cells = parentRow.querySelectorAll("td");

    const idValue = cells[0].textContent.trim();
    const telValue = inputElement.value.replace(/\s+/g, "");

    // changedPoi array에서 poiId와 일치하는 객체를 찾습니다.
    const existingObject = storage
      .getValue("changedPoi")
      .find((item) => item.poiId === idValue);

    if (existingObject) {
      // 만약 해당 객체가 존재한다면, tel 값을 업데이트합니다.
      existingObject.tel = telValue;
      return;
    }

    // 그렇지 않다면, 새 객체를 array에 추가합니다.
    const dataObject = {
      mapId: storage.getValue("mapId"),
      poiId: idValue,
      tel: telValue,
    };

    storage.getValue("changedPoi").push(dataObject);

    return;
  }
};
