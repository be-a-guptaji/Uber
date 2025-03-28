import axios from "axios";

// Create an instance of axios
export const Api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});
