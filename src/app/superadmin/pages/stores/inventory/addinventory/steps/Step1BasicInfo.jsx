import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';
import Input from '../../../../../components/common/Input';
const Step1BasicInfo = ({ formData, setFormData }) => {
  const storeOptions = [
    { value: 'forest-oasis', label: 'Forest Oasis' },
    { value: 'healthy-greens', label: 'Healthy Greens' },
  ];

  const categoryOptions = [
    { value: 'Micro dosing', label: 'Micro dosing' },
    { value: 'Full Spectrum', label: 'Full Spectrum' },
    { value: 'Gummies', label: 'Gummies' },
    { value: 'Capsules', label: 'Capsules' },
  ];

  const unitOptions = [
    { value: 'capsules', label: 'capsules' },
    { value: 'grams', label: 'grams' },
    { value: 'ml', label: 'ml' },
  ];

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="fluent-mdl2:product" className="text-[#EA3D2A]" width="22" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Basic Information</h3>
            <p className="text-[#181211] text-xs leading-tight">Product identity and store association</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 1 of 5</span>
      </div>

      <div className="p-5 space-y-6">
        {/* Select Store */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
            Select Store <span className="text-[#EA3D2A]">*</span>
          </label>
          <ReusableTableSelect
            value={formData.storeId}
            onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
            options={storeOptions}
            placeholder="Select a Store..."
            className="w-full h-[40px] text-[#475569] font-medium"
            borderclass="border border-[#BDBDD2]"
          />
        </div>

        {/* Product Images */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
            Product Image <span className="text-[#EA3D2A]">*</span>
          </label>
          <div
            onClick={() => document.getElementById('productImageInput').click()}
            className="border-2 border-dashed border-[#BDBDD2] rounded-md p-8 flex flex-col items-center justify-center gap-3 bg-[#FBFBFF] transition-all cursor-pointer hover:bg-gray-50"
          >
            <input
              type="file"
              id="productImageInput"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setFormData({ ...formData, productImages: [...formData.productImages, ...files] });
              }}
            />
            <div className="w-10 h-10 bg-[#FFEDEB] rounded-md flex items-center justify-center text-[#EA3D2A]">
              <Icon icon="material-symbols:upload-rounded" width="20" />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-bold text-[#181211]">Click to upload Product Image</p>
              <p className="text-[12px] font-medium text-[#64748B] mt-1">PNG, JPG up to 10MB, 600x600 preferred</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {formData.productImages && formData.productImages.length > 0 ? (
              formData.productImages.map((file, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden group border border-[#BDBDD2]">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.productImages.filter((_, i) => i !== idx);
                        setFormData({ ...formData, productImages: newImages });
                      }}
                      className="text-white bg-[#EA3D2A] p-1 rounded-md shadow-lg"
                    >
                      <Icon icon="solar:trash-bin-trash-bold" width="12" />
                    </button>
                  </div>
                  {idx === 0 && (
                    <div className="absolute top-1 left-1 bg-[#219653] text-white p-0.5 rounded-full shadow-lg">
                      <Icon icon="lucide:check" width="8" />
                    </div>
                  )}
                </div>
              ))
            ) : (
              /* If no images, we can show a placeholder or nothing, usually nothing as requested by "workable" */
              null
            )}
          </div>
        </div>

        {/* Product Name */}
        <Input
          label="Product Name"
          required
          placeholder="e.g. Micro Dose Capsules 30mg"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
          labelClassName="text-sm font-semibold text-[#181211]"
          borderClass="border border-[#BDBDD2]"
        />

        {/* SKU & Barcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="SKU"
            required
            placeholder="e.g MIC-CAP-30"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Barcode / UPC"
            required
            placeholder="e.g. 012345678909876"
            value={formData.barcode}
            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        {/* Category & Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Category <span className="text-[#EA3D2A]">*</span>
            </label>
            <ReusableTableSelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categoryOptions}
              placeholder="Select a Category..."
              className="w-full h-[40px] text-[#475569] font-medium"
              borderclass="border border-[#BDBDD2]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Unit of Measure <span className="text-[#EA3D2A]">*</span>
            </label>
            <ReusableTableSelect
              value={formData.unitOfMeasure}
              onChange={(e) => setFormData({ ...formData, unitOfMeasure: e.target.value })}
              options={unitOptions}
              placeholder="Select a Unit..."
              className="w-full h-[40px] text-[#475569] font-medium"
              borderclass="border border-[#BDBDD2]"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5 pt-2">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Product Description <span className="text-[#EA3D2A] ml-0.5">*</span></label>
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
            {formData.description?.length || 0}/500 characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
