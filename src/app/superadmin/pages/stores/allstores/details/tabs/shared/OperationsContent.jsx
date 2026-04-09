import React from 'react';
import { Icon } from "@iconify/react";
import { Toggle, Field } from './TabUIAtoms';

const OperationsContent = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const activeDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Delivery Options */}
            <div className="mb-4 opacity-60">
                <h2 className="text-lg font-bold text-[#181211] mb-4">Delivery Options <span className="text-[#EA3D2A]">*</span></h2>

                <div className="space-y-4">
                    {/* Same-Day Delivery */}
                    <div className="border border-[#E2E8F0] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0]">
                            <div className="space-y-1">
                                <h3 className="text-sm font-semibold text-[#181211]">Same-Day Delivery</h3>
                                <p className="text-sm text-[#475569] font-medium mb-2">Orders delivered the same day they are placed</p>
                            </div>
                            <Toggle enabled={true} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#181211] flex items-center gap-1">
                                    Minimum Order Amount <span className="text-[#EA3D2A]">*</span>
                                </label>
                                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm px-4 py-2.5 text-[#181211] text-[14px] font-semibold flex items-center gap-2">
                                    <span className="text-[#475569]">$</span>
                                    <span className='text-[#475569]'>25.00</span>
                                </div>
                            </div>
                            <Field label="Max Delivery Radius (ml)" value="15" required />
                        </div>
                    </div>

                    {/* Express Delivery */}
                    <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-[#181211]">Express Delivery</h3>
                            <p className="text-[13px] text-[#475569] font-regular">Priority delivery within 2-3 hours</p>
                        </div>
                        <Toggle enabled={false} />
                    </div>

                    {/* Shipping */}
                    <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-[#181211]">Shipping (Mail Order)</h3>
                            <p className="text-[13px] text-[#475569] font-regular">Nationwide shipping via Canada Post / courier</p>
                        </div>
                        <Toggle enabled={false} />
                    </div>
                </div>
            </div>

            {/* Operating Days */}
            <div className="mb-4.5">
                <h2 className="text-sm font-semibold text-[#181211] mb-4">Operating Days <span className="text-[#EA3D2A]">*</span></h2>
                <div className="flex flex-wrap gap-3 opacity-60">
                    {days.map((day) => (
                        <div
                            key={day}
                            className={`w-14 h-14 rounded-lg flex items-center justify-center text-[15px] font-semibold border transition-all ${activeDays.includes(day)
                                ? "bg-[#FFEDEB] border-[#EA3D2A] text-[#EA3D2A]"
                                : "bg-white border-[#E2E8F0] text-[#64748B]"
                                }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Opening & Closing Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-[#181211]">
                        Opening Time <span className="text-[#EA3D2A]">*</span>
                    </h2>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm px-4 py-2.5 text-[#475569] text-sm font-semibold flex items-center justify-between">
                        <span>09:00 PM</span>
                        <Icon icon="mingcute:time-line" className="text-[#181211]" width="18" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-[#181211]">
                        Closing Time <span className="text-[#EA3D2A]">*</span>
                    </h2>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm px-4 py-2.5 text-[#475569] text-sm font-semibold flex items-center justify-between">
                        <span>09:00 AM</span>
                        <Icon icon="mingcute:time-line" className="text-[#181211]" width="18" />
                    </div>
                </div>
            </div>

            {/* Store Settings */}
            <div className="mb-4.5 opacity-60">
                <h2 className="text-sm font-semibold text-[#181211] mb-2">Store Settings <span className="text-[#EA3D2A]">*</span></h2>
                <div className="space-y-4">
                    <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-[#181211]">Auto-Accept Orders</h3>
                            <p className="text-[13px] text-[#475569] font-regular">Automatically accept incoming orders without manual approval</p>
                        </div>
                        <Toggle enabled={true} />
                    </div>
                    <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-[#181211]">Featured Store</h3>
                            <p className="text-[13px] text-[#475569] font-regular">Highlight this store at the top of search results</p>
                        </div>
                        <Toggle enabled={false} />
                    </div>
                    <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-[#181211]">Set Store as Active</h3>
                            <p className="text-[13px] text-[#475569] font-regular">Store will be live and visible to customers immediately</p>
                        </div>
                        <Toggle enabled={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperationsContent;
