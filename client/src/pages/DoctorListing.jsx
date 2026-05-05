import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import DoctorCard from '../components/common/DoctorCard.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import ChatWidget from '../components/common/Curabot.jsx';

const DoctorListing = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialization: 'Cardiologist',
      rating: 4.9,
      reviews: 124,
      availability: 'Tomorrow, 10:00 AM',
      location: 'New Delhi, India',
      fee: 800,
      online: true
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      specialization: 'Dermatologist',
      rating: 4.8,
      reviews: 89,
      availability: 'Today, 04:30 PM',
      location: 'Mumbai, India',
      fee: 600,
      online: false
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      specialization: 'Neurologist',
      rating: 4.7,
      reviews: 210,
      availability: 'May 16, 11:00 AM',
      location: 'Bangalore, India',
      fee: 1200,
      online: true
    },
    {
      id: 4,
      name: 'Dr. Emily Brown',
      specialization: 'Pediatrician',
      rating: 4.9,
      reviews: 156,
      availability: 'Today, 06:00 PM',
      location: 'Hyderabad, India',
      fee: 500,
      online: true
    },
    {
      id: 5,
      name: 'Dr. David Miller',
      specialization: 'Orthopedic',
      rating: 4.6,
      reviews: 75,
      availability: 'Tomorrow, 09:00 AM',
      location: 'Pune, India',
      fee: 900,
      online: false
    },
    {
      id: 6,
      name: 'Dr. Lisa Ray',
      specialization: 'General Physician',
      rating: 4.8,
      reviews: 320,
      availability: 'Today, 03:00 PM',
      location: 'Chennai, India',
      fee: 400,
      online: true
    }
  ];

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar active="Doctors" />
      <Navbar mode="dashboard" />

      <main className="lg:ml-64 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-surface-900">Find Your Specialist</h1>
              <p className="text-surface-500">Search and book top-rated doctors near you.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-surface-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                />
              </div>
              <Button variant="secondary" className="gap-2 px-6">
                <SlidersHorizontal size={18} />
                Filters
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General'].map((cat) => (
              <button
                key={cat}
                className={`
                  px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                  ${cat === 'All'
                    ? 'bg-primary-600 text-white shadow-teal'
                    : 'bg-white text-surface-600 border border-surface-100 hover:border-primary-300 hover:text-primary-600'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto text-surface-300">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-surface-900">No doctors found</h3>
              <p className="text-surface-500">Try adjusting your search terms or filters.</p>
              <Button variant="secondary" onClick={() => setSearchTerm('')}>Clear Search</Button>
            </div>
          )}
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default DoctorListing;
