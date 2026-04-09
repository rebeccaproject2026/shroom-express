import React from 'react';
import { Icon } from "@iconify/react";

const SuspensionDetailsContent = ({ onOpenReinstate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Suspension Countdown Progress Bar */}
            <div className="bg-white p-3 rounded-lg border border-[#FF9F40] shadow-[0px_4px_4px_0px_rgba(255,159,64,0.25)] mb-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 ">
                        <Icon icon="mingcute:time-line" className="text-[#F2994A]" width="20" />
                        <h4 className="text-base font-semibold text-[#8E1103]">Suspension Countdown</h4>
                    </div>
                    <span className="text-sm font-semibold text-[#181211]">4d left</span>
                </div>
                {/* Progress Bar Container */}
                <div className="relative h-2  bg-[#F1F5F9] rounded-full overflow-hidden mb-3">
                    <div className="absolute left-0 top-0 h-full w-[63%] bg-[#475569] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[13px] font-medium text-[#0F172A]">
                    <span>Suspended Mar 06, 2026</span>
                    <span>Lifts Mar 13, 2026</span>
                </div>
            </div>

            {/* Suspension Summary Card */}
            <div className="p-1 rounded-lg border border-[#FF9F40] bg-[#FFF7E8] shadow-[0px_4px_4px_0px_rgba(255,159,64,0.25)] mb-3">
                <div className="p-3 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Icon icon="material-symbols:warning-rounded" className="text-[#FF9F40]" width="20" />
                        <h4 className="text-base font-semibold text-[#181211]">Suspension Summary</h4>
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
                            <div key={idx} className="bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 shadow-sm">
                                <p className="text-xs font-medium text-[#475569] mb-0.5">{item.label}</p>
                                <p className={`text-sm font-semibold ${item.isCritical ? 'text-[#EA3D2A]' : 'text-[#475569]'}`}>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Primary Violation Reason */}
            <div className="bg-[#FFF5F5] border border-[#FFC8C2] rounded-md p-3 mb-3">
                <div className="flex items-center gap-2 text-[#EA3D2A] mb-2">
                    <Icon icon="material-symbols:warning-rounded" width="20" />
                    <h4 className="text-base font-semibold">Primary Violation Reason</h4>
                </div>
                <p className="text-sm text-[#8E1103] font-medium leading-relaxed">
                    Store was found listing product variants outside of their approved category <span className="font-semibold">(Micro dosing)</span>. Specifically, full-spectrum edibles marked as "Beginner" tier were found in a restricted dosage range. This violates ShroomExpress Platform Policy §4.2 — Product Listing Standards.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {["43.5 Product Listing", "High Severity", "2nd Occurrence"].map((tag, index) => {
                        const isLastTwo = index >= 1; // last two items

                        return (
                            <span
                                key={tag}
                                className={`px-3 py-1 text-[11px] font-semibold rounded-full  border
          ${isLastTwo
                                        ? "bg-[#FFF7E8] text-[#8E1103] border-[#8E1103]"
                                        : "bg-white text-[#EA3D2A] border-[#EA3D2A]"
                                    }`}
                            >
                                {tag}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* What's Restricted During Suspension */}
            <div className="bg-[#F8F8F8] border border-[#E2E8F0] rounded-lg p-3 shadow-sm mb-3">
                <h4 className="text-base px-1 pt-2 mb-1.5 font-semibold text-[#181211]">
                    What's Restricted During Suspension
                </h4>

                <div className="space-y-2">
                    {[
                        { label: "New orders", sub: "Store hidden from all customer searches and listings", icon: "mdi:cart" },
                        { label: "Inventory updates", sub: "Product edits are locked until suspension is lifted", icon: "si:inventory-line" },
                        { label: "Promotions", sub: "All active promotions have been paused automatically", icon: "hugeicons:promotion" },
                        { label: "New payouts", sub: "Payout processing paused, existing balance held", icon: "solar:card-outline" },
                        { label: "Reviews", sub: "New customer reviews cannot be submitted", icon: "material-symbols:star-rounded" },
                    ].map((item, idx) => {
                        const isReview = item.label === "Reviews";

                        return (
                            <div
                                key={idx}
                                className={`flex items-center justify-between p-3 border rounded-sm  bg-white border-[#E2E8F0]
                                    `}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-sm flex items-center justify-center shadow-sm ${isReview
                                            ? "bg-[#FFF7E8] text-[#FF9F40]"
                                            : "bg-[#F8F8F8] text-[#181211]"
                                            }`}
                                    >
                                        <Icon icon={item.icon} width="22" />
                                    </div>

                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <h5 className="text-[15px] font-semibold text-[#181211]">{item.label}</h5>
                                            <span className="px-2 py-0.5 bg-[#FFEDEB] text-[#EA3D2A] text-[10px] font-semibold rounded">
                                                Restricted
                                            </span>
                                        </div>

                                        <p className="text-[12.5px] text-[#475569] font-medium">
                                            {item.sub}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Requirements to Reinstate */}
            <div className="bg-[#E0FFED] bg-opacity-30 border border-[#CDFFE2] border-opacity-30 rounded-md p-3 space-y-5">
                <div className="flex items-center gap-2 text-[#219653] mb-2">
                    <Icon icon="charm:tick" width="25" strokeWidth={3} />
                    <h4 className="text-base font-semibold">Requirements to Reinstate</h4>
                </div>
                <div className="space-y-2">
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
                            <p className="text-sm text-[#475569] font-medium pt-0.5">{req}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onOpenReinstate}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#219653] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(100,116,139,0.2),0px_10px_15px_-3px_rgba(100,116,139,0.2)] transition-all active:scale-95 mt-2"
                >
                    <Icon icon="hugeicons:play-circle-01" width="22" />
                    Begin Reinstatement Process
                </button>
            </div>
        </div>
    );
};

export default SuspensionDetailsContent;
