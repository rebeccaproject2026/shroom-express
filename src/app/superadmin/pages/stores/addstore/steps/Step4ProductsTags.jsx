import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../components/common/Input';

const CheckBadge = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2  px-2 py-2 border rounded-sm transition-all ${isSelected
      ? 'border-[#EA3D2A] bg-[#FFEDEB] text-[#EA3D2A] '
      : 'border-[#BDBDD2] bg-white text-[#181211] hover:border-gray-300'
      }`}
  >
    <div className={`w-5 h-5 rounded-sm flex items-center justify-center transition-all ${isSelected ? 'bg-[#EA3D2A] border-[#EA3D2A]' : 'bg-white border-2 border-[#BDBDD2]'
      }`}>
      {isSelected && <Icon icon="lucide:check" className="text-white" width="14" strokeWidth={3} />}
    </div>
    <span className="text-sm font-semibold ">{label}</span>
  </button>
);

const Step4ProductsTags = ({ formData, setFormData }) => {
  const productTypesList = [
    'Micro dosing', 'Full Spectrum', 'Gummies', 'Tinctures',
    'Capsules', 'Wellness', 'Edibles', 'Topicals'
  ];

  const storeTagsList = [
    'Beginner Friendly', 'Premium', 'Lab Tested', 'Organic',
    'Fast Delivery', 'Loyalty Rewards', 'Same-day Available', 'Discreet Packaging'
  ];

  const toggleSelection = (field, item) => {
    const current = [...formData[field]];
    if (current.includes(item)) {
      setFormData({ ...formData, [field]: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...current, item] });
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="la:industry" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Products & Tags</h3>
            <p className="text-[#181211] text-xs leading-tight">Define what the store sells and how it appears in search</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 4 of 5</span>
      </div>

      <div className="p-5 space-y-7">
        {/* Product Types Available */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-[#181211] block">
            Product Types Available <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>
          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {productTypesList.map((type) => (
              <CheckBadge
                key={type}
                label={type}
                isSelected={formData.productTypes.includes(type)}
                onClick={() => toggleSelection('productTypes', type)}
              />
            ))}
          </div>
        </div>

        {/* Store Tags */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-[#181211] block">Store Tags</label>
            <p className="text-[#475569] text-xs font-medium">Tags help customers discover your store in search and filters.</p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {storeTagsList.map((tag) => (
              <CheckBadge
                key={tag}
                label={tag}
                isSelected={formData.storeTags.includes(tag)}
                onClick={() => toggleSelection('storeTags', tag)}
              />
            ))}
          </div>
        </div>

        {/* License Section */}
        <Input
          label="Compliant License Number"
          required
          placeholder="e.g. LIC-2026-ON-00123"
          value={formData.licenseNumber}
          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          labelClassName="text-sm font-semibold text-[#181211]"
          className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
          borderClass="border border-[#BDBDD2]"
        />
      </div>
    </div>
  );
};

export default Step4ProductsTags;
