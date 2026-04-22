import React from "react";
import { Icon } from "@iconify/react";

const AuditEntry = ({ action, user, role, target, targetType, description, category, time }) => {
    const getActionColor = (action) => {
        switch (action) {
            case 'update': return 'text-[#0066FF] border-[#0066FF] bg-[#EFF6FF]';
            case 'create': return 'text-[#219653] border-[#219653] bg-[#ECFDF5]';
            case 'delete': return 'text-[#EA3D2A] border-[#EA3D2A] bg-[#FEF2F2]';
            case 'export': return 'text-[#F2994A] border-[#F2994A] bg-[#FFF7ED]';
            case 'login': return 'text-[#EA3D2A] border-[#EA3D2A] bg-[#FEF2F2]';
            default: return 'text-gray-500 border-gray-200 bg-gray-50';
        }
    };

    const getTargetColor = (type) => {
        switch (type) {
            case 'Store': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            case 'Supplier': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            case 'Report': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            case 'Inventory': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            case 'Promo Code': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            case 'Auth': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            case 'Customer': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            case 'Campaign': return 'text-[#0066FF] border-[#BFDBFE] bg-white';
            default: return 'text-[#64748B] border-[#E2E8F0] bg-white';
        }
    };

    return (
        <div className="flex items-center justify-between py-4 px-5 bg-white border border-[#E2E8F0] rounded-xl hover:shadow-sm transition-all group">
            <div className="flex items-center gap-6 flex-1 min-w-0">
                {/* Action Badge */}
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-bold w-24 shrink-0 justify-center ${getActionColor(action)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span className="capitalize">{action}</span>
                </div>

                {/* User Info */}
                <div className="w-40 shrink-0">
                    <h4 className="text-[13px] font-bold text-[#181211] leading-tight">{user}</h4>
                    <p className="text-[11px] font-medium text-[#64748B]">{role}</p>
                </div>

                {/* Target Type Badge */}
                <div className={`px-4 py-0.5 rounded-full border text-[11px] font-bold w-24 shrink-0 text-center ${getTargetColor(targetType)}`}>
                    {targetType}
                </div>

                {/* Description */}
                <p className="text-[13px] font-medium text-[#181211] flex-1 truncate px-2">
                    {description}
                </p>
            </div>

            {/* Metadata (Category & Time) */}
            <div className="flex items-center gap-8 shrink-0">
                <span className="text-[13px] font-medium text-[#64748B] w-24 text-right">{category}</span>
                <div className="flex items-center gap-1.5 text-[#64748B] w-28 justify-end">
                    <Icon icon="lucide:clock" width="14" />
                    <span className="text-[13px] font-medium">{time}</span>
                </div>
            </div>
        </div>
    );
};

const OverviewTab = () => {
    const logs = [
        { action: 'update', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Store', description: 'Updated Forest Oasis operating hours: 9am-9pm → 8am-10pm', category: 'Stores', time: '10:42 AM' },
        { action: 'create', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Supplier', description: 'Added new supplier: ClearLeaf Labs — category Tinctures', category: 'Inventory', time: '10:30 AM' },
        { action: 'export', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Report', description: 'Automated monthly finance report exported and emailed', category: 'Finance', time: '10:00 AM' },
        { action: 'update', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Inventory', description: 'Updated stock count: 87 → 142 caps (manual adjustment)', category: 'Inventory', time: '9:55 AM' },
        { action: 'delete', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Promo Code', description: 'Deleted expired promo code FLASH25 (300/300 uses exhausted)', category: 'Marketing', time: '9:40 AM' },
        { action: 'login', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Auth', description: 'Driver logged in via mobile app — iOS 17.3', category: 'Auth', time: '9:00 AM' },
        { action: 'update', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Customer', description: 'Blocked customer Sandra Olivo — reason: payment fraud attempt', category: 'Customers', time: '8:50 AM' },
        { action: 'create', user: 'Alex Morgan', role: 'Super Admin', targetType: 'Campaign', description: 'Launched Spring Micro-Dose Launch email campaign — 2,840 recipients', category: 'Marketing', time: '8:30 AM' },
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-[14px] font-medium text-[#181211]">
                    Showing <span className="font-bold">8</span> of <span className="font-bold">15 events</span>
                </p>

                <div className="flex items-center gap-3">
                    {['All Modules', 'All Actions', 'All Roles'].map((filter) => (
                        <div key={filter} className="relative group">
                            <button className="flex items-center justify-between gap-4 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[13px] font-semibold text-[#181211] min-w-[130px] hover:bg-gray-50 transition-all">
                                <span>{filter}</span>
                                <Icon icon="lucide:chevron-down" width="16" className="text-[#64748B]" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logs List */}
            <div className="flex flex-col gap-3">
                {logs.map((log, idx) => (
                    <AuditEntry key={idx} {...log} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9] mt-8">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg text-[13px] font-bold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                    <Icon icon="lucide:chevron-left" width="18" />
                    Previous
                </button>

                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, '...', 29].map((page, idx) => (
                        <button
                            key={idx}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-bold transition-all ${page === 1 ? 'bg-[#EA3D2A] text-white shadow-md' : 'text-[#181211] hover:bg-gray-50'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg text-[13px] font-bold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                    Next
                    <Icon icon="lucide:chevron-right" width="18" />
                </button>
            </div>
        </div>
    );
};

export default OverviewTab;
