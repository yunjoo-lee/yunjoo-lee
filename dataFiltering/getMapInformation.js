import fs from "fs";
import { fileURLToPath } from "url";

// // 파일 경로 변수 설정
const dirname = fileURLToPath(new URL(".", import.meta.url));

// // csv를 텍스트로 읽어오기
const csv_string = fs.readFileSync(
  dirname.concat("studio_mapinfo.csv"),
  "utf-8"
);

// // csv 불러와서 json array로 반환하는 함수
const getMapInformation = () => {
  console.log("read CSV");
  const rows = csv_string.split("\n");
  const readCsvFile = [];

  const header = rows[0].split(",");

  for (let i = 1; i < rows.length; i++) {
    let obj = {};
    let row = rows[i].split(",");
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = row[j];
    }
    readCsvFile.push(obj);
  }

  return readCsvFile;
};

export { getMapInformation };

// const myArray = getMapInformation();
// console.log(myArray);

export { getMapInformation };
