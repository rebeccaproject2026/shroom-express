import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const DriverSuccessState = ({ onReset }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[350px] animate-in fade-in zoom-in duration-500 text-center px-6">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-6 text-[#22C55E]">
                <Icon icon="lucide:check-circle" width="48" />
            </div>

            {/* Success Text */}
            <div className="space-y-3 mb-8">
                <h2 className="text-2xl font-bold text-[#111827]">Application Submitted!</h2>
                <p className="text-[#6B7280] max-w-[320px] mx-auto">
                    Your driver registration has been received. Our team will review your details and contact you soon.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
                <button
                    onClick={() => navigate('/store')}
                    className="w-full py-3 bg-[#E93E2B] text-white rounded-xl text-base font-semibold shadow-lg hover:bg-[#E93E2B]/90 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    Back to Home
                    <Icon icon="lucide:home" width="18" />
                </button>
                <button
                    onClick={onReset}
                    className="w-full py-3 bg-white border-2 border-[#E5E7EB] text-[#4B5563] rounded-xl text-base font-semibold hover:bg-gray-50 transition-all active:scale-95"
                >
                    Register Another
                </button>
            </div>
        </div>
    );
};

export default DriverSuccessState;
