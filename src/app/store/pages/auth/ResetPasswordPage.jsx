import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/store/login');
    };

    return (
        <div className="min-h-screen bg-[#F9F6F4] flex flex-col items-center justify-center p-6 my-10">
            {/* Card */}
            <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl px-8 py-8">

                {/* Lock icon circle */}
                <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-[#fde8e8] flex items-center justify-center">
                        <Icon icon="mdi:lock-reset" className="text-[#E93E2B]" width={32} height={32} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-[#181211] mb-2 text-center">Reset Your Password</h1>
                <p className="text-sm text-[#555] leading-relaxed mb-8 text-center">
                    Your new password must be different from your previously used passwords.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* New Password */}
                    <div>
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">New Password</label>
                        <div className="flex items-center gap-3 border-2 border-[#00000000] rounded-full px-4 py-3.5 bg-[#F8F6F6] focus-within:border-[#E93E2B] transition-colors">
                            <Icon icon="mdi:lock-outline" className="text-[#94A3B8] shrink-0" width={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter at least 8 characters"
                                className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent"
                            />
                            <button type="button" onClick={() => setShowPassword(p => !p)} className="text-[#94A3B8] hover:text-[#181211]">
                                <Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={20} />
                            </button>
                        </div>
                       
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Confirm Password</label>
                        <div className="flex items-center gap-3 border-2 border-[#00000000] rounded-full px-4 py-3.5 bg-[#F8F6F6] focus-within:border-[#E93E2B] transition-colors">
                            <Icon icon="mdi:lock-outline" className="text-[#94A3B8] shrink-0" width={18} />
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent"
                            />
                            <button type="button" onClick={() => setShowConfirm(p => !p)} className="text-[#94A3B8] hover:text-[#181211]">
                                <Icon icon={showConfirm ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={20} />
                            </button>
                        </div>
                        
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-[#F8F6F6] rounded-2xl px-5 py-4 flex flex-col gap-3">
                        <p className="text-xs font-bold tracking-widest text-[#94A3B8] uppercase mb-1">Password Requirements</p>
                        {[
                            { label: 'At least 8 characters long', met: password.length >= 8 },
                            { label: 'One uppercase letter (A–Z)', met: /[A-Z]/.test(password) },
                            { label: 'One number or special character', met: /[0-9!@#$%^&*]/.test(password) },
                        ].map((req, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {req.met ? (
                                    <Icon icon="mdi:check-circle" className="text-green-500 shrink-0" width={20} />
                                ) : (
                                    <Icon icon="mdi:circle-outline" className="text-[#C4C4C4] shrink-0" width={20} />
                                )}
                                <span className={`text-sm ${req.met ? 'text-[#181211]' : 'text-[#6B7280]'}`}>{req.label}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-4 rounded-xl transition-colors text-base flex items-center justify-center gap-2 mt-1"
                    >
                        Update Password <Icon icon="mdi:arrow-right" width="24" height="24" />  
                    </button>
                </form>

                <div className="flex items-center justify-center mt-14">
                   <p className='text-sm text-[#64748B]'>
                    Having trouble? <a href="/contact-support" className="text-[#E93E2B] text-sm font-semibold hover:text-red-600"> Contact Support</a>
                   </p>
                </div>
            </div>

        </div>
    );
};

export default ResetPasswordPage;
