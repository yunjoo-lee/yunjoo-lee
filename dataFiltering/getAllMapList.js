import { connectApi } from "./connectApi.js";

const getAllMapList = async () => {
  const url = "https://private-api.dabeeomaps.com/v2/maps?";
  const allMapRes = await connectApi(url);

  return allMapRes;
};

export { getAllMapList };

// const myArray = await getAllMapList();
// console.log(myArray);
