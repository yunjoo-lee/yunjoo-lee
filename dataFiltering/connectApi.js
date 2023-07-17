import axios from "axios";

/**
 * @param url api를 호출할 수 있는 host 주소
 * @returns response array
 * @var token string 형태의 인증서. 10시간마다 갱신 필요
 */
const connectApi = async (url) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ5dW5qb28iLCJvd25lcl9pZCI6IkNMSS1kYWJlZW8iLCJzY29wZSI6WyJ0cnVzdCIsInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2ODk1OTAwMjUsImF1dGhvcml0aWVzIjpbIlJPTEVfTUFOQUdFUiJdLCJqdGkiOiI3NTQxZTE3OS1kY2JjLTRkNzgtYWMxNC0yN2EzOTA2MzdjNzIiLCJjbGllbnRfaWQiOiJyZWZlcmVuY2VfYXBwbGljYXRpb24ifQ.ad3-TzM6A04nYB7mGNS7N2x2z3rjPZAi9xmuRTCazAnopWymYvROTE2RNWgMGJrVtE04brfL0Ssxm7mUBEACqRpC7lXFcKMgw9CGNJ9jXsxli9hyuoLyHlOOb3Qw4QNCjrT3hruRLGbFtSPt58w6-1_uA4qWCZO2jJ-oVV3scdgInH0vZ3HDdrSFosT76cWtbcskPFwE8MNLQsLSavhYEVPHquitaah9vExHhwJu7smo-niPYV58yPbAGifpIt03AmYzs6WaeYL_z0UWF7smM5IQoZUzrGCbo_ntNHDljjg18yCe56MDSyqZqeTUZeh53L2Q6fAi1EAax2dgt-IvNA";

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

// const myurl = "https://api.dabeeomaps.com/v2/maps?";
// const myArray = await connectApi(myurl);
// console.log(myArray); // 지도의 갯수 출력 가능;
