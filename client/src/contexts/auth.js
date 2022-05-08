import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../services/api';

const AuthContext = createContext({});
const LOCAL_STORAGE_NAME = '@my-posts';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  const register = useCallback(async (login, email, password) => {
    await api.post('/users', {
      login,
      email,
      password,
    });
  }, []);

  const login = useCallback(async (login, password) => {
    const { data: response } = await api.post('/auth/login', {
      login,
      password,
    });
    api.defaults.headers.Authorization = `Bearer ${response.accessToken}`;
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(response));
    const user = {
      id: response.id,
      login: response.login,
      email: response.email,
      isAdmin: response.isAdmin,
    };
    setCurrentUser(user);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_NAME);
    if (user) {
      const parsedUser = JSON.parse(user);
      api.defaults.headers.Authorization = `Bearer ${parsedUser.accessToken}`;
      setCurrentUser(parsedUser);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within as auth provider');
  }
  return context;
}
