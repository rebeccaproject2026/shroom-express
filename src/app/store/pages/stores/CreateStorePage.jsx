import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../context/StoresContext";

// Import Step Components
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2Location from "./steps/Step2Location";
import Step3Operations from "./steps/Step3Operations";
import Step4ProductsTags from "./steps/Step4ProductsTags";
import Step5MediaDocs from "./steps/Step5MediaDocs";
import StoreSuccessState from "./steps/StoreSuccessState";

const CreateStorePage = () => {
    const navigate = useNavigate();
    const { addStore, loading } = useStores();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);

    // Scroll to top when step changes or success state reached
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep, isSuccess]);

    const [formData, setFormData] = useState({
        // Step 1: Owner Details
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        contactNumber: '',
        // Step 2: Locations
        locations: [
            {
                isExpanded: true,
                website: '',
                socialPlatform: [],
                socialLinks: {},
                storeName: '',
                category: [],
                description: '',
                streetAddress: '',
                unitNumber: '',
                city: '',
                province: '',
                postalCode: '',
                country: 'Canada',
                latitude: '43.6532',
                longitude: '-79.3832',
                storeEmail: '',
                storePhone: '',
            }
        ],
        // Step 3: Operations
        sameDayDelivery: true,
        sameDayMinAmount: '50.00',
        sameDayFee: '15.00',
        sameDayFreeOver: '120.00',
        sameDayEta: 'Under 1 hour',
        sameDayDeliveredBy: 'Self Drivers',
        sameDayCoverage: { cities: [], radius: 60 },
        sameDayOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        sameDayOpeningTime: '09:00 AM',
        sameDayClosingTime: '09:00 PM',

        expressDelivery: false,
        expressMinAmount: '120.00',
        expressFee: '15.00',
        expressEta: '1-2 hrs',
        expressDeliveredBy: 'Shroom Express Drivers',
        expressCoverage: { cities: [], radius: 60 },
        expressOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        expressOpeningTime: '09:00 AM',
        expressClosingTime: '09:00 PM',

        shippingMailOrder: false,
        shippingFee: '15.00',
        shippingFreeOver: '120.00',
        shippingEta: '2-5 business days',
        shippingCouriers: [],
        shippingAreas: [],
        processingDays: [],
        shippingOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

        autoAcceptOrders: true,
        featuredStore: false,
        setStoreAsActive: true,
        // Step 4: Products & Tags
        productTypes: [],
        storeTags: [],
        licenseNumber: '',
        // Step 5: Media
        logo: null,
        banner: null,
    });

    const steps = [
        { id: 1, label: 'Owner Details', component: Step1BasicInfo },
        { id: 2, label: 'Store Information & Location', component: Step2Location },
        { id: 3, label: 'Operations', component: Step3Operations },
        { id: 4, label: 'Products', component: Step4ProductsTags },
        { id: 5, label: 'Media', component: Step5MediaDocs },
    ];

    const canNext = () => {
        if (currentStep === 1) {
            return formData.firstName && formData.email && formData.phone && formData.role && formData.contactNumber;
        }
        if (currentStep === 2) {
            const loc = formData.locations[0];
            if (!loc) return false;
            return (
                loc.storeName &&
                loc.category?.length > 0 &&
                loc.streetAddress &&
                loc.city &&
                loc.postalCode &&
                loc.province &&
                loc.storeEmail &&
                loc.storePhone &&
                loc.description
            );
        }
        if (currentStep === 3) {
            return formData.sameDayDelivery || formData.expressDelivery || formData.shippingMailOrder;
        }
        if (currentStep === 4) {
            return formData.productTypes?.length > 0 && formData.licenseNumber;
        }
        if (currentStep === 5) {
            return formData.logo && formData.banner;
        }
        return true;
    };

    const handleSubmit = async () => {
        try {
            const newStoreId = await addStore(formData);
            localStorage.setItem('currentStoreId', newStoreId);
            localStorage.setItem('currentStoreName', formData.locations[0]?.storeName || "Your Store");
            setIsSuccess(true);
        } catch (error) {
            console.error("Failed to create store:", error);
        }
    };

    const ActiveStepComponent = steps.find(s => s.id === currentStep)?.component || Step1BasicInfo;

    if (isSuccess) {
        return (
            <div className="bg-[#FAF8F5] min-h-screen pt-8 sm:pt-10 px-4 pb-12">
                <div className="max-w-4xl mx-auto">
                    <StoreSuccessState onReset={() => {
                        setIsSuccess(false);
                        setCurrentStep(1);
                        setFormData({
                            // Reset form data to initial state
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            role: '',
                            contactNumber: '',
                            locations: [
                                {
                                    isExpanded: true,
                                    website: '',
                                    socialPlatform: [],
                                    socialLinks: {},
                                    storeName: '',
                                    category: [],
                                    description: '',
                                    streetAddress: '',
                                    unitNumber: '',
                                    city: '',
                                    province: '',
                                    postalCode: '',
                                    country: 'Canada',
                                    latitude: '43.6532',
                                    longitude: '-79.3832',
                                    storeEmail: '',
                                    storePhone: '',
                                }
                            ],
                            sameDayDelivery: true,
                            sameDayMinAmount: '50.00',
                            sameDayFee: '15.00',
                            sameDayFreeOver: '120.00',
                            sameDayEta: 'Under 1 hour',
                            sameDayDeliveredBy: 'Self Drivers',
                            sameDayCoverage: { cities: [], radius: 60 },
                            sameDayOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            sameDayOpeningTime: '09:00 AM',
                            sameDayClosingTime: '09:00 PM',
                            expressDelivery: false,
                            expressMinAmount: '120.00',
                            expressFee: '15.00',
                            expressEta: '1-2 hrs',
                            expressDeliveredBy: 'Shroom Express Drivers',
                            expressCoverage: { cities: [], radius: 60 },
                            expressOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            expressOpeningTime: '09:00 AM',
                            expressClosingTime: '09:00 PM',
                            shippingMailOrder: false,
                            shippingFee: '15.00',
                            shippingFreeOver: '120.00',
                            shippingEta: '2-5 business days',
                            shippingCouriers: [],
                            shippingAreas: [],
                            processingDays: [],
                            shippingOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            autoAcceptOrders: true,
                            featuredStore: false,
                            setStoreAsActive: true,
                            productTypes: [],
                            storeTags: [],
                            licenseNumber: '',
                            logo: null,
                            banner: null,
                        });
                    }} />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF8F5] min-h-screen pt-8 sm:pt-10 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center text-center gap-4">
                    <button
                        onClick={() => currentStep === 1 ? navigate("/store") : setCurrentStep(s => s - 1)}
                        className="px-6 py-2 bg-white shadow-sm text-sm font-semibold text-[#475569] transition-all flex items-center gap-2 hover:bg-gray-50 rounded-md border border-[#BDBDD2]"
                    >
                        <Icon icon="lucide:arrow-left" width="16" />
                        {currentStep === 1 ? "Cancel" : "Previous"}
                    </button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-[#0F3540] mb-1">Open Your Store</h1>
                        <p className="text-sm text-[#64748B]">Complete the steps below to register your business on our platform.</p>
                    </div>

                    <div className="flex items-center gap-4">


                        <button
                            onClick={() => currentStep === steps.length ? handleSubmit() : setCurrentStep(s => s + 1)}
                            disabled={currentStep === steps.length ? loading : !canNext()}
                            className="px-5 py-2 bg-[#E93E2B] text-white rounded-md text-sm font-semibold shadow-sm hover:bg-[#E93E2B]/90 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Icon icon="line-md:loading-twotone-loop" width="18" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    {currentStep === steps.length ? 'Publish Store' : 'Continue'}
                                    {currentStep === steps.length ? <Icon icon="mdi:store-plus" width="18" /> : <Icon icon="lucide:arrow-right" width="16" />}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Stepper Header Box */}
                <div className="bg-white border border-[#BDBDD2] rounded-md p-2 px-5 shadow-sm overflow-hidden flex items-center justify-center mb-6">
                    <div className="flex items-center gap-0 w-full max-w-4xl justify-center pt-2">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div
                                    className="flex flex-col items-center gap-2 px-2 shrink-0 first:pl-0 last:pr-0 cursor-pointer hover:opacity-80 transition-all"
                                    onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[15px] font-bold transition-all border-2 ${currentStep === step.id
                                        ? 'bg-[#EA3D2A] text-white border-[#EA3D2A]'
                                        : currentStep > step.id
                                            ? 'bg-[#219653] text-white border-[#219653]'
                                            : 'bg-white text-[#BABABA] border-[#BDBDD2]'
                                        }`}>
                                        {currentStep > step.id ? <Icon icon="lucide:check" width="18" /> : step.id}
                                    </div>
                                    <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${currentStep === step.id ? 'text-[#EA3D2A]' : 'text-[#475569]'}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-[4px] w-full max-w-[180px] rounded-full -translate-y-2 mx-1 ${currentStep > step.id ? 'bg-[#219653]' : 'bg-[#E2E8F0]'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ActiveStepComponent formData={formData} setFormData={setFormData} />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-2 font-manrope">
                    <button
                        onClick={() => currentStep === 1 ? navigate("/store") : setCurrentStep(s => s - 1)}
                        className="px-6 py-2.5 bg-white shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] text-sm font-semibold text-[#475569] transition-all flex items-center gap-2 hover:bg-gray-50 rounded-md border border-gray-100"
                    >
                        <Icon icon="lucide:arrow-left" width="16" />
                        {currentStep === 1 ? "Cancel" : "Previous"}
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => currentStep === steps.length ? handleSubmit() : setCurrentStep(s => s + 1)}
                            disabled={currentStep === steps.length ? loading : !canNext()}
                            className="px-5 py-2.5 bg-[#E93E2B] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#E93E2B33,0px_10px_15px_-3px_#E93E2B33] hover:bg-[#E93E2B]/90 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Icon icon="line-md:loading-twotone-loop" width="18" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    {currentStep === steps.length ? 'Publish Store' : 'Continue'}
                                    {currentStep === steps.length ? <Icon icon="mdi:store-plus" width="18" /> : <Icon icon="lucide:arrow-right" width="16" />}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStorePage;
