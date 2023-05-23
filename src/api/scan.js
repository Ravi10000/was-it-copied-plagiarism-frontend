import api, { authHeader } from "./index";

console.log("authHeader", authHeader);
export const scanText = async (text) =>
  api.post("/scan/text", { text }, { headers: { ...authHeader } });

export const scanFile = async (formData) =>
  api.post("/scan/file", formData, { headers: { ...authHeader } });

export const getMyScans = async (isAdmin = false, skip = 0, limit = 0) =>
  isAdmin
    ? api.get(`/scan/all?skip=${skip}&limit=${limit}`, {
        headers: { ...authHeader },
      })
    : api.get(`/scan?skip=${skip}&limit=${limit}`, {
        headers: { ...authHeader },
      });

export const getScanById = async (id) =>
  api.get(`/scan/${id}`, { headers: { ...authHeader } });

export const getCredits = async () =>
  api.get("/scan/credits", { headers: { ...authHeader } });

export const getUsageHistory = async ({ startDate, endDate }) =>
  api.get(`/scan/history?startDate=${startDate}&endDate=${endDate}`, {
    headers: { ...authHeader },
  });
