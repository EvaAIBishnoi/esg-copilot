
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ESG/Audit specific endpoints
export const esgApi = {
  // Chat endpoints
  sendMessage: async (message: string, context?: any) => {
    const response = await api.post('/chat/message', { message, context });
    return response.data;
  },
  
  // Document analysis
  uploadDocument: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  analyzeDocument: async (documentId: string) => {
    const response = await api.post(`/documents/${documentId}/analyze`);
    return response.data;
  },
  
  // ESG specific queries
  getESGFrameworks: async () => {
    const response = await api.get('/esg/frameworks');
    return response.data;
  },
  
  getAuditChecklist: async (type: string) => {
    const response = await api.get(`/audit/checklist/${type}`);
    return response.data;
  },
  
  getTaxRules: async (jurisdiction: string) => {
    const response = await api.get(`/tax/rules/${jurisdiction}`);
    return response.data;
  }
};

export default api;
