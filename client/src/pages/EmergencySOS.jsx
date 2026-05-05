import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Navigation, 
  ShieldAlert, 
  Heart, 
  ArrowLeft,
  Hospital,
  Ambulance,
  AlertTriangle
} from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

const EmergencySOS = () => {
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isActive]);

  const hospitals = [
    { name: 'City General Hospital', distance: '1.2 km', time: '5 mins', phone: '+91 1122334455', type: 'Govt' },
    { name: 'St. Mary Healthcare', distance: '2.5 km', time: '10 mins', phone: '+91 9988776655', type: 'Private' },
    { name: 'Apex Trauma Center', distance: '3.8 km', time: '15 mins', phone: '+91 5544332211', type: 'Specialist' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Red Banner */}
      <div className="bg-red-600 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => window.history.back()} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg uppercase tracking-widest">Emergency SOS</h1>
        <div className="w-10 h-10"></div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        
        {/* Active Countdown Section */}
        {countdown > 0 ? (
          <div className="text-center space-y-6 animate-pulse">
            <div className="w-48 h-48 bg-red-50 border-8 border-red-600 rounded-full flex flex-col items-center justify-center mx-auto shadow-2xl">
              <span className="text-6xl font-black text-red-600">{countdown}</span>
              <span className="text-xs font-bold text-red-400 uppercase">Calling...</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-surface-900">Initiating Emergency Call</h2>
              <p className="text-surface-500">Automatically calling nearest emergency services in {countdown}s</p>
            </div>
            <Button 
              variant="secondary" 
              className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100"
              onClick={() => setIsActive(false)}
            >
              Cancel Call
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-48 h-48 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Phone size={80} className="text-white animate-bounce" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-surface-900">Call Connected</h2>
              <p className="text-surface-500 font-medium">Emergency services have been notified of your location.</p>
            </div>
          </div>
        )}

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-red-50 border-red-100 p-6 text-center">
            <Ambulance size={32} className="text-red-600 mx-auto mb-3" />
            <p className="text-xs font-bold text-red-400 uppercase mb-1">Ambulance</p>
            <p className="text-lg font-black text-red-600">102</p>
          </Card>
          <Card className="bg-surface-50 border-surface-200 p-6 text-center">
            <MapPin size={32} className="text-surface-600 mx-auto mb-3" />
            <p className="text-xs font-bold text-surface-400 uppercase mb-1">Your Location</p>
            <p className="text-sm font-bold text-surface-900">Sector 62, Noida</p>
          </Card>
        </div>

        {/* Nearest Hospitals */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-surface-900 flex items-center gap-2">
            <Hospital className="text-primary-600" />
            Nearest Hospitals
          </h3>
          <div className="space-y-3">
            {hospitals.map((hospital) => (
              <Card key={hospital.name} className="hover:border-red-200 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-surface-50 rounded-xl flex items-center justify-center text-surface-400">
                      <Hospital size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-surface-900">{hospital.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-surface-500 mt-1">
                        <span className="flex items-center gap-1 font-medium text-red-600">
                          <Navigation size={12} /> {hospital.distance}
                        </span>
                        <span>{hospital.time} mins away</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Phone size={16} />
                    Call
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Medical Info Card */}
        <Card className="bg-amber-50 border-amber-100">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900">Your Medical Info</h4>
              <p className="text-sm text-amber-700 mt-1">
                Blood Group: <span className="font-bold">O+ Positive</span><br />
                Allergies: <span className="font-bold">Penicillin, Nuts</span>
              </p>
            </div>
          </div>
        </Card>

      </main>
    </div>
  );
};

export default EmergencySOS;
