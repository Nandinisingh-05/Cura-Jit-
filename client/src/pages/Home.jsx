import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Stethoscope,
  Calendar,
  ArrowRight,
  CheckCircle,
  Activity,
  ShieldAlert,
  Play
} from 'lucide-react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import ChatWidget from '../components/common/Curabot.jsx';

const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: 'Top Specialists',
      desc: 'Connect with over 5,000+ verified doctors across 50+ specializations.',
      icon: Stethoscope,
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    },
    {
      title: 'Instant Booking',
      desc: 'Book appointments online or for in-person visits in just a few clicks.',
      icon: Calendar,
      color: 'text-accent-600',
      bg: 'bg-accent-50'
    },
    {
      title: 'AI Health Assistant',
      desc: 'Describe symptoms to our AI bot and get specialist recommendations instantly.',
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-primary-50/50 to-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-bold">
                <ShieldCheck size={18} />
                #1 Trusted Healthcare Platform in India
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-surface-900 leading-[1.1]">
                Quality Healthcare <br />
                <span className="text-primary-600 underline decoration-accent-300">Simplified</span> For You.
              </h1>
              <p className="text-xl text-surface-500 leading-relaxed max-w-lg">
                Connect with the best doctors, manage your medical records, and
                get instant AI assistance—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-10 shadow-teal" onClick={() => navigate('/dashboard')}>
                  Book Appointment
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button variant="secondary" size="lg" className="gap-2">
                  <Play size={20} fill="currentColor" />
                  How it Works
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                  ))}
                </div>
                <p className="text-sm text-surface-500">
                  <span className="font-bold text-surface-900">10k+</span> Happy Patients this month
                </p>
              </div>
            </div>

            <div className="relative animate-fade-in delay-200 hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-100 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-white p-6 rounded-[3rem] shadow-soft-lg border border-surface-100 rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="bg-surface-50 rounded-[2.5rem] p-4 h-[450px] flex items-center justify-center border border-surface-100 overflow-hidden">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-teal rotate-12">
                      <Heart size={40} fill="white" />
                    </div>
                    <p className="text-surface-400 font-medium italic">Premium Healthcare Dashboard Mockup</p>
                  </div>
                </div>
                {/* Floating UI Elements */}
                <Card className="absolute -left-12 top-20 shadow-lg border-none p-4 max-w-[200px] animate-pulse-soft">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center"><CheckCircle size={18} /></div>
                    <p className="text-xs font-bold text-surface-900">Confirmed Booking!</p>
                  </div>
                </Card>
                <Card className="absolute -right-8 bottom-20 shadow-lg border-none p-4 animate-bounce duration-3000">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center"><ShieldAlert size={18} /></div>
                    <p className="text-xs font-bold text-surface-900">SOS Activated</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-black text-surface-900 mb-4 uppercase tracking-tight">Our Services</h2>
              <p className="text-surface-500">Comprehensive healthcare solutions tailored to your needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <Card key={i} hoverable className="p-8 group">
                  <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <f.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 mb-3">{f.title}</h3>
                  <p className="text-surface-500 leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SOS Promo Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto bg-red-600 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl shadow-red-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:max-w-xl text-center lg:text-left space-y-6">
                <h2 className="text-4xl font-black leading-tight">Every Second Counts in an Emergency.</h2>
                <p className="text-red-100 text-lg">
                  Our SOS feature connects you to the nearest hospital and notifies your family
                  with just one tap. Stay protected, always.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Button variant="secondary" size="lg" className="text-red-600 border-none px-12" onClick={() => navigate('/emergency')}>
                    Learn About SOS
                  </Button>
                </div>
              </div>
              <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-full border-8 border-white/30 flex items-center justify-center animate-pulse">
                <ShieldAlert size={100} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Home;
