import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, Link } from 'react-router-dom';
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
import { INVENTORY_DATA } from '../../data/inventoryData';




const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'rating-high', label: 'Top Rated' },
];

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'In Stock': return 'text-[#10B981] border-[#10B981] bg-[#ECFDF5]';
    case 'Low Stock': return 'text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]';
    case 'Out of Stock': return 'text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]';
    case 'Pending': return 'text-[#0066FF] border-[#0066FF] bg-[#EFF6FF]';
    default: return 'text-gray-500 border-gray-500 bg-gray-50';
  }
};

const InventoryTable = ({ data = null }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const products = useMemo(() => data || INVENTORY_DATA, [data]);

  const filteredData = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (globalFilter) {
      const searchLower = globalFilter.toLowerCase();
      result = result.filter(item =>
        item.product.name.toLowerCase().includes(searchLower) ||
        item.product.sku.toLowerCase().includes(searchLower) ||
        item.store.name.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [products, globalFilter, sortOrder]);

  const columns = useMemo(() => [
    {
      header: 'PRODUCT',
      accessorKey: 'product.name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm overflow-hidden bg-gray-100 border border-[#EDF2F7] shrink-0">
            <img src={row.original.product.img} alt={row.original.product.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-[#181211] w-24 truncate">{row.original.product.name}</h4>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#EA3D2A]">{row.original.product.sku}</span>
              <span className="text-xs font-medium text-[#475569] w-12 truncate">{row.original.product.tier}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'STORE',
      accessorKey: 'store.name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm overflow-hidden bg-gray-100 border border-[#EDF2F7] shrink-0">
            <img src={row.original.store.img} alt={row.original.store.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold leading-tight">{row.original.store.name}</h4>
            <span className="text-xs font-medium text-[#219653] uppercase">{row.original.store.status}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'CATEGORY',
      accessorKey: 'category',
      cell: ({ row }) => (
        <span className="px-3.5 py-1 bg-[#EFF6FF] text-[#3B82F6] text-[11px] font-bold rounded-full">
          {row.original.category}
        </span>
      ),
    },
    {
      header: 'STOCK / PACK WT',
      accessorKey: 'stock.current',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 min-w-[140px]">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-14 bg-gray-100 rounded-full overflow-hidden border border-[#F1F5F9]">
              <div className={`h-full ${row.original.stock.color} rounded-full`} style={{ width: `${row.original.stock.percentage}%` }} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-[13px] font-semibold ${row.original.stock.current === 0 ? 'text-[#EA3D2A]' : 'text-[#219653]'}`}>{row.original.stock.current}</span>
              <span className="text-[11px] font-semibold text-[#181211]">pack</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1 py-0.5 border border-[#0066FF] text-[#0066FF] text-[8px] font-semibold rounded-full ">
              {row.original.stock.wt}
            </span>
            <span className="text-[#9AA4B2] text-[10px] font-medium ">alert: {row.original.stock.alert} pack</span>
          </div>
        </div>
      ),
    },
    {
      header: 'PRICE',
      accessorKey: 'price.current',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#181211] mb-0.5">{row.original.price.current}</span>
          <span className="text-[10px] text-[#94A3B8] font-medium leading-none">Cost: {row.original.price.cost}</span>
        </div>
      ),
    },
    {
      header: 'STATUS',
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border w-fit ${getStatusBadgeStyle(row.original.status)}`}>
            {row.original.status === 'In Stock' ? 'In Stock' : row.original.status === 'Low Stock' ? 'Low' : 'Out'}
          </div>
          {row.original.isLowPending && (
            <div className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border w-fit text-[#3B82F6] border-[#3B82F6] bg-[#EFF6FF]">
              PENDING
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'RATING',
      accessorKey: 'rating',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Icon icon="material-symbols:star" className="text-[#F59E0B]" width="14" />
          <span className="text-sm font-semibold text-[#FF9800]">{row.original.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      header: 'ACTIONS',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button className="text-[#475569]  p-1 rounded-md transition-all">
            <Icon icon="tabler:box" width="22" />
          </button>
          <button className="text-[#FF9F40]  p-1 rounded-md transition-all">
            <Icon icon="si:alert-line" width="22" />
          </button>
          <Link to={`/superadmin/inventory/details/${row.original.id}`} className="text-[#0066FF] p-1 rounded-md transition-all">
            <Icon icon="majesticons:eye-line" width="22" />
          </Link>
          <button className="text-[#219653]  p-1 rounded-md transition-all">
            <Icon icon="iconamoon:edit-light" width="22" />
          </button>
          {(row.original.status === "Pending" || row.original.isLowPending) ? (
            <div className="flex items-center gap-1">
              <button className="text-[#219653] p-1 rounded-md transition-all">
                <Icon icon="akar-icons:check-box-fill" width="25" />
              </button>
              <button className="text-[#EA3D2A]  p-1 rounded-md transition-all">
                <Icon icon="basil:cancel-solid" width="30" />
              </button>
            </div>
          ) : (
            <button className="text-[#FF0000] p-1 rounded-md transition-all">
              <Icon icon="fluent:delete-24-regular" width="22" />
            </button>
          )}
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope mt-6">
      {/* Top Header Section */}
      <div className="flex items-center justify-between p-4.5 gap-2 border-b border-[#F1F5F9] overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1 shrink-0 w-[85%]">
          <ReusableSearchInput
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              table.setPageIndex(0);
            }}
            placeholder="Search Products"
            className="w-full "
          />
        </div>

        <div className="flex items-center gap-1 shrink-0 w-[40%]">
          <ReusableTableSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            options={SORT_OPTIONS}
            placeholder="Newest First"
            className="w-40"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
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
                  onClick={(e) => {
                    // Prevent navigation if a button or link was clicked
                    if (e.target.closest('button') || e.target.closest('a')) return;
                    navigate(`/superadmin/inventory/details/${row.original.id}`);
                  }}
                  className={`hover:bg-[#F8FAFC]/80 transition-colors group cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-[#BABABA]/20"}`}
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
                  No products found.
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

export default InventoryTable;
