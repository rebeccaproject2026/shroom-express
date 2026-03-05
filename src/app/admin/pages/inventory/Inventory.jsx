import { useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  Trash2,
  Filter,
  Download,
} from "lucide-react";
import DatePickerMap from "../../components/DatePickerMap";
import InventorySummaryCard from "../../components/inventory/InventorySummaryCard";
import inventoryImg1 from "../../assets/images/inventory-icon-1.webp";
import inventoryImg2 from "../../assets/images/inventory-icon-2.webp";
import inventoryImg3 from "../../assets/images/inventory-icon-3.webp";

const SUMMARY = [
  {
    label: "In Stock",
    count: 210,
    bgLight: "bg-[#D4FFDA]",
    textColor: "text-[#109F22]",
    image: inventoryImg1,
  },
  {
    label: "Low Stock",
    count: 10,
    bgLight: "bg-[#FFF5E5]",
    textColor: "text-[#FF9800]",
    image: inventoryImg2,
  },
  {
    label: "Out of Stock",
    count: 25,
    bgLight: "bg-[#FEECEB]",
    textColor: "text-[#F44336]",
    image: inventoryImg3,
  },
];

const STATUS_TABS = [
  { key: "all", label: "All", count: 245 },
  { key: "in_stock", label: "In Stock", count: 210 },
  { key: "low_stock", label: "Low Stock", count: 10 },
  { key: "out_of_stock", label: "Out of Stock", count: 25 },
];

const getInventoryColumns = (onView, onDelete) => [
  {
    accessorKey: "product",
    header: "Product",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "totalStock",
    header: "Total Stock",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753]">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="text-[12px] text-[#3F4753] text-right">
          <span className="block">{row.soldAmount}</span>
          <span className="block text-gray-500">{row.soldQty}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "reorder",
    header: "Reorder",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] text-right block">
        {info.getValue()}
      </span>
    ),
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell: (info) => (
      <div className="flex items-center gap-1 justify-end">
        <button
          type="button"
          onClick={() => onView?.(info.row.original)}
          className="p-1.5 text-(--color-secondary) hover:bg-blue-50 rounded"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(info.row.original)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const INVENTORY_DATA = [
  {
    id: "1",
    product: "Melmac (Dried)",
    category: "Accessory",
    subcategory: "Blunt Wrap",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "200 Grams In-Stock",
    soldAmount: "$1925.52",
    soldQty: "150 Grams",
    reorder: "2",
  },
  {
    id: "2",
    product: "Blue Pulaski (Dried)",
    category: "Accessory",
    subcategory: "Blunt Wrap",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "200 Grams In-Stock",
    soldAmount: "$1925.52",
    soldQty: "150 Grams",
    reorder: "2",
  },
  {
    id: "3",
    product: "Blue Meanies (Dried)",
    category: "Accessory",
    subcategory: "Rolling Paper",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "200 Grams In-Stock",
    soldAmount: "$1925.52",
    soldQty: "150 Grams",
    reorder: "2",
  },
  {
    id: "4",
    product: "Albino Penis Envy (Dried)",
    category: "Accessory",
    subcategory: "Blunt Wrap",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "50 Grams Low-Stock",
    soldAmount: "$850.00",
    soldQty: "50 Grams",
    reorder: "20",
  },
  {
    id: "5",
    product: "Mango Peach",
    category: "Accessory",
    subcategory: "Rolling Paper",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "0 Grams Out of Stock",
    soldAmount: "$0.00",
    soldQty: "0 Grams",
    reorder: "20",
  },
  {
    id: "6",
    product: "Aztec God",
    category: "Accessory",
    subcategory: "Blunt Wrap",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "0 Grams Out of Stock",
    soldAmount: "$0.00",
    soldQty: "0 Grams",
    reorder: "20",
  },
  {
    id: "7",
    product: "EBlue Meanies (Dried)",
    category: "Concentrate",
    subcategory: "Distillate",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "0 Grams Out of Stock",
    soldAmount: "$0.00",
    soldQty: "0 Grams",
    reorder: "20",
  },
  {
    id: "8",
    product: "Jesus Christ Super Strain (JCSS)",
    category: "Concentrate",
    subcategory: "Shatter",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "0 Grams Out of Stock",
    soldAmount: "$0.00",
    soldQty: "0 Grams",
    reorder: "2",
  },
  {
    id: "9",
    product: "Hillbilly",
    category: "Edible",
    subcategory: "Gummies",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "0 Grams Out of Stock",
    soldAmount: "$0.00",
    soldQty: "0 Grams",
    reorder: "2",
  },
  {
    id: "10",
    product: "Golden Teacher",
    category: "Edible",
    subcategory: "Gummies",
    status: "Active",
    cost: "$9.25",
    salePrice: "$16.99",
    updated: "2025-07-08 06:55:03",
    totalStock: "0 Grams Out of Stock",
    soldAmount: "$0.00",
    soldQty: "0 Grams",
    reorder: "2",
  },
];

const Inventory = () => {
  // eslint-disable-next-line no-unused-vars
  const [period, setPeriod] = useState({ start: null, end: null });
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const navigate = useNavigate();

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  const filteredData = useMemo(() => {
    let result = [...INVENTORY_DATA];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (row) =>
          row.product?.toLowerCase().includes(q) ||
          row.category?.toLowerCase().includes(q) ||
          row.subcategory?.toLowerCase().includes(q),
      );
    }
    if (statusTab === "in_stock")
      result = result.filter(
        (r) =>
          (r.totalStock || "").includes("In-Stock") &&
          !(r.totalStock || "").includes("Low"),
      );
    if (statusTab === "low_stock")
      result = result.filter((r) => (r.totalStock || "").includes("Low-Stock"));
    if (statusTab === "out_of_stock")
      result = result.filter((r) =>
        (r.totalStock || "").includes("Out of Stock"),
      );
    return result;
  }, [search, statusTab]);

  const columns = useMemo(
    () =>
      getInventoryColumns(
        (row) => navigate(`/inventories/view-inventory/${row.id}`),
        (row) => console.log("Delete", row),
      ),
    [navigate],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col gap-2 min-w-0 px-2.5 py-3">
      <div className="flex esm:flex-row flex-col esm:items-center justify-between gap-2">
        <DatePickerMap
          defaultItem={2}
          onUpdate={onDateUpdate}
          className="*:sm:min-w-60! *:esm:min-w-48! *:min-w-full! w-full esm:w-fit"
        />
        <Link
          to="/inventory/add"
          className="inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-(--color-primary) text-white rounded-sm hover:opacity-90 font-semibold text-sm"
        >
          <span className="text-lg leading-none">+</span>
          Add Inventory
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SUMMARY.map((item) => (
          <InventorySummaryCard
            key={item.label}
            label={item.label}
            count={item.count}
            textColor={item.textColor}
            bgLight={item.bgLight}
            image={item.image}
          />
        ))}
      </div>

      <div className="min-w-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <div className="flex lg:flex-row flex-col items-center gap-2">
            <div className="w-full flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-sm bg-white focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => setShowFilterModal(true)}
                  className="p-2.5 rounded-md bg-gray-700 text-white hover:bg-gray-800"
                  title="Filter"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-md bg-(--color-primary) text-white hover:opacity-90"
                  title="Export"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className=" w-full flex items-center gap-2">
              <div className="lg:flex hidden w-full rounded-sm overflow-hidden border border-gray-200 bg-white">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStatusTab(tab.key)}
                    className={`sm:px-2 px-1.5 py-1.5 w-full text-xs sm:text-sm m-1 rounded ronded-2xl font-medium whitespace-nowrap ${
                      statusTab === tab.key
                        ? "bg-(--color-secondary) text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowFilterModal(true)}
                className="p-2.5 rounded-md bg-gray-700 text-white hover:bg-gray-800 lg:block hidden"
                title="Filter"
              >
                <Filter className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-md bg-(--color-primary) text-white hover:opacity-90 lg:block hidden"
                title="Export"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-250 border-collapse">
            <thead className="bg-[#ffffff] border-b border-gray-200 sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => {
                    const colId = header.column.id ?? header.column.accessorKey;
                    const isRight =
                      colId === "action" ||
                      colId === "cost" ||
                      colId === "salePrice" ||
                      colId === "sold" ||
                      colId === "reorder";
                    return (
                      <th
                        key={header.id}
                        className={`px-3 py-2.5 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap ${
                          isRight ? "text-right" : "text-left"
                        }`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => {
                      const colId = cell.column.id ?? cell.column.accessorKey;
                      const isRight =
                        colId === "action" ||
                        colId === "cost" ||
                        colId === "salePrice" ||
                        colId === "sold" ||
                        colId === "reorder";
                      return (
                        <td
                          key={cell.id}
                          className={`px-3 py-2 text-[12px] text-[#3F4753] align-middle ${
                            isRight ? "text-right" : "text-left"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-gray-500 text-sm"
                  >
                    No inventory found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          id="pagination"
          className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50"
          style={{ margin: "0 auto" }}
        >
          <div className="text-[12px] text-gray-600 order-2 sm:order-1">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              filteredData.length,
            )}{" "}
            of {filteredData.length} results
          </div>
          <div className="flex items-center gap-1 order-1 sm:order-2">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 text-[12px] border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
              .filter((p) => {
                const current = table.getState().pagination.pageIndex + 1;
                return (
                  p === 1 ||
                  p === table.getPageCount() ||
                  (p >= current - 2 && p <= current + 2)
                );
              })
              .map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => table.setPageIndex(pageNum - 1)}
                  className={`min-w-[28px] px-1.5 py-1 text-[12px] rounded ${
                    table.getState().pagination.pageIndex + 1 === pageNum
                      ? "bg-blue-600 text-white border border-blue-600"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 text-[12px] border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal for Mobile */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 lg:hidden">
          <div className="w-full bg-white rounded-t-2xl shadow-xl animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Filter Options</h3>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Content */}
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-gray-700 mb-3">Status</p>
              <div className="space-y-2">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setStatusTab(tab.key);
                      setShowFilterModal(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left rounded-lg border transition-all ${
                      statusTab === tab.key
                        ? "bg-(--color-secondary) text-white border-(--color-secondary)"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{tab.label}</span>
                      <span className={`text-sm font-semibold ${statusTab === tab.key ? 'text-white' : 'text-gray-500'}`}>
                        ({tab.count})
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setStatusTab("all");
                  setShowFilterModal(false);
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-(--color-secondary) rounded-lg hover:opacity-90"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
