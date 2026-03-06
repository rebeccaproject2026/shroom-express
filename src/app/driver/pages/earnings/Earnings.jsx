import { Icon } from "@iconify/react";
import { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

const Earnings = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    const summaryData = [
        {
            title: "Today's Earnings",
            amount: "$145.20",
            icon: "iconamoon:trend-up",
            iconColor: "text-[#10B981]",
            subtext: "12% from yesterday",
            subtextColor: "text-[#10B981]",
            iconClass: "" // default
        },
        {
            title: "Weekly Earnings",
            amount: "$890.50",
            icon: "si:info-line",
            iconColor: "text-[#0F49BD]",
            subtext: "Next payout on Monday",
            subtextColor: "text-[#0F49BD]",
            iconClass: "*:stroke-2"
        },
        {
            title: "Pending Payout",
            amount: "$320.00",
            icon: "lucide:refresh-ccw",
            iconColor: "text-[#F59E0B]",
            subtext: "Processing",
            subtextColor: "text-[#F59E0B]",
            iconClass: "w-4 h-4" // specific width override needed here
        },
        {
            title: "Total COD Collected",
            amount: "$1,250.00",
            icon: "lets-icons:date-today-light",
            iconColor: "text-[#94A3B8]",
            subtext: "Total for this week",
            subtextColor: "text-[#94A3B8]",
            iconClass: "*:stroke-2"
        }
    ];

    const codSummaryData = [
        {
            title: "Total COD Assigned",
            amount: "$1,500.00",
            icon: "fluent:wallet-credit-card-24-regular",
            iconColor: "text-[#059669]",
            bgColor: "bg-[#D1FAE5]"
        },
        {
            title: "COD Collected",
            amount: "$1,250.00",
            icon: "solar:documents-linear",
            iconColor: "text-[#1142D4]",
            bgColor: "bg-[#DBEAFE]"
        },
        {
            title: "COD Submitted",
            amount: "$1,000.00",
            icon: "tabler:progress",
            iconColor: "text-[#F59E0B]",
            bgColor: "bg-[#FEF3C7]"
        }
    ];

    // Transaction history data
    const transactionData = useMemo(() => [
        {
            id: '#DEL-9021',
            date: 'Oct 24, 2023',
            earnings: '$14.50',
            bonus: '+$2.00',
            deduction: '$0.00',
            netAmount: '$14.50',
            paymentType: null,
        },
        {
            id: '#DEL-9021',
            date: 'Oct 24, 2023',
            earnings: '$14.50',
            bonus: '+$2.00',
            deduction: '$0.00',
            netAmount: '$14.50',
            paymentType: null,
        },
        {
            id: '#DEL-9021',
            date: 'Oct 24, 2023',
            earnings: '$14.50',
            bonus: '$0.00',
            deduction: '-$0.50',
            netAmount: '$14.50',
            paymentType: null,
        },
        {
            id: '#DEL-9021',
            date: 'Oct 24, 2023',
            earnings: '$14.50',
            bonus: '+$2.00',
            deduction: '-$0.50',
            netAmount: '$14.50',
            paymentType: null,
        },
        {
            id: '#DEL-9021',
            date: 'Oct 24, 2023',
            earnings: '$14.50',
            bonus: '+$2.00',
            deduction: '$0.00',
            netAmount: 'Prepaid',
            paymentType: 'Prepaid',
        },
    ], []);

    // Table columns
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'Delivery ID',
            cell: (info) => (
                <span className="text-[#1142D4] font-medium">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: 'date',
            header: 'Date',
            cell: (info) => (
                <span className="text-[#222222] font-medium">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: 'earnings',
            header: 'Earnings',
            cell: (info) => (
                <span className="text-[#222222] font-medium">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: 'bonus',
            header: 'Bonus',
            cell: (info) => {
                const value = info.getValue();
                const isPositive = value.includes('+');
                return (
                    <span className={`font-medium ${isPositive ? 'text-[#059669]' : 'text-[#222222]'}`}>
                        {value}
                    </span>
                );
            },
        },
        {
            accessorKey: 'deduction',
            header: 'Deduction',
            cell: (info) => {
                const value = info.getValue();
                const isNegative = value.includes('-');
                return (
                    <span className={`font-semibold ${isNegative ? 'text-[#FB7185]' : 'text-[#222222]'}`}>
                        {value}
                    </span>
                );
            },
        },
        {
            accessorKey: 'netAmount',
            header: 'Net Amount',
            cell: (info) => {
                const row = info.row.original;
                if (row.paymentType === 'Prepaid') {
                    return (
                        <span className="inline-block px-3 py-1 rounded text-sm font-semibold bg-[#D1FAE5] text-[#059669]">
                            Prepaid
                        </span>
                    );
                }
                return (
                    <span className="text-[#222222] font-semibold">{info.getValue()}</span>
                );
            },
        },
    ], []);

    const table = useReactTable({
        data: transactionData,
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
        <div className="p-4  bg-[#F5F5F5]">
            {/* Welcome Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-[#222222]">
                    👋 Welcome, David Doe
                </h1>
            </div>

            {/* Earnings Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {summaryData.map((item, index) => (
                    <div key={index} className="bg-white rounded-sm shadow-sm p-3">
                        <p className="text-sm text-[#222222] font-medium mb-2">{item.title}</p>
                        <p className="text-xl font-semibold text-[#222222] mb-2">{item.amount}</p>
                        <div className="flex items-center gap-1 text-sm mt-4">
                            <Icon
                                icon={item.icon}
                                width={item.iconClass.includes("w-4") ? "16" : "18"}
                                height={item.iconClass.includes("h-4") ? "16" : "18"}
                                className={`${item.iconColor} ${item.iconClass}`}
                            />
                            <span className={`${item.subtextColor} font-semibold`}>{item.subtext}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* COD Summary */}
            <div className="bg-white rounded-md shadow-sm p-5 mb-6">
                <h2 className="text-lg font-semibold text-[#222222] mb-4">COD Summary</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {codSummaryData.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center`}>
                                <Icon icon={item.icon} width="24" height="24" className={item.iconColor} />
                            </div>
                            <div>
                                <p className="text-xs text-[#777777] font-semibold">{item.title}</p>
                                <p className="text-lg font-bold text-[#222222]">{item.amount}</p>
                            </div>
                        </div>
                    ))}

                    {/* Pending Submission */}
                    <div className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-xs text-[#1142D4] font-semibold">Pending Submission</p>
                                <p className="text-lg font-bold text-[#1142D4]">$25.00</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-[#1142D4] text-white rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
                            Submit Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <h2 className="text-lg font-semibold text-[#222222] mb-4 ml-4">Transaction History</h2>
            <div className="bg-white rounded-md shadow-sm p-5">
                {/* Search Input */}
                <div className="mb-5">
                    <div className="relative">
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2.5 pl-10 border border-[#E8E8E8] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <Icon icon="iconamoon:search-light" width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                                    className="border-b border-[#F5F5F5] hover:bg-[#F8FBFF] text-xs transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="py-3 px-4 text-sm">
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

                {/* Pagination */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#E8E8E8]">
                    <div className="text-sm text-[#222222] font-semibold ml-4">
                        Showing 1 to 5 of 124 results
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-2 rounded-sm bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Icon icon="iconamoon:arrow-left-2" width="16" height="16" className="text-[#222222]" />
                        </button>

                        <button className="px-3 py-1.5 rounded-sm bg-[#1142D4] text-white shadow font-semibold text-xs">
                            1
                        </button>
                        <button className="px-3 py-1.5 rounded-sm hover:bg-gray-100 bg-white shadow text-[#222222] font-semibold text-xs transition-colors">
                            2
                        </button>
                        <button className="px-3 py-1.5 rounded-sm hover:bg-gray-100 bg-white shadow text-[#222222] font-semibold text-xs transition-colors">
                            3
                        </button>

                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-2 rounded-sm bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Icon icon="iconamoon:arrow-right-2" width="16" height="16" className="text-[#222222]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Earnings;
