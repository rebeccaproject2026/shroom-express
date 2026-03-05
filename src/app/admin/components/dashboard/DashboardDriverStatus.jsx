import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const DashboardDriverStatus = ({ data, onViewAll }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartData = data || {
    categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [
      {
        name: "Online",
        data: [450, 320, 300, 460, 140, 380, 390],
      },
      {
        name: "Offline",
        data: [220, 120, 240, 360, 240, 220, 310],
      },
    ],
    totals: {
      online: 32,
      offline: 23,
    },
  };

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#00B159", "#F44336"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: isMobile ? "70%" : "60%",
        borderRadius: isMobile ? 6 : 8,
      },
    },
    stroke: {
      show: true,
      width: isMobile ? 8 : 12,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          fontSize: isMobile ? "11px" : "12px",
          fontFamily: "Montserrat, serif",
        },
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          fontSize: isMobile ? "10px" : "12px",
        },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "light",
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 0,
      padding: {
        left: isMobile ? 5 : 10,
        right: isMobile ? 5 : 10,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "75%",
              borderRadius: 5,
            },
          },
          stroke: {
            width: 6,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-sm shadow p-3 sm:p-4 md:p-6">
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800">Driver Status</h2>
        <button
          onClick={onViewAll}
          className="text-(--color-primary) text-xs font-semibold bg-[var(--color-primary-soft)] py-1.5 px-3 sm:px-4 rounded-2xl items-center justify-center cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          View All
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 justify-start sm:justify-end">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
          <span className="text-xs sm:text-sm font-[450] text-[#3F4753] whitespace-nowrap">
            Online({chartData.totals.online})
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-[#3F4753] font-[450] whitespace-nowrap">
            Offline({chartData.totals.offline})
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <Chart
          options={chartOptions}
          series={chartData.series}
          type="bar"
          height={isMobile ? 220 : 250}
        />
      </div>
    </div>
  );
};

export default DashboardDriverStatus;
