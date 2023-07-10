import api, { bearerToken } from "./index";

export const fetchAllSubscriptions = () => api.get("/subscriptions");

export const updateSubscription = ({ id, formData }) =>
  api.post("/subscriptions/" + id, formData, {
    headers: {
      Authorization: bearerToken(),
      "Content-Type": "application/json",
    },
  });
