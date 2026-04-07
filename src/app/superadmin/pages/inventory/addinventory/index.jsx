import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Pricing from './steps/Step2Pricing';
import Step3StockSupply from './steps/Step3StockSupply';
import Step4VariantsTags from './steps/Step4VariantsTags';
import Step5Compliance from './steps/Step5Compliance';
import InventoryLivePreview from './steps/InventoryLivePreview';
import InventoryCompletionStatus from './steps/InventoryCompletionStatus';
import InventorySuccessState from './steps/InventorySuccessState';
const AddInventory = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    storeId: '',
    productName: '',
    sku: '',
    barcode: '',
    category: ["Micro dosing", "capsules"],
    unitOfMeasure: '',
    description: '',
    productImages: [],

    // Step 2: Pricing
    salePrice: '100',
    costPrice: '32',
    discountType: 'percentage',
    discountValue: '0',
    taxRate: '0',

    // Step 3: Stock & Supply
    initialStock: '0',
    lowStockAlert: '10',
    supplier: '',
    warehouseLocation: '',

    // Step 4: Variants & Tags
    hasVariants: false,
    variants: [],
    tags: [],

    // Step 5: Compliance
    legalDisclaimer: '',
    labResultsUrl: '',
    thcContent: '0',
    cbdContent: '0',
    hasCOA: false,
    hasLicense: false
  });

  const steps = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Pricing' },
    { id: 3, label: 'Stock & Supply' },
    { id: 4, label: 'Variants & Tags' },
    { id: 5, label: 'Compliance' },
  ];

  const handlePublish = () => {
    setIsSuccess(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2Pricing formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3StockSupply formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4VariantsTags formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5Compliance formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <InventorySuccessState
        formData={formData}
        onReset={() => {
          setIsSuccess(false);
          setCurrentStep(1);
        }}
      />
    );
  }

  return (
    <div className="h-full flex flex-col font-manrope animate-in fade-in duration-700 overflow-hidden pb-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium">
        <Link to="/superadmin/dashboard" className="text-[#EA3D2A] hover:underline">Dashboard</Link>
        <Icon icon="lucide:chevron-right" className="text-[#94A3B8]" width="16" />
        <Link to="/superadmin/inventory/all" className="text-[#EA3D2A]">Inventory</Link>
        <Icon icon="lucide:chevron-right" className="text-[#94A3B8]" width="16" />
        <span className="text-[#64748B]">Add Inventory</span>
      </nav>

      {/* Top Header Section */}
      <div className="shrink-0 space-y-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-[#181211]">Add New Product</h1>
            <p className="text-[#475569] font-medium text-sm">Fill in the details below to add a new product to the platform inventory.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-7 py-2.5 bg-white border border-[#E8E8E8] rounded-md text-[14px] font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95">
              Save as Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-7 py-2.5 bg-[#EA3D2A] text-white rounded-md text-[14px] font-bold shadow-[0px_10px_15px_-3px_#EA3D2A55] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
            >
              <Icon icon="si:inventory-line" width="20" />
              Publish Product
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
                  <div className={`h-[4px] w-full max-w-[180px] rounded-full -translate-y-2 mx-1 ${currentStep > step.id ? 'bg-[#219653]' : 'bg-[#E2E8F0]'
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
                  onClick={() => currentStep === 5 ? handlePublish() : setCurrentStep(prev => Math.min(5, prev + 1))}
                  className="px-5 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                >
                  {currentStep === 5 ? <Icon icon="lucide:check" width="18" /> : null}
                  {currentStep === 5 ? 'Publish Product' : 'Continue'}
                  {currentStep !== 5 && <Icon icon="lucide:arrow-right" width="16" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Section */}
          <div className="lg:col-span-1 space-y-5 sticky top-0 h-fit">
            <InventoryLivePreview formData={formData} />
            <InventoryCompletionStatus currentStep={currentStep} formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
