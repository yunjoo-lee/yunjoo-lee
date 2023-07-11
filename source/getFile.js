const getFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = (event) => {
    processFile(event.target.files[0]);
  };
  input.click();
};

const processFile = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    const fileData = reader.result;
    addVectorLayer(fileData);
  };
  reader.readAsText(file);
};

const addVectorLayer = (fileData) => {
  const geojsonFormat = new ol.format.GeoJSON();
  const features = geojsonFormat.readFeatures(fileData);

  // GeoJSON 데이터의 좌표 체계를 3857로 변환
  features.forEach((feature) => {
    const geometry = feature.getGeometry();
    geometry.transform("EPSG:4326", "EPSG:3857");
  });

  const vectorSource = new ol.source.Vector({
    features: features,
  });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "rgba(255, 255, 255, 0.7)",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "rsgba(255,255,255,0.4)",
      }),
    }),
  });

  map.addLayer(vectorLayer);
};
// const vectorLayer = new ol.layer.Vector({
//   source: vectorSource,
//   // style: new ol.style.Style({
//   //   stroke: new ol.style.Stroke({
//   //     color: "rgba(255, 255, 255, 0.7)",
//   //     width: 2,
//   //   }),
//   //   fill: new ol.style.Fill({
//   //     color: "rsgba(255,255,255,0.4)",
//   //   }),
//   // }),
// });

/*

    // JavaScript 파일 (예: script.js)
    document.addEventListener("DOMContentLoaded", function () {
      var map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(), // OSM 타일맵 레이어 추가
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([longitude, latitude]), // 중심 좌표 설정
          zoom: 10, // 초기 줌 레벨 설정
        }),
      });

      // GeoJSON 파일 로드 및 표시
      var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: "path/to/your/geojson/file.geojson",
          format: new ol.format.GeoJSON(),
        }),
      });

      map.addLayer(vectorLayer);
    });

    ol.map.addLayer(vectorLayer);
    // reader.readAsText(file);
  };
};
/*
// JavaScript 파일 (예: script.js)
document.addEventListener("DOMContentLoaded", function () {
  // ...

  // 편집 기능 추가
  var modify = new ol.interaction.Modify({ source: vectorLayer.getSource() });
  map.addInteraction(modify);

  var draw; // 그리기 도구 변수

  // 그리기 시작 이벤트 리스너
  function startDraw(type) {
    draw = new ol.interaction.Draw({
      source: vectorLayer.getSource(),
      type: type,
    });
    map.addInteraction(draw);
  }

  // 그리기 종료 이벤트 리스너
  const endDraw() => {
    map.removeInteraction(draw);
  }

  // 그리기 버튼 클릭 이벤트 처리
  var drawPointBtn = document.getElementById("drawPoint");
  drawPointBtn.addEventListener("click", function () {
    startDraw("Point");
  });

  var drawLineBtn = document.getElementById("drawLine");
  drawLineBtn.addEventListener("click", function () {
    startDraw("LineString");
  });

  var drawPolygonBtn = document.getElementById("drawPolygon");
  drawPolygonBtn.addEventListener("click", function () {
    startDraw("Polygon");
  });

  var endDrawBtn = document.getElementById("endDraw");
  endDrawBtn.addEventListener("click", endDraw);
});
*/

// export { getFile, processFile };
