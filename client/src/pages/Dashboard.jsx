import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Activity,
  Clock,
  ArrowRight,
  Plus,
  ShieldAlert,
  Heart,
  Thermometer,
  Droplets
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import ChatWidget from '../components/common/Curabot.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Body Temp', value: '36.6 °C', icon: Thermometer, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Blood Pressure', value: '120/80', icon: Activity, color: 'text-primary-500', bg: 'bg-primary-50' },
    { label: 'Blood Glucose', value: '98 mg/dL', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const appointments = [
    { doctor: 'Dr. Sarah Smith', specialization: 'Cardiologist', date: 'Tomorrow', time: '10:00 AM', status: 'Confirmed' },
    { doctor: 'Dr. James Wilson', specialization: 'Dermatologist', date: 'May 15', time: '02:30 PM', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar active="Dashboard" />
      <Navbar mode="dashboard" />

      <main className="lg:ml-64 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-surface-900">Welcome back, Nandani! 👋</h1>
              <p className="text-surface-500">Your health overview for today.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="gap-2">
                <Clock size={18} />
                History
              </Button>
              <Button className="gap-2 shadow-teal" onClick={() => navigate('/appointments')}>
                <Plus size={18} />
                New Appointment
              </Button>
            </div>
          </div>

          {/* SOS Quick Action */}
          <Card className="bg-red-50 border-red-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-red-900">Emergency Situation?</h3>
                  <p className="text-red-700 text-sm">Quickly connect with nearest hospitals and emergency services.</p>
                </div>
              </div>
              <Button variant="danger" size="lg" className="shadow-lg shadow-red-500/30" onClick={() => navigate('/emergency')}>
                SOS EMERGENCY
              </Button>
            </div>
          </Card>

          {/* Vital Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} padding={true} className="border-none shadow-soft hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 font-medium">{stat.label}</p>
                    <p className="text-xl font-bold text-surface-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-surface-900">Upcoming Appointments</h2>
                <button className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:underline">
                  View All <ArrowRight size={14} />
                </button>
              </div>
              <div className="space-y-4">
                {appointments.map((apt, index) => (
                  <Card key={index} padding={false} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-4">
                      <div className="w-16 h-16 bg-surface-50 rounded-xl flex items-center justify-center text-surface-400">
                        <Calendar size={32} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-surface-900">{apt.doctor}</h4>
                        <p className="text-sm text-primary-600 font-medium">{apt.specialization}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-surface-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {apt.date} • {apt.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Confirmed' ? 'bg-accent-100 text-accent-700' : 'bg-surface-100 text-surface-500'
                          }`}>
                          {apt.status}
                        </span>
                        <Button variant="secondary" size="sm">Details</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Health Tips / AI Suggestion */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-surface-900">Health Insights</h2>
              <Card className="bg-primary-600 text-white border-none shadow-teal">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-lg font-bold">Try AI Suggestion</h3>
                  <p className="text-primary-100 text-sm leading-relaxed">
                    Not sure which specialist to see? Describe your symptoms to our
                    AI assistant and get instant recommendations.
                  </p>
                  <Button variant="secondary" className="w-full text-primary-600 border-none">
                    Start Consultation
                  </Button>
                </div>
              </Card>

              <Card hoverable className="border-accent-100 bg-accent-50/30">
                <h4 className="font-bold text-accent-900 mb-2">Daily Tip</h4>
                <p className="text-sm text-accent-700 leading-relaxed">
                  Drinking 2 liters of water daily can improve your metabolism and skin health.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default Dashboard;
