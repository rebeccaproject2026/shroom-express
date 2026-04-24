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
import { DRIVERS_DATA } from '../../data/driversData';

const STATUS_TABS = [
    { label: 'All', count: '284' },
    { label: 'Active', count: '5,933' },
    { label: 'Inactive', count: '6,549' },
    { label: 'Suspended', count: '36' },
];

const TYPE_TABS = [
    { label: 'All Type', count: '12,482' },
    { label: 'In-House', count: '11,041' },
    { label: 'Store', count: '1,441' },
];

const DriverTable = () => {
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [activeStatusTab, setActiveStatusTab] = useState('All');
    const [activeTypeTab, setActiveTypeTab] = useState('All Type');
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'DRIVER',
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
            accessorKey: 'type',
            header: 'TYPE',
            cell: ({ getValue }) => {
                const type = getValue();
                const style = type === 'In-House' ? 'border-[#181211] text-[#181211]' : 'border-[#F2994A] text-[#F2994A]';
                return (
                    <span className={`px-3 py-1 border-2 rounded-full text-xs font-semibold ${style}`}>
                        {type}
                    </span>
                );
            }
        },
        {
            accessorKey: 'status',
            header: 'STATUS',
            cell: ({ getValue }) => {
                const status = getValue();
                const style = status === 'Active' ? 'text-[#219653] border-[#219653]' :
                    status === 'Inactive' ? 'border-[#181211] text-[#181211]' :
                        'text-[#EA3D2A] border-[#EA3D2A]';
                return (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border-2 ${style}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            accessorKey: 'onDuty',
            header: 'ON DUTY',
            cell: ({ getValue }) => {
                const status = getValue();
                const color = status === 'Picking up' ? 'text-[#F2994A]' :
                    status === 'In-progress' ? 'text-[#0066FF]' :
                        status === 'Idle' ? 'text-[#219653]' :
                            status === 'Suspended' ? 'text-[#EA3D2A]' : 'text-[#475569]';
                return <span className={`text-[13px] font-semibold ${color}`}>{status}</span>;
            }
        },
        {
            accessorKey: 'orders',
            header: 'ORDERS',
            cell: ({ row }) => (
                <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-[#181211]">{row.original.orders}</p>
                    <p className="text-[11px] font-medium text-[#475569]">{row.original.delivered}</p>
                </div>
            )
        },
        {
            accessorKey: 'onTime',
            header: 'ON TIME',
            cell: ({ getValue }) => {
                const value = getValue();
                const isGood = value >= 92;
                return (
                    <div className="flex flex-col gap-1 w-20">
                        <span className="text-sm font-semibold text-[#181211]">{value}%</span>
                        <div className="h-1 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                            <div
                                className={`h-full ${isGood ? 'bg-[#219653]' : 'bg-[#FF9F40]'} transition-all duration-500`}
                                style={{ width: `${value}%` }}
                            />
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'earnings',
            header: 'EARNINGS',
            cell: ({ row }) => (
                <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-[#181211]">{row.original.earnings}</p>
                    <p className="text-[11px] font-medium text-[#475569]">{row.original.monthlyEarnings}</p>
                </div>
            )
        },
        {
            accessorKey: 'rating',
            header: 'RATING',
            cell: ({ getValue }) => (
                <div className="flex items-center gap-1">
                    <Icon icon="material-symbols:star-rounded" width="18" className="text-[#FF9F40]" />
                    <span className="text-sm font-bold text-[#FF9F40]">{getValue()}</span>
                </div>
            )
        },
        {
            accessorKey: 'kyc',
            header: 'KYC',
            cell: ({ getValue }) => {
                const status = getValue();
                const style = status === 'Active' ? 'text-[#219653] border-[#219653]' : 'text-[#EA3D2A] border-[#EA3D2A]';
                return (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border-2 ${style}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            id: 'actions',
            header: 'ACTIONS',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/superadmin/drivers/details/${row.original.id.replace('#', '')}`);
                        }}
                        className="text-[#0066FF] p-1.5 hover:bg-blue-50 rounded-lg transition-all"
                    >
                        <Icon icon="lucide:eye" width="18" />
                    </button>
                    <button className="text-[#181211] p-1.5 hover:bg-gray-100 rounded-lg transition-all">
                        <Icon icon="iconamoon:edit-light" width="18" />
                    </button>
                    <button className="text-[#EA3D2A] p-1.5 hover:bg-red-50 rounded-lg transition-all">
                        <Icon icon="lucide:ban" width="18" />
                    </button>
                </div>
            )
        }
    ], [navigate]);


    const table = useReactTable({
        data: DRIVERS_DATA,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope">
            {/* Row 1: Search & Controls */}
            <div className="flex items-center justify-between p-4 gap-6">
                <div className="flex-1 max-w-md shrink-0">
                    <ReusableSearchInput
                        placeholder="Search name, email, or phone..."
                        value={globalFilter}
                        onChange={(val) => setGlobalFilter(val)}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <ReusableTableSelect
                        label="All Statuses"
                        options={[
                            { value: 'all', label: 'All Statuses' },
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                            { value: 'suspended', label: 'Suspended' }
                        ]}
                        onSelect={(val) => console.log(val)}
                        className="w-40"
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

            {/* Row 2: Double Tabs (Status & Type) */}
            <div className="px-5 py-2 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {STATUS_TABS.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveStatusTab(tab.label)}
                            className={`flex items-center gap-2 pb-4 transition-all relative whitespace-nowrap ${activeStatusTab === tab.label ? 'text-[#EA3D2A] font-semibold' : 'text-[#181211] font-medium'}`}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeStatusTab === tab.label ? 'bg-[#FFEDEB] text-[#EA3D2A]' : 'bg-[#E8E8E8] text-[#181211]'}`}>
                                {tab.count}
                            </span>
                            {activeStatusTab === tab.label && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    {TYPE_TABS.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTypeTab(tab.label)}
                            className={`flex items-center gap-2 pb-4 transition-all relative whitespace-nowrap ${activeTypeTab === tab.label ? 'text-[#EA3D2A] font-semibold' : 'text-[#181211] font-medium'}`}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTypeTab === tab.label ? 'bg-[#FFEDEB] text-[#EA3D2A]' : 'bg-[#E8E8E8] text-[#181211]'}`}>
                                {tab.count}
                            </span>
                            {activeTypeTab === tab.label && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}

                </div>
            </div>

            {/* Row 3: Result Summary Section */}
            <div className="px-4.5 py-3 bg-white">
                <p className="text-[14px] text-[#64748B] font-medium leading-none">
                    Showing <span className="font-bold text-[#181211]">10</span> of <span className="font-bold text-[#181211]">12,482 drivers</span>
                </p>
            </div>



            {/* Actual Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
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

                    <tbody>
                        {table.getRowModel().rows.map((row, idx) => (
                            <tr
                                key={row.id}
                                onClick={() => navigate(`/superadmin/drivers/details/${row.original.id.replace('#', '')}`)}
                                className={`transition-colors hover:bg-[#F8FAFC]/80 group cursor-pointer ${idx % 2 !== 0 ? 'bg-[#BABABA]/20' : 'bg-white'}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-2.5 px-3 font-normal whitespace-nowrap">
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
                    {Array.from({ length: table.getPageCount() || 5 }, (_, i) => i + 1)
                        .filter((p) => {
                            const current = table.getState().pagination.pageIndex + 1;
                            const count = table.getPageCount() || 5;
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

export default DriverTable;
