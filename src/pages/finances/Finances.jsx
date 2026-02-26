import { useMemo, useCallback, useState, useEffect } from "react";
import DatePickerMap from "../../components/DatePickerMap";
import FinanceSummaryCard from "../../components/finances/FinanceSummaryCard";
import MultiSeriesLineChart from "../../components/charts/MultiSeriesLineChart";

const CARD_DATA = [
  {
    title: "Inventory Purchased Cost",
    value: "$50.2K",
    change: "+ 22%",
    isPositive: true,
  },
  {
    title: "Inventory Sold Cost",
    value: "$60.4K",
    change: "+ 22%",
    isPositive: false,
  },
  { title: "Gross Profit", value: "$10.2K", change: "+ 22%", isPositive: true },
  { title: "Net Profit", value: "$9.1K", change: "+ 22%", isPositive: false },
  {
    title: "Inventory Purchased Quantity",
    value: "13,252 Items",
    change: "+ 22%",
    isPositive: false,
  },
  {
    title: "Inventory Sold Quantity",
    value: "10,252 Items",
    change: "+ 22%",
    isPositive: true,
  },
  {
    title: "Inventory In Stock",
    value: "3,000 Items",
    change: "+ 22%",
    isPositive: false,
  },
  { title: "Driver Cost", value: "$1.1K", change: "+ 22%", isPositive: true },
];

const CHART_SERIES_NAMES = [
  "Inventory Purchased Cost",
  "Inventory Sold Cost",
  "Gross Profit",
  "Net Profit",
  "Inventory Purchased Quantity",
  "Inventory Sold Quantity",
  "Inventory In Stock",
  "Driver Cost",
];

const CHART_COLORS = [
  "#0066FF",
  "#F47820",
  "#15803D",
  "#166534",
  "#EAB308",
  "#EC4899",
  "#06B6D4",
  "#14B8A6",
];

function generateSeriesData(days = 30) {
  const data = [];
  for (let i = 0; i < days; i++) {
    data.push(Math.round(220 + Math.sin(i * 1.6) * 300 + Math.random() * 300));
  }
  return data;
}

const Finances = () => {
  const [chartHeight, setChartHeight] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 350 : window.innerWidth < 1024 ? 400 : 460;
    }
    return 460;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartHeight(350);
      } else if (width < 1024) {
        setChartHeight(400);
      } else {
        setChartHeight(460);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDateUpdate = useCallback(({ start, end }) => {
    // Optional: fetch data based on start/end
  }, []);

  const chartSeries = useMemo(
    () =>
      CHART_SERIES_NAMES.map((name) => ({
        name,
        data: generateSeriesData(30),
      })),
    []
  );

  return (
    <div className="flex flex-col gap-2 min-w-0 px-2.5 py-3 w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DatePickerMap defaultItem={2} onUpdate={onDateUpdate} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {CARD_DATA.map((card) => (
          <FinanceSummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            isPositive={card.isPositive}
          />
        ))}
      </div>

      <div className="bg-white rounded-sm shadow-sm p-2 sm:p-4 border border-gray-200 w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <MultiSeriesLineChart
              series={chartSeries}
              colors={CHART_COLORS}
              height={chartHeight}
              yaxis={{ min: 0, max: 1000, tickAmount: 4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances;
