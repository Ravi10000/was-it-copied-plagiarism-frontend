import api, { authHeader } from "./index";

console.log("authHeader", authHeader);
export const scanText = async (text) =>
  api.post("/scan/text", { text }, { headers: { ...authHeader } });

export const scanFile = async (formData) =>
  api.post("/scan/file", formData, { headers: { ...authHeader } });

export const getMyScans = async (isAdmin) =>
  isAdmin
    ? api.get("/scan/all", { headers: { ...authHeader } })
    : api.get("/scan", { headers: { ...authHeader } });

// export const getAllScans = async () =>
//   api.get("/scan/all", { headers: { ...authHeader } });
