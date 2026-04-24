import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

// Separate components for each step to keep the main file clean
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2DriverDetails from './steps/Step2DriverDetails';
import Step3Permissions from './steps/Step3Permissions';
import Step4Documents from './steps/Step4Documents';
import DriverLivePreview from './steps/DriverLivePreview';
import DriverCompletionStatus from './steps/DriverCompletionStatus';
import Breadcrumbs from '../../../../components/common/Breadcrumbs';

const AddDriver = () => {
  const breadcrumbItems = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Drivers", path: "/superadmin/drivers/all" },
    { label: "#Driver-ID" }
  ];
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    licenseNumber: '',
    dob: '',
    phoneNumber: '',
    driverImage: null,
    // Step 2: Driver Details
    driverType: 'Store Driver',
    assignedStore: 'Forest Oasis',
    deliveryZone: 'Toronto',
    country: 'Canada',
    vehicleInfo: '',
    licensePlate: '',
    latitude: '43.6532',
    longitude: '-79.3832',
    // Step 3: Permissions
    pushNotifications: true,
    liveGpsTracking: true,
    cashOnDelivery: false,
    multiStoreAccess: false,
    // Step 4: Documents
    documents: []
  });

  const steps = [
    { id: 1, label: 'Personal Info' },
    { id: 2, label: 'Driver Details' },
    { id: 3, label: 'Permissions' },
    { id: 4, label: 'Documents' },
  ];

  const handlePublish = () => {
    setIsSuccess(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2DriverDetails formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3Permissions formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4Documents formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col font-manrope animate-in fade-in duration-700 overflow-hidden">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Top Header Section */}
      <div className="shrink-0 space-y-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-[#181211]">Add New Driver</h1>
            <p className="text-[#475569] font-medium text-sm">Fill in the driver details across 4 steps. All required fields must be completed before submission.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-7 py-2.5 bg-white border border-[#E8E8E8] rounded-md text-[14px] font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95">
              Save as Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-7 py-2.5 bg-[#EA3D2A] text-white rounded-md text-[14px] font-bold shadow-[0px_10px_15px_-3px_#EA3D2A55] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
            >
              Submit Driver
            </button>
          </div>
        </div>

        {/* Stepper Header Box */}
        <div className="bg-white border border-[#BDBDD2] rounded-md p-2 shadow-sm overflow-hidden flex items-center justify-center">
          <div className="flex items-center gap-0 w-full max-w-3xl justify-center pt-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className="flex flex-col items-center gap-2 px-2 shrink-0 first:pl-0 last:pr-0 cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold transition-all border-2 ${currentStep === step.id
                    ? 'bg-[#EA3D2A] text-white border-[#EA3D2A]'
                    : currentStep > step.id
                      ? 'bg-[#219653] text-white border-[#219653]'
                      : 'bg-white text-[#BABABA] border-[#BDBDD2]'
                    }`}>
                    {currentStep > step.id ? <Icon icon="lucide:check" width="16" /> : step.id}
                  </div>
                  <span className={`text-[13px] font-semibold whitespace-nowrap transition-colors ${currentStep === step.id ? 'text-[#EA3D2A]' : 'text-[#475569]'
                    }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-[4px] w-full max-w-[120px] rounded-full -translate-y-2 mx-2 ${currentStep > step.id ? 'bg-[#219653]' : 'bg-[#E2E8F0]'
                    }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_0.9fr] gap-6">
          {/* Left Form Section + Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderStepContent()}
            </div>

            {/* Footer Navigation Buttons */}
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
                  onClick={() => currentStep === 4 ? handlePublish() : setCurrentStep(prev => Math.min(4, prev + 1))}
                  className="px-5 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                >
                  {currentStep === 4 ? 'Submit Driver' : 'Continue'}
                  <Icon icon="lucide:arrow-right" width="16" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Section */}
          <div className="lg:col-span-1 space-y-5 sticky top-0 h-fit">
            <DriverLivePreview formData={formData} />
            <DriverCompletionStatus currentStep={currentStep} formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
