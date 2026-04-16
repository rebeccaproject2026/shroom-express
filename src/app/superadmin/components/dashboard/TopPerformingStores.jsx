import { Icon } from "@iconify/react";
import store from "../../assets/images/store.png";
const TopPerformingStores = () => {
    const stores = [
        {
            id: "#SE-00001",
            name: "Store Name",
            image: store, // Placeholder
            categories: ["Micro dosing", "Beginner Friendly"],
            extraCats: 3,
            location: "Toronto Central",
            deliveryShip: [
                { type: "Same-day Delivery", icon: "mdi:truck-outline" },
                { type: "Express Delivery", icon: "mdi:truck-outline", variant: "green" }
            ],
            status: "Active",
            hours: "9am - 9pm",
            days: "Mon-Sat"
        },
        {
            id: "#SE-00002",
            name: "Store Name",
            image: store,
            categories: ["Micro dosing", "Beginner Friendly"],
            extraCats: 3,
            location: "Toronto Central",
            deliveryShip: [
                { type: "Express Delivery", icon: "mdi:truck-outline", variant: "green" }
            ],
            status: "Active",
            hours: "9am - 2am",
            days: "Mon-Sun"
        },
        {
            id: "#SE-00020",
            name: "Store Name",
            image: store,
            categories: ["Micro dosing", "Beginner Friendly"],
            extraCats: 3,
            location: "Toronto Central",
            deliveryShip: [
                { type: "Same-day Delivery", icon: "mdi:truck-outline" }
            ],
            status: "Active",
            hours: "9am - 9pm",
            days: "Mon-Fri"
        },
        {
            id: "#SE-00201",
            name: "Store Name",
            image: store,
            categories: ["Micro dosing", "Beginner Friendly"],
            extraCats: 3,
            location: "Toronto Central",
            deliveryShip: [
                { type: "Shipping", icon: "stash:pin-place-duotone" }
            ],
            status: "Active",
            hours: "9am - 9pm",
            days: "Mon-Sat"
        },
        {
            id: "#SE-23001",
            name: "Store Name",
            image: store,
            categories: ["Micro dosing", "Beginner Friendly"],
            extraCats: 3,
            location: "Toronto Central",
            deliveryShip: [
                { type: "Same-day Delivery", icon: "mdi:truck-fast-outline" },
                { type: "Express Delivery", icon: "mdi:lightning-bolt-outline", variant: "green" },
                { type: "Shipping", icon: "stash:pin-place-duotone" }
            ],
            status: "Active",
            hours: "9am - 9pm",
            days: "Mon-Sat"
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden font-manrope">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold text-[#181211]">Top Performing Stores</h2>
                <button className="text-[#EA3D2A] font-bold text-sm tracking-wide hover:opacity-80">View All</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F8FAFC]">
                        <tr className="bg-[#F8FAFC] text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9]">
                            <th className="py-3 px-6 font-semibold">Store</th>
                            <th className="py-3 px-6 font-semibold">CATEGORY</th>
                            <th className="py-3 px-6 font-semibold">LOCATION</th>
                            <th className="py-3 px-6 font-semibold">DELIVERY / SHIPPING</th>
                            <th className="py-3 px-6 font-semibold">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E8E8]">
                        {stores.map((store, index) => (
                            <tr key={index} className="hover:bg-[#F8FAFC]/50 transition-colors">
                                {/* Store Info */}
                                <td className="px-6 py-2  ">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 border border-[#F1F5F9] shadow-sm">
                                            <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-base font-semibold text-[#181211] leading-tight">{store.name}</h4>
                                            <span className="text-[14px] font-medium text-[#EA3D2A] leading-none mt-0.5">{store.id}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Categories */}
                                <td className="px-6 py-2">
                                    <div className="flex flex-col gap-1.5">
                                        {store.categories.map((cat, i) => (
                                            <div key={i} className="flex items-center gap-1.5">
                                                <div className="bg-[#F1F5F9] px-3 py-1 rounded-md w-fit">
                                                    <span className="text-xs font-semibold text-[#181211] whitespace-nowrap">{cat}</span>
                                                </div>
                                                {i === store.categories.length - 1 && (
                                                    <div className="bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                                                        <span className="text-[11px] font-semibold text-[#181211]">+{store.extraCats}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                {/* Location */}
                                <td className="px-6 py-2">
                                    <div className="flex items-center gap-2 text-[#181211]">
                                        <Icon icon="mdi:map-marker-outline" className="text-[#181211]" width="18" />
                                        <span className="text-[14px] font-medium">{store.location}</span>
                                    </div>
                                </td>

                                {/* Delivery / Shipping */}
                                <td className="px-6 py-2   ">
                                    <div className="flex flex-col gap-2">
                                        {store.deliveryShip[0] && (
                                            <div
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full w-fit border ${store.deliveryShip[0].variant === 'green'
                                                    ? 'bg-[#E0FFDD] border-[#DAFFD7] text-[#10C000]'
                                                    : 'bg-[#F8F8F8] border-[#E8E8E8] text-[#181211]'
                                                    }`}
                                            >
                                                <Icon icon={store.deliveryShip[0].icon} width="14" />
                                                <span className="text-[11px] font-bold whitespace-nowrap">{store.deliveryShip[0].type}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            {store.deliveryShip.slice(1).map((ship, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full w-fit border ${ship.variant === 'green'
                                                        ? 'bg-[#E0FFDD] border-[#DAFFD7] text-[#10C000]'
                                                        : 'bg-[#F8F8F8] border-[#E8E8E8] text-[#181211]'
                                                        }`}
                                                >
                                                    <Icon icon={ship.icon} width="14" />
                                                    <span className="text-[11px] font-bold whitespace-nowrap">{ship.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-2   ">
                                    <div className="flex flex-col gap-2">
                                        <div className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-3 py-0.5 rounded-full w-fit">
                                            {store.status}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-[#181211]">
                                                <Icon icon="weui:time-outlined" width="14" />
                                                <span className="text-xs font-medium">{store.hours}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[#181211]">
                                                <Icon icon="ci:calendar-days" width="14" />
                                                <span className="text-xs font-medium">{store.days}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopPerformingStores;
