import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ReusableTableSelect from "../../../../components/common/ReusableTableSelect";

const MODULE_OPTIONS = [
    { value: "Stores", label: "Stores" },
    { value: "Inventory", label: "Inventory" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Auth", label: "Auth" },
    { value: "Customers", label: "Customers" },
];

const ACTION_OPTIONS = [
    { value: "create", label: "Create" },
    { value: "update", label: "Update" },
    { value: "delete", label: "Delete" },
    { value: "export", label: "Export" },
    { value: "login", label: "Login" },
];

const ROLE_OPTIONS = [
    { value: "Super Admin", label: "Super Admin" },
    { value: "Store Manager", label: "Store Manager" },
    { value: "Driver", label: "Driver" },
];

const AuditEntry = ({ action, user, role, targetType, description, category, time }) => {
    const getActionStyle = (action) => {
        switch (action) {
            case 'update': return 'text-[#0066FF] border-[#0066FF] bg-white';
            case 'create': return 'text-[#219653] border-[#219653] bg-white';
            case 'delete': return 'text-[#EA3D2A] border-[#EA3D2A] bg-white';
            case 'export': return 'text-[#F2994A] border-[#F2994A] bg-white';
            case 'login': return 'text-[#EA3D2A] border-[#EA3D2A] bg-white';
            default: return 'text-gray-500 border-gray-200 bg-white';
        }
    };

    return (
        <div className="flex items-center justify-between py-4.5 px-6 border-b border-[#F1F5F9] last:border-0 hover:bg-gray-50/50 transition-all group">
            <div className="flex items-center gap-10 flex-1 min-w-0">
                {/* Action Badge */}
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border-2 text-xs font-semibold w-[80px] shrink-0 justify-center ${getActionStyle(action)}`}>
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>{action}</span>
                </div>

                {/* User Info */}
                <div className="w-[140px] shrink-0">
                    <h4 className="text-sm font-semibold text-[#181211] leading-tight">{user}</h4>
                    <p className="text-[11px] font-medium text-[#64748B] mt-0.5">{role}</p>
                </div>

                {/* Target Type Badge */}
                <div className="px-5 py-1 rounded-full border-2 border-[#0066FF] bg-[#DAE9FF] text-[#0066FF] text-xs font-semibold w-[90px] shrink-0 text-center">
                    {targetType}
                </div>

                {/* Description */}
                <p className="text-[13.5px] font-medium text-[#181211] flex-1 line-clamp-1 pr-4">
                    {description}
                </p>
            </div>

            {/* Metadata (Category & Time) */}
            <div className="flex items-center gap-12 shrink-0">
                <span className="text-[14px] font-medium text-[#181211] w-24 text-right">{category}</span>
                <div className="flex items-center gap-2 text-[#181211] w-28 justify-end">
                    <Icon icon="lucide:clock" width="16" className="text-[#64748B]" />
                    <span className="text-[14px] font-medium">{time}</span>
                </div>
            </div>
        </div>
    );
};

const OverviewTab = () => {
    const [moduleFilter, setModuleFilter] = useState("");
    const [actionFilter, setActionFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

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
            <div className="flex items-center justify-between mb-4">
                <p className="text-[14px] font-medium text-[#181211]">
                    Showing <span className="font-bold text-[#181211]">8</span> of <span className="font-bold text-[#181211]">15 events</span>
                </p>

                <div className="flex items-center gap-2">
                    <ReusableTableSelect
                        value={moduleFilter}
                        onChange={(e) => setModuleFilter(e.target.value)}
                        options={MODULE_OPTIONS}
                        placeholder="All Modules"
                        className="w-37"
                    />
                    <ReusableTableSelect
                        value={actionFilter}
                        onChange={(e) => setActionFilter(e.target.value)}
                        options={ACTION_OPTIONS}
                        placeholder="All Actions"
                        className="w-37"
                    />
                    <ReusableTableSelect
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        options={ROLE_OPTIONS}
                        placeholder="All Roles"
                        className="w-37"
                    />
                </div>
            </div>

            {/* Logs List - Unified Container with Integrated StoreTable Pagination */}
            <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col mt-2">
                <div className="flex flex-col">
                    {logs.map((log, idx) => (
                        <AuditEntry key={idx} {...log} />
                    ))}
                </div>

                {/* Integrated Pagination Footer - Synced with StoreTable hierarchy */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white border-t border-[#F1F5F9] gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                        <Icon icon="lucide:chevron-left" width="18" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                        {[1, 2, 3, '...', 29].map((page, idx) => (
                            <button
                                key={idx}
                                className={`w-9 h-9 flex items-center justify-center rounded-sm text-sm font-medium transition-all ${page === 1
                                    ? "bg-[#EA3D2A] text-white shadow-md"
                                    : page === '...'
                                        ? "text-[#94A3B8] cursor-default"
                                        : "text-[#181211] hover:bg-gray-50"}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                        <span className="hidden sm:inline">Next</span>
                        <Icon icon="lucide:chevron-right" width="18" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default OverviewTab;
