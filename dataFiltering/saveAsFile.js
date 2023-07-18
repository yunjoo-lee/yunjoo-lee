import ExcelJS from "exceljs";
import { getInfoByVersion } from "./getInfoByVersion.js";
import exportedFile from "./fileMapDeployed.js";

// // 만들어진 배열을 excel 형태로 만들고 export
const exportToExcel = async () => {
  // // api에서 직접 받아오기
  // const allMapList = await getInfoByVersion();
  const allMapList = exportedFile;
  const flatMap = allMapList.flat();

  // 배열의 각 객체에 대해 작업 수행
  const offsetMinutes = 9 * 60; // GMT+9 시간을 나타내는 분수 (9시간 = 540 분)

  flatMap.forEach((obj) => {
    const oldDeployDate = new Date(obj.deployedDate); // 날짜 객체 생성
    oldDeployDate.setMinutes(oldDeployDate.getMinutes() + offsetMinutes); // GMT+9 더하기

    const formatDateTime = oldDeployDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // 원하는 형식으로 변환
    obj.deployedDate = formatDateTime; // 새로운 키-값 쌍으로 저장

    const oldjoinedDate = obj.joinedDate.split(" ");
    const newjoinedDate = oldjoinedDate[0];
    obj.joinedDate = newjoinedDate;
  });

  // // 배열의 속성명 중 사용할 column의 명칭을 object로 지정
  const columnName = {
    companyName: "이용 고객",
    joinedDate: "회원 가입 날짜",
    mapId: "map id",
    version: "배포 버전",
    objectsSum: "object 수",
    nodesSum: "node 수",
    sectionsSum: "section 수",
    poisSum: "poi 수",
    deployedDate: "배포 날짜",
  };

  // console.log(typeof flatMap[50].joinedDate);

  // workbook(엑셀 파일 하나를 구성하는 여러 시트로 이루어진 단위) 생성
  const workbook = new ExcelJS.Workbook();

  // sheet 생성
  const worksheet = workbook.addWorksheet("map 사용량");

  worksheet.columns = Object.keys(columnName).map((e) => ({
    key: e, // // header : 엑셀의 컬럼명으로 사용될 이름
    header: columnName[e], // key : array와 header를 매치할 key
    width: e.includes("Sum") || e === "version" ? 10 : 20, // // 넓이-> 이름일 경우 25, 나머지는 10
  }));

  const headerStyle = {
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "DFECF0" },
    },
    border: {
      top: { style: "thin", color: { argb: "BFBFBF" } },
      left: { style: "thin", color: { argb: "BFBFBF" } },
      bottom: { style: "thin", color: { argb: "BFBFBF" } },
      right: { style: "thin", color: { argb: "BFBFBF" } },
    },
    font: { bold: true, size: 11 },
    alignment: { horizontal: "center" },
  };

  worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
    cell.style = headerStyle;
  });

  // 두 번째 줄부터 데이터 행들을 한꺼번에 입력
  worksheet.insertRows(2, flatMap);
  /*
  // // 사용된 컬럼에 대한 설명 넣기
  worksheet.spliceRows(1, 0, []);
  // 글 색상, 크기 추가하여 글 넣기
  worksheet.mergeCells("A1:H1");
  worksheet.getCell("A1").value = {
    richText: [
      {
        text: `Slack 사용 현황 (${definedVar.startDate}~${definedVar.endDate})`,
        font: { size: 14, color: { argb: "933634" }, bold: true },
      },
    ],
  };
  worksheet.getCell("A1").alignment = { horizontal: "center" };

  // // 엑셀에 추가할 설명
  const notes = [
    `* 기준 체널: 슬랙 채널 중 전체 공개된 'all' 채널`,
    `* 메세지: 채널에 생성된 메인 쓰레드`,
    `* 답글: 쓰레드에 달린 답글 (1개의 쓰레드에 한 개만 카운트)`,
    `* 반응: 쓰레드에 달린 이모지 (1개의 쓰레드에 한 개만 카운트)`,
    `* 변환 합계: 각 활동량에 가중치를 부여하여 합산한 값 (가중치 = 활동량 합계 최대값/다른 활동량 합계)`,
  ];

  // 원하는 위치에 설명 내용 삽입
  notes.forEach((value, index) => {
    const startColumn = "J"; // // 시작하는 열의 열번호
    const startRow = index + 2; // //  시작하는 셀의 행번호
    const cell = worksheet.getCell(`${startColumn}${startRow}`); // //  시작하는 셀을 'J2'로 고정
    cell.value = value;
  });


*/
  /**
 * 참고를 위한 명령어 정리
 * worksheet.getCell('A1').value = '엑셀 특정 셀에 값 넣기'; // // 각 용어에 대한 설명 넣기
 * worksheet.getCell('A2').value = {
    richText: [{ text: '글 색상과 크기 추가하여 값 넣기', font: { size: 15, color: { argb: 'A52A2A' } } }],
  }; // 글 색상, 크기 추가하여 글 넣기
 */

  // // 파일명 설정
  const filename = "sample_export";

  // // 파일 저장
  workbook.xlsx.writeFile(`./${filename}.xlsx`).then(function () {
    console.log(`${filename} -- 파일 저장 완료`);
  });
};

// // 함수 export
export { exportToExcel };

// // async로 예약된 함수 실행
exportToExcel();

// // 개발중에만 사용
// const myArray = exportToExcel();
// myArray.then(res => console.log(res));
