import React from 'react';
import { ShieldCheck, Clock3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full bg-white p-10 rounded-[2rem] border border-surface-100 shadow-soft-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary-600">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-3xl font-bold text-surface-900">Your account is under review</h1>
        <p className="mt-4 text-surface-500 leading-relaxed">
          Thank you for joining CuraJit. Your doctor account is pending approval from the admin team. Once verified, you will be able to access the doctor dashboard.
        </p>
        <div className="mt-8 space-y-3">
          <Button onClick={() => navigate('/login')} className="w-full" variant="primary">
            Return to Login
          </Button>
          <Button onClick={() => navigate('/')} className="w-full" variant="secondary">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
