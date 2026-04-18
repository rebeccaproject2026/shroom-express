import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Step1Personal from './steps/Step1Personal';
import Step2Location from './steps/Step2Location';
import Step3Account from './steps/Step3Account';
import CustomerLivePreview from './steps/CustomerLivePreview';
import CustomerCompletionStatus from './steps/CustomerCompletionStatus';

const AddCustomer = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Inventory", path: "/superadmin/inventory/all" },
        { label: "Add Customer" }
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: 'Male',
        streetAddress: '',
        city: '',
        province: '',
        postalCode: '',
        country: '',
        deliveryPreference: 'Express',
        preferredStore: 'Forest Oasis',
        preferredProduct: 'Micro Dose Caps 30mg',
        promoCode: '',
        sendWelcomeEmail: true,
        enableSMSUpdates: false,
        marketingEmails: true,
        internalNotes: '',
        location: '',
        preferences: []
    });

    const steps = [
        { id: 1, label: 'Personal Info' },
        { id: 2, label: 'Location' },
        { id: 3, label: 'Account' }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <Step1Personal formData={formData} setFormData={setFormData} />;
            case 2: return <Step2Location formData={formData} setFormData={setFormData} />;
            case 3: return <Step3Account formData={formData} setFormData={setFormData} />;
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col font-manrope animate-in fade-in duration-700">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Top Header Section */}
            <div className="shrink-0 space-y-4 mb-5 font-manrope">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Add New Customer</h1>
                        <p className="text-[#475569] font-medium text-sm">Fill in the customer details across 3 steps. Required fields are marked with a red asterisk.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-7 py-2.5 bg-white border border-[#E8E8E8] rounded-md text-[14px] font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95">
                            Save as Draft
                        </button>
                        <button className="px-2 py-2.5 bg-[#EA3D2A] text-white rounded-md text-[14px] font-bold shadow-[0px_10px_15px_-3px_#EA3D2A55] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95">
                            <Icon icon="mdi:account-plus" width="20" />
                            Publish Customer
                        </button>
                    </div>
                </div>

                {/* Stepper Header Box */}
                <div className="bg-white border border-[#BDBDD2] rounded-md p-2 shadow-sm overflow-hidden flex items-center justify-center">
                    <div className="flex items-center gap-0 w-full max-w-4xl justify-center pt-2">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div
                                    className="flex flex-col items-center gap-2 px-2 shrink-0 first:pl-0 last:pr-0 cursor-pointer hover:opacity-80 transition-all font-manrope"
                                    onClick={() => setCurrentStep(step.id)}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[15px] font-bold transition-all border-2 ${currentStep === step.id
                                        ? 'bg-[#EA3D2A] text-white border-[#EA3D2A]'
                                        : currentStep > step.id
                                            ? 'bg-[#219653] text-white border-[#219653]'
                                            : 'bg-white text-[#BABABA] border-[#BDBDD2]'
                                        }`}>
                                        {currentStep > step.id ? <Icon icon="lucide:check" width="18" /> : step.id}
                                    </div>
                                    <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${currentStep === step.id ? 'text-[#EA3D2A]' : 'text-[#475569]'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-[4px] w-full max-w-[180px] rounded-full -translate-y-2 mx-1 ${currentStep > step.id ? 'bg-[#219653]' : 'bg-[#E2E8F0]'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-6 overflow-y-auto hide-scrollbar pb-10">
                {/* Left Form Section */}
                <div className="space-y-6">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {renderStepContent()}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-2">
                        <button
                            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                            disabled={currentStep === 1}
                            className="px-6 py-2.5 bg-white shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] text-sm font-semibold text-[#475569] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 rounded-md"
                        >
                            <Icon icon="lucide:arrow-left" width="16" />
                            Previous
                        </button>

                        <div className="flex items-center gap-4">
                            <button className="px-7 py-2.5 bg-white rounded-md shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] text-sm font-semibold text-[#475569] hover:bg-gray-50 transition-all">
                                Save Draft
                            </button>
                            <button
                                onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
                                className="px-5 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                            >
                                {currentStep === 3 ? (
                                    <>
                                        <Icon icon="lucide:check" width="18" />
                                        Save Customer
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <Icon icon="lucide:arrow-right" width="16" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-0 h-fit">
                    <CustomerLivePreview formData={formData} currentStep={currentStep} />
                    <CustomerCompletionStatus formData={formData} currentStep={currentStep} />
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;
