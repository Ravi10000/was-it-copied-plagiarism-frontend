import api, { bearerToken } from "./index";

export const fetchAllBenefits = () => api.get("/benefit");

export const createNewBenefit = (formData) =>
  api.post("/benefit", formData, {
    headers: {
      Authorization: bearerToken(),
      "Content-Type": "multipart/form-data",
    },
  });
export const editBenefit = (id, formData) =>
  api.put(`/benefit/${id}`, formData, {
    headers: {
      Authorization: bearerToken(),
      "Content-Type": "multipart/form-data",
    },
  });
