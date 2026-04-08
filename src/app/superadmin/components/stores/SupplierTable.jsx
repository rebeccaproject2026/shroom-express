import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import ReusableTableSelect from '../common/ReusableTableSelect';
import ReusableSearchInput from '../common/ReusableSearchInput';

const TABS = [
    { label: 'All', count: '1,284' },
    { label: 'Active', count: '952' },
    { label: 'Pending', count: '48' },
    { label: 'Suspended', count: '7' },
];

const CATEGORY_OPTIONS = [
    { value: 'Edibles', label: 'Edibles' },
    { value: 'Tinctures', label: 'Tinctures' },
    { value: 'Full Spectrum', label: 'Full Spectrum' },
    { value: 'Wellness', label: 'Wellness' },
    { value: 'Capsules', label: 'Capsules' },
    { value: 'Micro Dosing', label: 'Micro Dosing' },
];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Top Rated' },
];

const SupplierTable = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [globalFilter, setGlobalFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    const suppliers = [
        {
            id: 1,
            name: "AlphaBotani...",
            location: "Ottawa, ON",
            category: "Edibles",
            lead: "6d",
            onTime: 85,
            spend: "$4,400",
            spendSub: "Net 30",
            orders: 9,
            status: "Active",
            rating: 4.1
        },
        {
            id: 2,
            name: "ClearLeaf La...",
            location: "Edmonton, AB",
            category: "Tinctures",
            lead: "4d",
            onTime: null,
            spend: "$0",
            spendSub: "Net 30",
            orders: 0,
            status: "Pending",
            rating: 0
        },
        {
            id: 3,
            name: "EarthDrop C...",
            location: "Vancouver, BC",
            category: "Tinctures",
            lead: "3d",
            onTime: 88,
            spend: "$12,600",
            spendSub: "Net 15",
            orders: 31,
            ordersSub: "3 Pending",
            status: "Active",
            rating: 4.5
        },
        {
            id: 4,
            name: "FungalTech...",
            location: "Calgary, AB",
            category: "Full Spectrum",
            lead: "7d",
            onTime: 71,
            spend: "$3,200",
            spendSub: "Net 60",
            orders: 8,
            status: "Suspended",
            rating: 3.9
        },
        {
            id: 5,
            name: "GreenRoot...",
            location: "Mississauga, ON",
            category: "Wellness",
            lead: "5d",
            onTime: 95,
            spend: "$14,200",
            spendSub: "Net 45",
            orders: 18,
            status: "Active",
            rating: 4.7
        },
        {
            id: 6,
            name: "MushroomP...",
            location: "Victoria, BC",
            category: "Capsules",
            lead: "5d",
            onTime: 90,
            spend: "$8,700",
            spendSub: "Net 30",
            orders: 15,
            ordersSub: "2 Pending",
            status: "Active",
            rating: 4.6
        },
        {
            id: 7,
            name: "NovaBio Labs",
            location: "Toronto, ON",
            category: "Micro Dosing",
            lead: "3d",
            onTime: 97,
            spend: "$18,400",
            spendSub: "Net 30",
            orders: 42,
            ordersSub: "2 Pending",
            status: "Active",
            rating: 4.8
        },
        {
            id: 8,
            name: "PureMyco In...",
            location: "Kelowna, BC",
            category: "Full Spectrum",
            lead: "4d",
            onTime: 92,
            spend: "$6,100",
            spendSub: "Net 30",
            orders: 12,
            ordersSub: "1 Pending",
            status: "Active",
            rating: 4.4
        }
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'text-[#10B981] border-[#10B981] bg-[#ECFDF5]';
            case 'Pending': return 'text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]';
            case 'Suspended': return 'text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]';
            default: return 'text-gray-500 border-gray-500 bg-gray-50';
        }
    };

    const getOnTimeColor = (percent) => {
        if (!percent) return "bg-[#E2E8F0]";
        if (percent >= 90) return "bg-[#219653]";
        if (percent >= 80) return "bg-[#F2994A]";
        return "bg-[#EA3D2A]";
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope mt-6">
            {/* Top Filters & Tabs */}
            <div className="flex items-center justify-between p-4.5 gap-6 border-b border-[#F1F5F9] overflow-x-auto hide-scrollbar">
                <div className="flex items-center gap-6 shrink-0">
                    {TABS.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setActiveTab(tab.label);
                                setCurrentPage(1);
                            }}
                            className={`flex items-center gap-2 pb-2 transition-all relative whitespace-nowrap ${activeTab === tab.label ? 'text-[#EA3D2A] font-semibold' : 'text-[#181211] font-medium'
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTab === tab.label ? 'bg-[#FFEDEB] text-[#EA3D2A]' : 'bg-[#E8E8E8] text-[#181211]'
                                }`}>
                                {tab.count}
                            </span>
                            {activeTab === tab.label && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <ReusableSearchInput
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search Supplier"
                        className="w-60"
                    />

                    <ReusableTableSelect
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        options={CATEGORY_OPTIONS}
                        placeholder="All Provider"
                        className="w-37"
                    />

                    <ReusableTableSelect
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        options={SORT_OPTIONS}
                        placeholder="Sort By"
                        className="w-37"
                    />

                    <div className="flex items-center border-2 border-[#E8E8E8] rounded-md overflow-hidden shrink-0">
                        <button className="p-2 bg-[#EA3D2A] text-white">
                            <Icon icon="lucide:list" width="20" />
                        </button>
                        <button className="p-2 text-[#181211] hover:bg-gray-50">
                            <Icon icon="lucide:layout-grid" width="20" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed lg:table-auto">
                    <thead>
                        <tr className="text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <th className="py-3 px-3 font-semibold">Supplier</th>
                            <th className="py-3 px-3 font-semibold">Category</th>
                            <th className="py-3 px-3 font-semibold">Lead</th>
                            <th className="py-3 px-3 font-semibold">On-Time</th>
                            <th className="py-3 px-3 font-semibold">Total Spend</th>
                            <th className="py-3 px-3 font-semibold">Orders</th>
                            <th className="py-3 px-3 font-semibold">Status</th>
                            <th className="py-3 px-3 font-semibold text-center">Rating</th>
                            <th className="py-3 px-3 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {suppliers.map((s, index) => (
                            <tr
                                key={s.id}
                                className={`hover:bg-[#F8FAFC]/80 transition-colors group ${index % 2 === 0 ? "bg-white" : "bg-[#BABABA]/20"
                                    }`}
                            >
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-[#EBF5FF] border border-[#0066FF]/10 flex items-center justify-center text-[#0066FF] shadow-sm shrink-0">
                                            <Icon icon="lucide:leaf" width="16" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[13px] font-bold text-[#181211] leading-tight truncate group-hover:text-[#EA3D2A] transition-colors">{s.name}</h4>
                                            <span className="text-[11px] font-medium text-[#64748B]">{s.location}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <span className="text-[12px] font-semibold text-[#3B82F6] bg-[#EFF6FF] px-2 py-1 rounded-full border border-[#3B82F6]/20">
                                        {s.category}
                                    </span>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <span className="text-[13px] font-bold text-[#181211]">{s.lead}</span>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                                            <div className={`h-full ${getOnTimeColor(s.onTime)} transition-all`} style={{ width: `${s.onTime || 0}%` }} />
                                        </div>
                                        <span className={`text-[11px] font-bold ${s.onTime ? 'text-[#F2994A]' : 'text-[#94A3B8]'}`}>
                                            {s.onTime ? `${s.onTime}%` : "—"}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-[#181211]">{s.spend}</span>
                                        <span className="text-[10px] text-[#94A3B8] font-medium leading-none">{s.spendSub}</span>
                                    </div>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-[#181211]">{s.orders}</span>
                                        {s.ordersSub && <span className="text-[10px] text-[#94A3B8] font-medium leading-none">{s.ordersSub}</span>}
                                    </div>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border w-fit ${getStatusStyle(s.status)}`}>
                                        {s.status}
                                    </div>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1">
                                        <Icon icon="material-symbols:star" className="text-[#F59E0B]" width="14" />
                                        <span className="text-[13px] font-bold text-[#181211]">{s.rating > 0 ? s.rating : "0"}</span>
                                    </div>
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="text-[#3B82F6] hover:bg-[#3B82F6]/10 p-1 rounded-md transition-all flex items-center justify-center">
                                            <Icon icon="lucide:eye" width="16" />
                                        </button>
                                        <button className="text-[#64748B] hover:bg-[#64748B]/10 p-1 rounded-md transition-all">
                                            <Icon icon="lucide:pencil" width="16" />
                                        </button>
                                        <button className="text-[#EF4444] hover:bg-[#EF4444]/10 p-1 rounded-md transition-all">
                                            <Icon icon="lucide:ban" width="16" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section MATCHING StoreTable */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-4 border-t border-[#F1F5F9] bg-white">
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                        <Icon icon="lucide:chevron-left" width="18" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>
                </div>

                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, "...", 128].map((pageNum, idx) => (
                        <button
                            key={idx}
                            className={`w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 ${pageNum === 1
                                ? "bg-[#EA3D2A] text-white"
                                : "text-[#181211] hover:bg-gray-50 hover:text-[#181211]"
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                        <span className="hidden sm:inline">Next</span>
                        <Icon icon="lucide:chevron-right" width="18" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupplierTable;
