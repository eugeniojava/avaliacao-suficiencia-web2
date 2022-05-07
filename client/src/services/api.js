import axios from 'axios';
import env from 'react-dotenv';

const API_URL = env.API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;
