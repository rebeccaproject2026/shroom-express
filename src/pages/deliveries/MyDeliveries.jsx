import { Icon } from "@iconify/react";
import { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';

const MyDeliveries = () => {
  const [globalFilter, setGlobalFilter] = useState('');

  // Completed deliveries data
  const completedData = useMemo(() => [
      {
          id: '#DEL-9021',
          deliveredTime: '10:45 AM',
          paymentType: 'Prepaid',
          amount: '$45.00',
      },
      {
          id: '#DEL-9021',
          deliveredTime: '09:15 AM',
          paymentType: 'COD',
          amount: '$122.50',
      },
      {
          id: '#DEL-9021',
          deliveredTime: '08:50 AM',
          paymentType: 'Prepaid',
          amount: '$12.00',
      },
      {
          id: '#DEL-9021',
          deliveredTime: '08:30 AM',
          paymentType: 'COD',
          amount: '$89.00',
      },
      {
          id: '#DEL-9021',
          deliveredTime: '10:00 AM',
          paymentType: 'Prepaid',
          amount: '$122.50',
      },
  ], []);

  // Table columns
  const columns = useMemo(() => [
      {
          accessorKey: 'id',
          header: 'Delivery ID',
          cell: (info) => (
              <span className="text-[#1142D4] font-medium ">{info.getValue()}</span>
          ),
      },
      {
          accessorKey: 'deliveredTime',
          header: 'Delivered Time',
          cell: (info) => (
              <span className="text-[#222222] font-medium ">{info.getValue()}</span>
          ),
      },
      {
          accessorKey: 'paymentType',
          header: 'Payment Type (Prepaid / COD)',
          cell: (info) => {
              const value = info.getValue();
              const isPrepaid = value === 'Prepaid';
              return (
                  <span className={`inline-block px-3 py-1 rounded-full font-semibold ${
                      isPrepaid 
                          ? 'bg-[#D1FAE5] text-[#059669]' 
                          : 'bg-[#FEE2E2] text-[#DC2626]'
                  }`}>
                      {value}
                  </span>
              );
          },
      },
      {
          accessorKey: 'amount',
          header: 'Amount',
          cell: (info) => (
              <span className="text-[#222222] font-semibold">{info.getValue()}</span>
          ),
      },
  ], []);

  const table = useReactTable({
      data: completedData,
      columns,
      state: {
          globalFilter,
      },
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-4 min-h-screen bg-[#F5F5F5]">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#222222]">
          👋 Welcome, David Doe
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Active Deliveries Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-[#222222] ">
            Active Deliveries
          </h2>

          <div className="">
            {/* Delivery Card */}
            <div className="flex flex-col gap-12">
              {/* Header with Order ID and Status */}
              <div className="flex items-start justify-between ">
                <div className="flex flex-col items-start  gap-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-[#1142D4] py-1 rounded">
                      #DEL-10293
                    </span>
                    <span className="text-sm font-semibold text-[#EA580C] bg-[#FFEDD5] px-3 py-1 rounded">
                      OUT FOR DELIVERY
                    </span>
                  </div>
                  {/* Customer Info */}
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-[#222222]">
                      John Smith
                    </h3>
                    <p className="text-xs text-[#777777] font-semibold">
                      +1 234-567-890
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#222222]">
                    Collect COD
                  </p>
                  <p className="text-lg font-bold text-[#1142D4]">$150.00</p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-1 sm:grid-cols-[36%_28%_40%] gap-1 ">
                <div className="flex items-start gap-2">
                  <Icon icon="hugeicons:location-05" width="22" height="22" className="text-[#636363]" />
                  <div>
                    <p className="text-xs text-[#777777] font-medium uppercase">
                      Drop Location
                    </p>
                    <p className="text-[13px] font-semibold text-[#3F4753]">
                      42 Silicon Valley Ave, CA
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon icon="hugeicons:package-open" width="22" height="22" className="text-[#636363]" />
                  <div>
                    <p className="text-xs text-[#777777] font-medium uppercase">
                      Package Details
                    </p>
                    <p className="text-[13px] font-semibold text-[#3F4753]">
                      3 Items
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                   <Icon icon="si:info-line" width="20" height="20" className="text-[#636363]" />
                  <div>
                    <p className="text-xs text-[#777777] font-medium uppercase">
                      Instructions
                    </p>
                    <p className="text-[13px] font-semibold text-[#3F4753]">
                      "Leave at the front gate"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className=" flex flex-col gap-5">
                <div className="w-full bg-[#E8E8E8] h-0.5"></div>
              <div className="flex gap-4 mb-4">
                <button className="flex-1 bg-[#1142D4] text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Icon icon="material-symbols:check-circle-outline-rounded" width="24" height="24" />
                  Mark as Delivered
                </button>
                <button className="px-6 bg-[#1E293B] text-white py-3 rounded-md font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                 <Icon icon="tabler:upload" width="24" height="24" />
                  Upload Proof
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Deliveries Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-[#222222]">
            Upcoming Deliveries
          </h2>

          <div className="flex flex-col gap-2.5">
            {/* Upcoming Delivery Card 1 */}
            <div className="border border-[#E8E8E8] rounded-md flex flex-col gap-7 p-4 bg-[#F8FBFF] hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1142D4] bg-[#DBEAFE] px-3 py-1.5 rounded">
                  02:00 PM
                </span>
                <span className="text-sm font-semibold text-[#059669] bg-[#D1FAE5] px-3 py-1.5 rounded">
                  4.2 miles • 15 Mins
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="flex items-start gap-2">
                  <Icon icon="iconamoon:store-light" width="22" height="22" className="text-[#636363]" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Pickup Location
                    </p>
                    <p className="text-sm font-medium text-[#212121]">
                      Central Warehouse, Dock 4
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                   <Icon icon="hugeicons:location-05" width="22" height="22" className="text-[#636363]" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Drop Location
                    </p>
                    <p className="text-sm font-medium text-[#212121]">
                      42 Silicon Valley Ave, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Delivery Card 2 */}
            <div className="border border-[#E8E8E8] rounded-md flex flex-col gap-7 p-4 bg-[#F8FBFF] hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1142D4] bg-[#DBEAFE] px-3 py-1.5 rounded">
                  02:00 PM
                </span>
                <span className="text-sm font-semibold text-[#059669] bg-[#D1FAE5] px-3 py-1.5 rounded">
                  4.2 miles • 15 Mins
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="flex items-start gap-2">
                   <Icon icon="iconamoon:store-light" width="22" height="22" className="text-[#636363]" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Pickup Location
                    </p>
                    <p className="text-sm font-medium text-[#212121]">
                      Central Warehouse, Dock 4
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                   <Icon icon="hugeicons:location-05" width="22" height="22" className="text-[#636363]" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Drop Location
                    </p>
                    <p className="text-sm font-medium text-[#212121]">
                      42 Silicon Valley Ave, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Today Section */}
       <h2 className="text-lg font-semibold text-[#222222] mb-4 ml-4">Completed Today</h2>
      <div className="bg-white rounded-sm shadow-sm p-2.5">
        
        {/* Search Input */}
        <div className="mb-4 w-">
          <div className="relative w-full">
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2.5 pl-10 border border-[#E8E8E8] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Icon icon="iconamoon:search-light" width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
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
                  className="border-b border-[#E5E7EB] hover:bg-[#F8FBFF] transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-4 text-xs">
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
    </div>
  );
};

export default MyDeliveries;
