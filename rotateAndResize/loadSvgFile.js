/**
 * svg 파일 불러오기 버튼을 클릭하면 실행되는 함수
 */
const openSVGFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "svg";
  input.onchange = function (event) {
    transFile(event.target.files[0]);
  };
  input.click();
};

const transFile = (file) => {
  const reader = new FileReader();
  reader.onload = function () {
    outsvg.innerHTML = reader.result;
  };
  reader.readAsText(file, "euc-kr");
};
