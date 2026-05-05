import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, User, Stethoscope, FileText } from 'lucide-react';
import { loginUser, registerPatient, registerDoctor } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, getDashboardPath, user } = useAuth();

  const [activeTab, setActiveTab] = useState(location.pathname === '/register' ? 'patient' : 'login'); // 'login', 'patient', 'doctor'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [fee, setFee] = useState('');

  // If already logged in, redirect to their dashboard
  if (user) {
    navigate(getDashboardPath(), { replace: true });
    return null;
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      login(data);
      toast.success(`Welcome back, ${data.name}! 👋`);
      
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
    if (activeTab === 'doctor' && (!specialization || !experience)) {
      toast.error('Please fill in all doctor details.');
      return;
    }

    setLoading(true);
    try {
      if (activeTab === 'patient') {
        await registerPatient({
          name: `${firstName} ${lastName}`,
          email,
          password,
        });
        toast.success('Patient registration successful! Please login.');
      } else {
        await registerDoctor({
          name: `${firstName} ${lastName}`,
          email,
          password,
          specialization,
          experience,
          fee: Number(fee) || 0,
        });
        toast.success('Doctor registration received. Await admin approval.');
      }
      setActiveTab('login');
      setPassword('');
      setSpecialization('');
      setExperience('');
      setFee('');
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full animate-fade-in">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-teal mx-auto mb-5">
            <Heart size={30} />
          </div>
          <h1 className="text-3xl font-black text-surface-900 mb-2">
            {activeTab === 'login' ? 'Welcome Back' : 'Join CuraJit'}
          </h1>
          <p className="text-surface-500">
            {activeTab === 'login' 
              ? 'Sign in to your account.' 
              : activeTab === 'patient' 
                ? 'Create a patient account to book appointments.' 
                : 'Join as a doctor to manage patients.'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-soft-xl border border-surface-100 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-surface-100">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 ${
                activeTab === 'login' ? 'text-primary-600 border-primary-600 bg-primary-50/50' : 'text-surface-500 border-transparent hover:text-surface-700 hover:bg-surface-50'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('patient')}
              className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 flex items-center justify-center gap-2 ${
                activeTab === 'patient' ? 'text-primary-600 border-primary-600 bg-primary-50/50' : 'text-surface-500 border-transparent hover:text-surface-700 hover:bg-surface-50'
              }`}
            >
              <User size={16} />
              Patient
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('doctor')}
              className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 flex items-center justify-center gap-2 ${
                activeTab === 'doctor' ? 'text-primary-600 border-primary-600 bg-primary-50/50' : 'text-surface-500 border-transparent hover:text-surface-700 hover:bg-surface-50'
              }`}
            >
              <Stethoscope size={16} />
              Doctor
            </button>
          </div>

          <div className="p-8">
            <form className="space-y-5" onSubmit={activeTab === 'login' ? handleLoginSubmit : handleRegisterSubmit}>
              
              {/* Registration Specific Fields */}
              {activeTab !== 'login' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
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

              {/* Email */}
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

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-surface-700">Password</label>
                  {activeTab === 'login' && (
                    <a href="#" className="text-xs text-primary-600 hover:underline font-medium">Forgot password?</a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-surface-50 rounded-xl pl-12 pr-12 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Doctor Specific Fields */}
              {activeTab === 'doctor' && (
                <div className="space-y-5 animate-fade-in mt-4">
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
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-surface-700">Experience</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                      <input
                        type="text"
                        required
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Example: 10 years"
                        className="w-full bg-surface-50 rounded-xl pl-12 pr-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-surface-700">Consultation Fee</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                      <input
                        type="number"
                        min="0"
                        required
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        placeholder="₹500"
                        className="w-full bg-surface-50 rounded-xl pl-12 pr-4 py-3 outline-none border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-surface-900 placeholder-surface-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Terms Checkbox for Registration */}
              {activeTab !== 'login' && (
                <div className="flex items-start gap-3 px-1 mt-2">
                  <input type="checkbox" className="mt-1.5 rounded text-primary-600 focus:ring-primary-500 border-surface-300" required />
                  <p className="text-xs text-surface-500 leading-relaxed">
                    I agree to the <a href="#" className="text-primary-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 font-bold hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 active:scale-[.98] transition-all shadow-lg shadow-primary-500/20 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {activeTab === 'login' ? 'Sign In' : 'Create Account'} 
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            {activeTab === 'login' && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-surface-100" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-surface-400 font-semibold tracking-wider">Or</span>
                  </div>
                </div>

                {/* Role hint badges */}
                <div className="flex gap-2 justify-center flex-wrap text-xs">
                  {[
                    { role: 'Patient', color: 'bg-blue-50 text-blue-700' },
                    { role: 'Doctor', color: 'bg-emerald-50 text-emerald-700' },
                    { role: 'Admin', color: 'bg-purple-50 text-purple-700' },
                  ].map((b) => (
                    <span key={b.role} className={`px-3 py-1 rounded-full font-bold ${b.color}`}>
                      {b.role}
                    </span>
                  ))}
                </div>
                <p className="text-center text-xs text-surface-400 mt-3">
                  Login automatically redirects to your role dashboard.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
