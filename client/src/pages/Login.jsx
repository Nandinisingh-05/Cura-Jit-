import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  BriefcaseMedical,
  Eye,
  EyeOff,
  HeartPulse,
  Loader2,
  Lock,
  Mail,
  Stethoscope,
  User,
  X,
} from 'lucide-react';
import { loginUser, registerPatient, registerDoctor } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, getDashboardPath, user } = useAuth();

  const [authView, setAuthView] = useState(location.pathname === '/register' ? 'signup' : 'login');
  const [signupRole, setSignupRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [fee, setFee] = useState('');

  if (user) {
    navigate(getDashboardPath(), { replace: true });
    return null;
  }

  const resetSignupFields = () => {
    setFirstName('');
    setLastName('');
    setSpecialization('');
    setExperience('');
    setFee('');
  };

  const openSignup = () => {
    setAuthView('signup');
    setSignupRole('user');
    setPassword('');
    resetSignupFields();
  };

  const openLogin = () => {
    setAuthView('login');
    setPassword('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      login(data);
      toast.success(`Welcome back, ${data.name}!`);

      const intendedPath = location.state?.from?.pathname;
      const dashboardPath = getDashboardPath(data.role);
      navigate(intendedPath ?? dashboardPath, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (signupRole === 'doctor' && (!specialization || !experience || !fee)) {
      toast.error('Please fill in all doctor details.');
      return;
    }

    setLoading(true);
    try {
      const name = `${firstName} ${lastName}`.trim();

      if (signupRole === 'doctor') {
        await registerDoctor({
          name,
          email,
          password,
          specialization,
          experience,
          fee: Number(fee) || 0,
        });
        toast.success('Doctor registration received. Await admin approval.');
        openLogin();
        return;
      }

      const { data } = await registerPatient({ name, email, password });
      login(data);
      toast.success(`Welcome, ${data.name}!`);
      navigate(getDashboardPath(data.role), { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const isSignup = authView === 'signup';

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft-xl border border-surface-100 grid lg:grid-cols-[0.95fr_1.05fr]">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-surface-500 shadow-sm border border-surface-100 hover:bg-surface-50 hover:text-surface-900 transition-all"
          aria-label="Back to home"
        >
          <X size={20} />
        </button>

        <section className="hidden lg:flex flex-col justify-between bg-primary-600 text-white p-10">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-8">
              <HeartPulse size={26} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary-100">CuraJit</p>
            <h1 className="mt-4 text-4xl font-black leading-tight">Healthcare access for every role.</h1>
            <p className="mt-4 text-primary-50 leading-relaxed">
              One secure login for patients, doctors, and administrators.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              { label: 'Book appointments', icon: User },
              { label: 'Manage consultations', icon: Stethoscope },
              { label: 'Track care activity', icon: BriefcaseMedical },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                <item.icon size={18} />
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <div className="mb-8">
            <div className="lg:hidden w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-5">
              <HeartPulse size={24} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-600">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </p>
            <h2 className="mt-2 text-3xl font-black text-surface-900">
              {isSignup ? 'Start with CuraJit' : 'Sign in to continue'}
            </h2>
            <p className="mt-2 text-sm text-surface-500">
              {isSignup ? 'Create a user account or apply as a doctor.' : 'Use the same login for user, doctor, or admin access.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={isSignup ? handleRegisterSubmit : handleLoginSubmit}>
            {isSignup && (
              <div className="rounded-2xl bg-surface-50 p-1 grid grid-cols-2 border border-surface-100">
                <button
                  type="button"
                  onClick={() => setSignupRole('user')}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    signupRole === 'user'
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-surface-500 hover:text-surface-800'
                  }`}
                >
                  <User size={17} />
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setSignupRole('doctor')}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    signupRole === 'doctor'
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-surface-500 hover:text-surface-800'
                  }`}
                >
                  <Stethoscope size={17} />
                  Doctor
                </button>
              </div>
            )}

            {isSignup && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-surface-700">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full bg-surface-50 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-surface-700">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-surface-50 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-surface-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-surface-50 rounded-xl pl-12 pr-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-surface-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-surface-50 rounded-xl pl-12 pr-12 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-700 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isSignup && signupRole === 'doctor' && (
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-surface-700">Specialization</label>
                  <div className="relative">
                    <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                    <input
                      type="text"
                      required
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="Cardiologist, Neurologist, etc."
                      className="w-full bg-surface-50 rounded-xl pl-12 pr-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-surface-700">Experience</label>
                    <input
                      type="text"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Example: 10 years"
                      className="w-full bg-surface-50 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-surface-700">Consultation Fee</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      placeholder="Rs. 500"
                      className="w-full bg-surface-50 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {isSignup && (
              <label className="flex items-start gap-3 px-1">
                <input type="checkbox" className="mt-1.5 rounded text-primary-600 focus:ring-primary-500 border-surface-300" required />
                <span className="text-xs text-surface-500 leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 active:scale-[.98] transition-all shadow-lg shadow-primary-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isSignup ? (signupRole === 'doctor' ? 'Apply as Doctor' : 'Create Account') : 'Sign In'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 border-t border-surface-100 pt-6 text-center">
            {isSignup ? (
              <p className="text-sm text-surface-500">
                Already have an account?{' '}
                <button type="button" onClick={openLogin} className="font-bold text-primary-600 hover:text-primary-700">
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-sm text-surface-500">
                New to CuraJit?{' '}
                <button type="button" onClick={openSignup} className="font-bold text-primary-600 hover:text-primary-700">
                  Create new account
                </button>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
