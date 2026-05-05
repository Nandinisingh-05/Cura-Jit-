import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Info, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2024-05-05');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const doctor = {
    name: 'Dr. Sarah Smith',
    specialization: 'Cardiologist',
    experience: '12 years',
    rating: 4.9,
    reviews: 124,
    fee: 800
  };

  const dates = [
    { label: 'Sun', date: '05', full: '2024-05-05' },
    { label: 'Mon', date: '06', full: '2024-05-06' },
    { label: 'Tue', date: '07', full: '2024-05-07' },
    { label: 'Wed', date: '08', full: '2024-05-08' },
    { label: 'Thu', date: '09', full: '2024-05-09' },
    { label: 'Fri', date: '10', full: '2024-05-10' },
  ];

  const slots = {
    morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'],
    evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar active="Appointments" />
      <Navbar mode="dashboard" />

      <main className="lg:ml-64 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="p-2 hover:bg-white rounded-xl transition-colors text-surface-500">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-surface-900">Book Appointment</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Doctor Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 text-center space-y-4">
                <div className="w-24 h-24 bg-primary-100 rounded-3xl mx-auto overflow-hidden border-4 border-white shadow-soft">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`} alt="doctor" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-surface-900">{doctor.name}</h2>
                  <p className="text-primary-600 font-medium">{doctor.specialization}</p>
                </div>
                <div className="flex justify-center gap-4 py-4 border-t border-surface-50">
                   <div className="text-center">
                      <p className="text-xs text-surface-400 font-bold uppercase">Experience</p>
                      <p className="text-sm font-bold text-surface-900">{doctor.experience}</p>
                   </div>
                   <div className="w-px h-8 bg-surface-50"></div>
                   <div className="text-center">
                      <p className="text-xs text-surface-400 font-bold uppercase">Rating</p>
                      <p className="text-sm font-bold text-surface-900">{doctor.rating}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-surface-500 text-sm justify-center">
                   <MapPin size={14} />
                   <span>City General Hospital, Delhi</span>
                </div>
              </Card>

              <Card className="bg-primary-50 border-primary-100 p-4">
                <div className="flex gap-3">
                  <Info className="text-primary-600 shrink-0" size={20} />
                  <p className="text-xs text-primary-700 leading-relaxed">
                    You can cancel or reschedule your appointment up to 24 hours 
                    before the scheduled time for a full refund.
                  </p>
                </div>
              </Card>
            </div>

            {/* Selection Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Date Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-surface-900">Select Date</h3>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-white rounded-lg"><ChevronLeft size={20} /></button>
                    <button className="p-1 hover:bg-white rounded-lg"><ChevronRight size={20} /></button>
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {dates.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`
                        min-w-[70px] p-4 rounded-2xl border-2 transition-all text-center
                        ${selectedDate === d.full 
                          ? 'border-primary-600 bg-primary-600 text-white shadow-teal' 
                          : 'border-white bg-white hover:border-primary-200'}
                      `}
                    >
                      <p className={`text-xs font-bold uppercase ${selectedDate === d.full ? 'text-primary-100' : 'text-surface-400'}`}>
                        {d.label}
                      </p>
                      <p className="text-lg font-black mt-1">{d.date}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div className="space-y-6">
                <h3 className="font-bold text-surface-900">Available Slots</h3>
                
                {['morning', 'afternoon', 'evening'].map((timeOfDay) => (
                  <div key={timeOfDay} className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-surface-400 tracking-widest flex items-center gap-2">
                      <Clock size={14} />
                      {timeOfDay} Slots
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {slots[timeOfDay].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`
                            px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all
                            ${selectedSlot === slot 
                              ? 'border-primary-600 bg-primary-50 text-primary-700' 
                              : 'border-white bg-white hover:border-primary-100 text-surface-600'}
                          `}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary and Proceed */}
              <div className="pt-8 border-t border-surface-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div>
                    <p className="text-sm text-surface-400 font-medium">Selected Slot</p>
                    <p className="text-lg font-bold text-surface-900">
                      {selectedSlot ? `${selectedSlot} on May ${selectedDate.split('-')[2]}` : 'Please select a slot'}
                    </p>
                 </div>
                 <Button 
                   size="lg" 
                   className="w-full sm:w-auto px-12 gap-2 group" 
                   disabled={!selectedSlot}
                   onClick={() => navigate('/payment')}
                 >
                    Confirm Booking
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentBooking;
