import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Input from '../../../components/common/Input';


// Sub-components for better maintainability
const AccountStep = ({ storeId, storeName, showPassword, setShowPassword, onContinue, navigate }) => (
    <>
        {/* Combined Success Card */}
        <div className="w-full max-w-[600px] bg-transparent border border-[#FEE4E2] rounded-[24px] overflow-hidden mb-5 ">
            {/* Top Section: Success Message */}
            <div className="bg-[#FEE4E2] p-6 flex items-start gap-4">
                <div className="">
                    <Icon icon="hugeicons:store-verified-02" className="text-[#F04438]" width="55" />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#1E293B] mb-1">Store Created Successfully!</h2>
                    <p className="text-sm font-regular text-[#1E293B]">
                        New Store(#{storeId}) has been added and is pending approval.
                    </p>
                </div>
            </div>

            {/* Bottom Section: Store Preview */}
            <div className="p-5 bg-transparent">
                <div className="border border-[#CBD5E1] rounded-md p-3 flex items-start gap-3 bg-white">
                    <div className="w-15 h-15 bg-[#F8FAFC] rounded-md overflow-hidden border border-[#E2E8F0]">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-13fd7431c547?w=100&h=100&fit=crop"
                            alt="Store"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 text-start">
                        <h3 className="text-base font-semibold text-[#1E293B] mt-1 mb-1">{storeName}</h3>
                        <p className="text-xs font-regular text-[#F04438]">No login set up yet</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Create Account Section */}
        <div className="w-full max-w-[600px] bg-white border border-[#E93E2B]/5 rounded-[24px] p-8 shadow-[0px_25px_50px_-12px_#18121140]">
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-[#181211] mb-2">Create Account</h1>
                <p className="text-sm font-regular text-[#181211] leading-relaxed">
                    Join our exclusive community for curated cannabis and mushroom products.
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onContinue(); }}>
                {/* Email Address */}
                <Input
                    label="Email Address"
                    type="email"
                    value="store@example.com"
                    placeholder="john@example.com"
                    leftIcon={<Icon icon="mdi:email-outline" width="20" />}
                    required
                    labelClassName="font-bold text-[#344054]"
                    className="rounded-xl !bg-white border-[#D0D5DD] placeholder-[#667085] "
                />

                {/* Passwords Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value="password123"
                        placeholder="••••••••"
                        leftIcon={<Icon icon="mdi:lock-outline" width="20" />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="flex items-center text-[#667085] hover:text-[#344054]"
                            >
                                <Icon icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} width="20" />
                            </button>
                        }
                        required
                        labelClassName="font-bold text-[#344054]"
                        className="rounded-xl !bg-white border-[#D0D5DD] placeholder-[#667085]"
                    />

                    <Input
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        value="password123"
                        placeholder="••••••••"
                        leftIcon={<Icon icon="mdi:lock-outline" width="20" />}
                        required
                        labelClassName="font-bold text-[#344054]"
                        className="rounded-xl !bg-white border-[#D0D5DD] placeholder-[#667085] "
                    />
                </div>

                {/* Age Checkbox */}
                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="age-confirm"
                        className="mt-1 w-5 h-5 accent-[#EA3D2A] border-gray-300 rounded focus:ring-[#EA3D2A]"
                        required
                    />
                    <label htmlFor="age-confirm" className="text-sm font-medium text-[#181211] leading-snug">
                        I confirm that I am <span className="font-bold text-[#101828]">21 years of age or older</span> and agree to the <span className="text-[#E93E2B] cursor-pointer underline">Terms of Service</span> and <span className="text-[#E93E2B] cursor-pointer underline">Privacy Policy</span>.
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-4 bg-[#EA3D2A] text-white rounded-xl text-base font-bold shadow-lg hover:bg-[#D43424] transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                    Create Account
                    <Icon icon="lucide:arrow-right" width="20" />
                </button>

                {/* Footer */}
                <p className="text-center text-sm font-medium text-[#181211]">
                    Already have an account? <span className="text-[#E93E2B] font-bold cursor-pointer hover:underline" onClick={() => navigate('/login')}>Login here</span>
                </p>
            </form>
        </div>
    </>
);

const OtpStep = ({ otp, handleOtpChange, onVerify }) => (
    <div className="w-full max-w-[580px] bg-white border border-[#E93E2B]/5 rounded-[24px] p-8 shadow-[0px_25px_50px_-12px_#18121140]">
        <div className="mb-6 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-[#181211] mb-2">Verify email address</h1>
            <p className="text-sm font-regular text-[#181211] leading-relaxed">
                We sent a 6-digit code to you email address
            </p>
        </div>

        <div className="space-y-8">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-[#181211]">OTP</label>
                <div className="flex items-center justify-between gap-1 ">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="password"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleOtpChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            className="w-20 h-14 mt-2 text-center text-xl font-bold border-2 border-[#E8E8E8] rounded-md outline-none transition-all"
                        />
                    ))}
                </div>
            </div>

            <div className="text-center mb-5">
                <p className="text-sm font-medium text-[#181211]">
                    Didn't receive it? <span className="text-[#E93E2B] font-bold cursor-pointer hover:underline">Resend OTP</span>
                </p>
            </div>

            <button
                onClick={onVerify}
                className="w-full py-4 bg-[#EA3D2A] text-white rounded-xl text-base font-bold shadow-lg hover:bg-[#D43424] transition-all flex items-center justify-center gap-2 active:scale-98"
            >
                Verify & Save login
                <Icon icon="lucide:arrow-right" width="20" />
            </button>
        </div>
    </div>
);

const FinalStep = ({ navigate }) => (
    <div className="w-full max-w-[580px] bg-white border border-[#E93E2B]/5 rounded-[24px] p-8 shadow-[0px_25px_50px_-12px_#18121140]">
        <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-[#181211] mb-2">Login details saved!</h1>
            <p className="text-sm font-regular text-[#181211] leading-relaxed">
                Email verified & credentials set.
            </p>
        </div>

        <div className="space-y-4 mb-10">
            {[
                'Email: store@example.com',
                'Email Verified',
                'Password set - Store admin access',
                'Credentials sent to owner'
            ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5">
                        <Icon icon="icon-park-solid:check-one" className="text-[#219653]" width="20" />
                    </div>
                    <span className="text-sm font-regular text-[#1E293B]">{item}</span>
                </div>
            ))}
        </div>

        <button
            onClick={() => navigate('/store')}
            className="w-full py-4 bg-[#EA3D2A] text-white rounded-xl text-base font-bold shadow-lg hover:bg-[#D43424] transition-all flex items-center justify-center gap-2 active:scale-98"
        >
            Go to store dashboard
            <Icon icon="lucide:arrow-right" width="20" />
        </button>
    </div>
);

const StoreSuccessState = ({ onReset }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState('account'); // 'account', 'otp', 'final'
    const [otp, setOtp] = React.useState(['', '', '', '', '', '']);

    const storeId = localStorage.getItem('currentStoreId') || "SE-00032";
    const storeName = localStorage.getItem('currentStoreName') || "Store name";

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    // If user is logged in, show the existing Success Dashboard UI
    if (user) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[70vh] animate-in fade-in zoom-in duration-500 font-manrope">
                {/* Success Icon */}
                <div className="relative mb-6">
                    <div className="flex items-center justify-center text-[#219653]">
                        <Icon icon="hugeicons:store-verified-02" width="60" />
                    </div>
                </div>

                {/* Success Text */}
                <div className="text-center space-y-2 mb-8">
                    <h2 className="text-3xl font-bold text-[#181211]">Store Created Successfully!</h2>
                    <p className="text-[16px] font-medium text-[#475569]">
                        <span className="text-[#181211] font-bold">{storeName}</span> has been added and is pending approval.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/store/storeslists/${storeId}`)}
                        className="px-6 py-3 bg-[#EA3D2A] text-white rounded-xl text-sm font-bold shadow-[0px_4px_10px_rgba(234,61,42,0.3)] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                    >
                        View Store
                        <Icon icon="lucide:arrow-right" width="18" />
                    </button>
                    {/* <button
                        onClick={() => navigate('/inventory')}
                        className="px-6 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl text-sm font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
                    >
                        Add Inventory
                        <Icon icon="lucide:plus" width="18" />
                    </button> */}
                </div>
            </div>
        );
    }

    // If NOT logged in, show the Create Account UI or OTP UI
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-10 animate-in fade-in duration-700 font-manrope">
            {currentStep === 'account' && (
                <AccountStep
                    storeId={storeId}
                    storeName={storeName}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    onContinue={() => setCurrentStep('otp')}
                    navigate={navigate}
                />
            )}

            {currentStep === 'otp' && (
                <OtpStep
                    otp={otp}
                    handleOtpChange={handleOtpChange}
                    onVerify={() => setCurrentStep('final')}
                />
            )}

            {currentStep === 'final' && (
                <FinalStep navigate={navigate} />
            )}
        </div>
    );
};

export default StoreSuccessState;

