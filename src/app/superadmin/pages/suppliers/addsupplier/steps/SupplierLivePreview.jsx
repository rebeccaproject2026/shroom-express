import React from 'react';
import { Icon } from '@iconify/react';

const SupplierLivePreview = ({ formData, currentStep }) => {
    return (
        <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm space-y-2">
            <h3 className="text-lg font-semibold text-[#181211] mb-1 tracking-tight">Live Preview</h3>
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-[#E2E8F0] border border-[#E2E8F0] rounded-md flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    {formData.logo ? (
                        <img src={URL.createObjectURL(formData.logo)} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-2xl">🌿</div>
                    )}
                </div>
                <div className="min-w-0 flex flex-col justify-start mb-2.5">
                    <h5 className="text-base font-bold text-[#475569] truncate leading-tight">
                        {formData.companyName || 'Supplier Name'}
                    </h5>
                    <p className="text-xs font-medium text-[#475569] mt-1">
                        Tagline not yet
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-1.5">
                <span className="text-[11px] font-semibold text-[#0066FF]  px-2 py-1 rounded-full border border-[#0066FF] uppercase">
                    {formData.category || 'MICRO DOSING'}
                </span>
                <span className="text-[11px] font-semibold text-[#F2994A]  px-2 py-1 rounded-full border border-[#F2994A] uppercase">
                    PENDING
                </span>
            </div>

            <div className="space-y-2  border-t border-[#F1F5F9]/50">
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm">
                    <Icon icon="carbon:email" width="16" className="shrink-0" />
                    <span className="truncate">{formData.email || 'email@supplier.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm">
                    <Icon icon="solar:phone-outline" width="16" className="shrink-0" />
                    <span>{formData.phone || 'Phone number'}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#F8F8F8] p-2 rounded-sm">
                    <Icon icon="mynaui:globe" width="16" className="shrink-0" />
                    <span className="truncate">{formData.website || 'website.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#475569] bg-[#F8F8F8] p-2 rounded-sm">
                    <Icon icon="meteor-icons:map-pin" width="16" className="shrink-0" />
                    <span>{formData.province || 'ON'}</span>
                </div>
            </div>

            {/* Commercial Badges - Only steps 3 and 4 */}
            {currentStep >= 3 && (
                <div className="flex items-center justify-between gap-1 pt-1 opacity-90 animate-in fade-in duration-500">
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-[#BDBDD2] rounded-full bg-[#F8F8F8]">
                        <Icon icon="ion:card-outline" className="text-[#475569]" width="15" />
                        <span className="text-xs font-semibold text-[#475569]">{formData.paymentTerms || 'Net 30'}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-[#BDBDD2] rounded-full bg-[#F8F8F8]">
                        <Icon icon="ri:timer-line" className="text-[#475569]" width="15" />
                        <span className="text-xs font-semibold text-[#475569]">{formData.leadTime ? formData.leadTime + 'd lead' : 'Lead Time'}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-[#BDBDD2] rounded-full bg-[#F8F8F8]">
                        <Icon icon="solar:box-outline" className="text-[#475569]" width="15" />
                        <span className="text-xs font-semibold text-[#475569]">{formData.minOrder ? 'Min $' + formData.minOrder : 'Min Order'}</span>
                    </div>
                </div>
            )}

            {/* Primary Contact Section - Only step 4 */}
            {currentStep === 4 && (
                <div className="p-3 border border-[#BDBDD2] rounded-md bg-[#F8F8F8]/50 space-y-2 mt-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-xs font-semibold text-[#475569] uppercase">Primary Contact</p>
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EA3D2A] flex items-center justify-center text-white font-bold text-[13px] shrink-0 shadow-sm">
                            {formData.contacts?.[0]?.name ? formData.contacts[0].name.charAt(0).toUpperCase() : 'N'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-[#475569] truncate uppercase ">
                                {formData.contacts?.[0]?.name || 'NAME'}
                            </p>
                            <p className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-tighter">
                                {formData.contacts?.[0]?.role || 'ROLE'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierLivePreview;
