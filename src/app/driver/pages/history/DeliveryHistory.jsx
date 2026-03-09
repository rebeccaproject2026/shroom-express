import { Icon } from "@iconify/react";
import { useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import ViewDetailsDrawer from '../../components/common/ViewDetailsDrawer';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

const DeliveryHistory = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('March, 2026');
    const [statusFilter, setStatusFilter] = useState('All');
    const [paymentFilter, setPaymentFilter] = useState('All');

    const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
    const [selectedDeliveryForDetails, setSelectedDeliveryForDetails] = useState(null);

    // Delivery history data
    const deliveryData = useMemo(() => [
        {
            id: '#DEL-9021',
            pickup: 'Warehouse A, NY',
            dropoff: '122 Wall St, NY',
            deliveredDate: 'Oct 24, 2023',
            payment: 'Prepaid',
            earnings: '$14.50',
            status: 'Delivered',
        },
        {
            id: '#DEL-9021',
            pickup: 'Local Hub, NY',
            dropoff: '45 Park Ave, NY',
            deliveredDate: 'Oct 24, 2023',
            payment: 'COD',
            earnings: '$12.00',
            status: 'Delivered',
        },
        {
            id: '#DEL-9021',
            pickup: 'Warehouse B, NJ',
            dropoff: '89 Broadway, NY',
            deliveredDate: 'Oct 23, 2023',
            payment: 'Prepaid',
            earnings: '$0.00',
            status: 'Failed',
        },
        {
            id: '#DEL-9021',
            pickup: 'Retail Center, NY',
            dropoff: '12 Sky Tower, NY',
            deliveredDate: 'Oct 22, 2023',
            payment: 'COD',
            earnings: '$0.00',
            status: 'Prepaid',
        },
        {
            id: '#DEL-9021',
            pickup: 'Distribution Hub, NY',
            dropoff: '77 5th Ave, NY',
            deliveredDate: 'Oct 21, 2023',
            payment: 'Prepaid',
            earnings: '$21.15',
            status: 'Cancelled',
        },
    ], []);

    // Table columns
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'Delivery ID',
            cell: (info) => (
                <span
                    className="text-[#1142D4] font-medium cursor-pointer hover:underline"
                    onClick={() => {
                        setSelectedDeliveryForDetails(info.row.original);
                        setViewDetailsOpen(true);
                    }}
                >
                    {info.getValue()}
                </span>
            ),
        },
        {
            accessorKey: 'pickup',
            header: 'Pickup',
            cell: (info) => (
                <span className="text-[#222222] font-medium">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: 'dropoff',
            header: 'Drop-off',
            cell: (info) => (
                <span className="text-[#222222] font-medium">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: 'deliveredDate',
            header: 'Delivered Date',
            cell: (info) => (
                <span className="text-[#222222] font-medium">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: 'payment',
            header: 'Payment',
            cell: (info) => {
                const value = info.getValue();
                const isPrepaid = value === 'Prepaid';
                return (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${isPrepaid
                        ? 'bg-[#D1FAE5] text-[#059669]'
                        : 'bg-[#FEE2E2] text-[#DC2626]'
                        }`}>
                        {value}
                    </span>
                );
            },
        },
        {
            accessorKey: 'earnings',
            header: 'Earnings',
            cell: (info) => (
                <span className="text-[#222222] font-semibold">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => {
                const value = info.getValue();
                let bgColor = 'bg-[#D1FAE5]';
                let textColor = 'text-[#059669]';

                if (value === 'Failed') {
                    bgColor = 'bg-[#FEE2E2]';
                    textColor = 'text-[#DC2626]';
                } else if (value === 'Prepaid') {
                    bgColor = 'bg-[#D1FAE5]';
                    textColor = 'text-[#059669]';
                } else if (value === 'Cancelled') {
                    bgColor = 'bg-[#F3F4F6]';
                    textColor = 'text-[#6B7280]';
                }

                return (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}>
                        {value}
                    </span>
                );
            },
        },
    ], []);

    const table = useReactTable({
        data: deliveryData,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    return (
        <div className="p-4 bg-[#F5F5F5]">
            {/* Welcome Header */}
            <div className="flex flex-col gap-7">
                <PageHeader className="!mb-0" />

                <div className="grid grid-cols-1 sm:grid-cols-3 sm:w-fit gap-4 mb-4">
                    {/* Month Filter */}
                    <div className="relative sm:w-57.5">
                        <Select
                            options={[
                                { value: 'March, 2026', label: 'March, 2026' },
                                { value: 'February, 2026', label: 'February, 2026' },
                                { value: 'January, 2026', label: 'January, 2026' }
                            ]}
                            value={monthFilter}
                            onChange={(e) => setMonthFilter(e.target.value)}
                            className="!pl-10 !py-2.5 !border-[#E8E8E8] !rounded-md !text-sm !font-medium !text-[#222222]"
                        />
                        <Icon icon="lets-icons:date-today-light" width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636363] stroke-2 pointer-events-none z-10" />
                    </div>

                    {/* Status Filter */}
                    <div className="relative sm:w-57.5">
                        <Select
                            options={[
                                { value: 'Status: All', label: 'Status: All' },
                                { value: 'Status: Delivered', label: 'Status: Delivered' },
                                { value: 'Status: Failed', label: 'Status: Failed' },
                                { value: 'Status: Cancelled', label: 'Status: Cancelled' }
                            ]}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="!py-2.5 !px-4 !border-[#E8E8E8] !rounded-md !text-sm !font-medium !text-[#222222]"
                        />
                    </div>

                    {/* Payment Filter */}
                    <div className="relative sm:w-57.5">
                        <Select
                            options={[
                                { value: 'Payment: All', label: 'Payment: All' },
                                { value: 'Payment: Prepaid', label: 'Payment: Prepaid' },
                                { value: 'Payment: COD', label: 'Payment: COD' }
                            ]}
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="!py-2.5 !px-4 !border-[#E8E8E8] !rounded-md !text-sm !font-medium !text-[#222222]"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-md shadow-sm p-2.5">

                {/* Search Input */}
                <div className="mb-5">
                    <div className="relative">
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2.5 pl-10 border border-[#E8E8E8] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-[#636363] placeholder:text-[#636363] text-sm"
                        />
                        <Icon icon="iconamoon:search-light" width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636363]" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="border-b border-[#E8E8E8]">
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="text-left py-3 px-4 text-sm font-semibold text-[#222222]"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-[#F5F5F5] hover:bg-[#F8FBFF] transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="py-3 px-4 text-xs">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-2">
                <div className="text-[13px] text-[#222222] font-semibold ml-4">
                    Showing 1 to 5 of 124 results
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 rounded-md bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Icon icon="iconamoon:arrow-left-2" width="16" height="16" className="text-[#222222]" />
                    </button>

                    <button className="px-3 py-1.5 rounded-sm bg-[#1142D4] shadow text-white font-semibold text-xs cursor-pointer">
                        1
                    </button>
                    <button className="px-3 py-1.5 rounded-sm hover:bg-gray-100 bg-white shadow text-[#222222] cursor-pointer font-semibold text-xs transition-colors">
                        2
                    </button>
                    <button className="px-3 py-1.5 rounded-sm hover:bg-gray-100 bg-white shadow text-[#222222] cursor-pointer font-semibold text-xs transition-colors">
                        3
                    </button>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-2 rounded-md bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Icon icon="iconamoon:arrow-right-2" width="16" height="16" className="text-[#222222]" />
                    </button>
                </div>
            </div>

            <ViewDetailsDrawer
                isOpen={viewDetailsOpen}
                onClose={() => setViewDetailsOpen(false)}
                delivery={selectedDeliveryForDetails}
            />
        </div >
    );
};

export default DeliveryHistory;
