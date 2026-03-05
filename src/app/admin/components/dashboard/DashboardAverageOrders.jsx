import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const DashboardAverageOrders = ({ data, onViewAll, title = "Average Orders", rightContent }) => {
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
    categories: Array.from({ length: 30 }, (_, i) => String(i + 1)),
    series: [
      {
        name: "Total Orders(432)",
        data: [
          80, 75, 85, 90, 70, 95, 100, 85, 90, 75, 80, 85, 70, 95, 100,
          85, 90, 75, 80, 85, 70, 95, 100, 85, 90, 100, 115, 90, 95, 80,
        ],
      },
      {
        name: "Delivered (324)",
        data: [
          50, 48, 52, 55, 45, 60, 65, 55, 58, 50, 52, 55, 48, 60, 65, 55,
          58, 50, 52, 55, 48, 60, 65, 55, 58, 65, 75, 58, 60, 52,
        ],
      },
      {
        name: "Pending (45)",
        data: [
          20, 18, 22, 25, 18, 28, 30, 25, 26, 20, 22, 25, 18, 28, 30, 25,
          26, 20, 22, 25, 18, 28, 30, 25, 26, 30, 35, 26, 28, 22,
        ],
      },
      {
        name: "Cancelled (42)",
        data: [
          10, 9, 11, 10, 7, 7, 5, 5, 6, 5, 6, 5, 4, 7, 5, 5, 6, 5, 6, 5,
          4, 7, 5, 5, 6, 5, 5, 6, 7, 6,
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
    colors: ["#00B159", "#0066FF", "#FF9800", "#F44336"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: isMobile ? "80%" : "60%",
        borderRadius: 0,
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          fontSize: isMobile ? "10px" : "12px",
          fontFamily: "Montserrat, serif",
        },
        rotate: isMobile ? -45 : 0,
        rotateAlways: false,
        hideOverlappingLabels: true,
        trim: true,
      },
      title: {
        text: "Days",
        style: {
          fontSize: isMobile ? "11px" : "13px",
          fontWeight: "600",
          fontFamily: "Montserrat, serif",
          color: "#000000",
        },
        offsetY: isMobile ? 5 : 0,
      },
      tickAmount: isMobile ? 10 : undefined,
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
      shared: true,
      intersect: false,
      theme: "light",
      x: {
        show: true,
      },
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
              columnWidth: "85%",
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: "9px",
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
        <h2 className="text-sm sm:text-base font-semibold text-[#3F4753]">{title}</h2>
        {rightContent != null ? (
          rightContent
        ) : onViewAll ? (
          <button
            onClick={onViewAll}
            className="text-(--color-primary) text-xs font-semibold bg-(--color-primary-soft) py-1.5 px-3 sm:px-4 rounded-2xl items-center justify-center cursor-pointer whitespace-nowrap shrink-0"
          >
            View All
          </button>
        ) : null}
      </div>

      {/* Legend */}
      <div className="flex justify-start sm:justify-end flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full shrink-0"></div>
          <span className="text-xs sm:text-sm font-[450] text-[#3F4753] whitespace-nowrap">Total Orders(432)</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full shrink-0"></div>
          <span className="text-xs sm:text-sm font-[450] text-[#3F4753] whitespace-nowrap">Delivered (324)</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full shrink-0"></div>
          <span className="text-xs sm:text-sm font-[450] text-[#3F4753] whitespace-nowrap">Pending (45)</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full shrink-0"></div>
          <span className="text-xs sm:text-sm font-[450] text-[#3F4753] whitespace-nowrap">Cancelled (42)</span>
        </div>
      </div>

      {/* Chart Container with horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto">
        <div className={isMobile ? "min-w-125" : "w-full"}>
          <Chart
            options={chartOptions}
            series={chartData.series}
            type="bar"
            height={isMobile ? 280 : 320} 
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardAverageOrders;
