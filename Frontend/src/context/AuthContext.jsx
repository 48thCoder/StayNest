import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem('staynest_token') || sessionStorage.getItem('staynest_token') || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
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

  const login = async (email, password, rememberMe = false) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    if (rememberMe) {
      localStorage.setItem('staynest_token', data.data.token);
      sessionStorage.removeItem('staynest_token');
    } else {
      sessionStorage.setItem('staynest_token', data.data.token);
      localStorage.removeItem('staynest_token');
    }

    setToken(data.data.token);
    setUser(data.data);
    return data.data;
  };

  const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('staynest_token', data.data.token);
    sessionStorage.removeItem('staynest_token');
    setToken(data.data.token);
    setUser(data.data);
    return data.data;
  };

  const googleLogin = async (googleUserData) => {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleUserData),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Google sign-in failed');
    }

    localStorage.setItem('staynest_token', data.data.token);
    sessionStorage.removeItem('staynest_token');
    setToken(data.data.token);
    setUser(data.data);
    return data.data;
  };

  const forgotPassword = async (email) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Failed to request password reset');
    }
    return data;
  };

  const resetPassword = async ({ email, otp, newPassword }) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Failed to reset password');
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('staynest_token');
    sessionStorage.removeItem('staynest_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        googleLogin,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
