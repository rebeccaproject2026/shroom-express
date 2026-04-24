import React, { useState } from "react";
import { Icon } from "@iconify/react";

const NOTIFICATIONS = [
    { id: 1, title: "New Order Received", description: "Alert when a new customer order is placed", initial: true },
    { id: 2, title: "Order Delivered", description: "Alert when an order is marked delivered", initial: true },
    { id: 3, title: "Low Stock Alert", description: "Alert when any product falls below threshold", initial: true },
    { id: 4, title: "Driver Alert", description: "Battery low, late delivery, offline driver", initial: true },
    { id: 5, title: "Payment Failed", description: "Alert when a customer payment fails", initial: true },
    { id: 6, title: "New Customer Signup", description: "Alert when a new customer registers", initial: false },
    { id: 7, title: "Campaign Performance Report", description: "Weekly campaign metrics summary", initial: true },
    { id: 8, title: "Weekly Business Digest", description: "Revenue, orders, and key metrics every Monday", initial: true },
    { id: 9, title: "System & Error Alerts", description: "Critical system errors and API failures", initial: true },
];

const Toggle = ({ enabled, onChange }) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);

const NotificationsTab = () => {
    const [preferences, setPreferences] = useState({
        newOrder: true,
        orderDelivered: true,
        lowStock: true,
        driverAlert: true,
        paymentFailed: true,
        newCustomer: false,
        campaignReport: true,
        businessDigest: true,
        systemAlerts: true
    });

    const notificationList = [
        { id: 'newOrder', label: 'New Order Received', sub: 'Alert when a new customer order is placed' },
        { id: 'orderDelivered', label: 'Order Delivered', sub: 'Alert when an order is marked delivered' },
        { id: 'lowStock', label: 'Low Stock Alert', sub: 'Alert when any product falls below threshold' },
        { id: 'driverAlert', label: 'Driver Alert', sub: 'Battery low, late delivery, offline driver' },
        { id: 'paymentFailed', label: 'Payment Failed', sub: 'Alert when a customer payment fails' },
        { id: 'newCustomer', label: 'New Customer Signup', sub: 'Alert when a new customer registers' },
        { id: 'campaignReport', label: 'Campaign Performance Report', sub: 'Weekly campaign metrics summary' },
        { id: 'businessDigest', label: 'Weekly Business Digest', sub: 'Revenue, orders, and key metrics every Monday' },
        { id: 'systemAlerts', label: 'System & Error Alerts', sub: 'Critical system errors and API failures' },
    ];

    return (
        <div className="p-4 max-w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white border border-[#E2E8F0] rounded-md p-5 space-y-8">
                <div className="space-y-1.5 mb-2">
                    <h2 className="text-xl font-semibold text-[#181211]">Notification Preferences</h2>
                    <p className="text-sm font-medium text-[#475569] mt-1">Choose which events trigger system notifications</p>
                </div>

                <div className="space-y-3 mt-0">
                    <div className="space-y-3">
                        {notificationList.map((setting) => (
                            <div key={setting.id} className="p-3 border border-[#BDBDD2] rounded-md flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-semibold text-[#181211]">{setting.label}</h4>
                                    <p className="text-xs font-medium text-[#475569]">{setting.sub}</p>
                                </div>
                                <Toggle
                                    enabled={preferences[setting.id]}
                                    onChange={() => setPreferences({ ...preferences, [setting.id]: [!preferences[setting.id]] })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-[#E2E8F0] flex gap-4">
                    <button
                        className="flex-1 px-4 py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold border border-[#E2E8F0] transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-4 py-2.5 bg-[#EA3D2A]  text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(24,18,17,0.2),0px_10px_15px_-3px_rgba(24,18,17,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Icon icon="lucide:check" width="18" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsTab;
