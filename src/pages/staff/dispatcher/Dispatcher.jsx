import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePickerMap from "../../../components/DatePickerMap";
import FinanceSummaryCard from "../../../components/finances/FinanceSummaryCard";
import { Search, Eye, Download, Trash2 } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddDispatcher from "./AddDispatcher";
import DriversDrawer from "../../../components/dispatcher/DriversDrawer";

// Import avatar images
import avatar1 from "../../../assets/images/self-portrait-beautiful-chinese-girl 1.png";
import avatar2 from "../../../assets/images/self-portrait-beautiful-chinese-girl2.png";
import avatar3 from "../../../assets/images/self-portrait-beautiful-chinese-girl3.png";
import avatar4 from "../../../assets/images/self-portrait-beautiful-chinese-girl4.png";
import DispatcherAreaCodesDrawer from "../../../components/dispatcher/DispatcherAreaCodesDrawer";

const CARD_DATA = [
  { title: "Total Salary", value: "$10,650", change: "+ 22%", isPositive: true },
  { title: "Total Orders", value: "9825", change: "- 12%", isPositive: false },
  { title: "Received Amount", value: "102", change: "+ 22%", isPositive: true },
  { title: "Product Sold Qty", value: "135", change: "+ 22%", isPositive: true },
  { title: "Added Product", value: "135", change: "+ 22%", isPositive: true },
];

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "unavailable", label: "Unavailable" },
  { key: "suspended", label: "Suspended" },
];


const DISPATCHER_DATA = [
  {
    id: 1,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "5+",
    areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5", "N3O 4Y2", "O4P 5Z3"],
    drivers: "10+",
    driversList: [
      { id: 1, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5"], avatar: avatar1 },
      { id: 2, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar2 },
      { id: 3, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5"], avatar: avatar3 },
      { id: 4, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar4 },
      { id: 5, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5"], avatar: avatar1 },
      { id: 6, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar2 },
      { id: 7, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5"], avatar: avatar3 },
      { id: 8, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar4 },
      { id: 9, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar1 },
      { id: 10, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar2 },
    ],
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$2,000",
    paidSalary: "$1,720",
    paidDate: "12 Dec 2024",
    orders: 302,
    status: "Available",
  },
  {
    id: 2,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "2+",
    areaCodes: ["P5Q 6A4", "Q6R 7B5"],
    drivers: "7+",
    driversList: [
      { id: 1, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar3 },
      { id: 2, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar4 },
      { id: 3, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar1 },
      { id: 4, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar2 },
      { id: 5, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar3 },
      { id: 6, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar4 },
      { id: 7, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar1 },
    ],
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$1,920",
    paidSalary: "$1,920",
    paidDate: "12 Dec 2024",
    orders: 240,
    status: "Suspended",
  },
  {
    id: 3,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "4+",
    areaCodes: ["R7S 8C6", "M2N 3X1", "M2N 3X3", "N3O 4Y2"],
    drivers: "8+",
    driversList: [
      { id: 1, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5"], avatar: avatar2 },
      { id: 2, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar3 },
      { id: 3, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar4 },
      { id: 4, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar1 },
      { id: 5, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar2 },
      { id: 6, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar3 },
      { id: 7, name: "Driver Name", isOnline: true, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar4 },
      { id: 8, name: "Driver Name", isOnline: false, areaCodes: ["M2N 3X1", "M2N 3X3"], avatar: avatar1 },
    ],
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$1,820",
    paidSalary: "$1,820",
    paidDate: "12 Dec 2024",
    orders: 250,
    status: "Unavailable",
  },
  {
    id: 4,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "5+",
    areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5", "N3O 4Y2", "O4P 5Z3"],
    drivers: "10+",
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$2,000",
    paidSalary: "$1,720",
    paidDate: "12 Dec 2024",
    orders: 302,
    status: "Available",
  },
  {
    id: 5,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "2+",
    areaCodes: ["P5Q 6A4", "Q6R 7B5"],
    drivers: "7+",
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$1,920",
    paidSalary: "$1,920",
    paidDate: "12 Dec 2024",
    orders: 240,
    status: "Suspended",
  },
  {
    id: 6,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "4+",
    areaCodes: ["R7S 8C6", "M2N 3X1", "M2N 3X3", "N3O 4Y2"],
    drivers: "8+",
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$1,820",
    paidSalary: "$1,820",
    paidDate: "12 Dec 2024",
    orders: 250,
    status: "Unavailable",
  },
  {
    id: 7,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "5+",
    areaCodes: ["M2N 3X1", "M2N 3X3", "M2N 3X5", "N3O 4Y2", "O4P 5Z3"],
    drivers: "10+",
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$2,000",
    paidSalary: "$1,720",
    paidDate: "12 Dec 2024",
    orders: 302,
    status: "Available",
  },
  {
    id: 8,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "2+",
    areaCodes: ["P5Q 6A4", "Q6R 7B5"],
    drivers: "7+",
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$1,920",
    paidSalary: "$1,920",
    paidDate: "12 Dec 2024",
    orders: 240,
    status: "Suspended",
  },
  {
    id: 9,
    name: "John Henry",
    phone: "+1 8796574653",
    areaCode: "4+",
    areaCodes: ["R7S 8C6", "M2N 3X1", "M2N 3X3", "N3O 4Y2"],
    drivers: "8+",
    lastActivityDate: "15 Jan 2025",
    lastActivityTime: "Today at 11:30 am",
    startingDate: "12 Dec 2023",
    totalHours: "302 Hrs",
    salary: "$1,820",
    paidSalary: "$1,820",
    paidDate: "12 Dec 2024",
    orders: 250,
    status: "Unavailable",
  },
];


const Dispatcher = () => {
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [isAddDispatcherOpen, setIsAddDispatcherOpen] = useState(false);
  const [isAreaCodesOpen, setIsAreaCodesOpen] = useState(false);
  const [isDriversOpen, setIsDriversOpen] = useState(false);
  const [selectedDispatcher, setSelectedDispatcher] = useState(null);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });


  const filteredData = useMemo(() => {
    let result = [...DISPATCHER_DATA];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(q) ||
          row.phone.toLowerCase().includes(q)
      );
    }

    if (statusTab !== "all") {
      result = result.filter(
        (r) => r.status.toLowerCase() === statusTab
      );
    }

    return result;
  }, [search, statusTab]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[13px] text-[#3F4753]">
              {row.original.name}
            </span>
            <span className="text-[11px] text-[#8B8B8B] font-normal">
              {row.original.phone}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "areaCode",
        header: "Area",
        cell: ({ getValue, row }) => (
          <div className="flex items-center gap-2">
            <span className="text-[#3F4753] text-[12px]">{getValue()}</span>
            <Eye
              className="w-3.5 h-3.5 text-[#0066FF] cursor-pointer hover:text-blue-700"
              onClick={() => {
                setSelectedDispatcher(row.original);
                setIsAreaCodesOpen(true);
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "drivers",
        header: "Drivers",
        cell: ({ getValue, row }) => (
          <div className="flex items-center gap-2">
            <span className="text-[#3F4753] text-[12px]">{getValue()}</span>
            <Eye
              className="w-3.5 h-3.5 text-[#0066FF] cursor-pointer hover:text-blue-700"
              onClick={() => {
                setSelectedDispatcher(row.original);
                setIsDriversOpen(true);
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "lastActivityDate",
        header: "Log in Activity",
        cell: ({ row }) => (
          <div className="flex flex-col text-[12px]">
            <span className="text-[#3F4753]">
              {row.original.lastActivityDate}
            </span>
            <span className="text-[#8B8B8B] text-[11px]">
              {row.original.lastActivityTime}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "startingDate",
        header: "Logout Activity",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] text-[12px]">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "totalHours",
        header: "Total Hours",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] text-[12px]">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] text-[12px]">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "paidSalary",
        header: "Paid Salary",
        cell: ({ row }) => (
          <div className="flex flex-col text-[12px]">
            <span className="text-[#3F4753]">
              {row.original.paidSalary}
            </span>
            <span className="text-[#8B8B8B] text-[11px]">
              {row.original.paidDate}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "orders",
        header: "Orders",
        cell: ({ getValue }) => (
          <span className="text-[#3F4753] text-[12px]">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue();
          const statusColors = {
            Available: "bg-[#D4FFDA] text-[#109F22]",
            Unavailable: "bg-[#FEECEB] text-[#F44336]",
            Suspended: "bg-[#FFF5E5] text-[#FF9800]",
          };
          return (
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold ${statusColors[status]
                }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center gap-3 justify-center">
            <Eye
              className="w-4 h-4 text-[#0066FF] cursor-pointer"
              onClick={() =>
                navigate(`/staff/dispatcher/${row.original.id}`)
              }
            />
            <button
              type="button"
              // onClick={() => onDelete?.(info.row.original)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      }
    ],
    []
  );


  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex flex-col gap-2 min-w-0 px-2.5 py-3">

        {/* Top Section */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DatePickerMap defaultItem={2} />
          <button
            onClick={() => setIsAddDispatcherOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2.5 bg-(--color-primary) text-white rounded-sm hover:opacity-90 font-semibold text-sm cursor-pointer"
          >
            <span className="text-lg leading-none">+</span>
            Add Dispatcher
          </button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {CARD_DATA.map((card) => (
            <FinanceSummaryCard key={card.title} {...card} />
          ))}
        </div>

        {/* Table Section */}
        <div className="min-w-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden p-4">

          {/* Search + Tabs + Export */}
          <div className="flex items-center gap-2">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#DDDDDD] rounded-sm bg-white focus:outline-none"
              />
            </div>

            <div className="flex w-full rounded-sm overflow-hidden border border-[#969696] bg-white">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusTab(tab.key)}
                  className={`px-2 py-1.5 w-full text-sm m-1 rounded font-medium whitespace-nowrap ${statusTab === tab.key
                    ? "bg-(--color-secondary) text-white"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="p-2.5 rounded-[5px] bg-(--color-primary) text-white hover:opacity-90"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white border-b border-[#CDCDCD]">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => {
                      const colId = header.column.id ?? header.column.accessorKey;
                      const isRight =
                        colId === "action"
                      return (
                        < th
                          key={header.id}
                          className={`py-2.5 text-[11px] font-semibold text-[#3F4753] tracking-wider whitespace-nowrap ${isRight ? "text-center" : "text-left"
                            }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-1.5 py-2 text-[12px] text-[#3F4753] align-middle"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination same as Drivers */}
          <div id="pagination" className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50" style={{ margin: "0 auto" }}>
            <div className="text-[12px] text-gray-600 order-2 sm:order-1">
              Showing{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
                filteredData.length
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
                    className={`min-w-[28px] px-1.5 py-1 text-[12px] rounded ${table.getState().pagination.pageIndex + 1 === pageNum
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

      </div >

      <AddDispatcher
        isOpen={isAddDispatcherOpen}
        onClose={() => setIsAddDispatcherOpen(false)}
      />

      {/* Area Codes Drawer */}
      <DispatcherAreaCodesDrawer
        isOpen={isAreaCodesOpen}
        onClose={() => {
          setIsAreaCodesOpen(false);
          setSelectedDispatcher(null);
        }}
        areaCodes={selectedDispatcher?.areaCodes || []}
        title={`Area Codes - ${selectedDispatcher?.name || 'Dispatcher'}`}
      />

      {/* Drivers Drawer */}
      <DriversDrawer
        isOpen={isDriversOpen}
        onClose={() => {
          setIsDriversOpen(false);
          setSelectedDispatcher(null);
        }}
        drivers={selectedDispatcher?.driversList || []}
        dispatcherName={selectedDispatcher?.name || 'Dispatcher'}
      />
    </>
  );
};

export default Dispatcher;
