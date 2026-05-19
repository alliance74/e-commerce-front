'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import Image from 'next/image';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      showToast('Login successful');
      router.push('/profile');
    } catch (error) {
      showToast('Login failed', 'error');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      await register(registerData.name, registerData.email, registerData.password);
      showToast('Registration successful');
      router.push('/profile');
    } catch (error) {
      showToast('Registration failed', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-peach py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0 bg-white overflow-hidden shadow-2xl">
          {/* Image Panel */}
          <div className="hidden md:block relative h-[600px]">
            <Image
              src="https://picsum.photos/seed/auth1/800/800"
              alt="Luxury hotel"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent flex items-end p-12">
              <div>
                <h2 className="font-display text-4xl font-bold text-white mb-4">
                  Welcome to Hotel Life
                </h2>
                <p className="font-ui text-white/90">
                  Experience luxury hotel living at home
                </p>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="p-12">
            <div className="flex gap-4 mb-8 border-b border-warm-gray">
              <button
                onClick={() => setTab('login')}
                className={`pb-3 font-ui font-semibold transition-colors ${
                  tab === 'login'
                    ? 'text-orange border-b-2 border-orange'
                    : 'text-warm-gray'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setTab('register')}
                className={`pb-3 font-ui font-semibold transition-colors ${
                  tab === 'register'
                    ? 'text-orange border-b-2 border-orange'
                    : 'text-warm-gray'
                }`}
              >
                Register
              </button>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'login' ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-6"
                >
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                  <Input
                    label="Password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-ui text-sm text-warm-gray">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <a href="#" className="font-ui text-sm text-orange hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? <Spinner /> : 'Login'}
                  </Button>
                  <p className="font-ui text-sm text-warm-gray text-center">
                    Use admin@hotel.com to access admin panel
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegister}
                  className="space-y-6"
                >
                  <Input
                    label="Full Name"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  />
                  <Input
                    label="Password"
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  />
                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? <Spinner /> : 'Register'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
