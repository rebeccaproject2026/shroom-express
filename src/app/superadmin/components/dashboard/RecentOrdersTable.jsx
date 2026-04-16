import { Icon } from "@iconify/react";

const RecentOrdersTable = () => {
    const orders = [
        { id: "#SE-8921", store: "Forest Oasis", driver: "Jankins", amount: "$42.50", qty: "30gm", status: "Delivered", time: "2 hrs ago" },
        { id: "#SE-8921", store: "Healthy Greens", driver: "Jankins", amount: "$22.50", qty: "10gm", status: "Preparing", time: "20 mins ago" },
        { id: "#SE-8921", store: "Forest Oasis", driver: "Jankins", amount: "$402.50", qty: "70gm", status: "Delivered", time: "5 hrs ago" },
        { id: "#SE-8921", store: "Forest Oasis", driver: "Mike Rose", amount: "$42.50", qty: "30gm", status: "Pending", time: "2 hrs ago" },
        { id: "#SE-8921", store: "Forest Oasis", driver: "Jankins", amount: "$42.50", qty: "30gm", status: "Delivered", time: "7 hrs ago" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered": return "bg-[#DCFCE7] text-[#15803D]";
            case "Preparing": return "bg-[#DBEAFE] text-[#1D4ED8]";
            case "Pending": return "bg-[#FEF9C3] text-[#A16207]";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="bg-white rounded-lg border border-[#F1F5F9] shadow-[0px_1px_2px_0px_#0000000D] font-manrope overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-[#F1F5F9]/50">
                <h4 className="text-lg font-semibold text-[#0F172A]">Recent Orders</h4>
                <button className="text-[#EA3D2A] text-sm font-semibold hover:underline transition-all">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8FAFC] text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9]">
                            <th className="py-3 px-6 font-semibold">ORDER ID</th>
                            <th className="py-3 px-6 font-semibold">STORE</th>
                            <th className="py-3 px-6 font-semibold">DRIVER</th>
                            <th className="py-3 px-6 font-semibold">AMOUNT</th>
                            <th className="py-3 px-6 font-semibold">QTY</th>
                            <th className="py-3 px-6 font-semibold">STATUS</th>
                            <th className="py-3 px-6 font-semibold">ORDER TIME</th>
                            <th className="py-3 px-6 w-10 "></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {orders.map((order, idx) => (
                            <tr key={idx} className="last:border-none group hover:bg-[#F8FAFC]/50 transition-colors">
                                <td className="py-4 px-6">
                                    <span className="text-sm font-bold text-[#E93E2B] underline decoration-[#E93E2B] cursor-pointer underline-offset-4">
                                        {order.id}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-medium text-[#0F172A] underline decoration-[#0F172A] cursor-pointer underline-offset-4">
                                        {order.store}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-medium text-[#E93E2B] underline decoration-[#E93E2B] cursor-pointer underline-offset-4">
                                        {order.driver}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-bold text-[#0F172A]">{order.amount}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-medium text-[#0F172A]">{order.qty}</span>
                                </td>
                                <td className="py-4  px-6">
                                    <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-normal text-[#64748B]">{order.time}</span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button className="text-[#94A3B8] hover:text-[#64748B] transition-colors">
                                        <Icon icon="pepicons-pop:dots-y" width="20" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
