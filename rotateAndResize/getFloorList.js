const getFloorList = async (e) => {
  const floorList = document.getElementById("floorGroup");
  floorList.innerHTML = "";

  document.getElementById("loadingOverlay").classList.remove("hidden");

  const response = await axios(
    `https://ims-develop3.dabeeomaps.com/api/georeferencing/floors/${storage.getValue(
      "mapId"
    )}`
  );

  response.data.payload.forEach((item) => {
    const aTag = document.createElement("a");
    aTag.className = "flex p-4 hover:cursor-pointer hover:bg-gray-100";
    aTag.onclick = getPoiList;

    const floorName = document.createElement("div");
    floorName.innerHTML = item.floorName;
    aTag.appendChild(floorName);

    const floorId = document.createElement("div");
    floorId.className = "flex-1 text-right";
    floorId.id = "childDiv";
    floorId.innerHTML = item.floorId;
    aTag.appendChild(floorId);

    floorList.appendChild(aTag);
  });

  document.getElementById("loadingOverlay").classList.add("hidden");
};
