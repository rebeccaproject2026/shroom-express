import React from 'react';
import { Icon } from '@iconify/react';

const CustomerLivePreview = ({ formData }) => {
    return (
        <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm space-y-2 font-manrope">
            <h3 className="text-lg font-semibold text-[#181211] mb-1.5 tracking-tight">Live Preview</h3>
            <div className="flex items-center gap-3">
                <div className="w-13 h-13 bg-[#E2E8F0] border border-[#E2E8F0] rounded-md flex items-center justify-center text-xl shrink-0 overflow-hidden">
                    {formData.profileImage ? (
                        <img src={URL.createObjectURL(formData.profileImage)} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xl font-bold text-[#EA3D2A]">
                            {formData.firstName?.[0] || 'F'}{formData.lastName?.[0] || 'N'}
                        </span>
                    )}
                </div>
                <div className="min-w-0 flex flex-col justify-start">
                    <h5 className="text-base font-bold text-[#475569] truncate leading-tight">
                        {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : "Customer Name"}
                    </h5>

                    <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-[11px] font-semibold text-[#0066FF] px-2 py-0.5 rounded-full border border-[#0066FF] uppercase">
                            REGULAR
                        </span>
                        <span className="text-[11px] font-semibold text-[#219653] px-2 py-0.5 rounded-full border border-[#219653] uppercase">
                            ACTIVE
                        </span>
                    </div>
                </div>
            </div>


            <div className="space-y-2 border-t border-[#F1F5F9]/50 pt-2">
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm border border-transparent">
                    <Icon icon="carbon:email" width="16" className="shrink-0" />
                    <span className="truncate">{formData.email || 'email@customer.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm border border-transparent">
                    <Icon icon="solar:phone-outline" width="16" className="shrink-0" />
                    <span>{formData.phone || 'Phone number'}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm border border-transparent">
                    <Icon icon="meteor-icons:map-pin" width="16" className="shrink-0" />
                    <span>{formData.location || 'Location'}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-[#BDBDD2] rounded-full bg-[#F8F8F8]">
                        <Icon icon="ri:timer-line" className="text-[#475569]" width="15" />
                        <span className="text-xs font-semibold text-[#475569]">Forest Oasis</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-[#BDBDD2] rounded-full bg-[#F8F8F8]">
                        <Icon icon="subway:power" className="text-[#475569]" width="15" />
                        <span className="text-xs font-semibold text-[#475569]">Express</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerLivePreview;

