import api, { authHeader } from "./index";

console.log("authHeader", authHeader);
export const scanText = async (text) =>
  api.post("/scan/text", { text }, { headers: { ...authHeader } });
