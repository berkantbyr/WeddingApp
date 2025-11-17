import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
  getProfile,
  getRoles
} from '../services/authService';
import { ensureSeedData, ROLES } from '../services/mockBackend';

const SESSION_KEY = 'sb_active_session';

const AuthContext = createContext({
  user: null,
  token: null,
  roles: Object.values(ROLES),
  loading: false,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshProfile: async () => {},
  hasRole: () => false
});

const getStoredSession = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to parse stored session', error);
    return null;
  }
};

const persistSession = (session) => {
  if (typeof window === 'undefined') return;
  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
  } else {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
};

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    username: user.username ?? user.email?.split('@')[0] ?? ''
  };
};

const normalizeSession = (session) => {
  if (!session?.user) return session;
  return {
    ...session,
    user: normalizeUser(session.user)
  };
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => normalizeSession(getStoredSession()));
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    ensureSeedData();
    setInitializing(false);
  }, []);

  useEffect(() => {
    persistSession(session);
  }, [session]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const response = await loginRequest(credentials);
      setSession(normalizeSession(response));
      return response.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const response = await registerRequest(payload);
      setSession(normalizeSession(response));
      return response.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutRequest();
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user?.id) return null;
    setLoading(true);
    try {
      const updatedUser = await getProfile(session.user.id);
      const nextSession = normalizeSession({ ...session, user: updatedUser });
      setSession(nextSession);
      return updatedUser;
    } finally {
      setLoading(false);
    }
  }, [session]);

  const hasRole = useCallback(
    (targetRoles) => {
      if (!session?.user?.role) return false;
      if (!targetRoles || targetRoles.length === 0) return true;
      return targetRoles.includes(session.user.role);
    },
    [session]
  );

  const availableRoles = useMemo(() => getRoles(), []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      roles: availableRoles,
      loading: loading || initializing,
      isAuthenticated: Boolean(session?.user),
      login,
      register,
      logout,
      refreshProfile,
      hasRole
    }),
    [session, loading, initializing, login, register, logout, refreshProfile, hasRole, availableRoles]
  );

  if (initializing) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

