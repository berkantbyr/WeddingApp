import axios from 'axios';

const SESSION_KEY = 'sb_active_session';

// Mock modu: Production'da varsayılan olarak kapalı, sadece açıkça 'true' olarak ayarlandığında açık
// Development için .env dosyasında VITE_USE_MOCK=true yapabilirsiniz
export const USE_MOCK_API = import.meta.env?.VITE_USE_MOCK === 'true';

const inferApiUrl = () => {
  // Öncelikle environment variable'dan al
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Development ortamı kontrolü
  if (typeof window !== 'undefined' && window.location?.origin) {
    const url = new URL(window.location.origin);

    // Local development
    if (url.port === '5173' || url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return 'http://localhost:3000/api';
    }

    // Production'da VITE_API_URL ayarlanmamışsa uyarı ver
    // NOT: Production'da mutlaka VITE_API_URL environment variable'ı Railway backend URL'si olarak ayarlanmalıdır
    console.warn('VITE_API_URL environment variable ayarlanmamış! Railway backend URL\'sini VITE_API_URL olarak ayarlayın.');
    
    // Geçici fallback (production'da çalışmayabilir)
    return `${window.location.origin.replace(/\/$/, '')}/api`;
  }

  // Son fallback
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

// Response interceptor - hataları daha iyi logla
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Detaylı hata loglama (development için)
    if (import.meta.env.DEV) {
      console.error('API Hatası:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        baseURL: error.config?.baseURL
      });
    }
    
    // Network hatası (backend'e ulaşılamıyor)
    if (!error.response) {
      console.error('Backend\'e ulaşılamıyor. URL:', error.config?.baseURL + error.config?.url);
      error.message = 'Backend sunucusuna ulaşılamıyor. Lütfen bağlantınızı kontrol edin.';
    }
    
    return Promise.reject(error);
  }
);

