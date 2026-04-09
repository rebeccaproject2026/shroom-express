import React from 'react';
import { Icon } from "@iconify/react";

const ActivityLogContent = () => {
    const events = [
        {
            title: "Purchase Order Placed",
            description: "SE-2026-036 · Adaptogen Blend 60ct - $1,120",
            by: "Alex Morgan",
            date: "Mar 05, 2026 - 10:30 AM",
            icon: "fluent-mdl2:product",
            color: "green"
        },
        {
            title: "Order Delivered",
            description: "SE-2026-041 · 200 Pack received - Batch BATCH-2026-02",
            by: "System",
            date: "Mar 03, 2026 - 2:00 PM",
            icon: "lucide:truck",
            color: "blue"
        },
        {
            title: "Purchase Order Placed",
            description: "SE-2026-038 · Micro Dose Caps 15mg - $1,200",
            by: "Tanya Brisk",
            date: "Mar 02, 2026 - 11:15 AM",
            icon: "fluent-mdl2:product",
            color: "green"
        },
        {
            title: "Purchase Order Placed",
            description: "SE-2026-041 · Micro Dose Caps 30mg - $2,400",
            by: "Alex Morgan",
            date: "Feb 28, 2026 - 9:00 AM",
            icon: "fluent-mdl2:product",
            color: "green"
        },
        {
            title: "Payment Terms Updated",
            description: "Net 45-Net 30",
            by: "Alex Morgan",
            date: "Feb 15, 2026 - 3:45 PM",
            icon: "lucide:pencil",
            color: "blue"
        },
        {
            title: "Contact Added",
            description: "Jordan Kline added as Logistics Manager",
            by: "Alex Morgan",
            date: "Feb 10, 2026 - 1:00 PM",
            icon: "lucide:user-plus",
            color: "red"
        },
        {
            title: "Order Delivered",
            description: "SE-2026-033 · 100 cups received · Batch BATCH-2026-01",
            by: "System",
            date: "Feb 15, 2026 - 11:00 AM",
            icon: "lucide:truck",
            color: "blue"
        },
        {
            title: "Late Delivery Flag",
            description: "SE-2026-030 delivered 1 day late",
            by: "System",
            date: "Feb 03, 2026 - 6:00 AM",
            icon: "lucide:alert-triangle",
            color: "orange"
        },
        {
            title: "Supplier Verified",
            description: "All documents checked and approved. Tier 1 partner status.",
            by: "Alex Morgan",
            date: "Aug 12, 2024 - 9:00 AM",
            icon: "gg:check-o",
            color: "green"
        },
        {
            title: "Supplier Added",
            description: "NovaBio Labs onboarded to ShroomExpress platform.",
            by: "Alex Morgan",
            date: "Aug 01, 2024 - 10:00 AM",
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
            case 'red':
                return 'bg-[#FFEDEB] text-[#EA3D2A]';
            default:
                return 'bg-[#F8F8F8] text-[#181211]';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-manrope">
            <h3 className="text-lg font-semibold text-[#181211]">Complete history of all actions taken on this product</h3>

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
                            <p className="text-sm text-[#475569] font-medium flex items-center gap-1">
                                <span className="opacity-80">By</span>
                                <span className="font-bold text-black">{event.by}</span>
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
