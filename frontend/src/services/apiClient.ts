import axios from 'axios';

const apiClient = axios.create({
  // A URL base da nossa API NestJS que está rodando no Docker
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;