import axios from "axios";
// const authToken = localStorage.getItem("authToken");
// console.log("authToken", authToken);
export const bearerToken = () => "Bearer " + localStorage.getItem("authToken");
export const getAuthToken = () => localStorage.getItem("authToken");
export const authHeader = getAuthToken ? { Authorization: bearerToken() } : {};

// export const setToken = () => localStorage.setItem("accessToken");

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default axios;
