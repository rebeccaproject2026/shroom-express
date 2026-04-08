import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Step1CompanyInfo from './steps/Step1CompanyInfo';
import Step2Location from './steps/Step2Location';
import Step3Commercial from './steps/Step3Commercial';
import Step4ContactsDocs from './steps/Step4ContactsDocs';
import SupplierLivePreview from './steps/SupplierLivePreview';
import SupplierCompletionStatus from './steps/SupplierCompletionStatus';
import SupplierSuccessState from './steps/SupplierSuccessState';

const AddSupplier = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        logo: null,
        companyName: '',
        tagline: '',
        category: '',
        website: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        province: '',
        postalCode: '',
        country: 'Canada',
        latitude: '',
        longitude: '',
        paymentTerms: '',
        leadTime: '',
        minOrder: '',
        reorderBuffer: '',
        taxId: '',
        requireCOA: true,
        preferredSupplier: false,
        autoReorder: true,
        adminNotes: '',
        contacts: [
            { name: '', role: '', email: '', phone: '' }
        ],
        docLicense: false,
        docCOA: false,
        docInsurance: false,
        docHealth: false
    });

    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Suppliers", path: "/superadmin/suppliers/all" },
        { label: "Add Suppliers" }
    ];

    const steps = [
        { id: 1, label: 'Company Info' },
        { id: 2, label: 'Location' },
        { id: 3, label: 'Commercial' },
        { id: 4, label: 'Contacts & Docs' },
    ];

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setCurrentStep(1);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <Step1CompanyInfo formData={formData} setFormData={setFormData} />;
            case 2: return <Step2Location formData={formData} setFormData={setFormData} />;
            case 3: return <Step3Commercial formData={formData} setFormData={setFormData} />;
            case 4: return <Step4ContactsDocs formData={formData} setFormData={setFormData} />;
            default: return null;
        }
    };

    if (isSubmitted) {
        return (
            <div className="h-full flex flex-col font-manrope">
                <Breadcrumbs items={breadcrumbItems} />

                <SupplierSuccessState onReset={handleReset} />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col font-manrope animate-in fade-in duration-700 overflow-hidden">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="shrink-0 space-y-4 mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold text-[#181211]">Add New Supplier</h1>
                        <p className="text-[#475569] font-medium text-sm">Fill in the supplier details across 4 steps. All required fields must be completed before submission.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-7 py-2.5 bg-white border border-[#E8E8E8] rounded-md text-[14px] font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95">
                            Save as Draft
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-7 py-2.5 bg-[#EA3D2A] text-white rounded-md text-[14px] font-bold shadow-[0px_10px_15px_-3px_#EA3D2A55] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                        >
                            Submit Supplier
                        </button>
                    </div>
                </div>

                {/* Stepper Header Box */}
                <div className="bg-white border border-[#BDBDD2] rounded-md p-2 shadow-sm overflow-hidden flex items-center justify-center">
                    <div className="flex items-center gap-0 w-full max-w-4xl justify-center pt-2">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div
                                    className="flex flex-col items-center gap-2 px-2 shrink-0 first:pl-0 last:pr-0 cursor-pointer hover:opacity-80 transition-all"
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
                                    <div className={`h-[4px] w-full max-w-[150px] rounded-full -translate-y-2 mx-1 ${currentStep > step.id ? 'bg-[#219653]' : 'bg-[#E2E8F0]'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {renderStepContent()}
                        </div>

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
                                <button className="px-7 py-2.5 bg-white  rounded-md  shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] text-sm font-semibold text-[#475569] hover:bg-gray-50 transition-all">
                                    Save Draft
                                </button>
                                <button
                                    onClick={() => currentStep === 4 ? handleSubmit() : setCurrentStep(prev => Math.min(4, prev + 1))}
                                    className="px-5 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                                >
                                    {currentStep === 4 ? 'Submit Supplier' : 'Continue'}
                                    {currentStep === 4 ? <Icon icon="mdi:store-plus" width="18" /> : <Icon icon="lucide:arrow-right" width="16" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <SupplierLivePreview
                            formData={formData}
                            currentStep={currentStep}
                        />
                        <SupplierCompletionStatus
                            currentStep={currentStep}
                            formData={formData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSupplier;
