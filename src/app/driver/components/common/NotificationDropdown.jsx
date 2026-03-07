import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import NotificationItem from './NotificationItem';

const NotificationDropdown = ({ isOpen, onClose }) => {
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Static Mock Data exactly matching the design
    const notifications = [
        {
            _id: '1',
            title: 'ETA 3 Minutes Delivery in Progress',
            description: '3 minutes ETA has been sent to client for order #1234567890.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'material-symbols:folder-open-rounded',
            iconColorClass: 'text-[#ef4444]',
        },
        {
            _id: '2',
            title: 'ETA 5 Minutes Delivery in Progress',
            description: '5 minutes ETA has been sent to client for order #1234567890.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'material-symbols:folder-open-rounded',
            iconColorClass: 'text-[#ef4444]',
        },
        {
            _id: '3',
            title: 'Order Delivered',
            description: 'Good Job! You Just Delivered #[Order ID]',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'mdi:clock-check-outline',
            iconColorClass: 'text-[#14A92F]',
        },
        {
            _id: '4',
            title: 'Order Cancelled by Dispatcher',
            description: 'Order #[Order ID] Order was cancelled by the dispatcher.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'fluent:calendar-cancel-20-regular',
            iconColorClass: 'text-[#F44336]',
        },
        {
            _id: '5',
            title: 'Order Cancelled by Driver',
            description: 'Order #[Order ID] Order was cancelled by the driver.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'fluent:calendar-cancel-20-regular',
            iconColorClass: 'text-[#F44336]',
        },
        {
            _id: '6',
            title: 'New Order Assigned',
            description: 'Order #[Order ID] assigned by Admin/Dispatcher to a driver.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'lucide:package-check',
            iconColorClass: 'text-[#3b82f6]',
        },
        {
            _id: '7',
            title: 'Order Reassigned by Dispatcher',
            description: 'Order #[Order ID] reassigned from driver name to driver name.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'lucide:package-check',
            iconColorClass: 'text-[#3b82f6]',
        },
        {
            _id: '8',
            title: 'Dispatcher Changed Address',
            description: 'Dispatcher updated an address in the system.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'carbon:location-filled',
            iconColorClass: 'text-[#f97316]',
        },
        {
            _id: '9',
            title: 'Master Changed Address',
            description: 'Master Admin updated an address in the system.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'carbon:location-filled',
            iconColorClass: 'text-[#f97316]',
        },
        {
            _id: '10',
            title: 'Low Stock Alert',
            description: 'Stock is running low for [Item Name]. Please restock.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'vaadin:stock',
            iconColorClass: 'text-[#f59e0b]',
        },
        {
            _id: '11',
            title: 'High Demand Alert',
            description: '[Item Name] is in high demand. Consider adjusting stock levels.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'fluent-mdl2:product-variant',
            iconColorClass: 'text-[#22c55e]',
        },
        {
            _id: '12',
            title: 'Delivery Delayed Alert',
            description: 'Order #[Order ID] is delayed beyond expected time.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'hugeicons:delivery-delay-02',
            iconColorClass: 'text-[#4b5563]',
        },
        {
            _id: '13',
            title: 'System Maintenance Notification',
            description: 'Scheduled maintenance on [Date/Time]. Expect temporary downtime.',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'wpf:maintenance',
            iconColorClass: 'text-[#1f2937]',
        },
        {
            _id: '14',
            title: 'Driver name is Online/Offline',
            description: '[Driver Name] is [online/offline].',
            timeText: '14 January 2025 at 10:20pm',
            icon: 'healthicons:truck-driver-outline',
            iconColorClass: 'text-[#1f2937]',
        }
    ];

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={onClose} />

            {/* Drawer */}
            <div
                ref={dropdownRef}
                className="fixed top-0 right-0 h-full w-full sm:w-140 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out flex flex-col"
                style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-[18px] font-semibold text-[#374151]">Notifications</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <Icon icon="lucide:x" className="text-[22px]" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {notifications.length > 0 ? (
                        <div className="flex flex-col">
                            {notifications.map(item => (
                                <NotificationItem
                                    key={item._id}
                                    item={item}
                                    onClick={() => console.log('Clicked notification', item._id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No notifications
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default NotificationDropdown;
