/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import heroImg from '../assets/images/becamdriver.png';
import journeyImg from '../assets/images/becamdriverfooter.png';
import profileImg from '../assets/images/profile.jpg';
import { useNavigate } from 'react-router-dom';

import Step1PersonalInfo from './drivers/steps/Step1PersonalInfo';
import Step2VehicleInfo from './drivers/steps/Step2VehicleInfo';

const BecomeDriver = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        homeAddress: '',
        licenseFront: '',
        licenseBack: '',
        vehicleType: 'Vehicle',
        licensePlate: '',
        modelYear: '',
        workingDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        dayHours: {
            'MON': { open: '08:00', close: '20:00' },
            'TUE': { open: '08:00', close: '20:00' },
            'WED': { open: '08:00', close: '20:00' },
            'THU': { open: '08:00', close: '20:00' },
            'FRI': { open: '08:00', close: '20:00' },
        },
        emergencyContactName: '',
        emergencyRelationship: '',
        emergencyPhoneNumber: ''
    });
    const navigate = useNavigate();
    const scrollRef = React.useRef(null);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentStep]);

    const steps = [
        { id: 1, label: 'Personal Info', component: Step1PersonalInfo },
        { id: 2, label: 'Vehicle & Availability', component: Step2VehicleInfo },
    ];

    const canNext = () => {
        if (currentStep === 1) {
            return formData.firstName && formData.lastName && formData.phoneNumber && formData.email && formData.homeAddress;
        }
        if (currentStep === 2) {
            return formData.licensePlate && formData.modelYear && formData.workingDays.length > 0;
        }
        return true;
    };

    const ActiveStepComponent = steps.find(s => s.id === currentStep)?.component || Step1PersonalInfo;

    return (
        <div className="w-full overflow-x-hidden font-sans bg-white">
            {/* Hero & Registration Section */}
            <section
                className="py-2 md:py-4 relative overflow-hidden bg-cover bg-no-repeat bg-center lg:bg-right"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="max-w-[1450px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center justify-center">
                        {/* Header & Title Section */}
                        <div className="mb-4 text-center flex flex-col items-center">
                            <h1 className="text-3xl font-bold text-[#111827] mb-0.5">Become Driver Registration</h1>
                            <p className="text-[#6B7280] text-sm max-w-xl">Complete the steps below to start your journey with us as a delivery partner.</p>
                        </div>

                        {/* Stepper Header Box (Outside Card) */}
                        <div className="w-full max-w-[900px] mb-4 bg-white/80 backdrop-blur-sm border border-[#BDBDD2] rounded-md py-1.5 px-5 shadow-sm overflow-hidden flex items-center justify-center">
                            <div className="flex items-center gap-0 w-full max-w-4xl justify-center">
                                {steps.map((step, index) => (
                                    <React.Fragment key={step.id}>
                                        <div
                                            className="flex flex-col items-center gap-1 px-2 shrink-0 cursor-pointer hover:opacity-80 transition-all"
                                            onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                                        >
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-all border-2 ${currentStep === step.id
                                                ? 'bg-[#E93E2B] text-white border-[#E93E2B]'
                                                : currentStep > step.id
                                                    ? 'bg-[#219653] text-white border-[#219653]'
                                                    : 'bg-white text-[#BABABA] border-[#BDBDD2]'
                                                }`}>
                                                {currentStep > step.id ? <Icon icon="lucide:check" width="16" /> : step.id}
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase transition-colors ${currentStep === step.id ? 'text-[#E93E2B]' : 'text-gray-500'}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`h-[3px] w-full max-w-[180px] rounded-full -translate-y-2.5 mx-1 ${currentStep > step.id ? 'bg-[#219653]' : 'bg-[#E2E8F0]'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Form Card (Form Only) */}
                        <div className="w-full max-w-[900px] bg-white/80 backdrop-blur-sm rounded-[20px] overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] border border-[#E93E2B]/10 flex flex-col h-[420px]">
                            {/* Form Content Wrapper */}
                            <div className="flex-1 flex flex-col bg-transparent relative overflow-hidden">
                                {/* Scrollable Fields Area */}
                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto px-10 md:px-12 custom-scrollbar pt-10 pb-8"
                                >
                                    <ActiveStepComponent formData={formData} setFormData={setFormData} />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons (Outside Card) */}
                        <div className="w-full max-w-[900px] mt-8 flex items-center justify-between font-manrope gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    if (currentStep === 1) {
                                        navigate('/store');
                                    } else {
                                        setCurrentStep(s => s - 1);
                                    }
                                }}
                                className="px-8 py-2.5 bg-white border border-gray-200 text-[#475569] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 active:scale-95 shadow-sm"
                            >
                                <Icon icon={currentStep === 1 ? 'lucide:x' : 'lucide:arrow-left'} width={18} />
                                {currentStep === 1 ? 'Cancel' : 'Previous'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (currentStep === steps.length) {
                                        alert("Registration Complete!");
                                        navigate('/store');
                                    } else {
                                        setCurrentStep(s => s + 1);
                                    }
                                }}
                                disabled={!canNext()}
                                className="px-8 py-2.5 bg-[#E93E2B] text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#E93E2B]/20"
                            >
                                {currentStep === steps.length ? 'Complete Registration' : 'Save & Continue'}
                                <Icon icon={currentStep === steps.length ? 'lucide:check' : 'lucide:arrow-right'} width={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-2 mb-8 mt-5">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-[#111827]">Why Join <span className="text-[#E93E2B]">Shroom Express?</span></h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-68">
                        {[
                            { title: 'High Earnings', desc: 'Earn more with every successful delivery.', icon: 'solar:wallet-outline' },
                            { title: 'Flexible Hours', desc: 'Work on your own schedule and enjoy complete freedom.', icon: "mdi:alarm" },
                            { title: 'Work Near You', desc: 'Get orders in your nearby area and save travel time.', icon: 'mdi:map-marker-outline' },
                            { title: 'Performance Rewards', desc: 'Top performers receive special rewards and exciting bonuses.', icon: 'solar:medal-ribbon-star-linear' },
                        ].map((benefit, i) => (
                            <div key={i} className="bg-[#FCF3F3] border border-[#F9CABC] rounded-[35px] p-5 text-center hover:border-[#FFE4E1] transition-all group">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center shadow-[0px_0px_27px_0px_#E93E2B2B] text-2xl sm:text-3xl mx-auto mt-4 sm:mb-6 transition-transform">
                                    <Icon icon={benefit.icon} className="text-[#E93E2B]" width={28} height={28} />
                                </div>
                                <h3 className="text-[#181211] text-lg font-extrabold mb-2.5 tracking-tight px-1.5 leading-tight">{benefit.title}</h3>
                                <p className="text-[#886663] text-sm sm:text-[16px] max-w-65 mx-auto leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section
                className="relative w-full min-h-[342px] mt-5 flex items-center bg-cover bg-center"
                style={{ backgroundImage: `url(${journeyImg})` }}
            >
                <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-18">
                    <div className="max-w-2xl text-white">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight leading-[1.1]">
                            Ready to start your Journey?
                        </h2>
                        <p className="text-base text-[#FFFFFF] mb-10 leading-relaxed max-w-lg font-medium">
                            Join thousands of delivery partners who are earning and growing with Shroom Express.
                        </p>
                        <div className="flex flex-wrap items-center gap-10 sm:gap-20">
                            <div className="flex items-center gap-3">
                                <Icon icon="pepicons-pencil:people" className="text-4xl mb-3" />
                                <div>
                                    <span className="block text-2xl font-bold">10K+</span>
                                    <span className="text-sm md:text-base text-[#FFFFFF] font-medium">Active Partners</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon="si:city-line" className="text-4xl mb-3" />
                                <div>
                                    <span className="block text-2xl font-bold">20+</span>
                                    <span className="text-sm md:text-base text-[#FFFFFF] font-medium">Cities Covered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BecomeDriver;
