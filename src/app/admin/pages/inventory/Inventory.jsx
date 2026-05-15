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
  RotateCcw,
  Pencil,
} from "lucide-react";
import { Icon } from "@iconify/react";
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

const getInventoryColumns = (onView, onDelete, onEdit) => [
  {
    accessorKey: "product",
    header: "Product",
    cell: (info) => (
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded border border-gray-100 overflow-hidden shrink-0 ${!info.row.original.image ? 'bg-gray-100' : ''}`}>
          {info.row.original.image ? (
            <img
              src={info.row.original.image}
              alt={info.getValue()}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <span className="text-[12px] font-bold text-[#3F4753] uppercase">{info.getValue()}</span>
      </div>
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
      <span className="text-[12px] text-[#3F4753]">{info.getValue() || "-"}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const styles = {
        "Active": "bg-[#D4FFDA] text-[#109F22]",
        "In Stock": "bg-[#D4FFDA] text-[#109F22]",
        "Low Stock": "bg-[#FFF5E5] text-[#FF9800]",
        "Out of Stock": "bg-[#FEECEB] text-[#F44336]",
      };
      return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${styles[status] || "bg-gray-100 text-gray-600"}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "cost",
    header: "Cost Price",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] font-medium">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "salePrice",
    header: "Sales Price",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] font-medium">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "profitDollar",
    header: "Profit $",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] font-medium">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "profitPercent",
    header: "Profit %",
    cell: (info) => (
      <span className="text-[12px] text-[#3F4753] font-medium">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "totalStock",
    header: "Stock",
    cell: (info) => {
      const row = info.row.original;
      const percentage = (row.currentStock / row.maxStock) * 100;
      const barColor = percentage > 50 ? "bg-[#109F22]" : percentage > 20 ? "bg-[#FF9800]" : "bg-[#F44336]";

      return (
        <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
              <div
                className={`h-full ${barColor} transition-all duration-500`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-bold text-gray-900">
                {row.currentStock} {row.unitType || "Item"}
              </span>
              <span className="text-[9px] text-red-500 font-medium">
                alert: {row.lowStockAlert} {row.unitType || "Item"}
              </span>
            </div>
          </div>
          <button className="w-fit px-3 py-0.5 border border-[#0061FF] text-[#0061FF] rounded-full text-[9px] font-bold hover:bg-blue-50 transition-colors">
            Item/PACK
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "updated",
    header: "Last Updated",
    cell: (info) => {
      const val = info.getValue();
      // Format to match screenshot: May 08, 2026 01:17 AM
      return (
        <span className="text-[11px] text-[#3F4753] leading-tight block max-w-[80px]">
          {val}
        </span>
      );
    },
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell: (info) => (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onView?.(info.row.original)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="View"
        >
          <Icon icon="lucide:eye" className="w-4 h-4 text-(--color-secondary)" />
        </button>
        <button
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Sync"
        >
          <Icon icon="lucide:refresh-cw" className="w-4 h-4 text-gray-900" />
        </button>
        <button
          onClick={() => onEdit?.(info.row.original)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Edit"
        >
          <Icon icon="lucide:pencil" className="w-4 h-4 text-gray-900" />
        </button>
        <button
          onClick={() => onDelete?.(info.row.original)}
          className="p-1 hover:bg-red-50 rounded transition-colors"
          title="Delete"
        >
          <Icon icon="lucide:trash-2" className="w-4 h-4 text-red-500" />
        </button>
      </div>
    ),
  },
];

const INVENTORY_DATA = [
  {
    id: "1",
    product: "Aztec God 7",
    category: "Mushrooms",
    subcategory: "",
    unit: "Item",
    status: "In Stock",
    cost: "$10.00",
    salePrice: "$10.00",
    profitDollar: "$0.00",
    profitPercent: "0.00%",
    updated: "May 08, 2026 01:17 AM",
    currentStock: 10,
    maxStock: 100,
    lowStockAlert: 10,
    unitType: "Item",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=1",
  },
  {
    id: "2",
    product: "Aztec God 6",
    category: "Mushrooms",
    subcategory: "",
    unit: "Item",
    status: "In Stock",
    cost: "$10.00",
    salePrice: "$10.00",
    profitDollar: "$0.00",
    profitPercent: "0.00%",
    updated: "May 08, 2026 12:47 AM",
    currentStock: 10,
    maxStock: 100,
    lowStockAlert: 10,
    unitType: "Item",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=2",
  },
  {
    id: "3",
    product: "Aztec God 5",
    category: "Mushrooms",
    subcategory: "",
    unit: "Item",
    status: "In Stock",
    cost: "$25.00",
    salePrice: "$25.00",
    profitDollar: "$0.00",
    profitPercent: "0.00%",
    updated: "May 07, 2026 07:06 AM",
    currentStock: 500,
    maxStock: 500,
    lowStockAlert: 10,
    unitType: "Item",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=3",
  },
  {
    id: "4",
    product: "Aztec God 5",
    category: "Mushrooms",
    subcategory: "",
    unit: "Item",
    status: "In Stock",
    cost: "$10.00",
    salePrice: "$12.00",
    profitDollar: "$2.00",
    profitPercent: "20.00%",
    updated: "May 05, 2026 07:08 AM",
    currentStock: 10,
    maxStock: 50,
    lowStockAlert: 10,
    unitType: "Item",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=4",
  },
  {
    id: "5",
    product: "Aztec God 4",
    category: "Mushrooms",
    subcategory: "",
    unit: "Item",
    status: "In Stock",
    cost: "$10.00",
    salePrice: "$12.00",
    profitDollar: "$2.00",
    profitPercent: "20.00%",
    updated: "May 05, 2026 07:06 AM",
    currentStock: 10,
    maxStock: 50,
    lowStockAlert: 10,
    unitType: "Item",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=5",
  },
  {
    id: "6",
    product: "Aztec God 3",
    category: "Mushrooms",
    subcategory: "Classic Strains",
    unit: "Item",
    status: "In Stock",
    cost: "$10.00",
    salePrice: "$12.00",
    profitDollar: "$2.00",
    profitPercent: "20.00%",
    updated: "May 05, 2026 06:58 AM",
    currentStock: 10,
    maxStock: 50,
    lowStockAlert: 10,
    unitType: "Item",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=6",
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
        (row) => navigate(`/inventory/edit/${row.id}`),
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
        <div className="flex items-center gap-2">
          <a
            href="/store/storeslists/1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-sm hover:bg-gray-50 font-semibold text-sm shadow-sm transition-all"
          >
            <Eye className="w-4 h-4" />
            View Store
          </a>
          <Link
            to="/inventory/add"
            className="inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-(--color-primary) text-white rounded-sm hover:opacity-90 font-semibold text-sm"
          >
            <span className="text-lg leading-none">+</span>
            Add Inventory
          </Link>
        </div>
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
                        colId === "profitDollar" ||
                        colId === "profitPercent";
                    return (
                      <th
                        key={header.id}
                        className={`px-3 py-2.5 text-[11px] font-semibold text-[#3F4753] whitespace-nowrap text-left`}
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
                        colId === "profitDollar" ||
                        colId === "profitPercent";
                      return (
                        <td
                          key={cell.id}
                          className={`px-3 py-2 text-[12px] text-[#3F4753] align-middle text-left`}
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
