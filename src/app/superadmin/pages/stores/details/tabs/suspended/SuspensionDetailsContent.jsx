import React from 'react';
import { Icon } from "@iconify/react";

const SuspensionDetailsContent = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Suspension Countdown Progress Bar */}
            <div className="bg-white p-5 rounded-md border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Icon icon="lucide:timer" className="text-[#F2994A]" width="20" />
                        <h4 className="text-base font-bold text-[#181211]">Suspension Countdown</h4>
                    </div>
                    <span className="text-sm font-bold text-[#181211]">4d left</span>
                </div>
                {/* Progress Bar Container */}
                <div className="relative h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden mb-3">
                    <div className="absolute left-0 top-0 h-full w-[65%] bg-[#475569] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[13px] font-medium text-[#64748B]">
                    <span>Suspended Mar 06, 2026</span>
                    <span>Lifts Mar 13, 2026</span>
                </div>
            </div>

            {/* Suspension Summary Card */}
            <div className="p-1 rounded-lg border border-[#FDE6D2] bg-[#FFFBF7]">
                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Icon icon="lucide:alert-triangle" className="text-[#F2994A]" width="20" />
                        <h4 className="text-base font-bold text-[#181211]">Suspension Summary</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Suspended By", value: "Alex Morgan (Super Admin)" },
                            { label: "Suspended Date", value: "Mar 06, 2026 • 2:00 PM" },
                            { label: "Duration", value: "7 days (4 remaining)" },
                            { label: "Expected Lift", value: "Mar 13, 2026" },
                            { label: "Reason", value: "Policy Violation" },
                            { label: "Severity", value: "High", isCritical: true },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border border-[#E2E8F0] rounded-md px-4 py-3 shadow-sm">
                                <p className="text-[12.5px] font-semibold text-[#475569] mb-1">{item.label}</p>
                                <p className={`text-sm font-bold ${item.isCritical ? 'text-[#EA3D2A]' : 'text-[#181211]'}`}>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Primary Violation Reason */}
            <div className="bg-[#FFF5F5] border border-[#FFDADA] rounded-md p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#EA3D2A]">
                    <Icon icon="lucide:alert-circle" width="18" strokeWidth={3} />
                    <h4 className="text-[15px] font-bold uppercase tracking-wide">Primary Violation Reason</h4>
                </div>
                <p className="text-sm text-[#181211] font-medium leading-relaxed">
                    Store was found listing product variants outside of their approved category <span className="font-bold">(Micro dosing)</span>. Specifically, full-spectrum edibles marked as "Beginner" tier were found in a restricted dosage range. This violates ShroomExpress Platform Policy §4.2 — Product Listing Standards.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {["43.5 Product Listing", "High Severity", "2nd Occurrence"].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white border border-[#EA3D2A] text-[#EA3D2A] text-[11px] font-bold rounded-full uppercase tracking-tighter">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* What's Restricted During Suspension */}
            <div className="bg-white border border-[#E2E8F0] rounded-md p-5 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-[#181211]">What's Restricted During Suspension</h4>
                <div className="space-y-2">
                    {[
                        { label: "New orders", sub: "Store hidden from all customer searches and listings", icon: "hugeicons:shopping-cart-01" },
                        { label: "Inventory updates", sub: "Product edits are locked until suspension is lifted", icon: "hugeicons:package-add" },
                        { label: "Promotions", sub: "All active promotions have been paused automatically", icon: "hugeicons:megaphone-01" },
                        { label: "New payouts", sub: "Payout processing paused, existing balance held", icon: "hugeicons:wallet-01" },
                        { label: "Reviews", sub: "New customer reviews cannot be submitted", icon: "hugeicons:star-comment-vertical" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#F1F5F9] rounded-md">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-[#181211] shadow-sm border border-[#E2E8F0]">
                                    <Icon icon={item.icon} width="22" />
                                </div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <h5 className="text-sm font-bold text-[#181211]">{item.label}</h5>
                                        <span className="px-2 py-0.5 bg-[#FFEDEB] text-[#EA3D2A] text-[10px] font-bold rounded uppercase">Restricted</span>
                                    </div>
                                    <p className="text-[12.5px] text-[#64748B] font-medium">{item.sub}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Requirements to Reinstate */}
            <div className="bg-[#CDFFE2] bg-opacity-30 border border-[#219653] border-opacity-30 rounded-md p-6 space-y-5">
                <div className="flex items-center gap-2 text-[#219653]">
                    <Icon icon="hugeicons:tick-02" width="20" strokeWidth={3} />
                    <h4 className="text-base font-bold">Requirements to Reinstate</h4>
                </div>
                <div className="space-y-3.5">
                    {[
                        "Remove all non-compliant product listings",
                        "Acknowledge violation in writing to admin",
                        "Complete platform compliance re-onboarding",
                        "No active unresolved customer disputes",
                        "Admin approval via reinstatement checklist"
                    ].map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full border-2 border-[#219653] border-opacity-60 flex items-center justify-center shrink-0 text-[#219653] font-bold text-xs">
                                {idx + 1}
                            </div>
                            <p className="text-sm text-[#181211] font-semibold pt-0.5">{req}</p>
                        </div>
                    ))}
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#219653] text-white rounded-lg text-[15px] font-bold shadow-md hover:bg-opacity-90 transition-all active:scale-95 mt-2">
                    <Icon icon="hugeicons:play-circle-01" width="22" />
                    Begin Reinstatement Process
                </button>
            </div>
        </div>
    );
};

export default SuspensionDetailsContent;
