import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const CheckEmailPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F9F6F4] flex flex-col items-center pt-10 sm:pt-16 md:pt-18 p-4 sm:p-10">
            {/* Card */}
            <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl overflow-hidden p-8 relative">

                {/* Top pink banner with envelope */}
                <div
                    className="relative flex items-center justify-center rounded-2xl pt-10 pb-8 bg-[#E93E2B0D] h-[192px]"
                >
                    {/* Decorative dots */}
                    
                    <span className="absolute top-10 right-10 w-3 h-3 rounded-full bg-[#E93E2B] opacity-30"></span>
                    <span className="absolute bottom-6 left-16 w-4 h-4 rounded-full bg-[#E93E2B] opacity-25"></span>

                    {/* Envelope circle */}
                    <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center">
                        <Icon icon="mdi:email" className="text-[#E93E2B]" width={38} height={38} />
                    </div>
                </div>

                {/* Content */}
                <div className="py-8 flex flex-col items-center text-center">
                    <h1 className="text-[26px] font-bold text-[#181211] mb-4">Check Your Email</h1>
                    <p className="text-sm text-[#181211] leading-relaxed mb-7 max-w-[300px]">
                        We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                    </p>

                    <button
                        onClick={() => navigate('/store/login')}
                        className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-colors text-base mb-8"
                    >
                        Back to Login
                    </button>

                    <p className="text-sm text-[#181211]">Didn't receive the email?</p>
                    <p className="text-sm text-[#181211]">
                        Check your <strong>spam folder</strong> or{' '}
                        <button
                            onClick={() => navigate('/store/forgot-password')}
                            className="text-[#E93E2B] font-semibold hover:underline"
                        >
                            try again
                        </button>
                        .
                    </p>
                </div>

                {/* Bottom red gradient glow */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-2 rounded-b-2xl pointer-events-none"
                    style={{ background: 'linear-gradient(to left, transparent 0%, rgba(233,62,43,0.8) 60%, transparent 100%)' }}
                />
            </div>

            {/* Footer */}
            <p className="mt-6 text-sm text-[#181211] flex items-center gap-1.5">
                <Icon icon="mdi:shield-check-outline" width={14} />
                Need help? Contact our support team.
            </p>
        </div>
    );
};

export default CheckEmailPage;
