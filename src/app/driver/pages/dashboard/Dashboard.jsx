import React, { useState } from "react";
import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
import Select from "../../components/Select";
import OrderMapSection from "../../../admin/components/order/OrderMapSection";
import PageHeader from "../../components/PageHeader";
import CancelDeliveryModal from "../../components/common/CancelDeliveryModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const topStats = [
  {
    title: "Today Earning",
    value: "$15.25",
    iconBg: "bg-[#E6F8F0]",
    iconColor: "text-[#10B981]",
    icon: "fluent:wallet-credit-card-24-regular"
  },
  {
    title: "Deliveries Assigned Today",
    value: "5",
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#3B82F6]",
    icon: "solar:documents-linear"
  },
  {
    title: "Pending Deliveries",
    value: "1",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#F59E0B]",
    icon: "tabler:progress"
  },
  {
    title: "Deliveries Completed",
    value: "4",
    iconBg: "bg-[#E6F8F0]",
    iconColor: "text-[#10B981]",
    icon: "hugeicons:package-delivered"
  }
];

const initialAssignedDeliveries = [
  {
    id: "#302011",
    priority: "HIGH PRIORITY",
    priorityColor: "text-[#E93E2A]",
    priorityBg: "bg-[#FEE2E2]",
    priorityBorder: "border-[#DC2626]", // Red
    status: "ASSIGNED",
    statusBg: "bg-[#DBEAFE]",
    statusColor: "text-[#1142D4]",
    pickup: "Central Warehouse, Dock 4",
    drop: "42 Silicon Valley Ave, CA",
    window: "2 PM - 4 PM (Today)",
    packageDetails: "3 Items | COD: $45.00",
  },
  {
    id: "#302012",
    priority: "MEDIUM PRIORITY",
    priorityColor: "text-[#D97706]",
    priorityBg: "bg-[#FEF3C7]",
    priorityBorder: "border-[#F59E0B]", // Yellow
    status: "PICKED UP",
    statusBg: "bg-[#E0E7FF]",
    statusColor: "text-[#4F46E5]",
    pickup: "Central Warehouse, Dock 4",
    drop: "42 Silicon Valley Ave, CA",
    window: "2 PM - 4 PM (Today)",
    packageDetails: "3 Items | COD: $45.00",
  },
  {
    id: "#302013",
    priority: "MEDIUM PRIORITY",
    priorityColor: "text-[#D97706]",
    priorityBg: "bg-[#FEF3C7]",
    priorityBorder: "border-[#F59E0B]", // Yellow
    status: "OUT FOR DELIVERY",
    statusBg: "bg-[#FFEDD5]",
    statusColor: "text-[#EA580C]",
    pickup: "Central Warehouse, Dock 4",
    drop: "42 Silicon Valley Ave, CA",
    window: "2 PM - 4 PM (Today)",
    packageDetails: "3 Items | COD: $45.00",
  },
  {
    id: "#302014",
    priority: "LOW PRIORITY",
    priorityColor: "text-[#475569]",
    priorityBg: "bg-[#F1F5F9]",
    priorityBorder: "border-[#4B5563]", // Dark gray
    status: "DELIVERD",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#059669]",
    pickup: "Central Warehouse, Dock 4",
    drop: "42 Silicon Valley Ave, CA",
    window: "2 PM - 4 PM (Today)",
    packageDetails: "3 Items | COD: $45.00",
  }
];

const priorityOptions = [
  { value: "all", label: "Priority: All priority" },
  { value: "high", label: "Priority: High" },
  { value: "medium", label: "Priority: Medium" },
  { value: "low", label: "Priority: Low" }
];

const statusOptions = [
  { value: "assigned", label: "Status: Assigned" },
  { value: "picked", label: "Status: Picked Up" },
  { value: "out", label: "Status: Out for Delivery" },
  { value: "delivered", label: "Status: Delivered" }
];

const Dashboard = () => {
  // const navigate = useNavigate();
  const [priority, setPriority] = useState("all");
  const [status, setStatus] = useState("assigned");
  const [deliveries, setDeliveries] = useState(initialAssignedDeliveries);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedDeliveryToCancel, setSelectedDeliveryToCancel] = useState(null);

  const [startModalOpen, setStartModalOpen] = useState(false);
  const [selectedDeliveryToStart, setSelectedDeliveryToStart] = useState(null);

  const [markDeliveredModalOpen, setMarkDeliveredModalOpen] = useState(false);
  const [selectedDeliveryToMarkDelivered, setSelectedDeliveryToMarkDelivered] = useState(null);

  const handleCancelClick = (deliveryId) => {
    setSelectedDeliveryToCancel(deliveryId);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = (payload) => {
    // Make API call here -> Filter out or change status
    setDeliveries(prev => prev.map(d =>
      d.id === payload.deliveryId ? { ...d, status: "CANCELLED", statusBg: "bg-gray-200", statusColor: "text-gray-600" } : d
    ));
    setCancelModalOpen(false);
    setSelectedDeliveryToCancel(null);
  };

  const handleStartClick = (deliveryId) => {
    setSelectedDeliveryToStart(deliveryId);
    setStartModalOpen(true);
  };

  const handleConfirmStart = () => {
    setDeliveries(prev => prev.map(d =>
      d.id === selectedDeliveryToStart ? { ...d, status: "OUT FOR DELIVERY", statusBg: "bg-[#FFEDD5]", statusColor: "text-[#EA580C]" } : d
    ));
    setStartModalOpen(false);
    setSelectedDeliveryToStart(null);
  };

  const handleMarkDeliveredClick = (deliveryId) => {
    setSelectedDeliveryToMarkDelivered(deliveryId);
    setMarkDeliveredModalOpen(true);
  };

  const handleConfirmMarkDelivered = () => {
    setDeliveries(prev => prev.map(d =>
      d.id === selectedDeliveryToMarkDelivered ? { ...d, status: "DELIVERED", statusBg: "bg-[#D1FAE5]", statusColor: "text-[#059669]", priorityBg: "bg-[#F1F5F9]", priorityColor: "text-[#475569]", priorityBorder: "border-[#4B5563]" } : d
    ));
    setMarkDeliveredModalOpen(false);
    setSelectedDeliveryToMarkDelivered(null);
  };

  // const handleViewDetails = () => {
  //   navigate("/orders");
  // };

  return (
    <div className="p-4 sm:p-4 bg-[#F5F5F5]">
      {/* Welcome & Stats Row Container */}
      <div className="flex flex-col gap-3 mb-6">
        <PageHeader className="!mb-0" />

        <div className="bg-white px-6 py-4 rounded-md border border-[#E5E7EB] w-full  md:items-center  gap-6">

          <div className="shrink flex items-center mb-2.5">
            <p className="text-base font-semibold text-[#222222]">
              Today , Feb 25 2026 Wednesday
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between lg:justify-end xl:gap-24 gap-y-5 gap-x-3 sm:gap-8 mt-4 sm:mt-0">
            {topStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 min-w-fit">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                  <Icon icon={stat.icon} className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#777777]">{stat.title}</span>
                  <span className="text-[16px] font-bold text-[#222222] mt-0.5">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Deliveries List */}
      <div className="bg-[#F5F5F5]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-4">
          <h2 className="text-base font-semibold text-[#222222]  ml-4">Assigned Deliveries</h2>
          <div className="flex items-center gap-2">
            <Select
              options={priorityOptions}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              minWidth="180px"
              compact
            />
            <Select
              options={statusOptions}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              minWidth="180px"
              compact
            />
          </div>
        </div>

        <div className="flex flex-col gap-3.5">  {/* ← reduced gap between cards */}
          {deliveries.map((delivery, index) => (
            <div
              key={index}
              className={`
        bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)]
        border-l-4 ${delivery.priorityBorder}
        pl-5 pr-5 pt-3 pb-3 min-h-25     
        lg:min-h-25
        flex flex-col lg:flex-row lg:items-stretch gap-5 lg:gap-6
      `}
            >

              {/* Left - main content */}
              <div className="flex-1 flex flex-col gap-8">

                {/* Top row - ID + badges */}
                <div className="flex items-center gap-2.5 flex-wrap mt-2 ml-2.5">
                  <span className="font-semibold text-base text-[#222222] tracking-tight">
                    {delivery.id}
                  </span>
                  <span
                    className={`
              px-2 py-1 text-[10px] font-semibold uppercase tracking-wide rounded
              ${delivery.priorityBg} ${delivery.priorityColor}
            `}
                  >
                    {delivery.priority}
                  </span>
                  <span
                    className={`
              px-2 py-1 text-[10px] font-semibold uppercase tracking-wide rounded
              ${delivery.statusBg} ${delivery.statusColor}
            `}
                  >
                    {delivery.status}
                  </span>
                </div>

                {/* Details - tighter grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
                  {[
                    {
                      icon: "iconamoon:store-light",
                      label: "PICKUP LOCATION",
                      value: delivery.pickup,
                    },
                    {
                      icon: "hugeicons:location-05",
                      label: "DROP LOCATION",
                      value: delivery.drop,
                    },
                    {
                      icon: "mynaui:clock-5",
                      label: "DELIVERY WINDOW",
                      value: delivery.window,
                    },
                    {
                      icon: "hugeicons:package-open",
                      label: "PACKAGE DETAILS",
                      value: delivery.packageDetails,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Icon
                        icon={item.icon}
                        className="w-5 h-5 text-[#636363] shrink-0 mt-0.5"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium uppercase text-[#777777] tracking-wide leading-none">
                          {item.label}
                        </span>
                        <span className="text-[13px] mt-0.5 font-semibold text-[#3F4753] leading-snug">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - buttons column */}
              <div className="flex flex-row lg:flex-col gap-1.5 lg:w-36 lg:min-w-36 lg:justify-center mt-2 lg:mt-0">
                {delivery.status === "ASSIGNED" && (
                  <>
                    <button
                      onClick={() => handleCancelClick(delivery.id)}
                      className="
                px-4 py-1.5 text-[13px] font-semibold rounded-md
                bg-[#E93E2A] text-white
                transition-colors border border-transparent
              "
                    >
                      Cancel Delivery
                    </button>
                    <button
                      onClick={() => handleStartClick(delivery.id)}
                      className="
                px-4 py-1.5 text-[13px] font-semibold rounded-md
                bg-[#1142D4] text-white
                transition-colors border border-transparent
              "
                    >
                      Start Delivery
                    </button>
                  </>
                )}

                {(delivery.status === "PICKED UP" || delivery.status === "OUT FOR DELIVERY") && (
                  <button
                    onClick={() => handleMarkDeliveredClick(delivery.id)}
                    className="
              px-4 py-1.5 text-[13px] font-semibold rounded-md
              bg-blue-600 hover:bg-blue-700 text-white
              transition-colors border border-transparent
            "
                  >
                    Mark Delivered
                  </button>
                )}

                <button
                  className="
            px-4 py-1.5 text-[13px] font-semibold rounded-md
            bg-[#F1F5F9] text-[#222222]
            transition-colors border border-gray-300
          "
                >
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Map Overview Section */}
      <div className="mt-6">
        <h2 className="text-base font-semibold text-[#222222] mb-2.5 ml-4">Map Overview</h2>
        <OrderMapSection isDashboard={true} />
      </div>

      <CancelDeliveryModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onSubmit={handleConfirmCancel}
        deliveryId={selectedDeliveryToCancel}
      />

      <ConfirmationModal
        isOpen={startModalOpen}
        onClose={() => setStartModalOpen(false)}
        onConfirm={handleConfirmStart}
        title="Start Delivery"
        message={`Are you sure you want to start delivery ${selectedDeliveryToStart || ''}?`}
        confirmText="Start Delivery"
        cancelText="Cancel"
        confirmVariant="primary"
      />

      <ConfirmationModal
        isOpen={markDeliveredModalOpen}
        onClose={() => setMarkDeliveredModalOpen(false)}
        onConfirm={handleConfirmMarkDelivered}
        title="Mark as Delivered"
        message={`Confirm successful delivery for ${selectedDeliveryToMarkDelivered || ''}?`}
        confirmText="Mark Delivered"
        cancelText="Cancel"
        confirmVariant="primary"
      />
    </div>
  );
};

export default Dashboard;
