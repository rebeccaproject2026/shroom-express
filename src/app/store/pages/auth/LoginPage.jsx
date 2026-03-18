import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import LoginBg from '../../assets/images/loginbg.svg';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepLogged, setKeepLogged] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/store/myaccount');
    };

    return (
        <div className="min-h-screen bg-[#F9F6F4] flex items-center justify-center p-6">
            <div className="grid grid-cols-2 w-full max-w-[1340px] border border-[#F1F5F9] rounded-2xl overflow-hidden shadow-xl">

                {/* Left panel */}
                <div
                    className="relative flex flex-col justify-center items-center pb-12 px-10 min-h-[580px]"
                    style={{
                        backgroundImage: `url(${LoginBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {/* dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/10 rounded-none" />

                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                        <Icon icon="mdi:head-question-outline" className="text-[#E93E2B] scale-x-[-1]" width={52} height={52} />
                    </div>

                    {/* Text */}
                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-bold text-[#181211] mb-3">Elevate Your Experience</h2>
                        <p className="text-sm text-[#181211] leading-relaxed">
                            Access the world's most curated selection<br />
                            of premium cannabis and functional<br />
                            mushroom products.
                        </p>
                    </div>
                </div>

                {/* Right panel */}
                <div className="flex-1 bg-white p-16 flex flex-col justify-center">
                    <h1 className="text-[26px] font-bold text-[#181211] mb-1.5">Welcome Back</h1>
                    <p className="text-sm text-[#181211] leading-relaxed tracking-wider mb-8">Please enter your credentials to access your account.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Email Address</label>
                            <div className="flex items-center gap-3 border border-[#E5DCDC] rounded-xl px-4 py-3 bg-white focus-within:border-[#E93E2B] transition-colors">
                                <Icon icon="mdi:email-outline" className="text-[#181211] shrink-0" width={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-medium text-[#181211]">Password</label>
                                <button type="button" onClick={() => navigate('/store/forgot-password')} className="text-sm font-semibold text-[#E93E2B] hover:underline">
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="flex items-center gap-3 border border-[#E5DCDC] rounded-xl px-4 py-3 bg-white focus-within:border-[#E93E2B] transition-colors">
                                <Icon icon="mdi:lock-outline" className="text-[#181211] shrink-0" width={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent"
                                />
                                <button type="button" onClick={() => setShowPassword(p => !p)} className="text-[#181211]">
                                    <Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={20} />
                                </button>
                            </div>
                        </div>

                        {/* Keep me logged in */}
                        <label className="flex items-center gap-2.5 cursor-pointer ml-2">
                            <input
                                type="checkbox"
                                checked={keepLogged}
                                onChange={e => setKeepLogged(e.target.checked)}
                                className="w-4 h-4 rounded border-[#E5DCDC] accent-[#E93E2B]"
                            />
                            <span className="text-sm font-medium text-[#181211]">Keep me logged in</span>
                        </label>

                        {/* Sign In button */}
                        <button
                            type="submit"
                            className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Register link */}
                    <p className="text-sm text-[#886663] text-center mt-8 flex items-center justify-center gap-1.5">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/store/register')}
                            className="text-[#E93E2B] font-bold hover:underline cursor-pointer"
                        >
                            Register Now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
