import axios from 'axios';

const SESSION_KEY = 'sb_active_session';

export const USE_MOCK_API = import.meta.env?.VITE_USE_MOCK === 'true';

const inferApiUrl = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin.replace(/\/$/, '')}/api`;
  }
  return 'http://localhost:3000/api';
};

export const API_URL = inferApiUrl().replace(/\/+$/, '');
export const API_HOST = API_URL.replace(/\/api$/, '');

export const getStoredSession = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Oturum bilgisi okunamadı:', error);
    return null;
  }
};

export const getAuthToken = () => getStoredSession()?.token || null;

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

