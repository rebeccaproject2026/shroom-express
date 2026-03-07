import React from 'react';
import { Icon } from '@iconify/react';

const NotificationItem = ({ item, onClick }) => {
    const { title, description, timeText, icon, iconColorClass } = item;

    return (
        <div
            className="group relative flex items-center px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            onClick={onClick}
        >
            {/* Inset Bottom Border */}
            <div className="absolute bottom-0 left-6 right-6 border-b border-gray-100 group-last:border-0" />

            {/* Left Icon */}
            <div className={`shrink-0 w-8 h-8 flex items-center justify-center mr-4 ${iconColorClass}`}>
                <Icon icon={icon} className="text-[28px]" />
            </div>

            {/* Middle Content Section */}
            <div className="flex-1 min-w-0 pr-2">
                <div className="flex justify-between items-center mb-1 gap-2">
                    <h4
                        className="text-[14px] font-semibold text-[#1f2937] truncate leading-tight shrink"
                        title={title}
                    >
                        {title}
                    </h4>
                    <span className="text-[11px] text-[#6b7280] font-medium whitespace-nowrap shrink-0">
                        {timeText}
                    </span>
                </div>
                <p
                    className="text-[12px] text-[#6b7280] leading-snug truncate"
                    title={description}
                >
                    {description}
                </p>
            </div>

            {/* Right Chevron Icon */}
            <div className="shrink-0 flex items-center text-[#9ca3af]">
                <Icon icon="lucide:chevron-right" className="text-[20px]" strokeWidth="1.5" />
            </div>
        </div>
    );
};

export default NotificationItem;
