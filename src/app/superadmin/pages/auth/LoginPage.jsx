/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import Input from '../../components/common/Input';
import { login } from '../../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError('');
            const response = await login({ email, password });
            if (response.data.status) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                navigate('/superadmin/dashboard');
            } else {
                setError(response.data.error || 'Invalid credentials');
            }
        } catch (e) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{
                background: 'linear-gradient(135deg, rgba(234, 61, 42, 0.05) 0%, rgba(234, 61, 42, 0) 50%, rgba(234, 61, 42, 0.1) 100%)'
            }}
        >
            {/* Logo */}
            <div className="mb-8">
                <img src={Logo} alt="Shroom Express" className="h-16" />
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.15)] border border-[#E2E8F0] p-8 sm:p-10 w-full max-w-[33rem]">
                <h1 className="text-2xl font-semibold text-[#0F172A] mb-1">Secure Admin Access</h1>
                <p className="text-sm text-[#64748B] font-medium mb-8">
                    Enter your enterprise credentials to access the delivery dashboard.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Address */}
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="admin@deliveryplatform.com"
                        leftIcon={<Icon icon="mdi:email-outline" width={20} />}
                    />

                    {/* Password */}
                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            leftIcon={<Icon icon="mdi:lock-outline" width={20} />}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={20} />
                                </button>
                            }
                        />
                        <button
                            type="button"
                            className="absolute right-0 top-0 text-sm font-semibold text-[#E93E2B] hover:text-red-600 transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md border border-red-100 flex items-center gap-2">
                            <Icon icon="mdi:alert-circle-outline" width={18} />
                            {error}
                        </div>
                    )}

                    {/* Sign In button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#E93E2B] hover:bg-[#D33624] text-white font-bold py-4 rounded-md transition-all shadow-lg shadow-[#E93E2B]/20 flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Icon icon="mdi:loading" className="animate-spin" width={20} />
                        ) : (
                            <Icon icon="mdi:login-variant" width={20} className="group-hover:translate-x-1 transition-transform" />
                        )}
                        {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
                    </button>
                </form>
                <div className='border border-[#F1F5F9] mt-8' />
                {/* Footer Links */}
                <div className="mt-5 flex items-center justify-center gap-6 text-sm font-medium 
                text-[#64748B]">

                    <button className="hover:text-[#E93E2B] transition-colors">Support Center</button>
                    <button className="hover:text-[#E93E2B] transition-colors">Security Policy</button>
                    <button className="hover:text-[#E93E2B] transition-colors">System Status</button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Icon icon="mdi:shield-check-outline" width={14} />
                ENCRYPTED & SECURE SESSION
            </div>
        </div>
    );
};

export default LoginPage;
