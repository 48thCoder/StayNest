import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import { X, Mail, Lock, User, Phone, Building, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  phone: '',
};

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setShowPassword(false);
    setAgreeToTerms(false);
    setRememberMe(false);
    setError('');
  };

  useEffect(() => {
    setIsLogin(initialMode === 'login');
    resetForm();
  }, [initialMode, isOpen]);

  const { login, register, googleLogin } = useAuth();

  const handleGoogleSuccess = async (tokenResponse) => {
    setError('');
    setSubmitting(true);
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      const userInfo = await userInfoResponse.json();

      await googleLogin({
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture,
        role: !isLogin ? role : undefined,
        isSignUp: !isLogin,
      });

      resetForm();
      onClose();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google sign-in was cancelled or failed'),
  });

  const handleGoogleClick = () => {
    if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      const mockGoogleUser = {
        name: 'Alex Johnson',
        email: 'alex.johnson@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        role: !isLogin ? role : undefined,
        isSignUp: !isLogin,
      };
      setError('');
      setSubmitting(true);
      googleLogin(mockGoogleUser)
        .then(() => {
          resetForm();
          onClose();
        })
        .catch((err) => setError(err.message || 'Google sign-in failed'))
        .finally(() => setSubmitting(false));
      return;
    }
    triggerGoogleLogin();
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const switchMode = (mode) => {
    setIsLogin(mode === 'login');
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !agreeToTerms) {
      setError('Please agree to the Terms of Service & Privacy Policy');
      return;
    }

    setSubmitting(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register({ ...formData, role });
      }
      resetForm();
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-[454px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-warm-gray-400 hover:text-warm-gray-600 rounded-full hover:bg-warm-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-warm-gray-800">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-sm text-warm-gray-500 mt-1">
              {isLogin ? 'Log in to manage your StayNest account' : 'Join StayNest to find or list PG accommodations'}
            </p>
          </div>

          {!isLogin && (
            <div className="flex bg-warm-gray-100 p-1 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setRole('user');
                  resetForm();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === 'user' ? 'bg-white text-primary shadow-sm' : 'text-warm-gray-600'
                }`}
              >
                <User className="w-4 h-4" />
                Looking for PG
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('owner');
                  resetForm();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === 'owner' ? 'bg-white text-primary shadow-sm' : 'text-warm-gray-600'
                }`}
              >
                <Building className="w-4 h-4" />
                PG Owner
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <button
            type="button"
            disabled={submitting}
            onClick={handleGoogleClick}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-warm-gray-200 hover:bg-warm-gray-50 text-warm-gray-700 font-medium rounded-xl transition-all shadow-sm mb-4 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-warm-gray-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-warm-gray-400 uppercase tracking-wider font-medium">
              or
            </span>
            <div className="border-t border-warm-gray-200 w-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-warm-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-warm-gray-700 mb-1">
                Email Address {!isLogin && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-warm-gray-700 mb-1">
                Password {!isLogin && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600 focus:outline-none transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-warm-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    pattern="[6-9][0-9]{9}"
                    className="w-full pl-10 pr-4 py-2.5 bg-warm-gray-50 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-warm-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary bg-warm-gray-50 border-warm-gray-300 rounded focus:ring-primary/20 accent-primary cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#forgot-password"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  required
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    setError('');
                  }}
                  className="mt-0.5 w-4 h-4 text-primary bg-warm-gray-50 border-warm-gray-300 rounded focus:ring-primary/20 accent-primary cursor-pointer"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-warm-gray-600 leading-tight cursor-pointer">
                  I agree to the{' '}
                  <a href="#terms" onClick={(e) => e.preventDefault()} className="text-primary hover:underline font-medium">
                    Terms of Service
                  </a>{' '}
                  &{' '}
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </a>{' '}
                  <span className="text-red-500">*</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-primary/25 btn-shine disabled:opacity-50"
            >
              {submitting ? 'Please wait...' : isLogin ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-warm-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => switchMode(isLogin ? 'signup' : 'login')}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
