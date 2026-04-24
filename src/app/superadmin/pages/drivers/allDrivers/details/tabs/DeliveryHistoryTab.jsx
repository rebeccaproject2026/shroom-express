import React from 'react';

const DeliveryHistoryTab = ({ driver }) => {
    const deliveries = [
        {
            id: "#SE-9040",
            customer: "Jordan M.",
            store: "Healthy Greens",
            date: "Mar 06, 2026",
            time: "12 min",
            amount: "$62.00",
            status: "Delivered"
        },
        {
            id: "#SE-9035",
            customer: "Claire W.",
            store: "Forest Oasis",
            date: "Mar 06, 2026",
            time: "8 min",
            amount: "$96.00",
            status: "In Transit"
        },
        {
            id: "#SE-9033",
            customer: "Lisa R.",
            store: "Pure Origins",
            date: "Mar 05, 2026",
            time: "11 min",
            amount: "$62.00",
            status: "Delivered"
        },
        {
            id: "#SE-9028",
            customer: "Raj M.",
            store: "Healthy Greens",
            date: "Mar 06, 2026",
            time: "12 min",
            amount: "$44.00",
            status: "Delivered"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-[14px] text-[#475569] font-medium mb-2">
                Recent deliveries for {driver.name}
            </h3>

            <div className="space-y-3">
                {deliveries.map((delivery, idx) => (
                    <div
                        key={idx}
                        className="relative  border border-[#CDFFE2] rounded-md p-3 transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="text-[#EA3D2A] font-semibold text-base leading-none">
                                    {delivery.id}
                                </span>
                                <div className="text-[#475569] text-base font-medium leading-tight pt-1">
                                    {delivery.customer} · {delivery.store}
                                </div>
                                <div className="text-[#475569] text-sm font-medium leading-tight">
                                    {delivery.date} · {delivery.time}
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3.5">
                                <span className="text-[20px] font-semibold text-[#181211] leading-none">
                                    {delivery.amount}
                                </span>
                                <span className={`px-2.5 py-1 rounded-md text-[12.5px] font-semibold ${delivery.status === 'Delivered'
                                    ? 'bg-[#CDFFE2] text-[#219653]'
                                    : 'bg-[#DAE9FF] text-[#0066FF]'
                                    }`}>
                                    {delivery.status}
                                </span>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default DeliveryHistoryTab;
