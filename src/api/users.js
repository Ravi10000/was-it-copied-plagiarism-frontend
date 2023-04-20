import api from "./index";

export const fetchAllUsers = () =>
  api.get("/users", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  });
export const fetchAllAdmins = () =>
  api.get("/users/admins", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  });

export const signup = (formData) =>
  api.post("/users", formData, {
    headers: { "Content-Type": "application/json" },
  });

export const signin = (formData) =>
  api.patch("/users", formData, {
    headers: { "Content-Type": "application/json" },
  });

export const checkAuth = () =>
  api.get("/users/user", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
      "Content-Type": "multipart/form-data",
    },
  });

export const updateUserDetails = (formData) =>
  api.put("/users", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  });

export const resendVerificationEmail = (email) =>
  api.get("/users/verify/" + email);

export const createAdmin = (formData) =>
  api.post("/users/admins", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  });
