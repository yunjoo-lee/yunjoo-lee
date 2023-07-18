import axios from "axios";

/**
 * @param url api를 호출할 수 있는 host 주소
 * @returns response array
 * @var token string 형태의 인증서. 10시간마다 갱신 필요
 */
const connectApi = async (url) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ5dW5qb28iLCJvd25lcl9pZCI6IkNMSS1kYWJlZW8iLCJzY29wZSI6WyJ0cnVzdCIsInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2ODk2NzM5NzgsImF1dGhvcml0aWVzIjpbIlJPTEVfTUFOQUdFUiJdLCJqdGkiOiIzZmU3MDk3Ny02MzFhLTQwNDItYWRjZS03MDliODBmMWJhZmEiLCJjbGllbnRfaWQiOiJyZWZlcmVuY2VfYXBwbGljYXRpb24ifQ.QfejBrxlYs5HoChwxJSezWeqo9kLSAo9OruPO3NyvYJsSPdCFMF9X6sCNt9I0atIv-XEc81X1BMInFH-gOd-h0XKJ0ksc9w7P0Vx5SF-Feo019TGzzdIMaOO8A672CLA6CV-Z3fo6TqVdP4GB0NlfbhNDBsBR6TF8WiDqLp56eARC2JGeDYFSxv_HkZZY6gkppi5bgZYf-jLUs1-88NZcnDd9wsJC0URbuu-lahbZlPsa2K3Ca5Pn0ftGoxVJAyGRuf1nKUbnbaPLyYal2J0kWn3vJWhVrX65hwKjgHBB5BHJdY2H3lMLDaoh6YBY3Ii8O_5ewgzBFj8CI4rPo79xw";

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const reponsedata = axios
    .get(url, { headers: headers })
    .then((response) => {
      const mapList = response.data.payload;

      //   if (typeof mapList === "string") {
      //     return "쿠키가 만료되었습니다.";
      //   } else {
      //     // console.log(mapList);
      //   }
      return mapList;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return reponsedata;
};

export { connectApi };

// const myurl = "https://private-api.dabeeomaps.com/v2/maps?";
// const myArray = await connectApi(myurl);
// console.log(myArray); // 지도의 갯수 출력 가능;
