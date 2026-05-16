/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Separate components for each step to keep the main file clean
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Location from './steps/Step2Location';
import Step3Operations from './steps/Step3Operations';
import Step4FeaturedStore from './steps/Step4FeaturedStore';
// import Step4ProductsTags from './steps/Step4ProductsTags';

import Step5MediaDocs from './steps/Step5MediaDocs';
import StoreSuccessState from './steps/StoreSuccessState';
import StoreLivePreview from './steps/StoreLivePreview';
import StoreCompletionStatus from './steps/StoreCompletionStatus';
import Breadcrumbs from '../../../../components/common/Breadcrumbs';
import { STORES_DATA } from '../../../../data/storesData';

const AddStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const breadcrumbItems = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Stores", path: "/superadmin/stores/all" },
    { label: isEditMode ? "Edit Store" : "Add Store" }
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
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
        website: 'https://yourstore.com',
        socialPlatform: [],
        socialLinks: {},
        storeName: 'Forest Oasis',
        category: [],
        description: '',
        streetAddress: '123 Main Street',
        unitNumber: '4',
        city: 'Toronto',
        province: '',
        postalCode: 'M5V 2T6',
        country: 'Canada',
        latitude: '43.6532',
        longitude: '-79.3832',
        storeEmail: 'store@example.com',
        storePhone: '+1 (461) 000-0000',
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
    productTypes: ['Micro dosing', 'Full Spectrum', 'Wellness', 'Edibles'],
    storeTags: ['Premium', 'Lab Tested', 'Fast Delivery', 'Loyalty Rewards'],
    licenseNumber: '',
    // Step 5: Media & Docs
    logo: null,
    banner: null,
    documents: [
      { name: 'Document name', size: '200 kb', type: 'doc' },
      { name: 'Document name', size: '543 kb', type: 'pdf' }
    ]
  });

  useEffect(() => {
    if (isEditMode) {
      const allStores = [...STORES_DATA, ...JSON.parse(localStorage.getItem('shroom_express_stores') || '[]')];
      const storeToEdit = allStores.find(s => s.id.replace('#', '') === id);

      if (storeToEdit) {
        // Map store data to formData structure
        setFormData(prev => ({
          ...prev,
          firstName: storeToEdit.name.split(' ')[0] || '',
          lastName: storeToEdit.name.split(' ').slice(1).join(' ') || '',
          email: storeToEdit.email || '',
          phone: storeToEdit.phone || '',
          locations: [
            {
              ...prev.locations[0],
              storeName: storeToEdit.name,
              city: storeToEdit.location.split(',')[0].trim(),
              province: storeToEdit.location.split(',')[1]?.trim() || '',
              storeEmail: storeToEdit.email,
              storePhone: storeToEdit.phone,
              website: storeToEdit.website || 'https://yourstore.com',
              category: storeToEdit.category ? [storeToEdit.category] : [],
            }
          ],
          storeTags: storeToEdit.tags || [],
          logo: storeToEdit.logo || storeToEdit.image || null,
          banner: storeToEdit.banner || null,
          sameDayDelivery: storeToEdit.delivery?.some(d => d.type === 'SAME-DAY') || false,
          expressDelivery: storeToEdit.delivery?.some(d => d.type === 'EXPRESS') || false,
          shippingMailOrder: storeToEdit.delivery?.some(d => d.type === 'SHIPPING') || false,
        }));
      }
    }
  }, [id, isEditMode]);

  const steps = [
    { id: 1, label: 'Owner Details' },
    { id: 2, label: 'Store Info' },
    { id: 3, label: 'Operations' },
    { id: 4, label: 'Products & Tags' },
    { id: 5, label: 'Media' },
  ];

  const handlePublish = () => {
    if (isEditMode) {
      updateExistingStore('Active');
    } else {
      // Logic for publishing new store if needed, but for now we'll just redirect
      handleSaveDraft(); // Reuse logic to save to localStorage
    }
    navigate('/superadmin/stores/all');
  };

  const updateExistingStore = (status) => {
    const primaryLocation = formData.locations[0] || {};
    const localStores = JSON.parse(localStorage.getItem('shroom_express_stores') || '[]');

    const storeExists = localStores.some(s => s.id.replace('#', '') === id);

    let updatedStores;
    if (storeExists) {
      updatedStores = localStores.map(s => {
        if (s.id.replace('#', '') === id) {
          return {
            ...s,
            name: primaryLocation.storeName,
            logo: formData.logo || s.logo,
            category: primaryLocation.category?.[0] || s.category,
            tags: formData.storeTags,
            location: `${primaryLocation.city}, ${primaryLocation.province}`,
            email: primaryLocation.storeEmail,
            phone: primaryLocation.storePhone,
            delivery: [
              formData.sameDayDelivery && { type: 'SAME-DAY', variant: 'teal' },
              formData.expressDelivery && { type: 'EXPRESS', variant: 'blue' },
              formData.shippingMailOrder && { type: 'SHIPPING', variant: 'grey' },
            ].filter(Boolean),
            status: status || s.status
          };
        }
        return s;
      });
    } else {
      // If it's a static store being edited for the first time, add it to localStorage
      const staticStore = STORES_DATA.find(s => s.id.replace('#', '') === id);
      if (staticStore) {
        const newStore = {
          ...staticStore,
          name: primaryLocation.storeName,
          logo: formData.logo || staticStore.logo,
          category: primaryLocation.category?.[0] || staticStore.category,
          tags: formData.storeTags,
          location: `${primaryLocation.city}, ${primaryLocation.province}`,
          email: primaryLocation.storeEmail,
          phone: primaryLocation.storePhone,
          delivery: [
            formData.sameDayDelivery && { type: 'SAME-DAY', variant: 'teal' },
            formData.expressDelivery && { type: 'EXPRESS', variant: 'blue' },
            formData.shippingMailOrder && { type: 'SHIPPING', variant: 'grey' },
          ].filter(Boolean),
          status: status || staticStore.status
        };
        updatedStores = [...localStores, newStore];
      } else {
        updatedStores = localStores;
      }
    }

    localStorage.setItem('shroom_express_stores', JSON.stringify(updatedStores));
  };

  const handleSaveDraft = () => {
    if (isEditMode) {
      updateExistingStore('Draft');
      setIsSuccess(true);
      return;
    }

    const primaryLocation = formData.locations[0] || {};

    const newStore = {
      id: `#SE-${Math.floor(1000 + Math.random() * 9000)}`,
      name: primaryLocation.storeName || '-',
      image: formData.logo || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=150&h=150",
      logo: formData.logo || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=150&h=150",
      category: primaryLocation.category?.[0] || '-',
      tags: formData.storeTags || [],
      location: primaryLocation.city
        ? `${primaryLocation.city}${primaryLocation.province ? ', ' + primaryLocation.province : ''}`
        : '-',
      locationCount: formData.locations.length,
      email: primaryLocation.storeEmail || formData.email || '-',
      phone: primaryLocation.storePhone || formData.phone || '-',
      website: primaryLocation.website || '-',
      delivery: [
        formData.sameDayDelivery && { type: 'SAME-DAY', variant: 'teal' },
        formData.expressDelivery && { type: 'EXPRESS', variant: 'blue' },
        formData.shippingMailOrder && { type: 'SHIPPING', variant: 'grey' },
      ].filter(Boolean),
      revenue: '-',
      revenueSub: '',
      orders: '-',
      ordersSub: '',
      status: 'Draft',
      statusTime: '-',
      rating: '0.0',
      createdAt: new Date().toISOString().split('T')[0],
      submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      approvedDate: null,
      featured: false,
      waitingDays: 0,
    };

    const existingDrafts = JSON.parse(localStorage.getItem('shroom_express_stores') || '[]');
    localStorage.setItem('shroom_express_stores', JSON.stringify([...existingDrafts, newStore]));

    setIsSuccess(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2Location formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3Operations formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4FeaturedStore formData={formData} setFormData={setFormData} />;
        // return <Step4ProductsTags formData={formData} setFormData={setFormData} />;

      case 5:
        return <Step5MediaDocs formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <StoreSuccessState onReset={() => {
        setIsSuccess(false);
        setCurrentStep(1);
      }} />
    );
  }

  return (
    <div className="h-full flex flex-col font-manrope animate-in fade-in duration-700 overflow-hidden">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Top Header Section */}
      <div className="shrink-0 space-y-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-[#181211]">{isEditMode ? 'Edit Store' : 'Add New Store'}</h1>
            <p className="text-[#475569] font-medium text-sm">
              {isEditMode
                ? 'Update the details below to modify the vendor store on the platform.'
                : 'Fill in the details below to register a new vendor store on the platform.'
              }
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/superadmin/stores/all"
              className="px-7 py-2.5 bg-white border border-[#E8E8E8] rounded-md text-[14px] font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center underline-none"
            >
              Cancel
            </Link>
            <button
              onClick={handlePublish}
              className="px-7 py-2.5 bg-[#EA3D2A] text-white rounded-md text-[14px] font-bold shadow-[0px_10px_15px_-3px_#EA3D2A55] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
            >
              <Icon icon="mdi:store-plus" width="20" />
              {isEditMode ? 'Update Store' : 'Publish Store'}
            </button>
          </div>
        </div>

        {/* Stepper Header Box */}
        <div className="bg-white border border-[#BDBDD2] rounded-md p-2  shadow-sm overflow-hidden flex items-center justify-center">
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

            {/* Footer Navigation Buttons (Inside form column) */}
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
                {currentStep === 5 ? (
                  <button
                    onClick={() => currentStep === 5 ? handlePublish() : setCurrentStep(prev => Math.min(5, prev + 1))}
                    className="px-5 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                  >
                    {currentStep === 5 ? 'Publish Store' : 'Continue'}
                    {currentStep === 5 ? <Icon icon="mdi:store-plus" width="18" /> : <Icon icon="lucide:arrow-right" width="16" />}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveDraft}
                      className="px-7 py-2.5 bg-white  rounded-md  shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] text-sm font-semibold text-[#475569] hover:bg-gray-50 transition-all"
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                      className="px-5 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                    >
                      Continue
                      <Icon icon="lucide:arrow-right" width="16" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar Section (Static position) */}
          <div className="lg:col-span-1 space-y-5 sticky top-0 h-fit">
            <StoreLivePreview formData={formData} />
            <StoreCompletionStatus currentStep={currentStep} formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStore;
