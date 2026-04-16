import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
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
import { useNavigate } from 'react-router-dom';
import { CUSTOMERS_DATA } from '../../data/customersData';

const TABS = [
    { label: 'All', count: '12,482' },
    { label: 'Active', count: '5,933' },
    { label: 'Inactive', count: '6,513' },
    { label: 'Blocked', count: '36' },
];

const LOCATION_OPTIONS = [
    { value: 'Toronto', label: 'Toronto, ON' },
    { value: 'Vancouver', label: 'Vancouver, BC' },
    { value: 'Montreal', label: 'Montreal, QC' },
    { value: 'Calgary', label: 'Calgary, AB' },
];



const CustomerTable = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'CUSTOMER',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#FFF1F0] text-[#E93E2B] border border-[#FFEDEB] shrink-0">
                        {row.original.initials}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#181211] leading-tight truncate">{row.original.name}</p>
                        <p className="text-xs font-medium underline text-[#64748B] mt-0.5">{row.original.id}</p>
                    </div>
                </div>
            )
        },
        {
            accessorKey: 'location',
            header: 'LOCATION',
            cell: ({ row }) => (
                <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-[#181211]">{row.original.location}</p>
                    <p className="text-xs font-medium text-[#64748B]">{row.original.postal}</p>
                </div>
            )
        },
        {
            accessorKey: 'created',
            header: 'CREATED',
            headerClassName: 'text-center',
            cell: ({ row }) => (
                <div className="text-center space-y-0.5">
                    <p className="text-sm font-medium text-[#181211]">{row.original.created}</p>
                    <p className="text-sm font-medium text-[#181211]">at {row.original.time}</p>
                </div>
            )
        },
        {
            accessorKey: 'orders',
            header: 'ORDERS',
            headerClassName: 'text-center',
            cell: ({ getValue }) => <div className="text-center font-semibold text-[#181211]">{getValue()}</div>
        },
        {
            accessorKey: 'spend',
            header: 'TOTAL SPENT',
            headerClassName: 'text-center',
            cell: ({ row }) => (
                <div className="text-center space-y-0.5">
                    <p className="text-sm font-semibold text-[#181211]">{row.original.spend}</p>
                    <p className="text-xs font-medium text-[#181211]">{row.original.avg}</p>
                </div>
            )
        },
        {
            accessorKey: 'lastOrder',
            header: 'LAST ORDER',
            headerClassName: 'text-center',
            cell: ({ row }) => (
                <div className="text-center space-y-0.5">
                    <p className="text-sm font-medium text-[#181211]">{row.original.lastOrder}</p>
                    <p className="text-sm font-medium text-[#181211]">at {row.original.lastTime}</p>
                </div>
            )
        },
        {
            accessorKey: 'status',
            header: 'STATUS',
            headerClassName: 'text-center',
            cell: ({ getValue }) => {
                const status = getValue();
                const style = status === 'Active' ? 'bg-[#ffff] text-[#219653] border-[#219653]' :
                    status === 'Inactive' ? 'bg-[#FFFFF] text-[#0F172A] border-[#0F172A]' :
                        'bg-[#FFFFF] text-[#EA3D2A] border-[#EA3D2A]';
                return (
                    <div className="flex justify-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${style}`}>
                            {status}
                        </span>
                    </div>
                );
            }
        },
        {
            id: 'actions',
            header: 'ACTIONS',
            headerClassName: 'text-center',
            cell: ({ row }) => (
                <div className="flex items-center justify-center gap-2">
                    <button 
                        onClick={() => navigate(`/superadmin/customers/details/${row.original.id.replace('#', '')}`)}
                        className="text-[#0066FF] p-1.5 hover:bg-blue-50 rounded-lg transition-all"
                    >
                        <Icon icon="lucide:eye" width="18" />
                    </button>
                    <button className={`p-1.5 rounded-lg transition-all ${row.original.status === 'Blocked' ? 'text-[#22C55E] hover:bg-green-50' : 'text-[#E93E2B] hover:bg-red-50'}`}>
                        <Icon icon={row.original.status === 'Blocked' ? "gg:unblock" : "lucide:ban"} width="20" />
                    </button>
                </div>
            )
        }
    ], []);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data: CUSTOMERS_DATA,
        columns,
        state: { globalFilter, pagination },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope">
            {/* Row 1: Search & Controls */}
            <div className="flex items-center justify-between p-4 gap-6">
                <div className="flex-1 max-w-md">
                    <ReusableSearchInput
                        placeholder="Search name, email, or phone..."
                        value={globalFilter}
                        onChange={(val) => setGlobalFilter(val)}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <ReusableTableSelect
                        label="All Statuses"
                        options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                        onSelect={(val) => console.log(val)}
                        className="w-40"
                    />
                    <ReusableTableSelect
                        label="All Locations"
                        options={LOCATION_OPTIONS}
                        onSelect={(val) => console.log(val)}
                        className="w-40"
                    />
                    <div className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden h-10">
                        <button className="px-3 h-full bg-[#EA3D2A] text-white">
                            <Icon icon="lucide:list" width="20" />
                        </button>
                        <button className="px-3 h-full text-[#64748B] hover:bg-gray-50">
                            <Icon icon="lucide:layout-grid" width="20" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Row 2: Tabs & Export */}
            <div className="px-5 py-4 flex items-center justify-between pb-0">
                <div className="flex items-center gap-6 shrink-0">
                    {TABS.map((tab, idx) => {
                        const count = tab.label === 'All'
                            ? CUSTOMERS_DATA.length
                            : CUSTOMERS_DATA.filter(o => o.status === tab.label).length;
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    setActiveTab(tab.label);
                                    table.setPageIndex(0);
                                }}
                                className={`flex items-center gap-2 pb-4 transition-all relative whitespace-nowrap ${activeTab === tab.label ? 'text-[#EA3D2A] font-semibold' : 'text-[#181211] font-medium'
                                    }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTab === tab.label ? 'bg-[#FFEDEB] text-[#EA3D2A] ' : 'bg-[#E8E8E8] text-[#181211]'
                                    }`}>
                                    {count}
                                </span>
                                {activeTab === tab.label && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA3D2A] rounded-t-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 mb-4 bg-white text-[#475569] rounded-lg text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4 border border-[#E2E8F0]/50">
                    <Icon icon="bytesize:export" width="16" />
                    Export CSV
                </button>
            </div>

            {/* Row 3: Results Group */}
            <div className="px-4 py-3 bg-white">
                <p className="text-[14px] font-semibold text-[#64748B]">
                    Showing <span className="text-[#181211]">10</span> of <span className="text-[#181211]">12,482 customers</span>
                </p>
            </div>

            {/* Actual Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-[#F8FAFC]">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className={`py-3 px-4 text-[#64748B] text-[13px] uppercase font-semibold border-b border-[#F1F5F9] ${header.column.columnDef.headerClassName || ''}`}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, idx) => (
                            <tr
                                key={row.id}
                                className={`transition-colors hover:bg-gray-50/20 ${idx % 2 !== 0 ? 'bg-[#BABABA]/20' : 'bg-white'}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-3.5 px-4 font-normal whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
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
                            return (
                                p === 1 ||
                                p === count ||
                                (p >= current - 1 && p <= current + 1)
                            );
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
                                                ? "bg-[#EA3D2A] text-white "
                                                : "text-[#181211] hover:bg-gray-50 hover:text-[#181211]"
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

export default CustomerTable;
