import axios from "axios";

/**
 * @param url api를 호출할 수 있는 host 주소
 * @returns response array
 * @var token string 형태의 인증서. 10시간마다 갱신 필요
 */
const connectApi = async (url) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ5dW5qb28iLCJvd25lcl9pZCI6IkNMSS1kYWJlZW8iLCJzY29wZSI6WyJ0cnVzdCIsInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2ODk3NjI0MDksImF1dGhvcml0aWVzIjpbIlJPTEVfTUFOQUdFUiJdLCJqdGkiOiJlMDA5NTBmOC01Yjc2LTQwOGMtYmUxMi05MDMzNGY3NGZlOTQiLCJjbGllbnRfaWQiOiJyZWZlcmVuY2VfYXBwbGljYXRpb24ifQ.DWnYfWevvnMASFzkK6CVcSPrdCDwJwacbHZ8x-HjIhvFfvdKIBVdNFgTOOofiM-tlhi05KSPQp4aJFcw1VKPgR8jHXsFu2VP1CQ8B9Ul-5KcOEhms6tLsb4_lCAm-xNceaxfqbrYpJLOo2xoexBSnavo0omv8O3XhO0n9ZlyglR51UWVupVFMeCu9for5Uz9Ct3hBtZyHGbC-EDioKwjTE2E71MSHdryX-emaGcHGpm-xjKyjQWC4CfblnK0QBSBP3dt-FIcf0yXtdm_Jz_Iudhd73tsXxmIrednUrVnA7PFL_15cfM5ek_T9vqGxtFcOphbk3JaSXVdC_dvXTUXpw";

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
