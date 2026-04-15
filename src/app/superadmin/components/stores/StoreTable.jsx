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




const CATEGORY_OPTIONS = [
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
  { value: 'rating-high', label: 'Top Rated' },
];



const DEFAULT_DATA = STORES_DATA;

const getStatusBadgeStyle = (status) => {
  const s = status?.toUpperCase();
  switch (s) {
    case 'ACTIVE': return 'text-[#10B981] border-[#10B981] bg-[#ECFDF5]';
    case 'PENDING': return 'text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]';
    case 'INACTIVE': 
    case 'SUSPENDED': return 'text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]';
    case 'REJECTED': return 'text-gray-400 border-gray-400 bg-gray-50';
    default: return 'text-gray-500 border-gray-500 bg-gray-50';
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
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeTab, setActiveTab] = useState('All Stores');
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const stores = useMemo(() => data || DEFAULT_DATA, [data]);

  // Calculate dynamic counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: stores.length,
      active: stores.filter(s => s.status?.toUpperCase() === "ACTIVE").length,
      pending: stores.filter(s => s.status?.toUpperCase() === "PENDING").length,
      suspended: stores.filter(s => s.status?.toUpperCase() === "INACTIVE" || s.status?.toUpperCase() === "SUSPENDED" || s.isSuspended).length,
    };
  }, [stores]);

  const tabs = [
    { label: 'All Stores', count: tabCounts.all },
    { label: 'Active', count: tabCounts.active, filter: "ACTIVE" },
    { label: 'Pending', count: tabCounts.pending, filter: "PENDING" },
    { label: 'Suspended', count: tabCounts.suspended, filter: "INACTIVE" },
  ];

  const filteredData = useMemo(() => {
    let result = [...stores];

    // Filter by tab
    if (activeTab !== 'All Stores') {
      const activeFilter = tabs.find(t => t.label === activeTab)?.filter;
      result = result.filter(item => {
          const status = item.status?.toUpperCase();
          if (activeFilter === "INACTIVE") {
              return status === "INACTIVE" || status === "SUSPENDED" || item.isSuspended;
          }
          return status === activeFilter;
      });
    }

    // Filter by Category
    if (categoryFilter) {
      result = result.filter(item => item.category === categoryFilter);
    }

    // Filter by search
    if (globalFilter) {
      const searchLower = globalFilter.toLowerCase();
      result = result.filter(item =>
        item.name?.toLowerCase().includes(searchLower) ||
        (item.id || item._id || '').toLowerCase().includes(searchLower) ||
        (item.category || '').toLowerCase().includes(searchLower) ||
        (typeof item.location === 'string' ? item.location : `${item.city} ${item.province}`)?.toLowerCase().includes(searchLower)
      );
    }

    // Apply Sorting
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === 'rating-high') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [stores, activeTab, globalFilter, categoryFilter, sortOrder]);

  const columns = useMemo(() => [
    {
      header: 'STORE',
      accessorKey: 'name',
      cell: ({ row }) => {
        const store = row.original;
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000';

        const getImageUrl = (url) => {
          if (!url) return null;
          if (typeof url !== 'string') return null;
          if (url.startsWith('http') || url.startsWith('data:')) return url;
          return `${API_URL}/files/${url}`;
        };

        const logo = getImageUrl(store.logo) || getImageUrl(store.image) || getImageUrl(store.coverImage);

        // Ensure consistent short ID format (last 4 chars of DB _id if id is long or missing)
        const rawId = store.id || store._id || '';
        const id = rawId.toString().length > 10
          ? `#SE-${rawId.toString().slice(-4).toUpperCase()}`
          : (rawId.toString().startsWith('#') ? rawId : `#${rawId}`);

        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 border border-[#EDF2F7] shrink-0">
              <img src={logo} alt={store.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-[#181211] w-[95%] leading-tight truncate">{store?.name}</h4>
              <span className="text-[11px] font-medium text-[#EA3D2A]">{id}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: 'CATEGORY',
      accessorKey: 'category',
      cell: ({ row }) => {
        const store = row.original;
        const category = store.category || 'General';
        const tags = store.storeTags || store.tags || [];
        return (
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-semibold text-[#181211]">{category}</span>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, i) => (
                <span key={i} className="text-[10px] font-medium text-[#3B82F6] bg-[#EFF6FF] px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      header: 'LOCATION',
      accessorKey: 'location',
      cell: ({ row }) => {
        const loc = row.original.location;
        const displayLoc = typeof loc === 'string' ? loc : `${row.original.city}, ${row.original.province}`;
        return (
          <div className="flex items-center gap-1.5 text-[#181211]">
            <Icon icon="lucide:map-pin" width="14" className="text-[#181211] shrink-0" />
            <span className="text-[12px] font-medium">{displayLoc}</span>
          </div>
        );
      },
    },
    {
      header: 'DELIVERY',
      accessorKey: 'delivery',
      cell: ({ row }) => {
        const delivery = row.original.delivery || [
          row.original.expressDelivery && { type: 'EXPRESS', variant: 'blue' },
          row.original.shippingMailOrder && { type: 'SHIPPING', variant: 'grey' },
          row.original.estimatedDelivery && { type: row.original.estimatedDelivery, variant: 'teal' }
        ].filter(Boolean);

        return (
          <div className="flex items-center gap-2">
            {delivery.map((del, i) => (
              <span
                key={i}
                className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getDeliveryVariantStyle(del.variant)}`}
              >
                {del.type}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      header: 'REVENUE',
      accessorKey: 'revenue',
      cell: ({ row }) => {
        const revenue = row.original.revenue || '$0.0K';
        const revenueSub = row.original.revenueSub || 'Monthly revenue';
        return (
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#181211]">{revenue}</span>
            <span className="text-[10px] text-[#94A3B8] font-medium leading-none">{revenueSub}</span>
          </div>
        );
      },
    },
    {
      header: 'ORDERS',
      accessorKey: 'orders',
      cell: ({ row }) => {
        const orders = row.original.orders || '0';
        const ordersSub = row.original.ordersSub || 'Total Orders';
        return (
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#181211]">{orders}</span>
            <span className="text-[10px] text-[#94A3B8] font-medium leading-none">{ordersSub}</span>
          </div>
        );
      },
    },
    {
      header: 'STATUS',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status || 'Active';
        const displayStatus = status === 'ACTIVE' ? 'Active' : (status === 'INACTIVE' ? 'Suspended' : status);
        const statusTime = row.original.statusTime || (row.original.openingTime ? `${row.original.openingTime} - ${row.original.closingTime}` : '');

        return (
          <div className="flex flex-col gap-1">
            <div className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border w-fit ${getStatusBadgeStyle(displayStatus)}`}>
              {displayStatus}
            </div>
            {statusTime && <span className="text-[11px] text-[#94A3B8] font-medium ml-0.5">{statusTime}</span>}
          </div>
        );
      },
    },
    {
      header: 'RATING',
      accessorKey: 'rating',
      cell: ({ row }) => {
        const rating = row.original.rating || '5.0';
        return (
          <div className="flex items-center gap-1">
            <Icon icon="material-symbols:star" className="text-[#F59E0B]" width="14" />
            <span className="text-[13px] font-bold text-[#181211]">{rating}</span>
          </div>
        );
      },
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
          <Link 
            to={`/superadmin/stores/edit/${row.original._id}`}
            className="text-[#64748B] hover:bg-[#64748B]/10 p-1 rounded-md transition-all flex items-center justify-center underline-none"
          >
            <Icon icon="lucide:pencil" width="16" />
          </Link>
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
    <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope mt-6">
      {/* Top Filters & Tabs */}
      <div className="flex items-center justify-between p-4.5 gap-6 border-b border-[#F1F5F9] overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-6 shrink-0">
          {tabs.map((tab, idx) => (
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

        <div className="flex items-center gap-1 shrink-0">
          <ReusableSearchInput
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              table.setPageIndex(0);
            }}
            placeholder="Search Store"
            className="w-60"
          />

          <ReusableTableSelect
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              table.setPageIndex(0);
            }}
            options={CATEGORY_OPTIONS}
            placeholder="All Category"
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
    </div>
  );
};

export default StoreTable;
