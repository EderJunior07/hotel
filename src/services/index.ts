import axios from 'axios';

export const baseUrl = 'http://book.hospeda.in';

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
