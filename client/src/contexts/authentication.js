import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  const register = useCallback(async (login, email, password) => {
    const { data: user } = await api.post('/users', {
      login,
      email,
      password,
    });
  }, []);

  const login = useCallback(async (login, password) => {
    const { data: user } = await api.post('/auth', {
      login,
      password,
    });

    api.defaults.headers.Authorization = `Bearer ${user.token}`;

    localStorage.setItem('@blog-user', JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('@blog-user');
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('@blog-user');
    if (user) {
      const parsedUse = JSON.parse(user);

      api.defaults.headers.Authorization = `Bearer ${parsedUse.token}`;
      setCurrentUser(JSON.parse(parsedUse));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        currentUser,
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
    throw new Error('useAuth must be used within as Authprovider');
  }

  return context;
}
