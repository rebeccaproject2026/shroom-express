import React from 'react';
import { Icon } from '@iconify/react';

const UpcomingDeliveryCard = ({ time, distance, pickup, drop }) => {
    return (
        <div className="border border-[#E8E8E8] rounded-md flex flex-col gap-5 p-4 bg-[#F8FBFF] hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1142D4] bg-[#DBEAFE] px-3 py-1.5 rounded">
                    {time}
                </span>
                <span className="text-xs font-semibold text-[#059669] bg-[#D1FAE5] px-3 py-1.5 rounded">
                    {distance}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="flex items-start gap-2">
                    <Icon icon="iconamoon:store-light" width="22" height="22" className="text-[#636363]" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">
                            Pickup Location
                        </p>
                        <p className="text-sm font-semibold text-[#3F4753]">
                            {pickup}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Icon icon="hugeicons:location-05" width="22" height="22" className="text-[#636363]" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">
                            Drop Location
                        </p>
                        <p className="text-sm font-medium text-[#212121]">
                            {drop}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingDeliveryCard;
