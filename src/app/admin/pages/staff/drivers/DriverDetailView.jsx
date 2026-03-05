/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  User,
  Eye,
  KeyRound,
  MessageCircleMore,
  CircleQuestionMark,
  Handshake,
  Coins,
  MapPin,
  History,
  ReceiptText,
  BanknoteArrowDown,
  ChartNoAxesColumnIncreasing,
  ChevronDown,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Chart from "react-apexcharts";
import DatePickerMap from "../../../components/DatePickerMap";
import FinanceSummaryCard from "../../../components/finances/FinanceSummaryCard";
import DriverDetailsDrawer from "../../staff/addDriver/DriverDetailsDrawer";
import OrderPage from "../../../components/order/OrderPage";
import OrderStatusCard from "../../../components/order/OrderStatusCard";
import LogActivityTimeline from "../../../components/dispatcher/LogActivityTimeline";

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined") {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const STATS_DATA = [
  {
    label: "Total Deliveries",
    value: "245",
    change: "+ 22%",
    isPositive: true,
  },
  { label: "Delivered", value: "200", change: "+ 22%", isPositive: true },
  { label: "Cancelled", value: "10", change: "+ 22%", isPositive: false },
  { label: "Rescheduled", value: "30", change: "+ 22%", isPositive: true },
  { label: "In progress", value: "5", change: "+ 22%", isPositive: true },
  {
    label: "Average Deliveries/Day",
    value: "8",
    change: "+ 22%",
    isPositive: true,
  },
];

const DETAIL_STATS = [
  { label: "Complaints", value: "53" },
  { label: "Salary Paid", value: "$5205.23" },
  { label: "Salary Overdue", value: "$1500.25" },
  { label: "Rate Per Delivery", value: "$15.25" },
  { label: "Rating", value: "4.8" },
];

const PAYROLL_HISTORY = [
  {
    id: 1,
    description: "50 hrs Payment - Paid by Master - 12 Dec 2024 at 9:30 pm",
    amount: "$340",
  },
  {
    id: 2,
    description: "55 hrs Payment - Paid by Master - 12 Dec 2024 at 9:30 pm",
    amount: "$440",
  },
  {
    id: 3,
    description: "45 hrs Payment - Paid by Master - 01 Jan 2025 at 9:30 pm",
    amount: "$240",
  },
  {
    id: 4,
    description: "52 hrs Payment - Paid by Master - 15 Feb 2025 at 9:30 pm",
    amount: "$360",
  },
  {
    id: 5,
    description: "65 hrs Payment - Paid by Master - 11 Mar 2025 at 9:30 pm",
    amount: "$440",
  },
  {
    id: 6,
    description: "23 hrs Payment - Paid by Master - 12 Mar 2025 at 9:30 pm",
    amount: "$140",
  },
  {
    id: 7,
    description: "47 hrs Payment - Paid by Master - 12 Apr 2025 at 9:30 pm",
    amount: "$320",
  },
];

const SAMPLE_ORDERS = [
  {
    id: 1,
    type: 'pending',
    address: '123 Main Street, Toronto, ON M5J 2N8',
    orderId: '302011',
    driver: 'Bob Johnson',
    orderAmount: '1325.26',
    orderQuantity: '10 Items',
    orderCreated: '5 Mar 2024',
    orderCreatedTime: '10:30 pm',
    eta: '11:30pm, Today',
    soldQuantity: '2.36g',
    receivedAmount: '1025.35',
    unpaidCollection: '1025.35',
    paidCollection: '25.35',
    deliveryStarted: '12/14/2024 at 06:53 pm',
    approximateArrival: '12/14/2024, 08:12 PM',
  },
  {
    id: 2,
    type: 'delivered',
    address: '456 Oak Avenue, Toronto, ON M5K 3B2',
    orderId: '302012',
    driver: 'Bob Johnson',
    orderAmount: '825.50',
    orderQuantity: '5 Items',
    orderCreated: '5 Mar 2024',
    orderCreatedTime: '10:30 pm',
    deliveredAt: '11:30pm, 12 Dec 2024',
    soldQuantity: '1.50g',
    receivedAmount: '825.50',
    unpaidCollection: '0.00',
    paidCollection: '825.50',
    deliveryStarted: '12/14/2024 at 06:53 pm',
    deliveredTime: '12/14/2024, 08:12 PM',
  },
  {
    id: 3,
    type: 'cancelled',
    address: '789 Pine Road, Toronto, ON M5L 4C3',
    orderId: '302013',
    driver: 'Bob Johnson',
    orderAmount: '550.75',
    orderQuantity: '2 Items',
    orderCreated: '5 Mar 2024',
    orderCreatedTime: '10:30 pm',
    cancelledAt: '11:30pm, 14 Jan 2025',
    cancelReason: 'the requested item is out of stock',
    soldQuantity: '0.75g',
    receivedAmount: '0.00',
    unpaidCollection: '0.00',
    paidCollection: '0.00',
    deliveryStarted: '12/14/2024 at 06:53 pm',
    cancelledTime: '12/14/2024, 08:12 PM',
  },
  {
    id: 4,
    type: 'inprogress',
    address: '321 Maple Street, Toronto, ON M5M 5D4',
    orderId: '302014',
    driver: 'Bob Johnson',
    orderAmount: '1125.00',
    orderQuantity: '8 Items',
    orderCreated: '5 Mar 2024',
    orderCreatedTime: '10:30 pm',
    deliveryDate: '15 Jan 2025 Today',
    eta: '11:30 pm',
    soldQuantity: '2.00g',
    receivedAmount: '1125.00',
    unpaidCollection: '0.00',
    paidCollection: '1125.00',
    deliveryStarted: '12/14/2024 at 06:53 pm',
    approximateArrival: '12/14/2024, 08:12 PM',
  },
];

const LOG_ACTIVITY = [
  {
    id: 1,
    date: "12 Dec 2025",
    activities: [
      { time: "Online 2:00 pm", type: "online" },
      { time: "Offline 4:00 pm", type: "offline" },
      { time: "Online 6:00 pm", type: "online" },
    ],
    totalHours: "5 hrs",
    activities_hr: [{ hour: "2 hrs" }, { hour: ".5 hrs" }, { hour: "2 hrs" }],
  },
  {
    id: 2,
    date: "11 Dec 2024",
    activities: [],
    activities_hr: [],
    totalHours: "6 hrs",
  },
  {
    id: 3,
    date: "10 Dec 2024",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 4,
    date: "09 Dec 2024",
    activities: [],
    activities_hr: [],
    totalHours: "10 hrs",
  },
  {
    id: 5,
    date: "07 Jan 2025",
    activities: [],
    activities_hr: [],
    totalHours: "4 hrs",
  },
  {
    id: 6,
    date: "29 Jan 2025",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 7,
    date: "26 Feb 2025",
    activities: [],
    activities_hr: [],
    totalHours: "3 hrs",
  },
  {
    id: 8,
    date: "20 March 2025",
    activities: [],
    activities_hr: [],
    totalHours: "4 hrs",
  },
  {
    id: 9,
    date: "18 Apr 2025",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 10,
    date: "17 May 2025",
    activities: [],
    activities_hr: [],
    totalHours: "8 hrs",
  },
  {
    id: 11,
    date: "16 Jun 2025",
    activities: [],
    activities_hr: [],
    totalHours: "7 hrs",
  },
  {
    id: 12,
    date: "11 Jul 2025",
    activities: [],
    activities_hr: [],
    totalHours: "2 hrs",
  },
  {
    id: 13,
    date: "30 Jul 2025",
    activities: [],
    activities_hr: [],
    totalHours: "2 hrs",
  },
  {
    id: 14,
    date: "11 Aug 2025",
    activities: [],
    activities_hr: [],
    totalHours: "2 hrs",
  },
];

const DriverDetailView = ({ data }) => {
  const chartData = data || {
    categories: Array.from({ length: 30 }, (_, i) => String(i + 1)),
    series: [
      {
        name: "Delivered",
        data: [
          120, 90, 130, 100, 140, 110, 80, 150, 100, 70, 50, 120, 100, 120, 70,
          100, 120, 80, 110, 80, 100, 70, 120, 100, 120, 100, 80, 110, 90, 140,
        ],
      },
      {
        name: "Rescheduled",
        data: [
          100, 80, 90, 80, 100, 90, 70, 100, 90, 80, 60, 100, 90, 100, 70, 90,
          100, 80, 90, 80, 90, 80, 100, 90, 100, 90, 80, 90, 80, 100,
        ],
      },
      {
        name: "Cancelled",
        data: [
          120, 90, 100, 90, 120, 100, 80, 120, 100, 90, 70, 120, 100, 120, 80,
          100, 120, 90, 100, 90, 100, 90, 120, 100, 120, 100, 90, 100, 90, 120,
        ],
      },
    ],
  };

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
      },
    },
    xaxis: {
      categories: Array.from({ length: 30 }, (_, i) =>
        String(i + 1).padStart(2, "0"),
      ),
      labels: {
        style: {
          fontSize: window.innerWidth < 640 ? "9px" : "11px",
          colors: "#666",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 500,
      tickAmount: 5,
      labels: {
        style: {
          fontSize: window.innerWidth < 640 ? "9px" : "11px",
          colors: "#666",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: window.innerWidth < 640 ? "center" : "right",
      fontSize: window.innerWidth < 640 ? "10px" : "12px",
      markers: {
        width: window.innerWidth < 640 ? 8 : 10,
        height: window.innerWidth < 640 ? 8 : 10,
        radius: 10,
      },
      itemMargin: {
        horizontal: window.innerWidth < 640 ? 5 : 10,
        vertical: 0,
      },
    },
    colors: ["#00B159", "#0066FF", "#F44336"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " items";
        },
      },
    },
  };

  const navigate = useNavigate();
  const [isHired, setIsHired] = useState(true);
  const [period, setPeriod] = useState({ start: null, end: null });
  const [activeTab, setActiveTab] = useState("live-status");
  const [expandedLogIds, setExpandedLogIds] = useState([]);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);

  // Handler for order actions
  const handleOrderAction = (action, order) => {
    console.log(`Action: ${action}, Order ID: ${order.orderId}`, order);
    
    switch (action) {
      case 'chat':
        // Open chat drawer with order details
        break;
      case 'complaint':
        console.log('Filing complaint for order:', order.orderId);
        break;
      case 'cancelOrder':
        console.log('Cancelling order:', order.orderId);
        break;
      case 'editOrder':
        // Open edit order drawer
        break;
      case 'reorder':
        console.log('Reordering:', order.orderId);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  // Handler for saving edited order
  const handleSaveOrder = (updatedOrder) => {
    console.log('Saving updated order:', updatedOrder);
    // TODO: API call to update order
    // Example: await updateOrderAPI(updatedOrder);
    // Then refresh orders list
  };

  const toggleLogExpand = (logId) => {
    setExpandedLogIds((prev) =>
      prev.includes(logId)
        ? prev.filter((id) => id !== logId)
        : [...prev, logId]
    );
  };

  const onDateUpdate = useCallback(
    ({ start, end }) => setPeriod({ start, end }),
    [],
  );

  return (
    <div className="flex flex-col gap-2 min-w-0 px-2 sm:px-2.5 py-2 sm:py-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
          <button onClick={() => navigate("/staff/drivers")} className="mt-1 sm:mt-0">
            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
          </button>
          <div className="flex esm:flex-row flex-col items-start sm:items-center gap-2 flex-1">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm sm:text-base font-medium text-[#424143] flex flex-wrap items-center gap-2 sm:gap-6">
                <span className="wrap-break-word">David Doe (M2X 3X0) - Driver by Shroom-express</span>
                <MessageCircleMore className="h-3.5 sm:h-4 w-3.5 sm:w-4 stroke-2 shrink-0" />
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                <button
                  onClick={() => setIsContactDrawerOpen(true)}
                  className="text-xs sm:text-sm border-b text-black font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-3 sm:w-4 h-3 sm:h-4 stroke-2" />
                  Contact Info
                </button>
                <button className="text-xs sm:text-sm text-[#0066FF] font-semibold border-b flex items-center gap-1 whitespace-nowrap">
                  <Download className="w-3 sm:w-4 h-3 sm:h-4 stroke-2" />
                  Download APK
                </button>
                <button className="text-xs sm:text-sm border-b text-black font-semibold flex items-center gap-1 whitespace-nowrap">
                  <KeyRound className="w-3 sm:w-4 h-3 sm:h-4 stroke-2" /> Generate Password
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="esm:flex grid grid-cols-1 flex-wrap items-center justify-start lg:justify-center gap-2 text-xs sm:text-sm">
          <button
            type="button"
            className="flex items-center cursor-pointer justify-center gap-1 bg-[#FF9800] font-semibold px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-sm text-white h-9 sm:h-10 whitespace-nowrap"
          >
            <CircleQuestionMark className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> Complaints
          </button>
          <button
            type="button"
            className="flex items-center cursor-pointer justify-center gap-1 bg-[#0066FF] font-semibold px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-sm text-white h-9 sm:h-10 whitespace-nowrap"
          >
            <Coins className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> Pay Salary
          </button>
          {!isHired ? (
            <button
              type="button"
              onClick={() => setIsHired(true)}
              className="flex items-center cursor-pointer justify-center gap-1 bg-[#109F22] font-semibold px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-sm h-9 sm:h-10 text-white whitespace-nowrap"
            >
              <Handshake className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> Hire Now
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsHired(false)}
              className="flex items-center cursor-pointer justify-center gap-1 bg-[#F44336] font-semibold px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-sm h-9 sm:h-10 text-white whitespace-nowrap"
            >
              <Handshake className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> Relieve Now
            </button>
          )}
          <DatePickerMap
            defaultItem={2}
            onUpdate={onDateUpdate}
            className="h-9 sm:h-10 *:w-full sm:w-auto sm:*:w-44"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
        {STATS_DATA.map((card) => (
          <FinanceSummaryCard
            key={card.label}
            title={card.label}
            value={card.value}
            change={card.change}
            isPositive={card.isPositive}
          />
        ))}
      </div>

      {/* Detail Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2">
        {DETAIL_STATS.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-2 sm:p-3 rounded-sm border border-[#F4F7FE] flex items-center justify-between"
          >
            <p className="text-[11px] sm:text-[13px] font-semibold text-[#3F4753]">
              {stat.label}
            </p>
            <span className="text-sm sm:text-base font-semibold text-black">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between mb-3 sm:mb-4 gap-2">
          <h2 className="text-sm sm:text-base font-semibold text-black">
            Track Deliveries
          </h2>

          {/* Tabs */}
          <div className="flex items-center justify-between gap-0.5 sm:gap-2 border border-[#969696] bg-white rounded-sm p-0.5 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab("live-status")}
              className={`flex items-center gap-1 sm:gap-2 w-auto sm:w-37.5 justify-center px-2 sm:px-3 py-2 rounded-sm text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${activeTab === "live-status"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span className="hidden sm:inline">Live Status</span>
              <span className="sm:hidden">Live</span>
            </button>
            <button
              onClick={() => setActiveTab("order-history")}
              className={`flex items-center gap-1 sm:gap-2 w-auto sm:w-37.5 justify-center px-2 sm:px-3 py-2 rounded-sm text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${activeTab === "order-history"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <History className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              <span className="hidden sm:inline">Order History</span>
              <span className="sm:hidden">Orders</span>
            </button>
            <button
              onClick={() => setActiveTab("log-activity")}
              className={`flex items-center gap-1 sm:gap-2 w-auto sm:w-37.5 justify-center px-2 sm:px-3 py-2 rounded-sm text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${activeTab === "log-activity"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <ReceiptText className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span className="hidden sm:inline">Log Activity</span>
              <span className="sm:hidden">Log</span>
            </button>
            <button
              onClick={() => setActiveTab("payroll-history")}
              className={`flex items-center gap-1 sm:gap-2 w-auto sm:w-37.5 justify-center px-2 sm:px-3 py-2 rounded-sm text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${activeTab === "payroll-history"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <BanknoteArrowDown className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              <span className="hidden sm:inline">Payroll History</span>
              <span className="sm:hidden">Payroll</span>
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`flex items-center gap-1 sm:gap-2 w-auto sm:w-37.5 justify-center px-2 sm:px-3 py-2 rounded-sm text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${activeTab === "performance"
                ? "bg-[#0066FF] text-white"
                : "text-[#212121]"
                }`}
            >
              <ChartNoAxesColumnIncreasing className="h-3.5 sm:h-4 w-3.5 sm:w-4 stroke-4" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Perf</span>
            </button>
          </div>
        </div>
      </div>

      {/* Track Deliveries Section */}



      {/* Tab Content */}
      <div className="">
        {activeTab === "live-status" && (
          <div>
            {/* Live Status - Single Card with Map */}
            <OrderStatusCard
              orderData={{
                address: '123 Main Street, Toronto, ON M5J 2N8',
                orderId: '302011',
                driver: 'Jack Benson',
                orderAmount: '1325.26',
                orderQuantity: '10 Items',
                orderCreated: '5 Mar 2024',
                orderCreatedTime: '10:30 pm',
                deliveryDate: '15 Jan 2025 Today',
                eta: '11:30 pm',
                soldQuantity: '2.36g',
                receivedAmount: '1025.35',
                unpaidCollection: '1025.35',
                paidCollection: '25.35',
                deliveryStarted: '12/14/2024 at 06:53 pm',
                approximateArrival: '12/14/2024, 08:12 PM',
              }}
              showMap={true}
              showActions={true}
              showPaymentSummary={false}
              type="inprogress"
            />
          </div>
        )}
        {activeTab === "order-history" && (
          <OrderPage
            showFilters={true}
            showMap={false}
            pageType="all"
            orders={SAMPLE_ORDERS}
            onOrderAction={handleOrderAction}
          />
        )}
        {activeTab === "log-activity" && (
          <LogActivityTimeline
            logData={LOG_ACTIVITY}
            expandedLogIds={expandedLogIds}
            toggleLogExpand={toggleLogExpand}
            onlineTime="112.5 hrs"
            offlineTime="30 hrs"
          />
        )}

        {activeTab === "payroll-history" && (
          <div className="bg-white rounded-sm border border-gray-200 p-2 sm:p-4">
            <div className="space-y-2 sm:space-y-4">
              {PAYROLL_HISTORY.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border-b border-[#F0F1F3] pb-2 sm:pb-4 gap-1 sm:gap-2"
                >
                  <p className="text-xs sm:text-sm text-black font-medium wrap-break-word">
                    {payment.description}
                  </p>
                  <span className="text-sm sm:text-base font-bold text-black whitespace-nowrap">
                    {payment.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="bg-white rounded-sm border border-gray-200 p-2 sm:p-4">
            <div className="py-2 sm:py-4 overflow-x-auto">
              <div className="min-w-75">
                <Chart
                  options={chartOptions}
                  series={chartData.series}
                  type="bar"
                  height={window.innerWidth < 640 ? 250 : 350}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Driver Details Drawer */}
      <DriverDetailsDrawer
        isOpen={isContactDrawerOpen}
        onClose={() => setIsContactDrawerOpen(false)}
        driver={{ driverName: "David Doe" }}
      />
    </div>
  );
};

export default DriverDetailView;
