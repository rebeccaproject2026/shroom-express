import React from 'react';
import { Icon } from "@iconify/react";

const SuspendedTimelineContent = () => {
    const timelineEvents = [
        {
            title: "Store Suspended",
            description: "Suspended for 7 days by Alex Morgan, Policy violation",
            date: "Mar 06, 2026 · 2:00 PM",
            icon: "carbon:pause-outline",
            isRed: true,
            bgColor: "bg-[#FFEDEB]",
            textColor: "text-[#EA3D2A]"
        },
        {
            title: "Policy Violation Confirmed",
            description: "Admin confirmed unapproved product listings found",
            date: "Mar 06, 2026 · 1:30 PM",
            icon: "openmoji:police-car-light",
            isRed: true,
            bgColor: "bg-[#FFEDEB]",
            textColor: "text-[#EA3D2A]"
        },
        {
            title: "Violation Reported",
            description: "Customer complaint raised, investigation started",
            date: "Mar 05, 2026 · 11:00 AM",
            icon: "material-symbols:warning-rounded",
            isYellow: true,
            bgColor: "bg-[#FFF7E8]",
            textColor: "text-[#F2994A]"
        },
        {
            title: "Store Approved",
            description: "Store approved by Alex Morgan and went live",
            date: "Mar 04, 2026 · 10:15 AM",
            icon: "charm:tick",
            isGreen: true,
            bgColor: "bg-[#CDFFE2]",
            textColor: "text-[#219653]"
        }
    ];

    return (
        <div className="p-4 space-y-1 animate-in fade-in duration-500">
            <div className="relative">
                {timelineEvents.map((event, idx) => (
                    <div key={idx} className="relative pl-16 pb-12 last:pb-2">
                        {/* Connecting Line */}
                        {idx !== timelineEvents.length - 1 && (
                            <div className="absolute left-[21px] top-13 bottom-0 w-[3.5px] h-[50px] bg-[#F1F5F9]" />
                        )}

                        {/* Icon Node */}
                        <div className={`absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center z-10 ${event.bgColor} ${event.textColor}`}>
                            <Icon icon={event.icon} width="24" strokeWidth={3} />
                        </div>

                        {/* Content */}
                        <div className="space-y-1 pt-1.5 px-1">
                            <h4 className={`text-base font-semibold ${event.isRed ? 'text-[#EA3D2A]' : 'text-[#181211]'} mb-0`}>
                                {event.title}
                            </h4>
                            <p className="text-sm text-[#475569] font-medium leading-tight">
                                {event.description}
                            </p>
                            <p className="text-xs text-[#94A3B8] font-semibold pt-1">
                                {event.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuspendedTimelineContent;
