import {
  ROLES,
  storageKeys,
  delay,
  createId,
  ensureSeedData,
  readCollection,
  writeCollection
} from './mockBackend';
import { apiClient, USE_MOCK_API } from './apiClient';

const shouldUseMock = USE_MOCK_API;

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password: _PASSWORD, ...safeUser } = user;
  return safeUser;
};

const getUsers = () => readCollection(storageKeys.users);
const persistUsers = (users) => writeCollection(storageKeys.users, users);

export const login = async ({ username, password }) => {
  if (!shouldUseMock) {
    const { data } = await apiClient.post('/giris', { 
      kullanici_adi: username, 
      sifre: password 
    });
    return {
      token: data.token,
      user: {
        id: data.kullanici.id,
        fullName: data.kullanici.ad_soyad,
        username: data.kullanici.kullanici_adi,
        role: data.kullanici.rol === 'MUSTERI' ? 'customer' : data.kullanici.rol === 'SALON_SAHIBI' ? 'owner' : data.kullanici.rol
      }
    };
  }

  await delay();
  ensureSeedData();

  const users = getUsers();
  const user = users.find((candidate) => candidate.username === username && candidate.password === password);

  if (!user) {
    throw new Error('Kullanıcı adı veya şifre hatalı');
  }

  return {
    token: `mock-${user.id}`,
    user: sanitizeUser(user)
  };
};

export const register = async ({ fullName, username, password, role = ROLES.CUSTOMER, company, phone }) => {
  if (!shouldUseMock) {
    const backendRole = role === 'customer' ? 'MUSTERI' : role === 'owner' ? 'SALON_SAHIBI' : 'MUSTERI';
    const { data } = await apiClient.post('/kayit', { 
      ad_soyad: fullName,
      kullanici_adi: username,
      sifre: password,
      rol: backendRole,
      telefon: phone || null,
      sirket_adi: company || null
    });
    
    if (data.mesaj === 'Kayıt başarılı') {
      return await login({ username, password });
    }
    
    return data;
  }

  await delay();
  ensureSeedData();

  const users = getUsers();
  const exists = users.some((candidate) => candidate.username.toLowerCase() === username.toLowerCase());

  if (exists) {
    throw new Error('Bu kullanıcı adı zaten kayıtlı');
  }

  const newUser = {
    id: createId('user'),
    fullName,
    username,
    password,
    role,
    company: role === ROLES.OWNER ? company : undefined,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
  };

  persistUsers([...users, newUser]);

  return {
    token: `mock-${newUser.id}`,
    user: sanitizeUser(newUser)
  };
};

export const getProfile = async (userId) => {
  if (!userId) return null;

  if (!shouldUseMock) {
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

  if (!shouldUseMock) {
    const { data } = await apiClient.patch(`/users/${userId}`, updates);
    return data;
  }

  await delay();
  const users = getUsers();
  const index = users.findIndex((candidate) => candidate.id === userId);

  if (index === -1) {
    throw new Error('Kullanıcı bulunamadı');
  }

  const updatedUser = { ...users[index], ...updates };
  users[index] = updatedUser;
  persistUsers(users);

  return sanitizeUser(updatedUser);
};

export const logout = async () => {
  if (!shouldUseMock) {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.warn('Çıkış isteği başarısız oldu veya desteklenmiyor:', error?.message);
    }
  }
  await delay(150);
  return true;
};

export const listUsers = async () => {
  if (!shouldUseMock) {
    const { data } = await apiClient.get('/users');
    return data;
  }

  await delay(200);
  return getUsers().map(sanitizeUser);
};

export const deleteUser = async (userId) => {
  if (!shouldUseMock) {
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

