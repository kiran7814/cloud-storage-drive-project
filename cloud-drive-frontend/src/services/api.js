import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloud-drive-backend.onrender.com', // Production Backend URL on Render
});

export default api;
