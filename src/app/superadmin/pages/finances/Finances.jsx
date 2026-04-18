import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DatePickerMap from "../../components/DatePickerMap";
import OverviewTab from "./tabs/OverviewTab";
import ExpensesTab from "./tabs/ExpensesTab";
import InventoryTab from "./tabs/InventoryTab";
import DriverCostsTab from "./tabs/DriverCostsTab";
import "./Finances.css";

const Finances = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [visibleSeries, setVisibleSeries] = useState(["Total Receivable", "Total Expenses", "Gross Profit"]);

  const breadcrumbItems = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Finances" }
  ];

  const summaryCards = [
    { title: "Total Receivable", value: "$50.2K", trend: "22% vs last month", color: "#3B82F6" },
    { title: "Total Expenses", value: "$36.1K", trend: "22% vs last month", color: "#F97316" },
    { title: "Gross Profit", value: "$44.8K", trend: "22% vs last month", color: "#84CC16" },
    { title: "Net Profit", value: "$30.2K", trend: "22% vs last month", color: "#15803D" },
    { title: "Purchased Inventory Cost", value: "$24.2K", trend: "22% vs last month", color: "#EAB308" },
    { title: "Purchased Inventory Quantity", value: "2,395 kg", trend: "22% vs last month", color: "#0EA5E9" },
    { title: "Inventory Sold Amount", value: "$41.8K", trend: "22% vs last month", color: "#EC4899" },
    { title: "Inventory Sold Quantity", value: "2,095 kg", trend: "22% vs last month", color: "#14B8A6" },
    { title: "Total Collection", value: "$47.6K", trend: "22% vs last month", color: "#F59E0B" },
    { title: "Driver Cost", value: "$10.2K", trend: "22% vs last month", color: "#65A30D" },
    { title: "Dispatcher Cost", value: "$7.8K", trend: "22% vs last month", color: "#78350F" },
    { title: "Subscription Cost", value: "$3.1K", trend: "22% vs last month", color: "#DC2626" },
  ];

  const toggleSeries = (title) => {
    if (visibleSeries.includes(title)) {
      setVisibleSeries(visibleSeries.filter(s => s !== title));
    } else {
      setVisibleSeries([...visibleSeries, title]);
    }
  };


  const baseWave = [80, 48, 75, 55, 45, 78, 60, 40, 80, 65, 42, 72, 60, 82, 35];

  const shift = (arr, offset) => arr.map(v => Math.max(v - offset, 0));

  const allTrendData = {
    "Total Expenses": baseWave,
    "Total Receivable": shift(baseWave, 12),
    "Gross Profit": shift(baseWave, 25),
    "Net Profit": shift(baseWave, 30),
    "Purchased Inventory Cost": shift(baseWave, 40),
    "Purchased Inventory Quantity": shift(baseWave, 38),
    "Inventory Sold Amount": shift(baseWave, 28),
    "Inventory Sold Quantity": shift(baseWave, 32),
    "Total Collection": shift(baseWave, 22),
    "Driver Cost": shift(baseWave, 50),
    "Dispatcher Cost": shift(baseWave, 55),
    "Subscription Cost": shift(baseWave, 60),
  };
  const trendChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Montserrat, sans-serif',
      stacked: false
    },

    dataLabels: { enabled: false },

    stroke: {
      curve: 'smooth',
      width: 2.8,
      lineCap: 'round'
    },
    colors: summaryCards.map(c => c.color),

    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.8,
        gradientToColors: summaryCards.map(c => c.color),
        inverseColors: false,
        opacityFrom: 0.45, //  stronger top
        opacityTo: 0.05,   //  fade bottom
        stops: [0, 80, 100]
      }
    },

    markers: {
      size: 0, //  remove dots
      strokeWidth: 0
    },

    xaxis: {
      categories: [4, 8, 12, 16, 20, 24, 28, 32, 34, 36, 38, 40, 42, 44, 46, 48],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#64748B', fontSize: '12px' }
      }
    },

    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        style: { colors: '#64748B', fontSize: '12px' }
      }
    },

    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 5, // ⭐ dotted grid like image
    },

    legend: { show: false },

    tooltip: {
      theme: 'light',
      x: { show: false },
      y: {
        formatter: (val) => `$${val}k`
      }
    }
  };

  const trendChartSeries = summaryCards
    .filter(c => visibleSeries.includes(c.title))
    .map(c => ({
      name: c.title,
      data: allTrendData[c.title],
      type: 'area'
    }));

  const monthlyTrendOptions = {
    chart: {
      type: 'bar',
      height: 320,
      toolbar: { show: false },
      fontFamily: 'Montserrat, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 3, colors: ['transparent'] },
    colors: ['#0066FF', '#219653', '#FF9F40'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        style: { colors: '#64748B', fontSize: '11px' },
        formatter: (val) => `$${val}k`
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '10px',
      fontWeight: '600',
      markers: {
        width: 12,
        height: 12,
        radius: 12
      },
      itemMargin: { horizontal: 10, vertical: 0 }
    },
    fill: { opacity: 1 },
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 4,
    }
  };

  const monthlyTrendSeries = [
    { name: 'Total Receivable', data: [20, 23, 26] },
    { name: 'Total Expenses', data: [14, 16, 18] },
    { name: 'Gross Profit', data: [16, 15, 19] }
  ];

  const weeklyData = [
    { period: "Week 1", receivable: "$11,200", expenses: "$8,200", gross: "$9,900", net: "$6,800", inv: "$5,400", driver: "$2,300" },
    { period: "Week 2", receivable: "$13,400", expenses: "$9,100", gross: "$11,200", net: "$7,900", inv: "$6,100", driver: "$2,700" },
    { period: "Week 3", receivable: "$12,800", expenses: "$9,400", gross: "$11,200", net: "$7,400", inv: "$5,900", driver: "$2,500" },
    { period: "Week 4", receivable: "$12,800", expenses: "$9,400", gross: "$11,900", net: "$8,100", inv: "$6,800", driver: "$2,700" },
    { period: "Total", receivable: "$50,200", expenses: "$36,100", gross: "$44,800", net: "$30,200", inv: "$24,200", driver: "$10,200" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewTab weeklyData={weeklyData} monthlyTrendOptions={monthlyTrendOptions} monthlyTrendSeries={monthlyTrendSeries} />;
      case "Expenses":
        return <ExpensesTab />;
      case "Inventory":
        return <InventoryTab />;
      case "Driver Costs":
        return <DriverCostsTab />;
      default:
        return <OverviewTab weeklyData={weeklyData} monthlyTrendOptions={monthlyTrendOptions} monthlyTrendSeries={monthlyTrendSeries} />;
    }
  };

  return (
    <div className="finances-container space-y-8 animate-in fade-in duration-700 font-manrope">
      {/* Breadcrumbs & Header Section */}
      <div className="flex flex-col gap-2">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-[#181211]">Finances</h1>
            <p className="text-[#475569] font-medium text-sm">Track revenue, expenses, profit, and collection metrics.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#EA3D2A] text-white px-3 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group">
              <Icon icon="lucide:upload" width="18" />
              Export CSV
            </button>
            <DatePickerMap defaultItem={5} onUpdate={(range) => console.log("Finances date range:", range)} />
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            onClick={() => toggleSeries(card.title)}
            className={`bg-white p-4 rounded-lg border border-t-[5px] transition-all hover:shadow-md cursor-default shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] 
              `}
            style={{
              borderTopColor: card.color,
              borderColor: `${card.color}`
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-[#475569] leading-none m-0">{card.title}</p>
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#EA3D2A] font-semibold underline leading-tight"
              >
                View
              </button>
            </div>

            <h3 className="text-2xl font-semibold text-[#181211] leading-none mt-3 mb-2.5">
              {card.value}
            </h3>

            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#219653]">
              <Icon icon="lucide:trending-up" width="16" />
              <span>{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Trends Chart */}
      <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
        <div className="flex flex-col mb-8">
          <h4 className="text-xl font-semibold text-[#181211]">Financial Trends — This Month</h4>
          <p className="text-sm text-[#64748B] font-medium mt-0.5">Click metric cards or chips to toggle series</p>
        </div>

        {/* Legend Chips */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-2">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              onClick={() => toggleSeries(card.title)}
              className={`flex items-center gap-2 cursor-pointer transition-opacity ${visibleSeries.includes(card.title) ? 'opacity-100' : 'opacity-40'}`}
            >
              <div
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{ backgroundColor: card.color }}
              ></div>
              <span className="text-xs font-medium text-[#475569] whitespace-nowrap">
                {card.title}
              </span>
            </div>
          ))}
        </div>

        <div className="h-[320px]">
          <ReactApexChart options={trendChartOptions} series={trendChartSeries} type="area" height={320} />
        </div>
      </div>
      {/* Tabbed Content Section */}
      <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden mb-10">
        {/* Tab Navigation */}
        <div className="flex items-center border-b border-[#E2E8F0] gap-8 px-6 overflow-x-auto hide-scrollbar shrink-0 bg-white">
          {["Overview", "Expenses", "Inventory", "Driver Costs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pt-5 pb-4 text-[15px] font-semibold transition-all whitespace-nowrap ${activeTab === tab
                ? "text-[#EA3D2A]"
                : "text-[#181211] hover:text-[#EA3D2A]"
                }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA3D2A] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Rendering */}
        <div className="min-h-[400px] p-4">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default Finances;
