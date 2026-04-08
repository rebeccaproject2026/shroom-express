import React from 'react';
import { Icon } from "@iconify/react";

const ActivityLogContent = () => {
    const events = [
        {
            title: "Stock Restocked",
            description: "80 packs added - Batch BATCH-2026-02",
            by: "Alex Morgan",
            date: "Feb 20, 2026 - 10:14 AM",
            icon: "fluent:box-24-regular",
            color: "green"
        },
        {
            title: "Stock Restocked",
            description: "65 pack added - Batch BATCH-2026-01",
            by: "Tanya Brisk",
            date: "Feb 05, 2026 - 9:30 AM",
            icon: "fluent:box-24-regular",
            color: "green"
        },
        {
            title: "Low Stock Alert Fired",
            description: "Stock dropped to 27, below threshold of 15",
            by: "System",
            date: "Jan 28, 2026 - 6:00 AM",
            icon: "lucide:alert-triangle",
            color: "orange"
        },
        {
            title: "Low Stock Alert Fired",
            description: "Stock dropped to 18, below threshold of 15",
            by: "System",
            date: "Jan 21, 2026 - 6:00 AM",
            icon: "lucide:alert-triangle",
            color: "orange"
        },
        {
            title: "Price Updated",
            description: "Sale price changed: $58.00 → $62.00",
            by: "Alex Morgan",
            date: "Jan 15, 2026 - 2:45 PM",
            icon: "lucide:pencil",
            color: "blue"
        },
        {
            title: "Stock Restocked",
            description: "50 pack added",
            by: "Alex Morgan",
            date: "Dec 05, 2025 - 11:00 AM",
            icon: "fluent:box-24-regular",
            color: "green"
        },
        {
            title: "Product Approved",
            description: "Product approved and made live",
            by: "Alex Morgan",
            date: "Nov 12, 2025 - 3:00 PM",
            icon: "gg:check-o",
            color: "green"
        },
        {
            title: "Product Created",
            description: "Added to Forest Oasis inventory",
            by: "Alex Morgan",
            date: "Nov 12, 2025 - 2:30 PM",
            icon: "bi:patch-plus",
            color: "blue"
        }
    ];

    const getColorStyles = (color) => {
        switch (color) {
            case 'green':
                return 'bg-[#DCFCE7] text-[#219653]';
            case 'orange':
                return 'bg-[#FFF7E8] text-[#F2994A]';
            case 'blue':
                return 'bg-[#EBF5FF] text-[#0066FF]';
            default:
                return 'bg-[#F8F8F8] text-[#181211]';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-lg font-medium text-[#181211]">Complete history of all actions taken on this product</h3>

            <div className="relative">
                {events.map((event, idx) => (
                    <div key={idx} className="relative pl-16 pb-10 last:pb-2 flex justify-between items-start">
                        {/* Connecting Line */}
                        {idx !== events.length - 1 && (
                            <div className="absolute left-[21px] top-13 h-[50px] bottom-0 w-[2px] bg-[#F1F5F9]" />
                        )}

                        {/* Icon Node */}
                        <div className={`absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center z-10 shadow-sm ${getColorStyles(event.color)}`}>
                            <Icon icon={event.icon} width="22" />
                        </div>

                        {/* Content */}
                        <div className="space-y-1">
                            <h4 className="text-base font-semibold text-[#181211] mb-0">{event.title}</h4>
                            <p className="text-sm text-[#475569] font-medium leading-tight">{event.description}</p>
                            <p className="text-sm text-[#475569] font-medium opacity-80 flex items-center gap-1">
                                By <span className="font-bold text-[#181211]/90">{event.by}</span>
                            </p>
                        </div>

                        {/* Timestamp on Right */}
                        <div className="text-xs text-[#475569] font-medium whitespace-nowrap pt-1">
                            {event.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLogContent;
