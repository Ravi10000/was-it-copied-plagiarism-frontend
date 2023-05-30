import axios from "axios";
const authToken = localStorage.getItem("authToken");
// console.log("authToken", authToken);
export const authHeader = authToken
  ? { Authorization: `Bearer ${authToken}` }
  : {};

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default axios;
