/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';

// Separate components for each step to keep the main file clean
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Location from './steps/Step2Location';
import Step3Operations from './steps/Step3Operations';
import Step4ProductsTags from './steps/Step4ProductsTags';
import Step5MediaDocs from './steps/Step5MediaDocs';
import StoreSuccessState from './steps/StoreSuccessState';
import StoreLivePreview from './steps/StoreLivePreview';
import StoreCompletionStatus from './steps/StoreCompletionStatus';
import Breadcrumbs from '../../../../components/common/Breadcrumbs';
import { createStore, uploadStoreMedia, getStoreDetails, updateStore } from '../../../../services/api';

const AddStore = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const isEditMode = !!id;

  const breadcrumbItems = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Stores", path: "/superadmin/stores" },
    { label: isEditMode ? "Edit Store" : "Add Store" }
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    description: '',
    // Step 2: Location
    streetAddress: '123 Main Street, Unit 4',
    city: 'Toronto',
    province: '',
    postalCode: 'M5V 2T6',
    country: 'Canada',
    latitude: '43.6532',
    longitude: '-79.3832',
    // Step 3: Operations
    sameDayDelivery: true,
    minOrderAmount: '25.00',
    maxDeliveryRadius: '15',
    expressDelivery: false,
    shippingMailOrder: false,
    operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    openingTime: '09:00 PM',
    closingTime: '09:00 AM',
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

  // Fetch store details in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchStoreData = async () => {
        try {
          setIsLoading(true);
          const response = await getStoreDetails(id);
          if (response.data.status) {
            const store = response.data.data;
            setFormData({
              storeName: store.name || '',
              ownerName: store.ownerName || '',
              email: store.email || '',
              phone: store.phone || '',
              website: store.website || '',
              category: store.category || '',
              description: store.description || '',
              // Location
              streetAddress: store.address || '',
              city: store.city || '',
              province: store.province || '',
              postalCode: store.postalCode || '',
              country: store.country || 'Canada',
              latitude: store.location?.coordinates[1]?.toString() || '43.6532',
              longitude: store.location?.coordinates[0]?.toString() || '-79.3832',
              // Operations
              sameDayDelivery: store.estimatedDelivery === "Same-day Delivery",
              minOrderAmount: store.minOrderAmount?.toString() || '0',
              maxDeliveryRadius: store.maxDeliveryRadius?.toString() || '15',
              expressDelivery: store.expressDelivery || false,
              shippingMailOrder: store.shippingMailOrder || false,
              operatingDays: store.operatingDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              openingTime: store.openingTime || '09:00 AM',
              closingTime: store.closingTime || '09:00 PM',
              autoAcceptOrders: store.autoAcceptOrders !== false,
              featuredStore: store.isFeatured || false,
              setStoreAsActive: store.status === "ACTIVE",
              // Products & Tags
              productTypes: store.productTypes || [],
              storeTags: store.storeTags || [],
              licenseNumber: store.licenseNumber || '',
              // Media
              logo: store.logo || null,
              banner: store.coverImage || null,
              documents: store.documents || []
            });
          }
        } catch (err) {
          console.error("Error fetching store data:", err);
          setError("Failed to load store details for editing.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchStoreData();
    }
  }, [id, isEditMode]);

  const steps = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Location' },
    { id: 3, label: 'Operations' },
    { id: 4, label: 'Products & Tags' },
    { id: 5, label: 'Media & Docs' },
  ];

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Handle Media Uploads if they are File objects
      let logoFilename = formData.logo ? (typeof formData.logo === 'string' ? formData.logo : null) : null;
      let coverFilename = formData.banner ? (typeof formData.banner === 'string' ? formData.banner : null) : null;

      if (formData.logo && formData.logo instanceof File) {
        const logoData = new FormData();
        logoData.append('file', formData.logo);
        const res = await uploadStoreMedia(logoData);
        if (res.data.status) {
          logoFilename = res.data.data;
        }
      }

      if (formData.banner && formData.banner instanceof File) {
        const bannerData = new FormData();
        bannerData.append('file', formData.banner);
        const res = await uploadStoreMedia(bannerData);
        if (res.data.status) {
          coverFilename = res.data.data;
        }
      }

      // Handle Additional Documents Uploads
      const uploadedDocs = await Promise.all(formData.documents.map(async (doc) => {
        if (doc.file && doc.file instanceof File) {
          const docData = new FormData();
          docData.append('file', doc.file);
          const res = await uploadStoreMedia(docData);
          if (res.data.status) {
            return {
              name: doc.name,
              size: doc.size,
              type: doc.type,
              url: res.data.data // Store the uploaded filename/path
            };
          }
        }
        return doc;
      }));

      const payload = {
        name: formData.storeName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        category: formData.category,
        description: formData.description,
        address: formData.streetAddress,
        city: formData.city,
        province: formData.province || 'Ontario',
        postalCode: formData.postalCode,
        country: formData.country || 'Canada',
        location: {
          type: 'Point',
          coordinates: [parseFloat(formData.longitude || -79.3832), parseFloat(formData.latitude || 43.6532)]
        },
        estimatedDelivery: formData.sameDayDelivery ? "Same-day Delivery" : "Standard Delivery",
        minOrderAmount: parseFloat(formData.minOrderAmount),
        maxDeliveryRadius: parseFloat(formData.maxDeliveryRadius),
        operatingDays: formData.operatingDays,
        openingTime: formData.openingTime,
        closingTime: formData.closingTime,
        autoAcceptOrders: formData.autoAcceptOrders,
        isFeatured: formData.featuredStore,
        status: formData.setStoreAsActive ? "ACTIVE" : "INACTIVE",
        expressDelivery: formData.expressDelivery,
        shippingMailOrder: formData.shippingMailOrder,
        productTypes: formData.productTypes,
        storeTags: formData.storeTags,
        licenseNumber: formData.licenseNumber,
        logo: logoFilename,
        coverImage: coverFilename,
        documents: uploadedDocs.map(({ file, ...rest }) => rest), // Remove file object from final payload
      };

      const storeResponse = isEditMode
        ? await updateStore(id, payload)
        : await createStore(payload);

      if (storeResponse.data.status) {
        setIsSuccess(true);
      } else {
        setError(storeResponse.data.error || `Failed to ${isEditMode ? 'update' : 'create'} store`);
      }
    } catch (err) {
      console.error("Store creation error:", err);
      setError(err.response?.data?.message || err.message || "An error occurred while publishing the store");
    } finally {
      setIsLoading(false);
    }
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
        return <Step4ProductsTags formData={formData} setFormData={setFormData} />;
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

      {/* Error Message */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium flex items-center gap-2">
          <Icon icon="lucide:alert-circle" width="18" />
          {error}
        </div>
      )}

      {/* Top Header Section */}
      <div className="shrink-0 space-y-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-[#181211]">{isEditMode ? 'Edit Store' : 'Add New Store'}</h1>
            <p className="text-[#475569] font-medium text-sm">
              {isEditMode ? 'Update the details below to modify existing store information.' : 'Fill in the details below to register a new vendor store on the platform.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              disabled={isLoading}
              className="px-7 py-2.5 bg-white border border-[#E8E8E8] rounded-md text-[14px] font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="px-7 py-2.5 bg-[#EA3D2A] text-white rounded-md text-[14px] font-bold shadow-[0px_10px_15px_-3px_#EA3D2A55] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Icon icon="lucide:loader-2" className="animate-spin" width="20" />
              ) : (
                <Icon icon={isEditMode ? "lucide:save" : "mdi:store-plus"} width={20} />
              )}
              {isLoading ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Store' : 'Publish Store')}
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
                <button className="px-7 py-2.5 bg-white  rounded-md  shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] text-sm font-semibold text-[#475569] hover:bg-gray-50 transition-all">
                  Save Draft
                </button>
                <button
                  onClick={() => currentStep === 5 ? handlePublish() : setCurrentStep(prev => Math.min(5, prev + 1))}
                  disabled={isLoading}
                  className="px-5 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Icon icon="lucide:loader-2" className="animate-spin" width="18" />
                  ) : (
                    currentStep === 5 ? <Icon icon={isEditMode ? "lucide:save" : "mdi:store-plus"} width="18" /> : <Icon icon="lucide:arrow-right" width="16" />
                  )}
                  {isLoading ? (isEditMode ? 'Updating...' : 'Publishing...') : currentStep === 5 ? (isEditMode ? 'Update Store' : 'Publish Store') : 'Continue'}
                </button>
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
