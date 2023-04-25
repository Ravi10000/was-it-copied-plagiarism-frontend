import api from "./index";

export const getHowItWorks = () => api.get("/how-it-works");

export const createHowItWorks = (formData) =>
  api.post(`/how-it-works`, formData);

export const updateHowItWorks = (id, formData) =>
  api.put(`/how-it-works/${id}`, formData);
