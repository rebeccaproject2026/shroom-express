import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Input from "../../../components/common/Input";

const Toggle = ({ enabled, onChange }) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);

const DeliveryTab = () => {
    const [types, setTypes] = useState({
        express: true,
        sameDay: true,
        standard: true,
        scheduled: true
    });

    const deliveryTypeList = [
        { id: 'express', label: 'Express Delivery', sub: '~30-60 min' },
        { id: 'sameDay', label: 'Same-Day Delivery', sub: 'Same business day' },
        { id: 'standard', label: 'Standard Delivery', sub: '1-2 business days' },
        { id: 'scheduled', label: 'Scheduled Delivery', sub: 'Customer picks date' },
    ];

    return (
        <div className="p-4 max-w-full animate-in fade-in slide-in-from-bottom-2 duration-500 font-manrope">
            <div className="bg-white border border-[#E2E8F0] rounded-md p-5 space-y-10">
                
                {/* ── Section 1: Delivery Types ── */}
                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-semibold text-[#181211]">Delivery Types</h2>
                        <p className="text-sm font-medium text-[#475569] mt-1">Enable or disable delivery options platform-wide</p>
                    </div>

                    <div className="space-y-3">
                        {deliveryTypeList.map((type) => (
                            <div key={type.id} className="p-3 border border-[#BDBDD2] rounded-md flex items-center justify-between transition-all hover:bg-[#F8FAFC]/50">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-semibold text-[#181211]">{type.label}</h4>
                                    <p className="text-xs font-medium text-[#475569]">{type.sub}</p>
                                </div>
                                <Toggle
                                    enabled={types[type.id]}
                                    onChange={() => setTypes({ ...types, [type.id]: !types[type.id] })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Section 2: Delivery Settings ── */}
                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-semibold text-[#181211]">Delivery Settings</h2>
                        <p className="text-sm font-medium text-[#475569] mt-1">Configure zones, ETAs, and commission rates</p>
                    </div>

                    <div className="space-y-5 pt-0 border-none">
                        {/* Max Delivery Radius */}
                        <div className="space-y-1.5 flex flex-col">
                            <label className="text-[14.5px] font-semibold text-[#181211]">
                                Max Delivery Radius <span className="text-[#EA3D2A] ml-0.5">*</span>
                            </label>
                            <p className="text-xs font-medium text-[#475569] mb-0.5">In kilometres from store</p>
                            <Input 
                                placeholder="15"
                                defaultValue="15"
                                borderClass="border border-[#E2E8F0]"
                                className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm font-medium text-[#181211]"
                            />
                        </div>

                        {/* Default ETA */}
                        <div className="space-y-1.5 flex flex-col">
                            <label className="text-[14.5px] font-semibold text-[#181211]">
                                Default ETA (min) <span className="text-[#EA3D2A] ml-0.5">*</span>
                            </label>
                            <p className="text-xs font-medium text-[#475569] mb-0.5">Shown to customers on checkout</p>
                            <Input 
                                placeholder="30"
                                defaultValue="30"
                                borderClass="border border-[#E2E8F0]"
                                className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm font-medium text-[#181211]"
                            />
                        </div>

                        {/* Commission Rate */}
                        <div className="space-y-1.5 flex flex-col">
                            <label className="text-[14.5px] font-semibold text-[#181211]">
                                Commission Rate (%) <span className="text-[#EA3D2A] ml-0.5">*</span>
                            </label>
                            <p className="text-xs font-medium text-[#475569] mb-0.5">Platform commission on each order</p>
                            <Input 
                                placeholder="12"
                                defaultValue="12"
                                borderClass="border border-[#E2E8F0]"
                                className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm font-medium text-[#181211]"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Footer Actions ── */}
                <div className="p-4 border-t border-[#E2E8F0] flex gap-4">
                    <button
                        className="flex-1 px-4 py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold border border-[#E2E8F0] transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-4 py-2.5 bg-[#EA3D2A]  text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(24,18,17,0.2),0px_10px_15px_-3px_rgba(24,18,17,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Icon icon="lucide:check" width="18" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryTab;
