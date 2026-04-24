import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../../components/common/Input';

const Step1PersonalInfo = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="lucide:user" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Personal Information</h3>
            <p className="text-[#181211] text-xs leading-tight">Driver identity and contact details</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 1 of 4</span>
      </div>

      <div className="p-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="First Name"
            required
            name="firstName"
            placeholder="e.g. Marcus"
            value={formData.firstName}
            onChange={handleInputChange}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Last Name"
            name="lastName"
            placeholder="e.g. Jenkins"
            value={formData.lastName}
            onChange={handleInputChange}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>
        <Input
          label="Email Address"
          required
          type="email"
          name="email"
          placeholder="driver@email.com"
          value={formData.email}
          onChange={handleInputChange}
          className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
          labelClassName="text-sm font-semibold text-[#181211]"
          borderClass="border border-[#BDBDD2]"
        />
        <Input
          label="License Number"
          required
          name="licenseNumber"
          placeholder="e.g. D2938471A"
          value={formData.licenseNumber}
          onChange={handleInputChange}
          className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
          labelClassName="text-sm font-semibold text-[#181211]"
          borderClass="border border-[#BDBDD2]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Date of Birth <span className="text-[#EA3D2A]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="dob"
                placeholder="mm/dd/yy"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full h-[40px] px-4 rounded-sm border border-[#BDBDD2] text-sm font-medium text-[#181211] outline-none transition-all placeholder:text-[14px] placeholder:text-[#475569]"
              />
              <Icon icon="lucide:calendar" width="18" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
            </div>
          </div>
          <Input
            label="Phone Number"
            name="phoneNumber"
            placeholder="(000) 000-0000"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        {/* Driver Image Upload Section */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
            Driver Image <span className="text-[#EA3D2A]">*</span>
          </label>
          <div
            onClick={() => document.getElementById('driverImageInput').click()}
            className="border-2 border-dashed border-[#BDBDD2] rounded-md p-8 flex flex-col items-center justify-center gap-3 bg-[#FBFBFF] transition-all cursor-pointer hover:bg-gray-50"
          >
            <input
              type="file"
              id="driverImageInput"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setFormData({ ...formData, driverImage: file });
              }}
            />
            <div className="w-10 h-10 bg-[#FFEDEB] rounded-md flex items-center justify-center text-[#EA3D2A]">
              <Icon icon="material-symbols:upload-rounded" width="20" />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-bold text-[#181211]">Click to upload Driver Image</p>
              <p className="text-[12px] font-medium text-[#64748B] mt-1">PNG, JPG up to 10MB, 600x600 preferred</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {formData.driverImage && (
              <div className="relative w-16 h-16 rounded-md overflow-hidden group border border-[#BDBDD2]">
                <img
                  src={URL.createObjectURL(formData.driverImage)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData({ ...formData, driverImage: null });
                    }}
                    className="text-white bg-[#EA3D2A] p-1 rounded-md shadow-lg"
                  >
                    <Icon icon="solar:trash-bin-trash-bold" width="12" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
