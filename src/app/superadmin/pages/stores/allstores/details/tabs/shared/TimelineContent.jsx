import React from 'react';
import { Icon } from "@iconify/react";

const TimelineContent = ({ status }) => {
    const activeEvents = [
        {
            title: "Approved",
            description: "Store approved by Alex Morgan — now live on the platform",
            date: "Mar 04, 2026 · 3:00 PM",
            icon: "hugeicons:tick-02",
            isAproved: true
        },
        {
            title: "Docs Verified",
            description: "All documents verified and approved",
            date: "Mar 03, 2026 · 10:30 AM",
            icon: "lucide:file-text",
        },
        {
            title: "Under Review",
            description: "Application picked up by Alex Morgan for review",
            date: "Mar 02, 2026 · 11:30 AM",
            icon: "ic:round-search",
        },
        {
            title: "Submitted",
            description: "Store application submitted by vendor",
            date: "Mar 01, 2026 · 9:00 AM",
            icon: "oui:app-reporting",
        }
    ];

    const pendingEvents = [
        {
            title: "Awaiting Approval",
            description: "All required docs reviewed. Final approval pending",
            date: "Mar 04, 2026 · 3:00 PM",
            icon: "mdi:timer-sand",
            status: "pending"
        },
        {
            title: "Docs Requested",
            description: "Insurance certificate requested from vendor",
            date: "Mar 03, 2026 · 10:30 AM",
            icon: "basil:document-outline",
            status: "done"
        },
        {
            title: "Under Review",
            description: "Application picked up by Alex Morgan for review",
            date: "Mar 02, 2026 · 11:30 AM",
            icon: "ic:round-search",
            status: "done"
        },
        {
            title: "Submitted",
            description: "Store application submitted by vendor",
            date: "Mar 01, 2026 · 9:00 AM",
            icon: "oui:app-reporting",
            status: "done"
        }
    ];

    const timelineEvents = status === "Active" ? activeEvents : pendingEvents;

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
                        <div className={`absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center z-10 shadow-sm ${event.isAproved ? 'bg-[#CDFFE2] text-[#219653]' : 'bg-[#F8F8F8] text-[#181211]'
                            }`}>
                            <Icon icon={event.icon} width="25" strokeWidth={event.isAproved ? 3 : 2} />
                        </div>

                        {/* Content */}
                        <div className="space-y-1">
                            <h4 className="text-base font-semibold text-[#181211] mb-0">{event.title}</h4>
                            <p className="text-sm text-[#475569] font-medium leading-tight">{event.description}</p>
                            <p className="text-xs text-[#475569] font-medium pt-1 opacity-80">
                                {event.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineContent;
