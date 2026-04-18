import React from 'react';

const ExpensesTab = () => {
  const expenseMetrics = [
    { label: "Inventory Cost", value: "$24.2K", subtext: "67% of total", color: "text-[#F24E1E]", borderColor: "border-[#F24E1E]" },
    { label: "Driver Cost", value: "$10.2K", subtext: "28% of total", color: "text-[#0066FF]", borderColor: "border-[#0066FF]" },
    { label: "Dispatcher Cost", value: "$7.8K", subtext: "22% of total", color: "text-[#EB5757]", borderColor: "border-[#EB5757]" },
    { label: "Subscription", value: "$3.1K", subtext: "9% of total", color: "text-[#219653]", borderColor: "border-[#219653]" },
    { label: "Other", value: "$1.8K", subtext: "5% of total", color: "text-[#181211]", borderColor: "border-[#181211]" },
  ];

  const categoryData = [
    { label: "Inventory Cost", value: "$24.2k", percentage: "67%", color: "bg-[#EA3D2A]", width: "67%" },
    { label: "Driver Cost", value: "$10.2k", percentage: "28%", color: "bg-[#0066FF]", width: "35%" },
    { label: "Dispatcher Cost", value: "$7.8k", percentage: "22%", color: "bg-[#EA3D2A]", width: "25%" },
    { label: "Subscription", value: "$3.1k", percentage: "9%", color: "bg-[#219653]", width: "12%" },
    { label: "Other", value: "$1.8k", percentage: "5%", color: "bg-[#94A3B8]", width: "8%" },
  ];

  return (
    <div className=" space-y-6 flex flex-col  font-manrope">
      {/* Top Row: Metric Cards - Exact Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {expenseMetrics.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white p-4 rounded-lg border border-t-[5px] ${stat.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}
          >
            <p className="text-sm font-medium text-[#64748B] leading-none">{stat.label}</p>
            <h4 className="text-2xl font-bold text-[#181211] leading-none mt-4">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Expense Categories Chart Section - Matching On-Time Delivery Score Style */}
      <div className="bg-white p-5 rounded-md border border-[#E2E8F0] shadow-sm">
        <h3 className="text-xl font-semibold text-[#181211] leading-tight">Expense Categories</h3>
        <p className="text-sm mt-1 font-medium text-[#64748B] mb-4">% of total expenses this month</p>

        <div className="space-y-6">
          {categoryData.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-end">
                <span className={`text-[13px] font-semibold ${index === 0 ? 'text-[#181211]' : 'font-medium text-[#475569]'}`}>
                  {item.label}
                </span>
                <span className="text-xs font-semibold text-[#181211]">{item.value} · {item.percentage}</span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesTab;
