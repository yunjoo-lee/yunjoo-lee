import _ from "lodash";
import { connectApi } from "./connectApi.js";

const transDeployedVer = async (apiUrl, companyName, joinedDate) => {
  const response = await connectApi(apiUrl);

  // 예외 조건: 검색 값이 돌아오지 않을 경우 undefined를 반환
  if (response == null) {
    return;
  }

  const mapVerInfo = {
    companyName,
    joinedDate,
    mapId: response.id,
    objectsSum: _.sumBy(response.floors, "objects.length"),
    nodesSum: _.sumBy(response.floors, "nodes.length"),
    sectionsSum: _.sumBy(response.floors, "sections.length"),
    poisSum: _.sumBy(response.floors, "pois.length"),
    version: response.versionString,
    deployedDate: response.deployedDate,
  };

  return mapVerInfo;
};

export { transDeployedVer };

// const myArray = await transDeployedVer();
// console.log(myArray);
