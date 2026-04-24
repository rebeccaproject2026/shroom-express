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
import ReusableSearchInput from '../common/ReusableSearchInput';
import { useNavigate } from 'react-router-dom';

const STATUS_TABS = [
    { label: 'All', count: '17' },
    { label: 'Active', count: '12' },
    { label: 'Inactive', count: '4' },
    { label: 'Suspended', count: '1' },
];

const SHROOM_DRIVERS_DATA = [
    { id: '#Driver-ID', name: 'Marcus Jenkins', initials: 'MJ', zone: 'Brampton', vehicle: 'Honda Civic 2021', status: 'Active', orders: 201, today: 11, rating: 4.8, earnings: '$1,840' },
    { id: '#Driver-ID', name: 'Priya Sharma', initials: 'PS', zone: 'Ottawa', vehicle: 'Toyota Corolla 2022', status: 'Active', orders: 178, today: 9, rating: 4.9, earnings: '$1,560' },
    { id: '#Driver-ID', name: 'Tyler Brooks', initials: 'TB', zone: 'Calgary', vehicle: 'Kia Soul 2020', status: 'Inactive', orders: 134, today: 0, rating: 3.8, earnings: '$1,840' },
    { id: '#Driver-ID', name: 'Aisha Ndiaye', initials: 'AN', zone: 'Iqaluit', vehicle: 'Subaru Impreza 2023', status: 'Active', orders: 156, today: 7, rating: 4.7, earnings: '$1,200' },
    { id: '#Driver-ID', name: 'Tyler Brooks', initials: 'TB', zone: 'Calgary', vehicle: 'Kia Soul 2020', status: 'Inactive', orders: 134, today: 0, rating: 3.8, earnings: '$1,110' },
    { id: '#Driver-ID', name: 'Priya Sharma', initials: 'PS', zone: 'Ottawa', vehicle: 'Subaru Impreza 2023', status: 'Suspended', orders: 178, today: 9, rating: 4.9, earnings: '$1,560' },
    { id: '#Driver-ID', name: 'Marcus Jenkins', initials: 'MJ', zone: 'Brampton', vehicle: 'Honda Civic 2021', status: 'Active', orders: 201, today: 11, rating: 4.8, earnings: '$1,840' },
    { id: '#Driver-ID', name: 'Aisha Ndiaye', initials: 'AN', zone: 'Iqaluit', vehicle: 'Subaru Impreza 2023', status: 'Active', orders: 156, today: 7, rating: 4.7, earnings: '$1,200' },
];

const ShroomDriverTable = () => {
    const navigate = useNavigate();
    const [activeStatusTab, setActiveStatusTab] = useState('All');
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
            accessorKey: 'zone',
            header: 'ZONE',
            cell: ({ getValue }) => <span className="text-sm font-semibold text-[#181211]">{getValue()}</span>
        },
        {
            accessorKey: 'vehicle',
            header: 'VEHICLE',
            cell: ({ getValue }) => <span className="text-sm font-semibold text-[#181211]">{getValue()}</span>
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
            accessorKey: 'orders',
            header: 'ORDERS',
            cell: ({ getValue }) => <span className="text-sm font-semibold text-[#181211]">{getValue()}</span>
        },
        {
            accessorKey: 'today',
            header: 'TODAY',
            cell: ({ getValue }) => <span className="text-sm font-semibold text-[#181211]">{getValue()}</span>
        },
        {
            accessorKey: 'rating',
            header: 'RATING',
            cell: ({ getValue }) => (
                <div className="flex items-center gap-1">
                    <Icon icon="material-symbols:star-rounded" width="18" className="text-[#F2994A]" />
                    <span className="text-sm font-bold text-[#F2994A]">{getValue()}</span>
                </div>
            )
        },
        {
            accessorKey: 'earnings',
            header: 'EARNINGS',
            cell: ({ getValue }) => <span className="text-sm font-semibold text-[#181211]">{getValue()}</span>
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
                    <button className="text-[#64748B] p-1.5 hover:bg-gray-100 rounded-lg transition-all">
                        <Icon icon="lucide:pencil" width="18" />
                    </button>
                    <button className="text-[#EA3D2A] p-1.5 hover:bg-red-50 rounded-lg transition-all">
                        <Icon icon="lucide:ban" width="18" />
                    </button>
                </div>
            )
        }
    ], [navigate]);

    const table = useReactTable({
        data: SHROOM_DRIVERS_DATA,
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
            {/* Search & Export */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                <div className="flex-1 max-w-md shrink-0">
                    <ReusableSearchInput
                        placeholder="Search name, email, or phone..."
                        value={globalFilter}
                        onChange={(val) => setGlobalFilter(val)}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5  bg-white text-[#475569] rounded-lg text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4 border border-[#E2E8F0]/50">
                        <Icon icon="bytesize:export" width="16" />
                        Export CSV
                    </button>
                    <div className="flex items-center border border-[#E2E8F0] rounded-md overflow-hidden">
                        <button className="p-2 bg-[#EA3D2A] text-white">
                            <Icon icon="lucide:list" width="20" />
                        </button>
                        <button className="p-2 text-[#64748B] hover:bg-gray-50 border-l border-[#E2E8F0]">
                            <Icon icon="lucide:layout-grid" width="20" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="px-5 border-t pt-2 border-[#F1F5F9]">
                <div className="flex items-center gap-6 shrink-0 ">
                    {STATUS_TABS.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setActiveStatusTab(tab.label);
                                table.setPageIndex(0);
                            }}
                            className={`flex items-center gap-2 pb-2 transition-all relative whitespace-nowrap ${activeStatusTab === tab.label ? 'text-[#EA3D2A] font-semibold' : 'text-[#181211] font-medium'}`}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeStatusTab === tab.label ? 'bg-[#FFEDEB] text-[#EA3D2A] ' : 'bg-[#E8E8E8] text-[#181211]'}`}>
                                {tab.count}
                            </span>
                            {activeStatusTab === tab.label && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Result Summary Section */}
            <div className="px-4.5 py-3 bg-white">
                <p className="text-[14px] text-[#64748B] font-medium leading-none">
                    Showing <span className="font-bold text-[#181211]">8</span> of <span className="font-bold text-[#181211]">17 store drivers</span>
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
                                className={`transition-colors hover:bg-[#F8FAFC]/80 cursor-pointer ${idx % 2 !== 0 ? 'bg-[#BABABA]/20' : 'bg-white'}`}
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
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50 shadow-sm">
                        <Icon icon="lucide:chevron-left" width="18" />
                        Previous
                    </button>
                </div>

                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, '...', 128].map((page, idx) => (
                        <button
                            key={idx}
                            className={`w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 ${page === 1 ? 'bg-[#EA3D2A] text-white' : 'text-[#181211] hover:bg-gray-50'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50 shadow-sm">
                        Next
                        <Icon icon="lucide:chevron-right" width="18" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShroomDriverTable;
