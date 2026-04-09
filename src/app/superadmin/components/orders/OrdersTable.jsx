import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
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
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState("");
    const [activeTab, setActiveTab] = useState('All');
    const [selectedSupplier, setSelectedSupplier] = useState('all');
    const [selectedStore, setSelectedStore] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTime, setSelectedTime] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8,
    });

    const initialOrders = useMemo(() => [
        { id: "SE-2026-001", product: "Micro Dose Capsules", sku: "NVB-MIC-030 · 200 Pack", store: "Forest Oasis", customer: "Sarah K.", custId: "#SE-C4821", weight: "45 gm", amount: "$77.98", tax: "+$5.36", status: "Delivered", delivery: "Express", delivered: "Mar 03, 2026 at 14:32:00" },
        { id: "SE-2026-002", product: "Micro Dose Capsules", sku: "NVB-MIC-015 · 150 Pack", store: "Healthy Greens", customer: "James T.", custId: "#SE-C3302", weight: "30 gm", amount: "$62.00", tax: "+$7.44", status: "Preparing", delivery: "Same Day", delivered: "Est. Mar 12, 2026 at 13:00:00" },
        { id: "SE-2026-003", product: "Adaptogen Blend 60ct", sku: "NVB-ADT-001 · 80 Pack", store: "Forest Oasis", customer: "Mark D.", custId: "#SE-C1190", weight: "55 gm", amount: "$132.00", tax: "+$15.84", status: "Pending", delivery: "Express", delivered: "Est. Mar 20, 2026 at 17:00:00" },
        { id: "SE-2026-004", product: "Wellness Gummies", sku: "GR-WLN-040 · 120 units", store: "Healthy Greens", customer: "Priya M.", custId: "#SE-C2204", weight: "62 gm", amount: "$24.99", tax: "+$3.00", status: "In Transit", delivery: "Express", delivered: "Est. Mar 08, 2026 at 11:23:00" },
        { id: "SE-2026-005", product: "Micro Dose Capsules", sku: "NVB-MIC-050 · 100 Pack", store: "Forest Oasis", customer: "Lena W.", custId: "#SE-C5510", weight: "60 gm", amount: "$70.00", tax: "+$8.40", status: "Delivered", delivery: "Same Day", delivered: "Feb 15, 2026 at 22:30:00" },
        { id: "SE-2026-006", product: "Micro Dose Capsules", sku: "MF-MIC-015 · 200 Pack", store: "Healthy Greens", customer: "Dan R.", custId: "#SE-C0093", weight: "30 gm", amount: "$55.00", tax: "+$6.60", status: "Cancelled", delivery: "Shipping", delivered: "-" },
        { id: "SE-2026-007", product: "Lion's Mane Caps", sku: "NVB-LMN-100 · 50 Pack", store: "Forest Oasis", customer: "Nina C.", custId: "#SE-C7721", weight: "70 gm", amount: "$96.00", tax: "+$11.52", status: "Delivered", delivery: "Shipping", delivered: "Feb 02, 2026 at 15:34:00" },
        { id: "SE-2026-008", product: "Tincture Extract", sku: "ED-TIN-030 · 60 units", store: "Forest Oasis", customer: "Omar S.", custId: "#SE-C3318", weight: "38 gm", amount: "$120.00", tax: "+$11.52", status: "Overdue", delivery: "Same Day", delivered: "Est. Feb 26, 2026 at 14:30:00" },
        { id: "SE-2026-009", product: "Micro Dose Capsules", sku: "NVB-MIC-030 · 180 Pack", store: "Forest Oasis", customer: "Kyle B.", custId: "#SE-C0441", weight: "45 gm", amount: "$62.00", tax: "+$7.44", status: "Delivered", delivery: "Express", delivered: "Jan 14, 2026 at 19:00:00" },
        { id: "SE-2026-010", product: "Full Spectrum Oil", sku: "CL-FSO-060 · 40 units", store: "Forest Oasis", customer: "Aisha N.", custId: "#SE-C8802", weight: "42 gm", amount: "$70.00", tax: "+$8.40", status: "In Transit", delivery: "Shipping", delivered: "Est. Mar 10, 2026 at 12:45:00" },
    ], []);

    const filteredData = useMemo(() => {
        let result = initialOrders.filter(order => {
            if (activeTab !== 'All' && order.status !== activeTab) return false;

            if (selectedStore !== 'all') {
                if (selectedStore === 'oasis' && order.store !== "Forest Oasis") return false;
                if (selectedStore === 'greens' && order.store !== "Healthy Greens") return false;
            }

            if (globalFilter) {
                const search = globalFilter.toLowerCase();
                return (
                    order.id.toLowerCase().includes(search) ||
                    order.product.toLowerCase().includes(search) ||
                    order.customer.toLowerCase().includes(search) ||
                    order.store.toLowerCase().includes(search)
                );
            }
            return true;
        });

        if (sortOrder === 'newest') {
            result.sort((a, b) => b.id.localeCompare(a.id));
        } else if (sortOrder === 'oldest') {
            result.sort((a, b) => a.id.localeCompare(b.id));
        }

        return result;
    }, [initialOrders, globalFilter, activeTab, selectedStore, sortOrder]);

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "Delivered": return "text-[#219653] bg-[#CDFFE2] border-none";
            case "Preparing": return "text-[#0066FF] bg-[#DAE9FF] border-none";
            case "Pending": return "text-[#D26D0A] bg-[#FFF7E8] border-none";
            case "In Transit": return "text-[#475569] bg-[#FFFFFF] border-none";
            case "Cancelled": return "text-[#EA3D2A] bg-[#FFEDEB] border-none";
            case "Overdue": return "text-[#475569] bg-[#E2E8F0] border-none";
            default: return "text-gray-500 bg-gray-50";
        }
    };

    const getDeliveryStyle = (delivery) => {
        switch (delivery) {
            case "Express": return "text-[#EA3D2A]";
            case "Same Day": return "text-[#219653]";
            case "Shipping": return "text-[#0066FF]";
            default: return "text-[#181211]";
        }
    };

    const columns = useMemo(() => [
        {
            header: 'ORDER ID',
            accessorKey: 'id',
            cell: ({ row }) => (
                <div className="">
                    <Link to={`/superadmin/orders/details/${row.original.id}`} state={{ status: row.original.status }} className="font-semibold  w-16 text-[#EA3D2A] text-sm hover:underline cursor-pointer truncate block">{row.original.id}</Link>
                </div>
            ),
        },

        {
            header: 'PRODUCT',
            accessorKey: 'product',
            cell: ({ row }) => (
                <>
                    <div className="flex items-center gap-2.5">
                        <div className="min-w-0">
                            <h4 className="text-sm font-semibold leading-tight">{row.original.product}</h4>
                            <span className="text-xs font-medium underline text-[#475569]">{row.original.sku}</span>
                        </div>
                    </div>
                </>
            ),
        },
        {
            header: 'STORE',
            accessorKey: 'store',
            cell: ({ row }) => (
                <span className="text-sm font-medium text-[#181211] whitespace-nowrap">{row.original.store}</span>
            ),
        },
        {
            header: 'CUSTOMER',
            accessorKey: 'customer',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#181211] truncate">{row.original.customer}</span>
                    <span className="text-xs font-medium underline text-[#475569] truncate">{row.original.custId}</span>
                </div>
            ),
        },

        {
            header: 'WEIGHT',
            accessorKey: 'weight',
            cell: ({ row }) => (
                <span className="text-xs font-medium text-[#181211]">{row.original.weight}</span>
            ),
        },
        {
            header: 'AMOUNT',
            accessorKey: 'amount',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#181211]">{row.original.amount}</span>
                    <span className="text-xs font-medium text-[#9AA4B2] mt-0.5">{row.original.tax}</span>
                </div>
            ),
        },
        {
            header: 'STATUS',
            accessorKey: 'status',
            cell: ({ row }) => (
                <div className={`text-xs font-semibold px-3 py-1 rounded-full inline-block whitespace-nowrap ${getStatusBadgeStyle(row.original.status)}`}>
                    {row.original.status}
                </div>
            ),
        },
        {
            header: 'DELIVERY',
            accessorKey: 'delivery',
            cell: ({ row }) => (
                <span className={`text-sm font-semibold ${getDeliveryStyle(row.original.delivery)}`}>
                    {row.original.delivery}
                </span>
            ),
        },
        {
            header: 'DELIVERED',
            accessorKey: 'delivered',
            cell: ({ row }) => {
                const parts = row.original.delivered.split(' at ');
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#181211] whitespace-nowrap">{parts[0]}</span>
                        {parts[1] && <span className="text-sm font-medium text-[#181211]">at {parts[1]}</span>}
                    </div>
                );
            },
        },
        {
            header: 'ACTIONS',
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <Link to={`/superadmin/orders/details/${row.original.id}`} state={{ status: row.original.status }} className="p-1.5 text-[#181211] hover:bg-gray-100 rounded-md transition-all">
                        <Icon icon="iconamoon:edit-light" width="18" />
                    </Link>
                </div>
            ),
        },

    ], []);


    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope mt-6">
            <div className="flex flex-wrap items-center justify-between p-4.5 gap-1 bg-white border-b border-[#F1F5F9]">
                <div className="flex-1 min-w-[300px] flex items-center gap-3 flex-wrap">
                    <ReusableSearchInput
                        value={globalFilter}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                            table.setPageIndex(0);
                        }}
                        placeholder="Search order ID, product, customer..."
                        className="w-90"
                    />

                    <div className="flex items-center gap-2 flex-wrap">
                        <ReusableTableSelect
                            options={SUPPLIER_OPTIONS}
                            value={selectedSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            placeholder="All Suppliers"
                            className="w-37"
                        />
                        <ReusableTableSelect
                            options={STORE_OPTIONS}
                            value={selectedStore}
                            onChange={(e) => setSelectedStore(e.target.value)}
                            placeholder="All Stores"
                            className="w-32"
                        />
                        <ReusableTableSelect
                            options={[{ value: 'all', label: 'All Categories' }]}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            placeholder="All Categories"
                            className="w-39"
                        />
                        <ReusableTableSelect
                            options={[{ value: 'all', label: 'All Time' }]}
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            placeholder="All Time"
                            className="w-30"
                        />
                        <ReusableTableSelect
                            options={SORT_OPTIONS}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
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

            <div className="px-5 py-4 flex items-center justify-between border-b border-[#F1F5F9]">
                <div className="flex items-center gap-6 shrink-0">
                    {TABS.map((tab, idx) => {
                        const count = tab.label === 'All'
                            ? initialOrders.length
                            : initialOrders.filter(o => o.status === tab.label).length;
                        return (
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
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4">
                    <Icon icon="bytesize:export" width="16" />
                    Export CSV
                </button>
            </div>

            <div className="px-5 py-4 bg-white border-b border-[#F1F5F9]">
                <p className="text-[13px] font-medium text-[#475569]">
                    Showing <span className="font-bold text-[#181211]">{filteredData.length}</span> of <span className="font-bold text-[#181211]">{initialOrders.length} orders</span>
                </p>
            </div>

            <div className="w-full overflow-hidden">
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
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-[#F8FAFC] transition-colors group">
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
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


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

export default OrdersTable;
