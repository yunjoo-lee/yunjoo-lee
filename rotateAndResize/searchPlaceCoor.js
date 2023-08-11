var areaCode = "00000"; // 지역코드를 담을 변수 선언

/**
 * kakaAPI를 사용해 검색한 위치의 위경도 값을 받아오는 함수
 * @param {string} keyword 검색할 장소 명칭
 * @returns 장소에 대한 결과의 Object
 */
const placesSearch = (keyword) => {
  const placeApi = new kakao.maps.services.Places();

  return new Promise((resolve, reject) => {
    placeApi.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(data[0]);
      } else {
        reject(new Error("Failed to get address name"));
      }
    });
  });
};

/**
 * kakaAPI를 사용해 검색한 위치의 행정 정보를 받아오는 함수
 * @param {number} lon 경도 (124~130)
 * @param {number} lat 위도 (35~37)
 * @returns 장소에 대한 결과의 Object
 */
const getAddressName = (lon, lat) => {
  const geocoderApi = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoderApi.coord2RegionCode(lon, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result[0]);
      } else {
        reject(new Error("Failed to get address name"));
      }
    });
  });
};

/**
 * Kakao api를 사용해 받아온 결과를 지도에 반영하고, 저장하는 함수
 * html에서 searchAddress 버튼 누르면 실행
 */
const searchPlaceToCoor = async () => {
  // 장소 검색할 키워드를 html에서 받아옵니다
  const keyword = document.getElementById("searchAddress").value;

  // // 참조맵이 구글로 설정되어 있고, 검색어가 영어로만 이루어져 있다면 구글맵에서 검색
  if (mapSelector.value === "google" && !/[\uAC00-\uD7A3]/g.test(keyword)) {
    searchGoogleMap(keyword);
    return;
  }

  try {
    const placeResult = await placesSearch(keyword);
    const coorX = placeResult.x;
    const coorY = placeResult.y;

    // 받아온 결과로 지도 center 이동
    map.getView().setCenter(ol.proj.fromLonLat([coorX, coorY]));
    // 받아온 결과로 행정동 위치 검색
    const coordResult = await getAddressName(coorX, coorY);
    // 행정코드를 var areaCode에 저장
    areaCode = coordResult.code.substring(0, 5);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const searchGoogleMap = (keyword) => {
  const service = new google.maps.places.PlacesService(referMap);
  const request = {
    query: keyword,
    fields: [
      "name",
      "geometry",
      "business_status",
      "formatted_address",
      "place_id",
      "plus_code",
      "types",
    ],
  };

  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const newLat = results[0].geometry.location.lat();
      const newLon = results[0].geometry.location.lng();

      map.getView().setCenter(ol.proj.fromLonLat([newLon, newLat]));
    }
  });
};
