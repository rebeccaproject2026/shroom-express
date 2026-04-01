import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/store/check-email');
    };

    return (
        <div className="bg-[#F9F6F4] flex flex-col items-center pt-10 sm:pt-16 md:pt-18 p-4 sm:p-10">
            {/* Card */}
            <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl p-5 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2 sm:mb-3">Forgot Password?</h1>
                <p className="text-[12.5px] sm:text-sm text-[#181211] leading-relaxed mb-4 sm:mb-6">
                    No worries, it happens. Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="text-sm font-semibold text-[#0F172A] mb-1.5 block">Email Address</label>
                        <div className="flex items-center gap-3 border border-[#E5DCDC] rounded-xl px-4 py-3.5 bg-white focus-within:border-[#E93E2B] transition-colors">
                            <Icon icon="mdi:email-outline" className="text-[#886663] shrink-0" width={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3.5 cursor-pointer rounded-xl transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                        Send Reset Link →
                    </button>
                </form>

                <div className="flex items-center justify-center mt-4 sm:mt-8">
                    <button
                        onClick={() => navigate('/store/login')}
                        className="flex items-center gap-2 text-sm text-[#181211] font-medium cursor-pointer hover:text-[#E93E2B] transition-colors"
                    >
                        <Icon icon="mdi:arrow-left" width={16} />
                        Back to Login
                    </button>
                </div>
            </div>

            {/* Footer text */}
            <p className="mt-6 text-xs font-medium tracking-wider text-[#181211] uppercase">
                Secure Reset Protocol
            </p>
        </div>
    );
};

export default ForgotPasswordPage;
