// services.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://wger.de/api/v2",  // ✅ Base Wger API endpoint
  headers: {
    Authorization: `Token ${import.meta.env.VITE_WGER_API_KEY}`, // Or your API key directly for now
  },
});

export default api;
