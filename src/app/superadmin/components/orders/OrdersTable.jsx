import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import ReusableTableSelect from '../common/ReusableTableSelect';
import ReusableSearchInput from '../common/ReusableSearchInput';

const TABS = [
    { label: 'All', count: '284' },
    { label: 'Pending', count: '16' },
    { label: 'Preparing', count: '9' },
    { label: 'In Transit', count: '18' },
    { label: 'Delivered', count: '241' },
    { label: 'Cancelled', count: '9' },
    { label: 'Overdue', count: '3' },
];

const SUPPLIER_OPTIONS = [
    { value: 'all', label: 'All Suppliers' },
    { value: 'nova', label: 'NovaBio Labs' },
    { value: 'forest', label: 'Forest Oasis' },
];

const STORE_OPTIONS = [
    { value: 'all', label: 'All Stores' },
    { value: 'oasis', label: 'Forest Oasis' },
    { value: 'greens', label: 'Healthy Greens' },
];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
];

const OrdersTable = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [activeTab, setActiveTab] = useState('All');

    const orders = [
        { id: "SE-202...", product: "Micro Dose Cap...", sku: "NVB-MIC-050 · 200 Pack", store: "Forest Oasis", customer: "Sarah K.", custId: "#SE-C4821", weight: "45 gm", amount: "$77.98", tax: "+$5.36", status: "Delivered", delivery: "Express", delivered: "Mar 03, 2026 at 14:32:00" },
        { id: "SE-202...", product: "Micro Dose Cap...", sku: "NVB-MIC-015 · 150 Pack", store: "Healthy Greens", customer: "James T.", custId: "#SE-C5522", weight: "30 gm", amount: "$62.00", tax: "+$7.44", status: "Preparing", delivery: "Same Day", delivered: "Est. Mar 12, 2026 at 13:00:00" },
        { id: "SE-202...", product: "Adaptogen Blen...", sku: "NVB-ADT-001 · 80 Pack", store: "Forest Oasis", customer: "Mark D.", custId: "#SE-C1190", weight: "55 gm", amount: "$132.00", tax: "+$15.84", status: "Pending", delivery: "Express", delivered: "Est. Mar 20, 2026 at 17:00:00" },
        { id: "SE-202...", product: "Wellness Gumm...", sku: "GR-WLN-040 · 120 units", store: "Healthy Greens", customer: "Priya M.", custId: "#SE-C2204", weight: "62 gm", amount: "$24.99", tax: "+$3.00", status: "In Transit", delivery: "Express", delivered: "Est. Mar 08, 2026 at 11:23:00" },
        { id: "SE-202...", product: "Micro Dose Cap...", sku: "NVB-MIC-050 · 100 Pack", store: "Forest Oasis", customer: "Lena W.", custId: "#SE-C5510", weight: "60 gm", amount: "$70.00", tax: "+$8.40", status: "Delivered", delivery: "Same Day", delivered: "Feb 15, 2026 at 22:30:00" },
        { id: "SE-202...", product: "Micro Dose Cap...", sku: "MF-MIC-015 · 200 Pack", store: "Healthy Greens", customer: "Dan R.", custId: "#SE-C0093", weight: "30 gm", amount: "$55.00", tax: "+$6.60", status: "Cancelled", delivery: "Shipping", delivered: "-" },
        { id: "SE-202...", product: "Lion's Mane Cap...", sku: "NVB-LMN-100 · 50 Pack", store: "Forest Oasis", customer: "Nina C.", custId: "#SE-C7721", weight: "70 gm", amount: "$96.00", tax: "+$11.52", status: "Delivered", delivery: "Shipping", delivered: "Feb 02, 2026 at 15:34:00" },
        { id: "SE-202...", product: "Tincture Extrac...", sku: "ED-TIN-030 · 60 units", store: "Forest Oasis", customer: "Omar S.", custId: "#SE-C3318", weight: "38 gm", amount: "$120.00", tax: "+$11.52", status: "Overdue", delivery: "Same Day", delivered: "Est. Feb 26, 2026 at 14:30:00" },
        { id: "SE-202...", product: "Micro Dose Cap...", sku: "NVB-MIC-050 · 180 Pack", store: "Forest Oasis", customer: "Kyle B.", custId: "#SE-C0441", weight: "45 gm", amount: "$62.00", tax: "+$7.44", status: "Delivered", delivery: "Express", delivered: "Jan 14, 2026 at 19:00:00" },
        { id: "SE-202...", product: "Full Spectrum O...", sku: "CL-FSO-060 · 40 units", store: "Forest Oasis", customer: "Aisha N.", custId: "#SE-C8802", weight: "42 gm", amount: "$70.00", tax: "+$8.40", status: "In Transit", delivery: "Shipping", delivered: "Est. Mar 10, 2026 at 12:45:00" },
    ];

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "Delivered": return "text-[#10B981] border-[#10B981] bg-[#ECFDF5]";
            case "Preparing": return "text-[#3B82F6] border-[#3B82F6] bg-[#DBEAFE]";
            case "Pending": return "text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]";
            case "In Transit": return "text-[#64748B] border-[#CBD5E1] bg-white";
            case "Cancelled": return "text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]";
            case "Overdue": return "text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]";
            default: return "text-gray-500 border-gray-500 bg-gray-50";
        }
    };

    const getDeliveryStyle = (delivery) => {
        switch (delivery) {
            case "Express": return "text-[#EA3D2A]";
            case "Same Day": return "text-[#10B981]";
            case "Shipping": return "text-[#0066FF]";
            default: return "text-[#181211]";
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope mt-6">
            {/* First Row: Filters */}
            <div className="flex flex-wrap items-center justify-between p-4.5 gap-1 bg-white border-b border-[#F1F5F9]">
                <div className="flex-1 min-w-[300px] flex items-center gap-3 flex-wrap">
                    <ReusableSearchInput
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search order ID, product, customer..."
                        className="w-90"
                    />

                    <div className="flex items-center gap-2 flex-wrap">
                        <ReusableTableSelect
                            options={SUPPLIER_OPTIONS}
                            placeholder="All Suppliers"
                            className="w-37"
                        />

                        <ReusableTableSelect
                            options={STORE_OPTIONS}
                            placeholder="All Stores"
                            className="w-32"
                        />

                        <ReusableTableSelect
                            options={[{ value: 'all', label: 'All Categories' }]}
                            placeholder="All Categories"
                            className="w-39"
                        />

                        <ReusableTableSelect
                            options={[{ value: 'all', label: 'All Time' }]}
                            placeholder="All Time"
                            className="w-30"
                        />

                        <ReusableTableSelect
                            options={SORT_OPTIONS}
                            placeholder="Newest First"
                            className="w-37"
                        />
                    </div>
                </div>

                <div className="flex items-center border-2 border-[#E8E8E8] rounded-md overflow-hidden shrink-0">
                    <button className="p-2 bg-[#EA3D2A] text-white">
                        <Icon icon="lucide:list" width="20" />
                    </button>
                    <button className="p-2 text-[#181211] hover:bg-gray-50">
                        <Icon icon="lucide:layout-grid" width="20" />
                    </button>
                </div>
            </div>

            {/* Second Row: Tabs & Export */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-[#F1F5F9]">
                <div className="flex items-center gap-6 shrink-0">
                    {TABS.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setActiveTab(tab.label);
                                table.setPageIndex(0); // Reset to first page on tab change
                            }}
                            className={`flex items-center gap-2 pb-2 transition-all relative whitespace-nowrap ${activeTab === tab.label ? 'text-[#EA3D2A] font-semibold' : 'text-[#181211] font-medium'
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTab === tab.label ? 'bg-[#FFEDEB] text-[#EA3D2A] ' : 'bg-[#E8E8E8] text-[#181211]'
                                }`}>
                                {tab.count}
                            </span>
                            {activeTab === tab.label && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] text-[#181211] rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-all shadow-sm shrink-0 ml-4">
                    <Icon icon="lucide:download" width="16" />
                    Export CSV
                </button>
            </div>

            {/* Showing status line */}
            <div className="px-5 py-4 bg-white">
                <p className="text-[13px] font-medium text-[#475569]">
                    Showing <span className="font-bold text-[#181211]">10</span> of <span className="font-bold text-[#181211]">284 orders</span>
                </p>
            </div>

            {/* Table Section */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed lg:table-auto min-w-[1200px]">
                    <thead>
                        <tr className="bg-[#F8FAFC] text-[13px] font-semibold text-[#64748B] uppercase border-b border-[#F1F5F9]">
                            <th className="py-4 px-5 font-bold w-[120px]">ORDER ID</th>
                            <th className="py-4 px-5 font-bold w-[220px]">PRODUCT</th>
                            <th className="py-4 px-5 font-bold w-[150px]">STORE</th>
                            <th className="py-4 px-5 font-bold w-[160px]">CUSTOMER</th>
                            <th className="py-4 px-5 font-bold text-center w-[100px]">WEIGHT</th>
                            <th className="py-4 px-5 font-bold w-[120px]">AMOUNT</th>
                            <th className="py-4 px-5 font-bold text-center w-[120px]">STATUS</th>
                            <th className="py-4 px-5 font-bold text-center w-[120px]">DELIVERY</th>
                            <th className="py-4 px-5 font-bold w-[180px]">DELIVERED/EST.</th>
                            <th className="py-4 px-5 font-bold text-center w-[100px]">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {orders.map((order, index) => (
                            <tr key={index} className={`hover:bg-[#F8FAFC]/50 transition-colors group ${index % 2 === 0 ? "bg-white" : "bg-[#BABABA]/20"}`}>
                                <td className="py-4 px-5 font-bold text-[#EA3D2A] text-sm">{order.id}</td>
                                <td className="py-4 px-5">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-[#181211] truncate">{order.product}</span>
                                        <span className="text-[11px] font-semibold text-[#94A3B8] leading-none mt-1">{order.sku}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-5 text-[13px] font-semibold text-[#181211]">{order.store}</td>
                                <td className="py-4 px-5">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-[#181211]">{order.customer}</span>
                                        <span className="text-[11px] font-semibold text-[#94A3B8] leading-none">{order.custId}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-5 text-center">
                                    <span className="text-[12px] font-bold text-[#475569]">{order.weight}</span>
                                </td>
                                <td className="py-4 px-5">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-[#181211]">{order.amount}</span>
                                        <span className="text-[11px] font-bold text-[#94A3B8] leading-none mt-0.5">{order.tax}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-5 text-center">
                                    <div className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border inline-block whitespace-nowrap ${getStatusBadgeStyle(order.status)}`}>
                                        {order.status}
                                    </div>
                                </td>
                                <td className="py-4 px-5 text-center">
                                    <span className={`text-[12px] font-bold ${getDeliveryStyle(order.delivery)} underline decoration-dotted decoration-1 underline-offset-4`}>
                                        {order.delivery}
                                    </span>
                                </td>
                                <td className="py-4 px-5">
                                    <span className="text-[12px] font-semibold text-[#181211]">{order.delivered}</span>
                                </td>
                                <td className="py-4 px-5 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-md transition-all">
                                            <Icon icon="lucide:eye" width="16" />
                                        </button>
                                        <button className="p-2 text-[#64748B] hover:bg-[#64748B]/10 rounded-md transition-all">
                                            <Icon icon="lucide:pencil" width="16" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-4 border-t border-[#F1F5F9] bg-white">
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 disabled:opacity-50 transition-all active:scale-95 shadow-sm">
                        <Icon icon="lucide:chevron-left" width="18" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>
                </div>

                <div className="flex items-center gap-1.5">
                    <button className="w-9 h-9 flex items-center justify-center rounded-sm font-bold text-sm bg-[#EA3D2A] text-white">1</button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-sm font-semibold text-sm text-[#181211] hover:bg-gray-50">2</button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-sm font-semibold text-sm text-[#181211] hover:bg-gray-50">3</button>
                    <span className="px-1 text-[#94A3B8] font-bold">...</span>
                    <button className="w-9 h-9 flex items-center justify-center rounded-sm font-semibold text-sm text-[#181211] hover:bg-gray-50">29</button>
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

export default OrdersTable;
