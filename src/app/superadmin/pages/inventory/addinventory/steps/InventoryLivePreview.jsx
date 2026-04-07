import React from 'react';
import { Icon } from '@iconify/react';

const InventoryLivePreview = ({ formData }) => {
  const imageUrl = formData.productImages && formData.productImages.length > 0
    ? URL.createObjectURL(formData.productImages[0])
    : null;

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm font-manrope">
      <h3 className="text-lg font-semibold text-[#181211] mb-4 tracking-tight">Live Preview</h3>

      <div className="space-y-4">
        {/* Product Header Info */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#F1F5F9] border border-[#E2E8F0] rounded-md flex items-center justify-center shrink-0 overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt="Product" className="w-full h-full object-cover" />
            ) : (
              <div className="text-2xl">🌿</div>
            )}
          </div>
          <div className="min-w-0">
            <h5 className="text-base font-bold text-[#181211] truncate leading-tight">
              {formData.productName || 'Product Name'}
            </h5>
            <p className="text-sm font-medium text-[#64748B] mt-1">
              {formData.sku || 'SKU-000'}
            </p>
          </div>
        </div>

        {/* Badges - Categories & Details */}
        <div className="flex flex-wrap gap-2">
          {Array.isArray(formData.category) ? (
            formData.category.map((cat, idx) => (
              <span key={idx} className="px-2.5 py-1 border border-[#219653] text-[#219653] bg-[#ECFDF5] text-[10px] font-bold rounded-full uppercase">
                {cat}
              </span>
            ))
          ) : (
            <span className="px-2.5 py-1 border border-[#219653] text-[#219653] bg-[#ECFDF5] text-[10px] font-bold rounded-full uppercase">
              {formData.category || 'CATEGORY'}
            </span>
          )}

          <span className="px-2.5 py-1 border border-[#219653] text-[#219653] bg-[#ECFDF5] text-[10px] font-bold rounded-full uppercase">
            {formData.unitOfMeasure || 'CAPSULES'}
          </span>

          {formData.packWeight && (
            <span className="px-2.5 py-1 border border-[#3B82F6] text-[#3B82F6] bg-[#EFF6FF] text-[10px] font-bold rounded-full uppercase">
              {formData.packWeight}gm/pack
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[13px] font-medium text-[#64748B] leading-relaxed">
          {formData.description || 'Product description will appear here...'}
        </p>

        {/* Price Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#E0FFED] border border-[#219653] rounded-md p-3 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold text-[#219653] leading-none">${formData.salePrice || '0'}</span>
            <span className="text-[10px] font-extrabold text-[#219653] mt-1.5 uppercase tracking-wider opacity-60">Sale Price</span>
          </div>
          <div className="bg-[#F8FAFC] border border-[#BDBDD2] rounded-md p-3 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold text-[#181211] leading-none">${formData.costPrice || '0'}</span>
            <span className="text-[10px] font-extrabold text-[#94A3B8] mt-1.5 uppercase tracking-wider">Cost</span>
          </div>
        </div>

        {/* Profit Margin Bar */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-md p-2.5 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Profit Margin</span>
          <span className="text-base font-extrabold text-[#219653]">
            {formData.salePrice > 0
              ? Math.round(((formData.salePrice - formData.costPrice) / formData.salePrice) * 100)
              : 0}%
          </span>
        </div>

        {/* Stock Status Bar */}
        <div className="space-y-2 pt-1 border-t border-dashed border-[#E2E8F0] mt-4">
          <div className="flex justify-between items-center text-[12px] font-bold text-[#181211]">
            <span>Initial Stock</span>
            <span>{formData.initialStock || '100'} {formData.unitOfMeasure?.toLowerCase() || 'capsules'}</span>
          </div>

          <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#219653] transition-all duration-500"
              style={{ width: `${Math.min((formData.initialStock / 200) * 100, 100)}%` }}
            />
          </div>

          <div className="text-[12px] font-medium text-[#181211] space-y-1">
            <p className="text-[#64748B]">Alert below <span className="font-bold text-[#181211]">{formData.lowStockAlert || '10'} capsules</span></p>

            {formData.requiresPrescription && (
              <div className="flex items-center gap-1.5 text-[#CD5100]">
                <span className="w-1 h-1 rounded-full bg-[#CD5100]" />
                <span className="text-[11px] font-bold capitalize">Requires Prescription</span>
              </div>
            )}

            {formData.isLabTested && (
              <div className="flex items-center gap-1.5 text-[#219653]">
                <span className="w-1 h-1 rounded-full bg-[#219653]" />
                <span className="text-[11px] font-bold capitalize">Lab Tested</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InventoryLivePreview;
