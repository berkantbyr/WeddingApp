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

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password: _PASSWORD, ...safeUser } = user;
  return safeUser;
};

const getUsers = () => readCollection(storageKeys.users);
const persistUsers = (users) => writeCollection(storageKeys.users, users);

export const login = async ({ email, password }) => {
  if (apiClient) {
    const { data } = await apiClient.post('/auth/login', { email, password });
    return data;
  }

  await delay();
  ensureSeedData();

  const users = getUsers();
  const user = users.find((candidate) => candidate.email === email && candidate.password === password);

  if (!user) {
    throw new Error('E-posta veya şifre hatalı');
  }

  return {
    token: `mock-${user.id}`,
    user: sanitizeUser(user)
  };
};

export const register = async ({ fullName, email, password, role = ROLES.CUSTOMER, company }) => {
  if (apiClient) {
    const { data } = await apiClient.post('/auth/register', { fullName, email, password, role, company });
    return data;
  }

  await delay();
  ensureSeedData();

  const users = getUsers();
  const exists = users.some((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    throw new Error('Bu e-posta adresi zaten kayıtlı');
  }

  const newUser = {
    id: createId('user'),
    fullName,
    email,
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
  return true;
};

export const listUsers = async () => {
  if (apiClient) {
    const { data } = await apiClient.get('/users');
    return data;
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

