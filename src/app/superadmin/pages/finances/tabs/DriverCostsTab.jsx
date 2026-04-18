import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DriverCostsTab = () => {
  const driverMetrics = [
    { label: "Driver Cost", value: "$10.2K", borderColor: "border-[#0066FF]" },
    { label: "Dispatcher Cost", value: "$7.8K", borderColor: "border-[#181211]" },
    { label: "Total Fleet Cost", value: "$18.0K", borderColor: "border-[#EA3D2A]" },
    { label: "Cost per Order", value: "$41.20", borderColor: "border-[#FF9F40]" },
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
    colors: ['#0066FF', '#181211'],
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
      tooltip: {
        enabled: false
      }
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
      y: { formatter: (val) => `$${val}` }
    }
  };

  const chartSeries = [
    {
      name: 'Driver Cost',
      data: [320, 220, 80, 250, 120, 320, 150, 330, 250, 150, 290, 110]
    },
    {
      name: 'Dispatcher Cost',
      data: [380, 280, 140, 310, 180, 380, 210, 390, 310, 210, 350, 170]
    }
  ];

  return (
    <div className=" bg-[#FBFCFD] space-y-6 flex flex-col font-manrope">
      {/* Metric Cards Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {driverMetrics.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white p-5 rounded-lg border border-t-[5px] ${stat.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}
          >
            <p className="text-[15px] font-medium text-[#64748B] leading-none mb-3">{stat.label}</p>
            <h4 className="text-[26px] font-bold text-[#181211] leading-none mt-4">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Driver & Dispatcher Cost Section */}
      <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
        <div className="flex flex-col mb-2">
          <h4 className="text-xl font-semibold text-[#181211]">Driver & Dispatcher Cost — Daily</h4>
        </div>

        <div className="h-[350px] mt-2">
          <ReactApexChart options={chartOptions} series={chartSeries} type="area" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default DriverCostsTab;
