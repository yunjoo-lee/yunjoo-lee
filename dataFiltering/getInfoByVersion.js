import _ from "lodash";
import fs from "fs/promises";
import { getMapInformation } from "./getMapInformation.js";
// import { asyncFunction } from "./asynFunction.js";
import { connectApi } from "./connectApi.js";

const getInfoByVersion = async () => {
  const mapInfoCsv = getMapInformation();

  const temp = mapInfoCsv.slice(12, 25);

  const arrayElement = [];

  for (const letter of temp) {
    const tempArray = [];
    const mapId = letter.id;
    const requestLastest = `https://private-api.dabeeomaps.com/v2/map/${mapId}`;
    const responseLastest = await connectApi(requestLastest);
    if (responseLastest !== null) {
      const version = responseLastest.version;
      const dlfeksdlatl = {
        mapId: responseLastest.id,
        objectsSum: _.sumBy(responseLastest.floors, "objects.length"),
        nodesSum: _.sumBy(responseLastest.floors, "nodes.length"),
        sectionsSum: _.sumBy(responseLastest.floors, "sections.length"),
        poisSum: _.sumBy(responseLastest.floors, "pois.length"),
        version: responseLastest.versionString,
        deployed_date: responseLastest.deployedDate,
      };

      tempArray.push(dlfeksdlatl);
      for (let v = version - 1; v >= 10; v--) {
        const verFloat = (v * 0.1).toFixed(1);
        const url = `https://private-api.dabeeomaps.com/v2/map/${mapId}?v=${verFloat}`;
        try {
          const response = await connectApi(url);

          const eachVer = {
            mapId: response.id,
            objectsSum: _.sumBy(response.floors, "objects.length"),
            nodesSum: _.sumBy(response.floors, "nodes.length"),
            sectionsSum: _.sumBy(response.floors, "sections.length"),
            poisSum: _.sumBy(response.floors, "pois.length"),
            version: response.versionString,
            deployed_date: response.deployedDate,
          };

          tempArray.push(eachVer);

          console.log(verFloat);
        } catch (error) {
          console.log(mapId, verFloat);
        }
      }
      arrayElement.push(tempArray);
    }
  }

  return arrayElement;
};

export { getInfoByVersion };

const myArray = await getInfoByVersion();
// console.log(myArray);

const code = `export default ${JSON.stringify(myArray, null, 2)};`;

(async () => {
  try {
    await fs.writeFile(`getMapdeployed.js`, code, "utf-8");
    console.log("File created successfully.");
  } catch (error) {
    console.error("Error creating file:", error);
  }
})();
