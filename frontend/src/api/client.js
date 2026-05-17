import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const createQuoteRequest = (payload) => api.post("/quote", payload);
export const createTechnicianRequest = (payload) => api.post("/technician", payload);
export const getRequests = () => api.get("/requests");
export const updateRequest = (id, payload) => api.put(`/request/${id}`, payload);
