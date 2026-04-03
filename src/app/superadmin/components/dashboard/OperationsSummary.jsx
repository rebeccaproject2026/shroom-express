import { Icon } from "@iconify/react";

const OperationsSummary = () => {
    const orders = [
        { label: "Overall Orders", value: "156,204", borderColor: "border-[#0F172A]", textColor: "text-[#0F172A]" },
        { label: "Rescheduled", value: "1,245", borderColor: "border-[#8B5CF6]", textColor: "text-[#8B5CF6]" },
        { label: "Pending Deliveries", value: "842", borderColor: "border-[#3B82F6]", textColor: "text-[#3B82F6]" },
        { label: "In-progress", value: "324", borderColor: "border-[#F59E0B]", textColor: "text-[#F59E0B]" },
        { label: "Delivered", value: "142,8k", borderColor: "border-[#10B981]", textColor: "text-[#10B981]" },
        { label: "Cancelled", value: "34", borderColor: "border-[#EF4444]", textColor: "text-[#EF4444]" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {orders.map((order, idx) => (
                <div
                    key={idx}
                    className={`bg-white p-4 rounded-lg border border-t-[5px] ${order.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col min-h-[50px] transition-all hover:shadow-md cursor-default`}
                >
                    <p className="text-sm font-medium text-[#64748B] font-manrope mb-3">
                        {order.label}
                    </p>
                    <h3 className="text-xl font-semibold text-[#0F172A] font-manrope tracking-wider leading-none ">
                        {order.value}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default OperationsSummary;
