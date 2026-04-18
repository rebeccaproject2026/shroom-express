import React from 'react';
import ReactApexChart from 'react-apexcharts';

const InventoryTab = () => {
  const inventoryMetrics = [
    { label: "Purchased Cost", value: "$24.2K", borderColor: "border-[#FF9F40]" },
    { label: "Purchased Qty", value: "2,395 kg", borderColor: "border-[#0066FF]" },
    { label: "Sold Amount", value: "$41.8K", borderColor: "border-[#EA3D2A]" },
    { label: "Sold Qty", value: "2,095 kg", borderColor: "border-[#EA3D2A]" },
    { label: "Remaining", value: "300 kg", borderColor: "border-[#219653]" },
    { label: "Gross Margin", value: "72.6%", borderColor: "border-[#219653]" },
  ];

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    colors: ['#0066FF', '#EA3D2A'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
      tooltip: { enabled: false }
    },
    yaxis: {
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '12px',
      fontWeight: '600',
      markers: {
        width: 10,
        height: 10,
        radius: 50
      },
      itemMargin: { horizontal: 10, vertical: 0 }
    },
    tooltip: {
      theme: 'light',
      x: { show: false },
      y: { formatter: (val) => `${val} kg` }
    }
  };

  const chartSeries = [
    {
      name: 'Purchased (kg)',
      data: [320, 180, 80, 250, 120, 320, 150, 340, 250, 150, 280, 110]
    },
    {
      name: 'Sold (kg)',
      data: [380, 230, 140, 310, 180, 380, 210, 390, 300, 210, 310, 180]
    }
  ];

  return (
    <div className=" bg-[#FBFCFD] space-y-6 flex flex-col font-manrope">
      {/* Metric Cards Grid - 6 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {inventoryMetrics.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white p-4 rounded-lg border border-t-[5px] ${stat.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all cursor-default`}
          >
            <p className="text-[15px] font-medium text-[#64748B] leading-none mb-3">{stat.label}</p>
            <h4 className="text-[26px] font-bold text-[#181211] leading-none mt-2">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Area Chart Section */}
      <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
        <div className="flex flex-col mb-4">
          <h4 className="text-xl font-semibold text-[#181211]">Purchased vs Sold — Daily Units (kg)</h4>
        </div>

        <div className="h-[350px] mt-2">
          <ReactApexChart options={chartOptions} series={chartSeries} type="area" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;
