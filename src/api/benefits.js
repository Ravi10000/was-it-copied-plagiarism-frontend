import api from "./index";

export const fetchAllBenefits = () => api.get("/benefit");

export const createNewBenefit = (formData) =>
  api.post("/benefit", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const editBenefit = (id, formData) =>
  api.put(`/benefit/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
