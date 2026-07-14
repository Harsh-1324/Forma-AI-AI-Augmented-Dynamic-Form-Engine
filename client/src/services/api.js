import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export const FormSchemaAPI = {
  list: () => api.get("/form-schemas").then((r) => r.data),
  get: (id) => api.get(`/form-schemas/${id}`).then((r) => r.data),
};

export const ExtractionAPI = {
  extract: (formSchemaId, text) =>
    api.post("/extract", { formSchemaId, text }).then((r) => r.data),
};

export const FormSubmissionAPI = {
  create: (formSchemaId, userId) =>
    api.post("/form-submissions", { formSchemaId, userId }).then((r) => r.data),
  get: (id) => api.get(`/form-submissions/${id}`).then((r) => r.data),
  saveProgress: (id, data) =>
    api.patch(`/form-submissions/${id}`, { data }).then((r) => r.data),
  submit: (id) => api.post(`/form-submissions/${id}/submit`).then((r) => r.data),
};

export default api;
