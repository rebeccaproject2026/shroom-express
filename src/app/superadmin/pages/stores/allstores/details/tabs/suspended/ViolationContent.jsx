import React from 'react';
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';

const ViolationContent = () => {
    const navigate = useNavigate();
    const violations = [
        {
            id: 1,
            severity: "Medium Severity",
            type: "Customer Complaint",
            description: "3 customers reported receiving incorrect product quantities.",
            date: "Mar 05, 2026",
            status: "Under Review",
            bgColor: "bg-[#FFF7E8]",
            borderColor: "border-[#FFF7E8]",
            accentColor: "text-[#FF9F40]",
            accentbordercolor: "border-[#FF9F40]",
            icon: "material-symbols:warning-rounded",
            actions: [
                { label: "View Details", variant: "outline" },
                { label: "Mark Confirmed", variant: "solid", color: "bg-[#EA3D2A]" }
            ]
        },
        {
            id: 2,
            severity: "High Severity",
            type: "Policy Violation",
            description: "Store listed prohibited product variants outside approved categories.",
            date: "Mar 05, 2026",
            status: "Confirmed",
            bgColor: "bg-[#FFEDEB]",
            borderColor: "border-[#FFC8C2]",
            accentColor: "text-[#EA3D2A]",
            accentbordercolor: "border-[#EA3D2A]",
            icon: "openmoji:police-car-light",
            actions: [
                { label: "View Details", variant: "outline" }
            ]
        }
    ];

    const historyStats = [
        { label: "Total Violations", value: "2", bgColor: "bg-[#FFEDEB]", borderColor: "border-[#FFC8C2]", textColor: "text-[#8E1103]" },
        { label: "Confirmed", value: "1", bgColor: "bg-[#FFEDEB]", borderColor: "border-[#FFC8C2]", textColor: "text-[#8E1103]" },
        { label: "Under Review", value: "1", bgColor: "bg-[#FFF7E8]", borderColor: "border-[#FFBE40]", textColor: "text-[#FFBE40]" },
        { label: "Customer Complaints", value: "3", bgColor: "bg-white", borderColor: "border-[#BDBDD2]", textColor: "text-[#475569]" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-semibold text-[#181211]">
                    <span className="text-[#EA3D2A]">2 violations</span> recorded against this store
                </h4>
                <button onClick={() => navigate("/superadmin/stores/all")} className="text-[#EA3D2A] text-sm font-semibold hover:underline">
                    View All Orders
                </button>
            </div>

            {/* Violation Cards */}
            <div className="space-y-4 mb-4">
                {violations.map((violation) => (
                    <div
                        key={violation.id}
                        className={`${violation.bgColor} border ${violation.borderColor} rounded-sm overflow-hidden shadow-sm`}
                    >
                        {/* Severity Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white bg-opacity-50">
                            <div className={`flex items-center gap-2 ${violation.accentColor}`}>
                                <Icon icon={violation.icon} width="20" />
                                <span className="text-sm font-semibold">{violation.severity}</span>
                            </div>
                            <span className={`px-4 py-1 rounded-full text-xs font-bold border ${violation.accentbordercolor} ${violation.accentColor} bg-white bg-opacity-60`}>
                                {violation.status}
                            </span>
                        </div>

                        {/* Content Body */}
                        <div className="p-4 bg-white bg-opacity-40">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div className="space-y-1">
                                    <h5 className="text-lg font-semibold text-[#475569] mb-0.5">{violation.type}</h5>
                                    <p className="text-sm text-[#475569] font-regular leading-relaxed">
                                        {violation.description}
                                    </p>
                                    <p className="text-sm text-[#64748B] font-semibold pt-1">
                                        {violation.date}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {violation.actions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${action.variant === 'solid'
                                                ? `${action.color} text-white shadow-sm hover:opacity-90`
                                                : 'bg-white border border-[#BDBDD2] text-[#475569] hover:bg-[#F8FAFC]'
                                                }`}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Violation History Section */}
            <div className="bg-[#F8F8F8] border border-[#E2E8F0] rounded-sm p-4 space-y-5">
                <div className="mb-2">
                    <h5 className="text-lg font-semibold text-[#475569] mb-0.5">Violation History</h5>
                    <p className="text-sm text-[#475569] font-regular leading-relaxed">
                        This is store's 2nd violation in 30 days, flagged for elevated monitoring
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {historyStats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`${stat.bgColor} border border-t-[5px] ${stat.borderColor} rounded-xl p-4 shadow-md transition-all cursor-default group`}
                        >
                            <p className={`text-sm font-semibold ${stat.textColor} mb-2 `}>{stat.label}</p>
                            <h3 className={`text-2xl font-bold ${stat.textColor} leading-none`}>
                                {stat.value}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViolationContent;
