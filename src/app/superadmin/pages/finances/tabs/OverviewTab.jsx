import ReactApexChart from "react-apexcharts";

const OverviewTab = ({ weeklyData, monthlyTrendOptions, monthlyTrendSeries }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Weekly Breakdown Table Card */}
      <div className="lg:col-span-8 bg-white rounded-md border border-[#E2E8F0] h-90  p-4 flex flex-col">
        <div className="flex flex-col mb-4">
          <h4 className="text-xl font-semibold text-[#181211]">Weekly Breakdown</h4>
          <p className="text-sm text-[#64748B] font-medium mt-0.5">March 2025 · 4 weeks</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F8F8] border-b border-[#F1F5F9]">
                <th className="px-4 py-3 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight whitespace-nowrap">Period</th>
                <th className="px-2.5 py-3 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight text-right whitespace-nowrap">Receivable</th>
                <th className="px-2.5 py-3 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight text-right whitespace-nowrap">Expenses</th>
                <th className="px-2.5 py-3 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight text-right whitespace-nowrap">Gross Profit</th>
                <th className="px-2.5 py-3 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight text-right whitespace-nowrap">Net Profit</th>
                <th className="px-2.5 py-3 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight text-right whitespace-nowrap">Inv Cost</th>
                <th className="px-2.5 py-3 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight text-right whitespace-nowrap">Driver Cost</th>
              </tr>
            </thead>
            <tbody className="">
              {weeklyData.map((row, index) => (
                <tr
                  key={index}
                  className={`transition-all text-[14px] font-semibold`}
                >
                  <td className="px-4 py-2.5  text-[#1E293B]">{row.period}</td>
                  <td className="px-4 py-2.5  text-[#219653] text-left">{row.receivable}</td>
                  <td className="px-4 py-2.5  text-[#FF0000] text-left">{row.expenses}</td>
                  <td className="px-4 py-2.5  text-[#219653] text-left">{row.gross}</td>
                  <td className="px-4 py-2.5  text-[#219653] text-left">{row.net}</td>
                  <td className="px-4 py-2.5  text-[#64748B] text-left">{row.inv}</td>
                  <td className="px-4 py-2.5  text-[#64748B] text-left">{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Trend Chart Card */}
      <div className="lg:col-span-4 bg-white rounded-md border border-[#E2E8F0]  p-4 flex flex-col">
        <div className="flex flex-col mb-4">
          <h4 className="text-xl font-semibold text-[#181211]">Monthly Trend</h4>
          <p className="text-sm text-[#64748B] font-medium mt-0.5">Jan – Mar 2025</p>
        </div>

        <div className="h-[280px]">
          <ReactApexChart options={monthlyTrendOptions} series={monthlyTrendSeries} type="bar" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
