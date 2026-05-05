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
import { STORES_DATA } from '../../data/storesData';
import StoreLocationDrawer from './StoreLocationDrawer';


const DELIVERY_OPTIONS = [
  { value: 'All Delivery option', label: 'All Delivery option' },
  { value: 'Express', label: 'Express' },
  { value: 'Shipping', label: 'Shipping' },
  { value: 'Same-Day', label: 'Same-Day' },
];

const LOCATION_OPTIONS = [
  { value: 'All Canada', label: 'All Canada' },
  { value: 'Alberta', label: 'Alberta' },
  { value: 'British Columbia', label: 'British Columbia' },
  { value: 'Manitoba', label: 'Manitoba' },
  { value: 'New Brunswick', label: 'New Brunswick' },
  { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
  { value: 'Nova Scotia', label: 'Nova Scotia' },
  { value: 'Northwest Territories', label: 'Northwest Territories' },
  { value: 'Nunavut', label: 'Nunavut' },
  { value: 'Ontario', label: 'Ontario' },
  { value: 'Prince Edward Island', label: 'Prince Edward Island' },
  { value: 'Quebec', label: 'Quebec' },
  { value: 'Saskatchewan', label: 'Saskatchewan' },
  { value: 'Yukon', label: 'Yukon' },
];

const STATUS_OPTIONS = [
  { value: 'All Status', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Suspended', label: 'Suspended' },
  { value: 'Draft', label: 'Draft' },
];

const CATEGORY_OPTIONS = [
  { value: 'All Category', label: 'All Category' },
  { value: 'Micro Dosing', label: 'Micro Dosing' },
  { value: 'Full Spectrum', label: 'Full Spectrum' },
  { value: 'Wellness', label: 'Wellness' },
  { value: 'Gummies', label: 'Gummies' },
  { value: 'Tinctures', label: 'Tinctures' },
  { value: 'Capsules', label: 'Capsules' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'ascending', label: 'Ascending' },
  { value: 'descending', label: 'Descending' },
];



const DEFAULT_DATA = STORES_DATA;

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Active': return 'text-[#219653] border-[#219653] bg-white';
    case 'Pending': return 'text-[#FF9F40] border-[#FF9F40] bg-white';
    case 'Suspended': return 'text-[#EA3D2A] border-[#EA3D2A] bg-white';
    case 'Draft': return 'text-[#94A3B8] border-[#94A3B8] bg-white';
    default: return 'text-[#181211] border-[#E2E8F0] bg-white';
  }
};

const getDeliveryVariantStyle = (variant) => {
  switch (variant) {
    case 'blue': return 'text-[#3B82F6] border-[#3B82F6] bg-white';
    case 'teal': return 'text-[#14B8A6] border-[#14B8A6] bg-white';
    case 'grey': return 'text-[#64748B] border-[#64748B] bg-white';
    default: return 'text-gray-500 border-gray-500 bg-white';
  }
};

const StoreTable = ({ data = null }) => {
  const [sorting, setSorting] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("All Delivery option");
  const [locationFilter, setLocationFilter] = useState("All Canada");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [sortOrder, setSortOrder] = useState("newest");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const stores = useMemo(() => data || DEFAULT_DATA, [data]);

  const filteredData = useMemo(() => {
    let result = [...stores];

    // Filter by Delivery
    if (deliveryFilter && deliveryFilter !== 'All Delivery option') {
      result = result.filter(item => item.delivery.some(d => d.type === deliveryFilter));
    }

    // Filter by Location
    if (locationFilter && locationFilter !== 'All Canada') {
      result = result.filter(item => item.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    // Filter by Status
    if (statusFilter && statusFilter !== 'All Status') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Filter by Category
    if (categoryFilter && categoryFilter !== 'All Category') {
      result = result.filter(item => item.category === categoryFilter);
    }

    // Filter by search
    if (globalFilter) {
      const searchLower = globalFilter.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.id.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply Sorting
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === 'ascending') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'descending') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [stores, globalFilter, deliveryFilter, locationFilter, statusFilter, categoryFilter, sortOrder]);

  const columns = useMemo(() => [
    {
      header: 'STORE',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 border border-[#EDF2F7] shrink-0">
            <img src={row.original.image} alt={row.original.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[13px] font-bold text-[#181211] leading-tight truncate">{row.original.name}</h4>
            <span className="text-[11px] font-medium text-[#EA3D2A]">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'CATEGORY',
      accessorKey: 'category',
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-semibold text-[#181211]">{row.original.category}</span>
          <div className="flex flex-wrap gap-1">
            {row.original.tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-medium text-[#3B82F6] bg-[#EFF6FF] px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      header: 'LOCATION',
      accessorKey: 'location',
      cell: ({ row }) => (
        <div
          className="flex items-center gap-1.5 text-[#181211] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            setSelectedStore(row.original);
            setIsDrawerOpen(true);
          }}
        >
          <Icon icon="lucide:map-pin" width="14" className="text-[#181211] shrink-0" />
          <span className="text-[12px] font-medium">{row.original.location}</span>
          <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">
            +5
          </span>
        </div>
      ),
    },
    {
      header: 'DELIVERY',
      accessorKey: 'delivery',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.delivery.map((del, i) => (
            <span
              key={i}
              className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getDeliveryVariantStyle(del.variant)}`}
            >
              {del.type}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'REVENUE',
      accessorKey: 'revenue',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[#181211]">{row.original.revenue}</span>
          <span className="text-[10px] text-[#94A3B8] font-medium leading-none">{row.original.revenueSub}</span>
        </div>
      ),
    },
    {
      header: 'ORDERS',
      accessorKey: 'orders',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[#181211]">{row.original.orders}</span>
          <span className="text-[10px] text-[#94A3B8] font-medium leading-none">{row.original.ordersSub}</span>
        </div>
      ),
    },
    {
      header: 'STATUS',
      accessorKey: 'status',
      cell: ({ row }) => {
        // Mocking multi-status data for demonstration as per image
        const statuses = row.original.statusList || [
          { status: row.original.status, count: Math.floor(Math.random() * 5) + 1 },
          ...(row.original.status === 'Active' ? [{ status: 'Pending', count: 1 }] : [])
        ];

        return (
          <div
            className="flex flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              setSelectedStore(row.original);
              setIsDrawerOpen(true);
            }}
          >
            <div className="flex flex-wrap items-center gap-1">
              {statuses.slice(0, 2).map((s, i) => (
                <div key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeStyle(s.status)}`}>
                  {s.status} ({s.count})
                </div>
              ))}
              {statuses.length > 2 && (
                <div className="w-5 h-5 rounded-full bg-[#EA3D2A] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  +{statuses.length - 2}
                </div>
              )}
            </div>
            {/* <span className="text-[11px] text-[#94A3B8] font-medium ml-0.5">{row.original.statusTime}</span> */}
          </div>
        );
      },
    },
    {
      header: 'RATING',
      accessorKey: 'rating',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Icon icon="material-symbols:star" className="text-[#F59E0B]" width="14" />
          <span className="text-[13px] font-bold text-[#181211]">{row.original.rating}</span>
        </div>
      ),
    },
    {
      header: 'ACTIONS',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/superadmin/stores/details/${row.original.id.replace('#', '')}`}
            className="text-[#3B82F6] hover:bg-[#3B82F6]/10 p-1 rounded-md transition-all flex items-center justify-center underline-none"
          >
            <Icon icon="lucide:eye" width="16" />
          </Link>
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
    autoResetPageIndex: false, // Prevent automatic page reset on data changes
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-visible font-manrope mt-6">
      {/* Top Filters & Tabs */}
      <div className="flex items-center justify-between p-4.5 gap-2 border-b border-[#F1F5F9] relative z-20 overflow-visible hide-scrollbar">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <ReusableSearchInput
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              table.setPageIndex(0);
            }}
            placeholder="Search Store"
            className="w-full max-w-[30%]"
          />

          <ReusableTableSelect
            value={deliveryFilter}
            onChange={(e) => {
              setDeliveryFilter(e.target.value);
              table.setPageIndex(0);
            }}
            options={DELIVERY_OPTIONS}
            placeholder="All Delivery option"
            className="w-48 shrink-0"
          />

          <ReusableTableSelect
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              table.setPageIndex(0);
            }}
            options={LOCATION_OPTIONS}
            placeholder="All Location"
            className="w-35 shrink-0"
          />

          <ReusableTableSelect
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              table.setPageIndex(0);
            }}
            options={STATUS_OPTIONS}
            placeholder="All Status"
            className="w-32 shrink-0"
          />

          <ReusableTableSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            options={SORT_OPTIONS}
            placeholder="Sort By"
            className="w-38 shrink-0"
          />

          <ReusableTableSelect
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              table.setPageIndex(0);
            }}
            options={CATEGORY_OPTIONS}
            placeholder="All Category"
            className="w-37 shrink-0"
          />
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

      {/* Table Section */}
      <div className="w-full overflow-visible min-h-[450px]">
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
                  No stores found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-4 border-t border-[#F1F5F9] bg-white">
        <div className="flex items-center gap-2">
          {/* <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center justify-center p-2 border border-[#E2E8F0] rounded-lg text-sm font-bold text-[#181211] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
            title="First Page"
          >
            <Icon icon="lucide:chevrons-left" width="18" />
          </button> */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md  text-sm font-semibold text-[#181211] hover:bg-gray-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
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
            className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md  text-sm font-semibold text-[#181211] hover:bg-gray-50  disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <Icon icon="lucide:chevron-right" width="18" />
          </button>
          {/* <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center justify-center p-2 border border-[#E2E8F0] rounded-lg text-sm font-bold text-[#181211] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
            title="Last Page"
          >
            <Icon icon="lucide:chevrons-right" width="18" />
          </button> */}
        </div>
      </div>
      <StoreLocationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        store={selectedStore}
      />
    </div>
  );
};

export default StoreTable;
