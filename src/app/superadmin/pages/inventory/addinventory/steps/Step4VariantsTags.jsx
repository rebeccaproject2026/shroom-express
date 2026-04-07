import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../components/common/ReusableTableSelect';

const Step4VariantsTags = ({ formData, setFormData }) => {
  const variantOptions = [
    { value: 'none', label: 'None' },
    { value: 'size', label: 'Size' },
    { value: 'color', label: 'Color' },
    { value: 'weight', label: 'Weight' },
  ];

  const availableTags = [
    'Vegan', 'Organic', 'Lab Tested', 'Gluten Free', 'Non-GMO',
    'All Natural', 'Beginner Friendly', 'Premium', 'Fast Acting', 'Extended Release'
  ];

  const toggleTag = (tag) => {
    const currentTags = Array.isArray(formData.tags) ? formData.tags : [];
    if (currentTags.includes(tag)) {
      setFormData({ ...formData, tags: currentTags.filter(t => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...currentTags, tag] });
    }
  };

  const currentTags = Array.isArray(formData.tags) ? formData.tags : [];

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden font-manrope shadow-sm min-h-[800px]">
      {/* Header */}
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="tabler:tag" className="text-[#EA3D2A]" width="24" />
          </div>
          <h3 className="text-base font-semibold text-[#181211]">Variants</h3>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 4 of 5</span>
      </div>

      <div className="p-6 space-y-4">
        {/* Variant Type Dropdown */}
        <div className="space-y-1.5 mb-4 max-w-full">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Variant Type <span className="text-[#EA3D2A] text-xs ml-1">*</span></label>
          <ReusableTableSelect
            value={formData.variantType || 'none'}
            onChange={(selected) => setFormData({ ...formData, variantType: selected.value })}
            options={variantOptions}
            placeholder="Select variant type.."
            className="w-full h-[45px] text-[#181211] font-medium"
            borderclass="border border-[#BDBDD2]"
          />
        </div>

        {/* Product Tags Section */}
        <div className="space-y-3">
          <div className="space-y-0.5">
            <h4 className="text-base font-semibold text-[#181211]">Product Tags</h4>
            <p className="text-xs font-medium text-[#181211]">Help customers find this product with relevant labels</p>
          </div>
          <div className="flex flex-wrap gap-2 ">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 cursor-pointer py-2 rounded-full border text-sm font-semibold transition-all ${currentTags.includes(tag)
                  ? 'border-[#EA3D2A] text-[#EA3D2A] bg-[#FFEDEB]'
                  : 'border-[#E2E8F0] text-[#181211] hover:border-[#EA3D2A] hover:bg-[#FFEDEB] hover:text-[#EA3D2A]'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Product Settings Section */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-[#181211] mb-2">Product Settings</h4>
          <div className="space-y-3">
            <div className="p-4 border border-[#E2E8F0] rounded-lg flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#181211]">Requires Prescription / ID</h4>
                <p className="text-[13px] font-medium text-[#475569] mt-1.5">Customer must verify age or provide documentation</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requiresPrescription: !formData.requiresPrescription })}
                className={`w-11 h-6 rounded-full transition-colors relative ${formData.requiresPrescription ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.requiresPrescription ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="p-4 border border-[#E2E8F0] rounded-lg flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#181211]">Lab Tested Product</h4>
                <p className="text-[13px] font-medium text-[#475569] mt-1.5">Certificate of Analysis (COA) available</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isLabTested: !formData.isLabTested })}
                className={`w-11 h-6 rounded-full transition-colors relative ${formData.isLabTested ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isLabTested ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Step4VariantsTags;
