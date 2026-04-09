import React from 'react';
import { Icon } from '@iconify/react';

const StoreLivePreview = ({ formData }) => {
  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-[#181211] mb-1 tracking-tight">Live Preview</h3>

      <div className="space-y-0.5">
        {/* Store Header Info - Aligned Middle */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#E2E8F0] rounded-md flex items-center justify-center shrink-0">
            <div className="text-2xl">🌿</div> {/* <Icon icon="fluent:leaf-one-20-filled" className="text-[#219653]" width="34" /> */}
          </div>
          <div className="min-w-0 flex flex-col justify-start mb-2.5">
            <h5 className="text-lg font-bold text-[#45526C] truncate leading-tight">
              {formData.storeName || 'Store Name'}
            </h5>
            <p className="text-[14px] font-bold text-[#64748B] opacity-80 mt-0.5">
              #SE-8921 - New
            </p>
          </div>
        </div>

        <div className="space-y-0.5">
          <p className="text-[14px] font-medium text-[#64748B] leading-relaxed">
            {formData.description || 'Store description will appear here...'}
          </p>
          <p className="text-[12px] font-medium text-[#64748B]">
            9am - 9pm
          </p>
        </div>

        <div className="pt-1 flex flex-col gap-1.5">
          <div className="flex">
            <span className="px-4 py-1.5 border-2 border-[#219653] text-[#219653] text-[12px] font-semibold rounded-full uppercase tracking-wide">
              SAME-DAY
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#219653]">
            <div className="w-2 h-2 rounded-full bg-[#219653]" />
            <span className="text-[13px] font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLivePreview;
