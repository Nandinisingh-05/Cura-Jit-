import React from 'react';
import { Star, Clock, MapPin, Calendar } from 'lucide-react';
import Button from './Button.jsx';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl border border-surface-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 p-5 group">
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-xl bg-primary-100 overflow-hidden">
            <img 
              src={doctor.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`} 
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          {doctor.online && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-600 transition-colors">
            {doctor.name}
          </h3>
          <p className="text-primary-600 text-sm font-medium">{doctor.specialization}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-surface-700">{doctor.rating}</span>
            <span className="text-xs text-surface-400">({doctor.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-surface-500 text-sm">
          <Clock size={14} />
          <span>Next Available: <span className="text-surface-700 font-medium">{doctor.availability}</span></span>
        </div>
        <div className="flex items-center gap-2 text-surface-500 text-sm">
          <MapPin size={14} />
          <span>{doctor.location}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-surface-50 flex items-center justify-between">
        <div>
          <span className="text-xs text-surface-400 block">Consultation Fee</span>
          <span className="text-lg font-bold text-surface-900">₹{doctor.fee}</span>
        </div>
        <Button size="sm" className="gap-2">
          <Calendar size={16} />
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
