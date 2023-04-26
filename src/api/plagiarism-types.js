import api from "./index";

export const fetchAllPlagiarismTypes = () => api.get("/plagiarism-item");

export const editPlagiarismType = (id, formData) =>
  api.put(`/plagiarism-item/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  });
export const deletePlagiarismType = (id) =>
  api.delete(`/plagiarism-item/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  });
