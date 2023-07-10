import api, { bearerToken } from "./index";

export const fetchAllFaqs = () => api.get("/faq");

export const createNewFaq = (formData) =>
  api.post("/faq", formData, {
    headers: {
      Authorization: bearerToken(),
      "Content-Type": "application/json",
    },
  });
export const editFaq = (id, formData) =>
  api.put(`/faq/${id}`, formData, {
    headers: {
      Authorization: bearerToken(),
      "Content-Type": "application/json",
    },
  });
export const deleteFaq = (id) =>
  api.delete(`/faq/${id}`, {
    headers: {
      Authorization: bearerToken(),
    },
  });
