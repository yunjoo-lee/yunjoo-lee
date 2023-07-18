import _ from "lodash";
// import fs from "fs/promises";
import { readMapInformation } from "./readMapInformation.js";
import { transDeployedVer } from "./transDeployedVer.js";

/**
 * csv에 있는 map id를 순회하며 버전 별로 속성 합계와 배포 날짜를 배열로 만드는 기능
 * @returns map 별 배열 안에 map version 별 배열이 들어간 2차원 배열
 */
const getInfoByVersion = async () => {
  const mapInfoCsv = readMapInformation();

  const arrayElement = [];

  for (const m of mapInfoCsv) {
    const versionDeployed = [];
    const mapId = m.id;
    const companyName = m.company_name;
    const joinedDate = m.created_at;
    let version;

    if (version === undefined) {
      const requestLastest = `https://private-api.dabeeomaps.com/v2/map/${mapId}`;
      const responseLastest = await transDeployedVer(
        requestLastest,
        companyName,
        joinedDate
      );

      // 최신 버전 정보 받아와서 시작 값으로 지정
      version = Number(responseLastest.version) * 10;
      // 최신버전 값을 array에 push
      responseLastest && versionDeployed.push(responseLastest);
    }

    for (let v = version - 1; v >= 10; v--) {
      const verFloat = (v * 0.1).toFixed(1);
      const url = `https://private-api.dabeeomaps.com/v2/map/${mapId}?v=${verFloat}`;

      const response = await transDeployedVer(url, companyName, joinedDate);
      if (response !== undefined) {
        versionDeployed.push(response);
      } else {
        console.log(mapId, verFloat);
      }
    }
    arrayElement.push(versionDeployed);
  }

  return arrayElement;
};

export { getInfoByVersion };

// const myArray = await getInfoByVersion();
// // console.log(myArray);

// const code = `export default ${JSON.stringify(myArray, null, 2)};`;

// (async () => {
//   try {
//     await fs.writeFile(`getMapdeployed.js`, code, "utf-8");
//     console.log("File created successfully.");
//   } catch (error) {
//     console.error("Error creating file:", error);
//   }
// })();
