import api from "./index";

export const fetchAllSubscriptions = () => api.get("/subscriptions");

export const updateSubscription = ({ id, formData }) =>
  api.post("/subscriptions/" + id, formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
      "Content-Type": "application/json",
    },
  });
