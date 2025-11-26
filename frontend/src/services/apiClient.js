import axios from 'axios';

const SESSION_KEY = 'sb_active_session';

// Mock modu: Eğer .env dosyasında VITE_USE_MOCK tanımlı değilse, varsayılan olarak true yap
// MySQL kurulumu yapıldıktan sonra bu satırı değiştirip false yapabilirsiniz
export const USE_MOCK_API = import.meta.env?.VITE_USE_MOCK !== 'false';

const inferApiUrl = () => {
  const envUrl = (import.meta.env?.VITE_API_URL || '').trim();

  if (typeof window !== 'undefined' && window.location?.origin) {
    const current = new URL(window.location.href);
    const isLocal =
      current.hostname === 'localhost' ||
      current.hostname === '127.0.0.1' ||
      current.port === '5173' ||
      current.port === '4173';

    if (!isLocal) {
      // Üretimde her zaman aynı origin'i kullan ki Vercel proxy'si devreye girsin
      return `${current.origin.replace(/\/$/, '')}/api`;
    }

    if (envUrl) {
      return envUrl;
    }

    return 'http://localhost:3000/api';
  }

  return envUrl || 'http://localhost:3000/api';
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
  withCredentials: false
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

