import React from "react";
import { Icon } from "@iconify/react";

const INTEGRATIONS = [
    {
        id: 1,
        name: "Twilio SMS",
        icon: "logos:twilio-icon",
        description: "Send SMS notifications using Twilio to keep customers and drivers informed with real-time updates for orders, deliveries, and important alerts",
        features: ["Instant and reliable message delivery", "Improves customer and driver communication", "Easy integration with your existing system"],
        status: "Connected",
        date: "Mar 05, 2026"
    },
    {
        id: 2,
        name: "Stripe Payments",
        icon: "bi:stripe",
        iconcolor: "text-[#635BFF]",
        description: "Accept secure online payments using Stripe to process transactions, manage billing, and handle payouts seamlessly across your platform",
        features: ["Supports multiple payment methods and currencies", "Strong security with built-in fraud protection", "Fast, reliable payouts and easy integration"],
        status: "Connected",
        date: "Mar 05, 2026"
    },
    {
        id: 3,
        name: "SendGrid Email",
        icon: "logos:sendgrid-icon",
        description: "Send transactional and notification emails using this to keep customers and drivers informed with reliable, real-time communication across your platform",
        features: ["High email deliverability and reliability", "Scalable for large volumes of emails", "Easy integration with your system"],
        status: "Connected",
        date: "Mar 05, 2026"
    },
    {
        id: 4,
        name: "Google Maps API",
        icon: "gcp:google-maps-platform",
        description: "Use Google Maps API to enable location services, route optimization, and real-time tracking for deliveries across your platform",
        features: ["Accurate mapping and route calculations", "Real-time location tracking for drivers", "Improved delivery efficiency and navigation"],
        status: "Connected",
        date: "Mar 05, 2026"
    },
    {
        id: 5,
        name: "Firebase Push",
        icon: "devicon:firebase",
        description: "Use Firebase Cloud Messaging to send real-time push notifications to customers and drivers across your platform",
        features: ["Instant delivery of push notifications", "Supports Android, iOS, and web", "Scalable and reliable messaging infrastructure"],
        status: "Connected",
        date: "Mar 05, 2026"
    },
    {
        id: 6,
        name: "QuickBooks Online",
        icon: "simple-icons:quickbooks",
        iconcolor: "text-[#2BA01C]",
        description: "Integrate QuickBooks Online to manage accounting, track expenses, and automate financial reporting across your platform",
        features: ["Simplifies bookkeeping and expense tracking", "Generates real-time financial reports", "Syncs transactions automatically for accuracy"],
        status: "Disconnected",
        date: "Mar 05, 2026"
    },
    {
        id: 7,
        name: "Shopify",
        icon: "logos:shopify",
        description: "Integrate with Shopify to manage products, orders, and store operations seamlessly across your platform",
        features: ["Sync products and inventory in real time", "Streamline order management and fulfillment", "Easy integration with your existing store setup"],
        status: "Disconnected",
        date: "Mar 05, 2026"
    },
    {
        id: 8,
        name: "Slack",
        icon: "devicon:slack",
        description: "Integrate with Slack to receive real-time alerts, updates, and team notifications directly within your workspace",
        features: ["Centralized communication for your team", "Instant alerts for important events", "Improves team coordination and response time"],
        status: "Disconnected",
        date: "Mar 05, 2026"
    }
];

const IntegrationCard = ({ item }) => {
    const isConnected = item.status === "Connected";
    return (
        <div className="p-3 border border-[#BDBDD2] rounded-md bg-white space-y-4 transition-all flex flex-col justify-between shadow-sm group">
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center shrink-0  grayscale-0 transition-all duration-500  ${item.iconcolor ? item.iconcolor : ''}`}>
                            <Icon icon={item.icon} width="34" />
                        </div>
                        <h4 className="text-[17px] font-semibold text-[#181211]">{item.name}</h4>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wider ${isConnected ? 'bg-[#E0FFED] text-[#219653] border-[#219653]' : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'}`}>
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#059669]' : 'bg-[#64748B]'}`} />
                        {item.status}
                    </div>
                </div>

                <p className="text-sm font-medium  text-[#475569] leading-relaxed">
                    {item.description}
                </p>

                <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-[#475569]">
                            <Icon icon="icon-park-solid:check-one" className="text-[#219653] shrink-0 mt-0.5" width="16" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-xs  text-[#475569]">
                    {isConnected ? `Connected at ${item.date}` : `Disconnected at ${item.date}`}
                </span>
                <button className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] ${isConnected ? 'bg-[#EA3D2A] text-white ' : 'bg-[#219653] text-white px-8 py-2 '}`}>
                    {isConnected ? 'Disconnect' : 'Connect'}
                </button>
            </div>
        </div>
    );
};

const IntegrationsTab = () => {
    return (
        <div className="p-4 max-w-full animate-in fade-in slide-in-from-bottom-2 duration-500 font-manrope">
            <div className="bg-white border border-[#E2E8F0] rounded-md p-5 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {INTEGRATIONS.map(item => <IntegrationCard key={item.id} item={item} />)}
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

export default IntegrationsTab;
