import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle, 
  Clock,
  ArrowRight,
  User
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  const summary = {
    doctor: 'Dr. Sarah Smith',
    specialization: 'Cardiologist',
    date: 'Tomorrow, May 5',
    time: '10:00 AM',
    fee: 800,
    tax: 40,
    total: 840
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-12 space-y-6 shadow-soft-lg border-none animate-slide-up">
          <div className="w-24 h-24 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-accent-500/20">
            <CheckCircle size={60} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-surface-900">Payment Successful!</h1>
            <p className="text-surface-500">Your appointment with {summary.doctor} has been confirmed.</p>
          </div>
          <div className="bg-surface-50 p-4 rounded-2xl border border-surface-100 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-surface-400">Appointment ID</span>
              <span className="font-bold text-surface-900">#CJ-98234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-400">Date & Time</span>
              <span className="font-bold text-surface-900">{summary.date} • {summary.time}</span>
            </div>
          </div>
          <Button className="w-full py-4 text-lg font-bold shadow-teal" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <button className="text-primary-600 font-bold text-sm hover:underline">Download Receipt</button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar active="Payments" />
      <Navbar mode="dashboard" />

      <main className="lg:ml-64 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Left: Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={() => window.history.back()} className="p-2 hover:bg-white rounded-xl transition-colors text-surface-500">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-surface-900">Select Payment Method</h1>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setMethod('card')}
                className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                  method === 'card' ? 'border-primary-600 bg-primary-50/30' : 'border-white bg-white hover:border-surface-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${method === 'card' ? 'bg-primary-600 text-white' : 'bg-surface-50 text-surface-400'}`}>
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-surface-900">Credit / Debit Card</h3>
                    <p className="text-xs text-surface-500">Securely pay using your bank card.</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-primary-600' : 'border-surface-200'}`}>
                  {method === 'card' && <div className="w-3 h-3 bg-primary-600 rounded-full"></div>}
                </div>
              </button>

              <button 
                onClick={() => setMethod('upi')}
                className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                  method === 'upi' ? 'border-primary-600 bg-primary-50/30' : 'border-white bg-white hover:border-surface-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${method === 'upi' ? 'bg-primary-600 text-white' : 'bg-surface-50 text-surface-400'}`}>
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-surface-900">UPI / Wallet</h3>
                    <p className="text-xs text-surface-500">Google Pay, PhonePe, Paytm, etc.</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'upi' ? 'border-primary-600' : 'border-surface-200'}`}>
                  {method === 'upi' && <div className="w-3 h-3 bg-primary-600 rounded-full"></div>}
                </div>
              </button>
            </div>

            <Card className="p-8">
              {method === 'card' ? (
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-surface-700 ml-1">Card Number</label>
                    <input className="w-full px-4 py-3 bg-surface-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-surface-700 ml-1">Expiry Date</label>
                      <input className="w-full px-4 py-3 bg-surface-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-surface-700 ml-1">CVV</label>
                      <input className="w-full px-4 py-3 bg-surface-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="000" />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                   <div className="w-48 h-48 bg-surface-50 border-2 border-dashed border-surface-200 rounded-3xl mx-auto flex items-center justify-center text-surface-300">
                      QR Code Placeholder
                   </div>
                   <p className="text-sm text-surface-500">Or enter your UPI ID</p>
                   <input className="w-full max-w-xs mx-auto px-4 py-3 bg-surface-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-center" placeholder="username@upi" />
                </div>
              )}
            </Card>

            <div className="flex items-center gap-3 text-accent-600 bg-accent-50 p-4 rounded-xl">
               <ShieldCheck size={20} />
               <p className="text-sm font-medium">Your payment is secured with 256-bit SSL encryption.</p>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-surface-900">Order Summary</h2>
            <Card className="p-6 space-y-6 shadow-soft border-none">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-surface-900">{summary.doctor}</h4>
                  <p className="text-xs text-primary-600 font-medium">{summary.specialization}</p>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-surface-50">
                <div className="flex items-center gap-2 text-surface-500 text-sm">
                  <CalendarIcon size={14} />
                  <span>{summary.date}</span>
                </div>
                <div className="flex items-center gap-2 text-surface-500 text-sm">
                  <Clock size={14} />
                  <span>{summary.time}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Consultation Fee</span>
                  <span className="text-surface-900 font-medium">₹{summary.fee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Service Tax (5%)</span>
                  <span className="text-surface-900 font-medium">₹{summary.tax}</span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-surface-900 font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-primary-600">₹{summary.total}</span>
                </div>
              </div>

              <Button className="w-full py-4 text-lg font-bold shadow-teal group" onClick={() => setIsSuccess(true)}>
                Pay Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
};

// Internal icon fix
const CalendarIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
);

export default PaymentPage;
