import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Project APIs
export const getProjects = () => apiClient.get("/projects");
// export const createProject = (projectData) => apiClient.post('/projects', projectData);

// Contact API
export const sendContactMessage = (formData) =>
  apiClient.post("/contact", formData);

// REMOVED: enhanceProjectDescriptionAPI
// REMOVED: improveBioAPI

export default apiClient;
