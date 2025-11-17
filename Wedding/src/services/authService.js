import axios from 'axios';
import {
  ROLES,
  storageKeys,
  delay,
  createId,
  ensureSeedData,
  readCollection,
  writeCollection
} from './mockBackend';

const API_URL = import.meta.env.VITE_API_URL || '';

const apiClient = API_URL
  ? axios.create({
      baseURL: API_URL,
      withCredentials: true
    })
  : null;

const persistToken = (token) => {
  if (typeof window === 'undefined') return;
  if (!token) {
    window.localStorage.removeItem('token');
  } else {
    window.localStorage.setItem('token', token);
  }
};

const backendRoleToFrontend = (backendRole) => {
  if (backendRole === 'MUSTERI') return 'customer';
  if (backendRole === 'SALON_SAHIBI') return 'owner';
  return backendRole?.toLowerCase?.() ?? ROLES.CUSTOMER;
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password: _PASSWORD, ...safeUser } = user;
  return safeUser;
};

const mapBackendUser = (payload) => ({
  id: payload.id,
  fullName: payload.ad_soyad,
  username: payload.kullanici_adi,
  role: backendRoleToFrontend(payload.rol),
  email: payload.eposta ?? null
});

const getUsers = () => readCollection(storageKeys.users);
const persistUsers = (users) => writeCollection(storageKeys.users, users);

export const login = async ({ username, password }) => {
  const trimmedUsername = username?.trim();
  if (!trimmedUsername || !password) {
    throw new Error('Kullanıcı adı ve şifre zorunludur');
  }

  if (apiClient) {
    const { data } = await apiClient.post('/api/giris', { 
      kullanici_adi: trimmedUsername, 
      sifre: password 
    });
    persistToken(data.token);
    return {
      token: data.token,
      user: mapBackendUser(data.kullanici)
    };
  }

  await delay();
  ensureSeedData();

  const users = getUsers();
  const user = users.find(
    (candidate) => candidate.username?.toLowerCase() === trimmedUsername?.toLowerCase() && candidate.password === password
  );

  if (!user) {
    throw new Error('Kullanıcı adı veya şifre hatalı');
  }

  persistToken(`mock-${user.id}`);
  return {
    token: `mock-${user.id}`,
    user: sanitizeUser(user)
  };
};

export const register = async ({ fullName, username, password, role = ROLES.CUSTOMER, company, phone }) => {
  const trimmedUsername = username?.trim();
  if (!fullName || !trimmedUsername || !password) {
    throw new Error('Ad soyad, kullanıcı adı ve şifre zorunludur');
  }

  if (apiClient) {
    // Backend API'ye uygun format
    const backendRole = role === 'customer' ? 'MUSTERI' : role === 'owner' ? 'SALON_SAHIBI' : 'MUSTERI';
    const { data } = await apiClient.post('/api/kayit', { 
      ad_soyad: fullName,
      kullanici_adi: trimmedUsername,
      sifre: password,
      rol: backendRole,
      telefon: phone || null,
      sirket_adi: company || null
    });
    
    // Kayıt sonrası otomatik giriş yap
    if (data.mesaj === 'Kayıt başarılı') {
      return await login({ username: trimmedUsername, password });
    }
    
    return data;
  }

  await delay();
  ensureSeedData();

  const users = getUsers();
  const exists = users.some((candidate) => candidate.username?.toLowerCase() === trimmedUsername?.toLowerCase());

  if (exists) {
    throw new Error('Bu kullanıcı adı zaten kayıtlı');
  }

  const newUser = {
    id: createId('user'),
    fullName,
    username: trimmedUsername,
    password,
    role,
    company: role === ROLES.OWNER ? company : undefined,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
  };

  persistUsers([...users, newUser]);

  persistToken(`mock-${newUser.id}`);
  return {
    token: `mock-${newUser.id}`,
    user: sanitizeUser(newUser)
  };
};

export const getProfile = async (userId) => {
  if (!userId) return null;

  if (apiClient) {
    const { data } = await apiClient.get(`/users/${userId}`);
    return data;
  }

  await delay(250);
  const users = getUsers();
  const user = users.find((candidate) => candidate.id === userId);
  return sanitizeUser(user);
};

export const updateProfile = async (userId, updates) => {
  if (!userId) {
    throw new Error('Profili güncellemek için kullanıcı kimliği gerekli');
  }

  if (apiClient) {
    const { data } = await apiClient.patch(`/users/${userId}`, updates);
    return data;
  }

  await delay();
  const users = getUsers();
  const index = users.findIndex((candidate) => candidate.id === userId);

  if (index === -1) {
    throw new Error('Kullanıcı bulunamadı');
  }

  if (updates.username) {
    const hedef = updates.username.trim().toLowerCase();
    const cakisan = users.some(
      (candidate, candidateIndex) =>
        candidateIndex !== index && candidate.username?.toLowerCase() === hedef
    );
    if (cakisan) {
      throw new Error('Bu kullanıcı adı zaten kullanılıyor');
    }
  }

  const updatedUser = { ...users[index], ...updates };
  users[index] = updatedUser;
  persistUsers(users);

  return sanitizeUser(updatedUser);
};

export const logout = async () => {
  if (apiClient) {
    await apiClient.post('/auth/logout');
  }
  await delay(150);
  persistToken(null);
  return true;
};

export const listUsers = async () => {
  if (apiClient) {
    const { data } = await apiClient.get('/users');
    return Array.isArray(data) ? data.map(mapBackendUser) : data;
  }

  await delay(200);
  return getUsers().map(sanitizeUser);
};

export const deleteUser = async (userId) => {
  if (apiClient) {
    await apiClient.delete(`/users/${userId}`);
    return true;
  }

  await delay(200);
  const users = getUsers();
  const filtered = users.filter((candidate) => candidate.id !== userId);
  persistUsers(filtered);
  return true;
};

export const getRoles = () => Object.values(ROLES);

