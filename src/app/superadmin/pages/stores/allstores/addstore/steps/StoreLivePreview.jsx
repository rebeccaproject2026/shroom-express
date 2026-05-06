import React from 'react';
import { Icon } from '@iconify/react';

const StoreLivePreview = ({ formData }) => {
  const primaryLocation = formData.locations[0] || {};
  const storeName = primaryLocation.storeName || 'Store Name';
  const description = primaryLocation.description || 'Store description will appear here...';

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      <h3 className="text-[15px] font-bold text-[#181211] p-4 border-b border-[#BDBDD2] tracking-tight">Live Preview</h3>

      <div className="p-4 space-y-4">
        {/* Store Header Info - Aligned Middle */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-md bg-[#F1F5F9] flex items-center justify-center overflow-hidden shrink-0 border border-[#EDF2F7]">
            {formData.logo ? (
              <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#FFEDEB] flex items-center justify-center">
                <Icon icon="lucide:store" className="text-[#EA3D2A]" width="28" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex flex-col justify-start">
            <h5 className="text-[16px] font-bold text-[#181211] truncate leading-tight">
              {storeName}
            </h5>
            <span className="text-[11px] font-bold text-[#EA3D2A] mt-0.5">
              #SE-8921 - New
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-[13px] font-medium text-[#64748B] line-clamp-3 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B]">
             <Icon icon="lucide:clock" width="12" />
             <span>9am - 9pm</span>
          </div>
        </div>

        {/* Status and Badges */}
        <div className="pt-1 flex flex-col gap-3">
          <div className="flex">
            <span className="px-3 py-1 border border-[#219653] text-[#219653] text-[10px] font-bold rounded-full uppercase tracking-wider bg-[#219653]/5">
              SAME-DAY
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#219653]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#219653] animate-pulse" />
            <span className="text-[12px] font-bold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLivePreview;
