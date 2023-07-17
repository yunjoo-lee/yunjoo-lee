import { connectApi } from "./connectApi.js";

const getAllMapList = async () => {
  const url = "https://api.dabeeomaps.com/v2/maps?";
  const djWjrn = await connectApi(url);

  return djWjrn;
};

export { getAllMapList };

const myArray = await getAllMapList();
console.log(myArray.length); // 지도의 갯수 출력 가능;
