import axioss from "axios";
import { API_URL as BASE_URL_API } from "../utils/AppUtils";

const axios = axioss.create({
  baseURL: BASE_URL_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

axios.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response;
  }
  // , function (error, response) {
  //   if(error.response.status === 401){
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('role');
  //     window.location = '/'
  //     }
  // }
);

export default axios;
