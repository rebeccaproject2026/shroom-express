import React, { useRef } from 'react';
import { Icon } from '@iconify/react';

const UploadBox = ({ label, sub, icon, isLogo, onClick }) => (
  <div
    onClick={onClick}
    className={`w-full aspect-[6/1.2] border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-2 bg-[#F8F8F8] cursor-pointer transition-all group overflow-hidden relative ${isLogo ? 'border-[#EA3D2A]' : 'border-[#BDBDD2]'}`}
  >
    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isLogo ? 'bg-[#FFEDEB] text-[#EA3D2A]' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
      <Icon icon={icon || "lucide:upload-cloud"} width="24" />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-[#181211]">{label}</p>
      <p className="text-xs font-medium text-[#64748B]">{sub}</p>
    </div>
  </div>
);

const Step5MediaDocs = ({ formData, setFormData }) => {
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const storeName = formData.locations[0]?.storeName || "Store Name";

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm min-h-[750px]">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="solar:folder-outline" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Media & Documents</h3>
            <p className="text-[#181211] text-xs leading-tight">Upload store logo, banner image and required compliance documents</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 5 of 5</span>
      </div>

      <div className="p-5 space-y-6">
        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={logoInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'logo')}
        />
        <input
          type="file"
          ref={bannerInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'banner')}
        />

        {/* Logo Upload */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-[#181211] block">
            Store Logo <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>
          <UploadBox
            label="Click to upload logo"
            sub="Upload PNG or JPG (square, 520 × 520 px recommended, max 2MB)"
            isLogo={true}
            icon="lucide:upload"
            onClick={() => logoInputRef.current.click()}
          />
        </div>

        {/* Banner Upload */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-[#181211] block">
            Store Banner Image <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>
          <UploadBox
            label="Click to upload banner"
            sub="Upload PNG or JPG (wide format, 1920 × 450 px recommended, max 10MB)"
            isLogo={false}
            icon="lucide:upload"
            onClick={() => bannerInputRef.current.click()}
          />
        </div>

        {/* Preview Section - Styled like StoreDetails header */}
        {(formData.logo || formData.banner) && (
          <div className="relative rounded-md overflow-visible h-[140px] bg-cover bg-center border border-[#BDBDD2] mb-2 animate-in fade-in slide-in-from-top-2 duration-300"
            style={{
              backgroundImage: formData.banner ? `url(${formData.banner})` : 'none',
              backgroundColor: formData.banner ? 'transparent' : '#F1F5F9'
            }}>

            {/* Content Container */}
            <div className="relative h-full flex items-end justify-between px-6 pb-3">
              {/* Logo Overlay */}
              <div className="absolute -bottom-8 left-6 w-24 h-24 rounded-full flex items-center justify-center overflow-hidden z-20 ring-4 ring-[#FFFF]">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#F8FAFC] flex items-center justify-center">
                    <Icon icon="lucide:store" className="text-[#EA3D2A]" width="32" />
                  </div>
                )}
              </div>

              {/* Store Info */}
              <div className="ml-28 flex-1 min-w-0 pb-1">
                <h1 className={`text-xl font-bold leading-tight truncate mb-0.5 ${formData.banner ? 'text-white drop-shadow-md' : 'text-[#181211]'}`}>
                  {storeName}
                </h1>
                <div className="flex items-center gap-1 text-[11px] font-medium leading-none">
                  <span className="text-[#EA3D2A] hover:underline cursor-pointer font-bold">
                    Home
                  </span>
                  <span className={formData.banner ? 'text-white' : 'text-[#181211]'}>/</span>
                  <span className="text-[#EA3D2A] hover:underline cursor-pointer font-bold">
                    Stores
                  </span>
                  <span className={formData.banner ? 'text-white' : 'text-[#181211]'}>/</span>
                  <span className={`truncate font-bold ${formData.banner ? 'text-white' : 'text-[#181211]'}`}>
                    {storeName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Documents - Commented out as per user's current file state */}
        {/* <div className="space-y-3">
          ...
        </div> */}
      </div>
    </div>
  );
};

export default Step5MediaDocs;
