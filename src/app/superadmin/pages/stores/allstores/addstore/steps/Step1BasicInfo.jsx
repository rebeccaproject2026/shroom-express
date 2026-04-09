import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';
import Input from '../../../../../components/common/Input';

const Step1BasicInfo = ({ formData, setFormData }) => {
  const categoryOptions = [
    { value: 'Micro Dosing', label: 'Micro Dosing' },
    { value: 'Full Spectrum', label: 'Full Spectrum' },
    { value: 'Wellness', label: 'Wellness' },
    { value: 'Gummies', label: 'Gummies' },
  ];

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="streamline:shopping-store-2-store-shop-shops-stores" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Basic Information</h3>
            <p className="text-[#181211] text-xs leading-tight">Store identity and owner contact details</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 1 of 5</span>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Store Name"
            required
            placeholder="e.g. Forest Oasis"
            value={formData.storeName}
            onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
            className="!py-2  placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Owner Full Name"
            required
            placeholder="e.g. Jhon Doe"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            className="!py-2  placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Email Address"
            required
            type="email"
            placeholder="store@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Phone Number"
            required
            placeholder="+1 (461) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="!py-2  placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Website"
            required
            placeholder="https://yourstore.com"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="!py-2  placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Category <span className="text-[#EA3D2A] ml-0.5">*</span></label>
            <ReusableTableSelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categoryOptions}
              placeholder="Select a category..."
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
            />
          </div>
        </div>
        <div className="space-y-1.5 pt-2">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Store Description <span className="text-[#EA3D2A] ml-0.5">*</span></label>
          <div className="relative">
            <textarea
              rows="5"

              placeholder="Write a brief description of the store, products offered, and what makes it stand out..."
              className="w-full px-4 py-3 bg-white border border-[#BDBDD2] rounded-sm text-sm font-medium text-[#181211] outline-none transition-all font-medium resize placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value.slice(0, 500) })}
            ></textarea>
          </div>
          <div className="flex justify-end text-xs font-medium text-[#475569] tracking-wider">
            {formData.description.length}/300 characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
