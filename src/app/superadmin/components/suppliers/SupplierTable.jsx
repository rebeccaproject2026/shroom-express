import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/react-table";
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

const DEFAULT_SUPPLIERS = [
    {
        id: 1,
        name: "AlphaBotanics",
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
        name: "ClearLeaf Labs",
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
        name: "EarthDrop Co.",
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
        name: "FungalTech Supply",
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
        name: "GreenRoot Pharma",
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
        name: "MushroomPure",
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
        name: "PureMyco Inc.",
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

const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Active': return 'text-[#10B981] border-[#10B981] bg-[#ECFDF5]';
        case 'Pending': return 'text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]';
        case 'Suspended': return 'text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]';
        default: return 'text-gray-500 border-gray-500 bg-gray-50';
    }
};

const getOnTimeColor = (percent) => {
    if (!percent) return "bg-[#EA3D2A]";
    if (percent >= 90) return "bg-[#219653]";
    if (percent >= 80) return "bg-[#FF9F40]";
    return "bg-[#E2E8F0]";
};

const SupplierTable = ({ data = null }) => {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [activeTab, setActiveTab] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8,
    });

    const suppliers = useMemo(() => data || DEFAULT_SUPPLIERS, [data]);

    const filteredData = useMemo(() => {
        let result = [...suppliers];

        if (activeTab !== 'All') {
            result = result.filter(item => item.status === activeTab);
        }

        if (categoryFilter) {
            result = result.filter(item => item.category === categoryFilter);
        }

        if (globalFilter) {
            const searchLower = globalFilter.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchLower) ||
                item.location.toLowerCase().includes(searchLower) ||
                item.category.toLowerCase().includes(searchLower)
            );
        }

        return result;
    }, [suppliers, activeTab, globalFilter, categoryFilter, sortOrder]);

    const columns = useMemo(() => [
        {
            header: 'SUPPLIER',
            accessorKey: 'name',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-[#E8E8E8]  flex items-center justify-center  shrink-0">
                        🌿
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-[#181211] w-25 leading-tight truncate  transition-colors">{row.original.name}</h4>
                        <span className="text-xs underline font-medium text-[#475569]">{row.original.location}</span>
                    </div>
                </div>
            ),
        },
        {
            header: 'CATEGORY',
            accessorKey: 'category',
            cell: ({ row }) => (
                <span className="text-[12px] font-semibold text-[#0066FF] bg-[#DAE9FF] px-2 py-1 rounded-full border border-[#0066FF]">
                    {row.original.category}
                </span>
            ),
        },
        {
            header: 'LEAD',
            accessorKey: 'lead',
            cell: ({ row }) => (
                <span className="text-[13px] font-semibold text-[#181211]">{row.original.lead}</span>
            ),
        },
        {
            header: 'ON-TIME',
            accessorKey: 'onTime',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className={`h-full ${getOnTimeColor(row.original.onTime)} transition-all`} style={{ width: `${row.original.onTime || 0}%` }} />
                    </div>
                    <span className={`text-[11px] font-bold ${row.original.onTime ? 'text-[#F2994A]' : 'text-[#94A3B8]'}`}>
                        {row.original.onTime ? `${row.original.onTime}%` : "—"}
                    </span>
                </div>
            ),
        },
        {
            header: 'TOTAL SPEND',
            accessorKey: 'spend',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#181211]">{row.original.spend}</span>
                    <span className="text-xs mt-0.5 text-[#9AA4B2] font-medium leading-none">{row.original.spendSub}</span>
                </div>
            ),
        },
        {
            header: 'ORDERS',
            accessorKey: 'orders',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#181211]">{row.original.orders}</span>
                    {row.original.ordersSub && <span className="text-xs mt-0.5 text-[#9AA4B2] font-mediumleading-none">{row.original.ordersSub}</span>}
                </div>
            ),
        },
        {
            header: 'STATUS',
            accessorKey: 'status',
            cell: ({ row }) => (
                <div className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border w-fit ${getStatusBadgeStyle(row.original.status)}`}>
                    {row.original.status}
                </div>
            ),
        },
        {
            header: 'RATING',
            accessorKey: 'rating',
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Icon icon="material-symbols:star" className="text-[#F59E0B]" width="14" />
                    <span className="text-[13px] font-semibold text-[#F59E0B]">{row.original.rating > 0 ? row.original.rating : "0"}</span>
                </div>
            ),
        },
        {
            header: 'ACTIONS',
            id: 'actions',
            // eslint-disable-next-line no-unused-vars
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
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
            ),
        },
    ], []);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

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
                                table.setPageIndex(0);
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
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                            table.setPageIndex(0);
                        }}
                        placeholder="Search Supplier"
                        className="w-60"
                    />

                    <ReusableTableSelect
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            table.setPageIndex(0);
                        }}
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

            {/* Data Summary Section */}
            <div className="px-4.5 py-3 bg-white">
                <p className="text-[14px] text-[#181211] font-medium leading-none">
                    Showing <span className="font-bold">8</span> of <span className="font-bold">9 suppliers</span>
                </p>
            </div>

            {/* Table Section */}
            <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed lg:table-auto">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9] bg-[#F8FAFC]">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="py-3 px-3 font-semibold">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`hover:bg-[#F8FAFC]/80 transition-colors group ${index % 2 === 0 ? "bg-white" : "bg-[#BABABA]/20"
                                        }`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="py-2.5 px-3 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="py-10 text-center text-[#64748B] font-medium">
                                    No suppliers found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-4 border-t border-[#F1F5F9] bg-white">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
                    >
                        <Icon icon="lucide:chevron-left" width="18" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>
                </div>

                <div className="flex items-center gap-1.5">
                    {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
                        .filter((p) => {
                            const current = table.getState().pagination.pageIndex + 1;
                            const count = table.getPageCount();
                            return p === 1 || p === count || (p >= current - 1 && p <= current + 1);
                        })
                        .map((pageNum, idx, arr) => {
                            const current = table.getState().pagination.pageIndex + 1;
                            return (
                                <React.Fragment key={pageNum}>
                                    {idx > 0 && arr[idx - 1] !== pageNum - 1 && (
                                        <span className="px-1 text-[#94A3B8]">...</span>
                                    )}
                                    <button
                                        onClick={() => table.setPageIndex(pageNum - 1)}
                                        className={`w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 ${current === pageNum
                                            ? "bg-[#EA3D2A] text-white"
                                            : "text-[#181211] hover:bg-gray-50"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                </React.Fragment>
                            );
                        })}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <Icon icon="lucide:chevron-right" width="18" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupplierTable;
