import React from 'react';
import { Icon } from '@iconify/react';

const DriverTrackingCard = ({
    driverName,
    avatar,
    isOnline = true,
    eta,
    status,
    address,
    totalOrders = 0,
    breakdown = {},
    className = "",
    showActions = true,
}) => {
    const {
        pending = 0,
        inProgress = 0,
        delivered = 0,
        cancelled = 0,
    } = breakdown;

    // Calculate percentages/widths for stacked bar
    const total = pending + inProgress + delivered + cancelled || 1;
    const pPending = (pending / total) * 100;
    const pInProgress = (inProgress / total) * 100;
    const pDelivered = (delivered / total) * 100;
    const pCancelled = (cancelled / total) * 100;

    // Status colors for text and progress line
    const getStatusStyle = (s) => {
        switch (s) {
            case "Delivered":
                return {
                    text: "text-[#109F22]",
                    bar: "bg-[#109F22]",
                    width: "w-full",
                };
            case "Cancelled":
                return {
                    text: "text-[#F44336]",
                    bar: "bg-[#F44336]",
                    width: "w-full",
                };
            case "In-progress":
                return {
                    text: "text-[#FF9800]",
                    bar: "bg-[#FF9800]",
                    width: "w-2/3",
                };
            default:
                return {
                    text: "text-[#0066FF]",
                    bar: "bg-[#0066FF]",
                    width: "w-1/3",
                };
        }
    };

    const style = getStatusStyle(status);

    return (
        <div
            className={`bg-white rounded-md border border-gray-200 shadow-lg overflow-hidden w-[300px] pointer-events-auto ${className}`}
        >
            <div className="p-2">
                {/* Driver row: avatar, name + badge, share/chat icons */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                        <div className="relative pt-1">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt={driverName}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold border border-gray-200">
                                    {driverName ? driverName.charAt(0) : "D"}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span
                                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${isOnline
                                        ? "bg-[#CEF1E0] text-[#00B159]"
                                        : "bg-[#FEECEB] text-[#F44336]"
                                        }`}
                                >
                                    {isOnline ? "Online" : "Offline"}
                                </span>
                            </div>
                            <h4 className="font-semibold underline text-[#232323] text-sm leading-tight">
                                {driverName}
                            </h4>
                        </div>
                    </div>

                    {showActions && (
                        <div className="flex gap-1">
                            <button
                                type="button"
                                className="text-blue-500 hover:bg-blue-50 rounded transition-colors"
                            >
                                <Icon icon="fa6-solid:up-right-from-square" style={{ fontSize: "16px", color: "#0066FF" }} />
                            </button>
                            <button
                                type="button"
                                className="text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <Icon icon="fluent:chat-16-regular" style={{ fontSize: "26px", color: "#000" }} />
                            </button>
                        </div>
                    )}
                </div>

                {/* ETA & Status & Progress Line */}
                <div className="mb-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs text-[#3F4753] font-medium truncate">
                            ETA: {eta}
                        </p>
                        <span className={`text-[13px] font-semibold ${style.text}`}>
                            {status}
                        </span>
                    </div>
                    {/* Visual Progress Line */}
                    <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`absolute left-0 top-0 h-full rounded-full ${style.bar} ${style.width}`}
                        ></div>
                    </div>
                </div>

                {/* Address */}
                <p className="text-xs text-[#969696] mb-2 pb-2 border-b-2 border-[#ECECEC] leading-tight">
                    {address}
                </p>

                {/* Total Orders with box icon */}
                <div>
                    <div className="flex items-center gap-1.5 mb-1">
                        <Icon
                            icon="mynaui:box"
                            className="w-4 h-4 text-[#3F4753] shrink-0"
                        />
                        <p className="text-xs font-semibold text-[#3F4753]">
                            Total Orders ({totalOrders})
                        </p>
                    </div>

                    {/* Horizontal stacked bar with numbers inside */}
                    <div className="flex h-3.5 w-full rounded-full overflow-hidden mb-2">
                        {pending > 0 && (
                            <div
                                style={{ width: `${pPending}%` }}
                                className="bg-[#0066FF] flex items-center justify-center text-[9px] text-white font-bold"
                            >
                                {pending}
                            </div>
                        )}
                        {inProgress > 0 && (
                            <div
                                style={{ width: `${pInProgress}%` }}
                                className="bg-[#FF9800] flex items-center justify-center text-[9px] text-white font-bold"
                            >
                                {inProgress}
                            </div>
                        )}
                        {delivered > 0 && (
                            <div
                                style={{ width: `${pDelivered}%` }}
                                className="bg-[#00B159] flex items-center justify-center text-[9px] text-white font-bold"
                            >
                                {delivered}
                            </div>
                        )}
                        {cancelled > 0 && (
                            <div
                                style={{ width: `${pCancelled}%` }}
                                className="bg-[#F44336] flex items-center justify-center text-[9px] text-white font-bold"
                            >
                                {cancelled}
                            </div>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-x-2 gap-y-1 font-semibold text-[10.5px]">
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></div>
                            <span className=" text-[#414141]">Pending</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF9800]"></div>
                            <span className=" text-[#414141]">In-Progress</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00B159]"></div>
                            <span className=" text-[#414141]">Delivered</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F44336]"></div>
                            <span className=" text-[#414141]">Canceled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverTrackingCard;
