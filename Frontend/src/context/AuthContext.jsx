import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('staynest_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('staynest_token', data.data.token);
    setToken(data.data.token);
    setUser(data.data);
    return data.data;
  };

  const register = async (userData) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('staynest_token', data.data.token);
    setToken(data.data.token);
    setUser(data.data);
    return data.data;
  };

  const googleLogin = async (googleUserData) => {
    const response = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleUserData),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Google sign-in failed');
    }

    localStorage.setItem('staynest_token', data.data.token);
    setToken(data.data.token);
    setUser(data.data);
    return data.data;
  };

  const logout = () => {
    localStorage.removeItem('staynest_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
