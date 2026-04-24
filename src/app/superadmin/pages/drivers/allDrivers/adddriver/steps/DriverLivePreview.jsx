import React from 'react';
import { Icon } from '@iconify/react';

const DriverLivePreview = ({ formData }) => {
  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm space-y-2">
      <h3 className="text-lg font-semibold text-[#181211] mb-1 tracking-tight">Live Preview</h3>

      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-[#E2E8F0] border border-[#E2E8F0] rounded-md flex items-center justify-center text-2xl shrink-0 overflow-hidden">
          {formData.driverImage ? (
            <img src={URL.createObjectURL(formData.driverImage)} className="w-full h-full object-cover" />
          ) : (
            <Icon icon="lucide:user" width="32" className="text-[#94A3B8]" />
          )}
        </div>
        <div className="min-w-0 flex flex-col justify-start mb-2.5">
          <h5 className="text-base font-bold text-[#475569] truncate leading-tight">
            {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : 'Driver Name'}
          </h5>
          <p className="text-xs font-medium text-[#475569] mt-1">
            Tagline not yet
          </p>
        </div>
      </div>

      <div className="space-y-2 border-t border-[#F1F5F9]/50 pt-2">
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm">
          <Icon icon="carbon:email" width="16" className="shrink-0" />
          <span className="truncate">{formData.email || 'email@supplier.com'}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm">
          <Icon icon="solar:phone-outline" width="16" className="shrink-0" />
          <span>{formData.phoneNumber || 'Phone number'}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#475569] bg-[#F8F8F8] p-2 rounded-sm">
          <Icon icon="meteor-icons:map-pin" width="16" className="shrink-0" />
          <span>ON</span>
        </div>
      </div>
    </div>
  );
};

export default DriverLivePreview;
