import api, { authHeader } from "./index";

export const scanText = async (text) =>
  api.post(
    "/scan/text",
    { text },
    { headers: { Authorization: bearerToken() } }
  );

export const scanFile = async (formData, setProgress) =>
  api.post("/scan/file", formData, {
    headers: { Authorization: bearerToken() },
    onUploadProgress: (file) => {
      let percentCompleted = Math.round((file.loaded * 100) / file.total);
      console.log({ percentCompleted });
      setProgress(percentCompleted);
    },
  });

export const getMyScans = async (skip = 0, limit = 0) =>
  api.get(`/scan?skip=${skip}&limit=${limit}`, {
    headers: { Authorization: bearerToken() },
  });

export const getAllScans = async (skip = 0, limit = 0) =>
  api.get(`/scan/all?skip=${skip}&limit=${limit}`, {
    headers: { Authorization: bearerToken() },
  });

export const getScanById = async (id) =>
  api.get(`/scan/${id}`, { headers: { Authorization: bearerToken() } });

export const getCredits = async () =>
  api.get("/scan/credits", { headers: { Authorization: bearerToken() } });

export const getUsageHistory = async ({ startDate, endDate }) =>
  api.get(`/scan/history?startDate=${startDate}&endDate=${endDate}`, {
    headers: { Authorization: bearerToken() },
  });
