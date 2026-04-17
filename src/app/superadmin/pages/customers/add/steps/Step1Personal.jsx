import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../components/common/Input';
const Step1Personal = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  return (
    <div className="bg-white rounded-md border border-[#BDBDD2] shadow-sm overflow-hidden font-manrope min-h-[820px]">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#FFEDEB] flex items-center justify-center shrink-0">
            <Icon icon="prime:user" className="text-[#EA3D2A]" width="22" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Personal Information</h3>
            <p className="text-[#181211] text-xs leading-tight">Customer identity and profile details</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 1 of 3</span>
      </div>

      <div className="p-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="e.g Jhon"
            className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Last Name"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="e.g. Summit"
            className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        <Input
          label="Email Address"
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. customer@gmail.com"
          className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
          labelClassName="text-sm font-semibold text-[#181211]"
          borderClass="border border-[#BDBDD2]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(000) 000-0000"
            className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <div className="space-y-1 relative">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Date of Birth <span className="text-[#EA3D2A]">*</span></label>
            <div className="relative">
              <input
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                className="w-full px-4 py-2.5 bg-white border border-[#BDBDD2] rounded-sm text-sm font-medium text-[#181211] outline-none transition-all placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
              />
              <Icon icon="lucide:calendar" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="18" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#181211]">Gender</label>
          <div className="flex flex-wrap items-center gap-3">
            {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => handleGenderSelect(gender)}
                className={`px-5 py-2 mt-2 rounded-full text-sm font-bold transition-all border ${formData.gender === gender
                  ? ' border-[#EA3D2A] text-[#EA3D2A] shadow-sm'
                  : 'bg-white border-[#E2E8F0] text-[#181211] hover:border-[#EA3D2A]/30'
                  }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Personal;
